---
name: bs-paper-cutout-story-video
description: "Turn any story, lesson or brand message into a paper-cutout storybook video with soft clay-and-felt pieces, layered green hills, a warm sun and props that pop, grow and slide into place like a child's collage. Give it your own topic, script or notes; it plans the scenes, builds the props around your subject and adds an optional music bed. You get an MP4 in 1080p, 2K or 4K plus an editable film you can preview in the browser."
---

# Paper Cutout Story Video

Make a short animated video that looks like a children's paper collage come
to life. Every piece is a flat cut-out with a soft, slightly puffy clay or
felt surface and a wobbly hand-cut edge; landscapes are layers of paper
hills under a paper sun; words pop on one by one; small props bounce, grow
and slide in. The look stays the same whatever the subject: a book summary,
a science lesson for kids, a brand story, a product explainer or a family
announcement.

The style is the constant. **The content always comes from the user's
topic.** Never reuse the example films' wording, scenes or props unless the
user's subject calls for them.

## What you deliver

- `film/` - an editable, previewable HTML film (open `index.html`, press
  space to play, use the scrubber or `[` `]` to jump between scenes).
- `film.mp4` - 30 fps H.264 at **1080p** (default), **2K** or **4K**, with
  the music bed when the user wants one. No sound effects, no voiceover.
- A short report: the scene list, facts used and their sources, music route,
  duration, and anything the user should check.

## Inputs

Any of these: a topic or question ("Why should we save water?"), a script,
lesson notes, a book or article to summarise, a brand or product
description, a logo, photos of real objects to use as stickers.

Ask only for what blocks the film: the topic, and the language if it is not
obvious. Everything else has a sensible default: English, about 35-50 s,
1080p, the green meadow world.

## Requirements

- Node.js 20+, FFmpeg on PATH.
- `npm install playwright-core` in the project folder, plus Google Chrome
  (preferred) or `npx playwright install chromium`.
- Optional music, one of (see `references/music.md`): **FAL** (`FAL_KEY`,
  default), **ElevenLabs** (`ELEVENLABS_API_KEY`), or a track the user owns.
  Without music the film renders silent.
- Optional: `FAL_KEY` for custom paper stickers (`scripts/sticker.mjs`).

Run scripts with the project folder as the working directory, e.g.
`cd <project> && node <skill>/scripts/build.mjs --storyboard storyboard.json --out film`.

## Workflow

1. **Set up** `<project>/`, install `playwright-core`, and confirm topic,
   language, length and resolution. Music and stickers are paid jobs: name
   the provider and wait for a yes before submitting.
2. **Write the story** - follow `references/story-writing.md`. Turn the
   topic into 7-11 scenes, one idea each: a title, a hook, the explanation
   in plain steps, the meaning or lesson, a closing line, an end card. For
   facts (science, health, history), use well-established facts only and
   keep numbers conservative; list each fact in the report.
3. **Cast the props** - pick props from `references/props.md` that show
   *this* subject (a fox and wheat for a story about taming, a tap and pipes
   for water, soap and germs for hand washing). When the library lacks
   something important, draw a custom SVG prop following the rules in
   `references/props.md`, or generate a sticker with `scripts/sticker.mjs`.
4. **Write the storyboard** - schema in `references/storyboard-schema.md`;
   complete examples in `references/examples/` and
   `references/example-storyboard.json`. Default world: green hills, a
   sun, clouds, trees. Change the theme only when the story asks for it
   (`desert` for a desert, `seaside` for a beach, `snow` for winter,
   `autumn`, `spring`, `dusk` for an evening or reflective close). Never
   use a dark night palette.
5. **Build and review**

   ```bash
   node <skill>/scripts/build.mjs --storyboard storyboard.json --out film
   node <skill>/scripts/qa.mjs film --out qa --per-scene 2
   node <skill>/scripts/serve.mjs film      # optional live preview
   ```

   Read every QA sheet and fix: props too small or floating above the
   ground, text running into a prop or off the frame, scenes that look
   empty, two scenes in a row with the same layout, words still animating
   at the end of a scene (lengthen `dur`).
6. **Music (optional)** - only when the user wants it (`references/music.md`):

   ```bash
   node <skill>/scripts/music.mjs --provider fal --seconds 50 --out assets/music.mp3
   ```

   One continuous track that fades out at the end; never splice two pieces.
   Never add sound effects.
7. **Render**

   ```bash
   node <skill>/scripts/render.mjs film --out film.mp4 --resolution 1080p --workers 6 \
        [--audio assets/music.mp3 --audio-fade 2]
   ```

8. **Verify and deliver** - `ffprobe` the MP4, make a 1 fps contact sheet,
   look at it once more, then deliver the MP4, the `film/` folder and the
   report.

## Style rules

- Light and warm only: cream paper, pale mint or peach skies, green hills.
  No dark backgrounds, no neon, no gradients beyond the sky.
- Clean paper: the engine adds a soft paper grain and the clay surface on
  every piece. Do not add speckles, dirt, stains or noise overlays.
- One idea per scene, at most about 20 words on screen; headlines of one or
  two short lines; highlight one key phrase with `**double asterisks**`.
- Props are big and readable (people 200-300 px tall, buildings 250-450 px)
  and stand on the ground; sky props float. Leave the headline side clear.
- Vary the rhythm: alternate landscape scenes with paper scenes, cards,
  steps and title strips. Do not copy the order of any example.
- Motion is playful but calm: pieces pop, grow, drop, slide or walk in; the
  camera drifts slowly; hard cuts between landscape scenes, `push` or
  `wipe` into paper scenes, `fade` into the close.
- Icons are props or Lucide line icons, never emoji.
- Text language follows the user. CJK text uses the system's CJK font
  automatically.

## Rights and limits

- Built-in props, fonts (Nunito, Caveat, SIL OFL) and icons (Lucide, ISC)
  are bundled with their licences. Generated music and stickers follow the
  provider's terms.
- When summarising a book or film, retell it in your own words and quote at
  most one short line; draw characters as original paper figures, not
  copies of an illustrator's artwork.
- For health and science topics, keep advice general and accurate; do not
  give medical instructions beyond common public guidance.
