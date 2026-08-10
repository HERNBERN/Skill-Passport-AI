import { jobRoles, skills, type JobRole, type Skill } from "@/data/demo";
import { PILLAR_LABELS, PILLAR_SKILL_MAP, SKILL_SEMANTIC_SYNONYMS } from "@/services/ai/skill-extractor";
import type { RubricPillar } from "@/types";

function normaliseSkill(skill: string) {
  return skill.trim().toLowerCase();
}

function normalizeText(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[^a-z0-9ก-๙\s]/gi, " ")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function tokenizeText(text: string) {
  return Array.from(new Set(normalizeText(text).split(" ").filter(Boolean)));
}

function expandSkillTokens(skillName: string) {
  const synonyms = SKILL_SEMANTIC_SYNONYMS[skillName] ?? [];
  const allText = [skillName, ...synonyms].join(" ");
  return tokenizeText(allText);
}

function semanticSimilarity(a: string, b: string) {
  const tokensA = tokenizeText(a);
  const tokensB = tokenizeText(b);
  if (!tokensA.length || !tokensB.length) return 0;
  const matches = tokensA.filter((token) => tokensB.includes(token));
  return matches.length / Math.max(tokensA.length, tokensB.length);
}

function semanticSkillSimilarity(a: string, b: string) {
  const tokensA = expandSkillTokens(a);
  const tokensB = expandSkillTokens(b);
  if (!tokensA.length || !tokensB.length) return 0;
  const matches = tokensA.filter((token) => tokensB.includes(token));
  return matches.length / Math.max(tokensA.length, tokensB.length);
}

const PILLAR_IMPORTANCE: Record<RubricPillar, number> = {
  GCA: 0.32,
  RRK: 0.32,
  Leadership: 0.18,
  Googleyness: 0.18,
};

function fallbackSkillPillars(skillName: string): RubricPillar[] {
  if (/problem solving|analytical|research|data|evaluation|benchmark/i.test(skillName)) return ["GCA"];
  if (/project management|lead|team|communication|collaboration|negotiation/i.test(skillName)) return ["Leadership"];
  if (/growth mindset|adapt|learn|feedback|culture|ethical|values/i.test(skillName)) return ["Googleyness"];
  return ["RRK"];
}

function normalizeCandidateSkills(candidateSkills: Skill[] | string[]) {
  if (candidateSkills.length > 0 && typeof candidateSkills[0] === "string") {
    return (candidateSkills as string[]).map((skillName) => {
      const existing = skills.find((skill) => normaliseSkill(skill.name) === normaliseSkill(skillName));
      if (existing) return existing;
      const inferredSkill: Skill = {
        id: `parsed-${skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`,
        name: skillName,
        category: "Soft Skill",
        confidence: 0.62,
        level: "Working",
        verified: false,
        description: `Inferred evidence for ${skillName} from candidate input.`,
        evidence: [],
      };
      return inferredSkill;
    });
  }
  return candidateSkills as Skill[];
}

function buildCandidatePillarProfile(skills: Skill[]) {
  const pillarAcc = Object.fromEntries(
    Object.keys(PILLAR_IMPORTANCE).map((pillar) => [pillar, { score: 0, count: 0, verified: 0 }]),
  ) as Record<RubricPillar, { score: number; count: number; verified: number }>;

  skills.forEach((skill) => {
    const pillars = PILLAR_SKILL_MAP[skill.name] ?? fallbackSkillPillars(skill.name);
    const baseScore = Math.round(skill.confidence * 100);
    const weightedScore = Math.min(100, Math.round(baseScore * (skill.verified ? 1.12 : 0.88)));
    pillars.forEach((pillar) => {
      const typedPillar = pillar as RubricPillar;
      pillarAcc[typedPillar].score += weightedScore;
      pillarAcc[typedPillar].count += 1;
      if (skill.verified) pillarAcc[typedPillar].verified += 1;
    });
  });

  return Object.fromEntries(
    Object.entries(pillarAcc).map(([pillar, data]) => [
      pillar,
      data.count
        ? Math.min(
            100,
            Math.round(
              (data.score / data.count) *
                (1 + Math.min(data.verified / Math.max(1, data.count), 0.35)),
            ),
          )
        : 0,
    ]),
  ) as Record<RubricPillar, number>;
}

function buildRolePillarExpectation(role: JobRole) {
  const pillarCount = new Map<RubricPillar, number>();
  role.matchingSkills.forEach((skill) => {
    const pillars = PILLAR_SKILL_MAP[skill] ?? fallbackSkillPillars(skill);
    pillars.forEach((pillar) => {
      const typedPillar = pillar as RubricPillar;
      pillarCount.set(typedPillar, (pillarCount.get(typedPillar) ?? 0) + 1);
    });
  });

  const total = Array.from(pillarCount.values()).reduce((sum, value) => sum + value, 0) || 1;
  return Object.fromEntries(
    Array.from(pillarCount.entries()).map(([pillar, count]) => [pillar, count / total]),
  ) as Partial<Record<RubricPillar, number>>;
}

