import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Mic,
  Code2,
  Users,
  Map,
  Home,
  UserRound,
  X,
} from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/resume", label: "Resume Analysis", icon: FileText },
  { to: "/app/english", label: "English Coach", icon: Mic },
  { to: "/app/technical", label: "Technical Interview", icon: Code2 },
  { to: "/app/behavioral", label: "Behavioral Interview", icon: Users },
  { to: "/app/roadmap", label: "Career Roadmap", icon: Map },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-[248px] shrink-0 bg-sage-dark text-white flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-[76px] flex items-center justify-between px-6 border-b border-white/10">
          <Link to="/" onClick={onClose} aria-label="Skillset Go home"><Logo dark /></Link>
          <button onClick={onClose} className="lg:hidden text-white/70" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-[3px] text-[15px] transition-colors border-l-2 ${
                  isActive
                    ? "bg-white/10 text-terracotta border-terracotta font-medium"
                    : "text-white/70 border-transparent hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <NavLink
            to="/app/profile"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[3px] text-[15px] transition-colors border-l-2 ${
                isActive
                  ? "bg-white/10 text-terracotta border-terracotta font-medium"
                  : "text-white/70 border-transparent hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <UserRound size={18} /> Profile
          </NavLink>
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2.5 rounded-[3px] text-[15px] text-white/70 border-l-2 border-transparent hover:bg-white/5 hover:text-white transition-colors"
          >
            <Home size={18} /> Back to home
          </Link>
        </div>
      </aside>
    </>
  );
}
