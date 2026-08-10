# SkillLens AI — Digital Skill Passport Platform

SkillLens AI วิเคราะห์ "หลักฐานการเรียนรู้" (Resume, Portfolio, GitHub, ใบรับรอง, งานจริง) แล้วสร้าง
**Digital Skill Passport** ที่ตรวจสอบย้อนกลับได้ทุกทักษะ พร้อม Explainable AI, Work Readiness Score,
Job Matching, Skill Gap และ Learning Roadmap

> โปรเจกต์นี้ export มาจาก Lovable และพร้อมเปิดใน VS Code + GitHub Copilot ได้ทันที

---

## Problem

- ปริญญา/เรซูเม่บอกได้แค่ว่า "เคยเรียนอะไร" ไม่ได้บอกว่า "ทำอะไรได้จริง"
- ผู้สมัครกลุ่ม NEET, สายอาชีพ, ผู้เปลี่ยนสายงาน ไม่มีเวทีแสดงทักษะที่มีหลักฐานรองรับ
- ผู้ประกอบการคัดคนช้าและมีอคติจากข้อมูลที่ไม่เกี่ยวกับความสามารถ

## Solution

- ทุกทักษะต้องมี **หลักฐานอ้างอิงได้** (ไฟล์ + หน้า/ย่อหน้า/commit + ข้อความที่ยกมา + เหตุผลของ AI)
- คะแนนความพร้อมทำงานแบบ **อธิบายได้** พร้อมน้ำหนักแต่ละองค์ประกอบ
- กรอบ **Anti-Bias**: ระบุฟิลด์ที่ห้ามนำมาคำนวณ พร้อมเหตุผล
- **Audit Trail** บันทึกทุกการอัปโหลด ทุกขั้นตอน AI และทุกการอ้างอิงทักษะ ↔ หลักฐาน

## Main Features

1. Smart Uploader (PDF/DOCX/รูป/URL GitHub, Portfolio)
2. AI Skill Extractor
3. Digital Skill Passport (+ Public Passport + QR + PDF/JSON export)
4. Skill DNA / Evidence Graph
5. Work Readiness Score (explainable breakdown)
6. Job Matching + ranking filters + evidence-linked justifications
7. Skill Gap Analysis
8. Learning Recommendation / Roadmap
9. Explainable AI (side-by-side evidence viewer, AI pipeline steps)
10. Recruiter dashboard, candidate comparison, reviewer verification, re-evaluation flow, social impact dashboard

## User Flow

