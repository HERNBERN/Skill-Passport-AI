import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { EvidenceExplorer } from "@/components/evidence-explorer";
import { skills } from "@/data/demo";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills & Evidence Explorer — SkillLens AI" },
      {
        name: "description",
        content:
          "Browse extracted skills and open the source document, page and paragraph behind every claim.",
      },
      { property: "og:title", content: "Skills & Evidence Explorer — SkillLens AI" },
      {
        property: "og:description",
        content: "Split-screen document viewer with highlighted evidence and AI reasoning.",
      },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  return (
    <AppShell
      title="Skills & Evidence Explorer"
      description="ทุก Skill Card มีปุ่มดูหลักฐาน เปิด Side Panel พร้อมไฟล์ หน้า ย่อหน้า ข้อความอ้างอิง และเหตุผลของ AI"
    >
      <EvidenceExplorer skills={skills} />
    </AppShell>
  );
}
