import { i as __toESM } from "../_runtime.mjs";
import { t as DEMO_ACCOUNTS } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { r as useSession, t as signIn } from "./session-C270IJ_y.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as LoaderCircle, N as Mail, U as Github, _t as BadgeCheck } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-yo_zuFst.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const navigate = useNavigate();
	const { session, ready } = useSession();
	const [email, setEmail] = (0, import_react.useState)("candidate.demo@example.com");
	const [password, setPassword] = (0, import_react.useState)("Demo@1234");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (ready && session) navigate({ to: "/dashboard" });
	}, [
		ready,
		session,
		navigate
	]);
	function submit(nextEmail, nextPassword) {
		setBusy(true);
		window.setTimeout(() => {
			const result = signIn(nextEmail, nextPassword);
			setBusy(false);
			if (!result) {
				toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง", { description: "ใช้บัญชีทดลองด้านล่างเพื่อเข้าสู่ระบบ" });
				return;
			}
			toast.success(`ยินดีต้อนรับ ${result.name}`);
			navigate({ to: "/dashboard" });
		}, 450);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden flex-col justify-between border-r border-border bg-sidebar p-10 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-base font-semibold",
						children: "SkillLens AI"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "ทุก Skill ต้องมีหลักฐานรองรับ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-muted-foreground",
						children: "ระบบไม่แสดงคะแนนหรือทักษะที่ AI คาดเดาเอง ทุกผลลัพธ์อ้างอิงจากไฟล์ หน้า ย่อหน้า หรือ commit ที่ผู้ใช้อัปโหลดเท่านั้น"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Demo environment · No production data"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-center justify-center px-6 py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold",
						children: "เข้าสู่ระบบ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Sign in to your SkillLens AI workspace."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "login",
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "login",
										className: "flex-1",
										children: "Login"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "register",
										className: "flex-1",
										children: "Register"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "forgot",
										className: "flex-1",
										children: "Reset"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "login",
								className: "mt-5 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										className: "space-y-4",
										onSubmit: (event) => {
											event.preventDefault();
											submit(email, password);
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "email",
													children: "Email"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "email",
													type: "email",
													autoComplete: "email",
													value: email,
													onChange: (event) => setEmail(event.target.value),
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "password",
													children: "Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "password",
													type: "password",
													autoComplete: "current-password",
													value: password,
													onChange: (event) => setPassword(event.target.value),
													required: true
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												type: "submit",
												className: "w-full",
												disabled: busy,
												children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : null, "เข้าสู่ระบบ"]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative py-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground",
											children: "หรือ"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid gap-2",
										children: [
											"Google",
											"GitHub",
											"Microsoft"
										].map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											variant: "outline",
											onClick: () => toast.info(`Social login (${provider}) พร้อมเชื่อมต่อ`, { description: "โครงสร้างพร้อมสำหรับ OAuth จริง — ใช้บัญชีทดลองในโหมด Demo" }),
											children: [
												provider === "GitHub" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-4" }),
												"Continue with ",
												provider
											]
										}, provider))
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "register",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground",
									children: "การสมัครสมาชิกจริงจะเปิดใช้งานเมื่อเชื่อมต่อฐานข้อมูลและระบบยืนยันอีเมล ในโหมด Demo กรุณาใช้บัญชีทดลองด้านล่าง"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "forgot",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground",
									children: "ลิงก์รีเซ็ตรหัสผ่านจะถูกส่งทางอีเมลเมื่อเชื่อมต่อระบบผู้ใช้จริง"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-eyebrow",
							children: "บัญชีทดลอง"
						}), Object.entries(DEMO_ACCOUNTS).map(([demoEmail, account]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-left transition-colors hover:bg-accent",
							onClick: () => {
								setEmail(demoEmail);
								setPassword(account.password);
								submit(demoEmail, account.password);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate font-mono text-xs",
									children: demoEmail
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-mono text-[11px] text-muted-foreground",
									children: account.password
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "ml-2 shrink-0 capitalize",
								children: account.role
							})]
						}, demoEmail))]
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
