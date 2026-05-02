"use client";

import {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  FlaskConical,
  GraduationCap,
  Layers,
  MonitorSmartphone,
  Presentation,
  SearchCode,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  type LucideIcon,
} from "lucide-react";
import type { SkillGroup } from "@/lib/content";

const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  FlaskConical,
  GraduationCap,
  Layers,
  MonitorSmartphone,
  Presentation,
  SearchCode,
  ShieldCheck,
  Sparkles,
  Workflow,
  Wrench,
  BriefcaseBusiness,
  ChartNoAxesCombined,
};

export default function SkillGrid({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="skill-grid reveal delay-1">
      {groups.map((group) => {
        const Icon = ICON_MAP[group.icon] ?? BrainCircuit;
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
  );
}
