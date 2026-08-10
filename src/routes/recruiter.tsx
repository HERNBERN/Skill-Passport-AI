import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { candidates } from "@/data/demo";

export const Route = createFileRoute("/recruiter")({
  head: () => ({
    meta: [
      { title: "Talent Search — SkillLens AI" },
      {
        name: "description",
        content:
          "Search, filter and compare candidates on evidence-backed skills with a skill matrix, radar comparison and recommendations.",
      },
      { property: "og:title", content: "Talent Search — SkillLens AI" },
      {
        property: "og:description",
        content: "Skills-based shortlisting with evidence you can open and check.",
      },
    ],
  }),
  component: RecruiterPage,
});

const SKILL_COLUMNS = [
  "TypeScript",
  "Python",
  "React",
  "PostgreSQL",
  "Docker",
  "AWS",
  "UI Design (Figma)",
];

const CHART_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

function RecruiterPage() {
  const [query, setQuery] = useState("");
  const [university, setUniversity] = useState("All");
  const [minReadiness, setMinReadiness] = useState("0");
  const [selected, setSelected] = useState<string[]>(["c1", "c2"]);

  const universities = ["All", ...new Set(candidates.map((c) => c.university))];

  const filtered = useMemo(
    () =>
      candidates.filter(
        (candidate) =>
          (university === "All" || candidate.university === university) &&
          candidate.workReadiness >= Number(minReadiness) &&
          (candidate.name.toLowerCase().includes(query.toLowerCase()) ||
            candidate.topSkills.join(" ").toLowerCase().includes(query.toLowerCase()) ||
            candidate.githubUser.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, university, minReadiness],
  );

  const compared = candidates.filter((candidate) => selected.includes(candidate.id)).slice(0, 3);

  const radarData = SKILL_COLUMNS.map((skill) => {
    const row: Record<string, string | number> = { skill: skill.replace(" (Figma)", "") };
    compared.forEach((candidate) => {
      row[candidate.name] = candidate.topSkills.includes(skill)
        ? Math.round(candidate.workReadiness * 0.9)
        : 25;
    });
    return row;
  });

  return (
    <AppShell
      title="Talent Search"
      description="ค้นหาและเปรียบเทียบผู้สมัครจากทักษะที่มีหลักฐานรองรับ"
      actions={
        <Button
          size="sm"
          variant="outline"
          onClick={() => toast.success("กำลังจัดทำรายงาน", { description: "Skill Verification Report (PDF)" })}
        >
          <Download className="size-4" />
          ดาวน์โหลดรายงาน
        </Button>
      }
    >
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ค้นหาชื่อ ทักษะ หรือ GitHub…"
            className="pl-9"
            aria-label="Search candidates"
          />
        </div>
        <Select value={university} onValueChange={setUniversity}>
          <SelectTrigger className="w-56" aria-label="Filter by university">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {universities.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={minReadiness} onValueChange={setMinReadiness}>
          <SelectTrigger className="w-48" aria-label="Minimum work readiness">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["0", "60", "70", "80"].map((value) => (
              <SelectItem key={value} value={value}>
                Readiness ≥ {value}%
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <section className="panel mt-5 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <span className="sr-only">Compare</span>
              </TableHead>
              <TableHead>Candidate</TableHead>
              <TableHead>University</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Readiness</TableHead>
              {SKILL_COLUMNS.map((skill) => (
                <TableHead key={skill} className="whitespace-nowrap text-center text-[11px]">
                  {skill}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(candidate.id)}
                    aria-label={`Compare ${candidate.name}`}
                    onCheckedChange={(checked) =>
                      setSelected((prev) =>
                        checked
                          ? [...prev, candidate.id].slice(-3)
                          : prev.filter((id) => id !== candidate.id),
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <p className="whitespace-nowrap font-medium">{candidate.name}</p>
                  <p className="font-mono text-[11px] text-muted-foreground">
                    @{candidate.githubUser} · {candidate.experienceYears}y
                  </p>
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                  {candidate.university}
                </TableCell>
                <TableCell>
                  <Badge variant={candidate.verificationStatus === "Verified" ? "default" : "outline"}>
                    {candidate.verificationStatus}
                  </Badge>
                </TableCell>
                <TableCell className="w-32">
                  <span className="font-mono text-xs">{candidate.workReadiness}%</span>
                  <Progress value={candidate.workReadiness} className="mt-1 h-1.5" />
                </TableCell>
                {SKILL_COLUMNS.map((skill) => (
                  <TableCell key={skill} className="text-center">
                    {candidate.topSkills.includes(skill) ? (
                      <span className="inline-block size-2.5 rounded-full bg-primary" />
                    ) : (
                      <span className="inline-block size-2.5 rounded-full bg-border" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            ไม่พบผู้สมัครที่ตรงกับเงื่อนไข — ลองลดเงื่อนไขการกรอง
          </p>
        ) : null}
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Comparison radar</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            เลือกได้สูงสุด 3 คน — คะแนนอ้างอิงทักษะที่ยืนยันแล้วเท่านั้น
          </p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="70%">
                <PolarGrid stroke="var(--color-border)" />
                <PolarAngleAxis
                  dataKey="skill"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                {compared.map((candidate, index) => (
                  <Radar
                    key={candidate.id}
                    name={candidate.name}
                    dataKey={candidate.name}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    fillOpacity={0.22}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="panel p-5">
          <h2 className="font-display text-lg font-semibold">Recommendation</h2>
          <ul className="mt-3 space-y-3">
            {compared.map((candidate) => (
              <li key={candidate.id} className="rounded-md border border-border bg-surface p-4">
                <p className="font-medium">{candidate.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {candidate.verificationStatus === "Verified"
                    ? `แนะนำให้เข้าสัมภาษณ์: ทักษะหลัก ${candidate.topSkills.slice(0, 3).join(", ")} มีหลักฐานยืนยันครบ`
                    : `ควรขอหลักฐานเพิ่มเติมก่อนสัมภาษณ์ เนื่องจากสถานะยังเป็น ${candidate.verificationStatus}`}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
