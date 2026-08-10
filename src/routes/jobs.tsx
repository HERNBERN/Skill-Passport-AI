import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, CircleSlash, Lightbulb } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { jobRoles, type JobRole } from "@/data/demo";
import { cn } from "@/lib/utils";
import { readPipelineState } from "@/lib/pipeline-state";
import { toast } from "sonner";

const PILLAR_LABELS: Record<string, string> = {
  RRK: "ความรู้เชิงงาน",
  GCA: "ความสามารถคิดวิเคราะห์",
  Leadership: "ความเป็นผู้นำ",
  Googleyness: "ความเป็น Google",
};

function getQualityLabel(score: number) {
  if (score >= 90) return "ดีเด่น";
  if (score >= 75) return "แข็งแรง";
  if (score >= 55) return "พัฒนาได้";
  return "ยังมีช่องว่าง";
}

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "การจับคู่งาน — SkillLens AI" },
      {
        name: "description",
        content:
          "จับคู่งานด้วย AI ที่อิงทักษะและหลักฐานจริง พร้อมเหตุผลในการประเมินและช่องว่างทักษะ",
      },
      { property: "og:title", content: "การจับคู่งาน — SkillLens AI" },
      {
        property: "og:description",
        content: "คะแนนความเหมาะสมแต่ละตำแหน่งมาพร้อมคำอธิบายเหตุผลและสรุปคะแนน Pillar",
      },
    ],
  }),
  component: JobsPage,
});

function scoreTone(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-warning";
  return "text-destructive";
}

