# Runbook

Entries still marked `[unknown]` have no implementation yet; replace them with the exact command
when it lands. Do not guess commands from the planned stack.

## Prerequisites

- Node.js 26 (verified with v26.12.0)
- pnpm 12
- HyperFrames CLI (for video renders): run via `npx hyperframes@0.8.200` (pinned; needs FFmpeg)

## Commands

| Purpose | Command |
|---------|---------|
| Install | `pnpm install` |
| Dev server | `pnpm dev` → http://localhost:4321/knue-ai-newsletter/ (Astro 7 daemonizes it; stop with `pnpm astro dev stop`) |
| Production build | `pnpm build` (output `dist/`; fails if an issue's folder ≠ its `tool` frontmatter) |
| Type check | `pnpm check` `[unverified — needs @astrojs/check]` |
| Check a video composition | in `video/<tool>/<issue>/`: `npx hyperframes@0.8.200 check` |
| Preview frames | in `video/<tool>/<issue>/`: `npx hyperframes@0.8.200 snapshot --at 3,15,30` |
| Render a HyperFrames video | in `video/<tool>/<issue>/`: `npx hyperframes@0.8.200 render -q standard -o renders/<tool>-<issue>.mp4` (gitignored) |
| Generate email summary for an issue | `[unknown]` |

## Deploy

| Target | Trigger | Method |
|--------|---------|--------|
| Web (production) | push or merge to `main`, or manual dispatch | `.github/workflows/deploy.yml` → GitHub Pages (Settings → Pages → Source: GitHub Actions) |
| Email | after the web deploy is live | Maintainer pastes the generated summary into school mail and sends manually |

Production URL: https://kadragon.github.io/knue-ai-newsletter/

The workflow installs pnpm 12.14.0 and Node.js 26.12.0, installs the frozen lockfile, builds
`dist/`, and uploads it as the Pages artifact. Deployment uses the `github-pages` environment.
Pull requests targeting `main` run the build job without deploying.
Check both jobs in the Actions tab and open the production URL after a successful deployment.
To redeploy the current `main` manually, run `gh workflow run deploy.yml --ref main`.

## Video publishing

Rendered MP4s are not committed or served from Pages. Upload each to YouTube (maintainer's
channel, **unlisted**) and put the issue page link in the video description.

Background music: add it in YouTube Studio → Editor → Audio from the YouTube Audio Library, or
mux a licensed track locally (`ffmpeg -i renders/x.mp4 -i assets/audio/bgm.mp3 -map 0:v -map 1:a
-c:v copy -c:a aac -af "afade=t=in:d=1.5,afade=t=out:st=44.5:d=2,volume=0.35" -shortest out.mp4`).
Music files stay out of git (`video/**/assets/audio/` is ignored); record the track title and any
required attribution in the YouTube description.

## Environment variables

None needed: deploy uses the built-in `GITHUB_TOKEN` and email is sent by hand. If one is added,
put it in CI secrets and a local `.env` (never committed) and document it here.

## Common failures

### Pages site loads without CSS / links 404

**Symptom:** deployed page is unstyled or internal links 404, local dev is fine.
**Cause:** site is served under `/knue-ai-newsletter/` but Astro `base` is unset or a link is hard-coded to `/`.
**Fix:** set `site` and `base` in the Astro config and build links from `import.meta.env.BASE_URL`.

### React island fails in dev with `_jsxDEV is not a function`

**Symptom:** a `client:*` React component (e.g. `InstructionBuilder`) renders nothing in `pnpm dev`; `pnpm build` output is fine.
**Cause:** stale Vite dependency pre-bundle from before the first React island was added.
**Fix:** `pnpm astro dev stop && pnpm dev --force`.
