import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, Quote, Search, Trophy } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { EvidenceViewer } from "@/components/evidence-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { candidates, jobRoles, skills, type Evidence } from "@/data/demo";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "เปรียบเทียบผู้สมัคร — SkillLens AI" },
      {
        name: "description",
        content:
          "จัดอันดับผู้สมัครหลายคนแบบเทียบข้างกัน พร้อมเหตุผลที่อ้างอิงหลักฐานจริงและตัวกรองการจัดอันดับ",
      },
      { property: "og:title", content: "เปรียบเทียบผู้สมัคร — SkillLens AI" },
      {
        property: "og:description",
        content: "คัดเลือกด้วยทักษะและหลักฐาน ไม่ใช่ชื่อสถาบันหรือข้อมูลส่วนตัว",
      },
    ],
  }),
  component: ComparePage,
});

type SortKey = "fit" | "readiness" | "evidence" | "gaps";

const SORT_LABEL: Record<SortKey, string> = {
  fit: "คะแนนความเหมาะสมกับตำแหน่ง (สูง → ต่ำ)",
  readiness: "ความพร้อมทำงาน (สูง → ต่ำ)",
  evidence: "จำนวนหลักฐานที่ผูกไว้ (มาก → น้อย)",
  gaps: "ช่องว่างทักษะน้อยที่สุด",
};

function locatorText(evidence: Evidence) {
  return [
    evidence.page ? `หน้า ${evidence.page}` : null,
    evidence.paragraph ? `ย่อหน้า ${evidence.paragraph}` : null,
    evidence.commit ? `commit ${evidence.commit}` : null,
    evidence.filePath ?? null,
    evidence.section ?? null,
  ]
    .filter(Boolean)
    .join(" · ");
}

