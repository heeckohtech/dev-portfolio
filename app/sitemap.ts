import type { MetadataRoute } from "next";
import { getAllProjects, getAllArticles, getAllCourses, getLessonsForCourse } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dev-portfolio-beta-sandy.vercel.app"; // update to match metadataBase

  const staticRoutes = ["", "/about", "/projects", "/learn", "/articles", "/journey", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getAllProjects().map((p) => ({
    url: `${baseUrl}/projects/${p.frontmatter.slug}`,
    lastModified: new Date(),
  }));

  const articleRoutes = getAllArticles().map((a) => ({
    url: `${baseUrl}/articles/${a.frontmatter.slug}`,
    lastModified: new Date(a.frontmatter.date),
  }));

  const courses = getAllCourses();
  const courseRoutes = courses.map((c) => ({
    url: `${baseUrl}/learn/${c.slug}`,
    lastModified: new Date(),
  }));

  const lessonRoutes = courses.flatMap((c) =>
    getLessonsForCourse(c.slug).map((l) => ({
      url: `${baseUrl}/learn/${c.slug}/${l.frontmatter.slug}`,
      lastModified: new Date(),
    }))
  );

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...courseRoutes, ...lessonRoutes];
}