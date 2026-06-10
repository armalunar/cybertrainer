import { useState } from "react";
import { useLocation } from "wouter";

const ADMIN_PASSWORD = "123456";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      setLocation("/admin/dashboard");
    } else {
      setError(true);
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div
            style={{
              fontSize: "0.65rem",
              color: "#4a9e8a",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 10,
              fontFamily: "monospace",
            }}
          >
            Area Restrita
          </div>
          <h1 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 700, color: "#e0e0e0" }}>
            Painel do Professor
          </h1>
          <p style={{ color: "#555", fontSize: "0.82rem", marginTop: 8 }}>
            Acesso restrito. Insira a senha para continuar.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#0d0d0d",
            border: `1px solid ${error ? "#3a1a1a" : "#1e1e1e"}`,
            padding: "28px 24px",
            animation: shake ? "shake 0.35s ease" : "none",
          }}
        >
          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20% { transform: translateX(-8px); }
              40% { transform: translateX(8px); }
              60% { transform: translateX(-5px); }
              80% { transform: translateX(5px); }
            }
          `}</style>

          <label
            style={{
              display: "block",
              fontSize: "0.72rem",
              color: "#555",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Senha
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
            autoComplete="current-password"
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#0a0a0a",
              border: `1px solid ${error ? "#5a2020" : "#2a2a2a"}`,
              borderRadius: 0,
              padding: "10px 14px",
              fontSize: "1rem",
              color: "#e0e0e0",
              outline: "none",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
              marginBottom: error ? 8 : 20,
            }}
            onFocus={(e) => {
              if (!error) (e.target as HTMLElement).style.borderColor = "#4a9e8a";
            }}
            onBlur={(e) => {
              if (!error) (e.target as HTMLElement).style.borderColor = "#2a2a2a";
            }}
          />

          {error && (
            <div
              style={{
                color: "#c05050",
                fontSize: "0.8rem",
                marginBottom: 16,
                fontFamily: "monospace",
              }}
            >
              Senha incorreta.
            </div>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#4a9e8a",
              color: "#0a0a0a",
              border: "none",
              padding: "10px",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: "0.06em",
              fontFamily: "inherit",
            }}
          >
            Entrar
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            onClick={() => setLocation("/")}
            style={{
              background: "none",
              border: "none",
              color: "#444",
              cursor: "pointer",
              fontSize: "0.8rem",
            }}
          >
            Voltar ao curso
          </button>
        </div>
      </div>
    </div>
  );
}
