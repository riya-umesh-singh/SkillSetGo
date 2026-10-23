import { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Mic, Code2, Users, CheckCircle2, Circle, Trash2, Save } from "lucide-react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";

const modules = [
  { key: "hasResume", label: "Resume analysis", to: "/app/resume", icon: FileText },
  { key: "hasEnglish", label: "English coach", to: "/app/english", icon: Mic },
  { key: "hasTechnical", label: "Technical interview", to: "/app/technical", icon: Code2 },
  { key: "hasBehavioral", label: "Behavioral interview", to: "/app/behavioral", icon: Users },
];

export default function Profile() {
  const app = useApp();
  const { profile, setProfile, targetRole, sessionId, resetAll } = app;
  const [form, setForm] = useState(profile);
  const [saved, setSaved] = useState(false);

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setSaved(false);
  };

  const save = (e) => {
    e.preventDefault();
    setProfile(form);
    setSaved(true);
  };

  const inputCls =
    "w-full border border-border bg-white px-3 py-2.5 rounded-[3px] text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none";

  return (
    <AppShell title="Profile" subtitle="Your details and assessment progress.">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6">
        <Card>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-sage-dark text-white flex items-center justify-center font-display text-2xl">
              {(profile.name || "S").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl text-ink">{profile.name || "Your name"}</h2>
              <p className="text-sm text-muted">{profile.email || "Add your email below"}</p>
            </div>
          </div>

          <form onSubmit={save} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-ink">Full name</span>
              <input className={`${inputCls} mt-1.5`} value={form.name} onChange={update("name")} placeholder="e.g. Riya Sharma" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">Email</span>
              <input type="email" className={`${inputCls} mt-1.5`} value={form.email} onChange={update("email")} placeholder="you@college.edu" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-ink">College</span>
              <input className={`${inputCls} mt-1.5`} value={form.college} onChange={update("college")} placeholder="Your college or university" />
            </label>
            <div className="flex items-center gap-4 pt-1">
              <Button type="submit" icon={Save} iconPosition="left">Save profile</Button>
              {saved && <span className="text-sm text-gold font-medium">Saved</span>}
            </div>
          </form>
        </Card>

        <div className="space-y-6">
          <Card>
            <h3 className="font-display text-lg text-ink mb-1">Assessment progress</h3>
            <p className="text-sm text-muted mb-4">
              Target role: <span className="text-ink font-medium">{targetRole || "Not set yet"}</span>
            </p>
            <ul className="divide-y divide-border">
              {modules.map(({ key, label, to, icon: Icon }) => {
                const done = app[key];
                return (
                  <li key={key}>
                    <Link to={to} className="flex items-center gap-3 py-3 hover:bg-beige -mx-2 px-2 transition-colors">
                      <Icon size={18} className="text-sage-dark" />
                      <span className="flex-1 text-ink">{label}</span>
                      {done ? (
                        <span className="flex items-center gap-1.5 text-sm text-gold font-medium">
                          <CheckCircle2 size={16} /> Done
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-sm text-muted">
                          <Circle size={16} /> Not started
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>

          <Card>
            <h3 className="font-display text-lg text-ink mb-1">Session</h3>
            <p className="text-sm text-muted mb-4">
              {sessionId ? "Your results are stored for this session only. Clear them to start fresh." : "No active session yet. Upload a resume to begin."}
            </p>
            <Button variant="secondary" icon={Trash2} iconPosition="left" onClick={resetAll} disabled={!sessionId}>
              Clear my results
            </Button>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
