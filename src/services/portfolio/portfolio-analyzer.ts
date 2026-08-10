import { evidenceFiles, type EvidenceFile } from "@/data/demo";

/**
 * Portfolio / URL analyzer — MOCK
 *
 * TODO: ดึงเนื้อหาเว็บ portfolio จากฝั่ง server แล้วสกัดโครงงานและบทบาทที่ทำ
 *  - normalize เป็น EvidenceFile + Evidence พร้อม section/quote เพื่ออ้างอิงย้อนกลับได้
 *  - ห้ามเรียกจาก browser โดยตรง (CORS + ไม่ควรเปิดเผยคีย์บริการ)
 */
export async function analyzePortfolio(_url: string): Promise<EvidenceFile[]> {
  return evidenceFiles.filter((file) => file.kind === "portfolio");
}
