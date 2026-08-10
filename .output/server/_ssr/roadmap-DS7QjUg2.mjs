import { s as roadmap } from "./demo-D_HVL5mM.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { B as Hammer, f as Target, gt as BookOpen, nt as Clock, vt as Award } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/roadmap-DS7QjUg2.js
var import_jsx_runtime = require_jsx_runtime();
var difficultyVariant = {
	Beginner: "secondary",
	Intermediate: "outline",
	Advanced: "default"
};
function RoadmapPage() {
	const totalHours = roadmap.reduce((total, week) => total + week.hours, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Learning Roadmap",
		description: `แผนรายสัปดาห์ที่สร้างจากช่องว่างทักษะจริง รวม ${totalHours} ชั่วโมง`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-4",
			children: roadmap.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "panel p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex size-11 shrink-0 items-center justify-center rounded-md bg-primary font-display text-sm font-semibold text-primary-foreground",
						children: ["W", week.week]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-semibold",
									children: week.skill
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: difficultyVariant[week.difficulty],
									children: week.difficulty
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1 font-mono text-[11px] text-muted-foreground",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }),
										week.hours,
										"h"
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									icon: BookOpen,
									label: "Course",
									value: week.course
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									icon: Hammer,
									label: "Project",
									value: week.project
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									icon: Award,
									label: "Certificate",
									value: week.certificate
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									icon: Target,
									label: "Expected outcome",
									value: week.outcome
								})
							]
						})]
					})]
				})
			}, week.week))
		})
	});
}
function Item({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-eyebrow flex items-center gap-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm leading-relaxed",
			children: value
		})]
	});
}
//#endregion
export { RoadmapPage as component };
