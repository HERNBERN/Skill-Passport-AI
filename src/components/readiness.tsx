import { AlertTriangle, BadgeCheck, EyeOff, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { BIAS_ALLOWED, BIAS_EXCLUDED, biasFlags, type ReadinessBreakdown } from "@/data/impact";
import { cn } from "@/lib/utils";

/** Big radial progress ring. Pure SVG so it renders identically on the server. */
export function RadialScore({
  value,
  size = 208,
  caption,
}: {
  value: number;
  size?: number;
  caption?: string;
}) {
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" role="img" aria-label={`Score ${value}%`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-5xl font-semibold leading-none">{value}%</span>
        {caption ? (
          <span className="mt-2 max-w-[9rem] text-xs leading-relaxed text-muted-foreground">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const DIMENSIONS: { id: string; label: string; labelTh: string; parts: string[]; note: string }[] = [
  {
    id: "problem",
    label: "Problem Management",
    labelTh: "การจัดการปัญหา",
    parts: ["r7", "r3"],
    note: "ทักษะการคิดวิเคราะห์และการแก้ปัญหา — วัดจากความซับซ้อนของงานและความต่อเนื่องในการเรียนรู้",
  },
  {
    id: "work",
    label: "Work Management",
    labelTh: "การจัดการงาน",
    parts: ["r1", "r2", "r5", "r4"],
    note: "การวางแผนและคุณภาพงาน — วัดจากคุณภาพหลักฐาน ความหลากหลายของโปรเจกต์ และผลงานที่เผยแพร่",
  },
  {
    id: "team",
    label: "Team Management",
    labelTh: "การจัดการทีม",
    parts: ["r6", "r8"],
    note: "การสื่อสารและภาวะผู้นำ — วัดจากประสบการณ์ทำงานร่วมกันและระดับการยืนยันจากบุคคลที่สาม",
  },
];

export function dimensionScores(breakdown: ReadinessBreakdown) {
  return DIMENSIONS.map((dimension) => {
    const parts = breakdown.components.filter((component) => dimension.parts.includes(component.id));
    const weight = parts.reduce((total, part) => total + part.weight, 0);
    const score = parts.reduce((total, part) => total + part.score, 0);
    return {
      ...dimension,
      value: weight ? Math.round((score / weight) * 100) : 0,
      weight,
    };
  });
}

export function ReadinessHero({
  breakdown,
  name,
  status,
  headline,
}: {
  breakdown: ReadinessBreakdown;
  name: string;
  status: string;
  headline: string;
}) {
  const dimensions = dimensionScores(breakdown);
  return (
    <section className="panel grid gap-8 p-6 lg:grid-cols-[auto_1fr] lg:items-center">
      <div className="flex flex-col items-center gap-3">
        <RadialScore value={breakdown.total} caption="Work Readiness Score" />
        <Badge className="gap-1">
          <ShieldCheck className="size-3" />
          Verified by SkillLens AI
        </Badge>
        <p className="font-mono text-[11px] text-muted-foreground">{status}</p>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-eyebrow">Work readiness · {name}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold leading-snug">{headline}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            คะแนนคำนวณจากหลักฐานเท่านั้น และแยกออกเป็น 3 มิติสมรรถนะหลัก ทุกองค์ประกอบอธิบายได้และตรวจสอบย้อนกลับได้
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="rounded-lg border border-border bg-surface p-4">
              <p className="text-sm font-medium">{dimension.label}</p>
              <p className="text-eyebrow mt-0.5">{dimension.labelTh}</p>
              <p className="mt-2 font-display text-2xl font-semibold">{dimension.value}%</p>
              <Progress value={dimension.value} className="mt-2 h-1.5" />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{dimension.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReadinessBreakdownPanel({
  breakdown,
  className,
}: {
  breakdown: ReadinessBreakdown;
  className?: string;
}) {
  const totalWeight = breakdown.components.reduce((total, component) => total + component.weight, 0);
  return (
    <section className={cn("panel p-5", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-semibold">Work Readiness — explainable breakdown</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            น้ำหนักรวม {totalWeight} คะแนน · ได้ {breakdown.total} คะแนน · ทุกบรรทัดมีเหตุผลจากหลักฐาน
          </p>
        </div>
        <Badge variant="secondary" className="font-mono">
          {breakdown.total}/100
        </Badge>
      </div>

      <ul className="mt-4 space-y-3">
        {breakdown.components.map((component) => {
          const pct = component.weight ? Math.round((component.score / component.weight) * 100) : 0;
          return (
            <li key={component.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm font-medium">
                  {component.label}{" "}
                  <span className="text-muted-foreground">· {component.labelTh}</span>
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {component.score}/{component.weight} pts · weight {component.weight}%
                </p>
              </div>
              <Progress value={pct} className="mt-2 h-1.5" />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{component.reason}</p>
            </li>
          );
        })}
      </ul>

      <Separator className="my-4" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-eyebrow">จุดแข็งที่มีหลักฐานรองรับ</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {breakdown.strengths.map((item) => (
              <li key={item} className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow">สิ่งที่จะทำให้คะแนนเพิ่มขึ้น</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {breakdown.recommendations.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function AntiBiasPanel({ className }: { className?: string }) {
  return (
    <section className={cn("panel p-5", className)}>
      <div className="flex items-center gap-2">
        <EyeOff className="size-4 text-primary" />
        <h2 className="font-display text-lg font-semibold">Anti-Bias notice</h2>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        ระบบตรวจพบข้อมูลที่อาจก่อให้เกิดอคติในเอกสาร และตัดออกก่อนคำนวณคะแนนทุกครั้ง
      </p>

      <div className="mt-4 space-y-3">
        {biasFlags.map((flag) => (
          <div key={`${flag.field}-${flag.detectedIn}`} className="rounded-lg border border-warning/40 bg-warning/10 p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" />
              <p className="text-sm font-medium">พบข้อมูลที่อาจก่อให้เกิดอคติ: {flag.field}</p>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">{flag.detectedIn}</p>
            <p className="mt-2 rounded-md border-l-2 border-warning bg-background p-2 text-xs">
              “{flag.excerpt}”
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{flag.action}</p>
          </div>
        ))}
      </div>

      <Separator className="my-4" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-eyebrow">ฟิลด์ที่ระบบ “ห้ามใช้” ในการคำนวณ</p>
          <ul className="mt-2 space-y-2 text-xs">
            {BIAS_EXCLUDED.map((item) => (
              <li key={item.field}>
                <p className="font-medium">
                  {item.field} <span className="text-muted-foreground">· {item.labelTh}</span>
                </p>
                <p className="text-muted-foreground">{item.reason}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-eyebrow">สัญญาณที่อนุญาตให้ใช้เท่านั้น</p>
          <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
            {BIAS_ALLOWED.map((item) => (
              <li key={item} className="flex gap-2">
                <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            หากโปรไฟล์ไม่มี GitHub หรือพอร์ตโฟลิโอ ระบบจะแสดงน้ำหนักนั้นอย่างโปร่งใสและไม่นำมาหักคะแนนในการจับคู่งาน
          </p>
        </div>
      </div>
    </section>
  );
}
