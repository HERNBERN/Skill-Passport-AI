# GitHub Copilot Instructions — SkillLens AI

## SkillLens AI คืออะไร

แพลตฟอร์ม **AI Skill Passport** วิเคราะห์หลักฐานการเรียนรู้ (Resume, Portfolio, GitHub, ใบรับรอง, งานจริง)
แล้วสร้าง **Digital Skill Passport** ที่ตรวจสอบย้อนกลับได้ทุกทักษะ

## เป้าหมายของระบบ

- ทุกทักษะต้องมีหลักฐานอ้างอิงได้ **ห้ามสร้างทักษะที่ไม่มีหลักฐาน**
- AI ต้องอธิบายได้: quote ที่ยกมา, ตำแหน่ง (หน้า/ย่อหน้า/commit/ไฟล์), เหตุผล, ค่าความเชื่อมั่น
- ลดอคติ: ห้ามใช้ฟิลด์ใน `BIAS_EXCLUDED` (`src/data/impact.ts`) มาคำนวณคะแนน
- ตรวจย้อนกลับได้: ทุกเหตุการณ์ลงใน audit trail (`src/data/audit.ts`)

## Target Users

1. **Candidate** — นักศึกษา, ผู้เปลี่ยนสายงาน, กลุ่ม NEET, ผู้ประกอบการรายย่อย
2. **Recruiter** — คัดกรองด้วยทักษะที่มีหลักฐาน, เปรียบเทียบผู้สมัคร
3. **Reviewer** — ผู้เชี่ยวชาญยืนยัน/ปรับระดับทักษะ

## Core Features (ห้ามลบ)

Smart Uploader · AI Skill Extractor · Digital Skill Passport (+ Public Passport, QR, PDF/JSON export) ·
Skill DNA / Evidence Graph · Work Readiness Score · Job Matching + ranking filters · Skill Gap Analysis ·
Learning Recommendation / Roadmap · Explainable AI (side-by-side evidence viewer) · Recruiter dashboard ·
Candidate comparison · Reviewer verification · Evidence Audit Trail · Request Re-evaluation ·
Personas showcase · Social Impact dashboard

## Tech Stack

TanStack Start v1 (React 19, SSR) · Vite · TypeScript · Tailwind CSS v4 · shadcn/ui + Radix ·
lucide-react · recharts · TanStack Query · sonner (toast) · zod

**ห้าม** ติดตั้งหรือใช้ react-router-dom, Next.js, styled-components, MUI, axios ที่ไม่จำเป็น
router คือ TanStack Router เท่านั้น

## Project Structure

```text
src/routes/       = pages (file-based routing) + src/routes/api/* = server routes
src/routes/__root.tsx  root layout, head/meta
src/components/   feature components (+ ui/ = shadcn primitives)
src/hooks/        reusable React hooks
src/services/     ai/ github/ portfolio/ — integration boundary (ปัจจุบันเป็น mock)
src/data/         demo.ts, impact.ts, standards.ts, audit.ts (mock datasets + types)
src/types/        shared type re-exports
src/lib/          utils, passport-pdf, session, error handling
src/styles.css    design tokens (Tailwind v4 @theme)
src/routeTree.gen.ts  generated — ห้ามแก้มือ
```

## Coding conventions

- TypeScript strict; ห้าม `any`, ห้าม `@ts-ignore` — แก้ type ให้ถูกต้องแทน
- Named export สำหรับ component และ util; route ต้อง export `Route` จาก `createFileRoute`
- แยก Business logic ออกจาก UI: logic → `src/services/*` หรือ `src/lib/*`, component ทำหน้าที่ render
- ทุก route ต้องมี `head()` ของตัวเอง (title/description/og ที่ไม่ซ้ำกัน)
- ใช้ `sonner` `toast()` สำหรับ feedback (ไม่มี `@/hooks/use-toast` ในโปรเจกต์นี้)

## Naming conventions

- ไฟล์: `kebab-case.tsx` / `kebab-case.ts` (route ตามรูปแบบ file-based routing เช่น `p.$passportNumber.tsx`)
- Component: `PascalCase` · hook: `useSomething` · type/interface: `PascalCase` · constant: `SCREAMING_SNAKE_CASE`
- id ในข้อมูล mock ใช้ prefix สั้น เช่น `sk-`, `ev-`, `au-`

## Component conventions

