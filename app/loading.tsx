export default function Loading() {
  return (
    <div className="container prose" style={{ paddingBlock: "4rem" }}>
      <div style={{ height: "2rem", width: "40%", background: "var(--border)", borderRadius: "2px", marginBottom: "1rem" }} />
      <div style={{ height: "1rem", width: "70%", background: "var(--border)", borderRadius: "2px" }} />
    </div>
  );
}