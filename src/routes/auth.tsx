import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BadgeCheck, Github, Loader2, Mail } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_ACCOUNTS } from "@/data/demo";
import { signIn, useSession } from "@/lib/session";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — SkillLens AI" },
      {
        name: "description",
        content: "Sign in to SkillLens AI or use a demo account for candidate, recruiter or reviewer.",
      },
      { property: "og:title", content: "Sign in — SkillLens AI" },
      { property: "og:description", content: "Access your evidence-linked Digital Skill Passport." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [email, setEmail] = useState("candidate.demo@example.com");
  const [password, setPassword] = useState("Demo@1234");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && session) void navigate({ to: "/dashboard" });
  }, [ready, session, navigate]);

  function submit(nextEmail: string, nextPassword: string) {
    setBusy(true);
    window.setTimeout(() => {
      const result = signIn(nextEmail, nextPassword);
      setBusy(false);
      if (!result) {
        toast.error("อีเมลหรือรหัสผ่านไม่ถูกต้อง", {
          description: "ใช้บัญชีทดลองด้านล่างเพื่อเข้าสู่ระบบ",
        });
        return;
      }
      toast.success(`ยินดีต้อนรับ ${result.name}`);
      void navigate({ to: "/dashboard" });
    }, 450);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between border-r border-border bg-sidebar p-10 lg:flex">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BadgeCheck className="size-4" />
          </span>
          <span className="font-display text-base font-semibold">SkillLens AI</span>
        </Link>
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-semibold">
            ทุก Skill ต้องมีหลักฐานรองรับ
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            ระบบไม่แสดงคะแนนหรือทักษะที่ AI คาดเดาเอง ทุกผลลัพธ์อ้างอิงจากไฟล์ หน้า ย่อหน้า
            หรือ commit ที่ผู้ใช้อัปโหลดเท่านั้น
          </p>
        </div>
        <p className="text-xs text-muted-foreground">Demo environment · No production data</p>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold">เข้าสู่ระบบ</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your SkillLens AI workspace.
          </p>

          <Tabs defaultValue="login" className="mt-6">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="flex-1">
                Register
              </TabsTrigger>
              <TabsTrigger value="forgot" className="flex-1">
                Reset
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-5 space-y-4">
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  submit(email, password);
                }}
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? <Loader2 className="size-4 animate-spin" /> : null}
                  เข้าสู่ระบบ
                </Button>
              </form>

              <div className="relative py-2">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  หรือ
                </span>
              </div>

              <div className="grid gap-2">
                {["Google", "GitHub", "Microsoft"].map((provider) => (
                  <Button
                    key={provider}
                    type="button"
                    variant="outline"
                    onClick={() =>
                      toast.info(`Social login (${provider}) พร้อมเชื่อมต่อ`, {
                        description: "โครงสร้างพร้อมสำหรับ OAuth จริง — ใช้บัญชีทดลองในโหมด Demo",
                      })
                    }
                  >
                    {provider === "GitHub" ? (
                      <Github className="size-4" />
                    ) : (
                      <Mail className="size-4" />
                    )}
                    Continue with {provider}
                  </Button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="register" className="mt-5">
              <div className="rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground">
                การสมัครสมาชิกจริงจะเปิดใช้งานเมื่อเชื่อมต่อฐานข้อมูลและระบบยืนยันอีเมล
                ในโหมด Demo กรุณาใช้บัญชีทดลองด้านล่าง
              </div>
            </TabsContent>

            <TabsContent value="forgot" className="mt-5">
              <div className="rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground">
                ลิงก์รีเซ็ตรหัสผ่านจะถูกส่งทางอีเมลเมื่อเชื่อมต่อระบบผู้ใช้จริง
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-2">
            <p className="text-eyebrow">บัญชีทดลอง</p>
            {Object.entries(DEMO_ACCOUNTS).map(([demoEmail, account]) => (
              <button
                key={demoEmail}
                type="button"
                className="flex w-full items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-left transition-colors hover:bg-accent"
                onClick={() => {
                  setEmail(demoEmail);
                  setPassword(account.password);
                  submit(demoEmail, account.password);
                }}
              >
                <span className="min-w-0">
                  <span className="block truncate font-mono text-xs">{demoEmail}</span>
                  <span className="block font-mono text-[11px] text-muted-foreground">
                    {account.password}
                  </span>
                </span>
                <Badge variant="outline" className="ml-2 shrink-0 capitalize">
                  {account.role}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
