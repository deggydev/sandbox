# Music

The film has no sound effects and no voiceover. Music is optional: add one
continuous instrumental bed only when the user wants it.

## Routes

1. **FAL (default)** - ElevenLabs Music through FAL, `FAL_KEY` required:

   ```bash
   node <skill>/scripts/music.mjs --provider fal --seconds 50 --out assets/music.mp3 --prompt "..."
   ```

2. **ElevenLabs direct** - `ELEVENLABS_API_KEY` (or `XI_API_KEY`):
   `--provider elevenlabs`.
3. **The user's own track** - any audio file they have the rights to.

Generated routes are paid per job; confirm with the user first. A FAL
request is recorded in `<out>.fal.json`, so rerunning the command polls the
same job instead of paying twice.

Ask for a track a few seconds longer than the film. Match the prompt to the
story's mood:

- Default, playful: ukulele and nylon guitar picking, glockenspiel and soft
  marimba melody, light hand claps, gentle upright bass, around 100 BPM.
- Tender or dreamy (stories, books): music box and celesta, nylon guitar,
  warm cello pad, around 80 BPM.
- Curious science: pizzicato strings, marimba, light woodblock, bouncy,
  around 105 BPM.

Always: instrumental, no vocals, a clean resolved ending.

## Adding it to the film

Pass the track straight to the renderer; it trims the music to the film and
fades it out:

```bash
node <skill>/scripts/render.mjs film --out film.mp4 --audio assets/music.mp3 --audio-fade 2
```

Play it as one continuous piece; do not splice in another section.
