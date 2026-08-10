import { i as __toESM } from "../_runtime.mjs";
import { n as candidates } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { $ as Download, C as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Checkbox } from "./checkbox-kt6FvQcE.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { d as PolarGrid, h as Legend, l as Radar, p as ResponsiveContainer, t as RadarChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recruiter-BXpBQF1a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
var SKILL_COLUMNS = [
	"TypeScript",
	"Python",
	"React",
	"PostgreSQL",
	"Docker",
	"AWS",
	"UI Design (Figma)"
];
var CHART_COLORS = [
	"var(--color-chart-1)",
	"var(--color-chart-2)",
	"var(--color-chart-3)"
];
function RecruiterPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [university, setUniversity] = (0, import_react.useState)("All");
	const [minReadiness, setMinReadiness] = (0, import_react.useState)("0");
	const [selected, setSelected] = (0, import_react.useState)(["c1", "c2"]);
	const universities = ["All", ...new Set(candidates.map((c) => c.university))];
	const filtered = (0, import_react.useMemo)(() => candidates.filter((candidate) => (university === "All" || candidate.university === university) && candidate.workReadiness >= Number(minReadiness) && (candidate.name.toLowerCase().includes(query.toLowerCase()) || candidate.topSkills.join(" ").toLowerCase().includes(query.toLowerCase()) || candidate.githubUser.toLowerCase().includes(query.toLowerCase()))), [
		query,
		university,
		minReadiness
	]);
	const compared = candidates.filter((candidate) => selected.includes(candidate.id)).slice(0, 3);
	const radarData = SKILL_COLUMNS.map((skill) => {
		const row = { skill: skill.replace(" (Figma)", "") };
		compared.forEach((candidate) => {
			row[candidate.name] = candidate.topSkills.includes(skill) ? Math.round(candidate.workReadiness * .9) : 25;
		});
		return row;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Talent Search",
		description: "ค้นหาและเปรียบเทียบผู้สมัครจากทักษะที่มีหลักฐานรองรับ",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: () => toast.success("กำลังจัดทำรายงาน", { description: "Skill Verification Report (PDF)" }),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), "ดาวน์โหลดรายงาน"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-56 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: query,
							onChange: (event) => setQuery(event.target.value),
							placeholder: "ค้นหาชื่อ ทักษะ หรือ GitHub…",
							className: "pl-9",
							"aria-label": "Search candidates"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: university,
						onValueChange: setUniversity,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-56",
							"aria-label": "Filter by university",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: universities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: item,
							children: item
						}, item)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: minReadiness,
						onValueChange: setMinReadiness,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-48",
							"aria-label": "Minimum work readiness",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
							"0",
							"60",
							"70",
							"80"
						].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
							value,
							children: [
								"Readiness ≥ ",
								value,
								"%"
							]
						}, value)) })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-5 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "w-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Compare"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Candidate" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "University" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "Readiness" }),
					SKILL_COLUMNS.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "whitespace-nowrap text-center text-[11px]",
						children: skill
					}, skill))
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: filtered.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: selected.includes(candidate.id),
						"aria-label": `Compare ${candidate.name}`,
						onCheckedChange: (checked) => setSelected((prev) => checked ? [...prev, candidate.id].slice(-3) : prev.filter((id) => id !== candidate.id))
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-nowrap font-medium",
						children: candidate.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[11px] text-muted-foreground",
						children: [
							"@",
							candidate.githubUser,
							" · ",
							candidate.experienceYears,
							"y"
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "whitespace-nowrap text-sm text-muted-foreground",
						children: candidate.university
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: candidate.verificationStatus === "Verified" ? "default" : "outline",
						children: candidate.verificationStatus
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableCell, {
						className: "w-32",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-xs",
							children: [candidate.workReadiness, "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: candidate.workReadiness,
							className: "mt-1 h-1.5"
						})]
					}),
					SKILL_COLUMNS.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-center",
						children: candidate.topSkills.includes(skill) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2.5 rounded-full bg-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block size-2.5 rounded-full bg-border" })
					}, skill))
				] }, candidate.id)) })] }), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "ไม่พบผู้สมัครที่ตรงกับเงื่อนไข — ลองลดเงื่อนไขการกรอง"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Comparison radar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "เลือกได้สูงสุด 3 คน — คะแนนอ้างอิงทักษะที่ยืนยันแล้วเท่านั้น"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-80",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
									data: radarData,
									outerRadius: "70%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--color-border)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
											dataKey: "skill",
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
										compared.map((candidate, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
											name: candidate.name,
											dataKey: candidate.name,
											stroke: CHART_COLORS[index % CHART_COLORS.length],
											fill: CHART_COLORS[index % CHART_COLORS.length],
											fillOpacity: .22
										}, candidate.id))
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Recommendation"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: compared.map((candidate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: candidate.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted-foreground",
								children: candidate.verificationStatus === "Verified" ? `แนะนำให้เข้าสัมภาษณ์: ทักษะหลัก ${candidate.topSkills.slice(0, 3).join(", ")} มีหลักฐานยืนยันครบ` : `ควรขอหลักฐานเพิ่มเติมก่อนสัมภาษณ์ เนื่องจากสถานะยังเป็น ${candidate.verificationStatus}`
							})]
						}, candidate.id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { RecruiterPage as component };
