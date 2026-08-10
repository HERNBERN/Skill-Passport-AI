import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GitCommitHorizontal, Github, Star, Users } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { EvidenceItem } from "@/components/skill-evidence";
import { githubRepos, skills } from "@/data/demo";

export const Route = createFileRoute("/github")({
  head: () => ({
    meta: [
      { title: "GitHub Analyzer — SkillLens AI" },
      {
        name: "description",
        content:
          "Analyse repositories and usernames: languages, manifests, Dockerfiles, workflows, commits and contributors become cited skills.",
      },
      { property: "og:title", content: "GitHub Analyzer — SkillLens AI" },
      {
        property: "og:description",
        content: "Turn repository signals into skills with line-level evidence.",
      },
    ],
  }),
  component: GithubPage,
});

const githubEvidence = skills
  .flatMap((skill) => skill.evidence)
  .filter((evidence) => evidence.sourceType === "github");

function GithubPage() {
  const [target, setTarget] = useState("nattapong-dev");

  return (
    <AppShell
      title="GitHub Analyzer"
      description="วิเคราะห์ Repository URL หรือ GitHub Username เพื่อสกัดทักษะจากโค้ดจริง"
    >
      <form
        className="flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          toast.success(`วิเคราะห์ ${target} เรียบร้อย`, {
            description: "ผลลัพธ์ด้านล่างมาจากชุดข้อมูลตัวอย่างในโหมด Demo",
          });
        }}
      >
        <Input
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          placeholder="repository URL หรือ username"
          className="min-w-56 flex-1"
          aria-label="GitHub repository or username"
        />
        <Button type="submit">
          <Github className="size-4" />
          วิเคราะห์
        </Button>
      </form>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {githubRepos.map((repo) => (
          <section key={repo.name} className="panel p-5">
            <h2 className="truncate font-display text-base font-semibold">{repo.name}</h2>
            <div className="mt-2 flex flex-wrap gap-3 font-mono text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Star className="size-3" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitCommitHorizontal className="size-3" />
                {repo.commits} commits
              </span>
              <span className="flex items-center gap-1">
                <Users className="size-3" />
                {repo.contributors}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {repo.topics.map((topic) => (
                <Badge key={topic} variant="secondary">
                  {topic}
                </Badge>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              {Object.entries(repo.languages).map(([language, share]) => (
                <div key={language}>
                  <div className="flex justify-between text-xs">
                    <span>{language}</span>
                    <span className="font-mono text-muted-foreground">{share}%</span>
                  </div>
                  <Progress value={share} className="mt-1 h-1.5" />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold">Skills derived from repositories</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          ทุกทักษะอ้างอิงไฟล์ commit และหมายเลขบรรทัดที่ตรวจสอบย้อนกลับได้
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {githubEvidence.map((evidence) => (
            <EvidenceItem key={evidence.id} evidence={evidence} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
