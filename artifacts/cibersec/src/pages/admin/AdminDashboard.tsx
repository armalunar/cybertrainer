import { useEffect } from "react";
import { useLocation } from "wouter";
import { LogOut, BookOpen } from "lucide-react";

const dayMeta = [
  {
    day: 1,
    title: "Dia 1 — Fundamentos Intensivos",
    desc: "10h30: método, redes TCP/IP, Nmap profundo, HTTP, SSH, FTP, SMB, Linux, Windows Event IDs, Wireshark e Web",
    labs: ["Cap", "Nibbles", "Jerry", "Devel", "Blue", "Lame"],
    color: "#4a9e8a",
  },
  {
    day: 2,
    title: "Dia 2 — Intermediário Intensivo",
    desc: "10h30: Wazuh, Windows Logs, Sysmon, Active Directory, Kerberos, Forense de Disco e PCAP",
    labs: ["Forest", "Sauna", "Active", "Monteverde", "Cascade", "Cronos"],
    color: "#6a8ecb",
  },
  {
    day: 3,
    title: "Dia 3 — Avançado Intensivo",
    desc: "10h30: Volatility, análise de malware, MITRE ATT&CK, privilege escalation e AD avançado",
    labs: ["Blackfield", "Sizzle", "Querier", "Mantis", "Reel2", "Multimaster"],
    color: "#d4913a",
  },
  {
    day: 4,
    title: "Dia 4 — Revisão e Simulado",
    desc: "10h30: checklist de incidente, comandos explicados, relatório, simulados e speed runs com cronômetro",
    labs: ["Speed runs — todas as máquinas anteriores"],
    color: "#888",
  },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      setLocation("/admin");
    }
  }, [setLocation]);

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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
            <span style={{ color: "#555", fontSize: "0.82rem" }}>Painel do Professor</span>
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

      <main style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ margin: "0 0 8px 0", fontSize: "1.4rem", fontWeight: 700, color: "#e0e0e0" }}>
            Painel do Professor
          </h1>
          <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6, maxWidth: 560 }}>
            Aqui estão os roteiros de 10h+ por dia, objetivos por bloco, perguntas para a turma, exercícios de fixação e soluções didáticas dos labs. Este conteúdo é exclusivo para o professor.
          </p>
        </div>

        {/* How to use */}
        <div
          style={{
            background: "#0d0d0d",
            border: "1px solid #1e1e1e",
            padding: "20px 24px",
            marginBottom: 32,
          }}
        >
          <h2 style={{ margin: "0 0 12px 0", fontSize: "0.9rem", color: "#d4913a", letterSpacing: "0.04em" }}>
            Como usar este painel
          </h2>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {[
              "Cada dia tem um roteiro mínimo de 10h30 com teoria, prática, labs e entregas obrigatórias.",
              "Os blocos incluem objetivos, instruções de condução, perguntas para a turma e respostas esperadas.",
              "As soluções dos labs são detalhadas — apresente somente no debrief, nunca antes.",
              "Os alunos veem apenas o conteúdo da area de estudo (/). Este painel não é acessível por eles.",
              "Use as perguntas para engajar antes de revelar o conteúdo — o aprendizado ativo é mais eficaz.",
            ].map((item, i) => (
              <li
                key={i}
                style={{
                  color: "#777",
                  fontSize: "0.85rem",
                  padding: "6px 0 6px 14px",
                  borderLeft: "2px solid #1e1e1e",
                  marginBottom: 6,
                  lineHeight: 1.6,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Day cards */}
        <div
          style={{
            fontSize: "0.72rem",
            color: "#555",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Roteiros por dia
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {dayMeta.map((d) => (
            <button
              key={d.day}
              onClick={() => setLocation(`/admin/dia/${d.day}`)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                background: "#0d0d0d",
                border: "1px solid #1e1e1e",
                padding: "18px 20px",
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
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "#111",
                  border: `1px solid ${d.color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontFamily: "monospace",
                  fontSize: "0.8rem",
                  color: d.color,
                }}
              >
                {d.day}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#d0d0d0", fontWeight: 600, fontSize: "0.95rem", marginBottom: 4 }}>
                  {d.title}
                </div>
                <div style={{ color: "#555", fontSize: "0.82rem", lineHeight: 1.5, marginBottom: 10 }}>
                  {d.desc}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {d.labs.slice(0, 6).map((lab) => (
                    <span
                      key={lab}
                      style={{
                        fontSize: "0.68rem",
                        color: "#444",
                        border: "1px solid #1e1e1e",
                        padding: "1px 6px",
                      }}
                    >
                      {lab}
                    </span>
                  ))}
                </div>
              </div>
              <BookOpen size={16} style={{ color: "#333", flexShrink: 0, marginTop: 2 }} />
            </button>
          ))}
        </div>

        <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #1a1a1a" }}>
          <button
            onClick={() => setLocation("/")}
            style={{
              background: "none",
              border: "1px solid #222",
              color: "#555",
              cursor: "pointer",
              padding: "8px 16px",
              fontSize: "0.8rem",
            }}
          >
            Ver curso como aluno
          </button>
        </div>
      </main>
    </div>
  );
}
