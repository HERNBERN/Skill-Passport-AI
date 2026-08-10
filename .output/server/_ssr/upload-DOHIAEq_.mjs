import { i as __toESM } from "../_runtime.mjs";
import { a as jobRoles, c as skills, o as pipelineStages, r as evidenceFiles } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { F as LoaderCircle, H as Globe, K as FileUp, U as Github, tt as CloudUpload, ut as Check } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-ovrYAaBI.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-CCJRliUM.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { n as savePipelineState } from "./pipeline-state-B7tGPMm9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-DOHIAEq_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* AI Skill Extractor — MOCK
*
* คืนทักษะพร้อมหลักฐานจากชุดข้อมูลตัวอย่าง เพื่อให้ UI ทำงานได้ครบทุกฟีเจอร์
*
* TODO: Replace mock AI response with production LLM API
*  - เรียก LLM จากฝั่ง server เท่านั้น (process.env['AI_API_KEY'], process.env['AI_MODEL'])
*  - บังคับ JSON output ตาม schema ใน .github/copilot-instructions.md
*  - validate ด้วย zod และตรวจว่า quote ปรากฏจริงในเอกสารต้นฉบับ
*  - redact ฟิลด์ใน BIAS_EXCLUDED ก่อนส่งเข้าโมเดล
*/
async function extractSkills(input) {
	const requested = new Set(input.fileNames ?? []);
	return {
		skills: requested.size ? skills.filter((skill) => skill.evidence.some((item) => requested.has(item.sourceName))) : skills,
		stages: pipelineStages
	};
}
function normaliseSkill(skill) {
	return skill.trim().toLowerCase();
}
/**
* Job Matching — MOCK
*
* TODO: Implement real job matching
*  - ดึงตำแหน่งงานจริงจากฐานข้อมูล/ATS
*  - คำนวณ matchScore จากทักษะที่ตรง ถ่วงน้ำหนักด้วย level / confidence / สถานะ verified
*  - ทุก match ต้องมี justification ที่ลิงก์กลับไปยัง evidence จริง
*/
async function matchJobs(_candidateId, skillNames) {
	const owned = new Set(skillNames.map(normaliseSkill));
	return jobRoles.map((role) => {
		const matchingSkills = role.matchingSkills.filter((skill) => owned.has(normaliseSkill(skill)));
		const missingSkills = role.matchingSkills.filter((skill) => !owned.has(normaliseSkill(skill)));
		const baseScore = Math.round(matchingSkills.length / Math.max(1, role.matchingSkills.length) * 100);
		const matchScore = Math.min(100, baseScore + matchingSkills.length * 2);
		const rationale = matchingSkills.length ? `Evidence supports ${matchingSkills.join(", ")} for this role.` : "No direct skill evidence was found for the core requirements of this role.";
		return {
			...role,
			matchScore,
			matchingSkills,
			missingSkills,
			rationale
		};
	}).sort((a, b) => b.matchScore - a.matchScore);
}
var ACCEPTED = ".pdf,.docx,.pptx,.png,.jpg,.jpeg,.txt";
function UploadPage() {
	const [stage, setStage] = (0, import_react.useState)(-1);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [queued, setQueued] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("Ready to analyze evidence.");
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => () => {
		if (timerRef.current) clearInterval(timerRef.current);
	}, []);
	async function runPipeline(label, fileNames = [], urls = []) {
		if (running) return;
		setQueued((prev) => [label, ...prev]);
		setRunning(true);
		setStage(0);
		setStatus("Preparing AI analysis pipeline…");
		const promise = extractSkills({
			fileNames,
			urls
		});
		let current = 0;
		timerRef.current = setInterval(() => {
			current += 1;
			setStage(current);
			if (current >= pipelineStages.length - 1 && timerRef.current) clearInterval(timerRef.current);
		}, 600);
		try {
			const { skills } = await promise;
			const jobMatches = await matchJobs("c1", skills.map((skill) => skill.name));
			savePipelineState(skills, jobMatches);
			setStatus(`AI pipeline completed. Extracted ${skills.length} skills and matched ${jobMatches.length} roles.`);
			toast.success("วิเคราะห์เสร็จสิ้น", { description: "สร้าง Skill Passport และ Job Matching แล้ว — ดูผลลัพธ์ได้ที่หน้า Passport และ Jobs" });
		} catch (error) {
			console.error(error);
			setStatus("AI pipeline failed. Please try again.");
			toast.error("เกิดข้อผิดพลาดระหว่างการวิเคราะห์", { description: "ลองรีเฟรชหน้าแล้วรัน pipeline ใหม่อีกครั้ง" });
		} finally {
			setRunning(false);
			setStage(pipelineStages.length - 1);
			if (timerRef.current) clearInterval(timerRef.current);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Smart Upload",
		description: "รองรับ PDF, DOCX, PPTX, PNG, JPG, TXT รวมถึง GitHub URL, Portfolio URL, Resume Text และ Job Description",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
					defaultValue: "files",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "files",
								children: "Files"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "links",
								children: "Links"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "text",
								children: "Text"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "files",
							className: "mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								htmlFor: "file-input",
								className: "panel flex cursor-pointer flex-col items-center justify-center gap-3 border-dashed p-10 text-center transition-colors hover:bg-accent/40",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "size-8 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-base font-semibold",
										children: "ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: "PDF · DOCX · PPTX · PNG · JPG · TXT — สูงสุด 20MB ต่อไฟล์"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "file-input",
										type: "file",
										className: "sr-only",
										accept: ACCEPTED,
										multiple: true,
										onChange: (event) => {
											const names = Array.from(event.target.files ?? []).map((f) => f.name);
											if (names.length) runPipeline("Uploaded files", names);
										}
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "mt-4",
								onClick: () => runPipeline("Demo evidence bundle", evidenceFiles.map((file) => file.name)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-4" }), "ใช้ชุดข้อมูลตัวอย่าง"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "links",
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "gh",
										children: "GitHub URL หรือ Username"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "gh",
										placeholder: "https://github.com/nattapong-dev/skillgraph-api"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "portfolio",
										children: "Portfolio URL"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "portfolio",
										placeholder: "https://nattapong.dev"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => runPipeline("GitHub repository"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }), "วิเคราะห์ Repository"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										onClick: () => runPipeline("Portfolio website"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }), "วิเคราะห์ Portfolio"]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
							value: "text",
							className: "mt-4 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "resume",
										children: "Resume Text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "resume",
										rows: 6,
										placeholder: "วางข้อความเรซูเม่ที่นี่…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "jd",
										children: "Job Description"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "jd",
										rows: 5,
										placeholder: "วางรายละเอียดตำแหน่งงานเพื่อเทียบ Match Score…"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => runPipeline("Pasted resume text"),
									children: "วิเคราะห์ข้อความ"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "Analysis pipeline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "ทุกขั้นตอนแสดงสถานะจริง เพื่อให้ตรวจสอบย้อนกลับได้ว่าผลลัพธ์มาจากไหน"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: stage < 0 ? 0 : (stage + 1) / pipelineStages.length * 100,
							className: "mt-4 h-1.5"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 space-y-2",
							children: pipelineStages.map((label, index) => {
								const done = stage > index || stage === pipelineStages.length - 1 && !running;
								const active = running && stage === index;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: cn("flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm", active && "bg-accent", done && "text-foreground", !done && !active && "text-muted-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex size-5 items-center justify-center rounded-full border border-border-strong",
										children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-success" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-[10px]",
											children: index + 1
										})
									}), label]
								}, label);
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "Queued in this session"
					}), queued.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "ยังไม่มีรายการในรอบนี้ — เริ่มด้วยการอัปโหลดหรือใช้ชุดข้อมูลตัวอย่าง"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: queued.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "truncate rounded-md bg-surface px-3 py-2 text-sm",
							children: item
						}, `${item}-${index}`))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: "Existing evidence"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: evidenceFiles.map((file) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border bg-surface p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-medium",
								children: file.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: "secondary",
									children: file.kind
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[11px] text-muted-foreground",
									children: [file.extractedSkills, " skills"]
								})]
							})]
						}, file.id))
					})]
				})]
			})]
		})
	});
}
//#endregion
export { UploadPage as component };
