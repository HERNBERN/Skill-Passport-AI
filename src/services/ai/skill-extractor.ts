import { pipelineStages, skills, type Skill } from "@/data/demo";
import { getStandardProfile } from "@/data/standards";
import type { RubricPillar } from "@/types";

export interface ParsedResumeSkill {
  skill_name: string;
  category: "Technical" | "Soft Skill";
  esco_code: string;
  confidence: number;
  reasoning: string;
  evidence_snippet: string;
  reference_location: string;
  inferred?: boolean;
  informal_source?: string | undefined;
  behavioral_indicator?: string;
}

export type RubricRating = "Outstanding" | "Solid" | "Borderline" | "Poor";

export interface ParsedResumeIndicatorEvidence {
  skill_name: string;
  quote: string;
  confidence: number;
  reference_location: string;
  reasoning: string;
}

export interface ParsedResumeIndicator {
  indicator: string;
  dimension: "Problem" | "Work" | "Team";
  score: number;
  evidence: ParsedResumeIndicatorEvidence[];
}

export interface ParsedResumePillar {
  pillar: RubricPillar;
  label: string;
  score: number;
  rating: RubricRating;
  confidence: number;
  reason: string;
  evidence: ParsedResumeIndicatorEvidence[];
}

export interface ParsedResumeOutput {
  skills: ParsedResumeSkill[];
  overall_readiness: {
    score: number;
    dimensions: {
      Problem: number;
      Work: number;
      Team: number;
    };
    indicators: ParsedResumeIndicator[];
    pillars: ParsedResumePillar[];
  };
}

export const PILLAR_LABELS: Record<RubricPillar, string> = {
  RRK: "Role-Related Knowledge (RRK)",
  GCA: "General Cognitive Ability (GCA)",
  Leadership: "Leadership (Emergent Leadership)",
  Googleyness: "Googleyness (Culture Fit)",
};

export const PILLAR_SKILL_MAP: Record<string, RubricPillar[]> = {
  TypeScript: ["RRK"],
  Python: ["RRK"],
  React: ["RRK"],
  "Node.js": ["RRK"],
  FastAPI: ["RRK"],
  PostgreSQL: ["RRK"],
  Docker: ["RRK"],
  AWS: ["RRK"],
  "CI/CD (GitHub Actions)": ["RRK", "GCA"],
  "Backend Development": ["RRK", "GCA"],
  "API Design": ["RRK", "GCA"],
  "Applied Research & Evaluation": ["RRK", "GCA"],
  "Problem Solving": ["GCA"],
  "Analytical Thinking": ["GCA"],
  Creativity: ["GCA", "Googleyness"],
  "Entrepreneurial Mindset": ["GCA", "Googleyness"],
  "Project Management": ["Leadership"],
  Planning: ["Leadership"],
  "Quality Control": ["RRK", "Googleyness"],
  "Growth Mindset": ["Googleyness"],
  "Time Management": ["Leadership"],
  Adaptability: ["Googleyness"],
  Communication: ["Leadership"],
  Collaboration: ["Leadership"],
  "Team Leadership": ["Leadership"],
  Negotiation: ["Leadership"],
  "Self Learning": ["Googleyness"],
  "Digital Literacy": ["Googleyness"],
};

const PILLAR_KEYWORD_MAP: Array<{ pillar: RubricPillar; regex: RegExp[]; reason: string }> = [
  {
    pillar: "RRK",
    regex: [
      /\bmicroservices\b/i,
      /service architecture\b/i,
      /database schema\b/i,
      /distributed system/i,
      /performance tuning/i,
    ],
    reason: "Evidence of deep, role-related technical work.",
  },
  {
    pillar: "GCA",
    regex: [
      /\bbug fix(es)?\b/i,
      /troubleshoot(ed)?\b/i,
      /optimi[sz]e(d)?\b/i,
      /algorithm\b/i,
      /latency\b/i,
      /data-driven\b/i,
      /analy(s|z)e(d)?\b/i,
    ],
    reason: "Evidence of complex problem solving and data-supported decision making.",
  },
  {
    pillar: "Leadership",
    regex: [
      /\blead(er|ership)?\b/i,
      /coordinat(ed)?\b/i,
      /stakeholder\b/i,
      /project owner\b/i,
      /team lead\b/i,
      /owned the work/i,
    ],
    reason: "Evidence of ownership, coordination and cross-team leadership.",
  },
  {
    pillar: "Googleyness",
    regex: [
      /\bfeedback\b/i,
      /growth mindset\b/i,
      /adapt(ed|able|ability)?\b/i,
      /humble\b/i,
      /culture fit\b/i,
      /ethical\b/i,
      /values\b/i,
    ],
    reason: "Evidence of humility, adaptability and cultural alignment.",
  },
];

