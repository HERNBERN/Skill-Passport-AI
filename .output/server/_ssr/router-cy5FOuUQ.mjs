import { i as __toESM } from "../_runtime.mjs";
import { n as candidates } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, z as notFound } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-cy5FOuUQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-C3o1ZuAG.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$19 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SkillLens AI — AI Skill Passport Platform" },
			{
				name: "description",
				content: "Turn learning evidence into a verifiable Digital Skill Passport. Every skill is traced back to its source document, repository or portfolio."
			},
			{
				name: "author",
				content: "SkillLens AI"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Noto+Sans+Thai:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$19.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})]
	});
}
var $$splitComponentImporter$18 = () => import("./routes-DawXdXKy.mjs");
var Route$18 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "SkillLens AI — Verifiable AI Skill Passport" },
		{
			name: "description",
			content: "SkillLens AI analyses resumes, portfolios, GitHub repos and academic work to build an explainable, evidence-linked Digital Skill Passport."
		},
		{
			property: "og:title",
			content: "SkillLens AI — Verifiable AI Skill Passport"
		},
		{
			property: "og:description",
			content: "Skills-based hiring with explainable AI. Every skill traces back to a page, paragraph or commit."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./assistant-ChNDl30e.mjs");
var Route$17 = createFileRoute("/assistant")({
	head: () => ({ meta: [
		{ title: "AI Assistant — SkillLens AI" },
		{
			name: "description",
			content: "Ask where a skill came from, why a match score is low, or what to learn next. Every answer cites the evidence behind it."
		},
		{
			property: "og:title",
			content: "AI Assistant — SkillLens AI"
		},
		{
			property: "og:description",
			content: "An evidence-grounded assistant that refuses to answer without a citation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./audit-TfBRoFJQ.mjs");
var Route$16 = createFileRoute("/audit")({
	head: () => ({ meta: [
		{ title: "ร่องรอยการตรวจสอบหลักฐาน — SkillLens AI" },
		{
			name: "description",
			content: "บันทึกทุกการอัปโหลดหลักฐาน ทุกขั้นตอนการสกัดข้อมูลด้วย AI และทุกการอ้างอิงทักษะกับหลักฐาน เพื่อตรวจย้อนกลับได้ทั้งสาย"
		},
		{
			property: "og:title",
			content: "ร่องรอยการตรวจสอบหลักฐาน — SkillLens AI"
		},
		{
			property: "og:description",
			content: "ตรวจสอบลำดับเวลาของหลักฐานทั้งหมด ตั้งแต่ไฟล์ต้นฉบับจนถึงคะแนนในพาสปอร์ต"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./auth-yo_zuFst.mjs");
var Route$15 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in — SkillLens AI" },
		{
			name: "description",
			content: "Sign in to SkillLens AI or use a demo account for candidate, recruiter or reviewer."
		},
		{
			property: "og:title",
			content: "Sign in — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Access your evidence-linked Digital Skill Passport."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./compare-AcAcr2rh.mjs");
var Route$14 = createFileRoute("/compare")({
	head: () => ({ meta: [
		{ title: "เปรียบเทียบผู้สมัคร — SkillLens AI" },
		{
			name: "description",
			content: "จัดอันดับผู้สมัครหลายคนแบบเทียบข้างกัน พร้อมเหตุผลที่อ้างอิงหลักฐานจริงและตัวกรองการจัดอันดับ"
		},
		{
			property: "og:title",
			content: "เปรียบเทียบผู้สมัคร — SkillLens AI"
		},
		{
			property: "og:description",
			content: "คัดเลือกด้วยทักษะและหลักฐาน ไม่ใช่ชื่อสถาบันหรือข้อมูลส่วนตัว"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./dashboard-FlFYlCtv.mjs");
var Route$13 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "Dashboard — SkillLens AI" },
		{
			name: "description",
			content: "Verified skills, evidence coverage and work readiness at a glance."
		},
		{
			property: "og:title",
			content: "Dashboard — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Evidence coverage and work readiness overview."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
/** Benchmark for the target role (Backend Developer). */
var $$splitComponentImporter$12 = () => import("./documents-C7wB0cgT.mjs");
var Route$12 = createFileRoute("/documents")({
	head: () => ({ meta: [
		{ title: "Document Centre — SkillLens AI" },
		{
			name: "description",
			content: "Generate an ATS-friendly resume, professional portfolio, skill verification report and candidate report from verified evidence."
		},
		{
			property: "og:title",
			content: "Document Centre — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Formal, professional documents ready for real job applications and hiring panels."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./github-8jRj719J.mjs");
var Route$11 = createFileRoute("/github")({
	head: () => ({ meta: [
		{ title: "GitHub Analyzer — SkillLens AI" },
		{
			name: "description",
			content: "Analyse repositories and usernames: languages, manifests, Dockerfiles, workflows, commits and contributors become cited skills."
		},
		{
			property: "og:title",
			content: "GitHub Analyzer — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Turn repository signals into skills with line-level evidence."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./impact-DzbIMvS1.mjs");
var Route$10 = createFileRoute("/impact")({
	head: () => ({ meta: [
		{ title: "Social Impact Dashboard — SkillLens AI" },
		{
			name: "description",
			content: "Social impact metrics for SkillLens AI: passports issued for NEET youth, interviews granted, hires reported, skill-gap closure and success stories."
		},
		{
			property: "og:title",
			content: "Social Impact Dashboard — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Measurable outcomes: readiness lift, skill-gap closure and hiring results by cohort."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./jobs-DBi-cCRz.mjs");
var Route$9 = createFileRoute("/jobs")({
	head: () => ({ meta: [
		{ title: "Job Matching — SkillLens AI" },
		{
			name: "description",
			content: "Explainable match scores across engineering, AI, design and analytics roles with matching skills, gaps and rationale."
		},
		{
			property: "og:title",
			content: "Job Matching — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Every match score comes with the reasoning and the gap analysis behind it."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./passport-DlFvjuO5.mjs");
var Route$8 = createFileRoute("/passport")({
	head: () => ({ meta: [
		{ title: "Digital Skill Passport — SkillLens AI" },
		{
			name: "description",
			content: "An official-format Digital Skill Passport with passport number, QR code, verification status, evidence summary and digital signature."
		},
		{
			property: "og:title",
			content: "Digital Skill Passport — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Export, print, download as JSON or share a public verification link."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./personas-Ci7ddHBf.mjs");
var Route$7 = createFileRoute("/personas")({
	head: () => ({ meta: [
		{ title: "Demo Personas — SkillLens AI" },
		{
			name: "description",
			content: "Five demo personas — CS student, design student, career changer, NEET youth and micro-entrepreneur — each with evidence, skill passport, job matching and a learning roadmap."
		},
		{
			property: "og:title",
			content: "Demo Personas — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Explore evidence, passports, job matches and roadmaps for five representative personas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./recruiter-BXpBQF1a.mjs");
var Route$6 = createFileRoute("/recruiter")({
	head: () => ({ meta: [
		{ title: "Talent Search — SkillLens AI" },
		{
			name: "description",
			content: "Search, filter and compare candidates on evidence-backed skills with a skill matrix, radar comparison and recommendations."
		},
		{
			property: "og:title",
			content: "Talent Search — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Skills-based shortlisting with evidence you can open and check."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./reevaluate-Dha1KG_S.mjs");
var Route$5 = createFileRoute("/reevaluate")({
	head: () => ({ meta: [
		{ title: "ขอประเมินใหม่ — SkillLens AI" },
		{
			name: "description",
			content: "ส่งหลักฐานใหม่เพื่อขอประเมินทักษะอีกครั้ง ระบบจะอัปเดตพาสปอร์ต การจับคู่งาน และสรุปสิ่งที่เปลี่ยนแปลงให้ทันที"
		},
		{
			property: "og:title",
			content: "ขอประเมินใหม่ — SkillLens AI"
		},
		{
			property: "og:description",
			content: "หลักฐานใหม่ → คะแนนความพร้อมใหม่ → ผลจับคู่งานใหม่ พร้อมสรุปการเปลี่ยนแปลงทุกบรรทัด"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./review-MXfFnOjf.mjs");
var Route$4 = createFileRoute("/review")({
	head: () => ({ meta: [
		{ title: "Verification Queue — SkillLens AI" },
		{
			name: "description",
			content: "Faculty and assessors review the underlying evidence and issue digital verification for each claimed skill."
		},
		{
			property: "og:title",
			content: "Verification Queue — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Approve or reject skills based on the original evidence, not on AI guesses."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./roadmap-DS7QjUg2.mjs");
var Route$3 = createFileRoute("/roadmap")({
	head: () => ({ meta: [
		{ title: "Learning Roadmap — SkillLens AI" },
		{
			name: "description",
			content: "A weekly learning roadmap derived from real skill gaps: courses, projects, certificates, effort and expected outcomes."
		},
		{
			property: "og:title",
			content: "Learning Roadmap — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Close the gaps that job matching found, one week at a time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./skills-WwGx8tWX.mjs");
var Route$2 = createFileRoute("/skills")({
	head: () => ({ meta: [
		{ title: "Skills & Evidence Explorer — SkillLens AI" },
		{
			name: "description",
			content: "Browse extracted skills and open the source document, page and paragraph behind every claim."
		},
		{
			property: "og:title",
			content: "Skills & Evidence Explorer — SkillLens AI"
		},
		{
			property: "og:description",
			content: "Split-screen document viewer with highlighted evidence and AI reasoning."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./upload-DOHIAEq_.mjs");
var Route$1 = createFileRoute("/upload")({
	head: () => ({ meta: [
		{ title: "Smart Upload — SkillLens AI" },
		{
			name: "description",
			content: "Upload PDF, DOCX, PPTX, images or text, or link a GitHub repo and portfolio, then watch the analysis pipeline run."
		},
		{
			property: "og:title",
			content: "Smart Upload — SkillLens AI"
		},
		{
			property: "og:description",
			content: "A transparent seven-stage pipeline from OCR to Skill Passport generation."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitNotFoundComponentImporter = () => import("./p._passportNumber-x87oCw5h.mjs");
var $$splitComponentImporter = () => import("./p._passportNumber-BIruRvma.mjs");
var Route = createFileRoute("/p/$passportNumber")({
	loader: ({ params }) => {
		const candidate = candidates.find((item) => item.passportNumber === params.passportNumber);
		if (!candidate) throw notFound();
		return { candidate };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Passport unavailable — SkillLens AI" }, {
			name: "robots",
			content: "noindex"
		}] };
		const title = `${loaderData.candidate.name} — Public Skill Passport`;
		return { meta: [
			{ title },
			{
				name: "description",
				content: `Verified, evidence-linked skills for ${loaderData.candidate.name} (${loaderData.candidate.passportNumber}).`
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: "Public verification of an evidence-linked Digital Skill Passport."
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var rootRouteChildren = {
	IndexRoute: Route$18.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$19
	}),
	AssistantRoute: Route$17.update({
		id: "/assistant",
		path: "/assistant",
		getParentRoute: () => Route$19
	}),
	AuditRoute: Route$16.update({
		id: "/audit",
		path: "/audit",
		getParentRoute: () => Route$19
	}),
	AuthRoute: Route$15.update({
		id: "/auth",
		path: "/auth",
		getParentRoute: () => Route$19
	}),
	CompareRoute: Route$14.update({
		id: "/compare",
		path: "/compare",
		getParentRoute: () => Route$19
	}),
	DashboardRoute: Route$13.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$19
	}),
	DocumentsRoute: Route$12.update({
		id: "/documents",
		path: "/documents",
		getParentRoute: () => Route$19
	}),
	GithubRoute: Route$11.update({
		id: "/github",
		path: "/github",
		getParentRoute: () => Route$19
	}),
	ImpactRoute: Route$10.update({
		id: "/impact",
		path: "/impact",
		getParentRoute: () => Route$19
	}),
	JobsRoute: Route$9.update({
		id: "/jobs",
		path: "/jobs",
		getParentRoute: () => Route$19
	}),
	PassportRoute: Route$8.update({
		id: "/passport",
		path: "/passport",
		getParentRoute: () => Route$19
	}),
	PersonasRoute: Route$7.update({
		id: "/personas",
		path: "/personas",
		getParentRoute: () => Route$19
	}),
	RecruiterRoute: Route$6.update({
		id: "/recruiter",
		path: "/recruiter",
		getParentRoute: () => Route$19
	}),
	ReevaluateRoute: Route$5.update({
		id: "/reevaluate",
		path: "/reevaluate",
		getParentRoute: () => Route$19
	}),
	ReviewRoute: Route$4.update({
		id: "/review",
		path: "/review",
		getParentRoute: () => Route$19
	}),
	RoadmapRoute: Route$3.update({
		id: "/roadmap",
		path: "/roadmap",
		getParentRoute: () => Route$19
	}),
	SkillsRoute: Route$2.update({
		id: "/skills",
		path: "/skills",
		getParentRoute: () => Route$19
	}),
	UploadRoute: Route$1.update({
		id: "/upload",
		path: "/upload",
		getParentRoute: () => Route$19
	}),
	PPassportNumberRoute: Route.update({
		id: "/p/$passportNumber",
		path: "/p/$passportNumber",
		getParentRoute: () => Route$19
	})
};
var routeTree = Route$19._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route as n, router_exports as t };
