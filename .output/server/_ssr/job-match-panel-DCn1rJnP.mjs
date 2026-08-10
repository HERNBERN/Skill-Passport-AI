import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { C as Search, G as Funnel, O as Quote, g as SlidersHorizontal, pt as Briefcase } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/job-match-panel-DCn1rJnP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORT_LABELS = {
	score: "Match score (สูง → ต่ำ)",
	gaps: "Fewest skill gaps",
	evidence: "Most evidence linked"
};
function scoreTone(score) {
	if (score >= 80) return "text-success";
	if (score >= 65) return "text-primary";
	return "text-warning";
}
function JobMatchPanel({ matches, className, title = "Job matching & ranking", onOpenEvidence }) {
	const [query, setQuery] = (0, import_react.useState)("");
	const [sort, setSort] = (0, import_react.useState)("score");
	const [minScore, setMinScore] = (0, import_react.useState)("0");
	const [readyOnly, setReadyOnly] = (0, import_react.useState)(false);
	const [evidenceOnly, setEvidenceOnly] = (0, import_react.useState)(false);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const ranked = (0, import_react.useMemo)(() => {
		const threshold = Number(minScore);
		return [...matches.filter((match) => {
			const haystack = `${match.title} ${match.company ?? ""} ${match.matching.join(" ")}`.toLowerCase();
			if (query && !haystack.includes(query.toLowerCase())) return false;
			if (match.matchScore < threshold) return false;
			if (readyOnly && match.missing.length > 0) return false;
			if (evidenceOnly && match.justifications.length === 0) return false;
			return true;
		})].sort((a, b) => {
			if (sort === "gaps") return a.missing.length - b.missing.length || b.matchScore - a.matchScore;
			if (sort === "evidence") return b.justifications.length - a.justifications.length || b.matchScore - a.matchScore;
			return b.matchScore - a.matchScore;
		});
	}, [
		matches,
		query,
		minScore,
		readyOnly,
		evidenceOnly,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "จัดอันดับตำแหน่งงานจากทักษะที่มีหลักฐานรองรับ ทุกเหตุผลอ้างอิงกลับไปยังต้นฉบับได้"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					className: "gap-1 font-mono text-[11px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "size-3" }),
						ranked.length,
						"/",
						matches.length,
						" roles"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-48 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "ค้นหาตำแหน่ง / ทักษะ…",
							className: "pl-9",
							"aria-label": "Search job matches"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onValueChange: (value) => setSort(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
							className: "w-56",
							"aria-label": "Sort ranking",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(SORT_LABELS).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: key,
							children: SORT_LABELS[key]
						}, key)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: minScore,
						onValueChange: setMinScore,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-40",
							"aria-label": "Minimum match score",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "0",
								children: "Any match score"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "60",
								children: "≥ 60%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "70",
								children: "≥ 70%"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "80",
								children: "≥ 80%"
							})
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: readyOnly ? "default" : "outline",
						className: "min-h-11",
						"aria-pressed": readyOnly,
						onClick: () => setReadyOnly((v) => !v),
						children: "No skill gaps"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: evidenceOnly ? "default" : "outline",
						className: "min-h-11",
						"aria-pressed": evidenceOnly,
						onClick: () => setEvidenceOnly((v) => !v),
						children: "Evidence-linked only"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 space-y-3",
				children: ranked.map((match, index) => {
					const open = openId === match.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "mr-2 font-mono text-xs text-muted-foreground",
											children: ["#", index + 1]
										}), match.title]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-eyebrow mt-0.5",
										children: [match.company, match.location].filter(Boolean).join(" · ") || "Ranked by evidence"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("font-display text-2xl font-semibold", scoreTone(match.matchScore)),
									children: [match.matchScore, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: match.matchScore,
								className: "mt-2 h-1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: match.rationale
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: [match.matching.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: skill
								}, skill)), match.missing.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "outline",
									children: ["ขาด: ", skill]
								}, skill))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "outline",
									className: "min-h-11",
									onClick: () => setOpenId(open ? null : match.id),
									children: open ? "ซ่อนเหตุผลจากหลักฐาน" : `เหตุผลจากหลักฐาน (${match.justifications.length})`
								}), match.missing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "font-mono text-[10px]",
									children: "No gaps"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [
										match.missing.length,
										" gap",
										match.missing.length > 1 ? "s" : ""
									]
								})]
							}),
							open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 space-y-2",
								children: [
									match.justifications.map((item, itemIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "rounded-md border border-border bg-background p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-medium",
														children: item.skill
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-mono text-[10px] text-muted-foreground",
														children: [item.source, item.locator ? ` · ${item.locator}` : ""]
													}),
													item.confidence !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "ml-auto font-mono text-[10px] text-muted-foreground",
														children: [Math.round(item.confidence * 100), "%"]
													}) : null
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
												className: "mt-1.5 border-l-2 border-primary pl-2 text-xs leading-relaxed",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mb-0.5 inline size-3 text-primary" }),
													" ",
													item.quote
												]
											}),
											item.evidence && onOpenEvidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												size: "sm",
												variant: "secondary",
												className: "mt-2 min-h-11",
												onClick: () => onOpenEvidence(item.evidence, item.skill),
												children: "เปิดต้นฉบับพร้อม Highlight"
											}) : null
										]
									}, `${item.skill}-${itemIndex}`)),
									match.justifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
										className: "text-xs text-muted-foreground",
										children: "ยังไม่มีหลักฐานเชื่อมโยงกับตำแหน่งนี้ ระบบจึงไม่ยืนยันการจับคู่"
									}) : null,
									match.advice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "text-xs text-muted-foreground",
										children: ["คำแนะนำ: ", match.advice]
									}) : null
								]
							}) : null
						]
					}, match.id);
				})
			}),
			ranked.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 rounded-lg border border-border bg-surface p-6 text-center text-sm text-muted-foreground",
				children: "ไม่พบตำแหน่งที่ตรงกับตัวกรอง ลองลดเกณฑ์คะแนนหรือปิดตัวกรองบางตัว"
			}) : null
		]
	});
}
//#endregion
export { JobMatchPanel as t };
