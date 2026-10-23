export default function ScoreRing({ score = 0, size = 132, label, sublabel }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score));
  const offset = c - (pct / 100) * c;

  // Tick marks around the dial, like an instrument gauge — every 10%.
  const ticks = Array.from({ length: 21 }, (_, i) => i * 5); // 0,5,...100

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {ticks.map((t) => {
            const angle = (t / 100) * 360 * (Math.PI / 180);
            const major = t % 20 === 0;
            const inner = r - stroke / 2 - (major ? 7 : 4);
            const outer = r - stroke / 2 - 1;
            const cx = size / 2;
            const cy = size / 2;
            const x1 = cx + inner * Math.cos(angle);
            const y1 = cy + inner * Math.sin(angle);
            const x2 = cx + outer * Math.cos(angle);
            const y2 = cy + outer * Math.sin(angle);
            return (
              <line
                key={t}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#C7CBBF"
                strokeWidth={major ? 1.5 : 1}
              />
            );
          })}
          <circle cx={size / 2} cy={size / 2} r={r} stroke="#DCE6DD" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke="#C68A2E"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="butt"
            strokeDasharray={c}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 900ms ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-4xl text-ink font-semibold">{pct}</span>
          <span className="text-[11px] text-muted font-mono">/ 100</span>
        </div>
      </div>
      {label && <p className="mt-3 font-medium text-ink text-sm">{label}</p>}
      {sublabel && <p className="text-xs text-muted">{sublabel}</p>}
    </div>
  );
}
