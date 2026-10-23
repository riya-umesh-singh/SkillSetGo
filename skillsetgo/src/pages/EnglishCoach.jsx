import { useState } from "react";
import { Mic, Square, RefreshCcw, ArrowRight } from "lucide-react";
import AppShell from "../components/AppShell";
import Card from "../components/Card";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import ProgressBar from "../components/ProgressBar";
import { useApp } from "../context/AppContext";
import { englishQuestions } from "../lib/mockData";
import { analyzeEnglish } from "../lib/api";
import { useSpeechToText } from "../lib/useSpeech";

export default function EnglishCoach() {
  const { sessionId, setEnglishResult } = useApp();
  const [qIndex, setQIndex] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | recording | analyzing | result
  const [result, setResult] = useState(null);
  const [rawText, setRawText] = useState("");

  const { start, stop, isRecording, transcript, supported } = useSpeechToText();
  const question = englishQuestions[qIndex];

  const startRecording = () => {
    setPhase("recording");
    start();
  };

  const finishRecording = async () => {
    stop();
    setPhase("analyzing");

    const finalTranscript =
      transcript.trim() ||
      "Um, hi, my name is Riya. I am, like, a final year student and I have worked on a few projects.";
    setRawText(finalTranscript);

    const data = await analyzeEnglish({
      sessionId,
      transcript: finalTranscript,
      promptQuestion: question,
    });

    // Normalize backend shape into what the UI renders below.
    const normalized = {
      overall: data.overall_english_score ?? data.overall ?? 0,
      fluency: data.fluency_score ?? data.fluency ?? 0,
      grammar: data.grammar_score ?? data.grammar ?? 0,
      clarity: data.clarity_score ?? data.clarity ?? 0,
      fillers: data.filler_words_found ?? [],
      issues: data.issues ?? [],
      improved: data.improved_version ?? "",
      tip: data.tip ?? "",
    };

    setResult(normalized);
    setEnglishResult(normalized);
    setPhase("result");
  };

  const tryAgain = () => {
    setPhase("idle");
    setResult(null);
    setRawText("");
  };

  const nextQuestion = () => {
    setQIndex((i) => (i + 1) % englishQuestions.length);
    tryAgain();
  };

  return (
    <AppShell title="English Coach" subtitle="Practice speaking, get structured feedback.">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center py-10">
          <p className="text-sm text-muted mb-2">Question</p>
          <h2 className="font-display text-2xl text-ink mb-8">"{question}"</h2>

          {!supported && (
            <p className="text-sm text-brass-dark mb-4">
              Voice recognition isn't supported in this browser — try Chrome for live mic input.
            </p>
          )}

          {phase === "idle" && (
            <>
              <button
                onClick={startRecording}
                className="w-20 h-20 rounded-full bg-terracotta text-ink flex items-center justify-center mx-auto mb-4 hover:bg-[#E5B24E] transition-colors"
                aria-label="Start speaking"
              >
                <Mic size={28} />
              </button>
              <p className="text-muted text-sm">Tap to start speaking</p>
            </>
          )}

          {phase === "recording" && (
            <>
              <div className="w-20 h-20 rounded-full bg-terracotta text-ink flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Mic size={28} />
              </div>
              <p className="text-brass-dark text-sm font-medium mb-5">
                {isRecording ? "🔴 Listening..." : "Starting mic..."}
              </p>
              <p className="min-h-[4rem] text-left text-ink/80 border border-border rounded-lg px-4 py-3 mb-5">
                {transcript || "Start speaking — your words will appear here live."}
              </p>
              <Button onClick={finishRecording} icon={Square} iconPosition="left" variant="secondary">
                Stop & Analyze
              </Button>
            </>
          )}

          {phase === "analyzing" && <Spinner label="Analyzing your speech..." />}

          {phase === "result" && result && (
            <div className="text-left">
              <p className="text-sm text-muted mb-6 text-center">You said: "{rawText}"</p>
            </div>
          )}
        </Card>

        {phase === "result" && result && (
          <>
            <Card>
              <h3 className="font-display text-lg text-ink mb-4">Your Communication Analysis</h3>
              <div className="space-y-4">
                <ProgressBar label="Fluency" value={result.fluency} tone="sage" />
                <ProgressBar label="Grammar" value={result.grammar} tone="sage" />
                <ProgressBar label="Clarity" value={result.clarity} tone="gold" />
              </div>
            </Card>

            {result.fillers.length > 0 && (
              <Card>
                <h4 className="font-medium text-ink mb-3">Filler Words</h4>
                <div className="flex flex-wrap gap-3">
                  {result.fillers.map((w) => (
                    <span key={w} className="text-sm bg-peach text-[#8A3A22] rounded-full px-3 py-1">
                      "{w}"
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {result.issues.length > 0 && (
              <Card>
                <h4 className="font-medium text-ink mb-3">Issues Found</h4>
                <ul className="list-disc list-inside text-sm text-ink/80 space-y-1">
                  {result.issues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </Card>
            )}

            {result.improved && (
              <Card>
                <h4 className="font-medium text-ink mb-2">Improved Version</h4>
                <p className="text-sm text-ink/80 italic">"{result.improved}"</p>
              </Card>
            )}

            <Card>
              <h4 className="font-medium text-ink mb-2">AI Tip</h4>
              <p className="text-sm text-ink/80">{result.tip}</p>
            </Card>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={tryAgain} variant="secondary" icon={RefreshCcw} iconPosition="left" className="flex-1">
                Try Again
              </Button>
              <Button onClick={nextQuestion} icon={ArrowRight} className="flex-1">
                Next Question
              </Button>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
