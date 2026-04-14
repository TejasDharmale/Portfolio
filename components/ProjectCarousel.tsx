"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const animRef = useRef<number | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  const CARD_W = 320;
  const GAP = 20;
  const SPEED = 0.7;

  // duplicate list for seamless loop
  const items = [...projects, ...projects, ...projects];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const halfWidth = (CARD_W + GAP) * projects.length;

    function tick() {
      if (!pausedRef.current && el) {
        posRef.current += SPEED;
        if (posRef.current >= halfWidth) {
          posRef.current -= halfWidth;
          el.scrollLeft = posRef.current;
        }
        el.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  function scrollBy(dir: 1 | -1) {
    pausedRef.current = true;
    posRef.current += dir * (CARD_W + GAP);
    const el = trackRef.current;
    if (el) el.scrollTo({ left: posRef.current, behavior: "smooth" });
    setTimeout(() => { pausedRef.current = false; }, 900);
  }

  return (
    <div className="carousel-wrap">
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; setHoveredKey(null); }}
      >
        {items.map((p, i) => {
          const key = `${p.name}-${i}`;
          return (
          <div
            key={key}
            className={`c-card ${hoveredKey === key ? "c-card--open" : ""}`}
            onMouseEnter={() => { pausedRef.current = true; setHoveredKey(key); }}
            onMouseLeave={() => { setHoveredKey(null); }}
          >
            {/* Image always visible */}
            <div className="c-card-img">
              <Image src={p.image} alt={p.name} fill sizes="320px" style={{ objectFit: "cover" }} />
              <div className="c-card-overlay" />
            </div>

            {/* Name always visible */}
            <div className="c-card-name-row">
              <h3 className="c-card-title">{p.name}</h3>
            </div>

            {/* Detail — slides in on hover */}
            <div className="c-card-detail">
              <p className="muted c-card-desc">{p.description}</p>
              <div className="c-card-tags">
                {p.tech.slice(0, 4).map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <Link
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="proj-card-link"
                onClick={(e) => e.stopPropagation()}
              >
                View on GitHub <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => scrollBy(-1)} aria-label="Previous">
          <ChevronLeft size={20} />
        </button>
        <button className="carousel-btn" onClick={() => scrollBy(1)} aria-label="Next">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
