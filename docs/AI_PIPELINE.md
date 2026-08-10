# AI Pipeline — SkillLens AI

> **สถานะ: ทุกขั้นตอนในโค้ดปัจจุบันเป็น MOCK** — ผลลัพธ์อ่านจาก dataset ใน `src/data/*`
> ไม่มีการเรียก LLM, OCR หรือ GitHub API จริง จุดที่ต้องแทนที่มี `// TODO:` กำกับใน `src/services/*`

## ขั้นตอน

```text
Input (Resume / Portfolio / Project / GitHub URL / ใบรับรอง)
   ↓ 1. Text Extraction / OCR                  [MOCK]
   ↓ 2. Document Understanding                  [MOCK]
   ↓ 3. LLM Analysis                            [MOCK]
   ↓ 4. Skill Extraction                        [MOCK]
   ↓ 5. Skill Classification (ESCO/O*NET/SFIA/TQF)  [MOCK — mapping จริงมีใน standards.ts]
   ↓ 6. Evidence Mapping                        [MOCK — โครงสร้างข้อมูลจริง]
   ↓ 7. Confidence Score                        [MOCK]
   ↓ 8. Digital Skill Passport                  [REAL UI, MOCK DATA]
   ↓ 9. Job Matching                            [MOCK]
   ↓ 10. Skill Gap                              [MOCK]
   ↓ 11. Learning Recommendation                [MOCK]
```

## รายละเอียดแต่ละขั้น

### 1. Text Extraction / OCR — MOCK
- ปัจจุบัน: `src/data/demo.ts` `evidenceFiles` มีข้อความตัวอย่างพร้อมหน้า/ย่อหน้า
- production: PDF → text layer, ไม่มี text layer → OCR (`PDF_OCR_API_KEY`), DOCX → XML parse, รูป → OCR
- ต้องเก็บ **ตำแหน่ง** (หน้า/ย่อหน้า/offset) ไว้เพื่อ highlight ใน `EvidenceViewer`
- `// TODO: Implement real PDF text extraction` → `src/services/ai/text-extraction.ts`

### 2. Document Understanding — MOCK
- แยกส่วนเอกสาร (การศึกษา, ประสบการณ์, โครงงาน, ใบรับรอง) และตัดฟิลด์ใน `BIAS_EXCLUDED` ออกก่อนส่งเข้า LLM

### 3. LLM Analysis — MOCK
- production: เรียก LLM จาก server เท่านั้น ด้วย `AI_API_KEY` / `AI_MODEL`
- ต้องบังคับ JSON output และ validate ด้วย zod
- `// TODO: Replace mock AI response with production LLM API` → `src/services/ai/skill-extractor.ts`

### 4. Skill Extraction — MOCK
- คืนเฉพาะทักษะที่มี evidence; ทักษะที่ไม่มี quote รองรับต้องถูกตัดออก
- รองรับทั้ง technical, transferable และทักษะจากประสบการณ์ชีวิต (เช่น log LINE OA ของผู้ประกอบการรายย่อย)

### 5. Skill Classification — MOCK (mapping จริง)
- map ชื่อทักษะเข้ามาตรฐานผ่าน `getStandardProfile()` ใน `src/data/standards.ts` (ESCO, O*NET, SFIA, TQF, NCB)
- ระดับทักษะ: `aware → working → proficient → advanced`

### 6. Evidence Mapping — MOCK (โครงสร้างจริง)
- ทุกคู่ skill ↔ evidence เก็บ `sourceName`, `sourceType`, locator (`page`/`paragraph`/`commit`/`filePath`/`section`), `quote`, `reasoning`, `confidence`
- ต้องยืนยันว่า `quote` ปรากฏจริงในเอกสารต้นฉบับก่อนบันทึก
- ทุกการผูกลง audit trail (`src/data/audit.ts`, kind = `citation`)

### 7. Confidence Score — MOCK
- ปัจจัย: ความชัดเจนของ quote, จำนวนแหล่งที่ยืนยันซ้ำ, ความน่าเชื่อถือของแหล่ง (commit จริง > ข้อความในเรซูเม่), ความใหม่ของหลักฐาน
- แสดงเป็น % ทุกจุดที่อ้างอิงทักษะ

### 8. Digital Skill Passport — UI จริง / ข้อมูล mock
- ประกอบด้วย passport number, สถานะการยืนยัน, ทักษะพร้อมหลักฐาน, Work Readiness Score,
  Anti-Bias panel, QR → public passport, PDF (`src/lib/passport-pdf.ts`) และ JSON export

**Work Readiness Score (อธิบายได้):** คะแนน 0–100 จากองค์ประกอบถ่วงน้ำหนักใน
`ReadinessBreakdown` (`src/data/impact.ts`) โดยแต่ละองค์ประกอบมี `weight`, `score` และ `reason` ที่อ้างหลักฐาน

### 9. Job Matching — MOCK
- `matchScore` จากสัดส่วนทักษะที่ตรง ถ่วงน้ำหนักด้วย level/confidence/verified
- มี `rationale`, `advice`, `matchingSkills`, `missingSkills` และ justification ที่ลิงก์กลับไปยัง evidence
- `// TODO: Implement real job matching` → `src/services/ai/job-matcher.ts`

### 10. Skill Gap — MOCK
- gap = ทักษะที่ตำแหน่งงานต้องการ − ทักษะที่มีหลักฐานรองรับ (พร้อมระดับที่ยังขาด)

### 11. Learning Recommendation — MOCK
- แปลง gap เป็นแผนรายสัปดาห์ (`roadmap` ใน `src/data/demo.ts`) พร้อมงานที่ทำให้เกิด "หลักฐานใหม่" ป้อนกลับเข้า pipeline

## Anti-Bias

- ฟิลด์ที่ห้ามนำมาคำนวณอยู่ใน `BIAS_EXCLUDED`; ฟิลด์ที่ใช้ได้อยู่ใน `BIAS_ALLOWED`
- ต้อง redact ก่อนส่งเข้า LLM ไม่ใช่กรองหลังจากได้คะแนน
- `biasFlags` แจ้งเตือนเมื่อพบข้อมูลที่อาจก่ออคติในหลักฐานที่อัปโหลด

## Re-evaluation Loop

```text
หลักฐานใหม่ → pipeline ขั้น 1–7 อีกครั้ง → เทียบผลก่อน/หลัง
→ สรุปการเปลี่ยนแปลง (ทักษะใหม่, ระดับที่เปลี่ยน, คะแนนที่ขยับ, job match ที่เปลี่ยน)
→ อัปเดต passport + บันทึก audit (kind = reevaluation)
```
