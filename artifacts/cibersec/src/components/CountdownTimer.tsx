import { useState, useEffect, useRef } from "react";

interface CountdownTimerProps {
  initialMinutes: number;
  label?: string;
}

function playBeep() {
  try {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.value = 880;
    oscillator.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.6);
  } catch {}
}

export default function CountdownTimer({ initialMinutes, label }: CountdownTimerProps) {
  const totalSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [expired, setExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setRunning(false);
            setExpired(true);
            playBeep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, secondsLeft]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

  const isWarning = secondsLeft <= 5 * 60 && secondsLeft > 0;
  const timeColor = expired ? "#e06060" : isWarning ? "#d4913a" : "#4a9e8a";

  const reset = () => {
    setRunning(false);
    setExpired(false);
    setSecondsLeft(totalSeconds);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return (
    <div
      style={{
        border: "1px solid #222",
        background: "#0d0d0d",
        padding: "16px 20px",
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        minWidth: 200,
      }}
    >
      {label && (
        <span style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </span>
      )}
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "2.4rem",
          fontWeight: 600,
          color: timeColor,
          letterSpacing: "0.05em",
          transition: "color 0.3s",
        }}
      >
        {display}
      </div>
      {expired && (
        <span style={{ color: "#e06060", fontSize: "0.75rem", letterSpacing: "0.06em" }}>TEMPO ESGOTADO</span>
      )}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setRunning((r) => !r)}
          disabled={expired || secondsLeft === 0}
          style={{
            background: running ? "#1a1a1a" : "#4a9e8a",
            color: running ? "#888" : "#0a0a0a",
            border: "1px solid #333",
            padding: "5px 14px",
            cursor: expired ? "not-allowed" : "pointer",
            fontSize: "0.78rem",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          {running ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={reset}
          style={{
            background: "none",
            color: "#555",
            border: "1px solid #2a2a2a",
            padding: "5px 14px",
            cursor: "pointer",
            fontSize: "0.78rem",
            fontFamily: "monospace",
            letterSpacing: "0.04em",
          }}
        >
          Resetar
        </button>
      </div>
    </div>
  );
}
