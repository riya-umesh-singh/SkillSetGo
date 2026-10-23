const tones = {
  strong: "bg-sage-soft text-sage-dark border-sage-soft",
  weak: "bg-[#F1E4C9] text-[#8A5F1C] border-[#E4CE9E]",
  missing: "bg-[#F3DCD3] text-[#8A3A22] border-[#E7C1B2]",
  neutral: "bg-[#E3E6DC] text-ink border-border",
};

export default function SkillTag({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] border px-3 py-1 text-sm font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
