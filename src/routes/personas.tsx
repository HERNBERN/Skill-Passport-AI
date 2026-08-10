import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, FileStack, ShieldCheck, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { JobMatchPanel, type JobMatchItem } from "@/components/job-match-panel";
import { QrBlock } from "@/components/passport-document";
import { AntiBiasPanel, RadialScore, ReadinessBreakdownPanel, dimensionScores } from "@/components/readiness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { personas } from "@/data/impact";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/personas")({
  head: () => ({
    meta: [
      { title: "Demo Personas — SkillLens AI" },
      {
        name: "description",
        content:
          "Five demo personas — CS student, design student, career changer, NEET youth and micro-entrepreneur — each with evidence, skill passport, job matching and a learning roadmap.",
      },
      { property: "og:title", content: "Demo Personas — SkillLens AI" },
      {
        property: "og:description",
        content: "Explore evidence, passports, job matches and roadmaps for five representative personas.",
      },
    ],
  }),
  component: PersonasPage,
});

function PersonasPage() {
  const [activeId, setActiveId] = useState(personas[0]!.id);
  const persona = personas.find((item) => item.id === activeId) ?? personas[0]!;
  const dimensions = dimensionScores(persona.readiness);
  const jobMatches = useMemo<JobMatchItem[]>(
    () =>
      persona.jobMatches.map((match, index) => ({
        id: `${persona.id}-${index}`,
        matchScore: match.matchScore,
        title: match.title,
        matching: match.matching,
        missing: match.missing,
        rationale: match.rationale,
        justifications: match.matching.flatMap((skillName) => {
          const skill = persona.skills.find((item) => item.name === skillName);
          if (!skill) return [];
          return [
            {
              skill: skill.name,
              quote: skill.quote,
              source: `${persona.name} evidence bundle`,
              locator: `${skill.level} · ${skill.transferable ? "transferable" : "technical"}`,
              confidence: skill.confidence,
            },
          ];
        }),
      })),
    [persona],
  );
  const publicPath = `/p/${persona.passportNumber}`;
  const publicUrl =
    typeof window === "undefined" ? publicPath : `${window.location.origin}${publicPath}`;

  return (
    <AppShell
      title="Demo Personas"
      description="โหมดเดโม 5 โปรไฟล์ตัวแทนกลุ่มเป้าหมาย พร้อมหลักฐาน, Skill Passport, Job Matching และ Learning Roadmap ครบทุกส่วน"
      actions={
        <Badge variant="secondary" className="gap-1">
          <Sparkles className="size-3" />
          Demo mode
        </Badge>
      }
    >
      <div className="flex gap-2 overflow-x-auto pb-1">
        {personas.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={cn(
              "min-h-11 shrink-0 rounded-lg border px-4 py-2 text-left transition-colors",
              item.id === persona.id
                ? "border-primary bg-accent"
                : "border-border bg-surface hover:bg-accent/50",
            )}
          >
            <p className="text-sm font-medium">{item.name}</p>
            <p className="text-eyebrow mt-0.5">{item.kind}</p>
          </button>
        ))}
      </div>

      <section className="panel mt-4 grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <RadialScore value={persona.readiness.total} size={168} caption="Work Readiness" />
        <div>
          <p className="text-eyebrow">{persona.kind}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">{persona.name}</h2>
          <p className="text-sm text-muted-foreground">{persona.headline}</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{persona.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="gap-1">
              <ShieldCheck className="size-3" />
              {persona.verificationStatus}
            </Badge>
            <Badge variant={persona.hasResume ? "secondary" : "outline"}>
              {persona.hasResume ? "Resume" : "No resume"}
            </Badge>
            <Badge variant={persona.hasPortfolio ? "secondary" : "outline"}>
              {persona.hasPortfolio ? "Portfolio" : "No portfolio"}
            </Badge>
            <Badge variant={persona.hasGithub ? "secondary" : "outline"}>
              {persona.hasGithub ? "GitHub" : "No GitHub"}
            </Badge>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {dimensions.map((dimension) => (
              <div key={dimension.id} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-xs font-medium">{dimension.label}</p>
                <p className="mt-1 font-display text-xl font-semibold">{dimension.value}%</p>
                <Progress value={dimension.value} className="mt-1.5 h-1.5" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-md border border-border bg-card p-2 text-foreground">
            <QrBlock value={publicUrl} size={96} />
          </div>
          <p className="font-mono text-[11px] text-muted-foreground">{persona.passportNumber}</p>
          <Button asChild size="sm" variant="outline">
            <a href={publicPath}>Public passport</a>
          </Button>
        </div>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <FileStack className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Evidence sources</h2>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {persona.evidenceSources.map((source) => (
              <li key={source.label} className="py-3">
                <p className="text-sm font-medium">{source.label}</p>
                <p className="font-mono text-[11px] text-muted-foreground">
                  {source.kind} · {source.note}
                </p>
              </li>
            ))}
          </ul>
          <Separator className="my-3" />
          <p className="text-eyebrow">Certificates</p>
          <ul className="mt-1.5 space-y-1 text-xs text-muted-foreground">
            {persona.certificates.map((item) => (
              <li key={item} className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-eyebrow mt-3">Projects</p>
          <p className="mt-1 text-xs text-muted-foreground">{persona.projects.join(" · ")}</p>
        </section>

        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Skills & evidence quotes</h2>
          </div>
          <ul className="mt-3 space-y-3">
            {persona.skills.map((skill) => (
              <li key={skill.name} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium">{skill.name}</p>
                  <Badge variant="secondary">{skill.level}</Badge>
                  {skill.transferable ? <Badge variant="outline">Transferable</Badge> : null}
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {Math.round(skill.confidence * 100)}%
                  </span>
                </div>
                <Progress value={skill.confidence * 100} className="mt-2 h-1.5" />
                <p className="mt-2 rounded-md border-l-2 border-primary bg-background p-2 text-xs leading-relaxed">
                  “{skill.quote}”
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <JobMatchPanel
        matches={jobMatches}
        className="mt-4"
        title={`Job matching & ranking — ${persona.name}`}
      />

      <div className="mt-4 grid gap-4">
        <section className="panel p-5">
          <div className="flex items-center gap-2">
            <CalendarClock className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Learning roadmap</h2>
          </div>
          <ol className="mt-3 space-y-3">
            {persona.roadmap.map((step) => (
              <li key={step.week} className="rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">
                    Week {step.week} · {step.focus}
                  </p>
                  <span className="font-mono text-[11px] text-muted-foreground">{step.hours} ชม.</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{step.action}</p>
                <p className="mt-1 text-xs text-success">ผลลัพธ์: {step.outcome}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <ReadinessBreakdownPanel breakdown={persona.readiness} className="mt-4" />
      <AntiBiasPanel className="mt-4" />
    </AppShell>
  );
}
