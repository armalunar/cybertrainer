import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { LogOut, ChevronLeft } from "lucide-react";
import { teacherNotes, labSolutions } from "@/data/adminData";
import TerminalBlock from "@/components/TerminalBlock";

export default function AdminDayView() {
  const [, setLocation] = useLocation();
  const params = useParams<{ day: string }>();
  const day = parseInt(params.day || "1");

  const [activeTab, setActiveTab] = useState<"roteiro" | "solucoes">("roteiro");
  const [openBlock, setOpenBlock] = useState<number | null>(0);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

  const note = teacherNotes.find((n) => n.day === day);
  const solutions = labSolutions.filter((s) => {
    const labDay: Record<string, number> = {
      cap: 1, nibbles: 1, jerry: 1,
      forest: 2, active: 2,
      blackfield: 3,
    };
    return labDay[s.labId] === day;
  });

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setLocation("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      {/* Header */}
      <header
        style={{
          borderBottom: "1px solid #1a1a1a",
          background: "rgba(10,10,10,0.97)",
          position: "sticky",
          top: 0,
          zIndex: 50,
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
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() => setLocation("/admin/dashboard")}
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
              <ChevronLeft size={14} />
            </button>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#d4913a",
                border: "1px solid #3a2800",
                padding: "2px 8px",
                fontFamily: "monospace",
                letterSpacing: "0.08em",
              }}
            >
              PROFESSOR
            </span>
            <span style={{ color: "#666", fontSize: "0.82rem" }}>Dia {day}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #2a2a2a",
              color: "#555",
              cursor: "pointer",
              padding: "5px 10px",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.75rem",
            }}
          >
            <LogOut size={12} /> Sair
          </button>
        </div>
      </header>

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px 60px" }}>
        {note && (
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ margin: "0 0 6px 0", fontSize: "1.3rem", fontWeight: 700, color: "#e0e0e0" }}>
              {note.title}
            </h1>
            <p style={{ margin: 0, color: "#666", fontSize: "0.88rem", lineHeight: 1.6 }}>
              <strong style={{ color: "#888" }}>Objetivo:</strong> {note.objective}
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 1, marginBottom: 28, borderBottom: "1px solid #1a1a1a" }}>
          {(["roteiro", "solucoes"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #d4913a" : "2px solid transparent",
                padding: "10px 18px",
                cursor: "pointer",
                color: activeTab === tab ? "#d4913a" : "#555",
                fontSize: "0.82rem",
                letterSpacing: "0.05em",
                marginBottom: -1,
              }}
            >
              {tab === "roteiro" ? "Roteiro" : "Solucoes dos Labs"}
            </button>
          ))}
        </div>

        {/* Roteiro tab */}
        {activeTab === "roteiro" && note && (
          <div>
            {note.blocks.map((block, bi) => (
              <div
                key={bi}
                style={{
                  border: "1px solid #1e1e1e",
                  marginBottom: 10,
                  background: "#0d0d0d",
                }}
              >
                <button
                  onClick={() => setOpenBlock(openBlock === bi ? null : bi)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    padding: "14px 18px",
                    cursor: "pointer",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{block.title}</div>
                    <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 2 }}>{block.duration}</div>
                  </div>
                  <span style={{ color: "#444", fontSize: "1rem" }}>{openBlock === bi ? "−" : "+"}</span>
                </button>

                {openBlock === bi && (
                  <div style={{ padding: "0 18px 18px" }}>
                    <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, marginBottom: 16 }}>
                      {block.content.map((item, ci) => (
                        <div
                          key={ci}
                          style={{
                            color: "#888",
                            fontSize: "0.87rem",
                            padding: "7px 0 7px 14px",
                            borderLeft: "2px solid #1e1e1e",
                            marginBottom: 6,
                            lineHeight: 1.6,
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {block.questions && block.questions.length > 0 && (
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "#555",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            marginBottom: 10,
                          }}
                        >
                          Perguntas para a turma
                        </div>
                        {block.questions.map((q, qi) => (
                          <QuestionCard key={qi} ask={q.ask} expected={q.expected} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Solutions tab */}
        {activeTab === "solucoes" && (
          <div>
            {solutions.length === 0 && (
              <div style={{ color: "#444", fontSize: "0.88rem", padding: "16px 0" }}>
                Sem soluções detalhadas para este dia. Consulte os roteiros dos dias 1-3.
              </div>
            )}
            {solutions.map((sol) => (
              <SolutionCard key={sol.labId} solution={sol} />
            ))}

            {day === 2 && (
              <div style={{ marginTop: 8 }}>
                <div style={{ color: "#555", fontSize: "0.8rem", marginBottom: 12, padding: "10px 14px", background: "#0d0d0d", border: "1px solid #1e1e1e" }}>
                  Soluções completas de Forest e Active estao na base de dados. As mais frequentemente questionadas sao: Active (GPP password) e Forest (BloodHound path). Apresente no debrief noturno.
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function QuestionCard({ ask, expected }: { ask: string; expected: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        padding: "12px 14px",
        marginBottom: 8,
      }}
    >
      <div style={{ color: "#aaa", fontSize: "0.87rem", lineHeight: 1.5, marginBottom: 8 }}>
        Pergunta: <em style={{ color: "#c8c8c8" }}>{ask}</em>
      </div>
      {revealed ? (
        <div
          style={{
            color: "#4a9e8a",
            fontSize: "0.84rem",
            lineHeight: 1.5,
            padding: "8px 10px",
            background: "#061210",
            border: "1px solid #1a3a32",
          }}
        >
          Resposta esperada: {expected}
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#555",
            cursor: "pointer",
            padding: "4px 12px",
            fontSize: "0.75rem",
          }}
        >
          Revelar resposta esperada
        </button>
      )}
    </div>
  );
}

function SolutionCard({ solution }: { solution: import("@/data/adminData").LabSolution }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: "1px solid #1e1e1e", marginBottom: 10, background: "#0d0d0d" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "14px 18px",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.9rem" }}>{solution.name}</div>
          <div style={{ color: "#555", fontSize: "0.75rem", marginTop: 3 }}>
            {solution.steps.length} etapas — {solution.mitre.join(", ")}
          </div>
        </div>
        <span style={{ color: "#444" }}>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 20px" }}>
          <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16 }}>
            {solution.steps.map((step, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      background: "#111",
                      border: "1px solid #333",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      color: "#555",
                      flexShrink: 0,
                      fontFamily: "monospace",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ color: "#c8c8c8", fontWeight: 600, fontSize: "0.88rem" }}>{step.objective}</span>
                </div>
                <div
                  style={{
                    paddingLeft: 32,
                  }}
                >
                  <p style={{ color: "#777", fontSize: "0.84rem", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    {step.explanation}
                  </p>
                  {step.command && (
                    <TerminalBlock
                      lines={step.command.split("\n").map((line) => ({
                        type: line.startsWith("#") ? "comment" : "prompt",
                        text: line,
                      }))}
                      label="comando"
                    />
                  )}
                  {step.output && (
                    <div
                      style={{
                        background: "#000",
                        border: "1px solid #1a1a1a",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#aad4aa",
                        marginTop: 6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {step.output}
                    </div>
                  )}
                  {step.errors && (
                    <div
                      style={{
                        background: "#100808",
                        border: "1px solid #2a1010",
                        padding: "8px 12px",
                        fontFamily: "monospace",
                        fontSize: "0.8rem",
                        color: "#c06060",
                        marginTop: 6,
                      }}
                    >
                      ATENCAO: {step.errors}
                    </div>
                  )}
                  <div
                    style={{
                      marginTop: 8,
                      padding: "6px 10px",
                      background: "#061210",
                      border: "1px solid #1a3a32",
                      fontSize: "0.78rem",
                      color: "#4a9e8a",
                    }}
                  >
                    Confirmacao: {step.confirmation}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #1a1a1a" }}>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: "#555",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Tecnicas MITRE ATT&CK
              </div>
              {solution.mitre.map((m) => (
                <span
                  key={m}
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    color: "#d4913a",
                    border: "1px solid #3a2800",
                    padding: "2px 8px",
                    marginRight: 6,
                    marginBottom: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
