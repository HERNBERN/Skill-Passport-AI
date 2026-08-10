import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { O as Quote, V as GraduationCap, d as TrendingUp, ft as Building2, i as Users, s as UserCheck, z as HeartHandshake } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { i as cohortImpact, l as readinessTrend, o as gapClosure, s as impactMetrics, u as successStories } from "./impact-D6vK68Lq.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { a as XAxis, c as Bar, h as Legend, i as YAxis, m as Tooltip, n as BarChart, o as Line, p as ResponsiveContainer, r as LineChart, s as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impact-DzbIMvS1.js
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "var(--color-card)",
	border: "1px solid var(--color-border)",
	borderRadius: 8,
	fontSize: 12
};
var axisTick = {
	fill: "var(--color-muted-foreground)",
	fontSize: 11
};
function ImpactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Social Impact Dashboard",
		description: "ตัวชี้วัดผลลัพธ์ทางสังคมของแพลตฟอร์ม พร้อมกราฟที่อ่านเข้าใจง่ายและเรื่องราวความสำเร็จจริง",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "ผู้ใช้ทั้งหมด",
						value: impactMetrics.totalUsers.toLocaleString(),
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Passport ของกลุ่ม NEET",
						value: impactMetrics.neetPassports.toLocaleString(),
						icon: HeartHandshake
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "ทักษะที่ยืนยันแล้ว",
						value: impactMetrics.verifiedSkills.toLocaleString(),
						icon: UserCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "ได้รับเชิญสัมภาษณ์",
						value: impactMetrics.interviewsGranted.toLocaleString(),
						icon: TrendingUp
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "ได้งานที่รายงานผล",
						value: impactMetrics.hiresReported.toLocaleString(),
						icon: UserCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "องค์กรที่ใช้งาน",
						value: String(impactMetrics.organisations),
						icon: Building2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "สถาบันการศึกษา",
						value: String(impactMetrics.universities),
						icon: GraduationCap
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Work Readiness เพิ่มขึ้นเฉลี่ย",
						value: `+${impactMetrics.averageReadinessLift}`,
						icon: TrendingUp,
						progress: impactMetrics.averageReadinessLift * 5
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Readiness & job-match trend"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "ค่าเฉลี่ย Work Readiness และอัตราการจับคู่งานของผู้ใช้ต่อเดือน"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
									data: readinessTrend,
									margin: {
										left: 4,
										right: 12
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "month",
											tick: axisTick
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											domain: [0, 100],
											tick: axisTick
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "readiness",
											name: "Work readiness",
											stroke: "var(--color-primary)",
											strokeWidth: 2,
											dot: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
											type: "monotone",
											dataKey: "matched",
											name: "Job matched (%)",
											stroke: "var(--color-success)",
											strokeWidth: 2,
											dot: false
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Outcomes by cohort"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "จำนวน Passport, การได้สัมภาษณ์ และการได้งาน แยกตามกลุ่มเป้าหมาย"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: cohortImpact,
									margin: {
										left: 4,
										right: 12
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-border)",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "cohort",
											tick: {
												...axisTick,
												fontSize: 10
											},
											interval: 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: axisTick }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "passports",
											name: "Passports",
											fill: "var(--color-primary)",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "interviews",
											name: "Interviews",
											fill: "var(--color-success)",
											radius: [
												4,
												4,
												0,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "hires",
											name: "Hires",
											fill: "var(--color-warning)",
											radius: [
												4,
												4,
												0,
												0
											]
										})
									]
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Skill-gap closure"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "สัดส่วนผู้ใช้ที่มีหลักฐานทักษะนั้น ก่อนและหลังใช้ Learning Roadmap"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: gapClosure,
									layout: "vertical",
									margin: {
										left: 12,
										right: 16
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-border)",
											horizontal: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											domain: [0, 100],
											tick: axisTick
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											type: "category",
											dataKey: "skill",
											width: 120,
											tick: axisTick
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: tooltipStyle }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "before",
											name: "ก่อน (%)",
											fill: "var(--color-border)",
											radius: [
												0,
												4,
												4,
												0
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "after",
											name: "หลัง (%)",
											fill: "var(--color-primary)",
											radius: [
												0,
												4,
												4,
												0
											]
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "ผลลัพธ์เชิงระบบ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ratio, {
								label: "ลดช่องว่างทักษะ (Skill gap)",
								value: impactMetrics.skillGapReduction
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ratio, {
								label: "ลดการจับคู่งานที่ไม่ตรงสาย",
								value: impactMetrics.jobMismatchReduction
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ratio, {
								label: "สัดส่วน Passport ของกลุ่ม NEET",
								value: Math.round(impactMetrics.neetPassports / impactMetrics.totalUsers * 100)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ratio, {
								label: "อัตราการได้สัมภาษณ์ต่อผู้ใช้",
								value: Math.round(impactMetrics.interviewsGranted / impactMetrics.totalUsers * 100)
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Success Stories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "เรื่องราวของผู้ใช้จริงในแต่ละกลุ่มเป้าหมาย — ก่อน, สิ่งที่ทำ และผลลัพธ์ที่วัดได้"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: successStories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "panel flex flex-col gap-3 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-base font-semibold",
											children: story.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: story.persona
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											className: "ml-auto font-mono",
											children: story.metric
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "space-y-2 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-eyebrow",
											children: "ก่อน"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-0.5 text-muted-foreground",
											children: story.before
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-eyebrow",
											children: "สิ่งที่ทำผ่าน SkillLens"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-0.5 text-muted-foreground",
											children: story.action
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
											className: "text-eyebrow",
											children: "ผลลัพธ์"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
											className: "mt-0.5 text-success",
											children: story.result
										})] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
									className: "mt-auto rounded-md border-l-2 border-primary bg-surface p-3 text-sm leading-relaxed",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mb-1 size-3 text-primary" }), story.quote]
								})
							]
						}, story.id))
					})
				]
			})
		]
	});
}
function Metric({ label, value, icon: Icon, progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0 text-primary" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold",
				children: value
			}),
			typeof progress === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: progress,
				className: "mt-3 h-1.5"
			}) : null
		]
	});
}
function Ratio({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "font-mono",
			children: [value, "%"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
		value,
		className: "mt-1.5 h-1.5"
	})] });
}
//#endregion
export { ImpactPage as component };
