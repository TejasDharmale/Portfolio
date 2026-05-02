import Image from "next/image";
import { MapPin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { getProfile } from "@/lib/content";

export default async function AboutPage() {
  const profile = await getProfile();

  const stats = [
    { label: "PhD Program", value: "Computer Science", sub: "UMBC, 2024 – Present" },
    { label: "Research Focus", value: "Generative AI", sub: "NASA GESTAR II Lab" },
    { label: "Publications", value: "3+", sub: "IEEE & IJRASET" },
    { label: "Experience", value: "5+ Roles", sub: "Research & Industry" },
  ];

  const traits = [
    { title: "Research-Driven", body: "I publish and experiment at the intersection of AI, education, and geospatial intelligence." },
    { title: "Production-Minded", body: "I architect real systems — not just prototypes — with scalability and reliability in mind." },
    { title: "Impact-Focused", body: "Every project has a measurable outcome: a pipeline, a paper, or a deployment." },
  ];

  return (
    <div className="about-page">

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="about-hero reveal">
        <div className="about-photo-wrap">
          <Image
            src={profile.aboutImage}
            alt={profile.name}
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "top center" }}
            sizes="(max-width: 850px) 100vw, 40vw"
          />
        </div>

        <div className="about-intro">
          <p className="eyebrow">About Me</p>
          <h1 className="about-name">{profile.name}</h1>
          <p className="about-role">PhD Researcher · AI Engineer · Builder</p>
          <p className="muted about-bio">{profile.tagline}</p>
          <div className="about-meta-row">
            <span className="about-meta-item"><MapPin size={13} /> {profile.location}</span>
            <span className="about-meta-item"><Mail size={13} /> {profile.email}</span>
          </div>
          <div className="about-cta">
            <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-primary">
              <ExternalLink size={14} /> LinkedIn
            </Link>
            <Link href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="about-stats reveal delay-1">
        {stats.map((s) => (
          <div key={s.label} className="about-stat">
            <span className="eyebrow" style={{ fontSize: "0.62rem" }}>{s.label}</span>
            <strong className="about-stat-val">{s.value}</strong>
            <span className="about-stat-sub">{s.sub}</span>
          </div>
        ))}
      </section>

      {/* ── STORY ──────────────────────────────────────────── */}
      <section className="panel about-story reveal delay-1">
        <h2 className="about-section-h">My Story</h2>
        <p className="muted">
          I am a PhD researcher at UMBC with experience in AI, cloud systems, and full-stack development.
          Across NASA GESTAR II, university research, and industry internships, I have consistently delivered
          high-impact technical contributions.
        </p>
        <p className="muted">
          I work at the intersection of generative AI, software engineering, and data intelligence, with a
          practical approach to measurable project outcomes.
        </p>
        <p className="muted">
          Open to research collaborations, engineering opportunities, and conversations at the edge of what AI can do.
        </p>
      </section>

      {/* ── TRAITS ─────────────────────────────────────────── */}
      <section className="about-traits reveal delay-2">
        {traits.map((t) => (
          <div key={t.title} className="panel about-trait">
            <h3 className="about-trait-h">{t.title}</h3>
            <p className="muted" style={{ fontSize: "0.88rem" }}>{t.body}</p>
          </div>
        ))}
      </section>

    </div>
  );
}
