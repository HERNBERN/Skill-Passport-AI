import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PassportDocument } from "@/components/passport-document";
import { candidates, skills } from "@/data/demo";

export const Route = createFileRoute("/p/$passportNumber")({
  loader: ({ params }) => {
    const candidate = candidates.find((item) => item.passportNumber === params.passportNumber);
    if (!candidate) throw notFound();
    return { candidate };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Passport unavailable — SkillLens AI" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.candidate.name} — Public Skill Passport`;
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `Verified, evidence-linked skills for ${loaderData.candidate.name} (${loaderData.candidate.passportNumber}).`,
        },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: "Public verification of an evidence-linked Digital Skill Passport.",
        },
      ],
    };
  },
  component: PublicPassport,
  notFoundComponent: PassportNotFound,
});

function PublicPassport() {
  const { candidate } = Route.useLoaderData();
  const publicUrl = typeof window === "undefined" ? "" : window.location.href;
  const verifiedSkills = skills.filter((skill) => skill.verified);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <BadgeCheck className="size-4" />
            </span>
            <span className="font-display text-sm font-semibold">SkillLens AI</span>
          </Link>
          <Badge className="gap-1">
            <ShieldCheck className="size-3" />
            Public verification
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <PassportDocument candidate={candidate} skills={verifiedSkills} publicUrl={publicUrl} />
        <p className="mt-4 text-xs text-muted-foreground">
          หน้าสาธารณะนี้แสดงเฉพาะทักษะที่ผ่านการยืนยันแล้ว ข้อมูลติดต่อและไฟล์ต้นฉบับไม่ถูกเปิดเผย
        </p>
      </main>
    </div>
  );
}

function PassportNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">ไม่พบ Skill Passport นี้</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          หมายเลขพาสปอร์ตอาจไม่ถูกต้อง หรือเจ้าของได้ปิดการแชร์สาธารณะแล้ว
        </p>
        <Button asChild className="mt-6">
          <Link to="/">กลับหน้าแรก</Link>
        </Button>
      </div>
    </div>
  );
}
