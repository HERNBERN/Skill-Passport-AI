import { useState } from "react";
import {
  ChevronRight,
  FileText,
  Github,
  Globe,
  HeartHandshake,
  Quote,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { Evidence, EvidenceSourceType, Skill } from "@/data/demo";
import { getStandardProfile } from "@/data/standards";
import { cn } from "@/lib/utils";

export function ConfidenceMeter({ value, className }: { value: number; className?: string }) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Confidence</span>
        <span className="font-mono">{Math.round(value * 100)}%</span>
      </div>
      <Progress value={value * 100} className="h-1.5" />
    </div>
  );
}

const sourceIcon: Record<EvidenceSourceType, typeof FileText> = {
  document: FileText,
  github: Github,
  portfolio: Globe,
  experience: UserRound,
  community: HeartHandshake,
  commerce: ShoppingBag,
};

export function StandardChips({ skill }: { skill: Skill }) {
  const profile = getStandardProfile(skill.name);
  if (!profile) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {profile.standards.map((standard) => (
        <span
          key={`${standard.framework}-${standard.code}`}
          className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          title={`${standard.name}${standard.level ? ` · ${standard.level}` : ""}`}
        >
          {standard.framework} {standard.code}
        </span>
      ))}
    </div>
  );
}

export function StandardDetails({ skill }: { skill: Skill }) {
  const profile = getStandardProfile(skill.name);
  if (!profile) return null;
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h3 className="font-display text-sm font-semibold">Skill standard alignment</h3>
      <ul className="mt-3 space-y-2">
        {profile.standards.map((standard) => (
          <li key={`${standard.framework}-${standard.code}`} className="text-xs">
            <span className="font-mono text-[11px] text-primary">
              {standard.framework} · {standard.code}
            </span>
            <p className="text-muted-foreground">
              {standard.name}
              {standard.level ? ` — ${standard.level}` : ""}
            </p>
          </li>
        ))}
      </ul>
      <Separator className="my-3" />
      <dl className="space-y-2 text-xs">
        <div>
          <dt className="text-eyebrow">Related occupations</dt>
          <dd className="mt-0.5 text-muted-foreground">{profile.occupations.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-eyebrow">Related learning outcomes</dt>
          <dd className="mt-0.5 text-muted-foreground">
            <ul className="list-inside list-disc">
              {profile.outcomes.map((outcome) => (
                <li key={outcome}>{outcome}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="text-eyebrow">Related skills</dt>
          <dd className="mt-0.5 text-muted-foreground">{profile.related.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-eyebrow">National Credit Bank (future integration)</dt>
          <dd className="mt-0.5 font-mono text-[11px] text-muted-foreground">
            {profile.creditBank.unitCode} · {profile.creditBank.credits} credits ·{" "}
            {profile.creditBank.status}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function SkillCard({
  skill,
  onOpenEvidence,
}: {
  skill: Skill;
  onOpenEvidence: (skill: Skill) => void;
}) {
  return (
    <article className="panel flex flex-col gap-3 p-4 transition-shadow hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-semibold">{skill.name}</h3>
          <p className="text-eyebrow mt-1">{skill.category}</p>
        </div>
        <Badge variant={skill.verified ? "default" : "outline"} className="shrink-0">
          {skill.verified ? "Verified" : "Unverified"}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground">{skill.description}</p>
      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">{skill.level}</Badge>
        {skill.transferable ? <Badge variant="outline">Transferable</Badge> : null}
        <span>
          {skill.evidence.length} evidence item{skill.evidence.length > 1 ? "s" : ""}
        </span>
      </div>
      {skill.informalSource ? (
        <p className="text-xs text-muted-foreground">แหล่งประสบการณ์: {skill.informalSource}</p>
      ) : null}
      <StandardChips skill={skill} />
      <ConfidenceMeter value={skill.confidence} />
      <Button
        variant="outline"
        size="sm"
        className="mt-1 min-h-11"
        onClick={() => onOpenEvidence(skill)}
      >
        ดูหลักฐาน / View evidence
        <ChevronRight className="size-4" />
      </Button>
    </article>
  );
}

export function EvidencePanel({
  skill,
  open,
  onOpenChange,
  onOpenSource,
}: {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenSource?: ((evidence: Evidence) => void) | undefined;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        {skill ? (
          <>
            <SheetHeader>
              <SheetTitle className="font-display">{skill.name}</SheetTitle>
              <SheetDescription>
                Every claim below is traced to source material the candidate uploaded. Nothing here is
                inferred without evidence.
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 px-4 pb-8">
              <ConfidenceMeter value={skill.confidence} />
              {skill.evidence.map((evidence) => (
                <EvidenceItem key={evidence.id} evidence={evidence} onOpenSource={onOpenSource} />
              ))}
              <StandardDetails skill={skill} />
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function EvidenceItem({
  evidence,
  onOpenSource,
}: {
  evidence: Evidence;
  onOpenSource?: ((evidence: Evidence) => void) | undefined;
}) {
  const [showReasoning, setShowReasoning] = useState(true);
  const Icon = sourceIcon[evidence.sourceType];

  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 size-4 text-primary" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{evidence.sourceName}</p>
          <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span>{evidence.sourceType}</span>
            {evidence.page ? <span>page {evidence.page}</span> : null}
            {evidence.paragraph ? <span>¶ {evidence.paragraph}</span> : null}
            {evidence.repository ? <span>{evidence.repository}</span> : null}
            {evidence.filePath ? <span>{evidence.filePath}</span> : null}
            {evidence.commit ? <span>commit {evidence.commit}</span> : null}
            {evidence.lineNumber ? <span>line {evidence.lineNumber}</span> : null}
            {evidence.section ? <span>{evidence.section}</span> : null}
          </dl>
        </div>
      </div>

      <blockquote className="mt-3 rounded-md border-l-2 border-primary bg-background p-3 text-sm">
        <Quote className="mb-1 size-3 text-primary" />
        <span className="whitespace-pre-wrap">{evidence.quote}</span>
      </blockquote>

      <ConfidenceMeter value={evidence.confidence} className="mt-3" />

      <Separator className="my-3" />
      <button
        type="button"
        className="flex min-h-11 items-center gap-2 text-xs font-medium text-primary"
        onClick={() => setShowReasoning((v) => !v)}
      >
        <Sparkles className="size-3" />
        {showReasoning ? "Hide AI reasoning" : "Show AI reasoning"}
      </button>
      {showReasoning ? (
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{evidence.reasoning}</p>
      ) : null}

      {onOpenSource ? (
        <Button
          variant="secondary"
          size="sm"
          className="mt-3 min-h-11 w-full"
          onClick={() => onOpenSource(evidence)}
        >
          เปิดต้นฉบับ / Open source
        </Button>
      ) : null}
    </div>
  );
}
