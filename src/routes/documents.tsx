import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, Printer } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { readPipelineState } from "@/lib/pipeline-state";
import { generateSmartPortfolio, type SmartPortfolioOutput } from "@/services/ai/portfolio-generator";
import { exportResumePdf, type ResumeExperience, type ResumeTranscriptCourse } from "@/lib/resume-pdf";
import { candidates, evidenceFiles, githubRepos, jobRoles, skills } from "@/data/demo";

const resumeWorkHistory: ResumeExperience[] = [
  {
    id: "exp-1",
    title: "Backend Engineer Intern",
    company: "Siam Digital Co., Ltd.",
    location: "Bangkok, Thailand",
    start: "Jun 2025",
    end: "Dec 2025",
    description:
      "Built and shipped backend services using Node.js, TypeScript, Redis caching and PostgreSQL for high-traffic applications.",
    achievements: [
      "Delivered 14 REST endpoints serving 40,000 monthly requests.",
      "Reduced p95 latency from 820 ms to 190 ms with Redis caching.",
      "Authored 120+ integration tests, raising coverage from 41% to 86%.",
    ],
    evidence: skills[0]?.evidence.slice(0, 2),
  },
  {
    id: "exp-2",
    title: "Technical Project Lead",
    company: "SkillGraph Senior Project",
    location: "Chulalongkorn University",
    start: "Jan 2026",
    end: "Jul 2026",
    description:
      "Led the design and delivery of a knowledge-graph recommender using Python, FastAPI, PostgreSQL and AWS deployment.",
    achievements: [
      "Improved recommender Precision@5 from 0.41 to 0.68 versus a TF-IDF baseline.",
      "Automated CI/CD with GitHub Actions and Docker for zero-downtime deployment.",
      "Coordinated a team of 5 and presented project outcomes to faculty stakeholders.",
    ],
    evidence: skills[1]?.evidence.slice(0, 1),
  },
];

