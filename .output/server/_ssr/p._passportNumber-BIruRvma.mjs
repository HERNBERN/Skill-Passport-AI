import { c as skills } from "./demo-D_HVL5mM.mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _t as BadgeCheck, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as PassportDocument } from "./passport-document-8WvuOhqg.mjs";
import { n as Route } from "./router-cy5FOuUQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._passportNumber-BIruRvma.js
var import_jsx_runtime = require_jsx_runtime();
function PublicPassport() {
	const { candidate } = Route.useLoaderData();
	const publicUrl = typeof window === "undefined" ? "" : window.location.href;
	const verifiedSkills = skills.filter((skill) => skill.verified);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "border-b border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-sm font-semibold",
						children: "SkillLens AI"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), "Public verification"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-5xl px-6 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassportDocument, {
				candidate,
				skills: verifiedSkills,
				publicUrl
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "หน้าสาธารณะนี้แสดงเฉพาะทักษะที่ผ่านการยืนยันแล้ว ข้อมูลติดต่อและไฟล์ต้นฉบับไม่ถูกเปิดเผย"
			})]
		})]
	});
}
//#endregion
export { PublicPassport as component };
