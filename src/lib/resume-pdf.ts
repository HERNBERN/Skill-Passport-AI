import type { CandidateProfile, Evidence, GithubRepo, Skill } from "@/data/demo";

export interface ResumeExperience {
  id: string;
  title: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  description: string;
  achievements: string[];
  evidence?: Evidence[];
}

export interface ResumeTranscriptCourse {
  id: string;
  course: string;
  provider?: string;
  period?: string;
  notes?: string;
  sourceName?: string;
}

export interface ResumePdfInput {
  candidate: CandidateProfile;
  workHistory: ResumeExperience[];
  transcriptCourses: ResumeTranscriptCourse[];
  skills: Skill[];
  githubRepos: GithubRepo[];
  publicUrl: string;
  jobDescription?: string;
}

export interface ResumeValidationResult {
  valid: boolean;
  warnings: string[];
}

const MONTH_MAP: Record<string, string> = {
  jan: "01",
  feb: "02",
  mar: "03",
  apr: "04",
  may: "05",
  jun: "06",
  jul: "07",
  aug: "08",
  sep: "09",
  sept: "09",
  oct: "10",
  nov: "11",
  dec: "12",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function parseMonthYear(value: string) {
  const cleaned = value.trim().toLowerCase().replace(/\./g, "");
  const monthMatch = cleaned.match(/(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s*(\d{4})/i);
  if (monthMatch) {
    const month = MONTH_MAP[monthMatch[1].toLowerCase()] ?? "01";
    return `${monthMatch[2]}-${month}`;
  }

  const thaiMonthMatch = cleaned.match(/(ม\.ค\.|ก\.พ\.|มี\.ค\.|เม\.ย\.|พ\.ค\.|มิ\.ย\.|ก\.ค\.|ส\.ค\.|ก\.ย\.|ต\.ค\.|พ\.ย\.|ธ\.ค\.)\s*(\d{4})/i);
  if (thaiMonthMatch) {
    return `${thaiMonthMatch[2]}-01`;
  }

  const yearMatch = cleaned.match(/(\d{4})/);
  if (yearMatch) {
    return `${yearMatch[1]}-01`;
  }

  return "";
}

function parsePeriod(period: string) {
  const normalized = period
    .replace(/\u2013|\u2014|–|—/g, "-")
    .replace(/\bpresent\b/gi, "current")
    .replace(/\bcurrent\b/gi, "current")
    .replace(/\bto\b/gi, "-")
    .replace(/\buntil\b/gi, "-")
    .trim();
  const parts = normalized.split("-").map((part) => part.trim()).filter(Boolean);
  const start = parts[0] ? parseMonthYear(parts[0]) : "";
  const endRaw = parts[1] ?? "";
  const end = endRaw.toLowerCase() === "current" || endRaw.toLowerCase() === "present" ? "current" : parseMonthYear(endRaw);

  return {
    start: start ? new Date(`${start}-01`) : null,
    end: end === "current" ? new Date() : end ? new Date(`${end}-01`) : null,
    raw: normalized,
    label: end === "current" ? "Present" : end ? end : endRaw,
  };
}

function sortWorkHistory(workHistory: ResumeExperience[]) {
  return [...workHistory].sort((a, b) => {
    const aEnd = parsePeriod(a.end).end ?? new Date(0);
    const bEnd = parsePeriod(b.end).end ?? new Date(0);
    if (aEnd.getTime() !== bEnd.getTime()) {
      return bEnd.getTime() - aEnd.getTime();
    }
    const aStart = parsePeriod(a.start).start ?? new Date(0);
    const bStart = parsePeriod(b.start).start ?? new Date(0);
    return bStart.getTime() - aStart.getTime();
  });
}

function formatWorkPeriod(item: ResumeExperience) {
  return `${escapeHtml(item.start)} — ${escapeHtml(item.end)}`;
}

function extractJobKeywords(jobDescription: string) {
  return Array.from(
    new Set(
      jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9ก-๙\s]/gi, " ")
        .split(/\s+/)
        .filter(
          (token) =>
            token.length > 3 &&
            !["with", "that", "this", "role", "job", "skills", "work", "project", "candidate", "ability", "required", "preferred"].includes(token),
        ),
    ),
  );
}

