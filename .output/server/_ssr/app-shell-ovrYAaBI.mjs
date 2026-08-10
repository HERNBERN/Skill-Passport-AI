import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { i as useTheme, n as signOut, r as useSession } from "./session-C270IJ_y.mjs";
import { d as useRouterState, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as RefreshCcw, J as FileStack, P as LogOut, R as LayoutDashboard, U as Github, _t as BadgeCheck, c as Upload, et as Columns3, gt as BookOpen, h as Sparkles, ht as Bot, i as Users, j as Moon, p as Sun, pt as Briefcase, q as FileText, w as ScrollText, y as ShieldCheck, z as HeartHandshake } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-ovrYAaBI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/dashboard",
		label: "แดชบอร์ด",
		icon: LayoutDashboard,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/upload",
		label: "อัปโหลดหลักฐาน",
		icon: Upload,
		roles: ["candidate"]
	},
	{
		to: "/skills",
		label: "ทักษะและหลักฐาน",
		icon: FileStack,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/github",
		label: "วิเคราะห์ GitHub",
		icon: Github,
		roles: ["candidate"]
	},
	{
		to: "/passport",
		label: "พาสปอร์ตทักษะ",
		icon: BadgeCheck,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/reevaluate",
		label: "ขอประเมินใหม่",
		icon: RefreshCcw,
		roles: ["candidate"]
	},
	{
		to: "/documents",
		label: "ศูนย์เอกสาร",
		icon: FileText,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/jobs",
		label: "จับคู่งาน",
		icon: Briefcase,
		roles: ["candidate"]
	},
	{
		to: "/roadmap",
		label: "เส้นทางการเรียนรู้",
		icon: BookOpen,
		roles: ["candidate"]
	},
	{
		to: "/recruiter",
		label: "ค้นหาผู้สมัคร",
		icon: Users,
		roles: ["recruiter"]
	},
	{
		to: "/compare",
		label: "เปรียบเทียบผู้สมัคร",
		icon: Columns3,
		roles: ["recruiter", "reviewer"]
	},
	{
		to: "/review",
		label: "คิวการตรวจสอบ",
		icon: ShieldCheck,
		roles: ["reviewer"]
	},
	{
		to: "/audit",
		label: "ร่องรอยหลักฐาน",
		icon: ScrollText,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/personas",
		label: "โปรไฟล์ตัวอย่าง",
		icon: Sparkles,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/impact",
		label: "ผลลัพธ์ทางสังคม",
		icon: HeartHandshake,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	},
	{
		to: "/assistant",
		label: "ผู้ช่วย AI",
		icon: Bot,
		roles: [
			"candidate",
			"recruiter",
			"reviewer"
		]
	}
];
function AppShell({ title, description, actions, children }) {
	const { session, ready } = useSession();
	const navigate = useNavigate();
	const { dark, toggle } = useTheme();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		if (ready && !session) navigate({ to: "/auth" });
	}, [
		ready,
		session,
		navigate
	]);
	if (!ready || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading workspace…"
		})
	});
	const items = NAV.filter((item) => item.roles.includes(session.role));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 px-5 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-semibold",
							children: "SkillLens AI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "Skill Passport"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex-1 space-y-1 px-3 py-2",
					children: items.map((item) => {
						const active = pathname === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4" }), item.label]
						}, item.to);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-sidebar-border p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleCard, { session })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 px-4 py-4 sm:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "truncate font-display text-xl font-semibold sm:text-2xl",
							children: title
						}), description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 max-w-2xl text-sm text-muted-foreground",
							children: description
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							actions,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: toggle,
								"aria-label": "Toggle dark mode",
								children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": "Sign out",
								onClick: () => {
									signOut();
									navigate({ to: "/auth" });
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden",
					children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: cn("shrink-0 rounded-md px-3 py-1.5 text-xs", pathname === item.to ? "bg-accent font-medium text-accent-foreground" : "text-muted-foreground"),
						children: item.label
					}, item.to))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 py-6 sm:px-8 sm:py-8",
				children
			})]
		})]
	});
}
function RoleCard({ session }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface-raised p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-sm font-medium",
				children: session.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "truncate text-xs text-muted-foreground",
				children: session.email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "secondary",
				className: "mt-2 capitalize",
				children: session.role
			})
		]
	});
}
//#endregion
export { AppShell as t };