const SKILL_PATTERNS: Array<{
  name: string;
  category: "Technical" | "Soft Skill";
  regex: RegExp[];
}> = [
  {
    name: "TypeScript",
    category: "Technical",
    regex: [/\bTypeScript\b/i, /\bTS\b/i],
  },
  {
    name: "Python",
    category: "Technical",
    regex: [/\bPython\b/i],
  },
  {
    name: "React",
    category: "Technical",
    regex: [/\bReact\b/i, /\bReact\.js\b/i],
  },
  {
    name: "Node.js",
    category: "Technical",
    regex: [/\bNode\.js\b/i, /\bNodejs\b/i, /\bNode\b/i],
  },
  {
    name: "FastAPI",
    category: "Technical",
    regex: [/\bFastAPI\b/i],
  },
  {
    name: "PostgreSQL",
    category: "Technical",
    regex: [/\bPostgreSQL\b/i, /\bpgvector\b/i, /\bSQL\b/i],
  },
  {
    name: "Docker",
    category: "Technical",
    regex: [/\bDocker\b/i, /\bcontainerized\b/i, /\bcontainerised\b/i],
  },
  {
    name: "AWS",
    category: "Technical",
    regex: [/\bAWS\b/i, /\bAmazon Web Services\b/i],
  },
  {
    name: "CI/CD (GitHub Actions)",
    category: "Technical",
    regex: [/\bGitHub Actions\b/i, /\bCI\/CD\b/i, /\bcontinuous integration\b/i, /\bcontinuous deployment\b/i],
  },
  {
    name: "Backend Development",
    category: "Technical",
    regex: [/\bbackend\b/i, /\bREST endpoints\b/i, /\bAPI\b/i, /\bservice layer\b/i],
  },
  {
    name: "API Design",
    category: "Technical",
    regex: [/\bAPI design\b/i, /\bREST endpoints\b/i, /\bcontract\b/i],
  },
  {
    name: "Applied Research & Evaluation",
    category: "Technical",
    regex: [/\bresearch\b/i, /\bevaluation\b/i, /\bbenchmark\b/i, /\bstatistical significance\b/i],
  },
  {
    name: "Problem Solving",
    category: "Soft Skill",
    regex: [/\bproblem solving\b/i, /\bsolved.*problem\b/i, /\bdiagnos.*problem\b/i, /\broot cause\b/i, /\btroubleshoot\b/i],
  },
  {
    name: "Analytical Thinking",
    category: "Soft Skill",
    regex: [/\banalyt(ical|ics)\b/i, /\bcritical thinking\b/i, /\bdata[- ]driven\b/i, /\binterpreted?\b/i],
  },
  {
    name: "Project Management",
    category: "Soft Skill",
    regex: [/\bproject management\b/i, /\bmanaged the project\b/i, /\bproject coordinator\b/i, /\bplanned.*project\b/i, /\broadmap\b/i, /\bdeadline\b/i],
  },
  {
    name: "Quality Control",
    category: "Soft Skill",
    regex: [/\bquality control\b/i, /\breview(ed|ing)\b/i, /\btested\b/i, /\bQA\b/i, /\bassess(ed|ment)\b/i],
  },
  {
    name: "Growth Mindset",
    category: "Soft Skill",
    regex: [/\bgrowth mindset\b/i, /\bcontinuously improved\b/i, /\bseek feedback\b/i, /\blearned from\b/i],
  },
  {
    name: "Planning",
    category: "Soft Skill",
    regex: [/\bplan(ned|ning)\b/i, /\bmilestone\b/i, /\bwork breakdown\b/i, /\bpriorit(?:y|ies)\b/i],
  },
  {
    name: "Team Leadership",
    category: "Soft Skill",
    regex: [/\bteam lead\b/i, /\bteam leadership\b/i, /\bled a team\b/i, /\bหัวหน้าทีม\b/i, /\bหัวหน้าชมรม\b/i, /\bpresident\b/i, /\bcaptain\b/i],
  },
  {
    name: "Collaboration",
    category: "Soft Skill",
    regex: [/\bcollaborat(e|ion|ive)\b/i, /\bteamwork\b/i, /\bwork(ed)? together\b/i, /\bshared responsibility\b/i, /\bpartner(ed|ship)\b/i],
  },
  {
    name: "Communication",
    category: "Soft Skill",
    regex: [/\bcommunication\b/i, /\bcommunicat(ed|ing)\b/i, /\bpresent(ed|ation)\b/i, /\bclarif(y|ied)\b/i, /\bfeedback\b/i],
  },
  {
    name: "Adaptability",
    category: "Soft Skill",
    regex: [/\badapt(ability|ed|ing)\b/i, /\bshifted priorities\b/i, /\bchanged course\b/i, /\bflexible\b/i, /\brespond(ed)? to change\b/i],
  },
  {
    name: "Time Management",
    category: "Soft Skill",
    regex: [/\btime management\b/i, /\bdeadline\b/i, /\bdeliver(ed|y) on time\b/i, /\bsubtask\b/i],
  },
  {
    name: "Entrepreneurial Mindset",
    category: "Soft Skill",
    regex: [/\bentrepreneu?rial\b/i, /\bbusiness mindset\b/i, /\bstarted.*(business|project)\b/i, /\bhome business\b/i, /\bช่วยธุรกิจที่บ้าน\b/i],
  },
  {
    name: "Self Learning",
    category: "Soft Skill",
    regex: [/\bself[- ]learning\b/i, /\bself[- ]directed\b/i, /\bself[- ]study\b/i, /\blearned .* independently\b/i, /\bonline learning\b/i],
  },
  {
    name: "Digital Literacy",
    category: "Soft Skill",
    regex: [/\bdigital literacy\b/i, /\bdigital tools\b/i, /\bplatforms?\b/i, /\bspreadsheet(s)?\b/i, /\bGoogle (Docs|Sheets|Slides)\b/i],
  },
  {
    name: "Negotiation",
    category: "Soft Skill",
    regex: [/\bnegotiat(e|ion)\b/i, /\bagreement\b/i, /\bterms\b/i, /\bdeal\b/i],
  },
  {
    name: "Creativity",
    category: "Soft Skill",
    regex: [/\bcreativ(e|ity)\b/i, /\binnovat(e|ion)\b/i, /\bidea(s)?\b/i, /\bprototype\b/i, /\bdesign\b/i],
  },
];