```text
Upload Portfolio / Project / Resume / GitHub
   ↓ AI วิเคราะห์หลักฐานการเรียนรู้
   ↓ Extract Skills
   ↓ Evidence Mapping
   ↓ Digital Skill Passport
   ↓ Job Matching
   ↓ Skill Gap Analysis
   ↓ Learning Recommendation
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | TanStack Start v1 (React 19 + SSR) |
| Build | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 (`src/styles.css`, semantic oklch tokens) |
| UI | shadcn/ui + Radix + lucide-react |
| Charts | recharts |
| Data fetching | TanStack Query |
| Server code | TanStack server functions / server routes (`src/routes/api/*`) |
| Database (planned) | Supabase / PostgreSQL |
| Data today | typed mock layer under `src/data/*` |

> ⚠️ สถานะปัจจุบัน: UI และ data model สมบูรณ์, ส่วน AI/DB ยังเป็น **Mock** ดู `docs/AI_PIPELINE.md` และ `docs/API.md`

## Project Structure

TanStack Start ใช้ **file-based routing** — โฟลเดอร์ `src/routes/` ทำหน้าที่แทน `src/pages/`
และ layout อยู่ใน `src/routes/__root.tsx` + `src/components/app-shell.tsx`
โครงสร้างนี้คงไว้ตามเดิมโดยเจตนา (ไม่ rewrite)

```text
SkillLens-AI/
├── .github/copilot-instructions.md   # บริบทสำหรับ GitHub Copilot
├── docs/
│   ├── ARCHITECTURE.md
│   ├── AI_PIPELINE.md
│   └── API.md
├── public/                           # static assets, robots.txt
├── src/
│   ├── routes/                       # = pages (file-based routing)
│   │   ├── __root.tsx                # root layout + head/meta
│   │   ├── index.tsx  auth.tsx  dashboard.tsx
│   │   ├── upload.tsx  github.tsx  skills.tsx
│   │   ├── passport.tsx  p.$passportNumber.tsx
│   │   ├── jobs.tsx  roadmap.tsx  assistant.tsx
│   │   ├── recruiter.tsx  compare.tsx  review.tsx
│   │   ├── audit.tsx  reevaluate.tsx  documents.tsx
│   │   ├── personas.tsx  impact.tsx
│   │   └── api/                      # server routes (HTTP endpoints)
│   ├── components/                   # feature components
│   │   └── ui/                       # shadcn primitives
│   ├── hooks/
│   ├── services/                     # ai/ github/ portfolio/ (integration boundary)
│   ├── data/                         # demo/impact/standards/audit datasets
│   ├── lib/                          # utils, pdf export, session, error handling
│   ├── styles.css
│   ├── router.tsx  start.ts  server.ts
│   └── routeTree.gen.ts              # generated — ห้ามแก้มือ
├── .env.example
├── package.json
└── tsconfig.json
```

## Installation

ต้องมี Node.js 20+ (แนะนำ [nvm](https://github.com/nvm-sh/nvm))

```sh
git clone <your-repo-url>
cd SkillLens-AI
npm install
cp .env.example .env
npm run dev
```

เปิด http://localhost:8080

## Environment Variables

คัดลอก `.env.example` เป็น `.env` — **ห้าม commit `.env`**

| ตัวแปร | ฝั่ง | ใช้ทำอะไร |
| --- | --- | --- |
| `VITE_API_URL` | client | Base URL ของ API layer (ว่าง = ใช้ server routes ในแอปเดียวกัน) |
| `VITE_SUPABASE_URL` | client | URL ของโปรเจกต์ Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | client | publishable/anon key (เปิดเผยได้, ต้องมี RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | server | สิทธิ์ข้าม RLS สำหรับงาน admin — server เท่านั้น |
| `AI_API_KEY` | server | คีย์ LLM provider สำหรับ skill extraction |
| `AI_MODEL` | server | ชื่อโมเดลที่ใช้ เช่น `google/gemini-2.5-flash` |
| `GITHUB_TOKEN` | server | อ่าน repo/commit เพื่อวิเคราะห์หลักฐานโค้ด |
| `PDF_OCR_API_KEY` | server | บริการ OCR/text extraction สำหรับ PDF/รูป (ถ้าใช้) |

กติกา: เฉพาะตัวแปรที่ขึ้นต้น `VITE_` เท่านั้นที่ถูกส่งไปฝั่ง browser (`import.meta.env`)
ตัวแปรอื่นอ่านได้เฉพาะใน server function/route ผ่าน `process.env` **ภายใน handler**

## Running the Project

```sh
npm run dev       # dev server (port 8080)
npm run build     # production build
npm run preview   # ดู production build
npm run lint      # eslint
npm run format    # prettier
```

## API Configuration

ปัจจุบันข้อมูลทั้งหมดมาจาก mock ใน `src/data/*` (ไม่มี network call)
เมื่อเชื่อม API จริง ให้เพิ่ม server routes ใต้ `src/routes/api/` และเรียกผ่าน `src/services/*`
รายการ endpoint ที่ออกแบบไว้อยู่ใน [`docs/API.md`](docs/API.md)

## AI Configuration

- Pipeline ทั้ง 10 ขั้น (OCR → LLM → Skill Extraction → Evidence Mapping → Confidence → Passport → Matching → Gap → Recommendation) อธิบายไว้ใน [`docs/AI_PIPELINE.md`](docs/AI_PIPELINE.md)
- จุดต่อ production LLM คือ `src/services/ai/*` — เรียกจาก server เท่านั้น เพื่อไม่ให้ `AI_API_KEY` รั่ว
- ทุก response ของ AI ต้องคืน evidence locator (source, page/paragraph/commit, quote, reasoning, confidence) ตาม type ใน `src/types/`

## Database Configuration

ยังไม่ได้เชื่อมฐานข้อมูล — ตาราง/สคีมาที่วางไว้ (candidates, evidence_files, skills, skill_evidence,
job_roles, readiness_scores, audit_log, reevaluations) และหลักการ RLS อยู่ใน `docs/ARCHITECTURE.md`

## GitHub Integration

- โหมดปัจจุบัน: หน้า `/github` วิเคราะห์จากข้อมูลตัวอย่าง
- production: ใช้ `GITHUB_TOKEN` เรียก GitHub REST API จาก server (`src/services/github/`) เพื่อดึง repo, ภาษา, commit และแปลงเป็นหลักฐาน

## Known Issues

- AI extraction, OCR, GitHub analysis, job matching และ database ยังเป็น mock (มี `// TODO:` กำกับไว้)
- Session/auth เก็บใน `localStorage` (`src/lib/session.ts`) — ยังไม่ใช่ auth จริง
- PDF export ใช้การ print HTML ผ่าน iframe จึงพึ่งฟอนต์ไทยของระบบผู้ใช้
- ข้อความ UI ผสมไทย/อังกฤษ ยังไม่มีระบบ i18n

## Future Development

1. เชื่อม LLM จริง + schema validation ด้วย zod
2. text extraction/OCR จริงสำหรับ PDF/DOCX/รูป
3. GitHub repo analysis จริง (ภาษา, คุณภาพโค้ด, ความสม่ำเสมอของ commit)
4. Supabase auth + Postgres + RLS + storage สำหรับไฟล์หลักฐาน
5. Job matching จากตำแหน่งงานจริง + mapping มาตรฐาน ESCO/O*NET/SFIA/TQF
6. ระบบผู้ตรวจสอบ (reviewer) และลายมือชื่อดิจิทัลจริงบน passport
7. i18n (ไทย/อังกฤษ) และ accessibility audit เต็มรูปแบบ
