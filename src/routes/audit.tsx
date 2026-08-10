import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BadgeCheck,
  Download,
  FileUp,
  Link2,
  RefreshCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AUDIT_KIND_LABEL, auditCounts, auditLog, type AuditKind } from "@/data/audit";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "ร่องรอยการตรวจสอบหลักฐาน — SkillLens AI" },
      {
        name: "description",
        content:
          "บันทึกทุกการอัปโหลดหลักฐาน ทุกขั้นตอนการสกัดข้อมูลด้วย AI และทุกการอ้างอิงทักษะกับหลักฐาน เพื่อตรวจย้อนกลับได้ทั้งสาย",
      },
      { property: "og:title", content: "ร่องรอยการตรวจสอบหลักฐาน — SkillLens AI" },
      {
        property: "og:description",
        content: "ตรวจสอบลำดับเวลาของหลักฐานทั้งหมด ตั้งแต่ไฟล์ต้นฉบับจนถึงคะแนนในพาสปอร์ต",
      },
    ],
  }),
  component: AuditPage,
});

const KIND_ICON: Record<AuditKind, typeof FileUp> = {
  upload: FileUp,
  extraction: Sparkles,
  citation: Link2,
  verification: BadgeCheck,
  reevaluation: RefreshCcw,
};

const KINDS: AuditKind[] = ["upload", "extraction", "citation", "verification", "reevaluation"];

function AuditPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | AuditKind>("all");
  const counts = auditCounts();

  const filtered = useMemo(
    () =>
      auditLog.filter((entry) => {
        if (kind !== "all" && entry.kind !== kind) return false;
        if (!query.trim()) return true;
        const haystack = [entry.title, entry.detail, entry.actor, ...entry.refs.map((ref) => ref.value)]
          .join(" ")
          .toLowerCase();
        return haystack.includes(query.toLowerCase());
      }),
    [query, kind],
  );

  function exportCsv() {
    const rows = [
      ["เวลา", "ประเภท", "ผู้ดำเนินการ", "รายการ", "รายละเอียด", "ลายเซ็น"],
      ...filtered.map((entry) => [
        entry.at,
        AUDIT_KIND_LABEL[entry.kind],
        entry.actor,
        entry.title,
        entry.detail.replace(/\s+/g, " "),
        entry.hash,
      ]),
    ];
    const csv = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "evidence-audit-trail.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success("ดาวน์โหลดร่องรอยการตรวจสอบแล้ว", { description: `${filtered.length} รายการ` });
  }

  return (
    <AppShell
      title="ร่องรอยการตรวจสอบหลักฐาน"
      description="ทุกการอัปโหลด ทุกขั้นตอนของ AI และทุกการอ้างอิงทักษะ ถูกบันทึกไว้พร้อมลายเซ็นเพื่อตรวจย้อนกลับได้ทั้งสาย"
      actions={
        <Button size="sm" variant="outline" onClick={exportCsv}>
          <Download className="size-4" />
          ส่งออก CSV
        </Button>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {KINDS.map((item) => {
          const Icon = KIND_ICON[item];
          return (
            <button
              key={item}
              type="button"
              onClick={() => setKind((prev) => (prev === item ? "all" : item))}
              aria-pressed={kind === item}
              className={`panel flex min-h-11 items-center gap-3 p-4 text-left transition-colors ${
                kind === item ? "ring-2 ring-primary" : "hover:bg-surface"
              }`}
            >
              <span className="rounded-md bg-surface-raised p-2">
                <Icon className="size-4 text-primary" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs text-muted-foreground">
                  {AUDIT_KIND_LABEL[item]}
                </span>
                <span className="font-mono text-lg font-semibold">{counts[item]}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหาทักษะ ไฟล์ ข้อความอ้างอิง หรือผู้ดำเนินการ…"
            className="pl-9"
            aria-label="ค้นหาในร่องรอยการตรวจสอบ"
          />
        </div>
        <Select value={kind} onValueChange={(value) => setKind(value as "all" | AuditKind)}>
          <SelectTrigger className="w-60" aria-label="กรองตามประเภทเหตุการณ์">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกประเภทเหตุการณ์</SelectItem>
            {KINDS.map((item) => (
              <SelectItem key={item} value={item}>
                {AUDIT_KIND_LABEL[item]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge variant="secondary">{filtered.length} รายการ</Badge>
      </div>

      <ol className="mt-5 space-y-3">
        {filtered.map((entry) => {
          const Icon = KIND_ICON[entry.kind];
          return (
            <li key={entry.id} className="panel p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-surface-raised p-2">
                  <Icon className="size-4 text-primary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.at).toLocaleString("th-TH")} · {entry.actor}
                  </p>
                </div>
                <Badge variant="outline">{AUDIT_KIND_LABEL[entry.kind]}</Badge>
                <span className="font-mono text-[11px] text-muted-foreground">{entry.hash}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
              {entry.refs.length ? (
                <dl className="mt-3 flex flex-wrap gap-2 text-[11px]">
                  {entry.refs.map((ref) => (
                    <div
                      key={`${entry.id}-${ref.label}`}
                      className="rounded-md border border-border bg-surface px-2 py-1"
                    >
                      <dt className="text-eyebrow">{ref.label}</dt>
                      <dd className="mt-0.5 break-all font-mono">{ref.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </li>
          );
        })}
      </ol>

      {filtered.length === 0 ? (
        <div className="panel mt-6 p-10 text-center">
          <p className="font-display text-lg font-semibold">ไม่พบเหตุการณ์ที่ตรงกับเงื่อนไข</p>
          <p className="mt-1 text-sm text-muted-foreground">ลองปรับคำค้นหรือเลือกประเภทอื่น</p>
        </div>
      ) : null}
    </AppShell>
  );
}
