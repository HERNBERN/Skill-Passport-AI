import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { J as FileStack, _t as BadgeCheck, dt as CalendarClock, h as Sparkles, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { c as personas } from "./impact-D6vK68Lq.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { n as QrBlock } from "./passport-document-8WvuOhqg.mjs";
import { a as dimensionScores, n as RadialScore, r as ReadinessBreakdownPanel, t as AntiBiasPanel } from "./readiness-CdHTgKqa.mjs";
import { t as JobMatchPanel } from "./job-match-panel-DCn1rJnP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personas-Ci7ddHBf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PersonasPage() {
	const [activeId, setActiveId] = (0, import_react.useState)(personas[0].id);
	const persona = personas.find((item) => item.id === activeId) ?? personas[0];
	const dimensions = dimensionScores(persona.readiness);
	const jobMatches = (0, import_react.useMemo)(() => persona.jobMatches.map((match, index) => ({
		id: `${persona.id}-${index}`,
		matchScore: match.matchScore,
		title: match.title,
		matching: match.matching,
		missing: match.missing,
		rationale: match.rationale,
		justifications: match.matching.flatMap((skillName) => {
			const skill = persona.skills.find((item) => item.name === skillName);
			if (!skill) return [];
			return [{
				skill: skill.name,
				quote: skill.quote,
				source: `${persona.name} evidence bundle`,
				locator: `${skill.level} · ${skill.transferable ? "transferable" : "technical"}`,
				confidence: skill.confidence
			}];
		})
	})), [persona]);
	const publicPath = `/p/${persona.passportNumber}`;
	const publicUrl = typeof window === "undefined" ? publicPath : `${window.location.origin}${publicPath}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Demo Personas",
		description: "โหมดเดโม 5 โปรไฟล์ตัวแทนกลุ่มเป้าหมาย พร้อมหลักฐาน, Skill Passport, Job Matching และ Learning Roadmap ครบทุกส่วน",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			variant: "secondary",
			className: "gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), "Demo mode"]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: personas.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveId(item.id),
					className: cn("min-h-11 shrink-0 rounded-lg border px-4 py-2 text-left transition-colors", item.id === persona.id ? "border-primary bg-accent" : "border-border bg-surface hover:bg-accent/50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: item.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow mt-0.5",
						children: item.kind
					})]
				}, item.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-4 grid gap-6 p-6 lg:grid-cols-[auto_1fr_auto] lg:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadialScore, {
						value: persona.readiness.total,
						size: 168,
						caption: "Work Readiness"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: persona.kind
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl font-semibold",
							children: persona.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: persona.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground",
							children: persona.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									className: "gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), persona.verificationStatus]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: persona.hasResume ? "secondary" : "outline",
									children: persona.hasResume ? "Resume" : "No resume"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: persona.hasPortfolio ? "secondary" : "outline",
									children: persona.hasPortfolio ? "Portfolio" : "No portfolio"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: persona.hasGithub ? "secondary" : "outline",
									children: persona.hasGithub ? "GitHub" : "No GitHub"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-3 sm:grid-cols-3",
							children: dimensions.map((dimension) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border bg-surface p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium",
										children: dimension.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-display text-xl font-semibold",
										children: [dimension.value, "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: dimension.value,
										className: "mt-1.5 h-1.5"
									})
								]
							}, dimension.id))
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-md border border-border bg-card p-2 text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrBlock, {
									value: publicUrl,
									size: 96
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[11px] text-muted-foreground",
								children: persona.passportNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: publicPath,
									children: "Public passport"
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileStack, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: "Evidence sources"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 divide-y divide-border",
							children: persona.evidenceSources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: source.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [
										source.kind,
										" · ",
										source.note
									]
								})]
							}, source.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "Certificates"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-1.5 space-y-1 text-xs text-muted-foreground",
							children: persona.certificates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "mt-0.5 size-3.5 shrink-0 text-success" }), item]
							}, item))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow mt-3",
							children: "Projects"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: persona.projects.join(" · ")
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Skills & evidence quotes"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: persona.skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium",
											children: skill.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: skill.level
										}),
										skill.transferable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "outline",
											children: "Transferable"
										}) : null,
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-auto font-mono text-[11px] text-muted-foreground",
											children: [Math.round(skill.confidence * 100), "%"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: skill.confidence * 100,
									className: "mt-2 h-1.5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 rounded-md border-l-2 border-primary bg-background p-2 text-xs leading-relaxed",
									children: [
										"“",
										skill.quote,
										"”"
									]
								})
							]
						}, skill.name))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobMatchPanel, {
				matches: jobMatches,
				className: "mt-4",
				title: `Job matching & ranking — ${persona.name}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Learning roadmap"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-3",
						children: persona.roadmap.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-lg border border-border bg-surface p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium",
										children: [
											"Week ",
											step.week,
											" · ",
											step.focus
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: [step.hours, " ชม."]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-muted-foreground",
									children: step.action
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-success",
									children: ["ผลลัพธ์: ", step.outcome]
								})
							]
						}, step.week))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReadinessBreakdownPanel, {
				breakdown: persona.readiness,
				className: "mt-4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AntiBiasPanel, { className: "mt-4" })
		]
	});
}
//#endregion
export { PersonasPage as component };
