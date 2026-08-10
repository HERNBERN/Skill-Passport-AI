import { useMemo, useState } from "react";
import { ExternalLink, Github, Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ConfidenceMeter } from "@/components/skill-evidence";
import type { Evidence, Skill } from "@/data/demo";
import { cn } from "@/lib/utils";

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "root" | "skill" | "evidence";
  verified?: boolean;
  skill?: Skill;
  evidence?: Evidence;
}

const WIDTH = 760;
const HEIGHT = 460;

/** Interactive Skill ↔ GitHub artefact graph with an Evidence Explorer side panel. */
export function EvidenceGraph({
  ownerName,
  skills,
  className,
}: {
  ownerName: string;
  skills: Skill[];
  className?: string;
}) {
  const graph = useMemo(() => {
    const usable = skills
      .map((skill) => ({
        skill,
        evidence: skill.evidence.filter((item) => item.sourceType === "github"),
      }))
      .filter((entry) => entry.evidence.length > 0)
      .slice(0, 6);

    const nodes: GraphNode[] = [
      { id: "root", label: ownerName, x: 96, y: HEIGHT / 2, kind: "root" },
    ];
    const links: { from: string; to: string; id: string }[] = [];

    usable.forEach((entry, index) => {
      const y = ((index + 0.5) / usable.length) * HEIGHT;
      const skillId = `skill-${entry.skill.id}`;
      nodes.push({
        id: skillId,
        label: entry.skill.name,
        x: 300,
        y,
        kind: "skill",
        verified: entry.skill.verified,
        skill: entry.skill,
      });
      links.push({ id: `l-root-${skillId}`, from: "root", to: skillId });

      entry.evidence.slice(0, 2).forEach((evidence, evIndex) => {
        const evidenceId = `ev-${evidence.id}`;
        const spread = entry.evidence.length > 1 ? (evIndex === 0 ? -26 : 26) : 0;
        nodes.push({
          id: evidenceId,
          label: evidence.filePath ?? evidence.repository ?? evidence.sourceName,
          x: 500,
          y: Math.min(HEIGHT - 24, Math.max(24, y + spread)),
          kind: "evidence",
          evidence,
          skill: entry.skill,
        });
        links.push({ id: `l-${skillId}-${evidenceId}`, from: skillId, to: evidenceId });
      });
    });

    return { nodes, links };
  }, [skills, ownerName]);

  const byId = (id: string) => graph.nodes.find((node) => node.id === id)!;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = selectedId ? graph.nodes.find((node) => node.id === selectedId) : undefined;
  const selectedEvidence =
    selected?.evidence ??
    (selected?.skill?.evidence.find((item) => item.sourceType === "github") ?? undefined);

  return (
    <div className={cn("grid gap-4 lg:grid-cols-[1.35fr_1fr]", className)}>
      <section className="panel p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-lg font-semibold">Evidence Graph</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              เชื่อมโยงทักษะกับชิ้นงานจริงใน GitHub — คลิกโหนดเพื่อเปิด Evidence Explorer
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Github className="size-3" />
            {graph.nodes.filter((node) => node.kind === "evidence").length} artefacts
          </Badge>
        </div>

        <div className="mt-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-[460px] w-full min-w-[560px]"
            role="group"
            aria-label="Skill to GitHub artefact graph"
          >
            {graph.links.map((link) => {
              const from = byId(link.from);
              const to = byId(link.to);
              const midX = (from.x + to.x) / 2;
              const active = selectedId === link.to || selectedId === link.from;
              return (
                <path
                  key={link.id}
                  d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                  fill="none"
                  stroke={active ? "var(--color-primary)" : "var(--color-border)"}
                  strokeWidth={active ? 2 : 1.25}
                  className="transition-[stroke,stroke-width] duration-300"
                />
              );
            })}

            {graph.nodes.map((node) => {
              const isSelected = selectedId === node.id;
              const radius = node.kind === "root" ? 30 : node.kind === "skill" ? 12 : 7;
              return (
                <g
                  key={node.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedId(node.id === "root" ? null : node.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={node.label}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") setSelectedId(node.id);
                  }}
                >
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius}
                    fill={
                      node.kind === "root"
                        ? "var(--color-primary)"
                        : node.verified || node.kind === "evidence"
                          ? "var(--color-card)"
                          : "var(--color-card)"
                    }
                    stroke={
                      isSelected
                        ? "var(--color-primary)"
                        : node.kind === "skill" && node.verified
                          ? "var(--color-primary)"
                          : "var(--color-border)"
                    }
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300"
                  />
                  {node.kind === "root" ? (
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className="fill-primary-foreground text-[10px] font-medium"
                    >
                      {node.label.split(" ")[0]}
                    </text>
                  ) : null}
                  <text
                    x={node.kind === "evidence" ? node.x + 12 : node.x}
                    y={node.kind === "evidence" ? node.y + 3.5 : node.kind === "root" ? node.y + 48 : node.y - 20}
                    textAnchor={node.kind === "evidence" ? "start" : "middle"}
                    className={cn(
                      "text-[11px]",
                      node.kind === "skill" ? "fill-foreground font-medium" : "fill-muted-foreground font-mono",
                    )}
                  >
                    {node.kind === "evidence" ? truncate(node.label, 26) : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
        <p className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <UserRound className="size-3.5 text-primary" /> Candidate
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full border-2 border-primary" /> Verified skill
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full border border-border bg-card" /> GitHub artefact
          </span>
        </p>
      </section>

      <aside className="panel p-5">
        <h2 className="font-display text-lg font-semibold">Evidence Explorer</h2>
        {selected && selectedEvidence ? (
          <div className="mt-3 animate-in fade-in slide-in-from-right-2 duration-300">
            <p className="text-sm font-medium">{selected.skill?.name}</p>
            <dl className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
              {selectedEvidence.repository ? <span>{selectedEvidence.repository}</span> : null}
              {selectedEvidence.filePath ? <span>{selectedEvidence.filePath}</span> : null}
              {selectedEvidence.commit ? <span>commit {selectedEvidence.commit}</span> : null}
              {selectedEvidence.lineNumber ? <span>line {selectedEvidence.lineNumber}</span> : null}
            </dl>

            <pre className="mt-3 overflow-x-auto rounded-md border border-border bg-surface p-3 text-[11px] leading-relaxed">
              <code className="whitespace-pre-wrap font-mono">{selectedEvidence.quote}</code>
            </pre>

            <ConfidenceMeter value={selectedEvidence.confidence} className="mt-3" />

            <Separator className="my-3" />
            <p className="flex items-center gap-2 text-xs font-medium text-primary">
              <Sparkles className="size-3" />
              AI Analysis
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {selectedEvidence.reasoning}
            </p>

            <Button asChild variant="outline" size="sm" className="mt-4 min-h-11 w-full">
              <a
                href={
                  selectedEvidence.url ??
                  `https://github.com/${selectedEvidence.repository ?? ""}${
                    selectedEvidence.filePath ? `/blob/main/${selectedEvidence.filePath}` : ""
                  }${selectedEvidence.lineNumber ? `#L${selectedEvidence.lineNumber}` : ""}`
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                <ExternalLink className="size-4" />
                View on GitHub
              </a>
            </Button>
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            เลือกโหนดทักษะหรือหลักฐานทางด้านซ้าย เพื่อดู Code Snippet, เหตุผลของ AI และลิงก์ตรงไปยังไฟล์ต้นฉบับ
          </p>
        )}
      </aside>
    </div>
  );
}

function truncate(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
