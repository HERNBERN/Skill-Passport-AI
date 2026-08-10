import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, s as roadmap } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { S as Send, a as User, ht as Bot } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/assistant-ChNDl30e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTIONS = [
	"Skill TypeScript มาจากไหน",
	"ทำไม Match Score ของ AI Engineer ต่ำ",
	"ควรเรียนอะไรเพิ่ม",
	"ควรทำ Project อะไร"
];
function answer(question) {
	const q = question.toLowerCase();
	const skill = skills.find((item) => q.includes(item.name.toLowerCase().split(" ")[0].toLowerCase()));
	if (skill && (q.includes("มาจาก") || q.includes("where") || q.includes("หลักฐาน") || q.includes("evidence"))) return {
		text: `ทักษะ ${skill.name} สรุปจาก ${skill.evidence.length} หลักฐาน โดยมีค่าความเชื่อมั่นรวม ${Math.round(skill.confidence * 100)}% และสถานะ ${skill.verified ? "Verified" : "Unverified"} — ดูข้อความอ้างอิงด้านล่างได้ทุกรายการ`,
		citations: skill.evidence
	};
	const job = jobRoles.find((role) => q.includes(role.title.toLowerCase().split(" ")[0].toLowerCase()));
	if (job && (q.includes("match") || q.includes("ต่ำ") || q.includes("score") || q.includes("ทำไม"))) {
		const supporting = skills.filter((item) => job.matchingSkills.includes(item.name)).flatMap((item) => item.evidence).slice(0, 3);
		return {
			text: `ตำแหน่ง ${job.title} ได้ ${job.matchScore}% เพราะ ${job.rationale} ทักษะที่ยังขาดคือ ${job.missingSkills.join(", ")} แนวทางพัฒนา: ${job.advice}`,
			citations: supporting
		};
	}
	if (q.includes("เรียน") || q.includes("learn") || q.includes("roadmap")) return {
		text: `แผนสามสัปดาห์แรกคือ ${roadmap.slice(0, 3).map((week) => `W${week.week} ${week.skill} (${week.hours}h)`).join(", ")} ซึ่งมาจากช่องว่างทักษะที่พบในการวิเคราะห์ Job Matching`,
		citations: []
	};
	if (q.includes("project") || q.includes("โปรเจ") || q.includes("ทำ")) return {
		text: `แนะนำโปรเจกต์ตามลำดับ: ${roadmap.slice(0, 3).map((week) => week.project).join(" · ")} — ทุกข้อเลือกจากทักษะที่ตำแหน่งงานเป้าหมายต้องการแต่ยังไม่มีหลักฐานรองรับ`,
		citations: []
	};
	return {
		text: "ยังไม่มีหลักฐานเพียงพอที่จะตอบคำถามนี้ ระบบจะไม่ตอบโดยไม่มี Evidence — ลองถามถึงทักษะ ตำแหน่งงาน หรือแผนการเรียนที่มีอยู่ในหลักฐานที่อัปโหลด",
		citations: []
	};
}
function AssistantPage() {
	const [messages, setMessages] = (0, import_react.useState)([{
		id: "m0",
		role: "assistant",
		text: "สวัสดีครับ ถามได้เลยว่าทักษะไหนมาจากหลักฐานใด ทำไม Match Score เป็นแบบนั้น หรือควรเรียนอะไรต่อ ทุกคำตอบจะอ้างอิงหลักฐานเสมอ",
		citations: []
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const counter = (0, import_react.useRef)(1);
	const send = (text) => {
		const trimmed = text.trim();
		if (!trimmed) return;
		const result = answer(trimmed);
		const id = counter.current++;
		setMessages((prev) => [
			...prev,
			{
				id: `u${id}`,
				role: "user",
				text: trimmed,
				citations: []
			},
			{
				id: `a${id}`,
				role: "assistant",
				text: result.text,
				citations: result.citations
			}
		]);
		setInput("");
	};
	const evidenceTotal = (0, import_react.useMemo)(() => skills.reduce((total, skill) => total + skill.evidence.length, 0), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "AI Assistant",
		description: `ตอบจากหลักฐาน ${evidenceTotal} รายการเท่านั้น — ห้ามตอบโดยไม่มี Evidence`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5",
					children: messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex gap-3", message.role === "user" && "flex-row-reverse"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex size-8 shrink-0 items-center justify-center rounded-md", message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"),
							children: message.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("min-w-0 flex-1 rounded-lg border border-border p-4", message.role === "assistant" ? "bg-card" : "bg-surface"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed",
								children: message.text
							}), message.citations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "Citations"
								}), message.citations.map((citation) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-surface p-3 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: [
											citation.sourceName,
											citation.page ? ` · page ${citation.page}` : "",
											citation.commit ? ` · commit ${citation.commit}` : ""
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 leading-relaxed",
										children: [
											"“",
											citation.quote,
											"”"
										]
									})]
								}, citation.id))]
							}) : null]
						})]
					}, message.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: SUGGESTIONS.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "cursor-pointer px-3 py-1.5 hover:bg-accent",
						onClick: () => send(suggestion),
						children: suggestion
					}, suggestion))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "sticky bottom-4 mt-4 flex gap-2 rounded-lg border border-border bg-card p-2 shadow-soft",
					onSubmit: (event) => {
						event.preventDefault();
						send(input);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: input,
						onChange: (event) => setInput(event.target.value),
						placeholder: "ถามเกี่ยวกับทักษะ หลักฐาน หรือ Match Score…",
						className: "border-0 shadow-none focus-visible:ring-0",
						"aria-label": "Ask the assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						"aria-label": "Send",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-4" })
					})]
				})
			]
		})
	});
}
//#endregion
export { AssistantPage as component };
