# Architecture

Status: **planned** — agreed design, nothing scaffolded yet. Update this file as parts land.

## Publishing flow

```
MDX issue (+ frontmatter) ──PR review──▶ merge to main
        │                                   │
        │                                   ├─▶ GitHub Actions: build web ──▶ Pages deploy
        │                                   └─▶ generate email summary ──▶ copied into school mail, sent manually
        └─ HyperFrames composition (optional) ──▶ MP4 + poster ──▶ embedded on the web page
```

The MDX file is the single source of truth for an issue. The email body (short intro + link to the
web page) is derived from its frontmatter and lead section, not authored separately. The site is
the product; the email is only a teaser that drives traffic to it.

Email is sent by the maintainer by hand from the school mail account — there is no send
automation, recipient list, or mail API in this repo. The generator's job ends at producing text
and simple HTML that pastes cleanly into the school webmail editor.

## Tracks

Content is split by AI tool because each faculty member uses only one:

| Track | Audience | URL prefix | Email list |
|-------|----------|------------|------------|
| `chatgpt` | Faculty using ChatGPT | `/chatgpt/` | ChatGPT users only |
| `claude` | Faculty using Claude | `/claude/` | Claude users only |

- Each MDX issue declares `tool: chatgpt | claude` and is numbered within its track
  (`ChatGPT VOL. 01`, `Claude VOL. 01`).
- Web: the landing page lets a reader pick a track; each track has its own index and archive. No
  page lists both tracks' issues mixed together.
- Email: a summary is generated per issue and sent only to that track's recipients.
- Shared code (layout, interactive components, styles) is tool-agnostic; tool-specific text and
  screenshots live in the content, not in components.

## Components

| Part | Choice | Notes |
|------|--------|-------|
| Web framework | Astro + React islands | Static output |
| Content | MDX content collections | One file per issue, under its track |
| Styling | Tailwind CSS | |
| Interaction | React components used inside MDX | e.g. prompt comparison ("일반적인 질문" vs "구체적인 질문") |
| UI walkthroughs | `src/components/mock/` (Astro + vanilla script) | `<Walkthrough>` animates `<Hl>` targets in each per-tool mockup; static fallback without JS / reduced motion |
| Short video | HyperFrames (HTML/CSS/GSAP → MP4) | 15–60 s walkthroughs |
| Advanced video | Remotion | **Deferred** — add only for a series or data-bound video need |
| Hosting | GitHub Pages | Public. Fallback: Cloudflare Pages with the existing custom domain |
| Automation | GitHub Actions | Build and deploy only |

## Boundaries

- Video is a rendered asset consumed by the web page; the web build must not depend on running a
  video renderer.
- Interactive components never call a live AI model; their outputs are fixed teaching examples.
- Public site only. Member-only material (licenses, accounts, internal procedures) is out of this
  deploy target.

## Hosting notes (GitHub Pages)

- Repo name is `knue-ai-newsletter`. Without a custom domain the site is served under
  `/knue-ai-newsletter/`, so Astro `site` and `base` must be set and every internal link/asset must
  respect `base`. Pointing the custom domain at Pages removes the subpath.
- Pages sites are always publicly readable; on a free account the repo must also be public.
- Limits that matter here: 100 MB per file, ~1 GB published site, ~100 GB/month bandwidth (soft).
  Keep MP4s short and compressed; move video off Pages (or to Cloudflare) if they grow.
- Switch to Cloudflare Pages if a limit above bites or access control becomes necessary.
