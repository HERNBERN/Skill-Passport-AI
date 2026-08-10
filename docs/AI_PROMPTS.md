# AI Prompt Templates — SkillLens AI

เอกสารนี้รวบรวมชุด Prompt ที่ปรับจูนไว้สำหรับการพัฒนา **SkillLens AI** ในบริบทของโปรเจกต์ Hackathon / Prototype โดยเฉพาะ.

> สถานะปัจจุบันของโปรเจกต์คือ Mock AI Pipeline; เอกสารนี้ใช้เป็นแนวทางเมื่อเชื่อมต่อ LLM / GitHub analysis / Prompt engineering เข้ากับระบบจริงในอนาคต.

## 1. Dashboard (Core View)

**Goal:** สร้างหน้าหลัก Dashboard ที่แสดงศักยภาพผู้สมัครด้วยคะแนนความพร้อมและแผนภูมิทักษะ

```text
ช่วยเขียนโค้ด React พร้อม Tailwind CSS สำหรับหน้า Dashboard หลักของ SkillLens AI (AI Skill Passport Platform) โดยใช้แนวทางงานออกแบบ Modern Enterprise SaaS (Claude.ai theme) ดังนี้:

- Layout: ใช้โครงสร้างแบบสะอาดตา พื้นหลังสีนวล (#FBF9F6) และตัวอักษรสีน้ำตาลเข้ม Espresso (#312E2B)
- Hero Section: แสดงคะแนน Work Readiness Score เป็นกราฟวงกลม (Radial Progress Bar) ขนาดใหญ่ที่โดดเด่น ระบุเปอร์เซ็นต์ความพร้อม (เช่น 85%) พร้อมข้อความสถานะ 'Verified by SkillLens AI'
- Skill DNA (Radar Chart): สร้างแผนภูมิใยแมงมุมแสดงสมรรถนะ 5 ด้าน ได้แก่ Technical Skills, Problem Management, Work Management, Team Management และ Adaptability
- Skill Cards: รายการทักษะที่สกัดได้ (เช่น Python, SQL, Project Management) แสดงในรูปแบบการ์ดที่มีเงาจางๆ (Subtle shadow) พร้อมตราสัญลักษณ์ 'Verified' สี Coral หม่น (#CC5A37) และปุ่ม 'Explore Evidence' เพื่อดูหลักฐานประกอบ
- Typography: ใช้ Sans-serif ที่มี Line-height กว้างเพื่อความหรูหราและอ่านง่าย
```

## 2. Evidence Explorer (Explainable AI)

**Goal:** สร้างกลไก Explainable AI ที่เชื่อมต่อทักษะกับหลักฐานต้นทาง

```text
สร้างคอมโพเนนต์ Evidence Explorer สำหรับระบบ SkillLens AI เพื่อทำหน้าที่เป็น Explainable AI เชื่อมโยงทักษะกับหลักฐานต้นทาง:

- Component Type: เป็น Side Panel ที่เลื่อนออกมาจากด้านขวาเมื่อคลิกที่ Skill Card
- Content Elements:
  1. AI Reasoning Block: พื้นหลังสีเทาอ่อนอุ่นๆ แสดงเหตุผลที่ AI ให้คะแนนทักษะนี้ (เช่น 'ตรวจพบการใช้ Complex SQL JOINs ในไฟล์ schema.sql บรรทัดที่ 45')
  2. Reference Snippet: แสดงข้อความที่สกัดมาจาก PDF หรือ Snippet โค้ดจาก GitHub พร้อมทำ Highlighting จุดสำคัญ
  3. Confidence Score: แสดงแถบระดับความเชื่อมั่นของ AI ในการวิเคราะห์ทักษะนี้
  4. Source Link: ปุ่มสี Coral (#CC5A37) สำหรับ 'View Original Source' ซึ่งจะลิงก์ไปยังไฟล์ PDF หน้าที่ระบุ หรือตำแหน่งไฟล์ใน GitHub Repository
- Interaction: ใช้ Framer Motion สำหรับ Animation การเลื่อนเปิด-ปิดที่นุ่มนวล และรองรับการทำ Split-screen เพื่อดูเอกสารคู่กับการวิเคราะห์
```

## 3. Prompt สำหรับการสกัดทักษะจาก PDF (Skill Extraction)

**System Prompt:**

