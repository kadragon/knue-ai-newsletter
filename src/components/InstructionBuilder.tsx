import { useMemo, useState } from 'react';

type Purpose = 'course' | 'research' | 'admin';

const PURPOSES: Record<Purpose, { label: string; subject: string; placeholder: string }> = {
  course: { label: '강의', subject: '과목명', placeholder: '교육평가' },
  research: { label: '연구', subject: '연구 주제', placeholder: '형성평가 피드백 효과' },
  admin: { label: '위원회·행정', subject: '업무명', placeholder: '교육과정위원회' },
};

const TONES = { warm: '격려하는 존댓말', neutral: '간결한 존댓말', academic: '학술 문체' } as const;
type Tone = keyof typeof TONES;

function build(purpose: Purpose, subject: string, tone: Tone, strengths: number, fixes: number, cite: boolean, noGuess: boolean) {
  const name = subject.trim() || PURPOSES[purpose].placeholder;
  const lines: string[] = [];
  if (purpose === 'course') {
    lines.push(`이 프로젝트는 「${name}」 강의용이다. 업로드한 강의계획서와 루브릭을 기준으로 답한다.`);
    lines.push(`과제 피드백은 루브릭 항목별로 강점 ${strengths}개와 개선점 ${fixes}개를 제시한다.`);
    lines.push('루브릭에 없는 기준은 임의로 만들지 않는다.');
  } else if (purpose === 'research') {
    lines.push(`이 프로젝트는 「${name}」 연구용이다. 업로드한 논문과 연구 노트만 근거로 요약하고 비교한다.`);
    lines.push('논문끼리 결과가 상충하면 따로 표시하고, 추측과 근거를 구분해서 쓴다.');
  } else {
    lines.push(`이 프로젝트는 「${name}」 업무용이다. 업로드한 학칙과 규정을 근거로 검토 의견을 개조식(□, ○, -)으로 쓴다.`);
    lines.push('해석이 갈리는 부분은 단정하지 말고 "담당 부서 확인 필요"라고 표시한다.');
  }
  if (cite) lines.push(purpose === 'admin' ? '관련 조항 번호를 반드시 적는다.' : '주장마다 근거 파일명과 쪽수를 밝힌다.');
  if (noGuess) lines.push('자료에 없는 내용은 "자료에 없음"이라고 쓰고, 참고문헌을 지어내지 않는다.');
  lines.push(`${TONES[tone]}로 답한다.`);
  return lines.join('\n');
}

export default function InstructionBuilder() {
  const [purpose, setPurpose] = useState<Purpose>('course');
  const [subject, setSubject] = useState('');
  const [tone, setTone] = useState<Tone>('warm');
  const [strengths, setStrengths] = useState(1);
  const [fixes, setFixes] = useState(2);
  const [cite, setCite] = useState(true);
  const [noGuess, setNoGuess] = useState(true);
  const [copied, setCopied] = useState(false);

  const text = useMemo(() => build(purpose, subject, tone, strengths, fixes, cite, noGuess),
    [purpose, subject, tone, strengths, fixes, cite, noGuess]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard blocked */ }
  };

  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition ${on ? 'border-amber-500 bg-amber-500 text-white' : 'border-stone-300 bg-white hover:border-stone-500'}`;

  return (
    <div className="not-prose my-6 rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
      <p className="text-base font-bold">🛠 내 지침 만들기</p>
      <p className="mt-1 text-sm text-stone-500">고르는 대로 아래 지침이 바로 바뀝니다. 완성되면 복사해서 프로젝트 지침 칸에 붙여 넣으세요.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(PURPOSES) as Purpose[]).map((p) => (
          <button key={p} type="button" className={chip(purpose === p)} onClick={() => setPurpose(p)}>{PURPOSES[p].label}</button>
        ))}
      </div>

      <label className="mt-4 block text-sm">
        <span className="text-stone-600">{PURPOSES[purpose].subject}</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder={PURPOSES[purpose].placeholder}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 outline-none focus:border-amber-500" />
      </label>

      {purpose === 'course' && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-stone-600">강점 {strengths}개
            <input type="range" min={1} max={3} value={strengths} onChange={(e) => setStrengths(+e.target.value)} className="mt-1 w-full accent-amber-500" />
          </label>
          <label className="text-sm text-stone-600">개선점 {fixes}개
            <input type="range" min={1} max={3} value={fixes} onChange={(e) => setFixes(+e.target.value)} className="mt-1 w-full accent-amber-500" />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {(Object.keys(TONES) as Tone[]).map((t) => (
          <button key={t} type="button" className={chip(tone === t)} onClick={() => setTone(t)}>{TONES[t]}</button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-4 text-sm text-stone-700">
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={cite} onChange={(e) => setCite(e.target.checked)} className="accent-amber-500" /> 근거 밝히기</label>
        <label className="flex items-center gap-1.5"><input type="checkbox" checked={noGuess} onChange={(e) => setNoGuess(e.target.checked)} className="accent-amber-500" /> 자료에 없으면 지어내지 않기</label>
      </div>

      <div className="relative mt-4">
        <pre className="whitespace-pre-wrap rounded-xl bg-stone-800 p-4 pr-20 text-sm leading-relaxed text-stone-100">{text}</pre>
        <button type="button" onClick={copy}
          className="absolute right-3 top-3 rounded-md bg-white/15 px-2.5 py-1 text-xs text-white hover:bg-white/25">
          {copied ? '복사됨 ✓' : '복사'}
        </button>
      </div>
    </div>
  );
}
