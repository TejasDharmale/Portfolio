"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/lib/data";

export default function ProjectsGrid({ projects }: { projects: ProjectItem[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div style={{ paddingBlock: "1.5rem 4rem" }}>

      {/* ── Category filter ── */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginBottom: "2rem",
      }}>
        {categories.map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "999px",
                border: isActive ? "1px solid var(--accent)" : "1px solid rgba(255,255,255,0.12)",
                background: isActive ? "rgba(50,216,160,0.12)" : "transparent",
                color: isActive ? "var(--accent)" : "var(--muted)",
                fontSize: "0.78rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                transition: "all 0.15s ease",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Grid ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "1.5rem",
      }}>
        {filtered.map((p) => {
          const isHovered = hovered === p.name;
          return (
            <article
              key={p.name}
              onMouseEnter={() => setHovered(p.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: "18px",
                border: `1px solid ${isHovered ? "rgba(50,216,160,0.35)" : "rgba(255,255,255,0.07)"}`,
                background: "rgba(255,255,255,0.02)",
                overflow: "hidden",
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                boxShadow: isHovered ? "0 20px 50px rgba(0,0,0,0.55)" : "none",
                transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: "210px", overflow: "hidden" }}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading={filtered.indexOf(p) === 0 ? "eager" : "lazy"}
                  priority={filtered.indexOf(p) === 0}
                  style={{
                    objectFit: "cover",
                    transform: isHovered ? "scale(1.04)" : "scale(1)",
                    transition: "transform 0.4s ease",
                  }}
                />
                {/* Gradient overlay */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%)",
                }} />
                {/* Category badge */}
                <span style={{
                  position: "absolute", top: "0.85rem", left: "0.85rem",
                  fontSize: "0.62rem", fontWeight: 700,
                  textTransform: "uppercase", letterSpacing: "0.09em",
                  padding: "0.22rem 0.65rem", borderRadius: "999px",
                  background: "rgba(50,216,160,0.15)",
                  border: "1px solid rgba(50,216,160,0.4)",
                  color: "var(--accent)",
                }}>
                  {p.category}
                </span>
                {/* Featured badge */}
                {p.featured && (
                  <span style={{
                    position: "absolute", top: "0.85rem", right: "0.85rem",
                    fontSize: "0.6rem", fontWeight: 700,
                    textTransform: "uppercase", letterSpacing: "0.08em",
                    padding: "0.2rem 0.55rem", borderRadius: "999px",
                    background: "rgba(99,102,241,0.2)",
                    border: "1px solid rgba(99,102,241,0.45)",
                    color: "#a5b4fc",
                  }}>
                    Featured
                  </span>
                )}
              </div>

              {/* Body */}
              <div style={{
                padding: "1.25rem 1.4rem 1.5rem",
                display: "flex", flexDirection: "column", gap: "0.6rem",
                flex: 1,
              }}>
                <h3 style={{
                  margin: 0,
                  fontSize: "1.02rem",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.3,
                }}>
                  {p.name}
                </h3>

                <p style={{
                  margin: 0,
                  fontSize: "0.83rem",
                  color: "var(--muted)",
                  lineHeight: 1.6,
                }}>
                  {p.description}
                </p>

                {/* Impact */}
                {p.impact && (
                  <p style={{
                    margin: 0,
                    fontSize: "0.78rem",
                    color: "var(--accent)",
                    fontWeight: 600,
                  }}>
                    → {p.impact}
                  </p>
                )}

                {/* Tech tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginTop: "0.2rem" }}>
                  {p.tech.slice(0, 5).map((t) => (
                    <span key={t} style={{
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      padding: "0.22rem 0.6rem",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#c8d9ea",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}>
                      {t}
                    </span>
                  ))}
                  {p.tech.length > 5 && (
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 600,
                      padding: "0.22rem 0.6rem", borderRadius: "6px",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--muted)",
                    }}>
                      +{p.tech.length - 5} more
                    </span>
                  )}
                </div>

                {/* Link */}
                <Link
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: "auto",
                    paddingTop: "0.75rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color: isHovered ? "var(--accent)" : "var(--muted)",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  View on GitHub <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--muted)", fontSize: "0.9rem" }}>
          No projects in this category yet.
        </div>
      )}
    </div>
  );
}
