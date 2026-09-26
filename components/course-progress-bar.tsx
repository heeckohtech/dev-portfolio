"use client";

import { useEffect, useState } from "react";
import { getCourseProgress } from "@/lib/progress";

export function CourseProgressBar({ courseSlug, totalLessons }: { courseSlug: string; totalLessons: number }) {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    setProgress(getCourseProgress(courseSlug, totalLessons));
  }, [courseSlug, totalLessons]);

  if (progress === null || totalLessons === 0) return null;

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        <span>PROGRESS</span>
        <span>{progress}%</span>
      </div>
      <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "var(--accent)", transition: "width 0.3s ease" }} />
      </div>
    </div>
  );
}