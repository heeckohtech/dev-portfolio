import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Computer Science graduate, developer, and researcher building practical, accessible digital solutions.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="container prose" style={{ paddingBlock: "4rem", maxWidth: "42rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", marginBottom: "3rem" }}>
        About
      </h1>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          WHO I AM
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          I&apos;m Wahab, a Computer Science graduate, developer, researcher, and technology
          enthusiast with a strong interest in applying technology to practical, real-world
          problems. My interests lie at the intersection of software development, research,
          data analysis, digital products, and education.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          I&apos;m particularly interested in creating solutions that are not merely
          technically functional, but genuinely useful, accessible, and relevant to the
          people they&apos;re designed to serve.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          WHAT I BUILD
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          I build practical digital solutions with a particular focus on web applications,
          educational technology, research tools, productivity systems, and platforms built around the needs of students.
          platforms.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          Through HEECKOH VENTURES, I&apos;m developing a broader vision of services driven
by technology, combining software development, academic research support, data
analysis and digital innovation. The guiding principle is simple: technology
should address a clearly defined problem and provide a meaningful solution to
its users.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          WHAT I&apos;M LEARNING
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          My learning extends beyond software development alone. I&apos;m deliberately
          developing a multidisciplinary skill set that includes software engineering,
          UI/UX design, data analysis, quantitative and qualitative research, digital design and professional productivity, including modern web development,
          databases, Git and GitHub, deployment, SPSS, Figma, and other digital design tools.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          More importantly, I&apos;m committed to understanding the principles behind the
          technologies I use. I don&apos;t want to become dependent on AI to think or solve
          problems on my behalf. Instead, I want to reason independently, understand problems
          deeply, and use AI as an auxiliary tool rather than a substitute for intellectual
          effort.
        </p>
      </section>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          HOW I THINK
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: "1rem" }}>
          I approach problems analytically and systematically, starting with the problem
          itself: what is wrong, why does it exist, who is affected, what is currently
          missing, and what constitutes an appropriate solution.
        </p>
        <p style={{ lineHeight: 1.7, color: "var(--muted)" }}>
          I&apos;m interested in understanding the reasoning behind a solution, not just completing a project, and I consider its usefulness, sustainability, scalability,
          and potential impact.
        </p>
      </section>

      <section>
        <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--muted)", marginBottom: "1rem" }}>
          WHAT I&apos;M WORKING ON
        </h2>
        <p style={{ lineHeight: 1.7 }}>
          Currently, I&apos;m developing HEECKOH VENTURES, building expertise in
          quantitative and qualitative research, and working on an offline first Progressive Web Application for campus service information and navigation in low bandwidth environments, using Olabisi Onabanjo University as a case study.
        </p>
      </section>
    </main>
  );
}