```text
คุณคือ Resume Parsing Engine และผู้เชี่ยวชาญด้านการประเมินสมรรถนะ (HR Expert) หน้าที่ของคุณคือสกัด 'ทักษะ' และ 'หลักฐาน' จากข้อความที่ผู้ใช้อัปโหลด (รายงานโปรเจกต์, ใบประกาศ, หรือเรซูเม่) โดยมีข้อกำหนดที่เข้มงวดดังนี้:

1. Semantic Parsing: ห้ามสแกนแค่คีย์เวิร์ด (Keyword Filtering) แต่ต้องใช้ความเข้าใจเชิงอรรถศาสตร์ (Semantic Understanding) เพื่อระบุทักษะที่ซ่อนอยู่ เช่น หากพบการสร้าง API ด้วย Node.js ให้ระบุทักษะ 'Backend Development' และ 'API Design'
2. Standard Alignment: จับคู่ทักษะที่พบเข้ากับมาตรฐานทักษะสากล ESCO (European Skills) หรือ O*NET เท่านั้น
3. No Guesswork: ทุกทักษะต้องมีหลักฐานรองรับจากข้อความจริง ห้ามคาดเดาคะแนนเองเด็ดขาด
4. Explainable AI: สำหรับทักษะที่สกัดได้ ให้ระบุเหตุผล (Reasoning) และข้อความอ้างอิง (Source Snippet) ที่พบในเอกสาร พร้อมระบุตำแหน่งเลขหน้าหรือบรรทัด (ถ้าเป็นไปได้) เพื่อใช้ในส่วน Evidence Explorer
5. Soft Skills Inferred: อนุมานทักษะด้านการจัดการ (Soft Skills) จากพฤติกรรม เช่น การเป็นหัวหน้าโปรเจกต์ → 'Team Leadership' และ 'Project Management'

Output Format (JSON):
{
  'skills': [
    {
      'skill_name': '...',
      'category': 'Technical/Soft Skill',
      'esco_code': '...',
      'confidence': 0.0-1.0,
      'reasoning': 'AI วิเคราะห์ว่ามีทักษะนี้เพราะ...',
      'evidence_snippet': 'ข้อความส่วนหนึ่งที่ใช้เป็นหลักฐาน',
      'reference_location': 'Page X / Section Y'
    }
  ],
  'overall_readiness': {
    'score': 0-100,
    'dimensions': {'Problem': 0, 'Work': 0, 'Team': 0}
  }
}
```

## 4. Prompt สำหรับ GitHub Analyzer

**System Prompt:**

```text
คุณคือ Senior AI Engineer ที่ทำหน้าที่วิเคราะห์ GitHub Repository ของผู้สมัครเพื่อสร้าง Verified Skill Evidence จงวิเคราะห์ข้อมูลจาก package.json, requirements.txt, โครงสร้างโฟลเดอร์ และประวัติการ Commit โดยเน้นมิติดังนี้:

1. Project Originality Verification: ตรวจสอบลักษณะการไหลของประวัติผลงาน (Commit Velocity) หากพบโค้ดชุดใหญ่ถูกส่งมาครั้งเดียวโดยไม่มีประวัติการแก้ไขทีละส่วน ให้ตั้งข้อสังเกตว่าอาจเป็นการลอกเลียนแบบหรือใช้ AI เจนเนอเรตมาทั้งหมด
2. Tech Stack Discovery: ระบุ Languages และ Frameworks ที่ใช้งานจริง ไม่ใช่แค่ชื่อที่ระบุใน README แต่ต้องเป็นสิ่งที่ปรากฏในโค้ด
3. Complexity Analysis: ประเมินความซับซ้อนของโปรเจกต์ เช่น การใช้ 'Complex SQL JOINs' หรือ 'Microservices Architecture' เพื่อคำนวณเป็น Work Readiness Score ในระดับวิชาชีพ
4. Actionable Feedback: หากผู้สมัครมีทักษะที่ยอดเยี่ยมในจุดใดให้ระบุจุดนั้นเป็นจุดแข็ง และหากมีจุดที่ขาดหายไปเทียบกับมาตรฐานอาชีพเป้าหมาย ให้ระบุไว้ในส่วน 'Missing Skills'

Instructions for Retrieval:
เมื่อพบหลักฐานที่สำคัญ ให้สร้าง Deep Link กลับไปยังไฟล์และหมายเลขบรรทัด (Line Number) นั้นๆ เพื่อให้ HR สามารถกดเข้าไป 'ดูให้เห็นกับตา' ได้ทันที

Return Content: รายการทักษะที่ผ่านการ Verify, ระดับความยากของงานที่ทำได้, และดัชนีความน่าเชื่อถือของผลงาน (Credibility Index)
```

