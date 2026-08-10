//#region node_modules/.nitro/vite/services/ssr/assets/demo-D_HVL5mM.js
var DEMO_ACCOUNTS = {
	"candidate.demo@example.com": {
		password: "Demo@1234",
		role: "candidate",
		name: "Nattapong Sirichai"
	},
	"recruiter.demo@example.com": {
		password: "Demo@1234",
		role: "recruiter",
		name: "Pimchanok Areeya"
	},
	"reviewer.demo@example.com": {
		password: "Demo@1234",
		role: "reviewer",
		name: "Dr. Somchai Wattana"
	}
};
var evidenceFiles = [
	{
		id: "f1",
		name: "Nattapong_Resume_2026.pdf",
		kind: "Resume",
		pages: 2,
		sizeKb: 184,
		uploadedAt: "2026-07-14",
		status: "completed",
		extractedSkills: 11,
		pageText: ["NATTAPONG SIRICHAI — Software Engineer\nB.Eng Computer Engineering, Chulalongkorn University (GPA 3.62)\n\nEXPERIENCE\nBackend Engineer Intern, Siam Digital Co., Ltd. (Jun 2025 – Dec 2025)\n• Designed and shipped 14 REST endpoints with Node.js, TypeScript and PostgreSQL serving 40k monthly requests.\n• Introduced Redis caching that reduced p95 latency from 820ms to 190ms.\n• Wrote 120+ Jest integration tests, raising service coverage from 41% to 86%.", "PROJECTS\nSenior Project — SkillGraph: a knowledge-graph recommender built with Python, FastAPI and PostgreSQL (pgvector).\n• Containerised with Docker and deployed to AWS ECS behind an Application Load Balancer.\n• Automated build, test and deploy with GitHub Actions.\n\nSKILLS\nTypeScript, Python, React, Node.js, FastAPI, PostgreSQL, Docker, AWS, Figma\n\nLEADERSHIP\nTeam lead for a 5-person hackathon team; ran daily stand-ups and presented the final pitch to 200 attendees."]
	},
	{
		id: "f2",
		name: "Senior_Project_SkillGraph.pdf",
		kind: "Senior Project",
		pages: 46,
		sizeKb: 3820,
		uploadedAt: "2026-07-14",
		status: "completed",
		extractedSkills: 9,
		pageText: ["Chapter 3 — System Architecture\nThe SkillGraph service is implemented in Python 3.11 using FastAPI. Embeddings are stored in PostgreSQL with the pgvector extension, and retrieval uses approximate nearest-neighbour search with an IVFFlat index tuned to 100 lists.", "Chapter 5 — Evaluation\nWe evaluated the recommender against a 1,200-item benchmark. Precision@5 improved from 0.41 (TF-IDF baseline) to 0.68 with hybrid dense retrieval. Statistical significance was assessed with a paired t-test (p < 0.01)."]
	},
	{
		id: "f3",
		name: "Internship_Report_SiamDigital.docx",
		kind: "Internship Report",
		pages: 18,
		sizeKb: 640,
		uploadedAt: "2026-07-15",
		status: "completed",
		extractedSkills: 7,
		pageText: ["During the six-month internship I owned the notifications service. I containerised it with Docker, wrote the GitHub Actions pipeline, and deployed blue-green releases to AWS ECS with zero downtime across 11 releases."]
	},
	{
		id: "f4",
		name: "AWS_Cloud_Practitioner_Certificate.png",
		kind: "Certificate",
		pages: 1,
		sizeKb: 420,
		uploadedAt: "2026-07-15",
		status: "completed",
		extractedSkills: 2,
		pageText: ["AWS Certified Cloud Practitioner — Nattapong Sirichai. Issued 12 March 2026. Validation number CP-88213-TH."]
	},
	{
		id: "f5",
		name: "Research_Paper_HybridRetrieval.pdf",
		kind: "Research Paper",
		pages: 8,
		sizeKb: 1180,
		uploadedAt: "2026-07-16",
		status: "completed",
		extractedSkills: 4,
		pageText: ["Abstract — We present a hybrid sparse-dense retrieval pipeline for Thai-language technical documents. Our method combines BM25 with multilingual sentence embeddings and a cross-encoder reranker, improving nDCG@10 by 14.2% over the strongest baseline."]
	},
	{
		id: "f6",
		name: "Family_Shop_Order_Log.pdf",
		kind: "Informal work evidence",
		pages: 3,
		sizeKb: 910,
		uploadedAt: "2026-07-18",
		status: "completed",
		extractedSkills: 4,
		pageText: [
			"บันทึกออเดอร์ร้านก๋วยเตี๋ยว (LINE OA + แอปเดลิเวอรี) กรกฎาคม 2568 – สิงหาคม 2569\nตอบข้อความลูกค้าวันละ 30–50 ข้อความ และแก้ปัญหาออเดอร์ผิดพลาดด้วยตัวเองก่อนส่งของ\nดูแลเมนู รูปสินค้า และการตั้งราคาโปรโมชันประจำสัปดาห์",
			"สรุปผล 8 เดือน\nย้ายร้านขึ้นแพลตฟอร์มเดลิเวอรี ทำให้ออเดอร์วันธรรมดาเพิ่มจาก 20 เป็น 55 ออเดอร์\nจัดการสต๊อกวัตถุดิบและติดต่อผู้ส่งของประจำ 3 ราย",
			"ภาพหน้าจอแดชบอร์ดร้าน แสดงจำนวนออเดอร์รายวันย้อนหลัง 14 เดือน"
		]
	},
	{
		id: "f7",
		name: "Volunteer_Coordinator_Letter.pdf",
		kind: "Community evidence",
		pages: 1,
		sizeKb: 220,
		uploadedAt: "2026-07-18",
		status: "completed",
		extractedSkills: 2,
		pageText: ["หนังสือรับรองการปฏิบัติงานอาสาสมัคร (ออกโดยองค์การบริหารส่วนตำบล)\nนางสาวพรทิพย์ แก้วกล้า ปฏิบัติหน้าที่ผู้ประสานงานอาสาสมัครช่วงอุทกภัย\nจัดตารางเวรอาสาสมัคร 22 คน ต่อเนื่อง 5 วันในช่วงน้ำท่วม และประสานงานกับ อบต."]
	},
	{
		id: "f8",
		name: "Course_Completion_Transcript.pdf",
		kind: "Online learning",
		pages: 2,
		sizeKb: 300,
		uploadedAt: "2026-07-19",
		status: "completed",
		extractedSkills: 3,
		pageText: ["Learning transcript — Arthit Pholsawat\nCompleted 6 courses totalling 140 hours between August 2025 and July 2026 while employed full time.\nGoogle IT Support Certificate (completed May 2026); SQL for Data Analysis (completed July 2026).", "Monthly study activity recorded in 11 consecutive months, average 12.7 hours per month."]
	},
	{
		id: "f9",
		name: "Arthit_Work_History.pdf",
		kind: "Employer work history",
		pages: 2,
		sizeKb: 260,
		uploadedAt: "2026-07-19",
		status: "completed",
		extractedSkills: 5,
		pageText: ["Employment record — Front Office Supervisor, 2018–2026\nHandled 40+ guest escalations per week with a 92% first-contact resolution rate.\nRotated between front desk, housekeeping coordination and night audit during staff shortages for 14 months.", "Process improvement\nRebuilt the shift roster process in a spreadsheet, reducing scheduling conflicts by 51% over two quarters.\nSupervised a shift team of 9 staff for four years."]
	},
	{
		id: "f10",
		name: "Supplier_Agreement_Redacted.pdf",
		kind: "Business document",
		pages: 1,
		sizeKb: 180,
		uploadedAt: "2026-07-20",
		status: "completed",
		extractedSkills: 2,
		pageText: ["บันทึกข้อตกลงการจัดซื้อ (ปิดข้อมูลส่วนบุคคล)\nตกลงลดราคาต่อหน่วยลง 12% กับผู้ผลิตในหมู่บ้าน 2 ราย พร้อมเงื่อนไขการส่งมอบรายสัปดาห์"]
	},
	{
		id: "f11",
		name: "TikTok_Content_Archive.pdf",
		kind: "Content evidence",
		pages: 2,
		sizeKb: 740,
		uploadedAt: "2026-07-20",
		status: "completed",
		extractedSkills: 3,
		pageText: ["คลังคอนเทนต์สินค้าหัตถกรรม (ส่งออกจากแพลตฟอร์ม)\nเผยแพร่วิดีโอสินค้า 96 คลิป มี 3 คลิปที่มีผู้ชมเกิน 100,000 ครั้ง", "สรุปยอดขาย: รายได้ต่อเดือนเพิ่มจาก 18,000 บาท เป็น 74,000 บาท ภายใน 8 เดือน"]
	}
];
var skills = [
	{
		id: "s1",
		name: "TypeScript",
		category: "Programming Language",
		confidence: .94,
		level: "Advanced",
		verified: true,
		description: "Production TypeScript across backend services and React front-ends, with typed API contracts and strict compiler settings.",
		evidence: [{
			id: "e1",
			sourceType: "document",
			sourceName: "Nattapong_Resume_2026.pdf",
			page: 1,
			paragraph: 2,
			quote: "Designed and shipped 14 REST endpoints with Node.js, TypeScript and PostgreSQL serving 40k monthly requests.",
			confidence: .95,
			reasoning: "Explicit first-person delivery statement naming TypeScript in a production context with measurable scope (14 endpoints, 40k requests/month)."
		}, {
			id: "e2",
			sourceType: "github",
			sourceName: "github.com/nattapong-dev/skillgraph-api",
			repository: "nattapong-dev/skillgraph-api",
			filePath: "package.json",
			commit: "8f21c7d",
			lineNumber: 24,
			quote: "\"typescript\": \"^5.6.2\", \"tsx\": \"^4.19.1\", \"zod\": \"^3.23.8\"",
			confidence: .92,
			reasoning: "Dependency manifest confirms TypeScript is the primary build toolchain, not an incidental mention."
		}]
	},
	{
		id: "s2",
		name: "Python",
		category: "Programming Language",
		confidence: .9,
		level: "Proficient",
		verified: true,
		description: "Python used for the senior project service layer, data pipelines and research experiments.",
		evidence: [{
			id: "e3",
			sourceType: "document",
			sourceName: "Senior_Project_SkillGraph.pdf",
			page: 1,
			paragraph: 1,
			quote: "The SkillGraph service is implemented in Python 3.11 using FastAPI.",
			confidence: .93,
			reasoning: "Architecture chapter states the implementation language and version directly."
		}]
	},
	{
		id: "s3",
		name: "React",
		category: "Framework",
		confidence: .86,
		level: "Proficient",
		verified: true,
		description: "Component-driven React front-ends with typed props and data-fetching layers.",
		evidence: [{
			id: "e4",
			sourceType: "github",
			sourceName: "github.com/nattapong-dev/portfolio-web",
			repository: "nattapong-dev/portfolio-web",
			filePath: "src/App.tsx",
			commit: "a13be40",
			lineNumber: 1,
			quote: "import { useMemo, useState } from \"react\";",
			confidence: .88,
			reasoning: "Repository source imports React hooks; 214 commits over 9 months indicate sustained rather than one-off usage."
		}, {
			id: "e5",
			sourceType: "portfolio",
			sourceName: "nattapong.dev",
			url: "https://nattapong.dev/projects",
			section: "Projects → SkillGraph Dashboard",
			quote: "SkillGraph Dashboard — React + Vite front-end visualising 4,000 skill nodes with virtualised rendering.",
			confidence: .81,
			reasoning: "Self-published portfolio claim corroborated by the matching public repository; confidence discounted because portfolio text is unverified prose."
		}]
	},
	{
		id: "s4",
		name: "PostgreSQL",
		category: "Database",
		confidence: .89,
		level: "Proficient",
		verified: true,
		description: "Relational schema design, indexing strategy and pgvector similarity search.",
		evidence: [{
			id: "e6",
			sourceType: "document",
			sourceName: "Senior_Project_SkillGraph.pdf",
			page: 1,
			paragraph: 1,
			quote: "Embeddings are stored in PostgreSQL with the pgvector extension, and retrieval uses approximate nearest-neighbour search with an IVFFlat index tuned to 100 lists.",
			confidence: .91,
			reasoning: "Names a specific extension and index type — detail beyond generic familiarity."
		}]
	},
	{
		id: "s5",
		name: "Docker",
		category: "DevOps",
		confidence: .84,
		level: "Working",
		verified: true,
		description: "Containerised services and multi-stage build images.",
		evidence: [{
			id: "e7",
			sourceType: "document",
			sourceName: "Internship_Report_SiamDigital.docx",
			page: 1,
			paragraph: 1,
			quote: "I containerised it with Docker, wrote the GitHub Actions pipeline, and deployed blue-green releases to AWS ECS with zero downtime across 11 releases.",
			confidence: .86,
			reasoning: "Supervised internship report describing repeated production releases owned by the candidate."
		}, {
			id: "e8",
			sourceType: "github",
			sourceName: "github.com/nattapong-dev/skillgraph-api",
			repository: "nattapong-dev/skillgraph-api",
			filePath: "Dockerfile",
			commit: "3c99a11",
			lineNumber: 1,
			quote: "FROM python:3.11-slim AS builder",
			confidence: .83,
			reasoning: "Multi-stage Dockerfile present in the repository root confirms hands-on authorship."
		}]
	},
	{
		id: "s6",
		name: "CI/CD (GitHub Actions)",
		category: "DevOps",
		confidence: .79,
		level: "Working",
		verified: true,
		description: "Automated build, test and deployment workflows.",
		evidence: [{
			id: "e9",
			sourceType: "github",
			sourceName: "github.com/nattapong-dev/skillgraph-api",
			repository: "nattapong-dev/skillgraph-api",
			filePath: ".github/workflows/deploy.yml",
			commit: "3c99a11",
			lineNumber: 12,
			quote: "jobs:\n  test:\n    runs-on: ubuntu-latest",
			confidence: .8,
			reasoning: "Workflow file authored by the candidate with test and deploy jobs wired to the main branch."
		}]
	},
	{
		id: "s7",
		name: "AWS",
		category: "Cloud",
		confidence: .76,
		level: "Working",
		verified: true,
		description: "ECS deployments, load balancing and certified fundamentals.",
		evidence: [{
			id: "e10",
			sourceType: "document",
			sourceName: "AWS_Cloud_Practitioner_Certificate.png",
			page: 1,
			quote: "AWS Certified Cloud Practitioner — Nattapong Sirichai. Issued 12 March 2026. Validation number CP-88213-TH.",
			confidence: .78,
			reasoning: "OCR of a certificate image with a validation number; foundational-level certification so the inferred depth is capped at Working."
		}]
	},
	{
		id: "s8",
		name: "Applied Research & Evaluation",
		category: "Research",
		confidence: .82,
		level: "Proficient",
		verified: true,
		description: "Designs benchmarks, reports metrics and applies statistical significance testing.",
		evidence: [{
			id: "e11",
			sourceType: "document",
			sourceName: "Research_Paper_HybridRetrieval.pdf",
			page: 1,
			paragraph: 1,
			quote: "Our method combines BM25 with multilingual sentence embeddings and a cross-encoder reranker, improving nDCG@10 by 14.2% over the strongest baseline.",
			confidence: .85,
			reasoning: "Peer-review-style abstract with a named metric and quantified improvement over a baseline."
		}, {
			id: "e12",
			sourceType: "document",
			sourceName: "Senior_Project_SkillGraph.pdf",
			page: 2,
			paragraph: 1,
			quote: "Precision@5 improved from 0.41 (TF-IDF baseline) to 0.68 with hybrid dense retrieval. Statistical significance was assessed with a paired t-test (p < 0.01).",
			confidence: .8,
			reasoning: "Evaluation chapter demonstrates correct use of a significance test alongside the headline metric."
		}]
	},
	{
		id: "s9",
		name: "Team Leadership",
		category: "Soft Skill",
		confidence: .68,
		level: "Working",
		verified: false,
		description: "Led a small cross-functional team and presented to a large audience.",
		evidence: [{
			id: "e13",
			sourceType: "document",
			sourceName: "Nattapong_Resume_2026.pdf",
			page: 2,
			paragraph: 3,
			quote: "Team lead for a 5-person hackathon team; ran daily stand-ups and presented the final pitch to 200 attendees.",
			confidence: .68,
			reasoning: "Self-reported leadership with no third-party confirmation, so this skill stays unverified pending reviewer sign-off."
		}]
	},
	{
		id: "s10",
		name: "UI Design (Figma)",
		category: "Design",
		confidence: .61,
		level: "Foundational",
		verified: false,
		description: "Wireframes and component specs produced for personal and academic projects.",
		evidence: [{
			id: "e14",
			sourceType: "portfolio",
			sourceName: "nattapong.dev",
			url: "https://nattapong.dev/design",
			section: "Design → SkillGraph wireframes",
			quote: "Wireframed the dashboard in Figma across 12 frames before implementation.",
			confidence: .61,
			reasoning: "Only a portfolio claim with no file artefact or reviewer confirmation; confidence deliberately low."
		}]
	},
	{
		id: "s11",
		name: "Customer Service",
		category: "Transferable Skill",
		confidence: .84,
		level: "Proficient",
		verified: false,
		transferable: true,
		informalSource: "Family business — online order handling",
		description: "Handles customer conversations, complaints and order problems end to end, evidenced from informal family-business work.",
		evidence: [{
			id: "e15",
			sourceType: "commerce",
			sourceName: "Family_Shop_Order_Log.pdf",
			page: 1,
			paragraph: 1,
			quote: "ตอบข้อความลูกค้าวันละ 30–50 ข้อความ และแก้ปัญหาออเดอร์ผิดพลาดด้วยตัวเองก่อนส่งของ",
			confidence: .84,
			reasoning: "Order log screenshots show 14 months of continuous daily customer messaging with the candidate as the responding account; volume and duration make this a sustained work pattern, not an anecdote."
		}]
	},
	{
		id: "s12",
		name: "Entrepreneurial Mindset",
		category: "Transferable Skill",
		confidence: .79,
		level: "Working",
		verified: false,
		transferable: true,
		informalSource: "Online selling — delivery platform expansion",
		description: "Identifies a commercial opportunity, tests it and measures the result without formal business training.",
		evidence: [{
			id: "e16",
			sourceType: "commerce",
			sourceName: "Family_Shop_Order_Log.pdf",
			page: 2,
			paragraph: 1,
			quote: "ย้ายร้านขึ้นแพลตฟอร์มเดลิเวอรี ทำให้ออเดอร์วันธรรมดาเพิ่มจาก 20 เป็น 55 ออเดอร์",
			confidence: .79,
			reasoning: "A before/after figure the candidate can point to in the platform export. The claim is quantified and re-checkable, so confidence is moderate-high despite the informal source."
		}]
	},
	{
		id: "s13",
		name: "Project Management",
		category: "Transferable Skill",
		confidence: .72,
		level: "Working",
		verified: false,
		transferable: true,
		informalSource: "Volunteering — flood relief coordination",
		description: "Plans schedules, assigns people and tracks delivery under time pressure, evidenced from community volunteer work.",
		evidence: [{
			id: "e17",
			sourceType: "community",
			sourceName: "Volunteer_Coordinator_Letter.pdf",
			page: 1,
			paragraph: 2,
			quote: "จัดตารางเวรอาสาสมัคร 22 คน ต่อเนื่อง 5 วันในช่วงน้ำท่วม และประสานงานกับ อบต.",
			confidence: .72,
			reasoning: "Signed by the sub-district office, which makes this third-party confirmed rather than self-reported. Scope (22 people, 5 days) supports a Working rather than Proficient level."
		}]
	},
	{
		id: "s14",
		name: "Negotiation",
		category: "Transferable Skill",
		confidence: .8,
		level: "Proficient",
		verified: false,
		transferable: true,
		informalSource: "Micro-business — supplier agreements",
		description: "Prepares a position, negotiates terms and reaches agreements that hold over time.",
		evidence: [{
			id: "e18",
			sourceType: "commerce",
			sourceName: "Supplier_Agreement_Redacted.pdf",
			page: 1,
			paragraph: 1,
			quote: "ตกลงลดราคาต่อหน่วยลง 12% กับผู้ผลิตในหมู่บ้าน 2 ราย พร้อมเงื่อนไขการส่งมอบรายสัปดาห์",
			confidence: .8,
			reasoning: "A signed commercial document naming the negotiated outcome and terms; document authorship is attributable to the candidate."
		}]
	},
	{
		id: "s15",
		name: "Self Learning",
		category: "Transferable Skill",
		confidence: .86,
		level: "Proficient",
		verified: true,
		transferable: true,
		informalSource: "Self-directed online study while working full time",
		description: "Sets a learning goal, sustains it over months and applies it in a delivered artefact.",
		evidence: [{
			id: "e19",
			sourceType: "experience",
			sourceName: "Course_Completion_Transcript.pdf",
			page: 1,
			paragraph: 1,
			quote: "Completed 6 courses totalling 140 hours between August 2025 and July 2026 while employed full time.",
			confidence: .86,
			reasoning: "Transcript carries dated completions across 11 consecutive months — consistency, not a single burst, and independently checkable with the provider."
		}]
	},
	{
		id: "s16",
		name: "Digital Literacy",
		category: "Transferable Skill",
		confidence: .77,
		level: "Working",
		verified: false,
		transferable: true,
		informalSource: "Content creation and marketplace operations",
		description: "Operates commerce, content and messaging platforms competently and keeps digital records.",
		evidence: [{
			id: "e20",
			sourceType: "commerce",
			sourceName: "TikTok_Content_Archive.pdf",
			page: 1,
			paragraph: 1,
			quote: "เผยแพร่วิดีโอสินค้า 96 คลิป มี 3 คลิปที่มีผู้ชมเกิน 100,000 ครั้ง",
			confidence: .77,
			reasoning: "Public post archive with view counts; the platform data is verifiable, though audience metrics measure reach rather than tool mastery, so the level stays at Working."
		}]
	},
	{
		id: "s17",
		name: "Adaptability",
		category: "Transferable Skill",
		confidence: .7,
		level: "Working",
		verified: false,
		transferable: true,
		informalSource: "Part-time service work across shifting roles",
		description: "Maintains output when priorities, tools or roles change at short notice.",
		evidence: [{
			id: "e21",
			sourceType: "experience",
			sourceName: "Arthit_Work_History.pdf",
			page: 1,
			paragraph: 3,
			quote: "Rotated between front desk, housekeeping coordination and night audit during staff shortages for 14 months.",
			confidence: .7,
			reasoning: "Role rotation named with a duration in an employer-issued work history. Self-description of the behaviour is absent, so confidence is capped below 0.75."
		}]
	},
	{
		id: "s18",
		name: "Problem Solving",
		category: "Transferable Skill",
		confidence: .82,
		level: "Proficient",
		verified: true,
		transferable: true,
		informalSource: "Operational process redesign",
		description: "Diagnoses a recurring operational failure and ships a durable fix with measured results.",
		evidence: [{
			id: "e22",
			sourceType: "experience",
			sourceName: "Arthit_Work_History.pdf",
			page: 2,
			paragraph: 1,
			quote: "Rebuilt the shift roster process in a spreadsheet, reducing scheduling conflicts by 51% over two quarters.",
			confidence: .82,
			reasoning: "States the problem, the intervention and a quantified outcome over a defined period — the strongest available pattern for a soft-skill claim."
		}]
	}
];
var jobRoles = [
	{
		id: "j1",
		title: "Backend Developer",
		company: "Siam Digital",
		location: "Bangkok (Hybrid)",
		matchScore: 88,
		matchingSkills: [
			"TypeScript",
			"Python",
			"PostgreSQL",
			"Docker",
			"AWS"
		],
		missingSkills: ["Kafka", "gRPC"],
		rationale: "Verified backend delivery evidence across an internship and a senior project covers the core stack requirements.",
		advice: "Add a message-driven project using Kafka or RabbitMQ to close the event-streaming gap."
	},
	{
		id: "j2",
		title: "Full Stack Developer",
		company: "Loft Labs",
		location: "Remote",
		matchScore: 82,
		matchingSkills: [
			"TypeScript",
			"React",
			"PostgreSQL",
			"CI/CD (GitHub Actions)"
		],
		missingSkills: ["Next.js", "End-to-end testing"],
		rationale: "Strong evidence on both API and UI sides; front-end evidence is thinner than backend evidence.",
		advice: "Ship one SSR app and add Playwright coverage to a public repo."
	},
	{
		id: "j3",
		title: "AI Engineer",
		company: "Bangkok AI Lab",
		location: "Bangkok (On-site)",
		matchScore: 74,
		matchingSkills: [
			"Python",
			"Applied Research & Evaluation",
			"PostgreSQL"
		],
		missingSkills: [
			"PyTorch",
			"Model serving",
			"MLOps"
		],
		rationale: "Retrieval research and pgvector work map well to applied AI, but there is no evidence of model training or serving.",
		advice: "Fine-tune and serve one small model end-to-end with documented metrics."
	},
	{
		id: "j4",
		title: "Frontend Developer",
		company: "Chiang Mai Studio",
		location: "Remote",
		matchScore: 69,
		matchingSkills: ["React", "TypeScript"],
		missingSkills: [
			"Accessibility testing",
			"Design systems",
			"Animation"
		],
		rationale: "React evidence exists but is mostly personal projects; no accessibility or design-system artefacts were found.",
		advice: "Publish a documented component library with WCAG AA audit notes."
	},
	{
		id: "j5",
		title: "Software Engineer",
		company: "Thai Fintech Group",
		location: "Bangkok (Hybrid)",
		matchScore: 85,
		matchingSkills: [
			"TypeScript",
			"Python",
			"Docker",
			"PostgreSQL",
			"AWS"
		],
		missingSkills: ["System design at scale"],
		rationale: "Broad, well-evidenced generalist profile with measurable performance work.",
		advice: "Document one system-design case study with capacity estimates."
	},
	{
		id: "j6",
		title: "Data Analyst",
		company: "Retail Insight Co.",
		location: "Bangkok",
		matchScore: 58,
		matchingSkills: [
			"Python",
			"PostgreSQL",
			"Applied Research & Evaluation"
		],
		missingSkills: [
			"SQL analytics depth",
			"BI tooling",
			"Statistics coursework"
		],
		rationale: "Analytical foundations are present, but no dashboarding or business-analytics evidence was uploaded.",
		advice: "Build a public dashboard on an open dataset and document the metric definitions."
	},
	{
		id: "j7",
		title: "UX/UI Designer",
		company: "Studio Nordic",
		location: "Remote",
		matchScore: 41,
		matchingSkills: ["UI Design (Figma)"],
		missingSkills: [
			"User research",
			"Prototyping",
			"Design critique portfolio"
		],
		rationale: "Only one low-confidence, unverified design signal exists in the evidence set.",
		advice: "Upload case studies showing research, iteration and outcomes."
	}
];
var roadmap = [
	{
		week: 1,
		skill: "Event-driven architecture",
		course: "Kafka Fundamentals for Backend Engineers",
		project: "Add an order-events consumer to skillgraph-api",
		certificate: "Confluent Fundamentals Accreditation",
		hours: 8,
		difficulty: "Intermediate",
		outcome: "Explain partitions, consumer groups and delivery guarantees."
	},
	{
		week: 2,
		skill: "gRPC & service contracts",
		course: "Designing Service APIs with Protocol Buffers",
		project: "Expose one internal endpoint over gRPC alongside REST",
		certificate: "—",
		hours: 6,
		difficulty: "Intermediate",
		outcome: "A running gRPC service with a versioned .proto contract."
	},
	{
		week: 3,
		skill: "System design",
		course: "Scalability Patterns & Capacity Planning",
		project: "Write a design doc for a 1M-user notification system",
		certificate: "—",
		hours: 7,
		difficulty: "Advanced",
		outcome: "A reviewed design doc with capacity estimates and trade-offs."
	},
	{
		week: 4,
		skill: "Testing depth",
		course: "End-to-End Testing with Playwright",
		project: "Add E2E coverage to portfolio-web CI",
		certificate: "—",
		hours: 5,
		difficulty: "Beginner",
		outcome: "Green E2E suite gating merges in GitHub Actions."
	},
	{
		week: 5,
		skill: "Model serving",
		course: "Serving ML Models with FastAPI and ONNX",
		project: "Serve the reranker from the research paper as an API",
		certificate: "—",
		hours: 9,
		difficulty: "Advanced",
		outcome: "A benchmarked inference endpoint with latency budget."
	},
	{
		week: 6,
		skill: "Accessibility",
		course: "WCAG AA for Product Engineers",
		project: "Audit and fix the portfolio site to AA",
		certificate: "IAAP WAS (prep)",
		hours: 5,
		difficulty: "Beginner",
		outcome: "Documented AA audit with before/after findings."
	}
];
var candidates = [
	{
		id: "c1",
		name: "Nattapong Sirichai",
		headline: "Backend-leaning software engineer",
		university: "Chulalongkorn University",
		email: "candidate.demo@example.com",
		passportNumber: "SL-2026-TH-004821",
		verificationStatus: "Verified",
		workReadiness: 84,
		experienceYears: 1,
		githubUser: "nattapong-dev",
		topSkills: [
			"TypeScript",
			"Python",
			"PostgreSQL",
			"Docker",
			"AWS"
		]
	},
	{
		id: "c2",
		name: "Kanya Ratanaporn",
		headline: "Front-end engineer & design-system maintainer",
		university: "Mahidol University",
		email: "kanya@example.com",
		passportNumber: "SL-2026-TH-004822",
		verificationStatus: "Verified",
		workReadiness: 79,
		experienceYears: 2,
		githubUser: "kanya-r",
		topSkills: [
			"React",
			"TypeScript",
			"UI Design (Figma)",
			"Accessibility"
		]
	},
	{
		id: "c3",
		name: "Thanakrit Boonmee",
		headline: "Applied ML engineer",
		university: "KMUTT",
		email: "thanakrit@example.com",
		passportNumber: "SL-2026-TH-004823",
		verificationStatus: "Partially Verified",
		workReadiness: 71,
		experienceYears: 1,
		githubUser: "thanakrit-ml",
		topSkills: [
			"Python",
			"PyTorch",
			"Applied Research & Evaluation",
			"AWS"
		]
	},
	{
		id: "c4",
		name: "Siriporn Chaiyaphum",
		headline: "Cloud & platform engineer",
		university: "Chiang Mai University",
		email: "siriporn@example.com",
		passportNumber: "SL-2026-TH-004824",
		verificationStatus: "Pending Review",
		workReadiness: 66,
		experienceYears: 2,
		githubUser: "siriporn-ops",
		topSkills: [
			"Docker",
			"AWS",
			"CI/CD (GitHub Actions)",
			"PostgreSQL"
		]
	}
];
var githubRepos = [
	{
		name: "nattapong-dev/skillgraph-api",
		stars: 42,
		commits: 318,
		contributors: 3,
		topics: [
			"fastapi",
			"pgvector",
			"docker"
		],
		languages: {
			Python: 71,
			Dockerfile: 12,
			SQL: 10,
			YAML: 7
		}
	},
	{
		name: "nattapong-dev/portfolio-web",
		stars: 11,
		commits: 214,
		contributors: 1,
		topics: [
			"react",
			"vite",
			"typescript"
		],
		languages: {
			TypeScript: 82,
			CSS: 12,
			HTML: 6
		}
	},
	{
		name: "nattapong-dev/notify-service",
		stars: 5,
		commits: 96,
		contributors: 2,
		topics: [
			"node",
			"queue",
			"aws"
		],
		languages: {
			TypeScript: 88,
			Shell: 7,
			Dockerfile: 5
		}
	}
];
var pipelineStages = [
	"Uploading",
	"OCR",
	"Extract Text",
	"Chunking",
	"Embedding",
	"Skill Extraction",
	"Evidence Linking",
	"Reasoning",
	"Confidence",
	"Standard Mapping",
	"Generate Passport",
	"Completed"
];
//#endregion
export { jobRoles as a, skills as c, githubRepos as i, candidates as n, pipelineStages as o, evidenceFiles as r, roadmap as s, DEMO_ACCOUNTS as t };
