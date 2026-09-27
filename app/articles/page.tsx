import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles } from "@/lib/content";


export const metadata: Metadata = {
  title: "Articles",
  description: "Writing on what I'm learning, building, and figuring out as a self-taught developer.",
};


export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <main id="main-content" className="container prose" style={{ paddingBlock: "4rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", marginBottom: "2rem" }}>
        Articles
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {articles.map(({ frontmatter }) => (
          <Link
            key={frontmatter.slug}
            href={`/articles/${frontmatter.slug}`}
            style={{ display: "block", paddingBlock: "1.5rem", borderBottom: "1px solid var(--border)" }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
              {new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginTop: "0.25rem" }}>
              {frontmatter.title}
            </h2>
            <p style={{ color: "var(--muted)", marginTop: "0.5rem" }}>{frontmatter.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}