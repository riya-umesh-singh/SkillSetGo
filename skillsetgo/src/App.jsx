import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import EnglishCoach from "./pages/EnglishCoach";
import TechnicalInterview from "./pages/TechnicalInterview";
import BehavioralInterview from "./pages/BehavioralInterview";
import Roadmap from "./pages/Roadmap";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app/dashboard" element={<Dashboard />} />
      <Route path="/app/resume" element={<ResumeAnalysis />} />
      <Route path="/app/english" element={<EnglishCoach />} />
      <Route path="/app/technical" element={<TechnicalInterview />} />
      <Route path="/app/behavioral" element={<BehavioralInterview />} />
      <Route path="/app/roadmap" element={<Roadmap />} />
      <Route path="/app/profile" element={<Profile />} />
    </Routes>
  );
}
