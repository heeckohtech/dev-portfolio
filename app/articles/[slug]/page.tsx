import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.frontmatter.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: "article",
      publishedTime: article.frontmatter.date,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  return (
    <main id="main-content" className="container prose" style={{ paddingBlock: "4rem", maxWidth: "42rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
        {new Date(article.frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", marginBlock: "1rem" }}>
        {article.frontmatter.title}
      </h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        {article.frontmatter.tags.map((tag) => (
          <span
            key={tag}
            style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", border: "1px solid var(--border)", padding: "0.125rem 0.5rem", borderRadius: "2px" }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div style={{ lineHeight: 1.7 }}>
        <MDXRemote source={article.content} />
      </div>
    </main>
  );
}