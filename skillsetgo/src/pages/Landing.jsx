import { ArrowRight, FileText, Mic, Code2, MapPin, Upload, Target, Search, Sparkles, RefreshCcw } from "lucide-react";
import MarketingNavbar from "../components/MarketingNavbar";
import Button from "../components/Button";
import HeroCarousel from "../components/HeroCarousel";

const features = [
  { icon: FileText, title: "Resume readout", desc: "See which skills are strong, which need work and which are missing for your target role." },
  { icon: Code2, title: "Interview simulation", desc: "Questions generated from your own resume and gaps, with follow-ups that adapt to your answers." },
  { icon: Mic, title: "Communication check", desc: "Speak your answers aloud and get fluency, grammar and clarity scored, plus a cleaner rewrite." },
  { icon: MapPin, title: "Readiness roadmap", desc: "A week-by-week plan built from all your scores, not just one weak spot in isolation." },
];

const steps = [
  { n: "01", title: "Upload your resume", desc: "A PDF or Word file is all we need.", icon: Upload },
  { n: "02", title: "Pick your target role", desc: "Tell us the job you are preparing for.", icon: Target },
  { n: "03", title: "See your gaps", desc: "A clear list of what stands between you and the role.", icon: Search },
  { n: "04", title: "Run the practice rounds", desc: "Technical, behavioral and spoken English.", icon: Sparkles },
  { n: "05", title: "Recheck your score", desc: "Every round updates your score and your plan.", icon: RefreshCcw },
];

function SectionHeading({ title, children }) {
  return (
    <div className="max-w-2xl mb-10">
      <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3">{title}</h2>
      <p className="text-lg text-muted">{children}</p>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="bg-cream">
      <MarketingNavbar />

      {/* Hero */}
      <section className="bg-sage-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="text-terracotta font-mono text-sm mb-5">Career readiness, measured</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-[52px] leading-[1.1] mb-6">
              Most students find their weak spot during the interview. Find yours before it.
            </h1>
            <p className="text-lg text-white/85 mb-9 max-w-lg">
              Skillset Go reads your resume, runs a mock interview and checks your spoken English.
              You get one readiness score and a plan to close the gaps.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button to="/app/dashboard" variant="terracotta" icon={ArrowRight}>Check your readiness</Button>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 text-[15px] font-medium text-white border border-white/40 rounded-[3px] hover:bg-white/10 transition-colors"
              >
                See how it works
              </a>
            </div>
          </div>

          <HeroCarousel />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 max-w-6xl mx-auto px-6 py-20">
        <SectionHeading title="One profile for every round of hiring">
          Four modules that share what they learn about you, so each one starts where the last stopped.
        </SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-border p-6">
              <div className="w-11 h-11 bg-sage-dark flex items-center justify-center mb-5">
                <Icon size={20} className="text-terracotta" />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink mb-2">{title}</h3>
              <p className="text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-white border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <SectionHeading title="How it works">
            Five steps from an unassessed profile to a plan you can follow.
          </SectionHeading>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map(({ n, title, desc, icon: Icon }) => (
              <li key={n} className="border-t-4 border-terracotta pt-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-semibold text-brass-dark">{n}</span>
                  <Icon size={18} className="text-sage-dark" />
                </div>
                <h3 className="font-semibold text-ink mb-1.5">{title}</h3>
                <p className="text-muted text-[15px]">{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-sage-dark text-white px-8 md:px-12 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-3xl font-semibold mb-2">Find out where you actually stand.</h2>
            <p className="text-white/85 max-w-md">
              Upload your resume and get your first readiness score in a couple of minutes.
            </p>
          </div>
          <Button to="/app/resume" variant="terracotta" icon={ArrowRight} className="shrink-0">
            Upload your resume
          </Button>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted">
          <span>© {new Date().getFullYear()} Skillset Go</span>
          <span>Know your gaps. Practice smarter. Get interview-ready.</span>
        </div>
      </footer>
    </div>
  );
}
