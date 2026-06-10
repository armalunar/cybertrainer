import { useState } from "react";
import { Copy, Check } from "lucide-react";
import type { TerminalLine } from "@/data/courseData";

interface TerminalBlockProps {
  lines: TerminalLine[];
  label?: string;
}

export default function TerminalBlock({ lines, label = "terminal" }: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const commands = lines
    .filter((l) => l.type === "prompt")
    .map((l) => l.text)
    .join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(commands);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: "#000",
        border: "1px solid #222",
        borderRadius: 0,
        overflow: "hidden",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        lineHeight: "1.6",
      }}
    >
      <div
        style={{
          background: "#111",
          borderBottom: "1px solid #222",
          padding: "6px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          {label}
        </span>
        <button
          onClick={handleCopy}
          style={{
            background: "none",
            border: "1px solid #333",
            borderRadius: 2,
            padding: "2px 8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 4,
            color: "#666",
            fontSize: "0.7rem",
          }}
          title="Copiar comandos"
        >
          {copied ? <Check size={12} style={{ color: "#4a9e8a" }} /> : <Copy size={12} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <div style={{ padding: "14px 16px" }}>
        {lines.map((line, i) => {
          if (line.text === "") return <div key={i} style={{ height: "0.4rem" }} />;
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", marginBottom: 2 }}>
              {line.type === "prompt" && (
                <>
                  <span style={{ color: "#4a9e8a", marginRight: 8, userSelect: "none", flexShrink: 0 }}>$</span>
                  <span style={{ color: "#d6f5d6", wordBreak: "break-all" }}>{line.text}</span>
                </>
              )}
              {line.type === "output" && (
                <span style={{ color: "#aad4aa", paddingLeft: 20, wordBreak: "break-all" }}>{line.text}</span>
              )}
              {line.type === "error" && (
                <span style={{ color: "#e06060", paddingLeft: 20, wordBreak: "break-all" }}>{line.text}</span>
              )}
              {line.type === "comment" && (
                <span style={{ color: "#555", paddingLeft: 20, fontStyle: "italic", wordBreak: "break-all" }}>
                  {line.text}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface InlineCommandProps {
  cmd: string;
}

export function InlineCommand({ cmd }: InlineCommandProps) {
  return (
    <code
      style={{
        background: "#0d0d0d",
        border: "1px solid #222",
        borderRadius: 2,
        padding: "1px 6px",
        fontFamily: "monospace",
        fontSize: "0.83em",
        color: "#d6f5d6",
      }}
    >
      {cmd}
    </code>
  );
}