export const SKILL_SEMANTIC_SYNONYMS: Record<string, string[]> = {
  "Problem Solving": ["solve", "แก้ปัญหา", "troubleshoot", "root cause", "diagnose", "resolution", "decision making"],
  "Analytical Thinking": ["analyse", "คิดวิเคราะห์", "analysis", "critical thinking", "data-driven", "interpret"],
  "Project Management": ["plan", "timeline", "จัดตาราง", "project coordinator", "roadmap", "deliverable", "milestone"],
  "Quality Control": ["review", "test", "QA", "quality", "audit", "assess", "ตรวจสอบ"],
  "Growth Mindset": ["learn", "เรียนรู้", "improve", "feedback", "iterative", "continuous"],
  "Planning": ["plan", "prioritise", "วางแผน", "schedule", "work breakdown"],
  "Team Leadership": ["lead", "leadership", "หัวหน้าทีม", "หัวหน้าชมรม", "captain", "coordinate", "facilitate"],
  Collaboration: ["collaborate", "work together", "ร่วมมือ", "teamwork", "partner", "stakeholder"],
  Communication: ["communicate", "presentation", "นำเสนอ", "feedback", "liaison", "explain"],
  Adaptability: ["adapt", "เปลี่ยนแปลง", "flexible", "shift", "respond to change"],
  "Time Management": ["deadline", "deliver on time", "manage time", "schedule", "จัดการเวลา"],
  "Entrepreneurial Mindset": ["entrepreneur", "business", "ธุรกิจ", "started", "ran a side project", "initiative"],
  "Self Learning": ["self-learning", "เรียนเอง", "studied", "online learning", "autodidact"],
  "Digital Literacy": ["digital", "platform", "tools", "spreadsheet", "คอมพิวเตอร์"],
  Negotiation: ["negotiate", "agreement", "deal", "terms", "เจรจา"],
  Creativity: ["creative", "innovation", "ออกแบบ", "ideate", "prototype"],
};

