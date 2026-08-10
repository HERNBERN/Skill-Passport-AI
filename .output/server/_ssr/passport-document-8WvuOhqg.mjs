import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { _t as BadgeCheck, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as QRCodeSVG } from "../_libs/qrcode.react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/passport-document-8WvuOhqg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function QrBlock({ value, size }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			width: size,
			height: size
		},
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QRCodeSVG, {
		value: value || "https://skilllens.ai",
		size,
		bgColor: "transparent",
		fgColor: "currentColor"
	});
}
function PassportDocument({ candidate, skills, publicUrl }) {
	const verified = skills.filter((skill) => skill.verified);
	const evidenceCount = skills.reduce((total, skill) => total + skill.evidence.length, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-6 border-b border-border bg-surface p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "SkillLens AI · Digital Skill Passport"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl font-semibold",
						children: candidate.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: candidate.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: candidate.university
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-xs sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Passport No.",
								value: candidate.passportNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Issued",
								value: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Authority",
								value: "SkillLens AI Registry"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-border bg-card p-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrBlock, {
							value: publicUrl,
							size: 92
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						className: "gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), candidate.verificationStatus]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 p-6 lg:grid-cols-[1.5fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base font-semibold",
						children: "Verified skills"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-border",
						children: verified.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center gap-3 py-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4 shrink-0 text-success" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate text-sm font-medium",
									children: skill.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: skill.level
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [
										Math.round(skill.confidence * 100),
										"% · ",
										skill.evidence.length,
										" ev."
									]
								})
							]
						}, skill.id))
					}),
					skills.length > verified.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: [skills.length - verified.length, " skill(s) are recorded as Unverified and are excluded from the verified list until a reviewer confirms the evidence."]
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold",
								children: "Work readiness"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-3xl font-semibold",
								children: [candidate.workReadiness, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: candidate.workReadiness,
								className: "mt-2 h-1.5"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base font-semibold",
							children: "Evidence summary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-2 space-y-1.5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Evidence items",
									value: String(evidenceCount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Verified skills",
									value: `${verified.length}/${skills.length}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Document sources",
									value: String(new Set(skills.flatMap((s) => s.evidence.map((e) => e.sourceName))).size)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "GitHub user",
									value: candidate.githubUser
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-base font-semibold",
								children: "Digital signature"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 break-all font-mono text-[11px] text-muted-foreground",
								children: "sha256:9f2c1e84b7d3a5601f8ce27b4d0a91c6f3e8b5227ad4c19e60b8f7413d2a5c88"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Signed by SkillLens AI Registry · verifiable via the public passport link."
							})
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-border bg-surface px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold",
					children: "Skill timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						{
							date: "2025-06",
							label: "Backend internship begins — Docker, CI/CD, AWS evidence"
						},
						{
							date: "2026-01",
							label: "Senior project submitted — Python, PostgreSQL, research evidence"
						},
						{
							date: "2026-03",
							label: "AWS Cloud Practitioner certificate issued"
						},
						{
							date: "2026-07",
							label: "Evidence bundle analysed and passport issued"
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted-foreground",
							children: item.date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: item.label
						})]
					}, item.date))
				})]
			})
		]
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-eyebrow",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5 font-mono text-[11px]",
		children: value
	})] });
}
function Row({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-xs",
			children: value
		})]
	});
}
//#endregion
export { QrBlock as n, PassportDocument as t };
