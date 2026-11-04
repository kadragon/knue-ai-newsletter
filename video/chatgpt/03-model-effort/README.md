# Chatgpt VOL.03 video

60-second, 1920×1080, 30 fps caption-led video. Burned-in captions and an original quiet instrumental bed; no narration.

- Content source: `src/content/issues/chatgpt/03-model-effort.mdx`.
- Authentic screen crops: `public/images/chatgpt/03-model-effort/`, captured on 2026-11-04 with the maintainer's Premium account. Allowance guidance targets faculty Standard seats.
- Screenshots are copied into `assets/screens/` for standalone rendering; refresh them when the issue screenshots change.
- The Claude model-list crop excludes the unavailable model. No model-specific message quota is invented.
- Numerical benchmark results retain the original task/model scope; they are not subscription allowance multipliers.

## Render

From this directory:

```sh
python3 ../../shared/create-background.py assets/audio/background.wav
npx hyperframes@0.8.200 check
npx hyperframes@0.8.200 render -q standard -o renders/chatgpt-03-model-effort.mp4
```

Render intermediates stay gitignored. The approved copy is committed at `public/videos/chatgpt/03-model-effort/guide.mp4` with its poster and embedded in the issue. See `docs/runbook.md`.

## Timeline

| Seconds | Content |
| --- | --- |
| 0–5 | Why highest settings are not always needed |
| 5–12 | Model versus effort |
| 12–24 | Model-dependent allowance |
| 24–33 | Benchmark with scope caveat |
| 33–41 | Open the model menu |
| 41–53 | Select the model and effort |
| 53–60 | Start with defaults, increase when needed |
