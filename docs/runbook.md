# Runbook

Entries still marked `[unknown]` have no implementation yet; replace them with the exact command
when it lands. Do not guess commands from the planned stack.

## Prerequisites

- Node.js 26 (verified with v26.12.0)
- pnpm 12
- HyperFrames CLI (for video renders): `[unknown — see HyperFrames README]`

## Commands

| Purpose | Command |
|---------|---------|
| Install | `pnpm install` |
| Dev server | `pnpm dev` → http://localhost:4321/knue-ai-newsletter/ (Astro 7 daemonizes it; stop with `pnpm astro dev stop`) |
| Production build | `pnpm build` (output `dist/`; fails if an issue's folder ≠ its `tool` frontmatter) |
| Type check | `pnpm check` `[unverified — needs @astrojs/check]` |
| Render a HyperFrames video | `[unknown]` |
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
