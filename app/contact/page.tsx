import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — email or find my work on GitHub.",
};

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="container"
      style={{
        paddingBlock: "4rem",
        maxWidth: "42rem",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2.5rem",
          marginBottom: "1rem",
        }}
      >
        Let&apos;s talk.
      </h1>

      <p
        style={{
          color: "var(--muted)",
          lineHeight: 1.7,
          marginBottom: "3rem",
        }}
      >
        Whether it&apos;s about a project, a collaboration, or just a question
        about something I&apos;ve written or built — reach out.
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <a
          href="mailto:heeckohtech@gmail.com"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            color: "var(--accent)",
          }}
        >
          heeckohtech@gmail.com
        </a>

        <a
          href="https://github.com/heeckohtech"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "1.125rem",
          }}
        >
          GitHub → github.com/heeckohtech
        </a>
      </div>
    </main>
  );
}
