# Plan Facts

Facts about the accounts and plans behind the guides. The maintainer has had to restate these in
several sessions (Claude and Codex), so read this before writing limits, model availability, or
any mockup based on a live account screen.

## Who sees what

| Account | ChatGPT | Claude |
|---------|---------|--------|
| Faculty (the audience) | Standard seat in the KNUE Business workspace | Standard seat on the school's Claude Team |
| Maintainer's browser account (what live checks show) | **Pro** seat inside KNUE Business, with admin menus | **Premium** seat |

The maintainer's live screens are therefore not what faculty see:

- ChatGPT Pro shows only the weekly limit under 설정 → 사용량 → 개요; faculty seats also have a
  5-hour row. Draw the 5-hour row by analogy and keep a `TODO(verify)` comment.
- Leave admin-only items (팀원 추가, Admin Console) out of faculty mockups.
- Never mention the maintainer's seat in faculty content (no "프리미엄 계정 캡처" captions).

## Usage limits

- **Every Claude plan has both a 5-hour (session) limit and a weekly limit.** Do not word it as
  if the school's Team plan alone has them ("학교의 Claude Team에는 …" was corrected to "요금제와
  관계없이 …"). Explain both limits and how each one resets, not just the 5-hour one.
- Team seat multipliers and other plan-specific numbers must be checked against official
  documentation (see `AGENTS.md` → School license baseline).

## Model availability

- Claude's top model (Fable) is not usable on the faculty Team seat — do not mention it at all.
- ChatGPT's top model (Astra) is available but limited; present it as a last resort that burns
  through the limit quickly, as in `src/content/issues/chatgpt/03-model-effort.mdx`.
