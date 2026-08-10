/**
 * Shared type surface for SkillLens AI.
 *
 * Types ถูกประกาศไว้ข้างชุดข้อมูลใน `src/data/*` และ re-export ที่ไฟล์นี้
 * เพื่อให้โค้ดฝั่ง service/component import จากที่เดียวได้ (`@/types`)
 */

export type {
  CandidateProfile,
  Evidence,
  EvidenceFile,
  EvidenceSourceType,
  JobRole,
  RoadmapWeek,
  Role,
  RubricPillar,
  Skill,
} from "@/data/demo";

export type {
  BiasFlag,
  Persona,
  PersonaJobMatch,
  PersonaKind,
  PersonaRoadmapStep,
  ReadinessBreakdown,
  ReadinessComponent,
  SuccessStory,
} from "@/data/impact";

export type { StandardFramework, StandardProfile, StandardRef } from "@/data/standards";

export type { AuditEntry, AuditKind, AuditRef } from "@/data/audit";
