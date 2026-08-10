import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BadgeCheck,
  FileStack,
  ShieldAlert,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { EvidenceGraph } from "@/components/evidence-graph";
import { QrBlock } from "@/components/passport-document";
import { ReadinessHero } from "@/components/readiness";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { candidates, evidenceFiles, jobRoles, skills } from "@/data/demo";
import { personas } from "@/data/impact";
import { useSession } from "@/lib/session";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SkillLens AI" },
      {
        name: "description",
        content: "Verified skills, evidence coverage and work readiness at a glance.",
      },
      { property: "og:title", content: "Dashboard — SkillLens AI" },
      { property: "og:description", content: "Evidence coverage and work readiness overview." },
    ],
  }),
  component: DashboardPage,
});

const CATEGORY_ORDER = [
  "Programming Language",
  "Framework",
  "Database",
  "DevOps",
  "Cloud",
  "Research",
  "Design",
  "Soft Skill",
] as const;

/** Benchmark for the target role (Backend Developer). */
const TARGET_PROFILE: Record<(typeof CATEGORY_ORDER)[number], number> = {
  "Programming Language": 90,
  Framework: 85,
  Database: 85,
  DevOps: 75,
  Cloud: 70,
  Research: 40,
  Design: 35,
  "Soft Skill": 70,
};

function EvidenceTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload?: { category?: string; score?: number; target?: number; sources?: string[] } }[];
}) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return (
    <div className="max-w-64 rounded-lg border border-border bg-card p-3 text-xs shadow-raised">
      <p className="font-medium">{point.category}</p>
      <p className="mt-1 font-mono text-[11px] text-muted-foreground">
        you {point.score}% · target {point.target}%
      </p>
      <p className="text-eyebrow mt-2">คะแนนนี้มาจากหลักฐาน</p>
      <ul className="mt-1 space-y-1 text-muted-foreground">
        {(point.sources ?? []).map((source) => (
          <li key={source}>{source}</li>
        ))}
        {(point.sources ?? []).length === 0 ? <li>ยังไม่มีหลักฐานในหมวดนี้</li> : null}
      </ul>
    </div>
  );
}


