type Props = {
  title: string;
  problem: string;
  requirements: string[];
  constraints: string[];
  suggestedTech: string[];
  acceptanceCriteria: string[];
  stretchGoals: string[];
};

function BriefList({ label, items }: { label: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
        {label.toUpperCase()}
      </p>
      <ul style={{ display: "flex", flexDirection: "column", gap: "0.375rem", paddingLeft: "1.25rem" }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectBrief({
  title,
  problem,
  requirements,
  constraints,
  suggestedTech,
  acceptanceCriteria,
  stretchGoals,
}: Props) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
        {title}
      </h3>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>{problem}</p>

      <BriefList label="Requirements" items={requirements} />
      <BriefList label="Constraints" items={constraints} />
      {suggestedTech.length > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
            SUGGESTED TECHNOLOGIES
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {suggestedTech.map((tech) => (
              <span
                key={tech}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.125rem 0.5rem",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
      <BriefList label="Acceptance Criteria" items={acceptanceCriteria} />
      <BriefList label="Stretch Goals" items={stretchGoals} />
    </div>
  );
}