const ROLE_INFERENCE_PATTERNS: Array<{
  name: string;
  category: "Soft Skill";
  regex: RegExp[];
  hint: string;
}> = [
  {
    name: "Team Leadership",
    category: "Soft Skill",
    regex: [/\b(president|chair(person)?|หัวหน้าชมรม|หัวหน้าทีม|captain|leading a group)\b/i],
    hint: "role-based leadership and coordination",
  },
  {
    name: "Project Management",
    category: "Soft Skill",
    regex: [/\b(project manager|managed the timeline|built a plan|coordinat.*deliveries|sprint planning)\b/i],
    hint: "project coordination and delivery",
  },
  {
    name: "Communication",
    category: "Soft Skill",
    regex: [/\b(presented|explained to|reported to|stakeholders|liaison|negotiated|communicated)\b/i],
    hint: "stakeholder communication",
  },
  {
    name: "Collaboration",
    category: "Soft Skill",
    regex: [/\b(worked with|collaborated with|team member|ร่วมมือ|coordinated with)\b/i],
    hint: "team collaboration",
  },
  {
    name: "Problem Solving",
    category: "Soft Skill",
    regex: [/\b(resolved|solved|troubleshot|fixed|handled a challenge)\b/i],
    hint: "problem solving behavior",
  },
  {
    name: "Entrepreneurial Mindset",
    category: "Soft Skill",
    regex: [/\b(started a business|family business|ran a side project|entrepreneur|sell(ing)? products?)\b/i],
    hint: "entrepreneurial initiative",
  },
];

const INFORMAL_SOURCE_PATTERNS: Array<{ regex: RegExp; label: string }> = [
  { regex: /\b(helped (family|home) business|family business|ช่วยธุรกิจที่บ้าน|ธุรกิจครอบครัว)\b/i, label: "Family business" },
  { regex: /\b(volunteer|community service|ทำงานอาสา|ชุมชน|public service)\b/i, label: "Volunteer experience" },
  { regex: /\b(stream(ing|ed)|content creator|แคสเกม|เกมมิ่ง|gaming)\b/i, label: "Creative community experience" },
];

type ReadinessIndicator =
  | "Analytical Thinking"
  | "Decision Making"
  | "Creativity"
  | "Problem Complexity"
  | "Planning"
  | "Quality Control"
  | "Self-development"
  | "Learning Consistency"
  | "Communication"
  | "Leadership"
  | "Teamwork"
  | "Collaboration";

const SKILL_INDICATOR_MAP: Record<string, ReadinessIndicator[]> = {
  "Problem Solving": ["Analytical Thinking", "Decision Making", "Problem Complexity"],
  "Analytical Thinking": ["Analytical Thinking"],
  "Applied Research & Evaluation": ["Analytical Thinking", "Decision Making"],
  Creativity: ["Creativity"],
  "Entrepreneurial Mindset": ["Creativity", "Self-development"],
  "Project Management": ["Planning", "Leadership", "Teamwork"],
  Planning: ["Planning"],
  "Quality Control": ["Quality Control"],
  "Growth Mindset": ["Self-development", "Learning Consistency"],
  "Time Management": ["Planning", "Quality Control"],
  Adaptability: ["Creativity", "Learning Consistency"],
  Communication: ["Communication"],
  Collaboration: ["Collaboration", "Teamwork"],
  "Team Leadership": ["Leadership", "Communication", "Teamwork"],
  Negotiation: ["Communication", "Leadership"],
  "Self Learning": ["Self-development", "Learning Consistency"],
  "Digital Literacy": ["Self-development", "Quality Control"],
};

const INDICATOR_DIMENSION_MAP: Record<ReadinessIndicator, "Problem" | "Work" | "Team"> = {
  "Analytical Thinking": "Problem",
  "Decision Making": "Problem",
  Creativity: "Problem",
  "Problem Complexity": "Problem",
  Planning: "Work",
  "Quality Control": "Work",
  "Self-development": "Work",
  "Learning Consistency": "Work",
  Communication: "Team",
  Leadership: "Team",
  Teamwork: "Team",
  Collaboration: "Team",
};

function cleanSentence(sentence: string) {
  return sentence.trim().replace(/\s+/g, " ");
}

function normalizeSemanticTokens(text: string) {
  return Array.from(
    new Set(
      text
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9ก-๙\s]/g, " ")
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean),
    ),
  );
}

function semanticSimilarity(sentence: string, skillName: string) {
  const sentenceTokens = normalizeSemanticTokens(sentence);
  const canonicalTokens = normalizeSemanticTokens(`${skillName} ${SKILL_SEMANTIC_SYNONYMS[skillName]?.join(" ") ?? ""}`);
  const matches = sentenceTokens.filter((token) => canonicalTokens.includes(token));
  return matches.length / Math.max(1, (sentenceTokens.length + canonicalTokens.length) / 2);
}

