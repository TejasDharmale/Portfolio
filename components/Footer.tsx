import Link from "next/link";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <p>Copyright {new Date().getFullYear()} {profile.name}</p>
        <div className="footer-links">
          <Link href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Link>
          <Link href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link href={profile.scholar} target="_blank" rel="noreferrer">
            Scholar
          </Link>
        </div>
      </div>
    </footer>
  );
}
