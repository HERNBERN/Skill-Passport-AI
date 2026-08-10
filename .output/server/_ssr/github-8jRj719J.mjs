import { i as __toESM } from "../_runtime.mjs";
import { c as skills, i as githubRepos } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { U as Github, W as GitCommitHorizontal, i as Users, m as Star } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { n as EvidenceItem } from "./skill-evidence-DItBqdZ7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/github-8jRj719J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var githubEvidence = skills.flatMap((skill) => skill.evidence).filter((evidence) => evidence.sourceType === "github");
function GithubPage() {
	const [target, setTarget] = (0, import_react.useState)("nattapong-dev");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "GitHub Analyzer",
		description: "วิเคราะห์ Repository URL หรือ GitHub Username เพื่อสกัดทักษะจากโค้ดจริง",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-wrap gap-2",
				onSubmit: (event) => {
					event.preventDefault();
					toast.success(`วิเคราะห์ ${target} เรียบร้อย`, { description: "ผลลัพธ์ด้านล่างมาจากชุดข้อมูลตัวอย่างในโหมด Demo" });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: target,
					onChange: (event) => setTarget(event.target.value),
					placeholder: "repository URL หรือ username",
					className: "min-w-56 flex-1",
					"aria-label": "GitHub repository or username"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }), "วิเคราะห์"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 lg:grid-cols-3",
				children: githubRepos.map((repo) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "truncate font-display text-base font-semibold",
							children: repo.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3" }), repo.stars]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitCommitHorizontal, { className: "size-3" }),
										repo.commits,
										" commits"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-3" }), repo.contributors]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: repo.topics.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "secondary",
								children: topic
							}, topic))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: Object.entries(repo.languages).map(([language, share]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: language }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-muted-foreground",
									children: [share, "%"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
								value: share,
								className: "mt-1 h-1.5"
							})] }, language))
						})
					]
				}, repo.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: "Skills derived from repositories"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "ทุกทักษะอ้างอิงไฟล์ commit และหมายเลขบรรทัดที่ตรวจสอบย้อนกลับได้"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-2",
						children: githubEvidence.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceItem, { evidence }, evidence.id))
					})
				]
			})
		]
	});
}
//#endregion
export { GithubPage as component };
