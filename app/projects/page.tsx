import ProjectCarousel from "@/components/ProjectCarousel";
import { getProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="page-intro reveal">
        <p className="eyebrow">Projects</p>
        <h1 className="proj-page-title">Built to solve real problems</h1>
      </div>

      <ProjectCarousel projects={projects} />
    </>
  );
}
