import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { profile } from "@/lib/data";

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Open to research and engineering opportunities"
        description="For collaborations, internships, or full-time roles, connect through any of these channels."
      />

      <section className="card-grid reveal delay-1">

        {/* Email */}
        <article className="panel contact-card">
          <div className="contact-icon contact-icon--email">
            <svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
              <path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
              <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
              <path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0 C4.924,8,3,9.924,3,12.298z"/>
              <path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/>
            </svg>
          </div>
          <h3>Email</h3>
          <p className="muted">{profile.email}</p>
        </article>

        {/* LinkedIn */}
        <article className="panel contact-card">
          <div className="contact-icon contact-icon--linkedin">
            <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </div>
          <h3>LinkedIn</h3>
          <p className="muted">Professional profile and recommendations</p>
          <Link href={profile.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary">
            Open LinkedIn
          </Link>
        </article>

        {/* GitHub */}
        <article className="panel contact-card">
          <div className="contact-icon contact-icon--github">
            <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
          </div>
          <h3>GitHub</h3>
          <p className="muted">Code repositories and implementation history</p>
          <Link href={profile.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
            Open GitHub
          </Link>
        </article>

      </section>
    </>
  );
}
