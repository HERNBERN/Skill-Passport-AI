import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, n as candidates, r as evidenceFiles } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { r as useSession } from "./session-C270IJ_y.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { J as FileStack, Q as ExternalLink, U as Github, _t as BadgeCheck, b as ShieldAlert, d as TrendingUp, h as Sparkles, i as Users, o as UserRound, yt as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { c as personas } from "./impact-D6vK68Lq.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as ConfidenceMeter } from "./skill-evidence-DItBqdZ7.mjs";
import { n as QrBlock } from "./passport-document-8WvuOhqg.mjs";
import { i as ReadinessHero } from "./readiness-CdHTgKqa.mjs";
import { a as XAxis, c as Bar, d as PolarGrid, f as Cell, i as YAxis, l as Radar, m as Tooltip, n as BarChart, p as ResponsiveContainer, s as CartesianGrid, t as RadarChart, u as PolarAngleAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-FlFYlCtv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WIDTH = 760;
var HEIGHT = 460;
/** Interactive Skill ↔ GitHub artefact graph with an Evidence Explorer side panel. */
function EvidenceGraph({ ownerName, skills, className }) {
	const graph = (0, import_react.useMemo)(() => {
		const usable = skills.map((skill) => ({
			skill,
			evidence: skill.evidence.filter((item) => item.sourceType === "github")
		})).filter((entry) => entry.evidence.length > 0).slice(0, 6);
		const nodes = [{
			id: "root",
			label: ownerName,
			x: 96,
			y: HEIGHT / 2,
			kind: "root"
		}];
		const links = [];
		usable.forEach((entry, index) => {
			const y = (index + .5) / usable.length * HEIGHT;
			const skillId = `skill-${entry.skill.id}`;
			nodes.push({
				id: skillId,
				label: entry.skill.name,
				x: 300,
				y,
				kind: "skill",
				verified: entry.skill.verified,
				skill: entry.skill
			});
			links.push({
				id: `l-root-${skillId}`,
				from: "root",
				to: skillId
			});
			entry.evidence.slice(0, 2).forEach((evidence, evIndex) => {
				const evidenceId = `ev-${evidence.id}`;
				const spread = entry.evidence.length > 1 ? evIndex === 0 ? -26 : 26 : 0;
				nodes.push({
					id: evidenceId,
					label: evidence.filePath ?? evidence.repository ?? evidence.sourceName,
					x: 500,
					y: Math.min(436, Math.max(24, y + spread)),
					kind: "evidence",
					evidence,
					skill: entry.skill
				});
				links.push({
					id: `l-${skillId}-${evidenceId}`,
					from: skillId,
					to: evidenceId
				});
			});
		});
		return {
			nodes,
			links
		};
	}, [skills, ownerName]);
	const byId = (id) => graph.nodes.find((node) => node.id === id);
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const selected = selectedId ? graph.nodes.find((node) => node.id === selectedId) : void 0;
	const selectedEvidence = selected?.evidence ?? selected?.skill?.evidence.find((item) => item.sourceType === "github") ?? void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("grid gap-4 lg:grid-cols-[1.35fr_1fr]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Evidence Graph"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "เชื่อมโยงทักษะกับชิ้นงานจริงใน GitHub — คลิกโหนดเพื่อเปิด Evidence Explorer"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-3" }),
							graph.nodes.filter((node) => node.kind === "evidence").length,
							" artefacts"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
						className: "h-[460px] w-full min-w-[560px]",
						role: "group",
						"aria-label": "Skill to GitHub artefact graph",
						children: [graph.links.map((link) => {
							const from = byId(link.from);
							const to = byId(link.to);
							const midX = (from.x + to.x) / 2;
							const active = selectedId === link.to || selectedId === link.from;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`,
								fill: "none",
								stroke: active ? "var(--color-primary)" : "var(--color-border)",
								strokeWidth: active ? 2 : 1.25,
								className: "transition-[stroke,stroke-width] duration-300"
							}, link.id);
						}), graph.nodes.map((node) => {
							const isSelected = selectedId === node.id;
							const radius = node.kind === "root" ? 30 : node.kind === "skill" ? 12 : 7;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: "cursor-pointer",
								onClick: () => setSelectedId(node.id === "root" ? null : node.id),
								tabIndex: 0,
								role: "button",
								"aria-label": node.label,
								onKeyDown: (event) => {
									if (event.key === "Enter" || event.key === " ") setSelectedId(node.id);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: node.x,
										cy: node.y,
										r: radius,
										fill: node.kind === "root" ? "var(--color-primary)" : node.verified || node.kind === "evidence" ? "var(--color-card)" : "var(--color-card)",
										stroke: isSelected ? "var(--color-primary)" : node.kind === "skill" && node.verified ? "var(--color-primary)" : "var(--color-border)",
										strokeWidth: isSelected ? 3 : 1.5,
										className: "transition-all duration-300"
									}),
									node.kind === "root" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: node.x,
										y: node.y + 4,
										textAnchor: "middle",
										className: "fill-primary-foreground text-[10px] font-medium",
										children: node.label.split(" ")[0]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
										x: node.kind === "evidence" ? node.x + 12 : node.x,
										y: node.kind === "evidence" ? node.y + 3.5 : node.kind === "root" ? node.y + 48 : node.y - 20,
										textAnchor: node.kind === "evidence" ? "start" : "middle",
										className: cn("text-[11px]", node.kind === "skill" ? "fill-foreground font-medium" : "fill-muted-foreground font-mono"),
										children: node.kind === "evidence" ? truncate(node.label, 26) : node.label
									})
								]
							}, node.id);
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-3.5 text-primary" }), " Candidate"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full border-2 border-primary" }), " Verified skill"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full border border-border bg-card" }), " GitHub artefact"]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "panel p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold",
				children: "Evidence Explorer"
			}), selected && selectedEvidence ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 animate-in fade-in slide-in-from-right-2 duration-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: selected.skill?.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground",
						children: [
							selectedEvidence.repository ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedEvidence.repository }) : null,
							selectedEvidence.filePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedEvidence.filePath }) : null,
							selectedEvidence.commit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["commit ", selectedEvidence.commit] }) : null,
							selectedEvidence.lineNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["line ", selectedEvidence.lineNumber] }) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-3 overflow-x-auto rounded-md border border-border bg-surface p-3 text-[11px] leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "whitespace-pre-wrap font-mono",
							children: selectedEvidence.quote
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, {
						value: selectedEvidence.confidence,
						className: "mt-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 text-xs font-medium text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "AI Analysis"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
						children: selectedEvidence.reasoning
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						className: "mt-4 min-h-11 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: selectedEvidence.url ?? `https://github.com/${selectedEvidence.repository ?? ""}${selectedEvidence.filePath ? `/blob/main/${selectedEvidence.filePath}` : ""}${selectedEvidence.lineNumber ? `#L${selectedEvidence.lineNumber}` : ""}`,
							target: "_blank",
							rel: "noreferrer noopener",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "View on GitHub"]
						})
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "เลือกโหนดทักษะหรือหลักฐานทางด้านซ้าย เพื่อดู Code Snippet, เหตุผลของ AI และลิงก์ตรงไปยังไฟล์ต้นฉบับ"
			})]
		})]
	});
}
function truncate(value, max) {
	return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}
