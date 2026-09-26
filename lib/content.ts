import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  description: string;
  status: "planned" | "in-progress" | "updating" | "complete";
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
};

export function getAllProjects() {
  const dir = path.join(CONTENT_DIR, "projects");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const projects = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as ProjectFrontmatter,
      content,
    };
  });

  return projects.sort(
    (a, b) => a.frontmatter.order - b.frontmatter.order
  );
}

export function getProjectBySlug(slug: string) {
  return (
    getAllProjects().find(
      (project) => project.frontmatter.slug === slug
    ) ?? null
  );
}

// ─────────────────────────────────────────────
// Articles
// ─────────────────────────────────────────────

export type ArticleFrontmatter = {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
};

export function getAllArticles() {
  const dir = path.join(CONTENT_DIR, "articles");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const articles = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as ArticleFrontmatter,
      content,
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getArticleBySlug(slug: string) {
  return (
    getAllArticles().find(
      (article) => article.frontmatter.slug === slug
    ) ?? null
  );
}

// ─────────────────────────────────────────────
// Courses
// ─────────────────────────────────────────────

export type CourseMeta = {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  status: "planned" | "in-progress" | "updating" | "complete";
  order: number;
};

export type LessonFrontmatter = {
  title: string;
  slug: string;
  course: string;
  module: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  status: "draft" | "published";
  order: number;
  prerequisites: string[];
  tags: string[];
  documentationLinks: { label: string; url: string }[];
  readingQuestions?: string[];
  debugChallenge?: {
    brokenCode: string;
    hints: string[];
    solution: string;
    solutionExplanation: string;
  };
  projectAssignment?: {
    title: string;
    problem: string;
    requirements: string[];
    constraints: string[];
    suggestedTech: string[];
    acceptanceCriteria: string[];
    stretchGoals: string[];
  };
};

function getCoursesDir() {
  return path.join(CONTENT_DIR, "courses");
}

export function getAllCourses(): CourseMeta[] {
  const dir = getCoursesDir();

  if (!fs.existsSync(dir)) {
    return [];
  }

  const folders = fs
    .readdirSync(dir)
    .filter((folder) => {
      const folderPath = path.join(dir, folder);
      return fs.statSync(folderPath).isDirectory();
    });

  const courses = folders
    .map((folder) => {
      const metaPath = path.join(dir, folder, "meta.json");

      if (!fs.existsSync(metaPath)) {
        return null;
      }

      const raw = fs.readFileSync(metaPath, "utf-8");

      return JSON.parse(raw) as CourseMeta;
    })
    .filter((course): course is CourseMeta => course !== null);

  return courses.sort((a, b) => a.order - b.order);
}

export function getCourseBySlug(slug: string): CourseMeta | null {
  return (
    getAllCourses().find((course) => course.slug === slug) ?? null
  );
}

// ─────────────────────────────────────────────
// Lessons
// ─────────────────────────────────────────────

export function getLessonsForCourse(courseSlug: string) {
  const dir = path.join(getCoursesDir(), courseSlug);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"));

  const lessons = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    return {
      frontmatter: data as LessonFrontmatter,
      content,
    };
  });

  return lessons
    .filter(
      (lesson) => lesson.frontmatter.status === "published"
    )
    .sort(
      (a, b) =>
        a.frontmatter.order - b.frontmatter.order
    );
}

export function getLessonBySlug(
  courseSlug: string,
  lessonSlug: string
) {
  return (
    getLessonsForCourse(courseSlug).find(
      (lesson) => lesson.frontmatter.slug === lessonSlug
    ) ?? null
  );
}

export function getAllCourseLessonPairs() {
  return getAllCourses().flatMap((course) =>
    getLessonsForCourse(course.slug).map((lesson) => ({
      course: course.slug,
      lesson: lesson.frontmatter.slug,
    }))
  );
}

// ─────────────────────────────────────────────
// Lesson sections & stages
// ─────────────────────────────────────────────

export const LESSON_STAGES: { name: string; type: "reading" | "task" }[] = [
  { name: "Concept", type: "reading" },
  { name: "Mini Lesson", type: "reading" },
  { name: "Read Documentation", type: "reading" },
  { name: "Guided Exercise", type: "task" },
  { name: "Independent Challenge", type: "task" },
  { name: "Debugging", type: "task" },
  { name: "Project", type: "task" },
  { name: "Code Review", type: "reading" },
  { name: "Document What You Learned", type: "reading" },
];

export function parseLessonSections(content: string) {
  const lines = content.split("\n");
  const sections: { heading: string; body: string }[] = [];
  let current: { heading: string; body: string[] } | null = null;

  for (const line of lines) {
    const match = line.match(/^##\s+(.*)/);
    if (match) {
      if (current) {
        sections.push({ heading: current.heading, body: current.body.join("\n").trim() });
      }
      current = { heading: match[1].trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) {
    sections.push({ heading: current.heading, body: current.body.join("\n").trim() });
  }

  return sections;
}

// ─────────────────────────────────────────────
// Journey
// ─────────────────────────────────────────────

export type JourneyFrontmatter = {
  month: string;
  year: string;
  slug: string;
};

export function getAllJourneyEntries() {
  const dir = path.join(CONTENT_DIR, "journey");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith(".mdx"));

  const entries = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    return {
      frontmatter: data as JourneyFrontmatter,
      content,
    };
  });

  // filenames are "YYYY-MM.mdx" so a plain string sort is already chronological
  return entries.sort((a, b) => b.frontmatter.slug.localeCompare(a.frontmatter.slug));
}