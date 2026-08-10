import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SkillCard } from "@/components/skill-evidence";
import type { Evidence, Skill } from "@/data/demo";
import { cn } from "@/lib/utils";

export function EvidenceExplorer({
  skills,
  className,
}: {
  skills: Skill[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [viewerEvidence, setViewerEvidence] = useState<Evidence | null>(null);

  const categories = useMemo(
    () => ["All", ...new Set(skills.map((skill) => skill.category))],
    [skills],
  );

  const filteredSkills = useMemo(
    () =>
      skills.filter(
        (skill) =>
          (category === "All" || skill.category === category) &&
          (skill.name.toLowerCase().includes(query.toLowerCase()) ||
            skill.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [skills, category, query],
  );

  const evidenceCount = useMemo(
    () => skills.reduce((count, skill) => count + skill.evidence.length, 0),
    [skills],
  );

  const selectedEvidenceCount = selectedSkill?.evidence.length ?? 0;

  const primaryEvidence = selectedSkill?.evidence[0] ?? null;
  const evidenceQuote = primaryEvidence?.quote ?? "No evidence snippet available.";

  const quoteFragments = useMemo(() => {
    if (!primaryEvidence) return [] as string[];
    return evidenceQuote
      .split(/\n|•|(?<=[.!?])\s+/g)
      .map((fragment) => fragment.trim())
      .filter((fragment) => fragment.length > 15)
      .slice(0, 3);
  }, [evidenceQuote, primaryEvidence]);

  const highlightedQuote = useMemo(() => {
    if (!primaryEvidence) return [{ text: evidenceQuote, highlight: false }];
    const normalized = evidenceQuote.toLowerCase();
    const ranges: [number, number][] = [];

    for (const fragment of quoteFragments) {
      const index = normalized.indexOf(fragment.toLowerCase());
      if (index !== -1) {
        ranges.push([index, index + fragment.length]);
      }
    }

    if (ranges.length === 0) return [{ text: evidenceQuote, highlight: false }];

    ranges.sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [];
    for (const range of ranges) {
      const last = merged[merged.length - 1];
      if (last && range[0] <= last[1]) {
        last[1] = Math.max(last[1], range[1]);
      } else {
        merged.push([...range]);
      }
    }

    const segments: { text: string; highlight: boolean }[] = [];
    let cursor = 0;

    for (const [start, end] of merged) {
      if (cursor < start) {
        segments.push({ text: evidenceQuote.slice(cursor, start), highlight: false });
      }
      segments.push({ text: evidenceQuote.slice(start, end), highlight: true });
      cursor = end;
    }
    if (cursor < evidenceQuote.length) {
      segments.push({ text: evidenceQuote.slice(cursor), highlight: false });
    }

    return segments;
  }, [evidenceQuote, quoteFragments, primaryEvidence]);

  return (
    <div className={cn("space-y-6", className)}>
      <section className="panel p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Evidence Explorer</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">Explainable AI traceability for every skill claim</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              SkillLens AI ไม่ได้แค่สกัดทักษะ แต่เชื่อมโยงแต่ละทักษะกลับไปยังหลักฐานต้นทาง พร้อมคะแนนความเชื่อมั่นและเหตุผลของโมเดล.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <Badge variant="secondary" className="text-sm">
              {skills.length} skills
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {evidenceCount} evidence items
            </Badge>
            <Badge variant="secondary" className="text-sm">
              {filteredSkills.length} visible
            </Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <section className="panel p-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="ค้นหาทักษะ หรือคำอธิบาย..."
                  className="pl-9"
                  aria-label="Search skills"
                />
              </div>
              <div className="min-w-[180px]">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full" aria-label="Filter by category">
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-surface p-3 text-sm">
                <p className="text-muted-foreground">ทักษะทั้งหมด</p>
                <p className="mt-1 text-xl font-semibold">{skills.length}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3 text-sm">
                <p className="text-muted-foreground">หลักฐานรวม</p>
                <p className="mt-1 text-xl font-semibold">{evidenceCount}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-3 text-sm">
                <p className="text-muted-foreground">ข้อพิสูจน์ของทักษะ</p>
                <p className="mt-1 text-xl font-semibold">{selectedEvidenceCount}</p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                skill={skill}
                onOpenEvidence={(next) => {
                  setSelectedSkill(next);
                  setPanelOpen(true);
                }}
              />
            ))}
          </section>
        </div>

        <AnimatePresence>
          {selectedSkill ? (
            <motion.aside
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="space-y-4"
            >
              <section className="panel p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Evidence Explorer</p>
                    <h2 className="mt-3 font-display text-2xl font-semibold">{selectedSkill.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{selectedSkill.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedSkill(null)}>
                    ×
                  </Button>
                </div>

                <div className="mt-5 rounded-3xl border border-border bg-[#f9f4ef] p-5 text-sm text-muted-foreground">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">AI reasoning</p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {primaryEvidence?.reasoning ?? "AI วิเคราะห์หลักฐานของทักษะนี้เพื่อเชื่อมโยงกับต้นทางอย่างโปร่งใส."}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">Confidence score</p>
                      <p className="text-xs text-muted-foreground">ความเชื่อมั่นของโมเดลในการวิเคราะห์นี้</p>
                    </div>
                    <span className="rounded-full bg-[#FFE6DA] px-3 py-1 text-sm font-semibold text-[#CC5A37]">
                      {Math.round((selectedSkill.confidence ?? 0) * 100)}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-[#CC5A37]"
                      style={{ width: `${Math.round((selectedSkill.confidence ?? 0) * 100)}%` }}
                    />
                  </div>
                </div>
              </section>

              <section className="panel p-5">
                <h3 className="font-display text-lg font-semibold">Reference snippet</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  ข้อความหรือโค้ดที่ AI ใช้อ้างอิงเพื่อสรุปทักษะนี้
                </p>
                <div className="mt-4 rounded-3xl border border-border bg-background p-5 text-sm leading-relaxed text-foreground">
                  {highlightedQuote.map((segment, index) => (
                    <span
                      key={index}
                      className={segment.highlight ? "bg-[#FFF0E6] font-semibold text-[#7A2D18]" : ""}
                    >
                      {segment.text}
                    </span>
                  ))}
                </div>
              </section>

              <section className="panel p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium">Source Link</p>
                    <p className="mt-1 text-xs text-muted-foreground">เปิดต้นฉบับบน GitHub หรือ PDF ที่เกี่ยวข้อง</p>
                  </div>
                  <Button
                    asChild
                    size="sm"
                    style={{ backgroundColor: "#CC5A37", color: "white" }}
                  >
                    <a
                      href={
                        primaryEvidence?.url ??
                        (primaryEvidence?.repository
                          ? `https://github.com/${primaryEvidence.repository}/blob/main/${primaryEvidence.filePath ?? ""}`
                          : "#")
                      }
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      View Original Source
                    </a>
                  </Button>
                </div>
                <dl className="mt-4 grid gap-2 text-xs text-muted-foreground">
                  {primaryEvidence?.sourceName ? (
                    <div>
                      <dt className="font-medium text-foreground">Source</dt>
                      <dd>{primaryEvidence.sourceName}</dd>
                    </div>
                  ) : null}
                  {primaryEvidence?.filePath ? (
                    <div>
                      <dt className="font-medium text-foreground">File</dt>
                      <dd>{primaryEvidence.filePath}</dd>
                    </div>
                  ) : null}
                  {primaryEvidence?.page ? (
                    <div>
                      <dt className="font-medium text-foreground">Page</dt>
                      <dd>{primaryEvidence.page}</dd>
                    </div>
                  ) : null}
                </dl>
              </section>
            </motion.aside>
          ) : (
            <motion.aside
              key="panel-empty"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="panel p-5"
            >
              <h2 className="font-display text-lg font-semibold">Evidence side panel</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                คลิก Skill Card เพื่อเปิด panel ทางขวาและดู AI reasoning, confidence, snippet และลิงก์ต้นฉบับ
              </p>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
