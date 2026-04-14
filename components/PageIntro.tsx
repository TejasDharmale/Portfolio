import type { ReactNode } from "react";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
};

export default function PageIntro({ eyebrow, title, description, action }: PageIntroProps) {
  return (
    <section className="page-intro reveal">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{description}</p>
      {action ? <div className="intro-action">{action}</div> : null}
    </section>
  );
}
