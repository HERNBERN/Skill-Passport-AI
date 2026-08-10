import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, MinusCircle, PlusCircle, RefreshCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { JobMatchPanel, type JobMatchItem } from "@/components/job-match-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { candidates, jobRoles, skills, type Evidence, type EvidenceSourceType } from "@/data/demo";

export const Route = createFileRoute("/reevaluate")({
  head: () => ({
    meta: [
      { title: "ขอประเมินใหม่ — SkillLens AI" },
      {
        name: "description",
        content:
          "ส่งหลักฐานใหม่เพื่อขอประเมินทักษะอีกครั้ง ระบบจะอัปเดตพาสปอร์ต การจับคู่งาน และสรุปสิ่งที่เปลี่ยนแปลงให้ทันที",
      },
      { property: "og:title", content: "ขอประเมินใหม่ — SkillLens AI" },
      {
        property: "og:description",
        content: "หลักฐานใหม่ → คะแนนความพร้อมใหม่ → ผลจับคู่งานใหม่ พร้อมสรุปการเปลี่ยนแปลงทุกบรรทัด",
      },
    ],
  }),
  component: ReevaluatePage,
});

const SOURCE_LABEL: Record<EvidenceSourceType, string> = {
  document: "เอกสาร / ใบรับรอง (PDF, รูปภาพ)",
  github: "GitHub repository หรือ commit",
  portfolio: "Portfolio / เว็บไซต์ผลงาน",
  experience: "ประสบการณ์ทำงานหรือฝึกงาน",
  community: "กิจกรรมชุมชน / อาสาสมัคร",
  commerce: "ธุรกิจส่วนตัว / ร้านค้าออนไลน์",
};

interface SubmittedEvidence {
  id: string;
  sourceType: EvidenceSourceType;
  sourceName: string;
  skillName: string;
  quote: string;
}

interface ChangeLine {
  kind: "up" | "new" | "info";
  label: string;
  detail: string;
}

