import { useState, useEffect, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { ChevronLeft, ChevronRight, Search, Home } from "lucide-react";
import { slides, labs } from "@/data/courseData";
import TerminalBlock from "@/components/TerminalBlock";
import LabCard from "@/components/LabCard";
import CountdownTimer from "@/components/CountdownTimer";
import type { Slide } from "@/data/courseData";

const topicColor: Record<string, string> = {
  Redes: "#4a9e8a",
  Web: "#6a8ecb",
  Linux: "#a0c87a",
  Windows: "#b0a0d8",
  Forense: "#d4913a",
  "Blue Team": "#5ba4cf",
  "Active Directory": "#e07b54",
  Ferramentas: "#888",
  Malware: "#c0504d",
  MITRE: "#d4913a",
  "Red Team": "#c0504d",
  CTF: "#4a9e8a",
  Revisão: "#888",
  Labs: "#555",
};

function SlideRenderer({ slide, daySlides }: { slide: Slide; daySlides: Slide[] }) {
  const dayLabs = labs.filter((l) => l.day === slide.day);

  if (slide.type === "lab") {
    return (
      <div>
        {slide.content.note && (
          <div
            style={{
              padding: "12px 16px",
              background: "#0e0e0e",
              border: "1px solid #222",
              borderLeft: "3px solid #4a9e8a",
              marginBottom: 24,
              fontSize: "0.85rem",
              color: "#777",
              lineHeight: 1.6,
            }}
          >
            {slide.content.note}
          </div>
        )}
        {dayLabs.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>
    );
  }

  if (slide.type === "checklist") {
    return <ChecklistSlide slide={slide} />;
  }

  if (slide.type === "cheatsheet") {
    return (
      <div>
        <TerminalBlock
          lines={(slide.content.commands || []).map((c) => ({
            type: c.startsWith("#") ? "comment" : c === "" ? "output" : "prompt",
            text: c,
          }))}
          label="cheat-sheet"
        />
      </div>
    );
  }

  return (
    <div style={{ lineHeight: 1.75 }}>
      {/* Theory list */}
      {slide.content.theory && (
        <ul style={{ paddingLeft: 0, listStyle: "none", margin: "0 0 24px 0" }}>
          {slide.content.theory.map((item, i) => (
            <li
              key={i}
              style={{
                color: "#c0c0c0",
                fontSize: "0.95rem",
                marginBottom: 10,
                paddingLeft: 16,
                borderLeft: "2px solid #1e1e1e",
                lineHeight: 1.65,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      {/* Table */}
      {slide.content.table && (
        <div style={{ overflowX: "auto", marginBottom: 24 }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "0.85rem",
              fontFamily: "monospace",
            }}
          >
            <thead>
              <tr>
                {slide.content.table.headers.map((h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      padding: "8px 12px",
                      borderBottom: "1px solid #2a2a2a",
                      color: "#555",
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "#0d0d0d",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.content.table.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      style={{
                        padding: "7px 12px",
                        borderBottom: "1px solid #161616",
                        color: j === 0 ? "#d6f5d6" : j === 1 ? "#6a8ecb" : "#888",
                        fontFamily: j === 0 ? "monospace" : "inherit",
                        fontSize: j === 0 ? "0.85rem" : "0.83rem",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Commands */}
      {slide.content.commands && slide.content.commands.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <TerminalBlock
            lines={slide.content.commands.map((c) => ({
              type: c.startsWith("#") ? "comment" : c === "" ? "output" : "prompt",
              text: c,
            }))}
            label="comandos"
          />
        </div>
      )}

      {/* Terminal */}
      {slide.content.terminal && (
        <div style={{ marginBottom: 24 }}>
          <TerminalBlock lines={slide.content.terminal} label="terminal" />
        </div>
      )}

      {/* Tips */}
      {slide.content.tips && (
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: "0.68rem",
              color: "#555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Pontos-chave
          </div>
          {slide.content.tips.map((tip, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 8,
                padding: "8px 12px",
                background: "#0d0d0d",
                border: "1px solid #1a1a1a",
              }}
            >
              <span style={{ color: "#4a9e8a", flexShrink: 0, fontSize: "0.8rem", marginTop: 1 }}>—</span>
              <span style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.55 }}>{tip}</span>
            </div>
          ))}
        </div>
      )}

      {/* Note */}
      {slide.content.note && (
        <div
          style={{
            padding: "12px 16px",
            background: "#0e0e0e",
            border: "1px solid #222",
            borderLeft: "3px solid #555",
            fontSize: "0.85rem",
            color: "#777",
            lineHeight: 1.6,
          }}
        >
          {slide.content.note}
        </div>
      )}
    </div>
  );
}

function ChecklistSlide({ slide }: { slide: Slide }) {
  const storageKey = `checklist_${slide.id}`;
  const [checked, setChecked] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch {}
    return (slide.content.checklist || []).map(() => false);
  });

  const toggle = (i: number) => {
    const next = checked.map((v, idx) => (idx === i ? !v : v));
    setChecked(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const doneCount = checked.filter(Boolean).length;
  const total = (slide.content.checklist || []).length;

  return (
    <div>
      {slide.content.theory && (
        <ul style={{ paddingLeft: 0, listStyle: "none", margin: "0 0 18px 0" }}>
          {slide.content.theory.map((item, i) => (
            <li
              key={i}
              style={{
                color: "#c0c0c0",
                fontSize: "0.95rem",
                marginBottom: 10,
                paddingLeft: 16,
                borderLeft: "2px solid #1e1e1e",
                lineHeight: 1.65,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginBottom: 16, fontSize: "0.75rem", color: "#555", fontFamily: "monospace" }}>
        {doneCount}/{total} respondidas
      </div>
      {(slide.content.checklist || []).map((item, i) => (
        <label
          key={i}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
            padding: "12px",
            marginBottom: 6,
            background: checked[i] ? "#0d120d" : "#0d0d0d",
            border: `1px solid ${checked[i] ? "#1e3a1e" : "#1a1a1a"}`,
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <input
            type="checkbox"
            checked={checked[i]}
            onChange={() => toggle(i)}
            style={{ marginTop: 3, accentColor: "#4a9e8a", flexShrink: 0, cursor: "pointer" }}
          />
          <span
            style={{
              color: checked[i] ? "#4a9e8a" : "#aaa",
              fontSize: "0.9rem",
              lineHeight: 1.5,
              textDecoration: checked[i] ? "line-through" : "none",
              opacity: checked[i] ? 0.7 : 1,
            }}
          >
            {item}
          </span>
        </label>
      ))}
      {slide.content.tips && (
        <div style={{ marginTop: 18 }}>
          {slide.content.tips.map((tip, i) => (
            <div
              key={i}
              style={{
                padding: "10px 12px",
                background: "#0d0d0d",
                border: "1px solid #1a1a1a",
                color: "#888",
                fontSize: "0.86rem",
                lineHeight: 1.55,
              }}
            >
              {tip}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DayView() {
  const params = useParams<{ day: string }>();
  const [, setLocation] = useLocation();
  const day = parseInt(params.day || "1");

  const daySlides = slides.filter((s) => s.day === day);

  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem(`progress_day_${day}`);
    return saved ? Math.min(parseInt(saved), daySlides.length - 1) : 0;
  });

  const save = useCallback(
    (idx: number) => {
      localStorage.setItem(`progress_day_${day}`, String(idx));
    },
    [day]
  );

  const go = useCallback(
    (idx: number) => {
      const clamped = Math.max(0, Math.min(daySlides.length - 1, idx));
      setCurrent(clamped);
      save(clamped);
    },
    [daySlides.length, save]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(current + 1);
      if (e.key === "ArrowLeft") go(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, go]);

  const slide = daySlides[current];
  if (!slide) {
    return (
      <div style={{ padding: 40, color: "#666" }}>
        Dia {day} não encontrado.{" "}
        <button onClick={() => setLocation("/")} style={{ color: "#4a9e8a", background: "none", border: "none", cursor: "pointer" }}>
          Voltar
        </button>
      </div>
    );
  }

  const progress = Math.round((current / Math.max(daySlides.length - 1, 1)) * 100);
  const tc = topicColor[slide.topic] || "#666";

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)", display: "flex", flexDirection: "column" }}>
      {/* Top nav */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,10,10,0.96)",
          backdropFilter: "blur(6px)",
          borderBottom: "1px solid #1a1a1a",
        }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 52,
              gap: 12,
            }}
          >
            {/* Left: nav */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => setLocation("/")}
                style={{
                  background: "none",
                  border: "1px solid #222",
                  cursor: "pointer",
                  color: "#555",
                  padding: "5px 8px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Início"
              >
                <Home size={14} />
              </button>
              {[1, 2, 3, 4].map((d) => (
                <button
                  key={d}
                  onClick={() => setLocation(`/dia/${d}`)}
                  style={{
                    background: "none",
                    border: d === day ? "1px solid #4a9e8a" : "1px solid #1e1e1e",
                    cursor: "pointer",
                    color: d === day ? "#4a9e8a" : "#555",
                    padding: "4px 10px",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    letterSpacing: "0.04em",
                  }}
                >
                  Dia {d}
                </button>
              ))}
            </div>

            {/* Right: search + counter */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#444" }}>
                {current + 1} / {daySlides.length}
              </span>
              <button
                onClick={() => setLocation("/busca")}
                style={{
                  background: "none",
                  border: "1px solid #222",
                  cursor: "pointer",
                  color: "#555",
                  padding: "5px 8px",
                  display: "flex",
                  alignItems: "center",
                }}
                title="Buscar"
              >
                <Search size={14} />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 2, background: "#111" }}>
            <div
              style={{
                height: "100%",
                background: tc,
                width: `${progress}%`,
                transition: "width 0.2s",
              }}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ flex: 1, maxWidth: 860, width: "100%", margin: "0 auto", padding: "32px 24px 120px" }}>
        {/* Slide header */}
        <div style={{ marginBottom: 28 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: "0.68rem",
                color: tc,
                border: `1px solid ${tc}`,
                padding: "2px 8px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontFamily: "monospace",
              }}
            >
              {slide.topic}
            </span>
            <span style={{ fontSize: "0.68rem", color: "#333", fontFamily: "monospace" }}>
              {slide.type}
            </span>
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              fontWeight: 700,
              color: "#e0e0e0",
              lineHeight: 1.3,
            }}
          >
            {slide.title}
          </h1>
        </div>

        <SlideRenderer slide={slide} daySlides={daySlides} />
      </main>

      {/* Bottom nav */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(10,10,10,0.97)",
          borderTop: "1px solid #1a1a1a",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => go(current - 1)}
          disabled={current === 0}
          style={{
            background: "none",
            border: "1px solid #222",
            cursor: current === 0 ? "not-allowed" : "pointer",
            color: current === 0 ? "#333" : "#888",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.8rem",
          }}
        >
          <ChevronLeft size={14} /> Anterior
        </button>

        {/* Slide dots (show up to 9) */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {daySlides.slice(0, 20).map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              title={daySlides[i].title}
              style={{
                width: i === current ? 18 : 6,
                height: 6,
                background: i === current ? tc : i < current ? "#333" : "#1e1e1e",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.2s, background 0.15s",
              }}
            />
          ))}
          {daySlides.length > 20 && (
            <span style={{ fontSize: "0.65rem", color: "#333" }}>+{daySlides.length - 20}</span>
          )}
        </div>

        <button
          onClick={() => go(current + 1)}
          disabled={current === daySlides.length - 1}
          style={{
            background: current === daySlides.length - 1 ? "none" : tc,
            border: `1px solid ${current === daySlides.length - 1 ? "#222" : tc}`,
            cursor: current === daySlides.length - 1 ? "not-allowed" : "pointer",
            color: current === daySlides.length - 1 ? "#333" : "#0a0a0a",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          Próximo <ChevronRight size={14} />
        </button>
      </nav>
    </div>
  );
}
