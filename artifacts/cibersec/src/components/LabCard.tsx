import CountdownTimer from "./CountdownTimer";
import type { Lab } from "@/data/courseData";
import { ExternalLink } from "lucide-react";

const difficultyColor: Record<string, string> = {
  Easy: "#4a9e8a",
  Medium: "#d4913a",
  Hard: "#c0504d",
  Insane: "#9b59b6",
};

interface LabCardProps {
  lab: Lab;
}

function getHackTheBoxMachineUrl(lab: Lab) {
  const machineName = lab.name.replace(/\s*\(.+\)\s*$/, "").trim();
  return `https://app.hackthebox.com/machines/${encodeURIComponent(machineName)}`;
}

export default function LabCard({ lab }: LabCardProps) {
  const hackTheBoxUrl = getHackTheBoxMachineUrl(lab);

  return (
    <div
      style={{
        border: "1px solid #1e1e1e",
        background: "#0d0d0d",
        padding: "20px 24px",
        marginBottom: 16,
      }}
      data-testid={`lab-card-${lab.id}`}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: 600,
              color: "#e0e0e0",
              letterSpacing: "0.02em",
            }}
          >
            {lab.name}
          </h3>
          <div style={{ display: "flex", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
            <span
              style={{
                fontSize: "0.7rem",
                color: difficultyColor[lab.difficulty] || "#888",
                border: `1px solid ${difficultyColor[lab.difficulty] || "#888"}`,
                padding: "1px 8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {lab.difficulty}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                color: "#666",
                border: "1px solid #333",
                padding: "1px 8px",
                letterSpacing: "0.04em",
              }}
            >
              {lab.os}
            </span>
            {lab.timed && lab.timerMinutes && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#d4913a",
                  border: "1px solid #3a2800",
                  padding: "1px 8px",
                  letterSpacing: "0.04em",
                }}
              >
                {lab.timerMinutes} min
              </span>
            )}
            {!lab.timed && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#555",
                  border: "1px solid #2a2a2a",
                  padding: "1px 8px",
                  letterSpacing: "0.04em",
                }}
              >
                Sem limite
              </span>
            )}
          </div>
        </div>
      </div>

      <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.6, margin: "0 0 12px 0" }}>
        {lab.description}
      </p>

      <a
        href={hackTheBoxUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          color: "#0a0a0a",
          background: "#4a9e8a",
          border: "1px solid #4a9e8a",
          padding: "7px 11px",
          fontSize: "0.78rem",
          fontWeight: 700,
          textDecoration: "none",
          marginBottom: 14,
        }}
      >
        Abrir no Hack The Box <ExternalLink size={13} />
      </a>

      <div style={{ marginBottom: 12 }}>
        <span style={{ color: "#555", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Tópicos:
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {lab.topics.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.72rem",
                color: "#666",
                background: "#141414",
                border: "1px solid #222",
                padding: "2px 8px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <details style={{ marginBottom: 12 }}>
        <summary
          style={{
            cursor: "pointer",
            color: "#555",
            fontSize: "0.8rem",
            letterSpacing: "0.04em",
            userSelect: "none",
            padding: "6px 0",
          }}
        >
          Dica inicial (sem spoiler)
        </summary>
        <p
          style={{
            color: "#777",
            fontSize: "0.85rem",
            margin: "8px 0 0 0",
            padding: "10px",
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
            lineHeight: 1.6,
          }}
        >
          {lab.hint}
        </p>
      </details>

      {lab.timed && lab.timerMinutes && (
        <div style={{ marginTop: 16 }}>
          <CountdownTimer initialMinutes={lab.timerMinutes} label={`Cronômetro — ${lab.timerMinutes} min`} />
        </div>
      )}
    </div>
  );
}
