import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { L as Lightbulb, ot as CircleCheck, rt as CircleSlash } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as readPipelineState } from "./pipeline-state-B7tGPMm9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/jobs-DBi-cCRz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function scoreTone(score) {
	if (score >= 80) return "text-success";
	if (score >= 65) return "text-warning";
	return "text-destructive";
}
function JobsPage() {
	const [selected, setSelected] = (0, import_react.useState)(jobRoles[0]);
	const [matches, setMatches] = (0, import_react.useState)(jobRoles);
	(0, import_react.useEffect)(() => {
		const pipeline = readPipelineState();
		if (pipeline?.jobMatches?.length) {
			setMatches(pipeline.jobMatches);
			setSelected(pipeline.jobMatches[0]);
		}
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Job Matching",
		description: "AI วิเคราะห์ Match Score จากทักษะที่มีหลักฐานเท่านั้น พร้อมเหตุผลและแนวทางพัฒนา",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_1.1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: matches.slice().sort((a, b) => b.matchScore - a.matchScore).map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSelected(role),
					className: cn("panel w-full p-4 text-left transition-shadow hover:shadow-raised", selected.id === role.id && "ring-2 ring-ring"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "truncate font-display text-base font-semibold",
								children: role.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-xs text-muted-foreground",
								children: [
									role.company,
									" · ",
									role.location
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("font-display text-2xl font-semibold", scoreTone(role.matchScore)),
							children: role.matchScore
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: role.matchScore,
						className: "mt-3 h-1.5"
					})]
				}, role.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel h-fit p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Match analysis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl font-semibold",
						children: selected.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							selected.company,
							" · ",
							selected.location
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("font-display text-5xl font-semibold", scoreTone(selected.matchScore)),
							children: [selected.matchScore, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted-foreground",
							children: "match score"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }), "Matching skills"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: selected.matchingSkills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: skill
							}, skill))
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleSlash, { className: "size-4 text-destructive" }), "Missing skills"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: selected.missingSkills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								children: skill
							}, skill))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-md border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "เหตุผลในการประเมิน"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted-foreground",
							children: selected.rationale
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-md border border-border bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "flex items-center gap-2 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4 text-primary" }), "แนวทางพัฒนา"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted-foreground",
							children: selected.advice
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "jd",
								className: "text-sm font-medium",
								children: "เทียบกับ Job Description ของคุณเอง"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "jd",
								rows: 4,
								className: "mt-2",
								placeholder: "วางรายละเอียดตำแหน่งงาน…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-3",
								variant: "outline",
								children: "คำนวณ Match Score"
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { JobsPage as component };
