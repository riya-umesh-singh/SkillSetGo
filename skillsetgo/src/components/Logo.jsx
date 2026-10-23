export default function Logo({ className = "", dark = false }) {
  const textColor = dark ? "text-white" : "text-ink";
  const ring = dark ? "#F6F7F3" : "#161A1D";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        {/* tick marks, echoing the readiness dial used throughout the product */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * 2 * Math.PI - Math.PI / 2;
          const major = i % 3 === 0;
          const r1 = major ? 8.4 : 9.4;
          const r2 = 10.4;
          const cx = 13, cy = 13;
          return (
            <line
              key={i}
              x1={cx + r1 * Math.cos(angle)}
              y1={cy + r1 * Math.sin(angle)}
              x2={cx + r2 * Math.cos(angle)}
              y2={cy + r2 * Math.sin(angle)}
              stroke={ring}
              strokeOpacity={major ? 0.9 : 0.35}
              strokeWidth={major ? 1.3 : 0.9}
            />
          );
        })}
        <circle cx="13" cy="13" r="6.5" stroke={ring} strokeWidth="1.3" fill="none" />
        <path d="M13 13L17.2 9.2" stroke="#C68A2E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="13" cy="13" r="1.7" fill={ring} />
      </svg>
      <span className={`font-display text-xl ${textColor} tracking-tight font-medium`}>
        Skillset Go
      </span>
    </div>
  );
}
