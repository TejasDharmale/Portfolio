import ProjectCarousel from "@/components/ProjectCarousel";

export default function ProjectsPage() {
  return (
    <>
      <div className="page-intro reveal">
        <p className="eyebrow">Projects</p>
        <h1 className="proj-page-title">Built to solve real problems</h1>
      </div>

      <ProjectCarousel />
    </>
  );
}