function JobsPage() {
  const [selected, setSelected] = useState<JobRole | null>(null);
  const [matches, setMatches] = useState<JobRole[]>(jobRoles);
  const [customJobDescription, setCustomJobDescription] = useState("");
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    const pipeline = readPipelineState();
    if (pipeline?.jobMatches?.length) {
      setMatches(pipeline.jobMatches);
      setSelected(pipeline.jobMatches[0]!);
      setUsingFallback(false);
      return;
    }

    setSelected(jobRoles[0]!);
  }, []);

  function applyDescriptionScoring() {
    if (!customJobDescription.trim()) {
      toast.error("โปรดใส่รายละเอียดตำแหน่งงานก่อนคำนวณ");
      return;
    }

    const normalized = customJobDescription.toLowerCase();
    const scored = matches
      .map((role) => {
        const bonus = role.matchingSkills.reduce(
          (total, skill) => (normalized.includes(skill.toLowerCase()) ? total + 5 : total),
          0,
        );
        return {
          ...role,
          matchScore: Math.min(100, role.matchScore + bonus),
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    setMatches(scored);
    setSelected(scored.find((role) => role.id === selected?.id) ?? scored[0]!);
    toast.success("คำนวณ Match Score แล้ว", {
      description: "ปรับคะแนนตามคำอธิบายตำแหน่งงานของคุณแล้ว",
    });
  }

  return (
    <AppShell
      title="การจับคู่งาน"
      description="AI วิเคราะห์คะแนนความเหมาะสมจากทักษะหลักฐานจริง พร้อมเหตุผลและแนวทางพัฒนา"
    >
      {usingFallback ? (
        <section className="panel mb-6 rounded-lg border-l-4 border-primary bg-primary/5 p-5 text-sm text-muted-foreground">
          ยังไม่มีผลการวิเคราะห์การจับคู่งานในเซสชันนี้ หากต้องการข้อมูลใหม่ ให้ไปที่หน้า Smart Upload แล้วรัน pipeline อีกครั้ง
        </section>
      ) : null}

      <section className="panel mb-6 rounded-lg bg-surface p-5 text-sm leading-relaxed text-muted-foreground">
        ระบบนี้ให้คะแนนตามหลักฐานทักษะจริงของผู้สมัคร ไม่ได้อิงเพียงวุฒิการศึกษา ชื่อสถาบัน หรือคำค้นหาแบบเดิม
        ให้เห็นทั้งความตรงกับตำแหน่ง, ช่องว่างทักษะ, และความแข็งแกร่งของ Pillar ตาม Google Four Pillars
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-3">
          {matches
            .slice()
            .sort((a, b) => b.matchScore - a.matchScore)
            .map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelected(role)}
                className={cn(
                  "panel w-full p-4 text-left transition-shadow hover:shadow-raised",
                  selected?.id === role.id && "ring-2 ring-ring",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate font-display text-base font-semibold">{role.title}</h2>
                    <p className="truncate text-xs text-muted-foreground">
                      {role.company} · {role.location}
                    </p>
                  </div>
                  <span className={cn("font-display text-2xl font-semibold", scoreTone(role.matchScore))}>
                    {role.matchScore}
                  </span>
                </div>
                <Progress value={role.matchScore} className="mt-3 h-1.5" />
              </button>
            ))}
        </div>

        <section className="panel h-fit p-6">
          <p className="text-eyebrow">การวิเคราะห์ความเหมาะสม</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{selected?.title ?? "เลือกตำแหน่งงาน"}</h2>
          <p className="text-sm text-muted-foreground">
            {selected ? `${selected.company} · ${selected.location}` : "เลือกตำแหน่งจากฝั่งซ้ายเพื่อดูรายละเอียด"}
          </p>

          {selected ? (
            <>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <article className="rounded-3xl border border-border bg-surface p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">คะแนนความเหมาะสม</p>
                  <p className={cn("mt-3 text-4xl font-semibold", scoreTone(selected.matchScore))}>{selected.matchScore}%</p>
                  <p className="mt-2 text-sm text-muted-foreground">{getQualityLabel(selected.matchScore)} สำหรับตำแหน่งนี้</p>
                </article>
                <article className="rounded-3xl border border-border bg-surface p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">ทักษะ</p>
                  <p className="mt-3 text-3xl font-semibold">{selected.matchingSkills.length}</p>
                  <p className="mt-2 text-sm text-muted-foreground">ตรง {selected.matchingSkills.length} · ขาด {selected.missingSkills.length}</p>
                </article>
                <article className="rounded-3xl border border-border bg-surface p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Pillar เด่น</p>
                  <p className="mt-3 text-3xl font-semibold">
                    {selected.pillarScores
                      ? Object.entries(selected.pillarScores)
                          .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
                          .map(([pillar, score]) => `${PILLAR_LABELS[pillar] ?? pillar} ${Math.round(score ?? 0)}%`)
                          .slice(0, 1)
                          .join("")
                      : "ยังไม่มี"}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">สรุปจุดแข็งที่ระบบประเมิน</p>
                </article>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <CheckCircle2 className="size-4 text-success" />
                    ทักษะที่ตรงกัน
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.matchingSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-medium">
                    <CircleSlash className="size-4 text-destructive" />
                    ทักษะที่ยังขาด
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.missingSkills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selected.pillarScores ? (
                <div className="mt-6 rounded-md border border-border bg-surface p-4">
                  <h3 className="text-sm font-medium">สรุปภาพรวม Pillar</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    รายงานคะแนนตาม Google Four Pillars ที่คำนวณจากหลักฐานทักษะและความสามารถจริงของผู้สมัคร
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {Object.entries(selected.pillarScores).map(([pillar, score]) => (
                      <div key={pillar} className="rounded-lg border border-border bg-background p-3">
                        <p className="text-xs font-medium text-muted-foreground">{PILLAR_LABELS[pillar] ?? pillar}</p>
                        <div className="mt-2 flex items-baseline justify-between gap-2">
                          <span className="font-display text-2xl font-semibold">{Math.round(score ?? 0)}%</span>
                          <Badge variant="secondary" className="text-[11px]">
                            {pillar}
                          </Badge>
                        </div>
                        <Progress value={score ?? 0} className="mt-3 h-1.5" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-md border border-border bg-surface p-4">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    รัน Smart Upload ก่อนเพื่อดูการวิเคราะห์ Pillar Breakdown ตามหลักฐานจริงของผู้สมัคร
                  </p>
                </div>
              )}

              <div className="mt-6 rounded-md border border-border bg-surface p-4">
                <h3 className="text-sm font-medium">เหตุผลในการประเมิน</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.rationale}</p>
              </div>

              <div className="mt-3 rounded-md border border-border bg-surface p-4">
                <h3 className="flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="size-4 text-primary" />
                  แนวทางพัฒนา
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.advice}</p>
              </div>
            </>
          ) : null}

          <div className="mt-6">
            <label htmlFor="jd" className="text-sm font-medium">
              เทียบกับ Job Description ของคุณเอง
            </label>
            <Textarea
              id="jd"
              rows={4}
              value={customJobDescription}
              onChange={(event) => setCustomJobDescription(event.target.value)}
              className="mt-2"
              placeholder="วางรายละเอียดตำแหน่งงาน…"
            />
            <Button className="mt-3" variant="outline" onClick={applyDescriptionScoring}>
              คำนวณคะแนนความเหมาะสม
            </Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
