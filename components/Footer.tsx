import Link from "next/link";

type FooterProps = {
  name: string;
  linkedin: string;
  github: string;
  scholar: string;
};

export default function Footer({ name, linkedin, github, scholar }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <p>Copyright {new Date().getFullYear()} {name}</p>
        <div className="footer-links">
          <Link href={linkedin} target="_blank" rel="noreferrer">LinkedIn</Link>
          <Link href={github} target="_blank" rel="noreferrer">GitHub</Link>
          <Link href={scholar} target="_blank" rel="noreferrer">Scholar</Link>
        </div>
      </div>
    </footer>
  );
}
