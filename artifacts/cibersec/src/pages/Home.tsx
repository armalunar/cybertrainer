import { useLocation } from "wouter";
import { slides, labs } from "@/data/courseData";

const dayMeta = [
  {
    day: 1,
    title: "Dia 1 — Fundamentos",
    subtitle: "Redes, Linux, HTTP, Nmap, Wireshark, Web",
    color: "#4a9e8a",
    machines: ["Cap", "Nibbles", "Jerry", "Devel", "Blue", "Lame"],
  },
  {
    day: 2,
    title: "Dia 2 — Intermediário",
    subtitle: "Wazuh, Active Directory, Forense de Disco, PCAP",
    color: "#6a8ecb",
    machines: ["Forest", "Sauna", "Active", "Monteverde", "Cascade", "Cronos"],
  },
  {
    day: 3,
    title: "Dia 3 — Avançado",
    subtitle: "Memória, Malware, MITRE ATT&CK, Privilege Escalation",
    color: "#d4913a",
    machines: ["Blackfield", "Sizzle", "Querier", "Mantis", "Reel2", "Multimaster"],
  },
  {
    day: 4,
    title: "Dia 4 — Revisão Final",
    subtitle: "Checklist, Cheat Sheet, Relatório, Speed Runs",
    color: "#888",
    machines: ["Speed runs de todas as máquinas anteriores"],
  },
];

export default function Home() {
  const [, setLocation] = useLocation();

  const getProgress = (day: number) => {
    const saved = localStorage.getItem(`progress_day_${day}`);
    const total = slides.filter((s) => s.day === day).length;
    if (!saved || total === 0) return 0;
    return Math.round((parseInt(saved) / (total - 1)) * 100);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ paddingTop: 64, paddingBottom: 48, borderBottom: "1px solid #1a1a1a" }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: "#4a9e8a",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Hack The Box Academy — Treinamento Intensivo
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 700,
              color: "#e0e0e0",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Intensivo Olímpico de Cibersegurança
          </h1>
          <p style={{ color: "#666", marginTop: 12, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: 600 }}>
            4 dias de treinamento intensivo cobrindo fundamentos de redes, forense digital, Active Directory, análise de memória, malware e CTF competitivo.
          </p>
        </div>

        {/* Ethical disclaimer */}
        <div
          style={{
            margin: "28px 0",
            padding: "14px 18px",
            background: "#0e0e0e",
            border: "1px solid #252525",
            borderLeft: "3px solid #555",
          }}
        >
          <p style={{ margin: 0, color: "#666", fontSize: "0.82rem", lineHeight: 1.6 }}>
            <strong style={{ color: "#888" }}>Aviso legal:</strong> Este material é destinado exclusivamente a estudo, CTFs, Hack The Box, laboratórios próprios e ambientes com autorização explícita. Nunca utilize estas técnicas contra sistemas sem permissão expressa. O uso não autorizado é crime previsto na Lei nº 12.737/2012.
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "#1a1a1a",
            marginBottom: 40,
          }}
        >
          {[
            { label: "Dias de conteúdo", value: "4" },
            { label: "Slides + Labs", value: String(slides.length + labs.length) },
            { label: "Máquinas HTB", value: String(labs.length) },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{ background: "#0a0a0a", padding: "16px 20px", textAlign: "center" }}
            >
              <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#e0e0e0", fontFamily: "monospace" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#555", letterSpacing: "0.05em", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Day cards */}
        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: "0.72rem",
              color: "#555",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Selecione o dia
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 12 }}>
            {dayMeta.map((d) => {
              const progress = getProgress(d.day);
              const daySlides = slides.filter((s) => s.day === d.day);
              const dayLabs = labs.filter((l) => l.day === d.day);

              return (
                <button
                  key={d.day}
                  onClick={() => setLocation(`/dia/${d.day}`)}
                  style={{
                    background: "#0d0d0d",
                    border: "1px solid #1e1e1e",
                    padding: "22px 24px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "border-color 0.15s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = d.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "#1e1e1e";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: d.color,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        fontFamily: "monospace",
                      }}
                    >
                      DIA {d.day}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "#444", fontFamily: "monospace" }}>
                      {progress}% concluído
                    </span>
                  </div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: "#e0e0e0", marginBottom: 6 }}>
                    {d.title.split("—")[1]?.trim() || d.title}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.5, marginBottom: 14 }}>
                    {d.subtitle}
                  </div>

                  {/* Progress bar */}
                  <div style={{ height: 2, background: "#1a1a1a", marginBottom: 14 }}>
                    <div
                      style={{
                        height: "100%",
                        background: d.color,
                        width: `${progress}%`,
                        transition: "width 0.3s",
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 12, fontSize: "0.72rem", color: "#444" }}>
                    <span>{daySlides.length} slides</span>
                    <span>{dayLabs.length} labs</span>
                  </div>

                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {d.machines.slice(0, 5).map((m) => (
                      <span
                        key={m}
                        style={{
                          fontSize: "0.68rem",
                          color: "#444",
                          border: "1px solid #1e1e1e",
                          padding: "1px 6px",
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
