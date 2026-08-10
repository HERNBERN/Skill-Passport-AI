import { i as __toESM } from "../_runtime.mjs";
import { c as skills } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { v as ShieldX, y as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as EvidenceItem } from "./skill-evidence-DItBqdZ7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/review-MXfFnOjf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReviewPage() {
	const [decisions, setDecisions] = (0, import_react.useState)({});
	function decide(id, name, decision) {
		setDecisions((prev) => ({
			...prev,
			[id]: decision
		}));
		toast.success(decision === "approved" ? `ยืนยันทักษะ ${name} แล้ว` : `ปฏิเสธทักษะ ${name}`, { description: "บันทึกการตัดสินใจพร้อม Digital Verification ในโหมด Demo" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Verification Queue",
		description: "ตรวจสอบหลักฐาน ยืนยันความถูกต้อง และออก Digital Verification",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: skills.map((skill) => {
				const decision = decisions[skill.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-lg font-semibold",
								children: skill.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-eyebrow mt-1",
								children: [
									skill.category,
									" · ",
									skill.level,
									" · ",
									Math.round(skill.confidence * 100),
									"% confidence"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: cn(decision === "rejected" && "bg-destructive text-destructive-foreground"),
									children: decision === "approved" ? "Verified by reviewer" : "Rejected"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "outline",
									children: skill.verified ? "Verified" : "Pending"
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid gap-4 lg:grid-cols-2",
							children: skill.evidence.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceItem, { evidence }, evidence.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => decide(skill.id, skill.name, "approved"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4" }), "ยืนยันหลักฐาน"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => decide(skill.id, skill.name, "rejected"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldX, { className: "size-4" }), "ไม่ผ่านการตรวจสอบ"]
							})]
						})
					]
				}, skill.id);
			})
		})
	});
}
//#endregion
export { ReviewPage as component };
