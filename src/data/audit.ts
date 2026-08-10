import { evidenceFiles, skills } from "@/data/demo";
import { explainPipeline as explainPipelineFallback } from "@/data/impact";

export type AuditKind = "upload" | "extraction" | "citation" | "verification" | "reevaluation";

export interface AuditRef {
  label: string;
  value: string;
}

export interface AuditEntry {
  id: string;
  at: string;
  kind: AuditKind;
  actor: string;
  title: string;
  detail: string;
  refs: AuditRef[];
  hash: string;
}

export const AUDIT_KIND_LABEL: Record<AuditKind, string> = {
  upload: "อัปโหลดหลักฐาน",
  extraction: "ขั้นตอนสกัดข้อมูลด้วย AI",
  citation: "การอ้างอิงทักษะ ↔ หลักฐาน",
  verification: "การตรวจสอบโดยผู้เชี่ยวชาญ",
  reevaluation: "คำขอประเมินใหม่",
};

function hashOf(seed: string) {
  let value = 0x811c9dc5;
  for (let index = 0; index < seed.length; index += 1) {
    value ^= seed.charCodeAt(index);
    value = Math.imul(value, 0x01000193) >>> 0;
  }
  return `0x${value.toString(16).padStart(8, "0")}`;
}

function stamp(day: number, minutes: number) {
  const base = new Date(Date.UTC(2026, 6, 14, 2, 0, 0));
  base.setUTCDate(base.getUTCDate() + day);
  base.setUTCMinutes(base.getUTCMinutes() + minutes);
  return base.toISOString();
}

function buildLog(): AuditEntry[] {
  const entries: AuditEntry[] = [];
  let clock = 0;

  evidenceFiles.forEach((file, fileIndex) => {
    entries.push({
      id: `au-up-${file.id}`,
      at: stamp(fileIndex, (clock += 7)),
      kind: "upload",
      actor: "ผู้สมัคร (เจ้าของพาสปอร์ต)",
      title: `อัปโหลด ${file.name}`,
      detail: `ประเภท ${file.kind} · ${file.pages} หน้า · ${file.sizeKb} KB — บันทึกไฟล์ต้นฉบับไว้ทั้งฉบับเพื่อการตรวจย้อนกลับ`,
      refs: [
        { label: "ไฟล์", value: file.name },
        { label: "จำนวนทักษะที่สกัดได้", value: `${file.extractedSkills}` },
      ],
      hash: hashOf(`upload:${file.id}`),
    });

    explainPipelineFallback.forEach((stage, stageIndex) => {
      entries.push({
        id: `au-ex-${file.id}-${stage.id}`,
        at: stamp(fileIndex, (clock += 2 + stageIndex)),
        kind: "extraction",
        actor: "SkillLens AI Pipeline v2.4",
        title: `${stage.label} — ${file.name}`,
        detail: stage.note,
        refs: [
          { label: "ขั้นตอน", value: `${stageIndex + 1}/${explainPipelineFallback.length}` },
          { label: "อินพุต", value: file.name },
        ],
        hash: hashOf(`stage:${file.id}:${stage.id}`),
      });
    });
  });

  skills.forEach((skill, skillIndex) => {
    skill.evidence.forEach((evidence, evidenceIndex) => {
      const locator = [
        evidence.page ? `หน้า ${evidence.page}` : null,
        evidence.paragraph ? `ย่อหน้า ${evidence.paragraph}` : null,
        evidence.commit ? `commit ${evidence.commit}` : null,
        evidence.filePath ?? null,
        evidence.section ?? null,
      ]
        .filter(Boolean)
        .join(" · ");

      entries.push({
        id: `au-ci-${skill.id}-${evidence.id}`,
        at: stamp(2 + (skillIndex % 4), (clock += 3 + evidenceIndex)),
        kind: "citation",
        actor: "SkillLens AI Pipeline v2.4",
        title: `ผูกทักษะ “${skill.name}” กับหลักฐาน`,
        detail: `ข้อความที่อ้างอิง: “${evidence.quote}” — เหตุผล: ${evidence.reasoning}`,
        refs: [
          { label: "แหล่งที่มา", value: evidence.sourceName },
          ...(locator ? [{ label: "ตำแหน่ง", value: locator }] : []),
          { label: "ความเชื่อมั่น", value: `${Math.round(evidence.confidence * 100)}%` },
        ],
        hash: hashOf(`cite:${skill.id}:${evidence.id}`),
      });
    });
  });

  entries.push(
    {
      id: "au-vr-1",
      at: stamp(5, 40),
      kind: "verification",
      actor: "ดร. สมชาย วัฒนา (ผู้ตรวจสอบ)",
      title: "อนุมัติทักษะ TypeScript, PostgreSQL, Docker",
      detail: "ตรวจสอบหลักฐานต้นฉบับและ commit จริงบน GitHub แล้วยืนยันระดับทักษะตามที่ AI เสนอ",
      refs: [
        { label: "ผลการตรวจ", value: "อนุมัติ 3 / แก้ไข 0" },
        { label: "วิธีตรวจ", value: "เปิดเอกสารต้นฉบับทีละหน้า + ตรวจ commit" },
      ],
      hash: hashOf("verify:1"),
    },
    {
      id: "au-vr-2",
      at: stamp(5, 65),
      kind: "verification",
      actor: "ดร. สมชาย วัฒนา (ผู้ตรวจสอบ)",
      title: "ปรับระดับทักษะ AWS จาก Proficient → Working",
      detail: "หลักฐานครอบคลุมเฉพาะ S3 และ Lambda จึงลดระดับลงเพื่อไม่ให้เกินขอบเขตหลักฐาน",
      refs: [{ label: "เหตุผล", value: "ขอบเขตหลักฐานจำกัด" }],
      hash: hashOf("verify:2"),
    },
    {
      id: "au-re-1",
      at: stamp(6, 20),
      kind: "reevaluation",
      actor: "ผู้สมัคร (เจ้าของพาสปอร์ต)",
      title: "ส่งคำขอประเมินใหม่ #RE-1042",
      detail: "แนบใบรับรอง AWS Cloud Practitioner และ repo ใหม่ เพื่อขอทบทวนคะแนนความพร้อมทำงาน",
      refs: [{ label: "สถานะ", value: "ประเมินใหม่สำเร็จ" }],
      hash: hashOf("reeval:1"),
    },
  );

  return entries.sort((a, b) => (a.at < b.at ? 1 : -1));
}

export const auditLog: AuditEntry[] = buildLog();

export function auditCounts() {
  return auditLog.reduce<Record<AuditKind, number>>(
    (totals, entry) => {
      totals[entry.kind] += 1;
      return totals;
    },
    { upload: 0, extraction: 0, citation: 0, verification: 0, reevaluation: 0 },
  );
}
