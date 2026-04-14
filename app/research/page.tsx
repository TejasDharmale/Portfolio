import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { publications, profile } from "@/lib/data";

export default function ResearchPage() {
  return (
    <>
      <div className="page-intro reveal">
        <p className="eyebrow">Research</p>
        <h1 className="proj-page-title">Publications & Presentations</h1>
      </div>

      <section className="edu-timeline reveal delay-1">
        <div className="edu-center-line" />
        {publications.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div key={item.title} className={`edu-row edu-row--${side}`}>
              {side === "left" && (
                <Link href={item.url ?? profile.scholar} target="_blank" rel="noreferrer" className="edu-card research-tl-card">
                  <p className="research-tl-kind">{item.kind}</p>
                  <h3 className="edu-inst">{item.title}</h3>
                  <p className="edu-degree">{item.venue}</p>
                  <span className="research-tl-cta">Read Paper <ArrowUpRight size={12} /></span>
                </Link>
              )}

              <div className="edu-node">
                <div className="edu-dot" />
                <span className="edu-badge">{item.year}</span>
              </div>

              {side === "right" && (
                <Link href={item.url ?? profile.scholar} target="_blank" rel="noreferrer" className="edu-card research-tl-card">
                  <p className="research-tl-kind">{item.kind}</p>
                  <h3 className="edu-inst">{item.title}</h3>
                  <p className="edu-degree">{item.venue}</p>
                  <span className="research-tl-cta">Read Paper <ArrowUpRight size={12} /></span>
                </Link>
              )}

              {side === "left" && <div className="edu-card edu-card--phantom" />}
              {side === "right" && <div className="edu-card edu-card--phantom" style={{ order: -1 }} />}
            </div>
          );
        })}
      </section>

      <div className="research-v3-footer reveal delay-2">
        <Link href={profile.scholar} target="_blank" rel="noreferrer" className="btn btn-secondary">
          View Google Scholar Profile <ArrowUpRight size={14} />
        </Link>
      </div>
    </>
  );
}
