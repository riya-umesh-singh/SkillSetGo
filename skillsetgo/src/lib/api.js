import { API_BASE } from "../config";
import { mockAnalysis, mockTechnicalScore, mockDashboard } from "./mockData";

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

// Every function tries the real backend first and falls back to mock data
// if it's unreachable (e.g. still building the frontend before the backend
// is up). This makes it safe to build screens now and "just work" once the
// FastAPI server is running on API_BASE.

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) throw new Error("Backend not healthy");
    return await res.json();
  } catch (err) {
    return { status: "unreachable", error: err.message };
  }
}

export async function analyzeResume({ file, targetRole }) {
  try {
    const form = new FormData();
    form.append("target_role", targetRole);
    form.append("file", file);
    const res = await fetch(`${API_BASE}/api/resume/analyze`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error(`Resume analysis failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to mock resume analysis:", err.message);
    await wait(1400);
    return mockAnalysis;
  }
}

export async function interviewChat({ sessionId, message, history, topic }) {
  try {
    const res = await fetch(`${API_BASE}/api/interview/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, message, history, topic: topic ?? null }),
    });
    if (!res.ok) throw new Error(`Interview chat failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to mock interview reply:", err.message);
    await wait(1200);
    return mockInterviewReply(message, history);
  }
}

function mockInterviewReply(message, history) {
  const turn = history.filter((h) => h.role === "ai").length;
  const questions = [
    "Can you explain how REST APIs work?",
    "How would you add authentication to that?",
    "What's the difference between a stack and a queue?",
    "How would you optimize a slow SQL query?",
  ];
  if (message === null || message === undefined) {
    return { reply: questions[0], done: false };
  }
  const next = questions[Math.min(turn, questions.length - 1)];
  const done = turn >= questions.length - 1;
  return {
    feedback: "Good explanation, a bit brief — try to add a concrete example next time.",
    reply: done ? "That wraps up the technical round. Nice work." : next,
    done,
  };
}

export async function analyzeEnglish({ sessionId, transcript, promptQuestion }) {
  try {
    const res = await fetch(`${API_BASE}/api/english/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        transcript,
        prompt_question: promptQuestion ?? "Tell me about yourself.",
      }),
    });
    if (!res.ok) throw new Error(`English analysis failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to mock English analysis:", err.message);
    await wait(1200);
    return {
      fluency_score: 68,
      grammar_score: 74,
      clarity_score: 66,
      filler_words_found: ["um", "like"],
      issues: ["Some filler words", "A few unclear sentences"],
      improved_version: "A polished, mock version of your answer would appear here.",
      tip: "Try to reduce filler words by pausing silently instead.",
      overall_english_score: 69,
    };
  }
}

export async function scoreInterview({ sessionId }) {
  try {
    const form = new FormData();
    form.append("session_id", sessionId);
    const res = await fetch(`${API_BASE}/api/interview/score`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error(`Interview scoring failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to mock interview score:", err.message);
    await wait(1000);
    return mockTechnicalScore;
  }
}

export async function getDashboard({ sessionId, aptitudeScore, englishScore, behavioralScore }) {
  try {
    const res = await fetch(`${API_BASE}/api/dashboard`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: sessionId,
        aptitude_score: aptitudeScore,
        english_score: englishScore,
        behavioral_score: behavioralScore,
      }),
    });
    if (!res.ok) throw new Error(`Dashboard failed (${res.status})`);
    return await res.json();
  } catch (err) {
    console.warn("Falling back to mock dashboard:", err.message);
    await wait(1400);
    return mockDashboard;
  }
}
