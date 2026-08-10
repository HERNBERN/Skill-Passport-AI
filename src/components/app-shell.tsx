import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BadgeCheck,
  Bot,
  BookOpen,
  Briefcase,
  Columns3,
  FileStack,
  FileText,
  HeartHandshake,
  RefreshCcw,
  ScrollText,
  Sparkles,

  Github,
  LayoutDashboard,
  LogOut,
  Moon,
  ShieldCheck,
  Sun,
  Upload,
  Users,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { signOut, useSession, useTheme, type Session } from "@/lib/session";
import type { Role } from "@/data/demo";
import { cn } from "@/lib/utils";

const NAV: { to: string; label: string; icon: typeof LayoutDashboard; roles: Role[] }[] = [
  { to: "/dashboard", label: "แดชบอร์ด", icon: LayoutDashboard, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/upload", label: "อัปโหลดหลักฐาน", icon: Upload, roles: ["candidate"] },
  { to: "/skills", label: "ทักษะและหลักฐาน", icon: FileStack, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/github", label: "วิเคราะห์ GitHub", icon: Github, roles: ["candidate"] },
  { to: "/passport", label: "พาสปอร์ตทักษะ", icon: BadgeCheck, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/reevaluate", label: "ขอประเมินใหม่", icon: RefreshCcw, roles: ["candidate"] },
  { to: "/documents", label: "ศูนย์เอกสาร", icon: FileText, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/jobs", label: "จับคู่งาน", icon: Briefcase, roles: ["candidate"] },
  { to: "/roadmap", label: "เส้นทางการเรียนรู้", icon: BookOpen, roles: ["candidate"] },
  { to: "/recruiter", label: "ค้นหาผู้สมัคร", icon: Users, roles: ["recruiter"] },
  { to: "/compare", label: "เปรียบเทียบผู้สมัคร", icon: Columns3, roles: ["recruiter", "reviewer"] },
  { to: "/review", label: "คิวการตรวจสอบ", icon: ShieldCheck, roles: ["reviewer"] },
  { to: "/audit", label: "ร่องรอยหลักฐาน", icon: ScrollText, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/personas", label: "โปรไฟล์ตัวอย่าง", icon: Sparkles, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/impact", label: "ผลลัพธ์ทางสังคม", icon: HeartHandshake, roles: ["candidate", "recruiter", "reviewer"] },
  { to: "/assistant", label: "ผู้ช่วย AI", icon: Bot, roles: ["candidate", "recruiter", "reviewer"] },
];



export function AppShell({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { session, ready } = useSession();
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !session) void navigate({ to: "/auth" });
  }, [ready, session, navigate]);

  if (!ready || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Loading workspace…</p>
      </div>
    );
  }

  const items = NAV.filter((item) => item.roles.includes(session.role));

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <BadgeCheck className="size-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-sm font-semibold">SkillLens AI</p>
            <p className="text-eyebrow">Skill Passport</p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-2">
          {items.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <RoleCard session={session} />
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex flex-wrap items-center gap-3 px-4 py-4 sm:px-8">
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-xl font-semibold sm:text-2xl">{title}</h1>
              {description ? (
                <p className="mt-0.5 max-w-2xl text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              {actions}
              <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle dark mode">
                {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Sign out"
                onClick={() => {
                  signOut();
                  void navigate({ to: "/auth" });
                }}
              >
                <LogOut className="size-4" />
              </Button>
            </div>
          </div>
          <nav className="flex gap-1 overflow-x-auto border-t border-border px-3 py-2 lg:hidden">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "shrink-0 rounded-md px-3 py-1.5 text-xs",
                  pathname === item.to
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

function RoleCard({ session }: { session: Session }) {
  return (
    <div className="rounded-md bg-surface-raised p-3">
      <p className="truncate text-sm font-medium">{session.name}</p>
      <p className="truncate text-xs text-muted-foreground">{session.email}</p>
      <Badge variant="secondary" className="mt-2 capitalize">
        {session.role}
      </Badge>
    </div>
  );
}