function extractStoryFragments(sentence: string) {
  const contextMatch = sentence.match(/\b(as a|as an|as the|while|เมื่อ|ในฐานะ)\b.*?(?=[.,]|$)/i)?.[0] ?? "Context is drawn from the described role.";
  const actionMatch = sentence.match(/\b(led|organized|coordinated|managed|negotiated|adapted|solved|planned|improved|designed|presented|facilitated|supported|taught|learned|created|reviewed|tested|reduced|increased|helped|จัดการ|วางแผน|ประสานงาน|นำเสนอ|แก้ปัญหา|ปรับ|พัฒนาต่อ)\b.*?(?=[.,]|$)/i)?.[0] ?? "Action is inferred from the behavioral description.";
  const resultMatch = sentence.match(/\b(resulted in|leading to|which led to|achieved|deliver(e[ds]|y)|reducing|increasing|helped|enabled|improved|allowed|สำเร็จ|ทำให้|ส่งผลให้|เพิ่มขึ้น|ลดลง)\b.*?(?=[.,]|$)/i)?.[0] ?? "Result is cited as a measurable outcome.";
  return {
    context: contextMatch,
    action: actionMatch,
    result: resultMatch,
  };
}

function scoreConfidence(matchCount: number, hasStrongEvidence: boolean) {
  const base = Math.min(0.65 + matchCount * 0.08, 0.9);
  return Number((hasStrongEvidence ? Math.min(base + 0.08, 0.98) : base).toFixed(2));
}

function rubricRating(score: number): RubricRating {
  if (score >= 90) return "Outstanding";
  if (score >= 70) return "Solid";
  if (score >= 50) return "Borderline";
  return "Poor";
}

function detectConsistencyNotes(text: string) {
  const patterns = [
    /commits? (per|in) (month|week|quarter)/i,
    /continuous (development|delivery|integration|deployment)/i,
    /regular (commits|updates|releases)/i,
    /9 of the last 12 months/i,
    /monthly/i,
  ];
  const match = patterns.find((pattern) => pattern.test(text));
  return match
    ? "Evidence suggests consistent delivery cadence rather than a single polished artifact."
    : "Evidence cadence is not explicit; verify activity history with GitHub commit records or project logs.";
}

const CATEGORY_FALLBACK: Record<string, Skill["category"]> = {
  TypeScript: "Programming Language",
  Python: "Programming Language",
  React: "Framework",
  "Node.js": "Programming Language",
  FastAPI: "Framework",
  PostgreSQL: "Database",
  Docker: "DevOps",
  AWS: "Cloud",
  "CI/CD (GitHub Actions)": "DevOps",
  "Backend Development": "Programming Language",
  "API Design": "Programming Language",
  "Applied Research & Evaluation": "Research",
  "Team Leadership": "Soft Skill",
  "Project Management": "Soft Skill",
  "Problem Solving": "Soft Skill",
  Adaptability: "Transferable Skill",
  Communication: "Transferable Skill",
  Negotiation: "Transferable Skill",
  "Self Learning": "Transferable Skill",
  "Digital Literacy": "Transferable Skill",
};

function getEscoCode(skillName: string) {
  const profile = getStandardProfile(skillName);
  const escoRef = profile?.standards.find((item) => item.framework === "ESCO") ?? profile?.standards[0];
  return escoRef?.code ?? "ESCO-0000";
}

function getSkillCategory(skillName: string, parsedCategory: "Technical" | "Soft Skill") {
  return CATEGORY_FALLBACK[skillName] ?? (parsedCategory === "Technical" ? "Programming Language" : "Soft Skill");
}

function levelFromConfidence(confidence: number): Skill["level"] {
  if (confidence >= 0.9) return "Advanced";
  if (confidence >= 0.8) return "Proficient";
  if (confidence >= 0.7) return "Working";
  return "Foundational";
}

function parseSentences(text: string) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/•/g, ". ")
    .replace(/\n+/g, ". ")
    .split(/(?<=[.?!])\s+/)
    .map(cleanSentence)
    .filter(Boolean);
}

function findReferenceLocation(sentence: string) {
  const pageMatch = sentence.match(/page\s*(\d+)/i);
  if (pageMatch) return `Page ${pageMatch[1]}`;
  const chapterMatch = sentence.match(/chapter\s*([0-9A-Za-z]+)/i);
  if (chapterMatch) return `Chapter ${chapterMatch[1]}`;
  const sectionMatch = sentence.match(/section\s*([0-9A-Za-z]+)/i);
  if (sectionMatch) return `Section ${sectionMatch[1]}`;
  return "Page 1 / Section 1";
}

