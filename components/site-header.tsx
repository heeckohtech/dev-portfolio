"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/learn", label: "Learn" },
  { href: "/articles", label: "Articles" },
  { href: "/journey", label: "Journey" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBlock: "1.25rem" }}>
        <Link href="/" style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
          Wahab
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: "1.5rem" }} className="desktop-nav">
          {links.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontSize: "0.9375rem" }}>
              {link.label}
            </Link>
          ))}
          <Link href="/contact" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Contact
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          style={{ background: "none", border: "none", fontFamily: "var(--font-mono)" }}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="container" style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingBottom: "1.5rem" }}>
          {[...links, { href: "/contact", label: "Contact" }].map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}