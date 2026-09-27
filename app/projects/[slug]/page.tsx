import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import type { Metadata } from "next";

const statusLabels: Record<string, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  updating: "Updating",
  complete: "Complete",
}; 

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    openGraph: {
      title: project.frontmatter.title,
      description: project.frontmatter.description,
      type: "article",
    },
  };
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.frontmatter.slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main id="main-content" className="container prose" style={{ paddingBlock: "4rem", maxWidth: "42rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase" }}>
        {statusLabels[project.frontmatter.status]}
      </span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", marginBlock: "1rem" }}>
        {project.frontmatter.title}
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "2rem" }}>{project.frontmatter.description}</p>
      <div style={{ lineHeight: 1.7 }}>
        <MDXRemote source={project.content} />
      </div>
    </main>
  );
}