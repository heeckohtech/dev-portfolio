import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch by email or find my work on GitHub.",
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="container prose"
      style={{
        paddingBlock: "4rem",
        maxWidth: "42rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h1)",
          marginBottom: "1rem",
        }}
      >
        Let&apos;s talk
      </h1>

      <p
        style={{
          color: "var(--muted)",
          marginBottom: "3rem",
          maxWidth: "36rem",
        }}
      >
        Whether it concerns a project, a possible collaboration, or simply a
        question about something I have written or built, I would be glad to
        hear from you.
      </p>

      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <a
          href="mailto:heeckohtech@gmail.com"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            padding: "1.5rem",
            borderBottom: "1px solid var(--border)",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Email
          </span>

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
              color: "var(--accent)",
            }}
          >
            heeckohtech@gmail.com
          </span>
        </a>

        <a
          href="https://github.com/heeckohtech"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            padding: "1.5rem",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            GitHub
          </span>

          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.25rem",
            }}
          >
            github.com/heeckohtech
          </span>
        </a>
      </div>
    </main>
  );
}