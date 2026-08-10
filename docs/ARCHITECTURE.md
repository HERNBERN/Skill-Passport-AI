# Architecture — SkillLens AI

## ภาพรวม

```text
Frontend (React 19 + TanStack Router, SSR)
        ↓  useServerFn / fetch
API Layer (TanStack server functions + src/routes/api/*)
        ↓
AI Processing (text extraction → LLM → skill + evidence mapping)   [MOCK]
        ↓
Database (Supabase / PostgreSQL + Storage)                         [PLANNED]
```

สถานะปัจจุบัน: ชั้น Frontend สมบูรณ์ ข้อมูลอ่านตรงจาก mock dataset ใน `src/data/*`
ชั้น API/AI/DB มีการออกแบบและจุดต่อไว้ (`src/services/*`) แต่ยังไม่เชื่อมของจริง

## Layers

| Layer | ที่อยู่ | หน้าที่ |
| --- | --- | --- |
| Routes / Pages | `src/routes/*.tsx` | หน้าจอ + `head()` metadata |
| Layout | `src/routes/__root.tsx`, `src/components/app-shell.tsx` | shell, sidebar, theme, nav ตาม role |
| Feature components | `src/components/*` | evidence viewer, job match, readiness, passport, graph |
| UI primitives | `src/components/ui/*` | shadcn/Radix |
| Services | `src/services/{ai,github,portfolio}` | integration boundary ไปยัง AI/GitHub/Portfolio |
| Data | `src/data/*` | mock dataset + types (demo, impact, standards, audit) |
| Lib | `src/lib/*` | utils, PDF export, session, error handling |
| Server entry | `src/server.ts`, `src/start.ts`, `src/router.tsx` | SSR handler, middleware, router |

## User Flow

```text
/auth (เลือก role)
  → /dashboard        ภาพรวม readiness + evidence graph
  → /upload           Smart Uploader (ไฟล์ / URL)
  → /github           วิเคราะห์ repo
  → /skills           Evidence Explorer (side-by-side viewer)
  → /passport         Digital Skill Passport (+PDF/JSON/QR/Share)
  → /p/:passportNumber  Public Passport (เฉพาะทักษะที่ยืนยันแล้ว)
  → /jobs             Job Matching + ranking filters
  → /roadmap          Skill Gap → Learning Recommendation
  → /reevaluate       ส่งหลักฐานใหม่ + สรุปการเปลี่ยนแปลง
  → /audit            Evidence Audit Trail
recruiter: /recruiter, /compare      reviewer: /review
demo: /personas, /impact
```

## Data Flow

```text
ไฟล์/URL ที่ผู้ใช้ส่ง
  → EvidenceFile (id, name, kind, pages, sizeKb, extractedSkills)
  → Evidence     (sourceName, sourceType, page/paragraph/commit/filePath/section,
                  quote, reasoning, confidence)
  → Skill        (name, category, level, confidence, verified, evidence[])
  → ReadinessBreakdown (components[] + weight + reason)
  → JobRole match (matchScore, matchingSkills, missingSkills, rationale, advice)
  → RoadmapWeek  (สิ่งที่ต้องเรียนเพื่อปิด gap)
  → AuditEntry   (ทุกขั้นตอนถูกบันทึกพร้อม hash)
```

Type ทั้งหมดประกาศใน `src/data/demo.ts`, `src/data/impact.ts`, `src/data/standards.ts`, `src/data/audit.ts`
และ re-export ที่ `src/types/index.ts`

## AI Pipeline

สรุปสั้น: Input → Text extraction/OCR → Document understanding → LLM analysis → Skill extraction →
Classification (ESCO/O*NET/SFIA/TQF) → Evidence mapping → Confidence → Passport → Job matching → Gap → Recommendation
รายละเอียดเต็มอยู่ใน [`AI_PIPELINE.md`](AI_PIPELINE.md) (ทุกขั้นปัจจุบันเป็น **Mock**)

## API Flow

```text
Component → useServerFn(serverFn)  หรือ fetch(`${VITE_API_URL}/api/...`)
          → server function/route: zod validate → อ่าน process.env ใน handler
          → เรียก service (ai/github/portfolio) → เขียน DB + audit log
          → คืน JSON ที่ typed
```

ดูรายการ endpoint ใน [`API.md`](API.md)

## Database Flow (planned)

ตารางที่ออกแบบไว้ (schema `public`, `snake_case`, PK uuid):

| Table | สาระสำคัญ |
| --- | --- |
| `candidates` | โปรไฟล์, passport_number, verification_status, work_readiness |
| `evidence_files` | ไฟล์หลักฐาน + storage path + จำนวนหน้า |
| `skills` | ทักษะที่สกัดได้ + level + confidence + verified |
| `skill_evidence` | ผูก skill ↔ evidence + quote + locator + reasoning |
| `job_roles` | ตำแหน่งงานและทักษะที่ต้องการ |
| `readiness_scores` | องค์ประกอบคะแนนความพร้อม + น้ำหนัก + เหตุผล |
| `audit_log` | ทุกเหตุการณ์ (upload/extraction/citation/verification/reevaluation) |
| `reevaluations` | คำขอประเมินใหม่ + สรุปการเปลี่ยนแปลง |
| `user_roles` | role แยกจาก profile (กัน privilege escalation) |

กฎ: เปิด RLS ทุกตาราง, `GRANT` ให้ role ที่ policy อนุญาต, ตรวจ role ผ่าน security-definer function `has_role()`

## Authentication

- ปัจจุบัน: เลือก role แบบ demo เก็บใน `localStorage` (`src/lib/session.ts`) — **ไม่ใช่ auth จริง**
- แผน: Supabase Auth (email/password + OAuth), route ที่ต้องล็อกอินอยู่ใต้ `src/routes/_authenticated/`,
  server function ที่ต้องยืนยันตัวตนใช้ middleware ตรวจ token, public passport ยังเข้าถึงได้โดยไม่ต้องล็อกอิน

## File Processing

```text
เลือกไฟล์ (PDF/DOCX/รูป/ZIP) หรือวาง URL (GitHub/Portfolio)
  → ตรวจชนิดและขนาดไฟล์
  → อัปโหลดเข้า storage (planned)
  → text extraction / OCR
  → normalize เป็นข้อความ + ตำแหน่ง (หน้า/ย่อหน้า) เพื่อใช้ทำ highlight ใน EvidenceViewer
```

## Skill Extraction

1. ตัดข้อมูลที่อาจก่ออคติออกก่อนส่งเข้า LLM (`BIAS_EXCLUDED`)
2. LLM คืน skill + evidence ตาม JSON schema (ดู `.github/copilot-instructions.md`)
3. ตรวจว่า `quote` ปรากฏจริงในเอกสาร ถ้าไม่พบให้ตัดทักษะนั้นออก
4. map เข้ามาตรฐาน (`src/data/standards.ts`) และคำนวณ confidence
5. บันทึก audit entry ทุกขั้น

## Job Matching

- คำนวณ `matchScore` จากสัดส่วนทักษะที่ตรง ถ่วงน้ำหนักด้วย level + confidence + สถานะ verified
- ทุก match ต้องมี justification ที่ลิงก์ไปยัง evidence จริง (`JobMatchPanel` → `EvidenceViewer`)
- `missingSkills` ป้อนต่อเข้า Skill Gap Analysis และ Learning Roadmap
