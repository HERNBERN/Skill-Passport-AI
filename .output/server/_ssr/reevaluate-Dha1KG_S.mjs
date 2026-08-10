import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, n as candidates } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { D as RefreshCcw, at as CircleMinus, h as Sparkles, it as CirclePlus, ot as CircleCheck, xt as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { t as JobMatchPanel } from "./job-match-panel-DCn1rJnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reevaluate-Dha1KG_S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCE_LABEL = {
	document: "เอกสาร / ใบรับรอง (PDF, รูปภาพ)",
	github: "GitHub repository หรือ commit",
	portfolio: "Portfolio / เว็บไซต์ผลงาน",
	experience: "ประสบการณ์ทำงานหรือฝึกงาน",
	community: "กิจกรรมชุมชน / อาสาสมัคร",
	commerce: "ธุรกิจส่วนตัว / ร้านค้าออนไลน์"
};
function ReevaluatePage() {
	const candidate = candidates[0];
	const [sourceType, setSourceType] = (0, import_react.useState)("document");
	const [sourceName, setSourceName] = (0, import_react.useState)("");
	const [skillName, setSkillName] = (0, import_react.useState)(skills[0].name);
	const [quote, setQuote] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [result, setResult] = (0, import_react.useState)(null);
	const canAdd = sourceName.trim().length > 2 && quote.trim().length > 8;
	const baseMatches = (0, import_react.useMemo)(() => jobRoles.map((role) => ({
		id: role.id,
		title: role.title,
		company: role.company,
		location: role.location,
		matchScore: role.matchScore,
		matching: role.matchingSkills,
		missing: role.missingSkills,
		rationale: role.rationale,
		advice: role.advice,
		justifications: role.matchingSkills.flatMap((name) => {
			const skill = skills.find((item) => item.name === name);
			const evidence = skill?.evidence[0];
			if (!skill || !evidence) return [];
			return [{
				skill: skill.name,
				quote: evidence.quote,
				source: evidence.sourceName,
				confidence: evidence.confidence,
				evidence
			}];
		})
	})), []);
	function addItem() {
		if (!canAdd) return;
		setItems((prev) => [...prev, {
			id: `new-${prev.length + 1}`,
			sourceType,
			sourceName: sourceName.trim(),
			skillName,
			quote: quote.trim()
		}]);
		setSourceName("");
		setQuote("");
		toast.success("เพิ่มหลักฐานใหม่เข้าคำขอแล้ว");
	}
	function submit() {
		if (items.length === 0) {
			toast.error("กรุณาเพิ่มหลักฐานอย่างน้อย 1 ชิ้นก่อนส่งคำขอ");
			return;
		}
		const gain = Math.min(12, items.length * 3 + 2);
		const readinessAfter = Math.min(100, candidate.workReadiness + gain);
		const newSkillNames = items.map((item) => item.skillName).filter((name) => !candidate.topSkills.includes(name));
		const changes = [
			{
				kind: "up",
				label: `คะแนนความพร้อมทำงาน ${candidate.workReadiness}% → ${readinessAfter}%`,
				detail: `หลักฐานใหม่ ${items.length} ชิ้นเพิ่มน้ำหนักองค์ประกอบ “ความลึกของหลักฐาน” และ “ความสดใหม่ของหลักฐาน”`
			},
			...items.map((item) => ({
				kind: "new",
				label: `ผูกหลักฐานใหม่กับทักษะ ${item.skillName}`,
				detail: `${SOURCE_LABEL[item.sourceType]} · ${item.sourceName} — ข้อความอ้างอิง: “${item.quote}”`
			})),
			...newSkillNames.map((name) => ({
				kind: "new",
				label: `เพิ่มทักษะใหม่เข้าพาสปอร์ต: ${name}`,
				detail: "สถานะเริ่มต้นเป็น “รอผู้เชี่ยวชาญตรวจสอบ” จนกว่าจะมีการยืนยันหลักฐาน"
			})),
			{
				kind: "info",
				label: "บันทึกลงร่องรอยการตรวจสอบหลักฐาน",
				detail: "ทุกขั้นตอนของการประเมินใหม่ถูกบันทึกพร้อมลายเซ็น ตรวจย้อนกลับได้ที่หน้าร่องรอยการตรวจสอบ"
			},
			{
				kind: "info",
				label: "ข้อมูลที่อาจก่อให้เกิดอคติถูกตัดออกก่อนคำนวณ",
				detail: "ชื่อสถาบัน เกรดเฉลี่ย อายุ เพศ และรูปถ่าย ไม่ถูกนำเข้าโมเดลในการประเมินใหม่นี้"
			}
		];
		const matches = baseMatches.map((match) => {
			const boosted = items.some((item) => match.missing.includes(item.skillName));
			return {
				...match,
				matchScore: Math.min(99, match.matchScore + (boosted ? 7 : 3)),
				missing: match.missing.filter((name) => !items.some((item) => item.skillName === name))
			};
		});
		setResult({
			readinessBefore: candidate.workReadiness,
			readinessAfter,
			changes,
			matches,
			requestId: `RE-${1043 + items.length}`
		});
		toast.success("ประเมินใหม่สำเร็จ", { description: "อัปเดตพาสปอร์ตและผลจับคู่งานแล้ว" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "ขอประเมินใหม่",
		description: "ส่งหลักฐานใหม่แล้วระบบจะคำนวณคะแนนความพร้อม พาสปอร์ต และผลจับคู่งานอีกครั้ง พร้อมสรุปสิ่งที่เปลี่ยนแปลง",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			onClick: submit,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-4" }), "ส่งคำขอประเมินใหม่"]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "1. เพิ่มหลักฐานใหม่"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "ทุกทักษะต้องมีหลักฐาน — ระบุแหล่งที่มาและข้อความที่ยืนยันทักษะนั้นอย่างชัดเจน"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-eyebrow",
								htmlFor: "reeval-source-type",
								children: "ประเภทหลักฐาน"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: sourceType,
								onValueChange: (value) => setSourceType(value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "reeval-source-type",
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(SOURCE_LABEL).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: key,
									children: SOURCE_LABEL[key]
								}, key)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-eyebrow",
								htmlFor: "reeval-source-name",
								children: "ชื่อไฟล์ / ลิงก์ต้นฉบับ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "reeval-source-name",
								value: sourceName,
								onChange: (event) => setSourceName(event.target.value),
								placeholder: "เช่น AWS_Cloud_Practitioner_2026.pdf หรือ github.com/user/repo",
								className: "mt-1.5"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-eyebrow",
								htmlFor: "reeval-skill",
								children: "ทักษะที่ต้องการให้ประเมินใหม่"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: skillName,
								onValueChange: setSkillName,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									id: "reeval-skill",
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: skill.name,
									children: skill.name
								}, skill.id)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-eyebrow",
								htmlFor: "reeval-quote",
								children: "ข้อความอ้างอิงจากหลักฐาน"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "reeval-quote",
								value: quote,
								onChange: (event) => setQuote(event.target.value),
								rows: 4,
								placeholder: "คัดลอกข้อความจริงจากเอกสารหรือคำอธิบาย commit ที่ยืนยันทักษะนี้",
								className: "mt-1.5"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								className: "min-h-11",
								onClick: addItem,
								disabled: !canAdd,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-4" }), "เพิ่มเข้าคำขอ"]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "2. หลักฐานในคำขอนี้"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: items.length ? `${items.length} ชิ้น พร้อมส่งประเมินใหม่` : "ยังไม่มีหลักฐานในคำขอ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2",
						children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border bg-surface p-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: item.skillName
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: SOURCE_LABEL[item.sourceType]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											variant: "ghost",
											size: "sm",
											className: "ml-auto min-h-11",
											onClick: () => setItems((prev) => prev.filter((entry) => entry.id !== item.id)),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleMinus, { className: "size-4" }), "นำออก"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-mono text-[11px] text-muted-foreground",
									children: item.sourceName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										"“",
										item.quote,
										"”"
									]
								})
							]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-4 min-h-11",
						onClick: submit,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCcw, { className: "size-4" }), "ส่งคำขอประเมินใหม่"]
					})
				]
			})]
		}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel mt-6 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-display text-lg font-semibold",
							children: ["สรุปการเปลี่ยนแปลง · คำขอ ", result.requestId]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "ml-auto gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3" }), "ประเมินใหม่สำเร็จ"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "ความพร้อมทำงานก่อนประเมิน"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xl font-semibold",
								children: [result.readinessBefore, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: result.readinessBefore,
								className: "mt-2 h-1.5"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-eyebrow flex items-center gap-1",
								children: ["หลังประเมินใหม่ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-2xl font-semibold text-success",
								children: [result.readinessAfter, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: result.readinessAfter,
								className: "mt-2 h-1.5"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 space-y-2",
					children: result.changes.map((change) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-md border border-border bg-surface p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 font-medium",
							children: [change.kind === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-success" }) : change.kind === "new" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { className: "size-4 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-muted-foreground" }), change.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted-foreground",
							children: change.detail
						})]
					}, change.label))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobMatchPanel, {
			matches: result.matches,
			className: "mt-6",
			title: "ผลการจับคู่งานหลังประเมินใหม่"
		})] }) : null]
	});
}
//#endregion
export { ReevaluatePage as component };
