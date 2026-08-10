import { type JobRole, type Skill } from "@/data/demo";

const SKILLS_KEY = "skilllens.currentSkills";
const JOB_MATCHES_KEY = "skilllens.currentJobMatches";

export interface PipelineState {
  skills: Skill[];
  jobMatches: JobRole[];
  updatedAt: string;
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function readPipelineState(): PipelineState | null {
  if (typeof window === "undefined") return null;
  const skills = safeParse<Skill[]>(window.localStorage.getItem(SKILLS_KEY));
  const jobMatches = safeParse<JobRole[]>(window.localStorage.getItem(JOB_MATCHES_KEY));
  if (!skills || !jobMatches) return null;
  return { skills, jobMatches, updatedAt: window.localStorage.getItem(`${SKILLS_KEY}.updatedAt`) ?? new Date().toISOString() };
}

export function savePipelineState(skills: Skill[], jobMatches: JobRole[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
  window.localStorage.setItem(JOB_MATCHES_KEY, JSON.stringify(jobMatches));
  window.localStorage.setItem(`${SKILLS_KEY}.updatedAt`, new Date().toISOString());
}

export function clearPipelineState() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SKILLS_KEY);
  window.localStorage.removeItem(JOB_MATCHES_KEY);
  window.localStorage.removeItem(`${SKILLS_KEY}.updatedAt`);
}
