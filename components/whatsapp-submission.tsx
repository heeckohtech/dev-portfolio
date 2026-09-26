"use client";

import { useState } from "react";

type Props = {
  lessonTitle: string;
  courseTitle: string;
  whatsappNumber: string; // digits only, with country code, no + or spaces
};

export function WhatsAppSubmission({
  lessonTitle,
  courseTitle,
  whatsappNumber,
}: Props) {
  const [name, setName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [notes, setNotes] = useState("");

  const message = `Hello, I have completed the ${lessonTitle} assignment.

Name: ${name || "[your name]"}

Course: ${courseTitle}

Assignment: ${lessonTitle}

GitHub: ${githubUrl || "[link]"}

Live project: ${liveUrl || "[link, if any]"}

Notes: ${notes || "[optional]"}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "2px",
        padding: "1.5rem",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        Submit This Assignment
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />

        <input
          type="url"
          placeholder="GitHub link"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />

        <input
          type="url"
          placeholder="Live project link (optional)"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />

        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          style={{
            padding: "0.5rem 0.75rem",
            border: "1px solid var(--border)",
            borderRadius: "2px",
            background: "var(--background)",
            color: "var(--foreground)",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: "1rem",
        }}
      >
        FOR SCREENSHOTS OR FILES, ATTACH THEM MANUALLY IN WHATSAPP BEFORE
        SENDING.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          padding: "0.75rem 1.5rem",
          background: "var(--foreground)",
          color: "var(--background)",
          borderRadius: "2px",
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          textDecoration: "none",
        }}
      >
        SEND VIA WHATSAPP →
      </a>
    </div>
  );
}