function computePillars(skills: ParsedResumeSkill[], text: string) {
  const pillarScores: Record<RubricPillar, number[]> = {
    RRK: [],
    GCA: [],
    Leadership: [],
    Googleyness: [],
  };
  const pillarEvidence: Record<RubricPillar, ParsedResumeIndicatorEvidence[]> = {
    RRK: [],
    GCA: [],
    Leadership: [],
    Googleyness: [],
  };

  skills.forEach((skill) => {
    const pillars = PILLAR_SKILL_MAP[skill.skill_name] ?? [];
    const score = Math.round(skill.confidence * 100);
    pillars.forEach((pillar) => {
      pillarScores[pillar].push(score);
      pillarEvidence[pillar].push({
        skill_name: skill.skill_name,
        quote: skill.evidence_snippet,
        confidence: skill.confidence,
        reference_location: skill.reference_location,
        reasoning: skill.reasoning,
      });
    });
  });

  PILLAR_KEYWORD_MAP.forEach(({ pillar, regex, reason }) => {
    const matchedSentence = text
      .split(/(?<=[.?!])\s+/)
      .find((sentence) => regex.some((r) => r.test(sentence)));
    if (matchedSentence) {
      const confidence = Math.min(0.92, 0.7 + Math.min(matchedSentence.length / 240, 0.2));
      const score = Math.round(confidence * 100);
      pillarScores[pillar].push(score);
      pillarEvidence[pillar].push({
        skill_name: PILLAR_LABELS[pillar],
        quote: matchedSentence,
        confidence,
        reference_location: "Detected from evidence corpus",
        reasoning: reason,
      });
    }
  });

  const consistencyNote = detectConsistencyNotes(text);

  return (Object.keys(pillarScores) as RubricPillar[]).map((pillar) => {
    const scores = pillarScores[pillar];
    const average = scores.length ? Math.round(scores.reduce((sum, value) => sum + value, 0) / scores.length) : 0;
    const normalized = Math.min(100, Math.max(0, average));
    const rating = rubricRating(normalized);
    const evidence = pillarEvidence[pillar];
    const confidence = evidence.length ? Math.min(0.98, 0.5 + evidence.length * 0.12) : 0.2;
    const reason = evidence.length
      ? `${PILLAR_LABELS[pillar]} scored from ${evidence.length} evidence item(s). ${consistencyNote}`
      : `No clear evidence for ${PILLAR_LABELS[pillar]}. ${consistencyNote}`;

    return {
      pillar,
      label: PILLAR_LABELS[pillar],
      score: normalized,
      rating,
      confidence: Number(confidence.toFixed(2)),
      reason,
      evidence,
    };
  });
}

function computeDimensionScores(skills: ParsedResumeSkill[]) {
  const indicatorEvidence: Partial<Record<ReadinessIndicator, ParsedResumeIndicatorEvidence[]>> = {};
  const indicatorMax = {} as Record<ReadinessIndicator, number>;

  skills.forEach((skill) => {
    const indicators = SKILL_INDICATOR_MAP[skill.skill_name] ?? [];
    indicators.forEach((indicator) => {
      indicatorMax[indicator] = Math.max(indicatorMax[indicator] ?? 0, Math.round(skill.confidence * 100));
      if (!indicatorEvidence[indicator]) {
        indicatorEvidence[indicator] = [];
      }
      indicatorEvidence[indicator]!.push({
        skill_name: skill.skill_name,
        quote: skill.evidence_snippet,
        confidence: skill.confidence,
        reference_location: skill.reference_location,
        reasoning: skill.reasoning,
      });
    });
  });

  const dimensionValues = { Problem: { total: 0, count: 0 }, Work: { total: 0, count: 0 }, Team: { total: 0, count: 0 } } as Record<"Problem" | "Work" | "Team", { total: number; count: number }>;

  const indicators: ParsedResumeIndicator[] = (Object.keys(indicatorMax) as ReadinessIndicator[]).map((indicator) => {
    const dimension = INDICATOR_DIMENSION_MAP[indicator];
    const score = indicatorMax[indicator] ?? 0;
    dimensionValues[dimension].total += score;
    dimensionValues[dimension].count += 1;
    return {
      indicator,
      dimension,
      score,
      evidence: indicatorEvidence[indicator] ?? [],
    };
  });

  const dimensions = {
    Problem: dimensionValues.Problem.count ? Math.round(dimensionValues.Problem.total / dimensionValues.Problem.count) : 0,
    Work: dimensionValues.Work.count ? Math.round(dimensionValues.Work.total / dimensionValues.Work.count) : 0,
    Team: dimensionValues.Team.count ? Math.round(dimensionValues.Team.total / dimensionValues.Team.count) : 0,
  };

  return { dimensions, indicators };
}