function ReevaluatePage() {
  const candidate = candidates[0]!;
  const [sourceType, setSourceType] = useState<EvidenceSourceType>("document");
  const [sourceName, setSourceName] = useState("");
  const [skillName, setSkillName] = useState(skills[0]!.name);
  const [quote, setQuote] = useState("");
  const [items, setItems] = useState<SubmittedEvidence[]>([]);
  const [result, setResult] = useState<{
    readinessBefore: number;
    readinessAfter: number;
    changes: ChangeLine[];
    matches: JobMatchItem[];
    requestId: string;
  } | null>(null);

  const canAdd = sourceName.trim().length > 2 && quote.trim().length > 8;

  const baseMatches = useMemo<JobMatchItem[]>(
    () =>
      jobRoles.map((role) => ({
        id: role.id,
        title: role.title,
        company: role.company,
        location: role.location,
        matchScore: role.matchScore,
        matching: role.matchingSkills,
        missing: role.missingSkills,
        rationale: role.rationale,
        advice: role.advice,
        justifications: role.matchingSkills.flatMap((name) => {
          const skill = skills.find((item) => item.name === name);
          const evidence = skill?.evidence[0];
          if (!skill || !evidence) return [];
          return [
            {
              skill: skill.name,
              quote: evidence.quote,
              source: evidence.sourceName,
              confidence: evidence.confidence,
              evidence: evidence as Evidence,
            },
          ];
        }),
      })),
    [],
  );

  function addItem() {
    if (!canAdd) return;
    setItems((prev) => [
      ...prev,
      { id: `new-${prev.length + 1}`, sourceType, sourceName: sourceName.trim(), skillName, quote: quote.trim() },
    ]);
    setSourceName("");
    setQuote("");
    toast.success("เพิ่มหลักฐานใหม่เข้าคำขอแล้ว");
  }

  function submit() {
    if (items.length === 0) {
      toast.error("กรุณาเพิ่มหลักฐานอย่างน้อย 1 ชิ้นก่อนส่งคำขอ");
      return;
    }
    const gain = Math.min(12, items.length * 3 + 2);
    const readinessAfter = Math.min(100, candidate.workReadiness + gain);
    const newSkillNames = items
      .map((item) => item.skillName)
      .filter((name) => !candidate.topSkills.includes(name));

    const changes: ChangeLine[] = [
      {
        kind: "up",
        label: `คะแนนความพร้อมทำงาน ${candidate.workReadiness}% → ${readinessAfter}%`,
        detail: `หลักฐานใหม่ ${items.length} ชิ้นเพิ่มน้ำหนักองค์ประกอบ “ความลึกของหลักฐาน” และ “ความสดใหม่ของหลักฐาน”`,
      },
      ...items.map<ChangeLine>((item) => ({
        kind: "new",
        label: `ผูกหลักฐานใหม่กับทักษะ ${item.skillName}`,
        detail: `${SOURCE_LABEL[item.sourceType]} · ${item.sourceName} — ข้อความอ้างอิง: “${item.quote}”`,
      })),
      ...newSkillNames.map<ChangeLine>((name) => ({
        kind: "new",
        label: `เพิ่มทักษะใหม่เข้าพาสปอร์ต: ${name}`,
        detail: "สถานะเริ่มต้นเป็น “รอผู้เชี่ยวชาญตรวจสอบ” จนกว่าจะมีการยืนยันหลักฐาน",
      })),
      {
        kind: "info",
        label: "บันทึกลงร่องรอยการตรวจสอบหลักฐาน",
        detail: "ทุกขั้นตอนของการประเมินใหม่ถูกบันทึกพร้อมลายเซ็น ตรวจย้อนกลับได้ที่หน้าร่องรอยการตรวจสอบ",
      },
      {
        kind: "info",
        label: "ข้อมูลที่อาจก่อให้เกิดอคติถูกตัดออกก่อนคำนวณ",
        detail: "ชื่อสถาบัน เกรดเฉลี่ย อายุ เพศ และรูปถ่าย ไม่ถูกนำเข้าโมเดลในการประเมินใหม่นี้",
      },
    ];

    const matches = baseMatches.map((match) => {
      const boosted = items.some((item) => match.missing.includes(item.skillName));
      return {
        ...match,
        matchScore: Math.min(99, match.matchScore + (boosted ? 7 : 3)),
        missing: match.missing.filter((name) => !items.some((item) => item.skillName === name)),
      };
    });

    setResult({
      readinessBefore: candidate.workReadiness,
      readinessAfter,
      changes,
      matches,
      requestId: `RE-${1043 + items.length}`,
    });
    toast.success("ประเมินใหม่สำเร็จ", { description: "อัปเดตพาสปอร์ตและผลจับคู่งานแล้ว" });
  }

  return (
    <AppShell
      title="ขอประเมินใหม่"
      description="ส่งหลักฐานใหม่แล้วระบบจะคำนวณคะแนนความพร้อม พาสปอร์ต และผลจับคู่งานอีกครั้ง พร้อมสรุปสิ่งที่เปลี่ยนแปลง"
      actions={
        <Button size="sm" onClick={submit}>
          <RefreshCcw className="size-4" />
          ส่งคำขอประเมินใหม่
        </Button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">1. เพิ่มหลักฐานใหม่</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ทุกทักษะต้องมีหลักฐาน — ระบุแหล่งที่มาและข้อความที่ยืนยันทักษะนั้นอย่างชัดเจน
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <label className="text-eyebrow" htmlFor="reeval-source-type">
                ประเภทหลักฐาน
              </label>
              <Select
                value={sourceType}
                onValueChange={(value) => setSourceType(value as EvidenceSourceType)}
              >
                <SelectTrigger id="reeval-source-type" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(SOURCE_LABEL) as EvidenceSourceType[]).map((key) => (
                    <SelectItem key={key} value={key}>
                      {SOURCE_LABEL[key]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-eyebrow" htmlFor="reeval-source-name">
                ชื่อไฟล์ / ลิงก์ต้นฉบับ
              </label>
              <Input
                id="reeval-source-name"
                value={sourceName}
                onChange={(event) => setSourceName(event.target.value)}
                placeholder="เช่น AWS_Cloud_Practitioner_2026.pdf หรือ github.com/user/repo"
                className="mt-1.5"
              />
            </div>

            <div>
              <label className="text-eyebrow" htmlFor="reeval-skill">
                ทักษะที่ต้องการให้ประเมินใหม่
              </label>
              <Select value={skillName} onValueChange={setSkillName}>
                <SelectTrigger id="reeval-skill" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.name}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-eyebrow" htmlFor="reeval-quote">
                ข้อความอ้างอิงจากหลักฐาน
              </label>
              <Textarea
                id="reeval-quote"
                value={quote}
                onChange={(event) => setQuote(event.target.value)}
                rows={4}
                placeholder="คัดลอกข้อความจริงจากเอกสารหรือคำอธิบาย commit ที่ยืนยันทักษะนี้"
                className="mt-1.5"
              />
            </div>

            <Button variant="outline" className="min-h-11" onClick={addItem} disabled={!canAdd}>
              <PlusCircle className="size-4" />
              เพิ่มเข้าคำขอ
            </Button>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">2. หลักฐานในคำขอนี้</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {items.length ? `${items.length} ชิ้น พร้อมส่งประเมินใหม่` : "ยังไม่มีหลักฐานในคำขอ"}
          </p>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item.id} className="rounded-md border border-border bg-surface p-3 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{item.skillName}</Badge>
                  <Badge variant="outline">{SOURCE_LABEL[item.sourceType]}</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto min-h-11"
                    onClick={() => setItems((prev) => prev.filter((entry) => entry.id !== item.id))}
                  >
                    <MinusCircle className="size-4" />
                    นำออก
                  </Button>
                </div>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">{item.sourceName}</p>
                <p className="mt-1 text-xs text-muted-foreground">“{item.quote}”</p>
              </li>
            ))}
          </ul>
          <Button className="mt-4 min-h-11" onClick={submit}>
            <RefreshCcw className="size-4" />
            ส่งคำขอประเมินใหม่
          </Button>
        </section>
      </div>

      {result ? (
        <>
          <section className="panel mt-6 p-5">
            <div className="flex flex-wrap items-center gap-3">
              <Sparkles className="size-5 text-primary" />
              <h2 className="font-display text-lg font-semibold">
                สรุปการเปลี่ยนแปลง · คำขอ {result.requestId}
              </h2>
              <Badge className="ml-auto gap-1">
                <CheckCircle2 className="size-3" />
                ประเมินใหม่สำเร็จ
              </Badge>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-border bg-surface p-4">
                <p className="text-eyebrow">ความพร้อมทำงานก่อนประเมิน</p>
                <p className="mt-1 font-mono text-2xl font-semibold">{result.readinessBefore}%</p>
                <Progress value={result.readinessBefore} className="mt-2 h-1.5" />
              </div>
              <div className="rounded-md border border-border bg-surface p-4">
                <p className="text-eyebrow flex items-center gap-1">
                  หลังประเมินใหม่ <ArrowRight className="size-3" />
                </p>
                <p className="mt-1 font-mono text-2xl font-semibold text-success">
                  {result.readinessAfter}%
                </p>
                <Progress value={result.readinessAfter} className="mt-2 h-1.5" />
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {result.changes.map((change) => (
                <li
                  key={change.label}
                  className="rounded-md border border-border bg-surface p-3 text-sm"
                >
                  <p className="flex items-center gap-2 font-medium">
                    {change.kind === "up" ? (
                      <ArrowRight className="size-4 text-success" />
                    ) : change.kind === "new" ? (
                      <PlusCircle className="size-4 text-primary" />
                    ) : (
                      <CheckCircle2 className="size-4 text-muted-foreground" />
                    )}
                    {change.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{change.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <JobMatchPanel
            matches={result.matches}
            className="mt-6"
            title="ผลการจับคู่งานหลังประเมินใหม่"
          />
        </>
      ) : null}
    </AppShell>
  );
}