var CATEGORY_ORDER = [
	"Programming Language",
	"Framework",
	"Database",
	"DevOps",
	"Cloud",
	"Research",
	"Design",
	"Soft Skill"
];
/** Benchmark for the target role (Backend Developer). */
var TARGET_PROFILE = {
	"Programming Language": 90,
	Framework: 85,
	Database: 85,
	DevOps: 75,
	Cloud: 70,
	Research: 40,
	Design: 35,
	"Soft Skill": 70
};
function EvidenceTooltip({ active, payload }) {
	const point = payload?.[0]?.payload;
	if (!active || !point) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-64 rounded-lg border border-border bg-card p-3 text-xs shadow-raised",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: point.category
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-[11px] text-muted-foreground",
				children: [
					"you ",
					point.score,
					"% · target ",
					point.target,
					"%"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-eyebrow mt-2",
				children: "คะแนนนี้มาจากหลักฐาน"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-1 space-y-1 text-muted-foreground",
				children: [(point.sources ?? []).map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: source }, source)), (point.sources ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ยังไม่มีหลักฐานในหมวดนี้" }) : null]
			})
		]
	});
}
function DashboardPage() {
	const { session } = useSession();
	const candidate = candidates[0];
	const verified = skills.filter((s) => s.verified).length;
	const evidenceCount = skills.reduce((total, s) => total + s.evidence.length, 0);
	const radarData = CATEGORY_ORDER.map((category) => {
		const group = skills.filter((s) => s.category === category);
		const score = group.length ? Math.round(group.reduce((t, s) => t + s.confidence, 0) / group.length * 100) : 0;
		const sources = group.flatMap((s) => s.evidence.map((e) => `${s.name} ← ${e.repository ?? e.sourceName}`)).slice(0, 3);
		return {
			category: category.replace(" Language", ""),
			score,
			target: TARGET_PROFILE[category],
			sources
		};
	});
	const publicPath = `/p/${candidate.passportNumber}`;
	const publicUrl = typeof window === "undefined" ? publicPath : `${window.location.origin}${publicPath}`;
	const matchData = jobRoles.slice().sort((a, b) => b.matchScore - a.matchScore).slice(0, 5).map((role) => ({
		title: role.title,
		score: role.matchScore
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: `สวัสดี ${session?.name ?? ""}`,
		description: "ภาพรวมทักษะที่ผ่านการตรวจสอบ พร้อมหลักฐานอ้างอิงทุกรายการ",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/passport",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" }), "Skill Passport"]
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadinessHero, {
				breakdown: personas[0].readiness,
				name: candidate.name,
				status: `Passport ${candidate.passportNumber} · ${candidate.verificationStatus}`,
				headline: "Job-Ready in Software Engineering"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Verified skills",
						value: `${verified}/${skills.length}`,
						icon: BadgeCheck
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Evidence items",
						value: String(evidenceCount),
						icon: FileStack
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Evidence files",
						value: String(evidenceFiles.length),
						icon: FileStack
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Work readiness",
						value: `${candidate.workReadiness}%`,
						icon: TrendingUp,
						progress: candidate.workReadiness
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
							children: "Skill DNA — you vs. target role"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-relaxed text-muted-foreground",
							children: "เปรียบเทียบทักษะปัจจุบันกับเกณฑ์ของตำแหน่ง Backend Developer — วางเมาส์บนยอดกราฟเพื่อดูว่าคะแนนมาจากหลักฐานใด"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
									data: radarData,
									outerRadius: "72%",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--color-border)" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
											dataKey: "category",
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceTooltip, {}) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
											name: "Target role",
											dataKey: "target",
											stroke: "var(--color-border)",
											fill: "var(--color-muted)",
											fillOpacity: .35
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
											name: "Your evidence",
											dataKey: "score",
											stroke: "var(--color-primary)",
											fill: "var(--color-primary)",
											fillOpacity: .28
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
							children: "Top job matches"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "คะแนนอธิบายได้ทุกตำแหน่ง พร้อมทักษะที่ตรงและที่ยังขาด"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 h-72",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: matchData,
									layout: "vertical",
									margin: {
										left: 12,
										right: 16
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											horizontal: false,
											stroke: "var(--color-border)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											domain: [0, 100],
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											type: "category",
											dataKey: "title",
											width: 130,
											tick: {
												fill: "var(--color-muted-foreground)",
												fontSize: 11
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
											background: "var(--color-card)",
											border: "1px solid var(--color-border)",
											borderRadius: 8,
											fontSize: 12
										} }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "score",
											radius: [
												0,
												4,
												4,
												0
											],
											children: matchData.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "var(--color-primary)" }, entry.title))
										})
									]
								})
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceGraph, {
				ownerName: candidate.name,
				skills,
				className: "mt-6"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-6 flex flex-wrap items-center gap-5 p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-border bg-card p-2 text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrBlock, {
							value: publicUrl,
							size: 92
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-base font-semibold",
								children: "Trust & verification"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-relaxed text-muted-foreground",
								children: "สแกน QR เพื่อเปิด Digital Skill Passport ฉบับย่อ — HR ตรวจสอบได้ทันทีโดยไม่ต้องล็อกอิน"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: "gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-3" }), "GitHub API verified"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: "University transcript checked"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: "Reviewer signed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: "font-mono",
										children: candidate.passportNumber
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/p/$passportNumber",
							params: { passportNumber: candidate.passportNumber },
							children: "Public passport"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Recent evidence files"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/skills",
								children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-border",
						children: evidenceFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium",
										children: file.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: [
											file.kind,
											" · ",
											file.pages,
											" page",
											file.pages > 1 ? "s" : "",
											" · ",
											file.sizeKb,
											" KB ·",
											" ",
											file.uploadedAt
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									children: [file.extractedSkills, " skills"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Completed" })
							]
						}, file.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Needs attention"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-3",
							children: skills.filter((skill) => !skill.verified).map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-md border border-border bg-surface p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4 text-warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: skill.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "ยังไม่ได้รับการยืนยันจากผู้ประเมิน — แสดงเป็น Unverified"
								})]
							}, skill.id))
						}),
						session?.role === "recruiter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							className: "mt-4 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/recruiter",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }), "Talent search"]
							})
						}) : null
					]
				})]
			})
		]
	});
}
function Stat({ label, value, icon: Icon, progress }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-primary" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl font-semibold",
				children: value
			}),
			typeof progress === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: progress,
				className: "mt-3 h-1.5"
			}) : null
		]
	});
}
//#endregion
export { DashboardPage as component };
