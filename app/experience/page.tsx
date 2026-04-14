import PageIntro from "@/components/PageIntro";
import { experience } from "@/lib/data";

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Experience"
        title="Professional timeline with execution-focused impact"
        description="Each role below has independent scope, technical depth, and measurable outcomes."
      />

      <section className="edu-timeline reveal delay-1">
        <div className="edu-center-line" />
        {experience.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div key={`${item.role}-${item.org}`} className={`edu-row edu-row--${side}`}>
              {side === "left" && (
                <div className="edu-card exp-card">
                  <h3 className="edu-inst">{item.role}</h3>
                  <p className="edu-degree">{item.org}</p>
                  {item.summary && <p className="edu-location">{item.summary}</p>}
                </div>
              )}

              <div className="edu-node">
                <div className="edu-dot" />
                <span className="edu-badge">{item.period}</span>
              </div>

              {side === "right" && (
                <div className="edu-card exp-card">
                  <h3 className="edu-inst">{item.role}</h3>
                  <p className="edu-degree">{item.org}</p>
                  {item.summary && <p className="edu-location">{item.summary}</p>}
                </div>
              )}

              {side === "left" && <div className="edu-card edu-card--phantom" />}
              {side === "right" && <div className="edu-card edu-card--phantom" style={{ order: -1 }} />}
            </div>
          );
        })}
      </section>
    </>
  );
}