const resumeTranscriptCourses: ResumeTranscriptCourse[] = [
  {
    id: "course-1",
    course: "Google IT Support Certificate",
    provider: "Coursera",
    period: "May 2026",
    sourceName: "Course_Completion_Transcript.pdf",
  },
  {
    id: "course-2",
    course: "SQL for Data Analysis",
    provider: "Coursera",
    period: "Jul 2026",
    sourceName: "Course_Completion_Transcript.pdf",
  },
];

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Centre — SkillLens AI" },
      {
        name: "description",
        content:
          "Generate an ATS-friendly resume, professional portfolio, skill verification report and candidate report from verified evidence.",
      },
      { property: "og:title", content: "Document Centre — SkillLens AI" },
      {
        property: "og:description",
        content: "Formal, professional documents ready for real job applications and hiring panels.",
      },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const [tab, setTab] = useState("resume");
  const [jobDescription, setJobDescription] = useState("");
  const [portfolioOutput, setPortfolioOutput] = useState<SmartPortfolioOutput | null>(null);
  const [portfolioStatus, setPortfolioStatus] = useState("Ready to generate Smart Portfolio.");
  const [hasPipeline, setHasPipeline] = useState(false);

  useEffect(() => {
    setHasPipeline(Boolean(readPipelineState()));
  }, []);

  async function handleGeneratePortfolio() {
    if (!jobDescription.trim()) {
      toast.error("โปรดใส่ Job Description ก่อนสร้าง Smart Portfolio");
      return;
    }

    setPortfolioStatus("Generating Smart Portfolio from verified evidence...");
    try {
      const pipeline = readPipelineState();
      const skillsToUse = pipeline?.skills?.filter((skill) => skill.verified && skill.evidence.length > 0) ?? verified;
      const output = await generateSmartPortfolio(candidate, skillsToUse, githubRepos, jobDescription.trim());
      setPortfolioOutput(output);
      setPortfolioStatus("Smart Portfolio generated successfully.");
      toast.success("Smart Portfolio generated", {
        description: "ตัวอย่างเนื้อหา portfolio พร้อม Core Competencies และ Evidence-based Projects ถูกสร้างแล้ว",
      });
    } catch (error) {
      console.error(error);
      setPortfolioStatus("Failed to generate Smart Portfolio.");
      toast.error("ไม่สามารถสร้าง Smart Portfolio ได้", {
        description: "ลองใหม่อีกครั้งหรือแก้ไข Job Description แล้วคลิก Generate ใหม่",
      });
    }
  }

  return (
    <AppShell
      title="Document Centre"
      description="เอกสารทางการที่สร้างจากทักษะและหลักฐานที่ยืนยันแล้ว"
      actions={
        <>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="size-4" />
            Print / Export PDF
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              exportResumePdf({
                candidate,
                workHistory: resumeWorkHistory,
                transcriptCourses: resumeTranscriptCourses,
                skills: verified,
                githubRepos,
                publicUrl: typeof window === "undefined" ? "/" : `${window.location.origin}/p/${candidate.passportNumber}`,
                jobDescription: jobDescription.trim(),
              })
            }
          >
            <Download className="size-4" />
            Export Resume PDF
          </Button>
        </>
      }
    >
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="resume">Resume (ATS)</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="verification">Verification Report</TabsTrigger>
          <TabsTrigger value="candidate">Candidate Report</TabsTrigger>
        </TabsList>

        <TabsContent value="resume" className="mt-5">
          <Sheet>
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
              {candidate.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {candidate.headline} · Bangkok, Thailand · {candidate.email} · github.com/
              {candidate.githubUser}
            </p>
            <Section title="Professional Summary">
              <p>
                Software engineer with {candidate.experienceYears}+ year of production experience across
                backend services and data-intensive applications. Evidence-verified strengths in{" "}
                {verified.slice(0, 4).map((s) => s.name).join(", ")}. Delivered measurable outcomes
                including a 77% p95 latency reduction and a coverage increase from 41% to 86%.
              </p>
            </Section>
            <Section title="Experience">
              <p className="font-medium">Backend Engineer Intern — Siam Digital Co., Ltd.</p>
              <p className="text-xs text-muted-foreground">Jun 2025 – Dec 2025 · Bangkok</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Delivered 14 REST endpoints in Node.js, TypeScript and PostgreSQL serving 40,000 monthly requests.</li>
                <li>Introduced Redis caching, reducing p95 latency from 820 ms to 190 ms.</li>
                <li>Authored 120+ integration tests, raising service coverage from 41% to 86%.</li>
                <li>Containerised the notifications service and shipped 11 zero-downtime blue-green releases to AWS ECS.</li>
              </ul>
            </Section>
            <Section title="Projects">
              <p className="font-medium">SkillGraph — Senior Project</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>Built a knowledge-graph recommender with Python, FastAPI and PostgreSQL (pgvector, IVFFlat).</li>
                <li>Improved Precision@5 from 0.41 to 0.68 versus a TF-IDF baseline (paired t-test, p &lt; 0.01).</li>
                <li>Automated build, test and deployment with GitHub Actions and Docker.</li>
              </ul>
            </Section>
            <Section title="Education">
              <p>B.Eng Computer Engineering — {candidate.university} (GPA 3.62)</p>
            </Section>
            <Section title="Skills">
              <p>{verified.map((skill) => skill.name).join(" · ")}</p>
            </Section>
            <Section title="Certifications">
              <p>AWS Certified Cloud Practitioner — CP-88213-TH (Mar 2026)</p>
            </Section>
          </Sheet>
        </TabsContent>

        <TabsContent value="portfolio" className="mt-5">
          <Sheet>
            <h2 className="font-display text-2xl font-semibold">Professional Portfolio</h2>
            <p className="text-sm text-muted-foreground">
              {candidate.name} · nattapong.dev · github.com/{candidate.githubUser}
            </p>
            <Section title="Job Description Input">
              <p className="text-sm text-muted-foreground">
                ป้อนข้อความตำแหน่งงานหรือ JD เพื่อสร้างเนื้อหา Portfolio ให้สอดคล้องกับข้อกำหนดตำแหน่ง
              </p>
              <Textarea
                className="min-h-[140px]"
                value={jobDescription}
                onChange={(event) => setJobDescription(event.target.value)}
                placeholder="Paste the job description here..."
              />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button onClick={handleGeneratePortfolio} size="sm">
                  Generate Smart Portfolio
                </Button>
                <p className="text-xs text-muted-foreground">{portfolioStatus}</p>
              </div>
            </Section>

            {portfolioOutput ? (
              <Section title="Generated Smart Portfolio">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Executive Summary
                    </p>
                    <p className="mt-2">{portfolioOutput.executiveSummary}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Core Competencies
                    </p>
                    <ul className="mt-2 list-disc space-y-2 pl-5">
                      {portfolioOutput.coreCompetencies.map((competency) => (
                        <li key={competency.name}>
                          <span className="font-medium">{competency.name}</span> — {competency.highlight}
                          <div className="mt-1 text-xs text-muted-foreground">ESCO: {competency.escoCode}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      Evidence-based Projects
                    </p>
                    <div className="mt-3 space-y-4">
                      {portfolioOutput.evidenceBasedProjects.map((project) => (
                        <article key={project.title} className="rounded-lg border border-border p-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold">{project.title}</h3>
                            <Badge variant="secondary">{project.role}</Badge>
                          </div>
                          <p className="mt-2">{project.summary}</p>
                          <div className="mt-3 space-y-1 text-sm">
                            {project.outcomes.map((outcome) => (
                              <p key={outcome}>• {outcome}</p>
                            ))}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.verifiedTech.map((tech) => (
                              <Badge key={tech} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-3 text-xs text-muted-foreground">
                            <p className="font-medium">Evidence</p>
                            <ul className="list-disc space-y-1 pl-5">
                              {project.evidenceLinks.map((link) => (
                                <li key={link}>{link}</li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>
            ) : (
              <Section title="Portfolio Draft Preview">
                <p className="text-sm text-muted-foreground">
                  คลิก “Generate Smart Portfolio” เพื่อสร้าง executive summary, competencies, และ project descriptions จากทักษะที่ยืนยันแล้วและ JD ที่ระบุ
                </p>
              </Section>
            )}

            <Separator className="my-5" />
            {githubRepos.map((repo) => (
              <Section key={repo.name} title={repo.name.split("/")[1] ?? repo.name}>
                <p className="text-eyebrow">Project overview</p>
                <p className="mt-1">
                  {repo.commits} commits across {repo.contributors} contributor(s), {repo.stars} stars.
                  Focus areas: {repo.topics.join(", ")}.
                </p>
                <p className="text-eyebrow mt-3">Tech stack</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {Object.keys(repo.languages).map((language) => (
                    <Badge key={language} variant="secondary">
                      {language}
                    </Badge>
                  ))}
                </div>
                <p className="text-eyebrow mt-3">Outcome</p>
                <p className="mt-1">
                  Documented, tested and deployed; source available at https://github.com/{repo.name}
                </p>
              </Section>
            ))}
          </Sheet>
        </TabsContent>

        <TabsContent value="verification" className="mt-5">
          <Sheet>
            <h2 className="font-display text-2xl font-semibold">Skill Verification Report</h2>
            <p className="text-sm text-muted-foreground">
              Passport {candidate.passportNumber} · Status {candidate.verificationStatus} · Issued{" "}
              {new Date().toISOString().slice(0, 10)}
            </p>
            <Section title="Executive Summary">
              <p>
                {candidate.name} holds {verified.length} verified skills supported by{" "}
                {skills.reduce((total, skill) => total + skill.evidence.length, 0)} discrete evidence
                items drawn from {evidenceFiles.length} source documents and{" "}
                {githubRepos.length} public repositories. Overall work readiness is assessed at{" "}
                {candidate.workReadiness}%.
              </p>
            </Section>
            <Section title="Skill Assessment">
              <ul className="space-y-2">
                {skills.map((skill) => (
                  <li key={skill.id} className="flex flex-wrap items-center gap-2">
                    <span className="min-w-40 font-medium">{skill.name}</span>
                    <Badge variant="secondary">{skill.level}</Badge>
                    <span className="font-mono text-xs text-muted-foreground">
                      {Math.round(skill.confidence * 100)}% · {skill.evidence.length} evidence
                    </span>
                    <Badge variant={skill.verified ? "default" : "outline"}>
                      {skill.verified ? "Verified" : "Unverified"}
                    </Badge>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Evidence Summary">
              <ul className="list-disc space-y-1 pl-5">
                {evidenceFiles.map((file) => (
                  <li key={file.id}>
                    {file.name} — {file.kind}, {file.pages} page(s), {file.extractedSkills} skills
                    extracted.
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Verification Level">
              <p>
                Level 2 — Document- and repository-backed. Skills flagged Unverified require reviewer
                confirmation before they may be cited in hiring decisions.
              </p>
            </Section>
            <Section title="Recommendations">
              <p>
                Proceed to technical interview focused on backend system design. Request supplementary
                evidence for Team Leadership and UI Design before assessing those competencies.
              </p>
            </Section>
          </Sheet>
        </TabsContent>

        <TabsContent value="candidate" className="mt-5">
          <Sheet>
            <h2 className="font-display text-2xl font-semibold">Candidate Report</h2>
            <p className="text-sm text-muted-foreground">
              Prepared for interview panels · {candidate.name} · {candidate.university}
            </p>
            <Section title="Candidate Information">
              <p>
                {candidate.name} — {candidate.headline}. {candidate.experienceYears} year(s) of
                experience. Passport {candidate.passportNumber}.
              </p>
            </Section>
            <Section title="Experience">
              <p>
                Backend Engineer Intern at Siam Digital (6 months, owned the notifications service);
                senior project lead on SkillGraph; hackathon team lead for a 5-person team.
              </p>
            </Section>
            <Section title="Skills & Supporting Evidence">
              <ul className="space-y-2">
                {verified.slice(0, 6).map((skill) => (
                  <li key={skill.id}>
                    <span className="font-medium">{skill.name}</span> —{" "}
                    <span className="text-muted-foreground">
                      “{skill.evidence[0]?.quote.slice(0, 120)}…” ({skill.evidence[0]?.sourceName})
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
            <Separator className="my-5" />
            <Section title="Strengths">
              <p>
                Measurable performance engineering, disciplined testing, containerised delivery, and
                research-grade evaluation methodology.
              </p>
            </Section>
            <Section title="Development Areas">
              <p>
                Event-driven architecture, large-scale system design, model serving, and accessibility
                practice.
              </p>
            </Section>
            <Section title="Role Fit">
              <ul className="list-disc space-y-1 pl-5">
                {jobRoles
                  .slice()
                  .sort((a, b) => b.matchScore - a.matchScore)
                  .slice(0, 4)
                  .map((role) => (
                    <li key={role.id}>
                      {role.title} — {role.matchScore}% match. {role.rationale}
                    </li>
                  ))}
              </ul>
            </Section>
          </Sheet>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}

function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <article className="panel mx-auto max-w-3xl space-y-4 p-8 text-sm leading-relaxed">
      {children}
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pt-2">
      <h3 className="border-b border-border pb-1 font-display text-sm font-semibold uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-2 space-y-1">{children}</div>
    </section>
  );
}