function DashboardPage() {
  const { session } = useSession();
  const candidate = candidates[0]!;
  const verified = skills.filter((s) => s.verified).length;
  const evidenceCount = skills.reduce((total, s) => total + s.evidence.length, 0);

  const radarData = CATEGORY_ORDER.map((category) => {
    const group = skills.filter((s) => s.category === category);
    const score = group.length
      ? Math.round((group.reduce((t, s) => t + s.confidence, 0) / group.length) * 100)
      : 0;
    const sources = group
      .flatMap((s) => s.evidence.map((e) => `${s.name} ← ${e.repository ?? e.sourceName}`))
      .slice(0, 3);
    return {
      category: category.replace(" Language", ""),
      score,
      target: TARGET_PROFILE[category],
      sources,
    };
  });


  const publicPath = `/p/${candidate.passportNumber}`;
  const publicUrl =
    typeof window === "undefined" ? publicPath : `${window.location.origin}${publicPath}`;

  const matchData = jobRoles

    .slice()
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)
    .map((role) => ({ title: role.title, score: role.matchScore }));

  return (
    <AppShell
      title={`สวัสดี ${session?.name ?? ""}`}
      description="ภาพรวมทักษะที่ผ่านการตรวจสอบ พร้อมหลักฐานอ้างอิงทุกรายการ"
      actions={
        <Button asChild size="sm">
          <Link to="/passport">
            <BadgeCheck className="size-4" />
            Skill Passport
          </Link>
        </Button>
      }
    >
      <ReadinessHero
        breakdown={personas[0]!.readiness}
        name={candidate.name}
        status={`Passport ${candidate.passportNumber} · ${candidate.verificationStatus}`}
        headline="Job-Ready in Software Engineering"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Verified skills" value={`${verified}/${skills.length}`} icon={BadgeCheck} />
        <Stat label="Evidence items" value={String(evidenceCount)} icon={FileStack} />
        <Stat label="Evidence files" value={String(evidenceFiles.length)} icon={FileStack} />
        <Stat
          label="Work readiness"
          value={`${candidate.workReadiness}%`}
          icon={TrendingUp}
          progress={candidate.workReadiness}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Skill DNA — you vs. target role</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            เปรียบเทียบทักษะปัจจุบันกับเกณฑ์ของตำแหน่ง Backend Developer — วางเมาส์บนยอดกราฟเพื่อดูว่าคะแนนมาจากหลักฐานใด
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Tooltip content={<EvidenceTooltip />} />
                <Radar
                  name="Target role"
                  dataKey="target"
                  stroke="var(--color-border)"
                  fill="var(--color-muted)"
                  fillOpacity={0.35}
                />
                <Radar
                  name="Your evidence"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  fill="var(--color-primary)"
                  fillOpacity={0.28}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>


        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Top job matches</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            คะแนนอธิบายได้ทุกตำแหน่ง พร้อมทักษะที่ตรงและที่ยังขาด
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={matchData} layout="vertical" margin={{ left: 12, right: 16 }}>
                <CartesianGrid horizontal={false} stroke="var(--color-border)" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="title"
                  width={130}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                  {matchData.map((entry) => (
                    <Cell key={entry.title} fill="var(--color-primary)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <EvidenceGraph ownerName={candidate.name} skills={skills} className="mt-6" />

      <section className="panel mt-6 flex flex-wrap items-center gap-5 p-5">
        <div className="rounded-md border border-border bg-card p-2 text-foreground">
          <QrBlock value={publicUrl} size={92} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-base font-semibold">Trust & verification</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            สแกน QR เพื่อเปิด Digital Skill Passport ฉบับย่อ — HR ตรวจสอบได้ทันทีโดยไม่ต้องล็อกอิน
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge className="gap-1">
              <BadgeCheck className="size-3" />
              GitHub API verified
            </Badge>
            <Badge variant="secondary">University transcript checked</Badge>
            <Badge variant="secondary">Reviewer signed</Badge>
            <Badge variant="outline" className="font-mono">
              {candidate.passportNumber}
            </Badge>
          </div>
        </div>
        <Button asChild size="sm" variant="outline">
          <Link to="/p/$passportNumber" params={{ passportNumber: candidate.passportNumber }}>
            Public passport
          </Link>
        </Button>
      </section>



      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Recent evidence files</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/skills">
                View all
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {evidenceFiles.map((file) => (
              <li key={file.id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {file.kind} · {file.pages} page{file.pages > 1 ? "s" : ""} · {file.sizeKb} KB ·{" "}
                    {file.uploadedAt}
                  </p>
                </div>
                <Badge variant="secondary">{file.extractedSkills} skills</Badge>
                <Badge>Completed</Badge>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Needs attention</h2>
          <ul className="mt-3 space-y-3">
            {skills
              .filter((skill) => !skill.verified)
              .map((skill) => (
                <li key={skill.id} className="rounded-md border border-border bg-surface p-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="size-4 text-warning" />
                    <p className="text-sm font-medium">{skill.name}</p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ยังไม่ได้รับการยืนยันจากผู้ประเมิน — แสดงเป็น Unverified
                  </p>
                </li>
              ))}
          </ul>
          {session?.role === "recruiter" ? (
            <Button asChild variant="outline" size="sm" className="mt-4 w-full">
              <Link to="/recruiter">
                <Users className="size-4" />
                Talent search
              </Link>
            </Button>
          ) : null}
        </section>
      </div>
    </AppShell>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  progress,
}: {
  label: string;
  value: string;
  icon: typeof BadgeCheck;
  progress?: number;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between">
        <p className="text-eyebrow">{label}</p>
        <Icon className="size-4 text-primary" />
      </div>
      <p className="mt-2 font-display text-3xl font-semibold">{value}</p>
      {typeof progress === "number" ? <Progress value={progress} className="mt-3 h-1.5" /> : null}
    </div>
  );
}