function extractBehavioralIndicator(sentence: string) {
  const context = sentence.match(/\b(as a|as an|as the|while|when|ในฐานะ)\b.*?(?=[,.]|$)/i)?.[0] ?? "บทบาทในเหตุการณ์นี้";
  const action = sentence.match(/\b(led|organized|coordinated|managed|negotiated|adapted|solved|planned|improved|designed|presented|facilitated|supported|taught|learned|created|reviewed|tested|reduced|increased|helped)\b.*?(?=[,.]|$)/i)?.[0] ?? "การดำเนินการเชิงพฤติกรรม";
  const result = sentence.match(/\b(resulted in|leading to|which led to|achieved|deliver(ed|y)|reducing|increasing|helped|enabled|improved|allowed|สำเร็จ|ทำให้|ส่งผลให้)\b.*?(?=[,.]|$)/i)?.[0] ?? "ผลลัพธ์ที่บ่งชี้ทักษะ";
  return `Context: ${context}; Action: ${action}; Result: ${result}.`;
}

function inferSkillsFromSentences(sentences: string[]) {
  return ROLE_INFERENCE_PATTERNS.flatMap((pattern) => {
    const match = sentences.find((sentence) => pattern.regex.some((regex) => regex.test(sentence)));
    if (!match) return [];
    return [
      {
        skill_name: pattern.name,
        category: pattern.category,
        evidence_snippet: match,
        reasoning: `AI inferred ${pattern.name} จากบทบาทหรือพฤติกรรมในประโยคนี้: “${match}”.`,
        inferred: true,
        behavioral_indicator: pattern.hint,
        reference_location: findReferenceLocation(match),
        informal_source: detectInformalSource(match)?.label,
      } as ParsedResumeSkill,
    ];
  });
}

function detectInformalSource(sentence: string) {
  return INFORMAL_SOURCE_PATTERNS.find((source) => source.regex.test(sentence));
}

export async function parseResumeTextToSkills(text: string): Promise<ParsedResumeOutput> {
  const sentences = parseSentences(text);
  const collectedSkills: ParsedResumeSkill[] = [];

  for (const definition of SKILL_PATTERNS) {
    const evidenceSentences = sentences.filter((sentence) => definition.regex.some((regex) => regex.test(sentence)));
    const semanticSentences = sentences.filter(
      (sentence) => !evidenceSentences.includes(sentence) && semanticSimilarity(sentence, definition.name) >= 0.28,
    );
    const evidenceSources = evidenceSentences.length ? evidenceSentences : semanticSentences;
    if (!evidenceSources.length) continue;

    const evidenceSnippet = evidenceSources[0] ?? "";
    const semanticScore = semanticSimilarity(evidenceSnippet, definition.name);
    const matchCount = evidenceSentences.length + semanticScore;
    const hasStrongEvidence = /\bdesigned\b|\bimplemented\b|\bdeployed\b|\bled\b|\bowned\b|\bcompleted\b|\breduced\b|\bimproved\b|\bsolved\b|\bcoordinat\b|\bmanaged\b|\bจัดการ\b|\bวางแผน\b|\bปรับ\b/i.test(evidenceSnippet) || semanticScore >= 0.4;
    const confidence = scoreConfidence(matchCount, hasStrongEvidence);
    const story = extractStoryFragments(evidenceSnippet);

    collectedSkills.push({
      skill_name: definition.name,
      category: definition.category,
      esco_code: getEscoCode(definition.name),
      confidence,
      reasoning: `${story.context} ${story.action} ${story.result} AI วิเคราะห์ว่าข้อความนี้เชื่อมโยงกับทักษะ ${definition.name}.`,
      evidence_snippet: evidenceSnippet,
      reference_location: findReferenceLocation(evidenceSnippet),
      behavioral_indicator: `${story.context}; ${story.action}; ${story.result}`,
      informal_source: detectInformalSource(evidenceSnippet)?.label,
    });
  }

  const inferredSkills = inferSkillsFromSentences(sentences);
  const skillMap = new Map<string, ParsedResumeSkill>();

  [...collectedSkills, ...inferredSkills].forEach((parsedSkill) => {
    const existing = skillMap.get(parsedSkill.skill_name);
    if (!existing) {
      const confidence = parsedSkill.inferred ? Math.min(parsedSkill.confidence ?? 0.7, 0.78) : parsedSkill.confidence;
      skillMap.set(parsedSkill.skill_name, {
        ...parsedSkill,
        confidence,
        category: parsedSkill.category,
        esco_code: getEscoCode(parsedSkill.skill_name),
        reasoning: parsedSkill.reasoning,
        evidence_snippet: parsedSkill.evidence_snippet,
        reference_location: parsedSkill.reference_location,
      });
    }
  });

  const uniqueSkills = Array.from(skillMap.values());
  const { dimensions, indicators } = computeDimensionScores(uniqueSkills);
  const pillars = computePillars(uniqueSkills, text);
  const score = uniqueSkills.length ? Math.round((dimensions.Problem + dimensions.Work + dimensions.Team) / 3) : 0;

  return {
    skills: uniqueSkills,
    overall_readiness: {
      score,
      dimensions,
      indicators,
      pillars,
    },
  };
}

