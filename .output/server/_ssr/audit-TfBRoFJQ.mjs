import { i as __toESM } from "../_runtime.mjs";
import { c as skills, r as evidenceFiles } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { $ as Download, C as Search, D as RefreshCcw, I as Link2, K as FileUp, _t as BadgeCheck, h as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { a as explainPipeline } from "./impact-D6vK68Lq.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/audit-TfBRoFJQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUDIT_KIND_LABEL = {
	upload: "อัปโหลดหลักฐาน",
	extraction: "ขั้นตอนสกัดข้อมูลด้วย AI",
	citation: "การอ้างอิงทักษะ ↔ หลักฐาน",
	verification: "การตรวจสอบโดยผู้เชี่ยวชาญ",
	reevaluation: "คำขอประเมินใหม่"
};
function hashOf(seed) {
	let value = 2166136261;
	for (let index = 0; index < seed.length; index += 1) {
		value ^= seed.charCodeAt(index);
		value = Math.imul(value, 16777619) >>> 0;
	}
	return `0x${value.toString(16).padStart(8, "0")}`;
}
function stamp(day, minutes) {
	const base = new Date(Date.UTC(2026, 6, 14, 2, 0, 0));
	base.setUTCDate(base.getUTCDate() + day);
	base.setUTCMinutes(base.getUTCMinutes() + minutes);
	return base.toISOString();
}
function buildLog() {
	const entries = [];
	let clock = 0;
	evidenceFiles.forEach((file, fileIndex) => {
		entries.push({
			id: `au-up-${file.id}`,
			at: stamp(fileIndex, clock += 7),
			kind: "upload",
			actor: "ผู้สมัคร (เจ้าของพาสปอร์ต)",
			title: `อัปโหลด ${file.name}`,
			detail: `ประเภท ${file.kind} · ${file.pages} หน้า · ${file.sizeKb} KB — บันทึกไฟล์ต้นฉบับไว้ทั้งฉบับเพื่อการตรวจย้อนกลับ`,
			refs: [{
				label: "ไฟล์",
				value: file.name
			}, {
				label: "จำนวนทักษะที่สกัดได้",
				value: `${file.extractedSkills}`
			}],
			hash: hashOf(`upload:${file.id}`)
		});
		explainPipeline.forEach((stage, stageIndex) => {
			entries.push({
				id: `au-ex-${file.id}-${stage.id}`,
				at: stamp(fileIndex, clock += 2 + stageIndex),
				kind: "extraction",
				actor: "SkillLens AI Pipeline v2.4",
				title: `${stage.label} — ${file.name}`,
				detail: stage.note,
				refs: [{
					label: "ขั้นตอน",
					value: `${stageIndex + 1}/${explainPipeline.length}`
				}, {
					label: "อินพุต",
					value: file.name
				}],
				hash: hashOf(`stage:${file.id}:${stage.id}`)
			});
		});
	});
	skills.forEach((skill, skillIndex) => {
		skill.evidence.forEach((evidence, evidenceIndex) => {
			const locator = [
				evidence.page ? `หน้า ${evidence.page}` : null,
				evidence.paragraph ? `ย่อหน้า ${evidence.paragraph}` : null,
				evidence.commit ? `commit ${evidence.commit}` : null,
				evidence.filePath ?? null,
				evidence.section ?? null
			].filter(Boolean).join(" · ");
			entries.push({
				id: `au-ci-${skill.id}-${evidence.id}`,
				at: stamp(2 + skillIndex % 4, clock += 3 + evidenceIndex),
				kind: "citation",
				actor: "SkillLens AI Pipeline v2.4",
				title: `ผูกทักษะ “${skill.name}” กับหลักฐาน`,
				detail: `ข้อความที่อ้างอิง: “${evidence.quote}” — เหตุผล: ${evidence.reasoning}`,
				refs: [
					{
						label: "แหล่งที่มา",
						value: evidence.sourceName
					},
					...locator ? [{
						label: "ตำแหน่ง",
						value: locator
					}] : [],
					{
						label: "ความเชื่อมั่น",
						value: `${Math.round(evidence.confidence * 100)}%`
					}
				],
				hash: hashOf(`cite:${skill.id}:${evidence.id}`)
			});
		});
	});
	entries.push({
		id: "au-vr-1",
		at: stamp(5, 40),
		kind: "verification",
		actor: "ดร. สมชาย วัฒนา (ผู้ตรวจสอบ)",
		title: "อนุมัติทักษะ TypeScript, PostgreSQL, Docker",
		detail: "ตรวจสอบหลักฐานต้นฉบับและ commit จริงบน GitHub แล้วยืนยันระดับทักษะตามที่ AI เสนอ",
		refs: [{
			label: "ผลการตรวจ",
			value: "อนุมัติ 3 / แก้ไข 0"
		}, {
			label: "วิธีตรวจ",
			value: "เปิดเอกสารต้นฉบับทีละหน้า + ตรวจ commit"
		}],
		hash: hashOf("verify:1")
	}, {
		id: "au-vr-2",
		at: stamp(5, 65),
		kind: "verification",
		actor: "ดร. สมชาย วัฒนา (ผู้ตรวจสอบ)",
		title: "ปรับระดับทักษะ AWS จาก Proficient → Working",
		detail: "หลักฐานครอบคลุมเฉพาะ S3 และ Lambda จึงลดระดับลงเพื่อไม่ให้เกินขอบเขตหลักฐาน",
		refs: [{
			label: "เหตุผล",
			value: "ขอบเขตหลักฐานจำกัด"
		}],
		hash: hashOf("verify:2")
	}, {
		id: "au-re-1",
		at: stamp(6, 20),
		kind: "reevaluation",
		actor: "ผู้สมัคร (เจ้าของพาสปอร์ต)",
		title: "ส่งคำขอประเมินใหม่ #RE-1042",
		detail: "แนบใบรับรอง AWS Cloud Practitioner และ repo ใหม่ เพื่อขอทบทวนคะแนนความพร้อมทำงาน",
		refs: [{
			label: "สถานะ",
			value: "ประเมินใหม่สำเร็จ"
		}],
		hash: hashOf("reeval:1")
	});
	return entries.sort((a, b) => a.at < b.at ? 1 : -1);
}
var auditLog = buildLog();
function auditCounts() {
	return auditLog.reduce((totals, entry) => {
		totals[entry.kind] += 1;
		return totals;
	}, {
		upload: 0,
		extraction: 0,
		citation: 0,
		verification: 0,
		reevaluation: 0
	});
}
var KIND_ICON = {
	upload: FileUp,
	extraction: Sparkles,
	citation: Link2,
	verification: BadgeCheck,
	reevaluation: RefreshCcw
};
var KINDS = [
	"upload",
	"extraction",
	"citation",
	"verification",
	"reevaluation"
];
function AuditPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("all");
	const counts = auditCounts();
	const filtered = (0, import_react.useMemo)(() => auditLog.filter((entry) => {
		if (kind !== "all" && entry.kind !== kind) return false;
		if (!query.trim()) return true;
		return [
			entry.title,
			entry.detail,
			entry.actor,
			...entry.refs.map((ref) => ref.value)
		].join(" ").toLowerCase().includes(query.toLowerCase());
	}), [query, kind]);
	function exportCsv() {
		const csv = [[
			"เวลา",
			"ประเภท",
			"ผู้ดำเนินการ",
			"รายการ",
			"รายละเอียด",
			"ลายเซ็น"
		], ...filtered.map((entry) => [
			entry.at,
			AUDIT_KIND_LABEL[entry.kind],
			entry.actor,
			entry.title,
			entry.detail.replace(/\s+/g, " "),
			entry.hash
		])].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
		const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" }));
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "evidence-audit-trail.csv";
		anchor.click();
		URL.revokeObjectURL(url);
		toast.success("ดาวน์โหลดร่องรอยการตรวจสอบแล้ว", { description: `${filtered.length} รายการ` });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "ร่องรอยการตรวจสอบหลักฐาน",
		description: "ทุกการอัปโหลด ทุกขั้นตอนของ AI และทุกการอ้างอิงทักษะ ถูกบันทึกไว้พร้อมลายเซ็นเพื่อตรวจย้อนกลับได้ทั้งสาย",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: exportCsv,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "ส่งออก CSV"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3 xl:grid-cols-5",
				children: KINDS.map((item) => {
					const Icon = KIND_ICON[item];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setKind((prev) => prev === item ? "all" : item),
						"aria-pressed": kind === item,
						className: `panel flex min-h-11 items-center gap-3 p-4 text-left transition-colors ${kind === item ? "ring-2 ring-primary" : "hover:bg-surface"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md bg-surface-raised p-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block truncate text-xs text-muted-foreground",
								children: AUDIT_KIND_LABEL[item]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-lg font-semibold",
								children: counts[item]
							})]
						})]
					}, item);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-56 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "ค้นหาทักษะ ไฟล์ ข้อความอ้างอิง หรือผู้ดำเนินการ…",
							className: "pl-9",
							"aria-label": "ค้นหาในร่องรอยการตรวจสอบ"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: (value) => setKind(value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-60",
							"aria-label": "กรองตามประเภทเหตุการณ์",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "ทุกประเภทเหตุการณ์"
						}), KINDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: item,
							children: AUDIT_KIND_LABEL[item]
						}, item))] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "secondary",
						children: [filtered.length, " รายการ"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-5 space-y-3",
				children: filtered.map((entry) => {
					const Icon = KIND_ICON[entry.kind];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-surface-raised p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: entry.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												new Date(entry.at).toLocaleString("th-TH"),
												" · ",
												entry.actor
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										children: AUDIT_KIND_LABEL[entry.kind]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: entry.hash
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: entry.detail
							}),
							entry.refs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
								className: "mt-3 flex flex-wrap gap-2 text-[11px]",
								children: entry.refs.map((ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-surface px-2 py-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-eyebrow",
										children: ref.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "mt-0.5 break-all font-mono",
										children: ref.value
									})]
								}, `${entry.id}-${ref.label}`))
							}) : null
						]
					}, entry.id);
				})
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-6 p-10 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold",
					children: "ไม่พบเหตุการณ์ที่ตรงกับเงื่อนไข"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "ลองปรับคำค้นหรือเลือกประเภทอื่น"
				})]
			}) : null
		]
	});
}
//#endregion
export { AuditPage as component };
