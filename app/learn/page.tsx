import Link from "next/link";
import { getAllCourses, getCourseBySlug, getLessonsForCourse } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learning Roadmap",
  description: "A structured, public curriculum documenting my path to full-stack development.",
};


const statusLabels: Record<string, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  updating: "Updating",
  complete: "Complete",
};

export default function LearnPage() {
  const courses = getAllCourses();

  return (
    <main id="main-content" className="container" style={{ paddingBlock: "4rem" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
        Learning Roadmap
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "3rem" }}>
        Learn how to learn, not how to copy code.
      </p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {courses.map((course) => {
          const lessonCount = getLessonsForCourse(course.slug).length;
          return (
            <Link
              key={course.slug}
              href={`/learn/${course.slug}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBlock: "1.5rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
                  {String(course.order).padStart(2, "0")}
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem" }}>
                  {course.title}
                </h2>
                <p style={{ color: "var(--muted)", fontSize: "0.9375rem" }}>{course.description}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "1.5rem" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase" }}>
                  {statusLabels[course.status]}
                </span>
                <p style={{ color: "var(--muted)", fontSize: "0.8125rem" }}>{lessonCount} lessons</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}