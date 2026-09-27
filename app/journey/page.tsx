import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllJourneyEntries } from "@/lib/content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journey",
  description: "A running log of what I'm learning and building, month by month.",
};
export default function JourneyPage() {
  const entries = getAllJourneyEntries();

  return (
    <main id="main-content" className="container prose" style={{ paddingBlock: "4rem", maxWidth: "42rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", marginBottom: "0.5rem" }}>
        Journey
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "3rem" }}>
        A running log of what I'm learning and building, month by month.
      </p>

      {entries.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>[No entries yet.]</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {entries.map(({ frontmatter, content }) => (
            <section key={frontmatter.slug} style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "1.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--accent)", marginBottom: "1rem", textTransform: "uppercase" }}>
                {frontmatter.month} {frontmatter.year}
              </h2>
              <div style={{ lineHeight: 1.7 }}>
                <MDXRemote source={content} />
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}