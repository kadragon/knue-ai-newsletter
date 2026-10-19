# AGENTS.md

AI-usage guide for KNUE faculty: a web guide (interactive lessons, short videos, archive) plus an
email newsletter that links into it. Greenfield — no code yet; the agreed design lives in
`docs/architecture.md`.

## Docs Index (read on demand)

| File | When to read |
|------|--------------|
| `docs/architecture.md` | Before scaffolding or adding a content type, output channel, or video tool |
| `docs/runbook.md` | For build, preview, render, deploy, and email-send commands |

## Working with Existing Code

- **Public vs. member-only content.** The site is deployed publicly on GitHub Pages. Never put member-only guidance, license keys, account credentials, internal URLs, or
  staff contact details in the public content tree. Member-only material needs a separate,
  access-controlled location — ask before creating one.
- **Two separate tracks: ChatGPT and Claude.** Faculty use one or the other, so every issue
  targets exactly one tool (`tool` frontmatter) and lives in that track. A topic relevant to both
  is written twice, with each tool's own UI, menu names, plan limits, and screenshots — never mix
  tools in one issue or reuse one tool's screenshots for the other. UI mockups live in
  `src/components/mock/<tool>/`; shared primitives (`Frame`, `Hl`, `Step`) stay tool-agnostic.
- **Mockups are illustrations, not screenshots.** Keep the `Frame` caption label, no official
  logos, placeholder data only. Private reference captures go in gitignored `ui-reference/`.
- **One source per issue.** Each issue is authored once as MDX with frontmatter metadata; the web
  page and the email summary are both generated from it. Do not hand-write a parallel email copy.
- **Illustrative AI output is labeled.** Sample prompts/answers in interactive components are
  teaching examples, not real model responses — render the "교육용 예시" label wherever they appear.
- **Interactive vs. video.** Anything faculty manipulate (edit a prompt, compare results) is a
  React component in MDX. HyperFrames is for 15–60 s visual walkthroughs only. Do not add
  Remotion until a concrete content need is agreed.
- **Web-first.** The site is the product. Email is a short intro + link, sent by hand from school
  mail — build no send automation, recipient list, or mail API; never embed video or interactive
  parts in email.
- Optimise for "a professor understands it and can follow along in 1–2 minutes" over visual polish.

## Delegation

Default inline. UI mockups for an issue go to the track's role — `.claude/agents/chatgpt-ui-mocker.md`
or `.claude/agents/claude-ui-mocker.md` — one spawn per track, run in parallel when both tracks
change. Pass the issue path, the screens, and whether live-browser access is approved.

## Language Policy

- Code, comments, commit messages, and docs under `docs/`: English.
- Faculty-facing content (MDX bodies, email text, UI strings, video captions): Korean.

## Maintenance

Update this file only for stable guidance the code and config do not reveal and whose absence
would cause mistakes; fix stale lines rather than appending. Detail goes in `docs/` with a pointer
here. Durable repo facts belong in these version-controlled files; personal preferences belong in
the agent's auto-memory. Once the project is scaffolded, replace the `[unknown]` entries in
`docs/runbook.md` with the real commands.
