import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  getAllCourseLessonPairs,
  getCourseBySlug,
  getLessonBySlug,
  parseLessonSections,
  LESSON_STAGES,
} from "@/lib/content";
import { DocumentationMission } from "@/components/documentation-mission";
import { BrokenCode } from "@/components/broken-code";
import { ProjectBrief } from "@/components/project-brief";
import { CodeReviewChecklist } from "@/components/code-review-checklist";
import { WhatsAppSubmission } from "@/components/whatsapp-submission";
import { LessonCompleteToggle } from "@/components/lesson-complete-toggle";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}): Promise<Metadata> {
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const lesson = getLessonBySlug(courseSlug, lessonSlug);
  if (!lesson) return {};

  return {
    title: lesson.frontmatter.title,
    description: `A ${lesson.frontmatter.difficulty} lesson on ${lesson.frontmatter.title}, part of the ${courseSlug} course.`,
  };
}

export function generateStaticParams() {
  return getAllCourseLessonPairs();
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>;
}) {
  const { course: courseSlug, lesson: lessonSlug } = await params;

  const course = getCourseBySlug(courseSlug);
  const lesson = getLessonBySlug(courseSlug, lessonSlug);

  if (!course || !lesson) {
    notFound();
  }

  const sections = parseLessonSections(lesson.content);

  return (
    <main id="main-content"
      className="container prose"
      style={{
        paddingBlock: "4rem",
        maxWidth: "42rem",
      }}
    >
      {/* Breadcrumb */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: "1rem",
        }}
      >
        {course.title.toUpperCase()} /{" "}
        {lesson.frontmatter.module.toUpperCase()}
      </p>

      {/* Header */}
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-h1)",
          marginBottom: "1rem",
        }}
      >
        {lesson.frontmatter.title}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--accent)",
          textTransform: "uppercase",
          marginBottom: "3rem",
        }}
      >
        <span>{lesson.frontmatter.difficulty}</span>
        <span>{lesson.frontmatter.estimatedTime} min</span>
      </div>

      {/* Stages */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {sections.map((section) => {
                  const stageIndex = LESSON_STAGES.findIndex(
            (stage) =>
              stage.name.toLowerCase() === section.heading.toLowerCase()
          );
          const stage = LESSON_STAGES[stageIndex];
          const isTask = stage?.type === "task";

          const isDocs =
            section.heading.toLowerCase() === "read documentation";
const isDebugging = section.heading.toLowerCase() === "debugging";
const isProject = section.heading.toLowerCase() === "project";
const isCodeReview = section.heading.toLowerCase() === "code review";

          return (
                       <section
              key={section.heading}
              style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: "1.5rem",
                paddingBlock: isTask ? "1.5rem" : 0,
                paddingRight: isTask ? "1.5rem" : 0,
                background: isTask ? "color-mix(in srgb, var(--accent) 6%, transparent)" : "transparent",
                borderRadius: isTask ? "2px" : 0,
              }}
            >
              {/* Section Header */}
                         <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "0.75rem",
                  marginBottom: "1rem",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "1.5rem",
                      color: "var(--accent)",
                    }}
                  >
                    {String(stageIndex + 1).padStart(2, "0")}
                  </span>

                  <h2
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.875rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {section.heading.toUpperCase()}
                  </h2>
                </div>

                {isTask && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      borderRadius: "2px",
                      padding: "0.125rem 0.5rem",
                    }}
                  >
                    TASK
                  </span>
                )}
              </div>

              {/* Documentation Links */}
           {isDocs && (
  <DocumentationMission
    links={lesson.frontmatter.documentationLinks}
    questions={lesson.frontmatter.readingQuestions}
  />
)}
              {/* Debugging Challenge */}
             {isDebugging && lesson.frontmatter.debugChallenge && (
  <BrokenCode
    brokenCode={lesson.frontmatter.debugChallenge.brokenCode}
    hints={lesson.frontmatter.debugChallenge.hints}
    solution={lesson.frontmatter.debugChallenge.solution}
    solutionExplanation={lesson.frontmatter.debugChallenge.solutionExplanation}
  />
)}

{isProject && lesson.frontmatter.projectAssignment && (
  <ProjectBrief {...lesson.frontmatter.projectAssignment} />
)}
{isCodeReview && (
  <>
    <CodeReviewChecklist courseSlug={courseSlug} lessonSlug={lessonSlug} />
    <div style={{ marginTop: "1.5rem" }}>
      <WhatsAppSubmission
        lessonTitle={lesson.frontmatter.title}
        courseTitle={course.title}
        whatsappNumber="2347051625864"
      />
    </div>
  </>
)}

              {/* Section Content */}
              <div
                style={{
                  lineHeight: 1.7,
                  color: "var(--foreground)",
                }}
              >
                <MDXRemote source={section.body} />
              </div>
            </section>
          );
        })}
      </div>
      <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid var(--border)" }}>
        <LessonCompleteToggle courseSlug={courseSlug} lessonSlug={lessonSlug} />
      </div>

    </main>
  );
}
