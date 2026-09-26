import Link from "next/link";
import { getAllProjects } from "@/lib/content";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected projects — problems solved, technologies used, and lessons learned building them.",
};


export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main id="main-content" className="container" style={{ paddingBlock: "4rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "2rem" }}>
        Work
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {projects.map(({ frontmatter }) => (
          <Link
            key={frontmatter.slug}
            href={`/projects/${frontmatter.slug}`}
            style={{ display: "block", paddingBlock: "1.5rem", borderBottom: "1px solid var(--border)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                {frontmatter.title}
              </h2>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", textTransform: "uppercase" }}>
                {frontmatter.status}
              </span>
            </div>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>{frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}