import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  GraduationCap,
  HeartHandshake,
  Quote,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cohortImpact, gapClosure, impactMetrics, readinessTrend, successStories } from "@/data/impact";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Social Impact Dashboard — SkillLens AI" },
      {
        name: "description",
        content:
          "Social impact metrics for SkillLens AI: passports issued for NEET youth, interviews granted, hires reported, skill-gap closure and success stories.",
      },
      { property: "og:title", content: "Social Impact Dashboard — SkillLens AI" },
      {
        property: "og:description",
        content: "Measurable outcomes: readiness lift, skill-gap closure and hiring results by cohort.",
      },
    ],
  }),
  component: ImpactPage,
});

const tooltipStyle = {
  background: "var(--color-card)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  fontSize: 12,
};

const axisTick = { fill: "var(--color-muted-foreground)", fontSize: 11 };

function ImpactPage() {
  return (
    <AppShell
      title="Social Impact Dashboard"
      description="ตัวชี้วัดผลลัพธ์ทางสังคมของแพลตฟอร์ม พร้อมกราฟที่อ่านเข้าใจง่ายและเรื่องราวความสำเร็จจริง"
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="ผู้ใช้ทั้งหมด" value={impactMetrics.totalUsers.toLocaleString()} icon={Users} />
        <Metric
          label="Passport ของกลุ่ม NEET"
          value={impactMetrics.neetPassports.toLocaleString()}
          icon={HeartHandshake}
        />
        <Metric
          label="ทักษะที่ยืนยันแล้ว"
          value={impactMetrics.verifiedSkills.toLocaleString()}
          icon={UserCheck}
        />
        <Metric
          label="ได้รับเชิญสัมภาษณ์"
          value={impactMetrics.interviewsGranted.toLocaleString()}
          icon={TrendingUp}
        />
        <Metric label="ได้งานที่รายงานผล" value={impactMetrics.hiresReported.toLocaleString()} icon={UserCheck} />
        <Metric label="องค์กรที่ใช้งาน" value={String(impactMetrics.organisations)} icon={Building2} />
        <Metric label="สถาบันการศึกษา" value={String(impactMetrics.universities)} icon={GraduationCap} />
        <Metric
          label="Work Readiness เพิ่มขึ้นเฉลี่ย"
          value={`+${impactMetrics.averageReadinessLift}`}
          icon={TrendingUp}
          progress={impactMetrics.averageReadinessLift * 5}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Readiness & job-match trend</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ค่าเฉลี่ย Work Readiness และอัตราการจับคู่งานของผู้ใช้ต่อเดือน
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readinessTrend} margin={{ left: 4, right: 12 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} />
                <YAxis domain={[0, 100]} tick={axisTick} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="readiness"
                  name="Work readiness"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="matched"
                  name="Job matched (%)"
                  stroke="var(--color-success)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Outcomes by cohort</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            จำนวน Passport, การได้สัมภาษณ์ และการได้งาน แยกตามกลุ่มเป้าหมาย
          </p>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cohortImpact} margin={{ left: 4, right: 12 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="cohort" tick={{ ...axisTick, fontSize: 10 }} interval={0} />
                <YAxis tick={axisTick} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="passports" name="Passports" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interviews" name="Interviews" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="hires" name="Hires" fill="var(--color-warning)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Skill-gap closure</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            สัดส่วนผู้ใช้ที่มีหลักฐานทักษะนั้น ก่อนและหลังใช้ Learning Roadmap
          </p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gapClosure} layout="vertical" margin={{ left: 12, right: 16 }}>
                <CartesianGrid stroke="var(--color-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={axisTick} />
                <YAxis type="category" dataKey="skill" width={120} tick={axisTick} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="before" name="ก่อน (%)" fill="var(--color-border)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="after" name="หลัง (%)" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">ผลลัพธ์เชิงระบบ</h2>
          <ul className="mt-4 space-y-4">
            <Ratio label="ลดช่องว่างทักษะ (Skill gap)" value={impactMetrics.skillGapReduction} />
            <Ratio label="ลดการจับคู่งานที่ไม่ตรงสาย" value={impactMetrics.jobMismatchReduction} />
            <Ratio
              label="สัดส่วน Passport ของกลุ่ม NEET"
              value={Math.round((impactMetrics.neetPassports / impactMetrics.totalUsers) * 100)}
            />
            <Ratio
              label="อัตราการได้สัมภาษณ์ต่อผู้ใช้"
              value={Math.round((impactMetrics.interviewsGranted / impactMetrics.totalUsers) * 100)}
            />
          </ul>
        </section>
      </div>

      <section className="mt-6">
        <h2 className="font-display text-lg font-semibold">Success Stories</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          เรื่องราวของผู้ใช้จริงในแต่ละกลุ่มเป้าหมาย — ก่อน, สิ่งที่ทำ และผลลัพธ์ที่วัดได้
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {successStories.map((story) => (
            <article key={story.id} className="panel flex flex-col gap-3 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-base font-semibold">{story.name}</h3>
                <Badge variant="secondary">{story.persona}</Badge>
                <Badge className="ml-auto font-mono">{story.metric}</Badge>
              </div>
              <dl className="space-y-2 text-xs">
                <div>
                  <dt className="text-eyebrow">ก่อน</dt>
                  <dd className="mt-0.5 text-muted-foreground">{story.before}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow">สิ่งที่ทำผ่าน SkillLens</dt>
                  <dd className="mt-0.5 text-muted-foreground">{story.action}</dd>
                </div>
                <div>
                  <dt className="text-eyebrow">ผลลัพธ์</dt>
                  <dd className="mt-0.5 text-success">{story.result}</dd>
                </div>
              </dl>
              <blockquote className="mt-auto rounded-md border-l-2 border-primary bg-surface p-3 text-sm leading-relaxed">
                <Quote className="mb-1 size-3 text-primary" />
                {story.quote}
              </blockquote>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function Metric({
  label,
  value,
  icon: Icon,
  progress,
}: {
  label: string;
  value: string;
  icon: typeof Users;
  progress?: number;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-eyebrow">{label}</p>
        <Icon className="size-4 shrink-0 text-primary" />
      </div>
      <p className="mt-2 font-display text-2xl font-semibold">{value}</p>
      {typeof progress === "number" ? <Progress value={progress} className="mt-3 h-1.5" /> : null}
    </div>
  );
}

function Ratio({ label, value }: { label: string; value: number }) {
  return (
    <li>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono">{value}%</span>
      </div>
      <Progress value={value} className="mt-1.5 h-1.5" />
    </li>
  );
}
