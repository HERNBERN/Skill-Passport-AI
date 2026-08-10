import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, i as githubRepos, n as candidates, r as evidenceFiles } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { A as Printer } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-C7wB0cgT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var candidate = candidates[0];
var verified = skills.filter((skill) => skill.verified);
function DocumentsPage() {
	const [tab, setTab] = (0, import_react.useState)("resume");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Document Centre",
		description: "เอกสารทางการที่สร้างจากทักษะและหลักฐานที่ยืนยันแล้ว",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			size: "sm",
			variant: "outline",
			onClick: () => window.print(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "size-4" }), "Print / Export PDF"]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: tab,
			onValueChange: setTab,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "flex-wrap",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "resume",
							children: "Resume (ATS)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "portfolio",
							children: "Portfolio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "verification",
							children: "Verification Report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "candidate",
							children: "Candidate Report"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "resume",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold uppercase tracking-wide",
							children: candidate.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								candidate.headline,
								" · Bangkok, Thailand · ",
								candidate.email,
								" · github.com/",
								candidate.githubUser
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Professional Summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Software engineer with ",
								candidate.experienceYears,
								"+ year of production experience across backend services and data-intensive applications. Evidence-verified strengths in",
								" ",
								verified.slice(0, 4).map((s) => s.name).join(", "),
								". Delivered measurable outcomes including a 77% p95 latency reduction and a coverage increase from 41% to 86%."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Experience",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "Backend Engineer Intern — Siam Digital Co., Ltd."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Jun 2025 – Dec 2025 · Bangkok"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-2 list-disc space-y-1 pl-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Delivered 14 REST endpoints in Node.js, TypeScript and PostgreSQL serving 40,000 monthly requests." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Introduced Redis caching, reducing p95 latency from 820 ms to 190 ms." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Authored 120+ integration tests, raising service coverage from 41% to 86%." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Containerised the notifications service and shipped 11 zero-downtime blue-green releases to AWS ECS." })
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: "Projects",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "SkillGraph — Senior Project"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-2 list-disc space-y-1 pl-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Built a knowledge-graph recommender with Python, FastAPI and PostgreSQL (pgvector, IVFFlat)." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Improved Precision@5 from 0.41 to 0.68 versus a TF-IDF baseline (paired t-test, p < 0.01)." }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Automated build, test and deployment with GitHub Actions and Docker." })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Education",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"B.Eng Computer Engineering — ",
								candidate.university,
								" (GPA 3.62)"
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Skills",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: verified.map((skill) => skill.name).join(" · ") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Certifications",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "AWS Certified Cloud Practitioner — CP-88213-TH (Mar 2026)" })
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "portfolio",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Professional Portfolio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								candidate.name,
								" · nattapong.dev · github.com/",
								candidate.githubUser
							]
						}),
						githubRepos.map((repo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
							title: repo.name.split("/")[1] ?? repo.name,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow",
									children: "Project overview"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1",
									children: [
										repo.commits,
										" commits across ",
										repo.contributors,
										" contributor(s), ",
										repo.stars,
										" stars. Focus areas: ",
										repo.topics.join(", "),
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow mt-3",
									children: "Tech stack"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 flex flex-wrap gap-1.5",
									children: Object.keys(repo.languages).map((language) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "secondary",
										children: language
									}, language))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-eyebrow mt-3",
									children: "Outcome"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1",
									children: ["Documented, tested and deployed; source available at https://github.com/", repo.name]
								})
							]
						}, repo.name))
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "verification",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Skill Verification Report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Passport ",
								candidate.passportNumber,
								" · Status ",
								candidate.verificationStatus,
								" · Issued",
								" ",
								(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Executive Summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								candidate.name,
								" holds ",
								verified.length,
								" verified skills supported by",
								" ",
								skills.reduce((total, skill) => total + skill.evidence.length, 0),
								" discrete evidence items drawn from ",
								evidenceFiles.length,
								" source documents and",
								" ",
								githubRepos.length,
								" public repositories. Overall work readiness is assessed at",
								" ",
								candidate.workReadiness,
								"%."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Skill Assessment",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: skills.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-40 font-medium",
											children: skill.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: "secondary",
											children: skill.level
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-mono text-xs text-muted-foreground",
											children: [
												Math.round(skill.confidence * 100),
												"% · ",
												skill.evidence.length,
												" evidence"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: skill.verified ? "default" : "outline",
											children: skill.verified ? "Verified" : "Unverified"
										})
									]
								}, skill.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Evidence Summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-1 pl-5",
								children: evidenceFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									file.name,
									" — ",
									file.kind,
									", ",
									file.pages,
									" page(s), ",
									file.extractedSkills,
									" skills extracted."
								] }, file.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Verification Level",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Level 2 — Document- and repository-backed. Skills flagged Unverified require reviewer confirmation before they may be cited in hiring decisions." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Recommendations",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Proceed to technical interview focused on backend system design. Request supplementary evidence for Team Leadership and UI Design before assessing those competencies." })
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "candidate",
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl font-semibold",
							children: "Candidate Report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted-foreground",
							children: [
								"Prepared for interview panels · ",
								candidate.name,
								" · ",
								candidate.university
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Candidate Information",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								candidate.name,
								" — ",
								candidate.headline,
								". ",
								candidate.experienceYears,
								" year(s) of experience. Passport ",
								candidate.passportNumber,
								"."
							] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Experience",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Backend Engineer Intern at Siam Digital (6 months, owned the notifications service); senior project lead on SkillGraph; hackathon team lead for a 5-person team." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Skills & Supporting Evidence",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: verified.slice(0, 6).map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: skill.name
									}),
									" —",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted-foreground",
										children: [
											"“",
											skill.evidence[0]?.quote.slice(0, 120),
											"…” (",
											skill.evidence[0]?.sourceName,
											")"
										]
									})
								] }, skill.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-5" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Strengths",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Measurable performance engineering, disciplined testing, containerised delivery, and research-grade evaluation methodology." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Development Areas",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Event-driven architecture, large-scale system design, model serving, and accessibility practice." })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Role Fit",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "list-disc space-y-1 pl-5",
								children: jobRoles.slice().sort((a, b) => b.matchScore - a.matchScore).slice(0, 4).map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									role.title,
									" — ",
									role.matchScore,
									"% match. ",
									role.rationale
								] }, role.id))
							})
						})
					] })
				})
			]
		})
	});
}
function Sheet({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
		className: "panel mx-auto max-w-3xl space-y-4 p-8 text-sm leading-relaxed",
		children
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "pt-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "border-b border-border pb-1 font-display text-sm font-semibold uppercase tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 space-y-1",
			children
		})]
	});
}
//#endregion
export { DocumentsPage as component };
