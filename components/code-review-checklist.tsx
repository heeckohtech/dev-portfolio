"use client";

import { useEffect, useState } from "react";
import { getChecklistState, setChecklistItem } from "@/lib/progress";

const CHECKLIST = {
  Accessibility: ["Keyboard navigation works", "Semantic HTML used", "Images have alt text"],
  "Code Quality": ["Meaningful naming", "Sensible file/component structure", "No obviously duplicated logic"],
  "Responsive Design": ["Works on mobile width", "Works on tablet width", "Works on desktop width"],
  Performance: ["Images are reasonably sized/optimized", "No unnecessary dependencies added"],
  Documentation: ["README explains what the project does", "Setup instructions included", "Deployment instructions included (if deployed)"],
};

export function CodeReviewChecklist({ courseSlug, lessonSlug }: { courseSlug: string; lessonSlug: string }) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setChecked(getChecklistState(courseSlug, lessonSlug));
  }, [courseSlug, lessonSlug]);

  const toggle = (key: string) => {
    const next = !checked[key];
    setChecked((prev) => ({ ...prev, [key]: next }));
    setChecklistItem(courseSlug, lessonSlug, key, next);
  };

  const allItems = Object.values(CHECKLIST).flat();
  const checkedCount = allItems.filter((item) => checked[item]).length;

  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>Code Review Checklist</h3>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)" }}>
          {checkedCount}/{allItems.length}
        </span>
      </div>

      {Object.entries(CHECKLIST).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--accent)", marginBottom: "0.5rem" }}>
            {category.toUpperCase()}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {items.map((item) => (
              <label key={item} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={!!checked[item]}
                  onChange={() => toggle(item)}
                  style={{ accentColor: "var(--accent)" }}
                />
                <span style={{ textDecoration: checked[item] ? "line-through" : "none", color: checked[item] ? "var(--muted)" : "var(--foreground)" }}>
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.5rem" }}>
        Use this before submitting your project.
      </p>
    </div>
  );
}