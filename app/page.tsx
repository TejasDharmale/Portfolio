import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getProfile } from "@/lib/content";
import Typewriter from "@/components/Typewriter";

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="lp-hero reveal">
        <div className="lp-hero-text">
          <Typewriter />
          <h1 className="lp-name">{profile.name}</h1>
          <p className="lp-sub">{profile.tagline}</p>
          <div className="lp-cta">
            <Link href="/projects" className="btn btn-primary">
              See My Work <ArrowRight size={15} />
            </Link>
            <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
              <ExternalLink size={15} /> LinkedIn
            </Link>
            <Link href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
              GitHub
            </Link>
            <Link href={profile.scholar} target="_blank" rel="noreferrer" className="btn btn-secondary">
              Scholar
            </Link>
          </div>
        </div>

        <div className="lp-hero-img">
          <Image
            src={profile.heroImage}
            alt={profile.name}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 850px) 100vw, 50vw"
          />
          <div className="lp-img-overlay" />
        </div>
      </section>
    </>
  );
}
