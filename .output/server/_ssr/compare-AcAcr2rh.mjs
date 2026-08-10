import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, n as candidates } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { C as Search, O as Quote, bt as ArrowUpDown, l as Trophy } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as EvidenceViewer } from "./evidence-viewer-HC0fT854.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compare-AcAcr2rh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SORT_LABEL = {
	fit: "คะแนนความเหมาะสมกับตำแหน่ง (สูง → ต่ำ)",
	readiness: "ความพร้อมทำงาน (สูง → ต่ำ)",
	evidence: "จำนวนหลักฐานที่ผูกไว้ (มาก → น้อย)",
	gaps: "ช่องว่างทักษะน้อยที่สุด"
};
function locatorText(evidence) {
	return [
		evidence.page ? `หน้า ${evidence.page}` : null,
		evidence.paragraph ? `ย่อหน้า ${evidence.paragraph}` : null,
		evidence.commit ? `commit ${evidence.commit}` : null,
		evidence.filePath ?? null,
		evidence.section ?? null
	].filter(Boolean).join(" · ");
}
function ComparePage() {
	const [roleId, setRoleId] = (0, import_react.useState)(jobRoles[0].id);
	const [sort, setSort] = (0, import_react.useState)("fit");
	const [query, setQuery] = (0, import_react.useState)("");
	const [minReadiness, setMinReadiness] = (0, import_react.useState)("0");
	const [verifiedOnly, setVerifiedOnly] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)([
		"c1",
		"c2",
		"c3"
	]);
	const [viewer, setViewer] = (0, import_react.useState)(null);
	const role = jobRoles.find((item) => item.id === roleId);
	const rows = (0, import_react.useMemo)(() => {
		return candidates.map((candidate) => {
			const matching = role.matchingSkills.filter((skill) => candidate.topSkills.includes(skill));
			const missing = role.matchingSkills.filter((skill) => !candidate.topSkills.includes(skill));
			const justifications = matching.flatMap((skillName) => {
				const skill = skills.find((item) => item.name === skillName);
				const evidence = skill?.evidence[0];
				if (!skill || !evidence) return [];
				return [{
					skillName: skill.name,
					evidence
				}];
			});
			const fit = Math.round(matching.length / Math.max(1, role.matchingSkills.length) * 60 + candidate.workReadiness * .3 + (candidate.verificationStatus === "Verified" ? 10 : 0));
			return {
				candidate,
				matching,
				missing,
				justifications,
				fit: Math.min(100, fit)
			};
		}).filter((row) => {
			if (!selected.includes(row.candidate.id)) return false;
			if (row.candidate.workReadiness < Number(minReadiness)) return false;
			if (verifiedOnly && row.candidate.verificationStatus !== "Verified") return false;
			if (!query.trim()) return true;
			return `${row.candidate.name} ${row.candidate.topSkills.join(" ")} ${row.candidate.githubUser}`.toLowerCase().includes(query.toLowerCase());
		}).sort((a, b) => {
			if (sort === "readiness") return b.candidate.workReadiness - a.candidate.workReadiness;
			if (sort === "evidence") return b.justifications.length - a.justifications.length;
			if (sort === "gaps") return a.missing.length - b.missing.length;
			return b.fit - a.fit;
		});
	}, [
		role,
		selected,
		minReadiness,
		verifiedOnly,
		query,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "เปรียบเทียบผู้สมัคร",
		description: "จัดอันดับผู้สมัครแบบเทียบข้างกันต่อหนึ่งตำแหน่งงาน พร้อมเหตุผลที่เปิดดูหลักฐานต้นฉบับได้ทุกข้อ",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: roleId,
						onValueChange: setRoleId,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-72",
							"aria-label": "เลือกตำแหน่งงานที่ใช้เปรียบเทียบ",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: jobRoles.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value: item.id,
							children: [
								item.title,
								" · ",
								item.company
							]
						}, item.id)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-52 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "ค้นหาชื่อหรือทักษะ…",
							className: "pl-9",
							"aria-label": "ค้นหาผู้สมัคร"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: sort,
						onValueChange: (value) => setSort(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
							className: "w-72",
							"aria-label": "จัดเรียงผลลัพธ์",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(SORT_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: key,
							children: SORT_LABEL[key]
						}, key)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: minReadiness,
						onValueChange: setMinReadiness,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-48",
							"aria-label": "ความพร้อมทำงานขั้นต่ำ",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
							"0",
							"60",
							"70",
							"80"
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value,
							children: [
								"ความพร้อม ≥ ",
								value,
								"%"
							]
						}, value)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: verifiedOnly,
							onCheckedChange: (checked) => setVerifiedOnly(Boolean(checked)),
							"aria-label": "แสดงเฉพาะผู้สมัครที่ยืนยันแล้ว"
						}), "เฉพาะที่ยืนยันแล้ว"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-5 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "เลือกผู้สมัครเพื่อเปรียบเทียบ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-wrap gap-3",
					children: candidates.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: selected.includes(candidate.id),
							"aria-label": `เปรียบเทียบ ${candidate.name}`,
							onCheckedChange: (checked) => setSelected((prev) => checked ? [...prev, candidate.id] : prev.filter((id) => id !== candidate.id))
						}), candidate.name]
					}, candidate.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid gap-4 xl:grid-cols-3",
				children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel flex flex-col p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: index === 0 ? "default" : "outline",
								className: "gap-1",
								children: [
									index === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-3" }) : null,
									"อันดับ ",
									index + 1
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: row.candidate.verificationStatus === "Verified" ? "secondary" : "outline",
								children: row.candidate.verificationStatus === "Verified" ? "ยืนยันแล้ว" : row.candidate.verificationStatus === "Partially Verified" ? "ยืนยันบางส่วน" : "รอตรวจสอบ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-lg font-semibold",
							children: row.candidate.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: row.candidate.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-surface p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-eyebrow",
										children: "ความเหมาะสมกับตำแหน่ง"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "mt-1 font-mono text-xl font-semibold",
										children: [row.fit, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: row.fit,
										className: "mt-2 h-1.5"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-border bg-surface p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-eyebrow",
										children: "ความพร้อมทำงาน"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "mt-1 font-mono text-xl font-semibold",
										children: [row.candidate.workReadiness, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: row.candidate.workReadiness,
										className: "mt-2 h-1.5"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-eyebrow",
									children: [
										"ทักษะที่ตรง (",
										row.matching.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [row.matching.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: skill
									}, skill)), row.matching.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "ไม่มีทักษะที่ตรงกับตำแหน่งนี้"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-eyebrow pt-2",
									children: [
										"ช่องว่างทักษะ (",
										row.missing.length,
										")"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-1.5",
									children: [row.missing.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: skill
									}, skill)), row.missing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-success",
										children: "ครบทุกทักษะที่ตำแหน่งต้องการ"
									}) : null]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "เหตุผลที่อ้างอิงหลักฐาน"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 space-y-2",
								children: [row.justifications.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-md border border-border bg-surface p-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: item.skillName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 flex gap-2 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mt-0.5 size-3 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"“",
												item.evidence.quote,
												"”"
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 font-mono text-[11px] text-muted-foreground",
											children: [
												item.evidence.sourceName,
												" · ",
												locatorText(item.evidence)
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: "outline",
											className: "mt-2 min-h-11",
											onClick: () => setViewer({
												evidence: item.evidence,
												skillName: item.skillName
											}),
											children: "เปิดหลักฐานต้นฉบับ"
										})
									]
								}, `${row.candidate.id}-${item.evidence.id}`)), row.justifications.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-xs text-muted-foreground",
									children: "ยังไม่มีหลักฐานที่ผูกกับทักษะของตำแหน่งนี้ — ควรขอหลักฐานเพิ่มก่อนพิจารณา"
								}) : null]
							})]
						})
					]
				}, row.candidate.id))
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-6 p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "ยังไม่มีผู้สมัครในการเปรียบเทียบ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "เลือกผู้สมัครด้านบน หรือลดเงื่อนไขการกรองลง"
				})]
			}) : null,
			viewer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceViewer, {
				evidence: viewer.evidence,
				skillName: viewer.skillName,
				onClose: () => setViewer(null),
				className: "mt-6"
			}) : null
		]
	});
}
//#endregion
export { ComparePage as component };
