# Services — integration boundary

โฟลเดอร์นี้คือ "ขอบ" ระหว่าง UI กับระบบภายนอก (LLM, GitHub, Portfolio, OCR, ฐานข้อมูล)

- `ai/` — text extraction, skill extraction, job matching, recommendation
- `github/` — วิเคราะห์ repo/commit เป็นหลักฐานทักษะ
- `portfolio/` — วิเคราะห์เว็บ portfolio / ลิงก์ผลงาน

**ปัจจุบันทุกไฟล์คืนค่าจาก mock dataset ใน `src/data/*`** เพื่อให้ UI ทำงานได้เต็มรูปแบบ
เมื่อจะต่อของจริง ให้แก้เฉพาะไฟล์ในโฟลเดอร์นี้ โดยคง signature เดิมไว้ — UI จะไม่ต้องแก้

กติกา:

1. ฟังก์ชันใน `services/` ต้องไม่ import React หรือ component
2. การเรียก provider ภายนอกทำได้เฉพาะฝั่ง server (server function / server route) — อ่าน `process.env` **ภายใน handler**
3. validate ผลลัพธ์จาก LLM ด้วย zod ก่อนคืนออกไป
4. ทุกการเรียกที่เปลี่ยนสถานะต้องบันทึก audit entry
