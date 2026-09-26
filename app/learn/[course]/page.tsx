import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCourses, getCourseBySlug, getLessonsForCourse } from "@/lib/content";
import { CourseProgressBar } from "@/components/course-progress-bar";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course: courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);
  if (!course) return {};

  return {
    title: course.title,
    description: course.description,
  };
}

export function generateStaticParams() {
  return getAllCourses().map((c) => ({ course: c.slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course: courseSlug } = await params;
  const course = getCourseBySlug(courseSlug);

  if (!course) notFound();

  const lessons = getLessonsForCourse(courseSlug);

  return (
    <main id="main-content" className="container" style={{ paddingBlock: "4rem" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase" }}>
        {course.level}
      </span>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBlock: "1rem" }}>
        {course.title}
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "3rem" }}>{course.description}</p>

      <CourseProgressBar courseSlug={courseSlug} totalLessons={lessons.length} />

      {lessons.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>
          [No lessons published yet — this course is {course.status}.]
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {lessons.map((lesson) => (
            <Link
              key={lesson.frontmatter.slug}
              href={`/learn/${courseSlug}/${lesson.frontmatter.slug}`}
              style={{ paddingBlock: "1.25rem", borderBottom: "1px solid var(--border)" }}
            >
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                {lesson.frontmatter.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>
                {lesson.frontmatter.module} · {lesson.frontmatter.estimatedTime} min · {lesson.frontmatter.difficulty}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}