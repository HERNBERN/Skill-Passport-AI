import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { BadgeCheck, Download, FileJson, Printer, RefreshCcw, Share2 } from "lucide-react";
import { exportPassportPdf } from "@/lib/passport-pdf";

import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { EvidenceViewer } from "@/components/evidence-viewer";
import { JobMatchPanel, type JobMatchItem } from "@/components/job-match-panel";
import { PassportDocument, QrBlock } from "@/components/passport-document";
import { AntiBiasPanel, ReadinessBreakdownPanel } from "@/components/readiness";
import { Button } from "@/components/ui/button";
import { candidates, jobRoles, skills, type Evidence, type JobRole, type Skill } from "@/data/demo";
import { personas } from "@/data/impact";
import { readPipelineState, type PipelineState } from "@/lib/pipeline-state";

export const Route = createFileRoute("/passport")({
  head: () => ({
    meta: [
      { title: "Digital Skill Passport — SkillLens AI" },
      {
        name: "description",
        content:
          "An official-format Digital Skill Passport with passport number, QR code, verification status, evidence summary and digital signature.",
      },
      { property: "og:title", content: "Digital Skill Passport — SkillLens AI" },
      {
        property: "og:description",
        content: "Export, print, download as JSON or share a public verification link.",
      },
    ],
  }),
  component: PassportPage,
});

function evidenceLocator(evidence: Evidence) {
  const parts = [
    evidence.page ? `page ${evidence.page}` : null,
    evidence.paragraph ? `¶ ${evidence.paragraph}` : null,
    evidence.commit ? `commit ${evidence.commit}` : null,
    evidence.filePath ?? null,
    evidence.section ?? null,
  ].filter(Boolean);
  return parts.join(" · ");
}

function PassportPage() {
  const candidate = candidates[0]!;
  const [viewer, setViewer] = useState<{ evidence: Evidence; skillName: string } | null>(null);
  const [pipeline, setPipeline] = useState<PipelineState | null>(null);

  useEffect(() => {
    setPipeline(readPipelineState());
  }, []);

  const activeSkills = pipeline?.skills ?? skills;
  const displayedJobRoles = pipeline?.jobMatches ?? jobRoles;
  const isFallback = pipeline === null;

  const jobMatches = useMemo<JobMatchItem[]>(
    () =>
      displayedJobRoles.map((role) => ({
        id: role.id,
        title: role.title,
        company: role.company,
        location: role.location,
        matchScore: role.matchScore,
        matching: role.matchingSkills,
        missing: role.missingSkills,
        rationale: role.rationale,
        advice: role.advice,
        justifications: role.matchingSkills.flatMap((skillName) => {
          const skill = activeSkills.find((item) => item.name === skillName);
          const evidence = skill?.evidence[0];
          if (!skill || !evidence) return [];
          return [
            {
              skill: skill.name,
              quote: evidence.quote,
              source: evidence.sourceName,
              locator: evidenceLocator(evidence),
              confidence: evidence.confidence,
              evidence,
            },
          ];
        }),
      })),
    [activeSkills, displayedJobRoles],
  );

  function downloadJson() {
    const payload = {
      passportNumber: candidate.passportNumber,
      owner: candidate.name,
      verificationStatus: candidate.verificationStatus,
      workReadiness: candidate.workReadiness,
      issuedAt: new Date().toISOString(),
      skills: activeSkills.map((skill) => ({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        confidence: skill.confidence,
        verified: skill.verified,
        evidence: skill.evidence.map((evidence) => ({
          source: evidence.sourceName,
          page: evidence.page,
          commit: evidence.commit,
          quote: evidence.quote,
          confidence: evidence.confidence,
        })),
      })),
      jobMatches: displayedJobRoles.map((role) => ({
        id: role.id,
        title: role.title,
        company: role.company,
        location: role.location,
        matchScore: role.matchScore,
        matchingSkills: role.matchingSkills,
        missingSkills: role.missingSkills,
        rationale: role.rationale,
        advice: role.advice,
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${candidate.passportNumber}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const publicPath = `/p/${candidate.passportNumber}`;
  const publicUrl =
    typeof window === "undefined" ? publicPath : `${window.location.origin}${publicPath}`;

  return (
    <AppShell
      title="Digital Skill Passport"
      description="รูปแบบทางการ พร้อม QR Code, สถานะการยืนยัน, สรุปหลักฐาน และลายมือชื่อดิจิทัล"
      actions={
        <>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              exportPassportPdf({
                candidate,
                skills: activeSkills,
                publicUrl,
                readiness: personas[0]!.readiness,
              })
            }
          >
            <Printer className="size-4" />
            ส่งออก PDF
          </Button>
          <Button size="sm" variant="outline" onClick={downloadJson}>
            <FileJson className="size-4" />
            JSON
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/reevaluate">
              <RefreshCcw className="size-4" />
              ขอประเมินใหม่
            </Link>
          </Button>
          <Button
            size="sm"
            onClick={() => {
              void navigator.clipboard?.writeText(publicUrl);
              toast.success("คัดลอกลิงก์สาธารณะแล้ว", { description: publicUrl });
            }}
          >
            <Share2 className="size-4" />
            แชร์
          </Button>
        </>
      }
    >
      {isFallback ? (
        <section className="panel mb-6 rounded-lg border-l-4 border-primary bg-primary/5 p-5 text-sm text-muted-foreground">
          วงจร AI pipeline ยังไม่ทำงานในเซสชันนี้ จึงแสดงข้อมูลตัวอย่าง หากต้องการผลลัพธ์จริง ให้ไปที่หน้า Smart Upload แล้วรันการวิเคราะห์
        </section>
      ) : null}

      <PassportDocument candidate={candidate} skills={activeSkills} publicUrl={publicUrl} />

      <JobMatchPanel
        matches={jobMatches}
        className="mt-6"
        title="Job matching & ranking filters"
        onOpenEvidence={(evidence, skillName) => setViewer({ evidence, skillName })}
      />

      {viewer ? (
        <EvidenceViewer
          evidence={viewer.evidence}
          skillName={viewer.skillName}
          onClose={() => setViewer(null)}
          className="mt-4"
        />
      ) : null}

      <ReadinessBreakdownPanel breakdown={personas[0]!.readiness} className="mt-6" />
      <AntiBiasPanel className="mt-4" />

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="panel flex items-center gap-5 p-5">
          <div className="rounded-md bg-card p-3">
            <QrBlock value={publicUrl} size={104} />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold">QR → Public Passport</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              สแกนเพื่อเปิดหน้าสาธารณะที่แสดงเฉพาะทักษะที่ยืนยันแล้วและสรุปหลักฐาน
            </p>
            <Button asChild size="sm" variant="outline" className="mt-3">
              <Link to="/p/$passportNumber" params={{ passportNumber: candidate.passportNumber }}>
                เปิด Public Passport
              </Link>
            </Button>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-base font-semibold">Export documents</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            เอกสารทางการสำหรับสมัครงานและการพิจารณาคัดเลือก
          </p>
          <Button asChild size="sm" className="mt-3">
            <Link to="/documents">
              <Download className="size-4" />
              ไปที่ศูนย์เอกสาร
            </Link>
          </Button>
          <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <BadgeCheck className="size-3.5 text-success" />
            Resume (ATS) · Portfolio · Skill Passport · Verification Report · Candidate Report
          </p>
        </section>
      </div>
    </AppShell>
  );
}
