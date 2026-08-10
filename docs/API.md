# API Documentation — SkillLens AI

> **สถานะปัจจุบัน: ยังไม่มี HTTP endpoint จริงในโปรเจกต์** — ทุกหน้าอ่านข้อมูลจาก mock dataset
> ใน `src/data/*` โดยตรง เอกสารนี้คือสัญญา (contract) ที่ตั้งใจจะ implement
> ทุกรายการด้านล่างจึงกำกับว่า **Mock API**

## รูปแบบทั่วไป

- Base URL: `VITE_API_URL` (เว้นว่าง = server routes ในแอปเดียวกัน)
- ภายในแอปควรใช้ `createServerFn` จาก `@tanstack/react-start`; endpoint ที่ภายนอกเรียกวางใต้ `src/routes/api/`
  และ endpoint สาธารณะวางใต้ `src/routes/api/public/`
- Content-Type: `application/json` (ยกเว้น upload = `multipart/form-data`)
- Validate ทุก input ด้วย zod
- รูป error: `{ "error": { "code": "string", "message": "string" } }`

---

## POST /api/upload — **Mock API**

อัปโหลดไฟล์หลักฐาน

Request: `multipart/form-data` — `file` (PDF/DOCX/PNG/JPG/ZIP), `candidateId`

```json
{
  "file": { "id": "ev-1", "name": "resume-2026.pdf", "kind": "pdf", "pages": 3, "sizeKb": 412 },
  "auditId": "au-up-ev-1"
}
```

`// TODO: Implement real file upload + storage`

---

## POST /api/analyze — **Mock API**

สั่งวิเคราะห์หลักฐานเพื่อสกัดทักษะ

```json
{ "candidateId": "c-1", "fileIds": ["ev-1", "ev-2"], "urls": ["https://github.com/user/repo"] }
```

Response: `{ "skills": [...], "pipeline": [...], "auditIds": [...] }`
โดย `skills[].evidence[]` ต้องมี `sourceName`, locator, `quote`, `reasoning`, `confidence`

`// TODO: Replace mock AI response with production LLM API`

---

## POST /api/github/analyze — **Mock API**

วิเคราะห์ repo จาก URL หรือ username (ใช้ `GITHUB_TOKEN` ฝั่ง server)

```json
{ "url": "https://github.com/user/repo" }
```

Response: `{ "repos": [{ "name": "...", "language": "...", "commits": 128 }], "skills": [...] }`

`// TODO: Implement GitHub repository analysis`

---

## POST /api/job-match — **Mock API**

```json
{ "candidateId": "c-1", "roleIds": ["job-1"], "sortBy": "matchScore" }
```

Response: `{ "matches": [{ "id", "title", "company", "matchScore", "matchingSkills", "missingSkills", "rationale", "advice", "justifications": [{ "skill", "quote", "source", "locator", "confidence" }] }] }`

`// TODO: Implement real job matching`

---

## POST /api/skill-gap — **Mock API**

```json
{ "candidateId": "c-1", "roleId": "job-1" }
```

Response: `{ "gaps": [{ "skill": "AWS", "requiredLevel": "proficient", "currentLevel": "working" }] }`

---

## POST /api/recommendation — **Mock API**

```json
{ "candidateId": "c-1", "gaps": ["AWS"] }
```

Response: `{ "weeks": [{ "week": 1, "focus": "...", "tasks": [...], "evidenceGoal": "..." }] }`

---

## POST /api/reevaluate — **Mock API**

ส่งหลักฐานใหม่และขอประเมินใหม่

```json
{ "candidateId": "c-1", "fileIds": ["ev-9"], "note": "แนบใบรับรอง AWS" }
```

Response: `{ "requestId": "RE-1042", "changeSummary": { "newSkills": [], "levelChanges": [], "readinessDelta": 4 } }`

---

## GET /api/passport/:passportNumber — **Mock API**

ข้อมูล passport สาธารณะ (แสดงเฉพาะทักษะที่ยืนยันแล้ว ไม่คืน PII)

---

## GET /api/audit — **Mock API**

`?kind=upload|extraction|citation|verification|reevaluation&q=...`
Response: `{ "entries": [{ "id", "at", "kind", "actor", "title", "detail", "refs", "hash" }] }`

---

## GET /api/readiness/:candidateId — **Mock API**

Response: `{ "score": 78, "components": [{ "label", "weight", "score", "reason" }] }`

---

## Security

- ทุก endpoint ที่แตะข้อมูลผู้สมัครต้องตรวจ session ก่อน และตรวจ role จากตาราง `user_roles`
- `AI_API_KEY`, `GITHUB_TOKEN`, `SUPABASE_SERVICE_ROLE_KEY` อ่านได้เฉพาะใน handler ฝั่ง server
- endpoint สาธารณะ (`/api/public/*`) ต้องตรวจ signature/rate limit เองในตัว handler
