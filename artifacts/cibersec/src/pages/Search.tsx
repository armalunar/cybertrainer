import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { slides } from "@/data/courseData";

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: "#1e3a2a", color: "#4a9e8a" }}>{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function searchInSlide(slide: (typeof slides)[0], q: string): boolean {
  const lower = q.toLowerCase();
  if (slide.title.toLowerCase().includes(lower)) return true;
  if (slide.topic.toLowerCase().includes(lower)) return true;
  const c = slide.content;
  if (c.theory?.some((t) => t.toLowerCase().includes(lower))) return true;
  if (c.commands?.some((cmd) => cmd.toLowerCase().includes(lower))) return true;
  if (c.tips?.some((t) => t.toLowerCase().includes(lower))) return true;
  if (c.terminal?.some((l) => l.text.toLowerCase().includes(lower))) return true;
  if (c.table?.rows.some((r) => r.some((cell) => cell.toLowerCase().includes(lower)))) return true;
  if (c.checklist?.some((item) => item.toLowerCase().includes(lower))) return true;
  return false;
}

const dayLabel = ["", "Dia 1", "Dia 2", "Dia 3", "Dia 4"];
const dayColor = ["", "#4a9e8a", "#6a8ecb", "#d4913a", "#888"];

export default function Search() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");

  const results = query.trim().length >= 2 ? slides.filter((s) => searchInSlide(s, query.trim())) : [];

  const goToSlide = (slide: (typeof slides)[0]) => {
    const daySlides = slides.filter((s) => s.day === slide.day);
    const idx = daySlides.findIndex((s) => s.id === slide.id);
    if (idx !== -1) {
      localStorage.setItem(`progress_day_${slide.day}`, String(idx));
    }
    setLocation(`/dia/${slide.day}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,10,10,0.96)",
          borderBottom: "1px solid #1a1a1a",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 24px",
            height: 52,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
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
          >
            <ArrowLeft size={14} />
          </button>
          <span style={{ color: "#555", fontSize: "0.8rem" }}>Busca</span>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
        {/* Search input */}
        <div style={{ position: "relative", marginBottom: 32 }}>
          <SearchIcon
            size={16}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#444",
            }}
          />
          <input
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por tópico, comando, conceito..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#0d0d0d",
              border: "1px solid #2a2a2a",
              borderRadius: 0,
              padding: "12px 16px 12px 42px",
              fontSize: "0.95rem",
              color: "#e0e0e0",
              outline: "none",
              fontFamily: "inherit",
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor = "#4a9e8a";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor = "#2a2a2a";
            }}
          />
        </div>

        {/* Results */}
        {query.trim().length >= 2 && (
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "#555",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              {results.length} resultado{results.length !== 1 ? "s" : ""} para "{query}"
            </div>

            {results.length === 0 && (
              <div style={{ color: "#444", fontSize: "0.9rem", padding: "20px 0" }}>
                Nenhum resultado. Tente termos mais curtos ou em inglês.
              </div>
            )}

            {results.map((slide) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(slide)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "#0d0d0d",
                  border: "1px solid #1a1a1a",
                  padding: "16px 18px",
                  marginBottom: 8,
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#333";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#1a1a1a";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: dayColor[slide.day],
                      border: `1px solid ${dayColor[slide.day]}`,
                      padding: "1px 6px",
                      fontFamily: "monospace",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {dayLabel[slide.day]}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      color: "#555",
                      border: "1px solid #2a2a2a",
                      padding: "1px 6px",
                    }}
                  >
                    {slide.topic}
                  </span>
                </div>
                <div style={{ color: "#d0d0d0", fontSize: "0.92rem", fontWeight: 500 }}>
                  {highlight(slide.title, query)}
                </div>
                {slide.content.theory?.[0] && (
                  <div
                    style={{
                      color: "#555",
                      fontSize: "0.8rem",
                      marginTop: 6,
                      lineHeight: 1.5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {slide.content.theory[0].slice(0, 120)}
                    {slide.content.theory[0].length > 120 ? "..." : ""}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {query.trim().length < 2 && (
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                color: "#444",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Tópicos disponíveis
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {Array.from(new Set(slides.map((s) => s.topic))).map((topic) => (
                <button
                  key={topic}
                  onClick={() => setQuery(topic)}
                  style={{
                    background: "none",
                    border: "1px solid #222",
                    color: "#666",
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
