import { i as __toESM } from "../_runtime.mjs";
import { r as evidenceFiles } from "./demo-D_HVL5mM.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { $ as Download, C as Search, E as RotateCw, M as Maximize2, lt as ChevronDown, n as ZoomIn, r as X, st as ChevronUp, t as ZoomOut } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evidence-viewer-HC0fT854.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Split a cited quote into the individual fragments that should be highlighted. */
function quoteFragments(quote) {
	return quote.split(/\n|(?<=[.!?])\s+|•/g).map((part) => part.replace(/^[\s•\-–—"“”]+|[\s"“”]+$/g, "").trim()).filter((part) => part.length > 12);
}
function normalise(value) {
	return value.toLowerCase().replace(/\s+/g, " ");
}
/** Highlight the exact passages of `text` that the AI cited, at substring level. */
function segmentLine(line, fragments) {
	const haystack = normalise(line);
	const ranges = [];
	for (const fragment of fragments) {
		const needle = normalise(fragment);
		let from = 0;
		let index = haystack.indexOf(needle, from);
		while (index !== -1) {
			ranges.push([index, index + needle.length]);
			from = index + needle.length;
			index = haystack.indexOf(needle, from);
		}
	}
	if (ranges.length === 0) return [{
		text: line,
		highlight: false
	}];
	ranges.sort((a, b) => a[0] - b[0]);
	const merged = [];
	for (const range of ranges) {
		const last = merged[merged.length - 1];
		if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
		else merged.push([range[0], range[1]]);
	}
	const segments = [];
	let cursor = 0;
	for (const [start, end] of merged) {
		if (start > cursor) segments.push({
			text: line.slice(cursor, start),
			highlight: false
		});
		segments.push({
			text: line.slice(start, end),
			highlight: true
		});
		cursor = end;
	}
	if (cursor < line.length) segments.push({
		text: line.slice(cursor),
		highlight: false
	});
	return segments;
}
function EvidenceViewer({ evidence, skillName, onClose, className }) {
	const [zoom, setZoom] = (0, import_react.useState)(100);
	const [rotation, setRotation] = (0, import_react.useState)(0);
	const [docQuery, setDocQuery] = (0, import_react.useState)("");
	const [activeMark, setActiveMark] = (0, import_react.useState)(0);
	const markRefs = (0, import_react.useRef)([]);
	const file = evidenceFiles.find((item) => item.name === evidence.sourceName);
	const pageIndex = Math.max(0, (evidence.page ?? 1) - 1);
	const pageText = file?.pageText[pageIndex] ?? evidence.quote;
	const fragments = (0, import_react.useMemo)(() => quoteFragments(evidence.quote), [evidence.quote]);
	const lines = pageText.split("\n");
	const matchedFragments = fragments.filter((fragment) => normalise(pageText).includes(normalise(fragment)));
	const documentSegments = (0, import_react.useMemo)(() => lines.map((line) => segmentLine(line, fragments)), [pageText, fragments]);
	const markCount = documentSegments.reduce((total, segments) => total + segments.filter((segment) => segment.highlight).length, 0);
	(0, import_react.useEffect)(() => {
		setActiveMark(0);
		markRefs.current = [];
	}, [evidence.id]);
	const focusMark = (0, import_react.useCallback)((index) => {
		if (markCount === 0) return;
		const next = (index + markCount) % markCount;
		setActiveMark(next);
		const node = markRefs.current[next];
		node?.focus();
		node?.scrollIntoView({
			block: "center",
			behavior: "smooth"
		});
	}, [markCount]);
	function onMarkKeyDown(event, index) {
		if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "n") {
			event.preventDefault();
			focusMark(index + 1);
		} else if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "p") {
			event.preventDefault();
			focusMark(index - 1);
		} else if (event.key === "Home") {
			event.preventDefault();
			focusMark(0);
		} else if (event.key === "End") {
			event.preventDefault();
			focusMark(markCount - 1);
		} else if (event.key === "Escape" && onClose) {
			event.preventDefault();
			onClose();
		}
	}
	let markCursor = -1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel overflow-hidden", className),
		role: "region",
		"aria-label": `ตัวอ่านหลักฐานแบบเทียบข้างกัน: ${evidence.sourceName}${skillName ? ` สำหรับทักษะ ${skillName}` : ""}`,
		onKeyDown: (event) => {
			if (event.key === "Escape" && onClose) onClose();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-3",
				role: "toolbar",
				"aria-label": "เครื่องมือควบคุมตัวอ่านเอกสาร",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "min-w-0 flex-1 truncate text-sm font-medium",
						children: [evidence.sourceName, evidence.page ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ml-2 font-mono text-xs text-muted-foreground",
							children: [
								"หน้า ",
								evidence.page,
								file ? ` / ${file.pages}` : ""
							]
						}) : null]
					}),
					skillName ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: skillName
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "font-mono text-[10px]",
						children: [
							"ข้อความที่ถูกอ้างอิง ",
							markCount || 1,
							" ช่วง"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: docQuery,
							onChange: (event) => setDocQuery(event.target.value),
							placeholder: "ค้นหาในเอกสาร",
							className: "h-8 w-40 pl-8 text-xs",
							"aria-label": "ค้นหาข้อความในเอกสาร"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ไปยังข้อความที่ถูกอ้างอิงก่อนหน้า",
						onClick: () => focusMark(activeMark - 1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						"aria-hidden": true,
						children: [
							markCount ? activeMark + 1 : 0,
							"/",
							markCount
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ไปยังข้อความที่ถูกอ้างอิงถัดไป",
						onClick: () => focusMark(activeMark + 1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ย่อขนาดเอกสาร",
						onClick: () => setZoom((z) => Math.max(70, z - 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-muted-foreground",
						"aria-live": "polite",
						children: [zoom, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ขยายขนาดเอกสาร",
						onClick: () => setZoom((z) => Math.min(160, z + 10)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "หมุนเอกสาร 90 องศา",
						onClick: () => setRotation((r) => (r + 90) % 360),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "เปิดแบบเต็มหน้าจอ",
						onClick: () => toast.info("ตัวอ่านเต็มหน้าจอพร้อมเชื่อมต่อ PDF renderer จริง"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ดาวน์โหลดไฟล์ต้นฉบับ",
						onClick: () => toast.info("ดาวน์โหลดต้นฉบับเมื่อเชื่อมต่อ Storage จริง"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" })
					}),
					onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "min-h-11 min-w-11",
						"aria-label": "ปิดตัวอ่านเอกสาร",
						onClick: onClose,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "sr-only",
				"aria-live": "polite",
				children: markCount ? `กำลังโฟกัสข้อความที่ถูกอ้างอิงลำดับที่ ${activeMark + 1} จาก ${markCount} ใช้ลูกศรขึ้นลงเพื่อเลื่อนระหว่างข้อความ` : "ไม่พบข้อความที่ถูกอ้างอิงในหน้านี้"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-surface p-6 lg:border-b-0 lg:border-r",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-xs text-muted-foreground",
						children: "เคล็ดลับการใช้คีย์บอร์ด: กด Tab เพื่อเข้าถึงข้อความที่ถูกอ้างอิง แล้วใช้ลูกศรขึ้น/ลง เลื่อนไปยังช่วงถัดไป กด Home/End เพื่อไปช่วงแรกหรือช่วงสุดท้าย และกด Esc เพื่อปิดตัวอ่าน"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-xl origin-top rounded-md border border-border bg-card p-6 shadow-soft transition-transform",
						style: { transform: `scale(${zoom / 100}) rotate(${rotation}deg)` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-eyebrow",
							children: [
								file?.kind ?? evidence.sourceType,
								" · หน้า ",
								evidence.page ?? 1
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-3 text-sm leading-relaxed",
							role: "group",
							"aria-label": "เนื้อหาเอกสารต้นฉบับ พร้อมข้อความที่ AI อ้างอิง",
							children: documentSegments.map((segments, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("whitespace-pre-wrap", docQuery && normalise(lines[index] ?? "").includes(normalise(docQuery)) ? "underline decoration-primary decoration-2" : void 0),
								children: segments.map((segment, segmentIndex) => {
									if (!segment.highlight) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: segment.text }, segmentIndex);
									markCursor += 1;
									const markIndex = markCursor;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										ref: (node) => {
											markRefs.current[markIndex] = node;
										},
										tabIndex: markIndex === activeMark ? 0 : -1,
										"aria-label": `ข้อความที่ถูกอ้างอิงลำดับที่ ${markIndex + 1} จาก ${markCount}: ${segment.text}`,
										"aria-current": markIndex === activeMark ? "true" : void 0,
										onFocus: () => setActiveMark(markIndex),
										onKeyDown: (event) => onMarkKeyDown(event, markIndex),
										className: "cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", {
											className: cn("evidence-highlight animate-in fade-in duration-500", markIndex === activeMark ? "ring-2 ring-primary ring-offset-1" : void 0),
											children: segment.text
										})
									}, segmentIndex);
								})
							}, index))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-lg font-semibold",
							children: "การวิเคราะห์ของ AI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "ข้อความที่เน้นสีในเอกสารด้านซ้ายคือหลักฐานที่ AI ใช้สรุปทักษะนี้ ตรงตำแหน่งจริงในหน้าเอกสาร"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
							className: "mt-4 rounded-md border-l-2 border-primary bg-surface p-3 text-sm",
							children: evidence.quote
						}),
						matchedFragments.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-3 space-y-1.5 text-xs text-muted-foreground",
							children: matchedFragments.map((fragment) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fragment })]
							}, fragment))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ความเชื่อมั่น",
									value: `${Math.round(evidence.confidence * 100)}%`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ประเภทแหล่งที่มา",
									value: evidence.sourceType
								}),
								evidence.paragraph ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ย่อหน้า",
									value: `¶ ${evidence.paragraph}`
								}) : null,
								evidence.repository ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "Repository",
									value: evidence.repository
								}) : null,
								evidence.filePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ไฟล์",
									value: evidence.filePath
								}) : null,
								evidence.commit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "Commit",
									value: evidence.commit
								}) : null,
								evidence.lineNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "บรรทัด",
									value: String(evidence.lineNumber)
								}) : null,
								evidence.section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ส่วน",
									value: evidence.section
								}) : null,
								evidence.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, {
									label: "ลิงก์",
									value: evidence.url
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm leading-relaxed text-muted-foreground",
							children: evidence.reasoning
						}),
						onClose ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "mt-5 min-h-11",
							onClick: onClose,
							children: "ปิดตัวอ่านเอกสาร"
						}) : null
					]
				})]
			})
		]
	});
}
function Meta({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-eyebrow",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-0.5 break-all font-mono text-[11px]",
			children: value
		})]
	});
}
//#endregion
export { EvidenceViewer as t };
