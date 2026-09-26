# Wahab — Developer Portfolio & Learning Platform

A personal developer portfolio that documents an actual, ongoing journey into full-stack
development — combining a project portfolio, a public learning log, and a structured,
content-first curriculum.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and MDX. No database, no
authentication, no paid services — content lives as files, progress lives in the browser's
localStorage, and the whole thing deploys for free on Vercel.

## Philosophy

> Learn how to learn, not how to copy code.

Every lesson in the `/learn` section follows a fixed 9-stage structure: Concept, Mini
Lesson, Read Documentation, Guided Exercise, Independent Challenge, Debugging, Project,
Code Review, and Document What You Learned — designed to build real understanding rather
than passive copy-paste learning.

## Tech Stack

- **Framework:** Next.js (App Router, Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + CSS custom properties for design tokens
- **Content:** MDX, parsed via `gray-matter` and rendered with `next-mdx-remote`
- **State:** Browser `localStorage` for lesson completion and progress — no backend
- **Deployment:** Vercel (free tier)

## Project Structure

\`\`\`
app/                  → routes (pages)
content/
  courses/            → one folder per course, meta.json + lesson .mdx files
  articles/           → blog-style writing, one .mdx per article
  projects/           → case studies, one .mdx per project
  journey/            → monthly log entries, one .mdx per month
lib/
  content.ts          → filesystem readers for all content types
  progress.ts         → localStorage helpers for progress tracking
components/           → reusable UI, including the design system primitives
\`\`\`

## Adding Content

- **New course:** create `content/courses/<slug>/meta.json` + lesson `.mdx` files. Appears
  automatically on `/learn` — no code changes needed.
- **New article:** add `content/articles/<slug>.mdx` with frontmatter. Appears on
  `/articles` and the homepage automatically.
- **New project:** add `content/projects/<slug>.mdx`. Appears on `/projects` automatically.

## Local Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Visit `http://localhost:3000`.

## Deployment

Pushed to `main` → automatically deployed via Vercel.

---

Built and maintained by [Wahab](https://github.com/heeckohtech).