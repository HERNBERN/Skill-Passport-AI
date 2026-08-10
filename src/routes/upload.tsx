import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, FileUp, Github, Globe, Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { evidenceFiles, pipelineStages } from "@/data/demo";
import { cn } from "@/lib/utils";
import {
  convertParsedResumeToSkills,
  extractSkills,
  parseResumeTextToSkills,
  type ParsedResumeOutput,
} from "@/services/ai/skill-extractor";
import { matchJobs } from "@/services/ai/job-matcher";
import { clearPipelineState, readPipelineState, savePipelineState } from "@/lib/pipeline-state";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Smart Upload — SkillLens AI" },
      {
        name: "description",
        content:
          "อัปโหลดไฟล์หรือวางข้อความเรซูเม่ แล้วรัน pipeline วิเคราะห์ทักษะและหลักฐานอย่างโปร่งใส",
      },
      { property: "og:title", content: "Smart Upload — SkillLens AI" },
      {
        property: "og:description",
        content: "ระบบ pipeline แบบโปร่งใสตั้งแต่ OCR ถึง Skill Passport เพื่อจับคู่งานด้วยหลักฐานจริง",
      },
    ],
  }),
  component: UploadPage,
});

const ACCEPTED = ".pdf,.docx,.pptx,.png,.jpg,.jpeg,.txt";