function buildMatchJustifications(
  role: JobRole,
  candidateSkills: Skill[],
  pillarScores: Record<RubricPillar, number>,
  matchingSkills: string[],
  missingSkills: string[],
  semanticTextFit: number,
  semanticSkillAlignment: number,
  strongEvidenceMatches: number,
) {
  const justifications: string[] = [];
  const verifiedMatches = matchingSkills.filter((name) => candidateSkills.some((skill) => normaliseSkill(skill.name) === normaliseSkill(name) && skill.verified));
  if (verifiedMatches.length) {
    justifications.push(`Evidence-backed and verified skills: ${verifiedMatches.join(", ")} support fit for this role.`);
  }

  if (semanticTextFit > 0.15) {
    justifications.push(
      `Semantic alignment with the job description is strong (${Math.round(semanticTextFit * 100)}%), showing the candidate's evidence matches the role context beyond exact keywords.`,
    );
  } else if (semanticSkillAlignment > 0.35) {
    justifications.push(
      `Skill adjacency is detected across the role requirements (${Math.round(semanticSkillAlignment * 100)}%), so related competencies are considered even when the exact term is absent.`,
    );
  }

  justifications.push(
    `Core pillar strengths are ${Object.entries(pillarScores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([pillar, score]) => `${PILLAR_LABELS[pillar as RubricPillar]} ${score}%`)
      .join(" และ ")}.`,
  );
  if (strongEvidenceMatches > 0) {
    justifications.push(`There are ${strongEvidenceMatches} role-related skills with strong evidence in the candidate profile.`);
  }
  if (missingSkills.length) {
    justifications.push(`The main evidence gap remains: ${missingSkills.join(", ")} is missing from the candidate's demonstrated skills.`);
  }
  return justifications;
}

/**
 * Job Matching — MOCK
 *
 * This function uses evidence-backed skill signals and a Google-style Four Pillars profile
 * rather than treating match as a simple keyword hit. It weights role-related technical
 * knowledge, general cognitive ability, leadership and Googleyness using candidate evidence.
 */
export async function matchJobs(
  _candidateId: string,
  candidateSkills: Skill[] | string[],
  options?: { roleDescription?: string },
): Promise<JobRole[]> {
  const normalizedSkills = normalizeCandidateSkills(candidateSkills);
  const candidatePillarProfile = buildCandidatePillarProfile(normalizedSkills);
  const skillMap = new Map(normalizedSkills.map((skill) => [normaliseSkill(skill.name), skill]));

  const roleDescription = options?.roleDescription?.trim() ?? "";

  return jobRoles
    .map((role) => {
      const roleSkillMatches = role.matchingSkills.map((roleSkill) => {
        const exact = normalizedSkills.find((skill) => normaliseSkill(skill.name) === normaliseSkill(roleSkill));
        if (exact) {
          return { roleSkill, candidateSkill: exact.name, score: 1, exact: true };
        }

        const bestSemantic = normalizedSkills
          .map((skill) => ({ skill, score: semanticSkillSimilarity(roleSkill, skill.name) }))
          .sort((a, b) => b.score - a.score)[0];

        return {
          roleSkill,
          candidateSkill: bestSemantic?.skill.name ?? "",
          score: bestSemantic?.score ?? 0,
          exact: false,
        };
      });

      const matchingSkills = roleSkillMatches
        .filter((match) => match.score >= 0.55)
        .map((match) => match.roleSkill);
      const missingSkills = roleSkillMatches.filter((match) => match.score < 0.35).map((match) => match.roleSkill);
      const roleSkillAlignment =
        roleSkillMatches.reduce((total, match) => total + match.score, 0) / Math.max(1, roleSkillMatches.length);
      const rolePillars = buildRolePillarExpectation(role);
      const pillarAlignment = Object.entries(rolePillars).reduce((sum, [pillar, expected]) => {
        const value = candidatePillarProfile[pillar as RubricPillar] ?? 0;
        return sum + expected * (value / 100);
      }, 0);
      const directMatchRatio = matchingSkills.length / Math.max(1, role.matchingSkills.length);
      const verifiedRatio = matchingSkills.length
        ? matchingSkills.filter((skill) => skillMap.get(normaliseSkill(skill))?.verified).length / matchingSkills.length
        : 0;
      const confidenceRatio = matchingSkills.length
        ? matchingSkills.reduce((sum, skill) => sum + (skillMap.get(normaliseSkill(skill))?.confidence ?? 0), 0) / matchingSkills.length
        : 0;

      const roleText = `${role.title} ${role.company} ${role.location} ${role.matchingSkills.join(" ")} ${role.rationale}`;
      const semanticTextFit = Math.max(
        semanticSimilarity(roleText, roleDescription),
        roleDescription ? semanticSimilarity(roleDescription, roleText) : 0,
      );
      const evidenceMatchCount = roleSkillMatches.filter((match) => match.score >= 0.55 && (skillMap.get(normaliseSkill(match.candidateSkill))?.confidence ?? 0) >= 0.78).length;
      const rawScore =
        directMatchRatio * 46 +
        pillarAlignment * 22 +
        verifiedRatio * 10 +
        confidenceRatio * 6 +
        semanticTextFit * 10 +
        roleSkillAlignment * 6;
      const matchScore = Math.min(100, Math.round(rawScore));

      const pillarScores = candidatePillarProfile;
      const justifications = buildMatchJustifications(
        role,
        normalizedSkills,
        pillarScores,
        matchingSkills,
        missingSkills,
        semanticTextFit,
        roleSkillAlignment,
        evidenceMatchCount,
      );
      const rationale = justifications.length
        ? justifications.join(" ")
        : "No direct evidence was found for the role requirements.";

      return {
        ...role,
        matchScore,
        matchingSkills,
        missingSkills,
        pillarScores,
        justifications,
        rationale,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

