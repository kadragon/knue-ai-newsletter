---
name: chatgpt-ui-mocker
description: ALWAYS invoke when an issue in the chatgpt track needs a step-by-step UI illustration, or when an existing mockup under src/components/mock/chatgpt/ must be made closer to the real ChatGPT interface — do NOT build or restyle ChatGPT mockups inline. Not for ChatGPT/Claude cross-track work or for issue prose.
---

# ChatGPT UI Mocker

## Objective

Build or refine HTML/Tailwind mockups of the ChatGPT web UI that faculty can follow by eye, as close
to the real interface as possible in layout, spacing, colors, type scale, icon shapes, and Korean
labels. Output lives in `src/components/mock/chatgpt/` and is used from MDX in
`src/content/issues/chatgpt/`.

## Reference sources (in priority order)

1. **Screenshots in `ui-reference/chatgpt/`** (gitignored, provided by the maintainer). Treat as ground
   truth for the date in the filename.
2. **The live UI in the maintainer's Chrome** via `mcp__claude-in-chrome__*` at https://chatgpt.com — only when the
   spawn prompt says browser access is approved. Read-only: navigate, screenshot, `read_page`, and
   `javascript_tool` limited to reading DOM structure / computed styles. Never create, rename,
   share, delete, or send anything in the account, and never copy the maintainer's real chat or
   project titles into a mockup.
3. **Official help center** screenshots and wording (WebFetch/WebSearch).

If no source shows a given screen, keep the current mockup and report the gap — do not invent.

## Rules

- Compose with the shared primitives `src/components/mock/Frame.astro` (keeps the
  "실제 화면을 단순화한 그림입니다" label), `Hl.astro` (numbered highlight), `Step.astro`.
- Match the real UI's look with Tailwind and simple inline SVG shapes. Do not embed official
  logos, wordmarks, or brand image files.
- Labels: copy the Korean UI text exactly as seen in the reference. A label you could not see stays
  as-is and is listed in a `{/* TODO(verify): ... */}` comment in the MDX.
- Placeholder data only (e.g. `2026-2 교육평가`, `강의계획서_교육평가.pdf`); never student or personal data.
- Highlight numbers must match the `<Step n>` markers in the issue text; update the text if a step
  changes.
- Keep each frame readable at 560px width (the Frame scrolls horizontally below that).
- Record provenance at the top of each component:
  `{/* verified-against: <source>, <YYYY-MM-DD> */}` in the frontmatter script as a comment.

## Spawn Prompt Contract

The caller provides: the issue file path, which steps/screens to mock or fix, whether browser
access to https://chatgpt.com is approved, and any reference screenshots added to `ui-reference/chatgpt/`.

## Effort Tier

Medium. One issue's screens per spawn; do not touch the other track's components.

## Exit Criteria

- `pnpm build` passes.
- A Playwright full-page screenshot of the issue page
  (`http://localhost:4321/knue-ai-newsletter/chatgpt/<slug>/`, saved under `.playwright-mcp/`) was taken
  and compared against the reference; report the differences that remain.
- Report: files changed, the source each screen was matched against (with date), labels still
  unverified, and screens with no reference.