- ใช้ shadcn ใน `src/components/ui/` ก่อนเขียนใหม่; ถ้าไม่มีให้เพิ่มแบบ shadcn ปกติ
- Reuse `AppShell`, `EvidenceViewer`, `JobMatchPanel`, `EvidenceGraph`, `ReadinessBreakdownPanel`, `AntiBiasPanel`, `PassportDocument`
- ใช้ **semantic design tokens** เท่านั้น (`bg-surface`, `text-muted-foreground`, `text-primary`, class `panel`)
  **ห้าม** hardcode สี (`text-white`, `bg-[#fff]`) เพราะจะพัง dark mode
- component ยาวเกิน ~250 บรรทัดให้แยกย่อย

## API conventions

- Logic ภายในแอป → `createServerFn` จาก `@tanstack/react-start` (ไฟล์ `*.functions.ts`)
- Endpoint ที่ภายนอกเรียก (webhook/public API) → server route ใต้ `src/routes/api/`; ถ้าเป็น public ใช้ `src/routes/api/public/*` และตรวจ signature เอง
- Validate input ด้วย zod ทุกครั้ง; อ่าน `process.env` **ภายใน handler** เท่านั้น
- คืน error แบบมีความหมาย (status + message) ไม่ swallow error

## Database conventions

- Supabase/Postgres, `snake_case` ทุก table/column, PK เป็น `uuid`
- เปิด RLS ทุกตาราง + `GRANT` ให้ role ที่ policy อนุญาต
- role ของผู้ใช้เก็บในตาราง `user_roles` แยก **ห้าม** เก็บ role บนตาราง profile
- ทุก evidence ต้องผูก `candidate_id` และมี locator (page/paragraph/commit/file_path)

## AI response format

AI ต้องคืน JSON ตามรูปนี้ และ validate ด้วย zod ก่อนใช้:

```json
{
  "skills": [
    {
      "name": "TypeScript",
      "category": "technical",
      "level": "proficient",
      "confidence": 0.86,
      "evidence": [
        {
          "sourceName": "resume-2026.pdf",
          "sourceType": "pdf",
          "page": 2,
          "paragraph": 3,
          "commit": null,
          "filePath": null,
          "quote": "ข้อความจริงจากเอกสาร ห้ามแต่งขึ้นเอง",
          "reasoning": "เหตุผลว่าทำไม quote นี้สนับสนุนทักษะและระดับนี้",
          "confidence": 0.86
        }
      ]
    }
  ]
}
```

กติกา: `quote` ต้องเป็นข้อความที่ปรากฏจริงในหลักฐาน · ถ้าไม่มีหลักฐานให้ไม่คืนทักษะนั้น ·
`confidence` อยู่ในช่วง 0–1 · ห้ามอ้างอิงข้อมูลใน `BIAS_EXCLUDED`

## Security requirements

- **ห้าม** ใส่ API key/secret ใน source code หรือฝั่ง client; ใช้ `.env` + `process.env` ใน server เท่านั้น
- เรียก LLM, GitHub API, OCR จาก server เท่านั้น
- ห้าม log ค่า secret หรือ PII ของผู้สมัคร
- ตรวจสิทธิ์ผู้ใช้ก่อนอ่าน/เขียนข้อมูลผู้อื่น; public passport แสดงเฉพาะทักษะที่ยืนยันแล้ว

## UX principles

- Mobile-first, เข้าถึงได้ (keyboard navigation, focus state ชัด, aria-label, target ≥ 44px)
- ธีม Modern Enterprise SaaS สไตล์ Claude.ai: พื้นหลังอบอุ่น, ตัวอักษรสี espresso, accent coral มุมมน
- ทุกตัวเลขต้องกดดูที่มาได้ (evidence-first) ไม่มี "คะแนนลอย ๆ"
- ภาษา UI หลักเป็นภาษาไทย เขียนแบบเข้าใจง่าย ไม่ใช้ศัพท์เทคนิคเกินจำเป็น

## กติกาสำหรับ Copilot

1. อ่านโครงสร้างโปรเจกต์และไฟล์ที่เกี่ยวข้องก่อนแก้โค้ด
2. ไม่สร้างไฟล์ซ้ำโดยไม่จำเป็น
3. Reuse component/hook/util ที่มีอยู่
4. ไม่เปลี่ยน UI เดิมโดยไม่มีเหตุผล
5. ไม่ลบ feature เดิม
6. ไม่ใส่ API key ลงใน source code
7. ใช้ TypeScript ให้ถูกต้อง (strict, ไม่มี any)
8. แยก business logic ออกจาก UI
9. เขียนโค้ดที่ maintainable และมีชื่อที่สื่อความหมาย
10. ตรวจ `package.json` ก่อนเพิ่ม package ใหม่ และอธิบายเหตุผลที่ต้องเพิ่ม
