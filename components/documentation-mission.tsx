type Props = {
  links: { label: string; url: string }[];
  questions?: string[];
};

export function DocumentationMission({ links, questions }: Props) {
  if (links.length === 0 && (!questions || questions.length === 0)) {
    return null;
  }

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "2px",
        padding: "1.5rem",
        marginBottom: "1rem",
      }}
    >
      {links.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginBottom: questions?.length ? "1.5rem" : 0,
          }}
        >
          {links.map((doc) => (
            <a
              key={doc.url}
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--accent)",
                fontSize: "0.9375rem",
              }}
            >
              → {doc.label}
            </a>
          ))}
        </div>
      )}

      {questions && questions.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--muted)",
              marginBottom: "0.75rem",
            }}
          >
            BEFORE CONTINUING, FIND THE ANSWERS TO:
          </p>

          <ol
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              paddingLeft: "1.25rem",
            }}
          >
            {questions.map((q, i) => (
              <li
                key={i}
                style={{ color: "var(--foreground)" }}
              >
                {q}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}