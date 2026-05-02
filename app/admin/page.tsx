import { getProfile, getEducation, getExperience, getProjects, getPublications, getSkillGroups, getRecommendations } from "@/lib/content";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  const [profile, education, experience, projects, publications, skills, recommendations] =
    await Promise.all([
      getProfile(),
      getEducation(),
      getExperience(),
      getProjects(),
      getPublications(),
      getSkillGroups(),
      getRecommendations(),
    ]);

  return (
    <AdminDashboard
      initialData={{ profile, education, experience, projects, publications, skills, recommendations }}
    />
  );
}
