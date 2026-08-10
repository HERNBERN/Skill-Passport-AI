import { t as cn } from "./utils-C_uf36nf.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { Z as EyeOff, _t as BadgeCheck, u as TriangleAlert, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as BIAS_EXCLUDED, r as biasFlags, t as BIAS_ALLOWED } from "./impact-D6vK68Lq.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/readiness-CdHTgKqa.js
var import_jsx_runtime = require_jsx_runtime();
/** Big radial progress ring. Pure SVG so it renders identically on the server. */
function RadialScore({ value, size = 208, caption }) {
	const stroke = 14;
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - Math.min(Math.max(value, 0), 100) / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative shrink-0",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			role: "img",
			"aria-label": `Score ${value}%`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r: radius,
				fill: "none",
				stroke: "var(--color-border)",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r: radius,
				fill: "none",
				stroke: "var(--color-primary)",
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: circumference,
				strokeDashoffset: offset,
				className: "transition-[stroke-dashoffset] duration-1000 ease-out"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-0 flex flex-col items-center justify-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-display text-5xl font-semibold leading-none",
				children: [value, "%"]
			}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-2 max-w-[9rem] text-xs leading-relaxed text-muted-foreground",
				children: caption
			}) : null]
		})]
	});
}
var DIMENSIONS = [
	{
		id: "problem",
		label: "Problem Management",
		labelTh: "การจัดการปัญหา",
		parts: ["r7", "r3"],
		note: "ทักษะการคิดวิเคราะห์และการแก้ปัญหา — วัดจากความซับซ้อนของงานและความต่อเนื่องในการเรียนรู้"
	},
	{
		id: "work",
		label: "Work Management",
		labelTh: "การจัดการงาน",
		parts: [
			"r1",
			"r2",
			"r5",
			"r4"
		],
		note: "การวางแผนและคุณภาพงาน — วัดจากคุณภาพหลักฐาน ความหลากหลายของโปรเจกต์ และผลงานที่เผยแพร่"
	},
	{
		id: "team",
		label: "Team Management",
		labelTh: "การจัดการทีม",
		parts: ["r6", "r8"],
		note: "การสื่อสารและภาวะผู้นำ — วัดจากประสบการณ์ทำงานร่วมกันและระดับการยืนยันจากบุคคลที่สาม"
	}
];
function dimensionScores(breakdown) {
	return DIMENSIONS.map((dimension) => {
		const parts = breakdown.components.filter((component) => dimension.parts.includes(component.id));
		const weight = parts.reduce((total, part) => total + part.weight, 0);
		const score = parts.reduce((total, part) => total + part.score, 0);
		return {
			...dimension,
			value: weight ? Math.round(score / weight * 100) : 0,
			weight
		};
	});
}
function ReadinessHero({ breakdown, name, status, headline }) {
	const dimensions = dimensionScores(breakdown);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "panel grid gap-8 p-6 lg:grid-cols-[auto_1fr] lg:items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialScore, {
					value: breakdown.total,
					caption: "Work Readiness Score"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), "Verified by SkillLens AI"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-[11px] text-muted-foreground",
					children: status
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-eyebrow",
					children: ["Work readiness · ", name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl font-semibold leading-snug",
					children: headline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: "คะแนนคำนวณจากหลักฐานเท่านั้น และแยกออกเป็น 3 มิติสมรรถนะหลัก ทุกองค์ประกอบอธิบายได้และตรวจสอบย้อนกลับได้"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: dimensions.map((dimension) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: dimension.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow mt-0.5",
							children: dimension.labelTh
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-display text-2xl font-semibold",
							children: [dimension.value, "%"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: dimension.value,
							className: "mt-2 h-1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: dimension.note
						})
					]
				}, dimension.id))
			})]
		})]
	});
}
function ReadinessBreakdownPanel({ breakdown, className }) {
	const totalWeight = breakdown.components.reduce((total, component) => total + component.weight, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Work Readiness — explainable breakdown"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"น้ำหนักรวม ",
						totalWeight,
						" คะแนน · ได้ ",
						breakdown.total,
						" คะแนน · ทุกบรรทัดมีเหตุผลจากหลักฐาน"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "secondary",
					className: "font-mono",
					children: [breakdown.total, "/100"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: breakdown.components.map((component) => {
					const pct = component.weight ? Math.round(component.score / component.weight * 100) : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-medium",
									children: [
										component.label,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted-foreground",
											children: ["· ", component.labelTh]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs text-muted-foreground",
									children: [
										component.score,
										"/",
										component.weight,
										" pts · weight ",
										component.weight,
										"%"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: pct,
								className: "mt-2 h-1.5"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: component.reason
							})
						]
					}, component.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "จุดแข็งที่มีหลักฐานรองรับ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5 text-xs text-muted-foreground",
					children: breakdown.strengths.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "mt-0.5 size-3.5 shrink-0 text-success" }), item]
					}, item))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "สิ่งที่จะทำให้คะแนนเพิ่มขึ้น"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5 text-xs text-muted-foreground",
					children: breakdown.recommendations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), item]
					}, item))
				})] })]
			})
		]
	});
}
function AntiBiasPanel({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel p-5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-semibold",
					children: "Anti-Bias notice"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "ระบบตรวจพบข้อมูลที่อาจก่อให้เกิดอคติในเอกสาร และตัดออกก่อนคำนวณคะแนนทุกครั้ง"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: biasFlags.map((flag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-warning/40 bg-warning/10 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-medium",
								children: ["พบข้อมูลที่อาจก่อให้เกิดอคติ: ", flag.field]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-[11px] text-muted-foreground",
							children: flag.detectedIn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 rounded-md border-l-2 border-warning bg-background p-2 text-xs",
							children: [
								"“",
								flag.excerpt,
								"”"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-muted-foreground",
							children: flag.action
						})
					]
				}, `${flag.field}-${flag.detectedIn}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: "ฟิลด์ที่ระบบ “ห้ามใช้” ในการคำนวณ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2 text-xs",
					children: BIAS_EXCLUDED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: [
							item.field,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["· ", item.labelTh]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground",
						children: item.reason
					})] }, item.field))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "สัญญาณที่อนุญาตให้ใช้เท่านั้น"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-1.5 text-xs text-muted-foreground",
						children: BIAS_ALLOWED.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "mt-0.5 size-3.5 shrink-0 text-success" }), item]
						}, item))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs leading-relaxed text-muted-foreground",
						children: "หากโปรไฟล์ไม่มี GitHub หรือพอร์ตโฟลิโอ ระบบจะแสดงน้ำหนักนั้นอย่างโปร่งใสและไม่นำมาหักคะแนนในการจับคู่งาน"
					})
				] })]
			})
		]
	});
}
//#endregion
export { dimensionScores as a, ReadinessHero as i, RadialScore as n, ReadinessBreakdownPanel as r, AntiBiasPanel as t };
