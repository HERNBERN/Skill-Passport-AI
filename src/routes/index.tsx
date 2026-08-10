import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  FileSearch,
  Github,
  QrCode,
  ScanText,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_ACCOUNTS } from "@/data/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillLens AI — Verifiable AI Skill Passport" },
      {
        name: "description",
        content:
          "SkillLens AI analyses resumes, portfolios, GitHub repos and academic work to build an explainable, evidence-linked Digital Skill Passport.",
      },
      { property: "og:title", content: "SkillLens AI — Verifiable AI Skill Passport" },
      {
        property: "og:description",
        content:
          "Skills-based hiring with explainable AI. Every skill traces back to a page, paragraph or commit.",
      },
    ],
  }),
  component: Landing,
});

const PILLARS = [
  {
    icon: ScanText,
    title: "Smart Upload & OCR",
    body: "PDF, DOCX, PPTX, PNG, JPG, TXT, GitHub URLs and portfolio links flow through a transparent seven-stage pipeline.",
  },
  {
    icon: FileSearch,
    title: "Evidence Explorer",
    body: "Every skill card opens a side panel with file name, page, paragraph, quoted text, confidence and AI reasoning.",
  },
  {
    icon: Github,
    title: "GitHub Analyzer",
    body: "Languages, manifests, Dockerfiles, workflows and commit history become skills with line-level citations.",
  },
  {
    icon: BadgeCheck,
    title: "Digital Skill Passport",
    body: "Passport number, QR code, verification status, work readiness and digital signature — exportable and shareable.",
  },
  {
    icon: Boxes,
    title: "Job Matching & Roadmap",
    body: "Match scores explain themselves: matching skills, missing skills, rationale and a weekly learning plan.",
  },
  {
    icon: ShieldCheck,
    title: "Reviewer Verification",
    body: "Faculty and assessors confirm evidence and issue digital verification, so unverified claims stay labelled.",
  },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BadgeCheck className="size-4" />
          </span>
          <span className="font-display text-base font-semibold">SkillLens AI</span>
        </div>
        <Button asChild size="sm">
          <Link to="/auth">Enter demo</Link>
        </Button>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-16 pt-10 text-center sm:pt-20">
        <Badge variant="secondary" className="mb-6">
          Explainable AI · Evidence-linked · Skills-based hiring
        </Badge>
        <h1 className="text-balance font-display text-4xl font-bold sm:text-6xl">
          หลักฐานการเรียนรู้ กลายเป็น Skill Passport ที่ตรวจสอบย้อนกลับได้
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Resume, GPA และวุฒิการศึกษาไม่ได้สะท้อนทักษะจริง SkillLens AI สกัดทักษะจากเอกสาร
          GitHub และ Portfolio โดยทุกทักษะต้องมีหลักฐานอ้างอิงเสมอ — ไม่มีการคาดเดา
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/auth">
              ทดลองใช้ระบบตัวอย่าง
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/p/$passportNumber" params={{ passportNumber: "SL-2026-TH-004821" }}>
              <QrCode className="size-4" />
              ดู Public Passport
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="panel p-5">
              <pillar.icon className="size-5 text-primary" />
              <h2 className="mt-3 font-display text-lg font-semibold">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="panel p-6">
          <h2 className="font-display text-xl font-semibold">บัญชีทดลอง / Demo accounts</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ทุกบัญชีมีข้อมูลจำลองครบทุกส่วนพร้อมใช้งานทันที โดยไม่ต้องอัปโหลดไฟล์เอง
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {Object.entries(DEMO_ACCOUNTS).map(([email, account]) => (
              <div key={email} className="rounded-md border border-border bg-surface p-4">
                <Badge variant="outline" className="capitalize">
                  {account.role}
                </Badge>
                <p className="mt-2 font-mono text-xs break-all">{email}</p>
                <p className="font-mono text-xs text-muted-foreground">{account.password}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        SkillLens AI — AI Skill Passport Platform. Demo data only; no real candidate records.
      </footer>
    </div>
  );
}
