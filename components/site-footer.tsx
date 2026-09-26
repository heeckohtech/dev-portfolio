export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", marginTop: "4rem" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBlock: "2rem", fontSize: "0.875rem", color: "var(--muted)" }}>
        <span>© {new Date().getFullYear()} Wahab</span>
        <a href="https://github.com/heeckohtech" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}