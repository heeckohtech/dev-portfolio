"use client";

import { useEffect, useState } from "react";
import { isLessonComplete, toggleLessonComplete } from "@/lib/progress";

export function LessonCompleteToggle({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const [complete, setComplete] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setComplete(isLessonComplete(courseSlug, lessonSlug));
    setReady(true);
  }, [courseSlug, lessonSlug]);

  if (!ready) return null;

  return (
    <button
      onClick={() => setComplete(toggleLessonComplete(courseSlug, lessonSlug))}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.8125rem",
        padding: "0.75rem 1.5rem",
        border: `1px solid ${complete ? "var(--accent)" : "var(--border)"}`,
        color: complete ? "var(--accent)" : "var(--foreground)",
        borderRadius: "2px",
        background: "none",
      }}
    >
      {complete ? "✓ LESSON COMPLETE" : "MARK LESSON COMPLETE"}
    </button>
  );
}