## 5. Prompt สำหรับ Value Proposition

```text
ช่วยร่างเนื้อหาในส่วน Value Proposition สำหรับโครงการ SkillLens AI โดยมีเป้าหมายเพื่อนำเสนอในกิจกรรม Generation Thailand Hackathon กรุณาเขียนโดยเน้นประเด็นดังนี้:

- สำหรับนักศึกษาจบใหม่: เน้นเรื่องการเปลี่ยน 'สิ่งที่เรียน' และ 'โปรเจกต์ที่ทำ' ให้เป็นภาษาที่ตลาดงานเข้าใจ เพื่อเพิ่มความมั่นใจและโอกาสถูกเรียกสัมภาษณ์ แม้จะไม่มีประสบการณ์ตรง
- สำหรับนายจ้าง: เน้นการลดเวลาคัดกรองเรซูเม่ (อ้างอิงสถิติว่าช่วยลดภาระงานได้ถึง 86%) และการค้นหา 'ศักยภาพที่ซ่อนอยู่' ผ่านหลักฐานเชิงประจักษ์แทนการดูแค่ GPA หรือชื่อสถาบัน
- สถิติศูนย์กลาง: นำข้อมูลจากแหล่งอ้างอิงที่ว่า 'HR กว่า 50.6% ตัดสิทธิ์ผู้สมัครเพราะ Skill Gap' และ 'บัณฑิตไทยว่างงานสูงเกือบ 40% ของผู้ว่างงานทั้งหมด' มาสร้างความตระหนักถึงความเร่งด่วนของปัญหา [Problem Understanding, 167]
- Key Message: ใช้แนวคิด 'Proof over Signal' คือการเปลี่ยนจาก 'คำกล่าวอ้าง' ในเรซูเม่ ให้เป็น 'หลักฐานที่ตรวจสอบได้' (Explainable AI)
```

## 6. Prompt สำหรับ Roadmap (Feasibility & Scalability)

```text
ช่วยสร้างแผนการดำเนินงานระยะ 6 เดือน (6-Month Implementation Roadmap) สำหรับโครงการ SkillLens AI เพื่อแสดงถึงความเป็นไปได้ในการปฏิบัติ (Feasibility) และความสามารถในการขยายผล (Scalability) ตามเกณฑ์ Hackathon:

- เดือนที่ 1-2 (Pilot Phase): แผนการร่วมมือกับ Career Center ของมหาวิทยาลัยนำร่อง (เช่น มหาวิทยาลัยขอนแก่น) เพื่อทดสอบระบบกับนักศึกษา 100-200 คน และเก็บข้อมูล Feedback
- เดือนที่ 3-4 (Refinement & Employer Partnering): การนำแนวคิด Vibecoding มาปรับปรุงโมเดล AI ตามคำแนะนำของผู้เชี่ยวชาญ และเริ่มทดลองใช้ระบบคัดกรองเบื้องต้นกับบริษัท SME พาร์ทเนอร์ 5-10 แห่ง
- เดือนที่ 5-6 (Integration & Expansion): แผนการขยายผลสู่ระดับนโยบาย โดยการเชื่อมต่อข้อมูลทักษะเข้ากับระบบคลังหน่วยกิตกลาง (National Credit Bank) หรือแพลตฟอร์มหางานระดับประเทศ
- ตัวชี้วัดความสำเร็จ (KPIs): ระบุ Success Criteria เช่น อัตราการยอมรับจาก HR ไม่ต่ำกว่า 60% และนักศึกษาสร้างพอร์ตโฟลิโอสำเร็จภายใน 10 นาที
```

## 7. Prompt สำหรับ Smart Portfolio

