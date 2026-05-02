import PageIntro from "@/components/PageIntro";
import { getSkillGroups } from "@/lib/content";
import SkillGrid from "@/components/SkillGrid";

export default async function SkillsPage() {
  const groups = await getSkillGroups();

  return (
    <>
      <PageIntro
        eyebrow="Skills"
        title="Technical toolkit"
        description="Engineering and research capabilities grouped by execution area."
      />
      <SkillGrid groups={groups} />
    </>
  );
}
