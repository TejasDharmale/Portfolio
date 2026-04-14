import PageIntro from "@/components/PageIntro";
import { education } from "@/lib/data";

export default function EducationPage() {
  return (
    <>
      <PageIntro
        eyebrow="Education"
        title="Academic foundation and ongoing PhD journey"
        description="A structured path across diploma, undergraduate engineering, and current doctoral research in computer science."
      />

      <section className="edu-timeline reveal delay-1">
        <div className="edu-center-line" />
        {education.map((item, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <div key={`${item.institution}-${item.degree}`} className={`edu-row edu-row--${side}`}>
              {side === "left" && (
                <div className="edu-card panel">
                  <h3 className="edu-inst">{item.institution}</h3>
                  <p className="edu-degree">{item.degree}</p>
                  <p className="edu-location">{item.location}</p>
                </div>
              )}

              <div className="edu-node">
                <div className="edu-dot" />
                <span className="edu-badge">{item.period}</span>
              </div>

              {side === "right" && (
                <div className="edu-card panel">
                  <h3 className="edu-inst">{item.institution}</h3>
                  <p className="edu-degree">{item.degree}</p>
                  <p className="edu-location">{item.location}</p>
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
