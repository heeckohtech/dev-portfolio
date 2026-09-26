"use client";

import { useState } from "react";

type Props = {
  brokenCode: string;
  hints: string[];
  solution: string;
  solutionExplanation: string;
};

export function BrokenCode({ brokenCode, hints, solution, solutionExplanation }: Props) {
  const [hintsShown, setHintsShown] = useState(0);
  const [solutionShown, setSolutionShown] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <pre
        style={{
          background: "var(--foreground)",
          color: "var(--background)",
          padding: "1.25rem",
          borderRadius: "2px",
          overflowX: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "0.875rem",
        }}
      >
        <code>{brokenCode}</code>
      </pre>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
          IDENTIFY THE PROBLEM, THEN FIX IT AND EXPLAIN THE FIX.
        </p>

        {hints.slice(0, hintsShown).map((hint, i) => (
          <div
            key={i}
            style={{ border: "1px solid var(--border)", borderRadius: "2px", padding: "0.75rem 1rem" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>
              HINT {i + 1}
            </span>
            <p style={{ marginTop: "0.25rem" }}>{hint}</p>
          </div>
        ))}

        {solutionShown && (
          <div style={{ border: "1px solid var(--accent)", borderRadius: "2px", padding: "1rem" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)" }}>
              SOLUTION
            </span>
            <pre
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
                padding: "1rem",
                borderRadius: "2px",
                marginTop: "0.5rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                overflowX: "auto",
              }}
            >
              <code>{solution}</code>
            </pre>
            <p style={{ marginTop: "0.75rem", color: "var(--muted)" }}>{solutionExplanation}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {hintsShown < hints.length && !solutionShown && (
            <button
              onClick={() => setHintsShown(hintsShown + 1)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                padding: "0.5rem 1rem",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                background: "none",
              }}
            >
              SHOW HINT {hintsShown + 1}
            </button>
          )}
          {!solutionShown && (
            <button
              onClick={() => setSolutionShown(true)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8125rem",
                padding: "0.5rem 1rem",
                border: "1px solid var(--accent)",
                color: "var(--accent)",
                borderRadius: "2px",
                background: "none",
              }}
            >
              SHOW SOLUTION
            </button>
          )}
        </div>
      </div>
    </div>
  );
}