```text
ในฐานะ Senior Career Branding Expert จงใช้ข้อมูลจาก 'Verified Skill Passport' ของผู้สมัคร และ 'Job Description (JD)' ของบริษัทเป้าหมาย เพื่อสร้างเนื้อหา 'Smart Portfolio' (รองรับทั้งภาษาไทยและอังกฤษ) โดยมีข้อกำหนดดังนี้:

1. Selection Logic: เลือกเฉพาะโปรเจกต์และทักษะที่มีค่าความสอดคล้อง (Match Score) สูงสุดกับ JD มานำเสนอเป็นอันดับแรก
2. STAR Method + Evidence: เขียนคำอธิบายผลงานแต่ละชิ้นโดยใช้โครงสร้าง Context, Action, และ Result ที่วัดผลได้จริง (เช่น เพิ่มประสิทธิภาพ 20%, ลดเวลาการทำงาน 5 ชม./สัปดาห์)
3. Explainable Links: ทุกการกล่าวอ้างถึงทักษะ ต้องแนบลิงก์หรือรหัสอ้างอิงไปยังหลักฐานจริง เช่น 'Verified Python Skill (Source: GitHub Commit #123)' หรือ 'Database Design (Source: Senior Project PDF Page 15)'
4. Keyword Alignment: ใช้คำศัพท์ที่ตรงกับมาตรฐาน ESCO และคีย์เวิร์ดสำคัญที่ AI วิเคราะห์พบใน JD เพื่อให้ผ่านระบบการกรอง (ATS Friendly)
5. Output Structure: ประกอบด้วย:
   - Executive Summary: สรุปศักยภาพและความพร้อม (Work Readiness) ใน 3 ประโยค
   - Core Competencies: รายการสมรรถนะหลักพร้อมตราสัญลักษณ์ 'Verified'
   - Evidence-based Projects: รายละเอียดโครงการที่มีการ Highlight เทคโนโลยีที่ใช้จริง (Verified Tech Stack)
6. Tone & Style: ใช้ภาษาระดับมืออาชีพ (Professional & Literary) ตามสไตล์ Modern Enterprise SaaS (Sans-serif, Generous line-height)
```

## 8. Prompt สำหรับ Resume PDF Generation

```text
ช่วยเขียนโค้ดฟังก์ชันสำหรับเจนเนอเรต Resume แบบ PDF ที่มีการจัดโครงสร้างแบบลำดับเวลา (Reverse Chronological) โดยมีฟีเจอร์พิเศษคือ:

- Skill-Evidence Mapping: ในส่วนของ Skills ให้แสดง QR Code หรือ Deep Link ที่เมื่อ HR สแกนแล้วจะเข้าสู่หน้า Public Skill Passport เพื่อดูหลักฐานการทำงานจริงได้ทันที
- Data-Driven Bullets: แปลงคำอธิบายรายวิชาใน Transcript ให้เป็น 'Project-based Achievements' เช่น จากวิชา 'การตลาด 4Ps' เป็น 'Applied 4Ps Marketing Mix to a community enterprise project, increasing potential customer reach by 30%'
- Validation: ตรวจสอบความถูกต้องเชิงตรรกะของข้อมูล (เช่น ช่วงเวลาทำงานไม่ทับซ้อนกัน) ก่อนการ Export
```

## 9. แนะนำการใช้งานกับ Copilot และ AI Development

- ระบุว่าโปรเจกต์ใช้ TypeScript, React, Tailwind CSS และ shadcn/ui
- ย้ำให้รองรับ Responsive Design (Desktop, Tablet, Mobile) และมาตรฐาน WCAG AA
- ใช้ Prompt นี้เป็นพื้นฐานสำหรับการพัฒนา `src/services/ai/*` และ `src/components/*` เมื่อเชื่อมต่อ LLM จริง
- จัดเก็บแบบ prompt templates ใน `docs/AI_PROMPTS.md` เพื่อให้ทีมสามารถคัดลอกและนำไปใช้งานได้ตรงตามโจทย์

## 10. หมายเหตุด้านความปลอดภัยและ PDPA

- โปรเจกต์ Demo ควรใช้ข้อมูลจำลอง (mock data) เพื่อป้องกันข้อมูลส่วนบุคคล
- ระบบต้องไม่เก็บหรือเผยแพร่ข้อมูลส่วนบุคคลโดยไม่แจ้งผู้ใช้
- ในการนำไปใช้งานจริง ให้เพิ่มกระบวนการ consent และ redaction สำหรับข้อมูลที่เป็น PDPA
