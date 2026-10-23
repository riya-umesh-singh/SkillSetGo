import { useEffect, useState } from "react";
import { FileText, Code2, Mic, Users, Target } from "lucide-react";
import ProgressBar from "./ProgressBar";

const SLIDE_MS = 3000;

function Chip({ children, tone }) {
  const tones = {
    strong: "bg-sage-soft text-sage-dark",
    weak: "bg-peach text-brass-dark",
    missing: "bg-[#F3DCD3] text-[#7A2E18]",
    neutral: "bg-beige text-ink",
  };
  return <span className={`px-2.5 py-1 text-sm font-medium rounded-[3px] ${tones[tone]}`}>{children}</span>;
}

const slides = [
  {
    icon: FileText,
    title: "Resume readout",
    desc: "Strengths, weak spots and missing skills for your target role.",
    visual: (
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm text-muted">Strong</span><Chip tone="strong">Python</Chip><Chip tone="strong">React</Chip></div>
        <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm text-muted">Needs work</span><Chip tone="weak">SQL</Chip><Chip tone="weak">DSA</Chip></div>
        <div className="flex flex-wrap items-center gap-2"><span className="w-20 text-sm text-muted">Missing</span><Chip tone="missing">Docker</Chip><Chip tone="missing">REST APIs</Chip></div>
      </div>
    ),
  },
  {
    icon: Code2,
    title: "Technical interview",
    desc: "Questions built from your resume, with follow-ups that adapt.",
    visual: (
      <div className="space-y-2.5 text-sm">
        <p className="bg-sage-dark text-white px-3 py-2 rounded-[3px] w-[85%]">Explain how a REST API works.</p>
        <p className="bg-beige text-ink px-3 py-2 rounded-[3px] w-[85%] ml-auto">It uses HTTP methods to read and change resources…</p>
        <p className="bg-sage-dark text-white px-3 py-2 rounded-[3px] w-[85%]">How would you add authentication to it?</p>
      </div>
    ),
  },
  {
    icon: Mic,
    title: "English coach",
    desc: "Speak your answer. Get fluency, grammar and clarity scores.",
    visual: (
      <div className="space-y-3">
        <ProgressBar label="Fluency" value={71} tone="sage" />
        <ProgressBar label="Grammar" value={75} tone="sage" />
        <ProgressBar label="Clarity" value={66} tone="gold" />
        <div className="flex items-center gap-2 pt-1"><span className="text-sm text-muted">Fillers found</span><Chip tone="weak">um</Chip><Chip tone="weak">like</Chip></div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Behavioral coach",
    desc: "HR answers scored against the STAR framework.",
    visual: (
      <div className="grid grid-cols-2 gap-2.5">
        {[["S", "Situation"], ["T", "Task"], ["A", "Action"], ["R", "Result"]].map(([k, v]) => (
          <div key={k} className="border border-border px-3 py-2.5 flex items-center gap-3">
            <span className="font-mono font-semibold text-brass-dark text-lg">{k}</span>
            <span className="text-sm text-ink">{v}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Target,
    title: "Readiness roadmap",
    desc: "A weekly plan built from every score combined.",
    visual: (
      <ul className="space-y-2.5 text-sm">
        {[["Week 1", "SQL joins and aptitude basics"], ["Week 2", "Practice DSA problems"], ["Week 3", "Spoken English drills"], ["Week 4", "Full mock interview"]].map(([w, t]) => (
          <li key={w} className="flex items-center gap-3 border-b border-border pb-2">
            <span className="font-mono text-brass-dark w-16 shrink-0">{w}</span>
            <span className="text-ink">{t}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Skillset Go features"
    >
      <div className="bg-white text-ink overflow-hidden border border-white/20">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map(({ icon: Icon, title, desc, visual }, i) => (
            <div
              key={title}
              className="w-full shrink-0 p-7 h-[340px] flex flex-col"
              aria-hidden={i !== index}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 bg-sage-dark flex items-center justify-center">
                  <Icon size={20} className="text-terracotta" />
                </div>
                <h3 className="font-display text-xl font-semibold">{title}</h3>
              </div>
              <p className="text-muted mb-6">{desc}</p>
              <div className="mt-auto">{visual}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2.5 mt-5">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIndex(i)}
            aria-label={`Show ${s.title}`}
            className={`h-1.5 transition-all duration-300 ${i === index ? "w-8 bg-terracotta" : "w-3 bg-white/40 hover:bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}
