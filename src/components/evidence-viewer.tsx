import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Maximize2,
  RotateCw,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { evidenceFiles, type Evidence } from "@/data/demo";
import { cn } from "@/lib/utils";

/** Split a cited quote into the individual fragments that should be highlighted. */
function quoteFragments(quote: string): string[] {
  return quote
    .split(/\n|(?<=[.!?])\s+|•/g)
    .map((part) => part.replace(/^[\s•\-–—"“”]+|[\s"“”]+$/g, "").trim())
    .filter((part) => part.length > 12);
}

function normalise(value: string) {
  return value.toLowerCase().replace(/\s+/g, " ");
}

type Segment = { text: string; highlight: boolean };

/** Highlight the exact passages of `text` that the AI cited, at substring level. */
function segmentLine(line: string, fragments: string[]): Segment[] {
  const haystack = normalise(line);
  const ranges: [number, number][] = [];

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

  if (ranges.length === 0) return [{ text: line, highlight: false }];

  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }

  const segments: Segment[] = [];
  let cursor = 0;
  for (const [start, end] of merged) {
    if (start > cursor) segments.push({ text: line.slice(cursor, start), highlight: false });
    segments.push({ text: line.slice(start, end), highlight: true });
    cursor = end;
  }
  if (cursor < line.length) segments.push({ text: line.slice(cursor), highlight: false });
  return segments;
}

