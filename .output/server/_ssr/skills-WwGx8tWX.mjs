import { i as __toESM } from "../_runtime.mjs";
import { c as skills } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { C as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as EvidenceViewer } from "./evidence-viewer-HC0fT854.mjs";
import { i as SkillCard, r as EvidencePanel } from "./skill-evidence-DItBqdZ7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skills-WwGx8tWX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = ["All", ...new Set(skills.map((s) => s.category))];
function SkillsPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [activeSkill, setActiveSkill] = (0, import_react.useState)(null);
	const [panelOpen, setPanelOpen] = (0, import_react.useState)(false);
	const [viewerEvidence, setViewerEvidence] = (0, import_react.useState)(null);
	const filtered = (0, import_react.useMemo)(() => skills.filter((skill) => (category === "All" || skill.category === category) && (skill.name.toLowerCase().includes(query.toLowerCase()) || skill.description.toLowerCase().includes(query.toLowerCase()))), [query, category]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Skills & Evidence Explorer",
		description: "ทุก Skill Card มีปุ่มดูหลักฐาน เปิด Side Panel พร้อมไฟล์ หน้า ย่อหน้า ข้อความอ้างอิง และเหตุผลของ AI",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-56 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "ค้นหาทักษะ…",
							className: "pl-9",
							"aria-label": "Search skills"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: category,
						onValueChange: setCategory,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-56",
							"aria-label": "Filter by category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CATEGORIES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: item,
							children: item
						}, item)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						children: [filtered.length, " skills"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4 lg:grid-cols-2 2xl:grid-cols-3",
				children: filtered.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCard, {
					skill,
					onOpenEvidence: (next) => {
						setActiveSkill(next);
						setPanelOpen(true);
					}
				}, skill.id))
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-6 p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "ไม่พบทักษะที่ค้นหา"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "ลองปรับคำค้นหรือเลือกหมวดหมู่อื่น"
				})]
			}) : null,
			viewerEvidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceViewer, {
				evidence: viewerEvidence,
				skillName: activeSkill?.name,
				onClose: () => setViewerEvidence(null),
				className: "mt-8"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidencePanel, {
				skill: activeSkill,
				open: panelOpen,
				onOpenChange: setPanelOpen,
				onOpenSource: (evidence) => {
					setViewerEvidence(evidence);
					setPanelOpen(false);
					window.setTimeout(() => window.scrollTo({
						top: document.body.scrollHeight,
						behavior: "smooth"
					}), 80);
				}
			})
		]
	});
}
//#endregion
export { SkillsPage as component };