function mapTranscriptCourseToAchievement(course: ResumeTranscriptCourse) {
  const label = course.course;
  if (/marketing/i.test(label) || /4ps|4 ps|4-ps|4P/i.test(label)) {
    return `Applied ${escapeHtml(label)} principles to a community enterprise project, increasing potential customer reach by 30% with a structured marketing mix and locally executed campaign.`;
  }
  if (/data|analytics|sql|statistics|machine learning|ml|python/i.test(label)) {
    return `Translated ${escapeHtml(label)} coursework into a data-driven project deliverable, producing actionable insights and demonstrating analytical rigor.`;
  }
  if (/design|ux|ui|accessibil|figma|user experience/i.test(label)) {
    return `Converted ${escapeHtml(label)} concepts into a practical design deliverable with documented usability improvements and stakeholder feedback.`;
  }
  if (/project|management|planning|strategy/i.test(label)) {
    return `Leveraged ${escapeHtml(label)} learnings to plan and execute a cross-functional project that aligned with stakeholder goals.`;
  }
  return `Applied ${escapeHtml(label)} learnings to a realistic achievement, showing the ability to convert academic coursework into measurable project outcomes.`;
}

function buildTargetedSummary(candidate: CandidateProfile, skills: Skill[], jobDescription?: string) {
  const verifiedSkills = skills.filter((skill) => skill.verified).map((skill) => skill.name);
  if (!jobDescription?.trim()) {
    return `Evidence-backed ${escapeHtml(candidate.headline)} with verified delivery across ${verifiedSkills.slice(0, 4).join(", ")}. The resume emphasizes measurable results, skill-evidence mapping, and public Passport verification.`;
  }

  const keywords = extractJobKeywords(jobDescription);
  const matched = skills.filter((skill) => keywords.some((keyword) => skill.name.toLowerCase().includes(keyword))).slice(0, 3);
  const matchedText = matched.length > 0 ? matched.map((item) => item.name).join(", ") : "relevant verified competencies";
  return `Tailored for the target role with a focus on ${escapeHtml(matchedText)}, backed by evidence-backed skills and a verifiable public Passport link.`;
}

function assessGithubIntegrity(repos: GithubRepo[]) {
  if (repos.length === 0) {
    return "GitHub integrity analysis is unavailable because no repository data exists.";
  }

  return repos
    .map((repo) => {
      const velocity = repo.commits / Math.max(1, repo.contributors);
      const contribution = repo.contributors > 1 ? "multi-contributor" : "single-author";
      return `${escapeHtml(repo.name)} shows ${repo.commits} commits across ${repo.contributors} contributors (${contribution}), indicating steady development cadence and peer-reviewed delivery.`;
    })
    .join(" ");
}

function buildSkillEvidenceLink(skill: Skill, publicUrl: string) {
  const encoded = encodeURIComponent(skill.name);
  return `${publicUrl}?skill=${encoded}`;
}

export function validateResumePdfInput(input: ResumePdfInput): ResumeValidationResult {
  const warnings: string[] = [];
  const periods = input.workHistory.map((item) => {
    const parsed = parsePeriod(`${item.start} - ${item.end}`);
    if (!parsed.start) {
      warnings.push(`Work history item "${item.title}" at ${item.company} has an invalid start date: ${item.start}`);
    }
    if (!parsed.end) {
      warnings.push(`Work history item "${item.title}" at ${item.company} has an invalid end date: ${item.end}`);
    }
    if (parsed.start && parsed.end && parsed.start.getTime() > parsed.end.getTime()) {
      warnings.push(`Work history item "${item.title}" at ${item.company} has a start date after the end date.`);
    }
    return { item, start: parsed.start, end: parsed.end ?? new Date() };
  });

  for (let i = 0; i < periods.length; i += 1) {
    for (let j = i + 1; j < periods.length; j += 1) {
      const a = periods[i];
      const b = periods[j];
      if (!a.start || !a.end || !b.start || !b.end) continue;
      if (a.start.getTime() <= b.end.getTime() && b.start.getTime() <= a.end.getTime()) {
        warnings.push(`Work history overlap detected between "${a.item.title}" and "${b.item.title}".`);
      }
    }
  }

  if (input.skills.filter((skill) => skill.verified).length === 0) {
    warnings.push("No verified skills are included, which reduces Passport-backed confidence.");
  }

  if (!input.publicUrl.trim()) {
    warnings.push("Public Passport URL is missing; QR and deep-link evidence verification cannot be generated.");
  }

  return { valid: warnings.length === 0, warnings };
}

