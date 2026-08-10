import { createFileRoute } from "@tanstack/react-router";
import { Award, BookOpen, Clock, Hammer, Target } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { roadmap } from "@/data/demo";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Learning Roadmap — SkillLens AI" },
      {
        name: "description",
        content:
          "A weekly learning roadmap derived from real skill gaps: courses, projects, certificates, effort and expected outcomes.",
      },
      { property: "og:title", content: "Learning Roadmap — SkillLens AI" },
      {
        property: "og:description",
        content: "Close the gaps that job matching found, one week at a time.",
      },
    ],
  }),
  component: RoadmapPage,
});

const difficultyVariant = {
  Beginner: "secondary",
  Intermediate: "outline",
  Advanced: "default",
} as const;

function RoadmapPage() {
  const totalHours = roadmap.reduce((total, week) => total + week.hours, 0);

  return (
    <AppShell
      title="Learning Roadmap"
      description={`แผนรายสัปดาห์ที่สร้างจากช่องว่างทักษะจริง รวม ${totalHours} ชั่วโมง`}
    >
      <ol className="space-y-4">
        {roadmap.map((week) => (
          <li key={week.week} className="panel p-5">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold text-primary-foreground">
                W{week.week}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-lg font-semibold">{week.skill}</h2>
                  <Badge variant={difficultyVariant[week.difficulty]}>{week.difficulty}</Badge>
                  <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                    <Clock className="size-3" />
                    {week.hours}h
                  </span>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <Item icon={BookOpen} label="Course" value={week.course} />
                  <Item icon={Hammer} label="Project" value={week.project} />
                  <Item icon={Award} label="Certificate" value={week.certificate} />
                  <Item icon={Target} label="Expected outcome" value={week.outcome} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </AppShell>
  );
}

function Item({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <p className="text-eyebrow flex items-center gap-1.5">
        <Icon className="size-3" />
        {label}
      </p>
      <p className="mt-1 text-sm leading-relaxed">{value}</p>
    </div>
  );
}
