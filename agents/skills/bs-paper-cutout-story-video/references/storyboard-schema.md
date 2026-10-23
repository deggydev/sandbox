# Storyboard schema

A storyboard is one JSON file: `meta` plus an ordered list of `scenes`.
Coordinates are in a 1920x1080 stage; `x` is the horizontal centre of a
piece, `y` its vertical centre (for floating pieces).

```json
{
  "meta": { "title": "Why save water?", "fps": 30, "theme": "meadow", "lang": "en", "seed": "save-water" },
  "scenes": [ { "id": "title", "type": "paper", "dur": 3.6, "...": "..." } ]
}
```

## meta

| key | default | meaning |
|---|---|---|
| `title` | | page title of the HTML film |
| `fps` | 30 | frame rate |
| `theme` | `meadow` | default world palette: `meadow`, `spring`, `autumn`, `seaside`, `snow`, `dusk`, `desert` |
| `lang` | `en` | document language |
| `seed` | `paper` | changes the shape of the hills and cloud layout |
| `boil` | true | tiny stop-motion jitter on pieces; `false` for perfectly still |
| `clay` | `{ wobble: 3.4, relief: 1, tex: 0.26 }` | clay surface strength; `false` turns it off |
| `vignette` | true | soft paper vignette |

## Scene fields shared by every type

| key | meaning |
|---|---|
| `id` | unique name (used in QA labels) |
| `type` | `world`, `paper`, `cards`, `steps`, `end` |
| `dur` | seconds |
| `transition` | how this scene comes in: `cut` (default), `fade`, `push` (slides in with motion blur), `wipe` (a torn paper edge sweeps across) |
| `paper` | background paper colour for non-world scenes, e.g. `#ECE8F2` lavender, `#E7EFEF` pale blue |
| `text` | kinetic headline, see below |
| `card` | numbered paper card, see below |
| `props` | list of pieces, see below |
| `confetti` | number of small paper bits scattered around (paper scenes) |

## type: world

The landscape: sky, sun, drifting clouds, six layers of paper hills, grass
tufts in the corners. The first world scene after a non-world scene rises
up out of the paper automatically (`enter: "none"` to stop it).

| key | meaning |
|---|---|
| `theme` | palette for this scene (see meta) |
| `backdrop` | `mountains`, `city`, `forest` silhouette behind the hills |
| `sun` | `false`, or `{ "x": 1630, "y": 185, "r": 74, "color": "#F3B63E" }` |
| `clouds` | number of clouds (default 6) |
| `tufts` | `false` hides the corner grass |
| `camera` | `{ "x": [0, -40], "y": [0, 0], "zoom": [1, 1.04] }` start and end values over the scene |
| `exit` | `swap` or `hold`. By default, when the next scene is also a world scene joined by a cut, props, text and card pop out in the last 0.4 s so the landscape seems to stay while the pieces change. Give a prop `keep: true` to leave it, and repeat it with `enter: "none"` in the next scene. |

Props in a world stand on the ground. `depth` places them between hill
layers: `1` (default) is the front, `0.6` stands behind the middle hills,
`0.45` further back. Give a prop a `y` to make it float in the sky.

## type: paper

A plain sheet of paper with props anywhere (`x`, `y` are the centre). Good
for titles, close-ups and diagrams.

## type: cards

2-4 paper cards in a row, each with an illustration panel.

```json
{ "type": "cards", "y": 320, "at": 0.8, "stagger": 0.45, "cardWidth": 440,
  "text": { "lines": ["Small habits add up"], "align": "center", "x": 960, "y": 140, "size": 66 },
  "cards": [ { "prop": "tap", "title": "Tap off", "body": "while you brush.", "bg": "#DDEDF2", "propOptions": {} } ] }
```

A card can use `src` (image) instead of `prop`, and `h` for the prop height.

## type: steps

2-5 round medallions joined by a dashed line, each with a label, plus an
optional caption. Each step takes `prop` (a library prop, recommended) or
`icon` (a Lucide icon name), `label`, `color`. Options: `y`, `size` (170),
`gap` (340), `stepGap` (seconds between steps, 0.75), `at`.

## type: end

Centre mark, name, handwritten tagline and optional URL. The mark is
`logo` (image path), `prop` (+ `propOptions`, `propSize`) or
`mark: { "text": "S", "color": "#EDB33F" }`.

## text

```json
{ "kicker": "Where water comes from", "lines": ["It falls as", "**rain** and **snow**."],
  "body": "One or two short lines.\nLine break with \\n.", "note": "handwritten aside",
  "x": 140, "y": 140, "size": 96, "align": "left", "anchor": "top", "at": 0.35,
  "strips": false, "stripColors": ["#FFFFFF", "#F6EBC8"] }
```

- `**...**` draws a highlighter stroke behind the phrase after it lands.
- `strips: true` puts every word on its own little paper strip, like
  letters cut from a magazine. Use it for titles.
- `align: "center"` centres on `x`; `anchor: "middle"` centres on `y`.
- Headline sizes: 96-110 for world scenes, 110-130 for title strips,
  60-70 for headings above cards or steps.

## card

```json
{ "n": "01", "kicker": "Clean", "title": "The water works", "body": "Filtered until safe to drink.",
  "color": "#2E8C7C", "x": 120, "y": 300, "w": 600, "tilt": -1.2, "at": 0.2 }
```

## props

```json
{ "type": "tree", "x": 1500, "h": 380, "depth": 0.6, "enter": "grow", "at": 0.5,
  "color": "#6DB85C", "flip": false, "rotate": 0, "float": 8, "z": 2, "keep": false, "still": false }
```

| key | meaning |
|---|---|
| `type` | library prop, see `props.md` |
| `svg` | instead of `type`: a custom SVG string with a `viewBox` |
| `src` | instead of `type`: a transparent PNG/WebP sticker (gets a white paper border) |
| `x`, `y` | position; no `y` in a world = standing on the ground |
| `h` | height in px (width follows the prop's proportions) |
| `enter` | `pop` (default), `grow` (rises out of the ground), `drop` (falls and bounces), `slide` (from the nearest edge or `from`), `rise`, `fade`, `walk` (moves from `from` to `x` over `walkDur` seconds with a bob), `none` |
| `at` | seconds after the scene starts (defaults stagger by 0.16 s) |
| `float` | gentle bob in px (true = 8) |
| `rotate`, `flip`, `z` | rotation in degrees, mirror, stacking order |
| `still` | no stop-motion jitter (big shapes like a planet) |
| prop options | colours and extras listed in `props.md` |
