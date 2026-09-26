import Link from "next/link";
import { getAllArticles } from "@/lib/content";

export default function Home() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section style={{ padding: "6rem 2rem 4rem", maxWidth: "48rem" }}>
        <p style={{ fontFamily: "var(--font-mono)", color: "var(--accent)", fontSize: "0.875rem", marginBottom: "1rem" }}>
          WAHAB ADEWALE — DEVELOPER, LEARNER, BUILDER
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Building my way into full-stack engineering — in public.
        </h1>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--muted)", fontSize: "1.125rem", lineHeight: 1.6, marginBottom: "2rem" }}>
          This site is my portfolio, my learning log, and a growing curriculum —
          documenting what I build and what I learn as I go, without pretending
          to know more than I do yet.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          <a href="/projects" style={{ padding: "0.75rem 1.5rem", background: "var(--foreground)", color: "var(--background)", borderRadius: "2px" }}>
            See my work
          </a>
          <a href="/learn" style={{ padding: "0.75rem 1.5rem", border: "1px solid var(--border)", borderRadius: "2px" }}>
            Follow the learning journey
          </a>
        </div>
      </section>

      {/* Current focus */}
      <section style={{ padding: "3rem 2rem", borderTop: "1px solid var(--border)", maxWidth: "48rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          CURRENTLY
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "1.125rem" }}>
          [CURRENT FOCUS — e.g. "Building an offline-first PWA for campus navigation at OOU"]
        </p>
      </section>

      {/* Selected work */}
      <section style={{ padding: "3rem 2rem", borderTop: "1px solid var(--border)", maxWidth: "48rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
          SELECTED WORK
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>[PROJECT NAME]</h3>
            <p style={{ color: "var(--muted)" }}>[One-line description of the problem it solves]</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section style={{ padding: "3rem 2rem", borderTop: "1px solid var(--border)", maxWidth: "48rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          HOW I LEARN
        </h2>
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", lineHeight: 1.4 }}>
          Learn how to learn, not how to copy code.
        </p>
      </section>

    {/* Recent writing */}
<section className="container" style={{ padding: "3rem 0", borderTop: "1px solid var(--border)" }}>
  <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1.5rem" }}>
    RECENT WRITING
  </h2>
  {getAllArticles().slice(0, 2).map(({ frontmatter }) => (
    <Link key={frontmatter.slug} href={`/articles/${frontmatter.slug}`} style={{ display: "block", marginBottom: "1rem" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>{frontmatter.title}</h3>
      <p style={{ color: "var(--muted)" }}>{frontmatter.description}</p>
    </Link>
  ))}
</section>

      {/* Final CTA */}
      <section style={{ padding: "4rem 2rem", borderTop: "1px solid var(--border)", maxWidth: "48rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: "1rem" }}>
          Let's talk.
        </h2>
        <a href="/contact" style={{ color: "var(--accent)" }}>Get in touch →</a>
      </section>
    </main>
  );
}