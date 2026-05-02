import { getProjects } from "@/lib/content";
import ProjectsGrid from "@/components/ProjectsGrid";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="page-intro reveal" style={{ paddingBottom: "0.5rem" }}>
        <p className="eyebrow">Projects</p>
        <h1 className="proj-page-title">Built to solve real problems</h1>
        <p className="muted" style={{ marginTop: "0.6rem", fontSize: "0.95rem", maxWidth: "540px" }}>
          A collection of research-grade systems, production tools, and applied AI experiments.
        </p>
      </div>

      <ProjectsGrid projects={projects} />
    </>
  );
}