export function EvidenceViewer({
  evidence,
  skillName,
  onClose,
  className,
}: {
  evidence: Evidence;
  skillName?: string | undefined;
  onClose?: (() => void) | undefined;
  className?: string;
}) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [docQuery, setDocQuery] = useState("");
  const [activeMark, setActiveMark] = useState(0);
  const markRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const file = evidenceFiles.find((item) => item.name === evidence.sourceName);
  const pageIndex = Math.max(0, (evidence.page ?? 1) - 1);
  const pageText = file?.pageText[pageIndex] ?? evidence.quote;
  const fragments = useMemo(() => quoteFragments(evidence.quote), [evidence.quote]);
  const lines = pageText.split("\n");
  const matchedFragments = fragments.filter((fragment) =>
    normalise(pageText).includes(normalise(fragment)),
  );

  // Flatten the document into segments so every highlight gets a stable index.
  const documentSegments = useMemo(
    () => lines.map((line) => segmentLine(line, fragments)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageText, fragments],
  );
  const markCount = documentSegments.reduce(
    (total, segments) => total + segments.filter((segment) => segment.highlight).length,
    0,
  );

  useEffect(() => {
    setActiveMark(0);
    markRefs.current = [];
  }, [evidence.id]);

  const focusMark = useCallback(
    (index: number) => {
      if (markCount === 0) return;
      const next = (index + markCount) % markCount;
      setActiveMark(next);
      const node = markRefs.current[next];
      node?.focus();
      node?.scrollIntoView({ block: "center", behavior: "smooth" });
    },
    [markCount],
  );

  function onMarkKeyDown(event: React.KeyboardEvent, index: number) {
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

  return (
    <section
      className={cn("panel overflow-hidden", className)}
      role="region"
      aria-label={`ตัวอ่านหลักฐานแบบเทียบข้างกัน: ${evidence.sourceName}${skillName ? ` สำหรับทักษะ ${skillName}` : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && onClose) onClose();
      }}
    >
      <div
        className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-3"
        role="toolbar"
        aria-label="เครื่องมือควบคุมตัวอ่านเอกสาร"
      >
        <p className="min-w-0 flex-1 truncate text-sm font-medium">
          {evidence.sourceName}
          {evidence.page ? (
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              หน้า {evidence.page}
              {file ? ` / ${file.pages}` : ""}
            </span>
          ) : null}
        </p>
        {skillName ? <Badge variant="secondary">{skillName}</Badge> : null}
        <Badge variant="outline" className="font-mono text-[10px]">
          ข้อความที่ถูกอ้างอิง {markCount || 1} ช่วง
        </Badge>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={docQuery}
            onChange={(event) => setDocQuery(event.target.value)}
            placeholder="ค้นหาในเอกสาร"
            className="h-8 w-40 pl-8 text-xs"
            aria-label="ค้นหาข้อความในเอกสาร"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="ไปยังข้อความที่ถูกอ้างอิงก่อนหน้า"
          onClick={() => focusMark(activeMark - 1)}
        >
          <ChevronUp className="size-4" />
        </Button>
        <span className="font-mono text-xs text-muted-foreground" aria-hidden>
          {markCount ? activeMark + 1 : 0}/{markCount}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="ไปยังข้อความที่ถูกอ้างอิงถัดไป"
          onClick={() => focusMark(activeMark + 1)}
        >
          <ChevronDown className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="ย่อขนาดเอกสาร"
          onClick={() => setZoom((z) => Math.max(70, z - 10))}
        >
          <ZoomOut className="size-4" />
        </Button>
        <span className="font-mono text-xs text-muted-foreground" aria-live="polite">
          {zoom}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="ขยายขนาดเอกสาร"
          onClick={() => setZoom((z) => Math.min(160, z + 10))}
        >
          <ZoomIn className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="หมุนเอกสาร 90 องศา"
          onClick={() => setRotation((r) => (r + 90) % 360)}
        >
          <RotateCw className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="เปิดแบบเต็มหน้าจอ"
          onClick={() => toast.info("ตัวอ่านเต็มหน้าจอพร้อมเชื่อมต่อ PDF renderer จริง")}
        >
          <Maximize2 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="min-h-11 min-w-11"
          aria-label="ดาวน์โหลดไฟล์ต้นฉบับ"
          onClick={() => toast.info("ดาวน์โหลดต้นฉบับเมื่อเชื่อมต่อ Storage จริง")}
        >
          <Download className="size-4" />
        </Button>
        {onClose ? (
          <Button
            variant="ghost"
            size="icon"
            className="min-h-11 min-w-11"
            aria-label="ปิดตัวอ่านเอกสาร"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        ) : null}
      </div>

      <p className="sr-only" aria-live="polite">
        {markCount
          ? `กำลังโฟกัสข้อความที่ถูกอ้างอิงลำดับที่ ${activeMark + 1} จาก ${markCount} ใช้ลูกศรขึ้นลงเพื่อเลื่อนระหว่างข้อความ`
          : "ไม่พบข้อความที่ถูกอ้างอิงในหน้านี้"}
      </p>

      <div className="grid lg:grid-cols-2">
        <div className="border-b border-border bg-surface p-6 lg:border-b-0 lg:border-r">
          <p className="mb-3 text-xs text-muted-foreground">
            เคล็ดลับการใช้คีย์บอร์ด: กด Tab เพื่อเข้าถึงข้อความที่ถูกอ้างอิง แล้วใช้ลูกศรขึ้น/ลง เลื่อนไปยังช่วงถัดไป
            กด Home/End เพื่อไปช่วงแรกหรือช่วงสุดท้าย และกด Esc เพื่อปิดตัวอ่าน
          </p>
          <div
            className="mx-auto max-w-xl origin-top rounded-md border border-border bg-card p-6 shadow-soft transition-transform"
            style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
          >
            <p className="text-eyebrow">
              {file?.kind ?? evidence.sourceType} · หน้า {evidence.page ?? 1}
            </p>
            <div
              className="mt-3 space-y-3 text-sm leading-relaxed"
              role="group"
              aria-label="เนื้อหาเอกสารต้นฉบับ พร้อมข้อความที่ AI อ้างอิง"
            >
              {documentSegments.map((segments, index) => (
                <p
                  key={index}
                  className={cn(
                    "whitespace-pre-wrap",
                    docQuery && normalise(lines[index] ?? "").includes(normalise(docQuery))
                      ? "underline decoration-primary decoration-2"
                      : undefined,
                  )}
                >
                  {segments.map((segment, segmentIndex) => {
                    if (!segment.highlight) return <span key={segmentIndex}>{segment.text}</span>;
                    markCursor += 1;
                    const markIndex = markCursor;
                    return (
                      <button
                        key={segmentIndex}
                        type="button"
                        ref={(node) => {
                          markRefs.current[markIndex] = node;
                        }}
                        tabIndex={markIndex === activeMark ? 0 : -1}
                        aria-label={`ข้อความที่ถูกอ้างอิงลำดับที่ ${markIndex + 1} จาก ${markCount}: ${segment.text}`}
                        aria-current={markIndex === activeMark ? "true" : undefined}
                        onFocus={() => setActiveMark(markIndex)}
                        onKeyDown={(event) => onMarkKeyDown(event, markIndex)}
                        className="cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <mark
                          className={cn(
                            "evidence-highlight animate-in fade-in duration-500",
                            markIndex === activeMark
                              ? "ring-2 ring-primary ring-offset-1"
                              : undefined,
                          )}
                        >
                          {segment.text}
                        </mark>
                      </button>
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="font-display text-lg font-semibold">การวิเคราะห์ของ AI</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ข้อความที่เน้นสีในเอกสารด้านซ้ายคือหลักฐานที่ AI ใช้สรุปทักษะนี้ ตรงตำแหน่งจริงในหน้าเอกสาร
          </p>
          <blockquote className="mt-4 rounded-md border-l-2 border-primary bg-surface p-3 text-sm">
            {evidence.quote}
          </blockquote>
          {matchedFragments.length ? (
            <ol className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              {matchedFragments.map((fragment) => (
                <li key={fragment} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{fragment}</span>
                </li>
              ))}
            </ol>
          ) : null}
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
            <Meta label="ความเชื่อมั่น" value={`${Math.round(evidence.confidence * 100)}%`} />
            <Meta label="ประเภทแหล่งที่มา" value={evidence.sourceType} />
            {evidence.paragraph ? <Meta label="ย่อหน้า" value={`¶ ${evidence.paragraph}`} /> : null}
            {evidence.repository ? <Meta label="Repository" value={evidence.repository} /> : null}
            {evidence.filePath ? <Meta label="ไฟล์" value={evidence.filePath} /> : null}
            {evidence.commit ? <Meta label="Commit" value={evidence.commit} /> : null}
            {evidence.lineNumber ? <Meta label="บรรทัด" value={String(evidence.lineNumber)} /> : null}
            {evidence.section ? <Meta label="ส่วน" value={evidence.section} /> : null}
            {evidence.url ? <Meta label="ลิงก์" value={evidence.url} /> : null}
          </dl>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{evidence.reasoning}</p>
          {onClose ? (
            <Button variant="outline" size="sm" className="mt-5 min-h-11" onClick={onClose}>
              ปิดตัวอ่านเอกสาร
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-2">
      <dt className="text-eyebrow">{label}</dt>
      <dd className="mt-0.5 break-all font-mono text-[11px]">{value}</dd>
    </div>
  );
}
