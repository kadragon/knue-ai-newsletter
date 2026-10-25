# Issue email style

Approved on 2026-10-20. Use this format for subsequent emails in both tracks.
Editorial instructions are in English; recipient-facing template text is in Korean.

## Source and scope

- Derive each issue's explanation, benefit, and example from its MDX frontmatter and body.
  This template defines the shared presentation, not a parallel source for issue content.
- Write one email per tool. Use `ChatGPT` or `Claude` in the subject and link label.
  In the Claude opening, use `학교에서 제공하는 Claude Team`.
- Lead with the feature or usage topic. A scenario such as `강의별 AI 작업실 만들기`
  is one example, not the main topic of the email.
- Keep the email short: explain the value and direct readers to the web guide.
  Leave detailed steps, screenshots, and interactive exercises on the website.
- Use plain, polite Korean, short paragraphs, and one blank line between paragraphs.
  Do not turn the email into a numbered official letter.
- Keep sender identity in this editorial template; do not add it to public MDX metadata
  or website content.
- This records the format only. Email generation remains unimplemented; sending stays
  manual through school mail.

## Subject

```text
[정보전산원] {도구명} 활용 안내 {호수} — {주제}
```

Use a circled issue number matching the issue's `vol` within its track, such as `①`, `②`,
or `③`. Do not include `교수님을 위한`.

Approved first-issue subjects:

```text
[정보전산원] ChatGPT 활용 안내 ① — 프로젝트 활용법
[정보전산원] Claude 활용 안내 ① — 프로젝트 활용법
```

## Body template

Replace all brace-delimited placeholders before handing over a draft.

```text
안녕하세요, 교수님. 정보전산원 강동욱입니다.

학교에서 제공하는 {서비스명}을 수업과 연구에 활용하실 수 있도록 활용법을 안내드립니다.

{회차 표현} 주제는 ‘{주제}’입니다.

{기능을 쉽게 설명하는 문장} {수업·연구에서 어떤 도움이 되는지 설명하는 문장}

이번 안내에서는 {안내 범위}를 소개합니다. 활용 예시로는 ‘{예시 이름}’를 준비했습니다. {예시를 따라 해 보도록 권하는 문장}

👉 {도구명} {주제} 보기

다른 교수님들과 나누고 싶은 활용 팁이 있으시면 보내 주세요. 이번 안내처럼 정리해 공유하겠습니다.

감사합니다.

강동욱 드림
```

## Substitution and review

| Placeholder | Rule |
|-------------|------|
| 서비스명 | `ChatGPT` or `Claude Team` |
| 도구명 | `ChatGPT` or `Claude` |
| 회차 표현 | `첫 번째` for issue 1; `이번` for later issues |
| 주제 | Feature-focused topic, such as `프로젝트 활용법` |
| 안내 범위 | Short summary of what the linked MDX guide actually covers |
| 예시 이름 | One concrete application supported by the guide; adjust Korean particles as needed |
| Link | Make the full `👉 … 보기` label link to the deployed page for this issue and tool |

- Keep the greeting, contribution invitation, thanks, and signature consistent.
- Check the tool, issue number, topic, and destination before delivery.
- Check date-sensitive examples against the planned sending date. Do not carry
  `중간고사 이후` into later issues unless it is still relevant.
- Do not invent upcoming schedules, account terms, or feature availability.
- Retain any brief safety instruction needed for the specific exercise.
- Do not append a period to `강동욱 드림`.
