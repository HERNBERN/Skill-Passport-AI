import { useMemo, useState } from "react";
import { Briefcase, Filter, Quote, Search, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Evidence } from "@/data/demo";
import { cn } from "@/lib/utils";

export interface MatchJustification {
  skill: string;
  quote: string;
  source: string;
  locator?: string;
  confidence?: number;
  evidence?: Evidence;
}

export interface JobMatchItem {
  id: string;
  title: string;
  company?: string;
  location?: string;
  matchScore: number;
  matching: string[];
  missing: string[];
  rationale: string;
  advice?: string;
  justifications: MatchJustification[];
}

type SortKey = "score" | "gaps" | "evidence";

const SORT_LABELS: Record<SortKey, string> = {
  score: "Match score (สูง → ต่ำ)",
  gaps: "Fewest skill gaps",
  evidence: "Most evidence linked",
};

function scoreTone(score: number) {
  if (score >= 80) return "text-success";
  if (score >= 65) return "text-primary";
  return "text-warning";
}

export function JobMatchPanel({
  matches,
  className,
  title = "Job matching & ranking",
  onOpenEvidence,
}: {
  matches: JobMatchItem[];
  className?: string;
  title?: string;
  onOpenEvidence?: ((evidence: Evidence, skillName: string) => void) | undefined;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("score");
  const [minScore, setMinScore] = useState("0");
  const [readyOnly, setReadyOnly] = useState(false);
  const [evidenceOnly, setEvidenceOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const ranked = useMemo(() => {
    const threshold = Number(minScore);
    const list = matches.filter((match) => {
      const haystack = `${match.title} ${match.company ?? ""} ${match.matching.join(" ")}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (match.matchScore < threshold) return false;
      if (readyOnly && match.missing.length > 0) return false;
      if (evidenceOnly && match.justifications.length === 0) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === "gaps") return a.missing.length - b.missing.length || b.matchScore - a.matchScore;
      if (sort === "evidence")
        return b.justifications.length - a.justifications.length || b.matchScore - a.matchScore;
      return b.matchScore - a.matchScore;
    });
  }, [matches, query, minScore, readyOnly, evidenceOnly, sort]);

  return (
    <section className={cn("panel p-5", className)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="size-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">{title}</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            จัดอันดับตำแหน่งงานจากทักษะที่มีหลักฐานรองรับ ทุกเหตุผลอ้างอิงกลับไปยังต้นฉบับได้
          </p>
        </div>
        <Badge variant="secondary" className="gap-1 font-mono text-[11px]">
          <Filter className="size-3" />
          {ranked.length}/{matches.length} roles
        </Badge>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-48 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหาตำแหน่ง / ทักษะ…"
            className="pl-9"
            aria-label="Search job matches"
          />
        </div>
        <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
          <SelectTrigger className="w-56" aria-label="Sort ranking">
            <SlidersHorizontal className="size-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {SORT_LABELS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={minScore} onValueChange={setMinScore}>
          <SelectTrigger className="w-40" aria-label="Minimum match score">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Any match score</SelectItem>
            <SelectItem value="60">≥ 60%</SelectItem>
            <SelectItem value="70">≥ 70%</SelectItem>
            <SelectItem value="80">≥ 80%</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="button"
          size="sm"
          variant={readyOnly ? "default" : "outline"}
          className="min-h-11"
          aria-pressed={readyOnly}
          onClick={() => setReadyOnly((v) => !v)}
        >
          No skill gaps
        </Button>
        <Button
          type="button"
          size="sm"
          variant={evidenceOnly ? "default" : "outline"}
          className="min-h-11"
          aria-pressed={evidenceOnly}
          onClick={() => setEvidenceOnly((v) => !v)}
        >
          Evidence-linked only
        </Button>
      </div>

      <ol className="mt-4 space-y-3">
        {ranked.map((match, index) => {
          const open = openId === match.id;
          return (
            <li key={match.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    <span className="mr-2 font-mono text-xs text-muted-foreground">#{index + 1}</span>
                    {match.title}
                  </p>
                  <p className="text-eyebrow mt-0.5">
                    {[match.company, match.location].filter(Boolean).join(" · ") || "Ranked by evidence"}
                  </p>
                </div>
                <span className={cn("font-display text-2xl font-semibold", scoreTone(match.matchScore))}>
                  {match.matchScore}%
                </span>
              </div>
              <Progress value={match.matchScore} className="mt-2 h-1.5" />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{match.rationale}</p>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {match.matching.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {match.missing.map((skill) => (
                  <Badge key={skill} variant="outline">
                    ขาด: {skill}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="min-h-11"
                  onClick={() => setOpenId(open ? null : match.id)}
                >
                  {open ? "ซ่อนเหตุผลจากหลักฐาน" : `เหตุผลจากหลักฐาน (${match.justifications.length})`}
                </Button>
                {match.missing.length === 0 ? (
                  <Badge className="font-mono text-[10px]">No gaps</Badge>
                ) : (
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {match.missing.length} gap{match.missing.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {open ? (
                <ul className="mt-3 space-y-2">
                  {match.justifications.map((item, itemIndex) => (
                    <li
                      key={`${item.skill}-${itemIndex}`}
                      className="rounded-md border border-border bg-background p-3"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-medium">{item.skill}</p>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {item.source}
                          {item.locator ? ` · ${item.locator}` : ""}
                        </span>
                        {item.confidence !== undefined ? (
                          <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                            {Math.round(item.confidence * 100)}%
                          </span>
                        ) : null}
                      </div>
                      <blockquote className="mt-1.5 border-l-2 border-primary pl-2 text-xs leading-relaxed">
                        <Quote className="mb-0.5 inline size-3 text-primary" /> {item.quote}
                      </blockquote>
                      {item.evidence && onOpenEvidence ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="secondary"
                          className="mt-2 min-h-11"
                          onClick={() => onOpenEvidence(item.evidence!, item.skill)}
                        >
                          เปิดต้นฉบับพร้อม Highlight
                        </Button>
                      ) : null}
                    </li>
                  ))}
                  {match.justifications.length === 0 ? (
                    <li className="text-xs text-muted-foreground">
                      ยังไม่มีหลักฐานเชื่อมโยงกับตำแหน่งนี้ ระบบจึงไม่ยืนยันการจับคู่
                    </li>
                  ) : null}
                  {match.advice ? (
                    <li className="text-xs text-muted-foreground">คำแนะนำ: {match.advice}</li>
                  ) : null}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>

      {ranked.length === 0 ? (
        <p className="mt-4 rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted-foreground">
          ไม่พบตำแหน่งที่ตรงกับตัวกรอง ลองลดเกณฑ์คะแนนหรือปิดตัวกรองบางตัว
        </p>
      ) : null}
    </section>
  );
}
