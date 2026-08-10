import type { CandidateProfile, Skill } from "@/data/demo";
import { BIAS_ALLOWED, BIAS_EXCLUDED, biasFlags, type ReadinessBreakdown } from "@/data/impact";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function locator(evidence: Skill["evidence"][number]) {
  return [
    evidence.page ? `หน้า ${evidence.page}` : null,
    evidence.paragraph ? `ย่อหน้า ${evidence.paragraph}` : null,
    evidence.commit ? `commit ${evidence.commit}` : null,
    evidence.filePath ?? null,
    evidence.section ?? null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export interface PassportPdfInput {
  candidate: CandidateProfile;
  skills: Skill[];
  publicUrl: string;
  readiness?: ReadinessBreakdown;
}

/** Build a print-ready, Thai-safe HTML document for the Skill Passport. */
export function buildPassportHtml({ candidate, skills, publicUrl, readiness }: PassportPdfInput) {
  const verified = skills.filter((skill) => skill.verified);
  const evidenceCount = skills.reduce((total, skill) => total + skill.evidence.length, 0);
  const issued = new Date().toLocaleString("th-TH");

  const skillBlocks = verified
    .map(
      (skill) => `
      <section class="skill">
        <div class="skill-head">
          <h3>${escapeHtml(skill.name)}</h3>
          <span class="chip">${escapeHtml(skill.level)}</span>
          <span class="chip">ความเชื่อมั่น ${Math.round(skill.confidence * 100)}%</span>
          <span class="chip ok">ยืนยันแล้ว</span>
        </div>
        <p class="muted">${escapeHtml(skill.description)}</p>
        ${skill.evidence
          .map(
            (evidence) => `
          <div class="evidence">
            <p class="src">${escapeHtml(evidence.sourceName)} <span class="muted">${escapeHtml(locator(evidence))}</span></p>
            <blockquote><mark>${escapeHtml(evidence.quote)}</mark></blockquote>
            <p class="muted small">เหตุผลของ AI: ${escapeHtml(evidence.reasoning)}</p>
          </div>`,
          )
          .join("")}
      </section>`,
    )
    .join("");

  const readinessBlock = readiness
    ? `<section class="block">
        <h2>คะแนนความพร้อมทำงาน (อธิบายได้)</h2>
        <p class="score">${readiness.total}<span class="muted">/100</span></p>
        <table>
          <thead><tr><th>องค์ประกอบ</th><th>น้ำหนัก</th><th>คะแนน</th><th>เหตุผลจากหลักฐาน</th></tr></thead>
          <tbody>
            ${readiness.components
              .map(
                (component) => `<tr>
                  <td>${escapeHtml(component.labelTh)}</td>
                  <td>${Math.round(component.weight * 100)}%</td>
                  <td>${component.score}</td>
                  <td class="small">${escapeHtml(component.reason)}</td>
                </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </section>`
    : "";

  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8" />
<title>Skill Passport ${escapeHtml(candidate.passportNumber)}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { font-family: "Noto Sans Thai", "Sarabun", "IBM Plex Sans Thai", system-ui, -apple-system, "Segoe UI", sans-serif; color: #312e2b; margin: 0; line-height: 1.55; }
  h1 { font-size: 22px; margin: 0; }
  h2 { font-size: 15px; margin: 0 0 8px; letter-spacing: .01em; }
  h3 { font-size: 14px; margin: 0; }
  header { border-bottom: 2px solid #c96442; padding-bottom: 12px; margin-bottom: 16px; }
  .eyebrow { text-transform: uppercase; letter-spacing: .14em; font-size: 9px; color: #8a827b; margin: 0 0 6px; }
  .muted { color: #6f6862; }
  .small { font-size: 11px; }
  .meta { display: flex; flex-wrap: wrap; gap: 14px; font-size: 11px; margin-top: 10px; }
  .meta div { border: 1px solid #e6e0d8; border-radius: 6px; padding: 6px 10px; }
  .block { border: 1px solid #e6e0d8; border-radius: 8px; padding: 12px 14px; margin-bottom: 14px; page-break-inside: avoid; }
  .score { font-size: 30px; font-weight: 700; margin: 4px 0 10px; }
  table { width: 100%; border-collapse: collapse; font-size: 11px; }
  th, td { text-align: left; border-bottom: 1px solid #ece6de; padding: 5px 6px; vertical-align: top; }
  .skill { border: 1px solid #e6e0d8; border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; page-break-inside: avoid; }
  .skill-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 4px; }
  .chip { font-size: 10px; border: 1px solid #ded7cd; border-radius: 999px; padding: 2px 8px; color: #6f6862; }
  .chip.ok { border-color: #7d9a72; color: #4f6a46; }
  .evidence { margin-top: 8px; border-left: 3px solid #c96442; padding-left: 10px; }
  .src { font-size: 11px; font-weight: 600; margin: 0 0 4px; }
  blockquote { margin: 0 0 4px; font-size: 12px; }
  mark { background: #f6e2bc; padding: 1px 2px; }
  ul { margin: 6px 0 0; padding-left: 18px; font-size: 11px; }
  footer { margin-top: 18px; border-top: 1px solid #e6e0d8; padding-top: 10px; font-size: 10px; color: #6f6862; }
</style>
</head>
<body>
  <header>
    <p class="eyebrow">SkillLens AI · หนังสือเดินทางทักษะดิจิทัล</p>
    <h1>${escapeHtml(candidate.name)}</h1>
    <p class="muted small">${escapeHtml(candidate.headline)}</p>
    <div class="meta">
      <div><strong>เลขที่พาสปอร์ต</strong><br />${escapeHtml(candidate.passportNumber)}</div>
      <div><strong>สถานะการยืนยัน</strong><br />${escapeHtml(candidate.verificationStatus)}</div>
      <div><strong>ความพร้อมทำงาน</strong><br />${candidate.workReadiness}%</div>
      <div><strong>ทักษะที่ยืนยันแล้ว</strong><br />${verified.length} รายการ · หลักฐาน ${evidenceCount} ชิ้น</div>
      <div><strong>ออกเอกสารเมื่อ</strong><br />${escapeHtml(issued)}</div>
      <div><strong>ลิงก์ตรวจสอบ</strong><br />${escapeHtml(publicUrl)}</div>
    </div>
  </header>

  ${readinessBlock}

  <section class="block">
    <h2>แผงป้องกันอคติ (Anti-Bias)</h2>
    <p class="small muted">ระบบตรวจพบข้อมูลที่อาจก่อให้เกิดอคติ ${biasFlags.length} รายการ และตัดออกก่อนคำนวณคะแนนทุกครั้ง</p>
    <table>
      <thead><tr><th>ฟิลด์ที่พบ</th><th>พบใน</th><th>การจัดการ</th></tr></thead>
      <tbody>
        ${biasFlags
          .map(
            (flag) => `<tr><td>${escapeHtml(flag.field)}</td><td class="small">${escapeHtml(flag.detectedIn)}</td><td class="small">${escapeHtml(flag.action)}</td></tr>`,
          )
          .join("")}
      </tbody>
    </table>
    <h3 style="margin-top:10px">ฟิลด์ที่ระบบห้ามใช้</h3>
    <ul>
      ${BIAS_EXCLUDED.map((item) => `<li>${escapeHtml(item.labelTh)} (${escapeHtml(item.field)}) — ${escapeHtml(item.reason)}</li>`).join("")}
    </ul>
    <h3 style="margin-top:10px">สัญญาณที่ระบบใช้ได้</h3>
    <ul>${BIAS_ALLOWED.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </section>

  <h2 style="margin:16px 0 8px">ทักษะที่ยืนยันแล้ว พร้อมข้อความหลักฐานที่ถูกอ้างอิง</h2>
  ${skillBlocks}

  <footer>
    เอกสารนี้ออกโดย SkillLens AI Registry · ทุกทักษะต้องมีหลักฐานประกอบ · ตรวจสอบความถูกต้องได้ที่ ${escapeHtml(publicUrl)}
  </footer>
</body>
</html>`;
}

/** One-click export: opens a print dialog with the full passport (save as PDF). */
export function exportPassportPdf(input: PassportPdfInput) {
  const html = buildPassportHtml(input);
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
  if (frame.contentWindow?.document.readyState === "complete") window.setTimeout(run, 120);
  else frame.onload = () => window.setTimeout(run, 120);
  return true;
}
