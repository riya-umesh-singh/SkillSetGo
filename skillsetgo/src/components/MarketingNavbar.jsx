import { useState } from "react";
import { Link } from "react-router-dom";
import { UserRound, Menu, X } from "lucide-react";
import Logo from "./Logo";
import Button from "./Button";

const links = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
];

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function MarketingNavbar() {
  const [open, setOpen] = useState(false);

  const goTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };
  const goSection = (id) => {
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link to="/" onClick={goTop} aria-label="Skillset Go home"><Logo /></Link>

        <nav className="hidden md:flex items-center gap-9 text-[15px] font-medium text-ink">
          <Link to="/" onClick={goTop} className="hover:text-brass-dark transition-colors">Home</Link>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => goSection(id)} className="hover:text-brass-dark transition-colors">
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button to="/app/dashboard" className="hidden sm:inline-flex">Get started</Button>
          <Link
            to="/app/profile"
            className="w-10 h-10 border border-ink/30 flex items-center justify-center text-ink hover:border-ink hover:bg-white transition-colors"
            aria-label="Open profile"
          >
            <UserRound size={18} />
          </Link>
          <button
            className="md:hidden w-10 h-10 border border-ink/30 flex items-center justify-center text-ink"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-cream px-6 py-4 flex flex-col gap-4 text-[15px] font-medium text-ink">
          <Link to="/" onClick={goTop}>Home</Link>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => goSection(id)} className="text-left">{label}</button>
          ))}
          <Link to="/app/dashboard" onClick={() => setOpen(false)}>Get started</Link>
        </nav>
      )}
    </header>
  );
}
