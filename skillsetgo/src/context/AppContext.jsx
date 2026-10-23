import { createContext, useContext, useState, useMemo } from "react";

const AppContext = createContext(null);

const PROFILE_KEY = "skillsetgo.profile";
const emptyProfile = { name: "", email: "", college: "" };

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...emptyProfile, ...JSON.parse(raw) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
}

export function AppProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);
  const [targetRole, setTargetRole] = useState("");
  const [analysis, setAnalysis] = useState(null); // resume analysis object
  const [technicalResult, setTechnicalResult] = useState(null); // { technical_score, tips }
  const [englishResult, setEnglishResult] = useState(null); // { fluency, grammar, ... }
  const [behavioralResult, setBehavioralResult] = useState(null);
  const [aptitudeScore, setAptitudeScore] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [profile, setProfileState] = useState(loadProfile);

  const setProfile = (next) => {
    setProfileState(next);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in memory only */
    }
  };

  const resetAll = () => {
    setSessionId(null);
    setTargetRole("");
    setAnalysis(null);
    setTechnicalResult(null);
    setEnglishResult(null);
    setBehavioralResult(null);
    setAptitudeScore(null);
    setDashboard(null);
  };

  const hasResume = Boolean(analysis);
  const hasTechnical = Boolean(technicalResult);
  const hasEnglish = Boolean(englishResult);
  const hasBehavioral = Boolean(behavioralResult);
  const hasAssessment = hasResume || hasTechnical || hasEnglish || hasBehavioral;

  const value = useMemo(
    () => ({
      sessionId, setSessionId,
      targetRole, setTargetRole,
      analysis, setAnalysis,
      technicalResult, setTechnicalResult,
      englishResult, setEnglishResult,
      behavioralResult, setBehavioralResult,
      aptitudeScore, setAptitudeScore,
      dashboard, setDashboard,
      profile, setProfile, resetAll,
      hasResume, hasTechnical, hasEnglish, hasBehavioral, hasAssessment,
    }),
    [sessionId, targetRole, analysis, technicalResult, englishResult, behavioralResult, aptitudeScore, dashboard, profile]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
