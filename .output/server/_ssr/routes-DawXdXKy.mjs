import { t as DEMO_ACCOUNTS } from "./demo-D_HVL5mM.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ScanText, U as Github, Y as FileSearch, _t as BadgeCheck, k as QrCode, mt as Boxes, xt as ArrowRight, y as ShieldCheck } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DawXdXKy.js
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	{
		icon: ScanText,
		title: "Smart Upload & OCR",
		body: "PDF, DOCX, PPTX, PNG, JPG, TXT, GitHub URLs and portfolio links flow through a transparent seven-stage pipeline."
	},
	{
		icon: FileSearch,
		title: "Evidence Explorer",
		body: "Every skill card opens a side panel with file name, page, paragraph, quoted text, confidence and AI reasoning."
	},
	{
		icon: Github,
		title: "GitHub Analyzer",
		body: "Languages, manifests, Dockerfiles, workflows and commit history become skills with line-level citations."
	},
	{
		icon: BadgeCheck,
		title: "Digital Skill Passport",
		body: "Passport number, QR code, verification status, work readiness and digital signature — exportable and shareable."
	},
	{
		icon: Boxes,
		title: "Job Matching & Roadmap",
		body: "Match scores explain themselves: matching skills, missing skills, rationale and a weekly learning plan."
	},
	{
		icon: ShieldCheck,
		title: "Reviewer Verification",
		body: "Faculty and assessors confirm evidence and issue digital verification, so unverified claims stay labelled."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex max-w-6xl items-center justify-between px-6 py-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base font-semibold",
						children: "SkillLens AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						children: "Enter demo"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-3xl px-6 pb-16 pt-10 text-center sm:pt-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "mb-6",
						children: "Explainable AI · Evidence-linked · Skills-based hiring"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-balance font-display text-4xl font-bold sm:text-6xl",
						children: "หลักฐานการเรียนรู้ กลายเป็น Skill Passport ที่ตรวจสอบย้อนกลับได้"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg",
						children: "Resume, GPA และวุฒิการศึกษาไม่ได้สะท้อนทักษะจริง SkillLens AI สกัดทักษะจากเอกสาร GitHub และ Portfolio โดยทุกทักษะต้องมีหลักฐานอ้างอิงเสมอ — ไม่มีการคาดเดา"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								children: ["ทดลองใช้ระบบตัวอย่าง", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/p/$passportNumber",
								params: { passportNumber: "SL-2026-TH-004821" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "size-4" }), "ดู Public Passport"]
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-6 pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: PILLARS.map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillar.icon, { className: "size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 font-display text-lg font-semibold",
								children: pillar.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: pillar.body
							})
						]
					}, pillar.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-6 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "บัญชีทดลอง / Demo accounts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "ทุกบัญชีมีข้อมูลจำลองครบทุกส่วนพร้อมใช้งานทันที โดยไม่ต้องอัปโหลดไฟล์เอง"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-3",
							children: Object.entries(DEMO_ACCOUNTS).map(([email, account]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-surface p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "capitalize",
										children: account.role
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-mono text-xs break-all",
										children: email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-xs text-muted-foreground",
										children: account.password
									})
								]
							}, email))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-6 py-8 text-center text-xs text-muted-foreground",
				children: "SkillLens AI — AI Skill Passport Platform. Demo data only; no real candidate records."
			})
		]
	});
}
//#endregion
export { Landing as component };