export function convertParsedResumeToSkills(parsed: ParsedResumeOutput): Skill[] {
  return parsed.skills.map((parsedSkill, index) => {
    const existing = skills.find((skill) => skill.name.toLowerCase() === parsedSkill.skill_name.toLowerCase());
    return {
      id:
        existing?.id ??
        `parsed-${parsedSkill.skill_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${index + 1}`,
      name: parsedSkill.skill_name,
      category: existing?.category ?? getSkillCategory(parsedSkill.skill_name, parsedSkill.category),
      confidence: parsedSkill.confidence,
      level: existing?.level ?? levelFromConfidence(parsedSkill.confidence),
      verified: false,
      transferable: parsedSkill.category === "Soft Skill" || Boolean(parsedSkill.informal_source),
      ...(parsedSkill.informal_source ? { informalSource: parsedSkill.informal_source } : {}),
      description:
        existing?.description ??
        `Extracted from resume text and aligned to ${parsedSkill.esco_code}. This skill is based on candidate-provided evidence and requires review.`,
      evidence: [
        {
          id: `parsed-evidence-${index + 1}`,
          sourceType: parsedSkill.informal_source ? "experience" : "document",
          sourceName: parsedSkill.informal_source ?? "Parsed Resume Text",
          quote: parsedSkill.evidence_snippet,
          confidence: parsedSkill.confidence,
          reasoning: parsedSkill.reasoning,
        },
      ],
    };
  });
}

/**
 * AI Skill Extractor — MOCK
 *
 * คืนทักษะพร้อมหลักฐานจากชุดข้อมูลตัวอย่าง เพื่อให้ UI ทำงานได้ครบทุกฟีเจอร์
 *
 * TODO: Replace mock AI response with production LLM API
 *  - เรียก LLM จากฝั่ง server เท่านั้น (process.env['AI_API_KEY'], process.env['AI_MODEL'])
 *  - บังคับ JSON output ตาม schema ใน .github/copilot-instructions.md
 *  - validate ด้วย zod และตรวจว่า quote ปปรากฏจริงในเอกสารต้นฉบับ
 *  - redact ฟิลด์ใน BIAS_EXCLUDED ก่อนส่งเข้าโมเดล
 */
export async function extractSkills(input: {
  fileNames?: string[];
  urls?: string[];
  resumeText?: string;
  jobDescription?: string;
}): Promise<{ skills: Skill[]; stages: typeof pipelineStages }> {
  const requestedFileNames = new Set(input.fileNames ?? []);
  const textCorpus = [input.resumeText, input.jobDescription, ...(input.urls ?? [])]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const selected = requestedFileNames.size
    ? skills.filter((skill) => skill.evidence.some((item) => requestedFileNames.has(item.sourceName)))
    : skills.filter((skill) => {
        if (!textCorpus) return true;
        return textCorpus.includes(skill.name.toLowerCase()) || textCorpus.includes(skill.category.toLowerCase());
      });

  return { skills: selected.length ? selected : skills, stages: pipelineStages };
}

/**
 * Text extraction / OCR — MOCK
 *
 * TODO: Implement real PDF text extraction (PDF text layer → OCR fallback ด้วย PDF_OCR_API_KEY)
 * ต้องคืนตำแหน่งข้อความ (หน้า/ย่อหน้า/offset) เพื่อใช้ highlight ใน EvidenceViewer
 */
export async function extractText(_fileId: string): Promise<{ page: number; text: string }[]> {
  return [];
}