function ComparePage() {
  const [roleId, setRoleId] = useState(jobRoles[0]!.id);
  const [sort, setSort] = useState<SortKey>("fit");
  const [query, setQuery] = useState("");
  const [minReadiness, setMinReadiness] = useState("0");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selected, setSelected] = useState<string[]>(["c1", "c2", "c3"]);
  const [viewer, setViewer] = useState<{ evidence: Evidence; skillName: string } | null>(null);

  const role = jobRoles.find((item) => item.id === roleId)!;

  const rows = useMemo(() => {
    return candidates
      .map((candidate) => {
        const matching = role.matchingSkills.filter((skill) => candidate.topSkills.includes(skill));
        const missing = role.matchingSkills.filter((skill) => !candidate.topSkills.includes(skill));
        const justifications = matching.flatMap((skillName) => {
          const skill = skills.find((item) => item.name === skillName);
          const evidence = skill?.evidence[0];
          if (!skill || !evidence) return [];
          return [{ skillName: skill.name, evidence }];
        });
        const fit = Math.round(
          (matching.length / Math.max(1, role.matchingSkills.length)) * 60 +
            candidate.workReadiness * 0.3 +
            (candidate.verificationStatus === "Verified" ? 10 : 0),
        );
        return { candidate, matching, missing, justifications, fit: Math.min(100, fit) };
      })
      .filter((row) => {
        if (!selected.includes(row.candidate.id)) return false;
        if (row.candidate.workReadiness < Number(minReadiness)) return false;
        if (verifiedOnly && row.candidate.verificationStatus !== "Verified") return false;
        if (!query.trim()) return true;
        const haystack = `${row.candidate.name} ${row.candidate.topSkills.join(" ")} ${row.candidate.githubUser}`;
        return haystack.toLowerCase().includes(query.toLowerCase());
      })
      .sort((a, b) => {
        if (sort === "readiness") return b.candidate.workReadiness - a.candidate.workReadiness;
        if (sort === "evidence") return b.justifications.length - a.justifications.length;
        if (sort === "gaps") return a.missing.length - b.missing.length;
        return b.fit - a.fit;
      });
  }, [role, selected, minReadiness, verifiedOnly, query, sort]);

  return (
    <AppShell
      title="เปรียบเทียบผู้สมัคร"
      description="จัดอันดับผู้สมัครแบบเทียบข้างกันต่อหนึ่งตำแหน่งงาน พร้อมเหตุผลที่เปิดดูหลักฐานต้นฉบับได้ทุกข้อ"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Select value={roleId} onValueChange={setRoleId}>
          <SelectTrigger className="w-72" aria-label="เลือกตำแหน่งงานที่ใช้เปรียบเทียบ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {jobRoles.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.title} · {item.company}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative min-w-52 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหาชื่อหรือทักษะ…"
            className="pl-9"
            aria-label="ค้นหาผู้สมัคร"
          />
        </div>
        <Select value={sort} onValueChange={(value) => setSort(value as SortKey)}>
          <SelectTrigger className="w-72" aria-label="จัดเรียงผลลัพธ์">
            <ArrowUpDown className="size-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {SORT_LABEL[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={minReadiness} onValueChange={setMinReadiness}>
          <SelectTrigger className="w-48" aria-label="ความพร้อมทำงานขั้นต่ำ">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["0", "60", "70", "80"].map((value) => (
              <SelectItem key={value} value={value}>
                ความพร้อม ≥ {value}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <Checkbox
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(Boolean(checked))}
            aria-label="แสดงเฉพาะผู้สมัครที่ยืนยันแล้ว"
          />
          เฉพาะที่ยืนยันแล้ว
        </label>
      </div>

      <section className="panel mt-5 p-4">
        <p className="text-eyebrow">เลือกผู้สมัครเพื่อเปรียบเทียบ</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {candidates.map((candidate) => (
            <label
              key={candidate.id}
              className="flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
            >
              <Checkbox
                checked={selected.includes(candidate.id)}
                aria-label={`เปรียบเทียบ ${candidate.name}`}
                onCheckedChange={(checked) =>
                  setSelected((prev) =>
                    checked ? [...prev, candidate.id] : prev.filter((id) => id !== candidate.id),
                  )
                }
              />
              {candidate.name}
            </label>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-4 xl:grid-cols-3">
        {rows.map((row, index) => (
          <article key={row.candidate.id} className="panel flex flex-col p-5">
            <div className="flex items-center gap-2">
              <Badge variant={index === 0 ? "default" : "outline"} className="gap-1">
                {index === 0 ? <Trophy className="size-3" /> : null}
                อันดับ {index + 1}
              </Badge>
              <Badge variant={row.candidate.verificationStatus === "Verified" ? "secondary" : "outline"}>
                {row.candidate.verificationStatus === "Verified"
                  ? "ยืนยันแล้ว"
                  : row.candidate.verificationStatus === "Partially Verified"
                    ? "ยืนยันบางส่วน"
                    : "รอตรวจสอบ"}
              </Badge>
            </div>
            <h2 className="mt-3 font-display text-lg font-semibold">{row.candidate.name}</h2>
            <p className="text-sm text-muted-foreground">{row.candidate.headline}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-md border border-border bg-surface p-3">
                <dt className="text-eyebrow">ความเหมาะสมกับตำแหน่ง</dt>
                <dd className="mt-1 font-mono text-xl font-semibold">{row.fit}%</dd>
                <Progress value={row.fit} className="mt-2 h-1.5" />
              </div>
              <div className="rounded-md border border-border bg-surface p-3">
                <dt className="text-eyebrow">ความพร้อมทำงาน</dt>
                <dd className="mt-1 font-mono text-xl font-semibold">{row.candidate.workReadiness}%</dd>
                <Progress value={row.candidate.workReadiness} className="mt-2 h-1.5" />
              </div>
            </dl>

            <div className="mt-4 space-y-2 text-xs">
              <p className="text-eyebrow">ทักษะที่ตรง ({row.matching.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {row.matching.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {row.matching.length === 0 ? (
                  <span className="text-muted-foreground">ไม่มีทักษะที่ตรงกับตำแหน่งนี้</span>
                ) : null}
              </div>
              <p className="text-eyebrow pt-2">ช่องว่างทักษะ ({row.missing.length})</p>
              <div className="flex flex-wrap gap-1.5">
                {row.missing.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {row.missing.length === 0 ? (
                  <span className="text-success">ครบทุกทักษะที่ตำแหน่งต้องการ</span>
                ) : null}
              </div>
            </div>

            <div className="mt-4 border-t border-border pt-4">
              <p className="text-eyebrow">เหตุผลที่อ้างอิงหลักฐาน</p>
              <ul className="mt-2 space-y-2">
                {row.justifications.map((item) => (
                  <li
                    key={`${row.candidate.id}-${item.evidence.id}`}
                    className="rounded-md border border-border bg-surface p-3 text-xs"
                  >
                    <p className="font-medium">{item.skillName}</p>
                    <p className="mt-1 flex gap-2 text-muted-foreground">
                      <Quote className="mt-0.5 size-3 shrink-0" />
                      <span>“{item.evidence.quote}”</span>
                    </p>
                    <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                      {item.evidence.sourceName} · {locatorText(item.evidence)}
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 min-h-11"
                      onClick={() => setViewer({ evidence: item.evidence, skillName: item.skillName })}
                    >
                      เปิดหลักฐานต้นฉบับ
                    </Button>
                  </li>
                ))}
                {row.justifications.length === 0 ? (
                  <li className="text-xs text-muted-foreground">
                    ยังไม่มีหลักฐานที่ผูกกับทักษะของตำแหน่งนี้ — ควรขอหลักฐานเพิ่มก่อนพิจารณา
                  </li>
                ) : null}
              </ul>
            </div>
          </article>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="panel mt-6 p-10 text-center">
          <p className="font-display text-lg font-semibold">ยังไม่มีผู้สมัครในการเปรียบเทียบ</p>
          <p className="mt-1 text-sm text-muted-foreground">
            เลือกผู้สมัครด้านบน หรือลดเงื่อนไขการกรองลง
          </p>
        </div>
      ) : null}

      {viewer ? (
        <EvidenceViewer
          evidence={viewer.evidence}
          skillName={viewer.skillName}
          onClose={() => setViewer(null)}
          className="mt-6"
        />
      ) : null}
    </AppShell>
  );
}
