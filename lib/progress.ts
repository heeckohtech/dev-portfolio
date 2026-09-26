"use client";

const STORAGE_KEY = "dev-portfolio-progress";

type ProgressData = {
  completedLessons: string[]; // format: "courseSlug/lessonSlug"
  checklistState: Record<string, Record<string, boolean>>; // format: { "courseSlug/lessonSlug": { "item text": true } }
};

function readProgress(): ProgressData {
  if (typeof window === "undefined") {
    return { completedLessons: [], checklistState: {} };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedLessons: [], checklistState: {} };
    return JSON.parse(raw) as ProgressData;
  } catch {
    return { completedLessons: [], checklistState: {} };
  }
}

function writeProgress(data: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private browsing, disabled) — fail silently
  }
}

export function isLessonComplete(courseSlug: string, lessonSlug: string): boolean {
  const key = `${courseSlug}/${lessonSlug}`;
  return readProgress().completedLessons.includes(key);
}

export function toggleLessonComplete(courseSlug: string, lessonSlug: string) {
  const key = `${courseSlug}/${lessonSlug}`;
  const data = readProgress();
  const already = data.completedLessons.includes(key);
  data.completedLessons = already
    ? data.completedLessons.filter((k) => k !== key)
    : [...data.completedLessons, key];
  writeProgress(data);
  return !already;
}

export function getCourseProgress(courseSlug: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const data = readProgress();
  const completedInCourse = data.completedLessons.filter((k) => k.startsWith(`${courseSlug}/`)).length;
  return Math.round((completedInCourse / totalLessons) * 100);
}

export function getChecklistState(courseSlug: string, lessonSlug: string): Record<string, boolean> {
  const key = `${courseSlug}/${lessonSlug}`;
  return readProgress().checklistState[key] ?? {};
}

export function setChecklistItem(courseSlug: string, lessonSlug: string, item: string, checked: boolean) {
  const key = `${courseSlug}/${lessonSlug}`;
  const data = readProgress();
  data.checklistState[key] = { ...data.checklistState[key], [item]: checked };
  writeProgress(data);
}