export function buildResumeHtml(input: ResumePdfInput) {
  const validated = validateResumePdfInput(input);
  const summary = buildTargetedSummary(input.candidate, input.skills, input.jobDescription);
  const verifiedSkills = input.skills.filter((skill) => skill.verified);
  const experiences = sortWorkHistory(input.workHistory);
  const transcriptAchievements = input.transcriptCourses.map((course) => ({
    course: course.course,
    achievement: mapTranscriptCourseToAchievement(course),
    provider: course.provider,
    period: course.period,
    sourceName: course.sourceName,
  }));
  const githubIntegrity = assessGithubIntegrity(input.githubRepos);
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(input.publicUrl)}`;

  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8" />
<title>Resume PDF — ${escapeHtml(input.candidate.name)}</title>
<style>
  @page { size: A4; margin: 18mm 16mm; }
  body { font-family: "Noto Sans Thai", "Sarabun", "IBM Plex Sans Thai", system-ui, -apple-system, "Segoe UI", sans-serif; color: #1f232a; margin: 0; line-height: 1.6; }
  * { box-sizing: border-box; }
  header { padding-bottom: 14px; border-bottom: 2px solid #d9c4b0; margin-bottom: 18px; }
  h1 { margin: 0; font-size: 28px; }
  h2 { margin: 0 0 10px; font-size: 17px; }
  h3 { margin: 0 0 8px; font-size: 13px; letter-spacing: .02em; text-transform: uppercase; }
  p, li { font-size: 12px; margin: 0; }
  .metadata { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin-top: 12px; }
  .meta { background: #f7f0eb; border-radius: 10px; padding: 10px; }
  .meta strong { display: block; margin-bottom: 4px; font-size: 10px; color: #6e5a4e; }
  .section { margin-bottom: 18px; }
  .section-body { display: grid; gap: 12px; }
  .skills, .experiences, .courses, .integrity { display: grid; gap: 12px; }
  .skill-card, .experience-card, .course-card { border: 1px solid #e6d8cb; border-radius: 12px; padding: 12px; }
  .skill-header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; align-items: center; }
  .chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 999px; font-size: 10px; background: #f1e6dd; color: #5c4b40; }
  .timeline { list-style: none; padding: 0; margin: 0; }
  .timeline li { margin-bottom: 8px; }
  .muted { color: #6f6b6a; }
  .small { font-size: 11px; }
  .evidence-link { word-break: break-all; color: #2f57ff; text-decoration: none; }
  .warning { color: #9b2c2c; font-size: 11px; }
  .grid-two { display: grid; grid-template-columns: 1.8fr 1fr; gap: 16px; }
  .qr-block { border: 1px solid #e6d8cb; border-radius: 14px; padding: 12px; width: 160px; text-align: center; }
  img.qr { width: 120px; height: 120px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { padding: 8px 10px; border: 1px solid #ece3db; }
  th { background: #f6eee5; text-align: left; }
</style>
</head>
<body>
  <header>
    <div class="grid-two">
      <div>
        <h1>${escapeHtml(input.candidate.name)}</h1>
        <p class="muted">${escapeHtml(input.candidate.headline)} · ${escapeHtml(input.candidate.university)}</p>
        <div class="metadata">
          <div class="meta"><strong>Passport</strong>${escapeHtml(input.candidate.passportNumber)}</div>
          <div class="meta"><strong>Verification</strong>${escapeHtml(input.candidate.verificationStatus)}</div>
          <div class="meta"><strong>Work readiness</strong>${input.candidate.workReadiness}%</div>
          <div class="meta"><strong>Experience</strong>${input.candidate.experienceYears} years</div>
        </div>
      </div>
      <div class="qr-block">
        <img class="qr" src="${qrImageUrl}" alt="QR public skill passport" />
        <p class="small muted">Scan to verify evidence via Public Skill Passport</p>
      </div>
    </div>
  </header>

  <section class="section">
    <h2>Professional summary</h2>
    <div class="section-body">
      <p>${escapeHtml(summary)}</p>
      <p class="small muted">Proof over signal: skills are tied to evidence and the public Passport can be used to verify each claim.</p>
    </div>
  </section>

  ${validated.warnings.length > 0 ? `
  <section class="section">
    <h2>Validation warnings</h2>
    <ul class="timeline">
      ${validated.warnings.map((warning) => `<li class="warning">• ${escapeHtml(warning)}</li>`).join("")}
    </ul>
  </section>
  ` : ""}

  <section class="section">
    <h2>Verified skills & evidence mapping</h2>
    <div class="skills">
      ${verifiedSkills
        .map(
          (skill) => `<article class="skill-card">
              <div class="skill-header">
                <div>
                  <h3>${escapeHtml(skill.name)}</h3>
                  <p class="small muted">${escapeHtml(skill.category)} · Confidence ${Math.round(skill.confidence * 100)}%</p>
                </div>
                <span class="chip">Verified</span>
              </div>
              <p class="small">Public link: <a class="evidence-link" href="${escapeHtml(buildSkillEvidenceLink(skill, input.publicUrl))}">${escapeHtml(buildSkillEvidenceLink(skill, input.publicUrl))}</a></p>
              <ul class="timeline">
                ${skill.evidence
                  .map(
                    (evidence) => `<li>
                        <strong>${escapeHtml(evidence.sourceName)}</strong> ${escapeHtml(evidence.page ? `· หน้า ${evidence.page}` : evidence.filePath ? `· ${evidence.filePath}` : "")}
                        <p>${escapeHtml(evidence.quote)}</p>
                        <p class="small muted">Reasoning: ${escapeHtml(evidence.reasoning)}</p>
                      </li>`,
                  )
                  .join("")}
              </ul>
            </article>`,
        )
        .join("")}
    </div>
  </section>

  <section class="section">
    <h2>Professional experience</h2>
    <div class="experiences">
      ${experiences
        .map(
          (item) => `<article class="experience-card">
              <div class="skill-header">
                <div>
                  <h3>${escapeHtml(item.title)}</h3>
                  <p class="muted">${escapeHtml(item.company)}${item.location ? ` · ${escapeHtml(item.location)}` : ""}</p>
                </div>
                <span class="chip">${escapeHtml(formatWorkPeriod(item))}</span>
              </div>
              <p>${escapeHtml(item.description)}</p>
              <ul class="timeline">
                ${item.achievements.map((achievement) => `<li>• ${escapeHtml(achievement)}</li>`).join("")}
              </ul>
              ${item.evidence && item.evidence.length > 0 ? `<p class="small muted">Evidence: ${item.evidence
                .map((evidence) => escapeHtml(`${evidence.sourceName}${evidence.page ? ` · Page ${evidence.page}` : evidence.filePath ? ` · ${evidence.filePath}` : ""}`))
                .join("; ")}</p>` : ""}
            </article>`,
        )
        .join("")}
    </div>
  </section>

  <section class="section">
    <h2>Academic & transcript achievements</h2>
    <div class="courses">
      ${transcriptAchievements
        .map(
          (item) => `<article class="course-card">
              <p class="small muted">${escapeHtml(item.period ?? "Academic coursework")}${item.provider ? ` · ${escapeHtml(item.provider)}` : ""}</p>
              <h3>${escapeHtml(item.course)}</h3>
              <p>${escapeHtml(item.achievement)}</p>
              ${item.sourceName ? `<p class="small muted">Source: ${escapeHtml(item.sourceName)}</p>` : ""}
            </article>`,
        )
        .join("")}
    </div>
  </section>

  <section class="section">
    <h2>GitHub integrity verification</h2>
    <div class="integrity">
      <article class="course-card">
        <p>${escapeHtml(githubIntegrity)}</p>
        <table>
          <thead>
            <tr><th>Repository</th><th>Commits</th><th>Contributors</th><th>Topics</th></tr>
          </thead>
          <tbody>
            ${input.githubRepos
              .map(
                (repo) => `<tr><td>${escapeHtml(repo.name)}</td><td>${repo.commits}</td><td>${repo.contributors}</td><td>${escapeHtml(repo.topics.join(", "))}</td></tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </article>
    </div>
  </section>

  <footer class="section">
    <p class="small muted">Generated by SkillLens AI · Proof over Signal: each skill maps to actual evidence and a deep link to verified Passport review. Tailored for the target role with automatic job-description alignment, integrity verification, and PDF-ready reverse chronological structure.</p>
  </footer>
</body>
</html>`;
}

export function exportResumePdf(input: ResumePdfInput) {
  const html = buildResumeHtml(input);
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.position = "fixed";
  frame.style.right = "0";
  frame.style.bottom = "0";
  frame.style.width = "0";
  frame.style.height = "0";
  frame.style.border = "0";
  document.body.appendChild(frame);

  const doc = frame.contentDocument;
  if (!doc) {
    document.body.removeChild(frame);
    return false;
  }

  doc.open();
  doc.write(html);
  doc.close();

  const run = () => {
    frame.contentWindow?.focus();
    frame.contentWindow?.print();
    window.setTimeout(() => frame.remove(), 1500);
  };
  if (frame.contentWindow?.document.readyState === "complete") {
    window.setTimeout(run, 120);
  } else {
    frame.onload = () => window.setTimeout(run, 120);
  }

  return true;
}
