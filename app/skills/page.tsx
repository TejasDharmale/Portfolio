import PageIntro from "@/components/PageIntro";
import { skills } from "@/lib/data";

export default function SkillsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Skills"
        title="Technical toolkit"
        description="Engineering and research capabilities grouped by execution area."
      />

      <section className="skill-grid reveal delay-1">
        {skills.map((group) => {
          const Icon = group.icon;
          return (
            <article className="skill-card" key={group.title}>
              <span className="icon-badge">
                <Icon size={18} />
              </span>
              <h3>{group.title}</h3>
              <div>
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
