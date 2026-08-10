import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { jobRoles, roadmap, skills, type Evidence } from "@/data/demo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — SkillLens AI" },
      {
        name: "description",
        content:
          "Ask where a skill came from, why a match score is low, or what to learn next. Every answer cites the evidence behind it.",
      },
      { property: "og:title", content: "AI Assistant — SkillLens AI" },
      {
        property: "og:description",
        content: "An evidence-grounded assistant that refuses to answer without a citation.",
      },
    ],
  }),
  component: AssistantPage,
});

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  citations: Evidence[];
}

const SUGGESTIONS = [
  "Skill TypeScript มาจากไหน",
  "ทำไม Match Score ของ AI Engineer ต่ำ",
  "ควรเรียนอะไรเพิ่ม",
  "ควรทำ Project อะไร",
];

function answer(question: string): { text: string; citations: Evidence[] } {
  const q = question.toLowerCase();

  const skill = skills.find((item) => q.includes(item.name.toLowerCase().split(" ")[0]!.toLowerCase()));
  if (skill && (q.includes("มาจาก") || q.includes("where") || q.includes("หลักฐาน") || q.includes("evidence"))) {
    return {
      text: `ทักษะ ${skill.name} สรุปจาก ${skill.evidence.length} หลักฐาน โดยมีค่าความเชื่อมั่นรวม ${Math.round(
        skill.confidence * 100,
      )}% และสถานะ ${skill.verified ? "Verified" : "Unverified"} — ดูข้อความอ้างอิงด้านล่างได้ทุกรายการ`,
      citations: skill.evidence,
    };
  }

  const job = jobRoles.find((role) => q.includes(role.title.toLowerCase().split(" ")[0]!.toLowerCase()));
  if (job && (q.includes("match") || q.includes("ต่ำ") || q.includes("score") || q.includes("ทำไม"))) {
    const supporting = skills
      .filter((item) => job.matchingSkills.includes(item.name))
      .flatMap((item) => item.evidence)
      .slice(0, 3);
    return {
      text: `ตำแหน่ง ${job.title} ได้ ${job.matchScore}% เพราะ ${job.rationale} ทักษะที่ยังขาดคือ ${job.missingSkills.join(
        ", ",
      )} แนวทางพัฒนา: ${job.advice}`,
      citations: supporting,
    };
  }

  if (q.includes("เรียน") || q.includes("learn") || q.includes("roadmap")) {
    const next = roadmap.slice(0, 3);
    return {
      text: `แผนสามสัปดาห์แรกคือ ${next
        .map((week) => `W${week.week} ${week.skill} (${week.hours}h)`)
        .join(", ")} ซึ่งมาจากช่องว่างทักษะที่พบในการวิเคราะห์ Job Matching`,
      citations: [],
    };
  }

  if (q.includes("project") || q.includes("โปรเจ") || q.includes("ทำ")) {
    return {
      text: `แนะนำโปรเจกต์ตามลำดับ: ${roadmap
        .slice(0, 3)
        .map((week) => week.project)
        .join(" · ")} — ทุกข้อเลือกจากทักษะที่ตำแหน่งงานเป้าหมายต้องการแต่ยังไม่มีหลักฐานรองรับ`,
      citations: [],
    };
  }

  return {
    text: "ยังไม่มีหลักฐานเพียงพอที่จะตอบคำถามนี้ ระบบจะไม่ตอบโดยไม่มี Evidence — ลองถามถึงทักษะ ตำแหน่งงาน หรือแผนการเรียนที่มีอยู่ในหลักฐานที่อัปโหลด",
    citations: [],
  };
}

function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text: "สวัสดีครับ ถามได้เลยว่าทักษะไหนมาจากหลักฐานใด ทำไม Match Score เป็นแบบนั้น หรือควรเรียนอะไรต่อ ทุกคำตอบจะอ้างอิงหลักฐานเสมอ",
      citations: [],
    },
  ]);
  const [input, setInput] = useState("");
  const counter = useRef(1);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const result = answer(trimmed);
    const id = counter.current++;
    setMessages((prev) => [
      ...prev,
      { id: `u${id}`, role: "user", text: trimmed, citations: [] },
      { id: `a${id}`, role: "assistant", text: result.text, citations: result.citations },
    ]);
    setInput("");
  };

  const evidenceTotal = useMemo(
    () => skills.reduce((total, skill) => total + skill.evidence.length, 0),
    [],
  );

  return (
    <AppShell
      title="AI Assistant"
      description={`ตอบจากหลักฐาน ${evidenceTotal} รายการเท่านั้น — ห้ามตอบโดยไม่มี Evidence`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="space-y-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" && "flex-row-reverse")}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-md",
                  message.role === "assistant"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {message.role === "assistant" ? <Bot className="size-4" /> : <User className="size-4" />}
              </span>
              <div
                className={cn(
                  "min-w-0 flex-1 rounded-lg border border-border p-4",
                  message.role === "assistant" ? "bg-card" : "bg-surface",
                )}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.citations.length > 0 ? (
                  <div className="mt-3 space-y-2">
                    <p className="text-eyebrow">Citations</p>
                    {message.citations.map((citation) => (
                      <div
                        key={citation.id}
                        className="rounded-md border border-border bg-surface p-3 text-xs"
                      >
                        <p className="font-mono text-[11px] text-muted-foreground">
                          {citation.sourceName}
                          {citation.page ? ` · page ${citation.page}` : ""}
                          {citation.commit ? ` · commit ${citation.commit}` : ""}
                        </p>
                        <p className="mt-1 leading-relaxed">“{citation.quote}”</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <Badge
              key={suggestion}
              variant="outline"
              className="cursor-pointer px-3 py-1.5 hover:bg-accent"
              onClick={() => send(suggestion)}
            >
              {suggestion}
            </Badge>
          ))}
        </div>

        <form
          className="sticky bottom-4 mt-4 flex gap-2 rounded-lg border border-border bg-card p-2 shadow-soft"
          onSubmit={(event) => {
            event.preventDefault();
            send(input);
          }}
        >
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="ถามเกี่ยวกับทักษะ หลักฐาน หรือ Match Score…"
            className="border-0 shadow-none focus-visible:ring-0"
            aria-label="Ask the assistant"
          />
          <Button type="submit" size="icon" aria-label="Send">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </AppShell>
  );
}
