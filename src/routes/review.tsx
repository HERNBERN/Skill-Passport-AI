import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EvidenceItem } from "@/components/skill-evidence";
import { skills } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Verification Queue — SkillLens AI" },
      {
        name: "description",
        content:
          "Faculty and assessors review the underlying evidence and issue digital verification for each claimed skill.",
      },
      { property: "og:title", content: "Verification Queue — SkillLens AI" },
      {
        property: "og:description",
        content: "Approve or reject skills based on the original evidence, not on AI guesses.",
      },
    ],
  }),
  component: ReviewPage,
});

type Decision = "approved" | "rejected";

function ReviewPage() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  function decide(id: string, name: string, decision: Decision) {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
    toast.success(
      decision === "approved" ? `ยืนยันทักษะ ${name} แล้ว` : `ปฏิเสธทักษะ ${name}`,
      { description: "บันทึกการตัดสินใจพร้อม Digital Verification ในโหมด Demo" },
    );
  }

  return (
    <AppShell
      title="Verification Queue"
      description="ตรวจสอบหลักฐาน ยืนยันความถูกต้อง และออก Digital Verification"
    >
      <div className="space-y-4">
        {skills.map((skill) => {
          const decision = decisions[skill.id];
          return (
            <section key={skill.id} className="panel p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-semibold">{skill.name}</h2>
                  <p className="text-eyebrow mt-1">
                    {skill.category} · {skill.level} · {Math.round(skill.confidence * 100)}% confidence
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {decision ? (
                    <Badge
                      className={cn(decision === "rejected" && "bg-destructive text-destructive-foreground")}
                    >
                      {decision === "approved" ? "Verified by reviewer" : "Rejected"}
                    </Badge>
                  ) : (
                    <Badge variant="outline">{skill.verified ? "Verified" : "Pending"}</Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-2">
                {skill.evidence.map((evidence) => (
                  <EvidenceItem key={evidence.id} evidence={evidence} />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button size="sm" onClick={() => decide(skill.id, skill.name, "approved")}>
                  <ShieldCheck className="size-4" />
                  ยืนยันหลักฐาน
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => decide(skill.id, skill.name, "rejected")}
                >
                  <ShieldX className="size-4" />
                  ไม่ผ่านการตรวจสอบ
                </Button>
              </div>
            </section>
          );
        })}
      </div>
    </AppShell>
  );
}