function UploadPage() {
  const [stage, setStage] = useState(-1);
  const [stages, setStages] = useState<string[]>([...pipelineStages]);
  const [running, setRunning] = useState(false);
  const [queued, setQueued] = useState<string[]>([]);
  const [status, setStatus] = useState("พร้อมวิเคราะห์หลักฐาน");
  const [githubUrl, setGithubUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [pipelineState, setPipelineState] = useState(readPipelineState());
  const [parsedResume, setParsedResume] = useState<ParsedResumeOutput | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setPipelineState(readPipelineState());
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function updateQueue(label: string) {
    setQueued((prev) => [label, ...prev].slice(0, 6));
  }

  async function runPipeline(
    label: string,
    fileNames: string[] = [],
    urls: string[] = [],
    textFields?: { resumeText?: string; jobDescription?: string },
  ) {
    if (running) return;

    const hasInput = fileNames.length > 0 || urls.length > 0 || !!textFields?.resumeText?.trim() || !!textFields?.jobDescription?.trim();
    if (!hasInput) {
      setStatus("โปรดใส่หลักฐานก่อนเริ่มการวิเคราะห์");
      toast.error("โปรดเลือกไฟล์หรือระบุข้อความก่อนเริ่มการวิเคราะห์");
      return;
    }

    updateQueue(label);
    setRunning(true);
    setStage(0);
    setStages([...pipelineStages]);
    setStatus("เตรียมระบบ AI สำหรับการวิเคราะห์...");

    const input = {
      fileNames,
      urls,
      resumeText: textFields?.resumeText,
      jobDescription: textFields?.jobDescription,
    };

    let current = 0;
    timerRef.current = setInterval(() => {
      current = Math.min(current + 1, pipelineStages.length - 1);
      setStage(current);
      setStatus(`ทำงาน: ${pipelineStages[current]}`);
      if (current >= pipelineStages.length - 1 && timerRef.current) {
        clearInterval(timerRef.current);
      }
    }, 450);

    try {
      let skills = [];
      let parsed: ParsedResumeOutput | null = null;

      if (input.resumeText?.trim()) {
        parsed = await parseResumeTextToSkills(input.resumeText.trim());
        setParsedResume(parsed);
      } else {
        setParsedResume(null);
      }

      if (!fileNames.length && !urls.length && parsed) {
        skills = convertParsedResumeToSkills(parsed);
        setStatus(`สกัดได้ ${skills.length} ทักษะจากเรซูเม่ กำลังเทียบกับตำแหน่งงาน...`);
      } else {
        const result = await extractSkills(input as {
          fileNames?: string[];
          urls?: string[];
          resumeText?: string;
          jobDescription?: string;
        });
        skills = result.skills;
        setStages([...result.stages]);
        setStatus(`สกัดได้ ${skills.length} ทักษะ กำลังจับคู่ตำแหน่งงาน…`);
      }

      const jobMatches = await matchJobs("c1", skills, {
        roleDescription: input.jobDescription ?? "",
      });
      savePipelineState(skills, jobMatches);
      setPipelineState(readPipelineState());
      setStatus(`วิเคราะห์เสร็จสิ้น พบ ${skills.length} ทักษะ และจับคู่ได้ ${jobMatches.length} ตำแหน่ง`);
      toast.success("วิเคราะห์เสร็จสิ้น", {
        description: "สร้าง Skill Passport และ Job Matching แล้ว — ดูผลลัพธ์ได้ที่หน้า Passport และ Jobs",
      });
    } catch (error) {
      console.error(error);
      setStatus("การวิเคราะห์ล้มเหลว โปรดลองอีกครั้ง");
      toast.error("เกิดข้อผิดพลาดระหว่างการวิเคราะห์", {
        description: "ลองรีเฟรชหน้าแล้วรัน pipeline ใหม่อีกครั้ง",
      });
    } finally {
      setRunning(false);
      setStage(stages.length - 1);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }

  function clearSavedPipeline() {
    clearPipelineState();
    setPipelineState(null);
    toast.success("ล้างสถานะ pipeline แล้ว");
  }

  return (
    <AppShell
      title="Smart Upload"
      description="รองรับ PDF, DOCX, PPTX, PNG, JPG, TXT รวมถึง GitHub URL, Portfolio URL, Resume Text และ Job Description"
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <Tabs defaultValue="files">
            <TabsList>
              <TabsTrigger value="files">ไฟล์</TabsTrigger>
              <TabsTrigger value="links">ลิงก์</TabsTrigger>
              <TabsTrigger value="text">ข้อความ</TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="mt-4">
              <label
                htmlFor="file-input"
                className="panel flex cursor-pointer flex-col items-center justify-center gap-3 border-dashed p-10 text-center transition-colors hover:bg-accent/40"
              >
                <UploadCloud className="size-8 text-primary" />
                <span className="font-display text-base font-semibold">
                  ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์
                </span>
                <span className="text-xs text-muted-foreground">
                  PDF · DOCX · PPTX · PNG · JPG · TXT — สูงสุด 20MB ต่อไฟล์
                </span>
                <input
                  id="file-input"
                  type="file"
                  className="sr-only"
                  accept={ACCEPTED}
                  multiple
                  onChange={(event) => {
                    const names = Array.from(event.target.files ?? []).map((f) => f.name);
                    if (names.length) runPipeline("อัปโหลดไฟล์", names);
                  }}
                />
              </label>
              <Button className="mt-4" onClick={() => runPipeline("ชุดหลักฐานตัวอย่าง", evidenceFiles.map((file) => file.name))}>
                <FileUp className="size-4" />
                ใช้ชุดข้อมูลตัวอย่าง
              </Button>
            </TabsContent>

            <TabsContent value="links" className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="gh">GitHub URL หรือ Username</Label>
                <Input
                  id="gh"
                  value={githubUrl}
                  onChange={(event) => setGithubUrl(event.target.value)}
                  placeholder="https://github.com/nattapong-dev/skillgraph-api"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="portfolio">Portfolio URL</Label>
                <Input
                  id="portfolio"
                  value={portfolioUrl}
                  onChange={(event) => setPortfolioUrl(event.target.value)}
                  placeholder="https://nattapong.dev"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (!githubUrl.trim()) {
                      toast.error("โปรดระบุ GitHub URL ก่อน");
                      return;
                    }
                    runPipeline("วิเคราะห์ GitHub", [], [githubUrl.trim()]);
                  }}
                >
                  <Github className="size-4" />
                  วิเคราะห์ Repository
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (!portfolioUrl.trim()) {
                      toast.error("โปรดระบุ Portfolio URL ก่อน");
                      return;
                    }
                    runPipeline("วิเคราะห์ Portfolio", [], [portfolioUrl.trim()]);
                  }}
                >
                  <Globe className="size-4" />
                  วิเคราะห์ Portfolio
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="text" className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="resume">ข้อความเรซูเม่</Label>
                <Textarea
                  id="resume"
                  rows={6}
                  value={resumeText}
                  onChange={(event) => setResumeText(event.target.value)}
                  placeholder="วางข้อความเรซูเม่ที่นี่…"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="jd">รายละเอียดตำแหน่งงาน</Label>
                <Textarea
                  id="jd"
                  rows={5}
                  value={jobDescription}
                  onChange={(event) => setJobDescription(event.target.value)}
                  placeholder="วางรายละเอียดตำแหน่งงานเพื่อเทียบคะแนนความเหมาะสม…"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  onClick={() =>
                    runPipeline("วิเคราะห์ข้อความเรซูเม่", [], [], {
                      resumeText,
                      jobDescription,
                    })
                  }
                >
                  วิเคราะห์ข้อความเรซูเม่
                </Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!resumeText.trim()) {
                      toast.error("โปรดวางข้อความเรซูเม่ก่อนดูตัวอย่าง");
                      return;
                    }

                    try {
                      const parsed = await parseResumeTextToSkills(resumeText.trim());
                      setParsedResume(parsed);
                      setStatus("สร้างตัวอย่างการสกัดทักษะจากข้อความเรซูเม่แล้ว");
                      toast.success("ตัวอย่างทักษะพร้อมแล้ว", {
                        description: `พบ ${parsed.skills.length} ทักษะจากข้อความเรซูเม่`,
                      });
                    } catch (error) {
                      console.error(error);
                      toast.error("ไม่สามารถแยกข้อความเรซูเม่ได้ กรุณาลองใหม่อีกครั้ง");
                    }
                  }}
                >
                  ดูตัวอย่างการสกัดทักษะ
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <section className="panel p-5">
            <h2 className="font-display text-lg font-semibold">ขั้นตอนการวิเคราะห์</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              ทุกขั้นตอนแสดงสถานะจริง เพื่อให้ตรวจสอบย้อนกลับได้ว่าผลลัพธ์มาจากไหน
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{status}</p>
            <Progress
              value={stage < 0 ? 0 : ((stage + 1) / stages.length) * 100}
              className="mt-4 h-1.5"
            />
            <ol className="mt-4 space-y-2">
              {stages.map((label, index) => {
                const done = stage > index || (stage === stages.length - 1 && !running);
                const active = running && stage === index;
                return (
                  <li
                    key={label}
                    className={cn(
                      "flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm",
                      active && "bg-accent",
                      done && "text-foreground",
                      !done && !active && "text-muted-foreground",
                    )}
                  >
                    <span className="flex size-5 items-center justify-center rounded-full border border-border-strong">
                      {done ? (
                        <Check className="size-3 text-success" />
                      ) : active ? (
                        <Loader2 className="size-3 animate-spin text-primary" />
                      ) : (
                        <span className="font-mono text-[10px]">{index + 1}</span>
                      )}
                    </span>
                    {label}
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <aside className="space-y-4">
          <section className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-base font-semibold">สถานะล่าสุดของ pipeline</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pipelineState
                    ? `อัปเดตล่าสุด ${new Date(pipelineState.updatedAt).toLocaleString()}`
                    : "ยังไม่มีผลลัพธ์จากการรัน pipeline"}
                </p>
              </div>
              {pipelineState ? (
                <Button size="sm" variant="outline" onClick={clearSavedPipeline}>
                  เคลียร์
                </Button>
              ) : null}
            </div>
            {parsedResume ? (
              <div className="mt-4 rounded-lg border border-border p-4 bg-surface">
                <h3 className="font-display text-sm font-semibold">ตัวอย่างผลการสกัดเรซูเม่</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  แสดงตัวอย่างทักษะและคะแนน readiness ที่แขวนกับข้อมูลเรซูเม่ก่อนส่งให้ AI ประมวลผล
                </p>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="flex items-center justify-between gap-2 rounded-md bg-muted p-2">
                    <span>ความพร้อมทำงาน</span>
                    <span className="font-semibold">{parsedResume.overall_readiness.score}%</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-[11px] text-muted-foreground">ปัญหา</p>
                      <p className="font-semibold">{parsedResume.overall_readiness.dimensions.Problem}%</p>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-[11px] text-muted-foreground">งาน</p>
                      <p className="font-semibold">{parsedResume.overall_readiness.dimensions.Work}%</p>
                    </div>
                    <div className="rounded-md bg-muted p-2 text-center">
                      <p className="text-[11px] text-muted-foreground">ทีม</p>
                      <p className="font-semibold">{parsedResume.overall_readiness.dimensions.Team}%</p>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {parsedResume.overall_readiness.pillars.map((pillar) => (
                      <div key={pillar.pillar} className="rounded-md border border-border p-3 bg-card">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium">{pillar.label}</p>
                            <p className="text-xs text-muted-foreground">{pillar.rating}</p>
                          </div>
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                            {pillar.score}%
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">ความมั่นใจ {Math.round(pillar.confidence * 100)}%</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {parsedResume.skills.slice(0, 4).map((skill) => (
                      <div key={skill.skill_name} className="rounded-md border border-border p-3 bg-card">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium">{skill.skill_name}</p>
                            <p className="text-xs text-muted-foreground">{skill.category} · {skill.esco_code}</p>
                          </div>
                          <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
                            {(skill.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{skill.evidence_snippet}</p>
                      </div>
                    ))}
                    {parsedResume.skills.length > 4 ? (
                      <p className="text-xs text-muted-foreground">+{parsedResume.skills.length - 4} ทักษะที่สกัดเพิ่มเติม</p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
          </section>

          <section className="panel p-5">
            <h2 className="font-display text-base font-semibold">หลักฐานที่มีอยู่</h2>
            <ul className="mt-3 space-y-2">
              {evidenceFiles.map((file) => (
                <li key={file.id} className="rounded-md border border-border bg-surface p-3">
                  <p className="truncate text-sm font-medium">{file.name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="secondary">{file.kind}</Badge>
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {file.extractedSkills} ทักษะ
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
