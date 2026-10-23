# Props

Every prop is a flat cut-paper SVG anchored at its bottom centre. The engine
gives it the clay surface (wobbly hand-cut edge, soft puffy relief lit from
the top left, mottled felt texture) and a soft paper shadow, so props only
need clean flat shapes. All props accept `color` (main colour) and `h`.
Parts sway, spin, bob or flap on their own where noted.

## Library (80)

| group | props (options) |
|---|---|
| nature | `tree` (fruit: true or colour; sways), `pine`, `bush`, `flower`, `tulip`, `sprout`, `grass`, `mushroom`, `rock`, `sunflower`, `wheat`, `pot` (potted plant), `baobab`, `mountain` (snow caps), `river` (span), `volcano` (smokes) |
| sky | `raincloud` (raining), `moon`, `star`, `planet` (rose, volcano), `bird` (flaps), `butterfly` (flaps), `kite`, `balloon`, `rocket`, `plane` (biplane) |
| people & animals | `person` (color, skin, hair, hat: true or colour, pose: "wave", scarf: true or colour), `fox`, `hand` (open palm) |
| buildings | `house` (color, roof), `shop` (text, awning), `barn`, `greenhouse`, `stall` (market stall, text), `windmill` (sails turn), `lighthouse`, `camp` (tent), `fence` (span), `waterworks`, `door`, `sink` |
| things | `bicycle` (basket; wheels turn), `car`, `boat` (bobs), `bench`, `signpost` (text), `easel` (bars: [0.4, 0.8, ...]), `laptop`, `book`, `cup` (steams), `bread`, `cake`, `gift`, `envelope`, `heart`, `bulb`, `gear` (spins), `bubble` (speech, text), `phone`, `flag`, `lamp` (street lamp), `mailbox`, `camera`, `basket`, `picnic`, `apple`, `trophy`, `calendar` (text), `pin` (map pin), `note` (music), `drop` (face: true), `pipe` (span, flow), `tap` (drip), `glass`, `germ` (cute microbe), `soap`, `bubbles`, `clock` (text) |
| decoration | `bunting` (span, colors) |

Aliases: tent, market -> stall; bike -> bicycle; mail, letter -> envelope;
idea -> bulb; chat -> bubble; sign -> signpost; chart -> easel;
faucet -> tap; water -> drop; virus, bacteria -> germ.

Typical heights: person 200-300, tree 300-520, house 220-320, shop 330-440,
small objects 90-170, floating sky props 50-180.

## Palette

Use the paper palette so custom pieces match the library:

| name | hex | | name | hex |
|---|---|---|---|---|
| cream | `#FBF7EE` | | leaf | `#6DB85C` |
| navy | `#27406E` | | green | `#5FAE55` |
| red | `#E25B4B` | | dark green | `#3D7D43` |
| coral | `#F08A74` | | teal | `#2E8C7C` |
| mustard | `#EDB33F` | | sky blue | `#BFE0EE` |
| sun | `#F3B63E` | | blue | `#4C86C6` |
| brown | `#A8744A` | | pink | `#F2A7B5` |
| skin | `#F2C9A0` | | lilac | `#B9A6E0` |

## Drawing a custom prop

When the subject needs something the library does not have (a koala, a
violin, a specific landmark), write it as an inline SVG prop:

```json
{ "svg": "<svg viewBox=\"0 0 200 160\">...</svg>", "x": 1400, "h": 220 }
```

Rules:

- `viewBox` required; draw the subject standing on the bottom edge,
  centred.
- 4-12 flat shapes: `path`, `circle`, `ellipse`, `rect` with `rx`. No
  strokes thinner than 4 units, no gradients, filters, text or images; the
  engine adds the texture and shadow.
- Build depth the cut-paper way: a darker copy of a shape slightly offset
  behind it, or one half of a shape a shade darker.
- Round, simple, friendly, like a picture book. Recognisable silhouette
  first, then one or two details (eyes, a window, a stripe).
- Colours from the palette above.

## Stickers

For subjects that need more detail than flat shapes allow (a specific
product, an animal with a recognisable face), generate a transparent
cut-paper sticker through FAL and use it with `src`:

```bash
node <skill>/scripts/sticker.mjs --subject "a koala hugging a eucalyptus branch" --out assets/koala.png
```

Each sticker is a paid FAL job (GPT Image 2, then BiRefNet background
removal); ask before generating. Rerunning the same command reuses the job.
The user's own photos or product images can also be used as `src` stickers
when they have a transparent background.
