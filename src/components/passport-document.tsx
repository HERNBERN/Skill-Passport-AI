import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { CandidateProfile, Skill } from "@/data/demo";

export function QrBlock({ value, size }: { value: string; size: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: size, height: size }} aria-hidden />;
  return <QRCodeSVG value={value || "https://skilllens.ai"} size={size} bgColor="transparent" fgColor="currentColor" />;
}

export function PassportDocument({
  candidate,
  skills,
  publicUrl,
}: {
  candidate: CandidateProfile;
  skills: Skill[];
  publicUrl: string;
}) {
  const verified = skills.filter((skill) => skill.verified);
  const evidenceCount = skills.reduce((total, skill) => total + skill.evidence.length, 0);

  return (
    <article className="panel overflow-hidden">
      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border bg-surface p-6">
        <div>
          <p className="text-eyebrow">SkillLens AI · Digital Skill Passport</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">{candidate.name}</h2>
          <p className="text-sm text-muted-foreground">{candidate.headline}</p>
          <p className="text-sm text-muted-foreground">{candidate.university}</p>
          <dl className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-3">
            <Field label="Passport No." value={candidate.passportNumber} />
            <Field label="Issued" value={new Date().toISOString().slice(0, 10)} />
            <Field label="Authority" value="SkillLens AI Registry" />
          </dl>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-md border border-border bg-card p-2">
            <QrBlock value={publicUrl} size={92} />
          </div>
          <Badge className="gap-1">
            <ShieldCheck className="size-3" />
            {candidate.verificationStatus}
          </Badge>
        </div>
      </header>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <h3 className="font-display text-base font-semibold">Verified skills</h3>
          <ul className="mt-3 divide-y divide-border">
            {verified.map((skill) => (
              <li key={skill.id} className="flex flex-wrap items-center gap-3 py-2.5">
                <BadgeCheck className="size-4 shrink-0 text-success" />
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{skill.name}</span>
                <Badge variant="secondary">{skill.level}</Badge>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {Math.round(skill.confidence * 100)}% · {skill.evidence.length} ev.
                </span>
              </li>
            ))}
          </ul>
          {skills.length > verified.length ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {skills.length - verified.length} skill(s) are recorded as Unverified and are excluded
              from the verified list until a reviewer confirms the evidence.
            </p>
          ) : null}
        </section>

        <aside className="space-y-5">
          <div>
            <h3 className="font-display text-base font-semibold">Work readiness</h3>
            <p className="mt-1 font-display text-3xl font-semibold">{candidate.workReadiness}%</p>
            <Progress value={candidate.workReadiness} className="mt-2 h-1.5" />
          </div>
          <Separator />
          <div>
            <h3 className="font-display text-base font-semibold">Evidence summary</h3>
            <dl className="mt-2 space-y-1.5 text-sm">
              <Row label="Evidence items" value={String(evidenceCount)} />
              <Row label="Verified skills" value={`${verified.length}/${skills.length}`} />
              <Row
                label="Document sources"
                value={String(new Set(skills.flatMap((s) => s.evidence.map((e) => e.sourceName))).size)}
              />
              <Row label="GitHub user" value={candidate.githubUser} />
            </dl>
          </div>
          <Separator />
          <div>
            <h3 className="font-display text-base font-semibold">Digital signature</h3>
            <p className="mt-1 break-all font-mono text-[11px] text-muted-foreground">
              sha256:9f2c1e84b7d3a5601f8ce27b4d0a91c6f3e8b5227ad4c19e60b8f7413d2a5c88
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Signed by SkillLens AI Registry · verifiable via the public passport link.
            </p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-border bg-surface px-6 py-4">
        <h3 className="font-display text-base font-semibold">Skill timeline</h3>
        <ol className="mt-3 space-y-2 text-sm">
          {[
            { date: "2025-06", label: "Backend internship begins — Docker, CI/CD, AWS evidence" },
            { date: "2026-01", label: "Senior project submitted — Python, PostgreSQL, research evidence" },
            { date: "2026-03", label: "AWS Cloud Practitioner certificate issued" },
            { date: "2026-07", label: "Evidence bundle analysed and passport issued" },
          ].map((item) => (
            <li key={item.date} className="flex gap-3">
              <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
              <span className="text-muted-foreground">{item.label}</span>
            </li>
          ))}
        </ol>
      </footer>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-eyebrow">{label}</dt>
      <dd className="mt-0.5 font-mono text-[11px]">{value}</dd>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono text-xs">{value}</dd>
    </div>
  );
}
