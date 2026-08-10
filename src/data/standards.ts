/**
 * Skill Standard Alignment
 * Every skill surfaced by SkillLens AI is mapped to national and international
 * skill frameworks so that employers, universities and future credit-bank
 * integrations speak the same language.
 */

export type StandardFramework = "ESCO" | "O*NET" | "SFIA" | "TQF" | "NCB";

export interface StandardRef {
  framework: StandardFramework;
  code: string;
  name: string;
  level?: string;
}

export interface StandardProfile {
  standards: StandardRef[];
  occupations: string[];
  outcomes: string[];
  related: string[];
  /** National Credit Bank readiness — structure prepared for future integration. */
  creditBank: {
    status: "Mapped" | "Draft mapping" | "Awaiting standard";
    credits: number;
    unitCode: string;
  };
}

const LIBRARY: Record<string, StandardProfile> = {
  TypeScript: {
    standards: [
      { framework: "ESCO", code: "S1.2.2", name: "Use computer programming languages", level: "Level 5" },
      { framework: "O*NET", code: "15-1252.00", name: "Software Developers" },
      { framework: "SFIA", code: "PROG", name: "Programming/software development", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-6", name: "Software development competency", level: "Bachelor" },
    ],
    occupations: ["Software Developer", "Backend Developer", "Full Stack Developer"],
    outcomes: [
      "Design typed API contracts and enforce them at build time",
      "Refactor JavaScript codebases to strict type safety",
    ],
    related: ["React", "Node.js", "PostgreSQL"],
    creditBank: { status: "Mapped", credits: 3, unitCode: "NCB-IT-PROG-301" },
  },
  Python: {
    standards: [
      { framework: "ESCO", code: "S1.2.2", name: "Use computer programming languages", level: "Level 5" },
      { framework: "O*NET", code: "15-2051.00", name: "Data Scientists" },
      { framework: "SFIA", code: "PROG", name: "Programming/software development", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-6", name: "Software development competency", level: "Bachelor" },
    ],
    occupations: ["Backend Developer", "Data Engineer", "AI Engineer"],
    outcomes: ["Build service APIs with FastAPI", "Implement data and retrieval pipelines"],
    related: ["Applied Research & Evaluation", "PostgreSQL"],
    creditBank: { status: "Mapped", credits: 3, unitCode: "NCB-IT-PROG-302" },
  },
  React: {
    standards: [
      { framework: "ESCO", code: "S1.2.3", name: "Develop web applications", level: "Level 4" },
      { framework: "O*NET", code: "15-1254.00", name: "Web Developers" },
      { framework: "SFIA", code: "PROG", name: "Programming/software development", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-5", name: "Application development", level: "Bachelor" },
    ],
    occupations: ["Frontend Developer", "Full Stack Developer", "UI Engineer"],
    outcomes: ["Compose accessible component libraries", "Manage client data-fetching state"],
    related: ["TypeScript", "UI Design (Figma)"],
    creditBank: { status: "Mapped", credits: 3, unitCode: "NCB-IT-WEB-210" },
  },
  PostgreSQL: {
    standards: [
      { framework: "ESCO", code: "S1.4.1", name: "Manage database systems", level: "Level 4" },
      { framework: "O*NET", code: "15-1242.00", name: "Database Administrators" },
      { framework: "SFIA", code: "DBAD", name: "Database administration", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-4", name: "Data management competency", level: "Bachelor" },
    ],
    occupations: ["Backend Developer", "Data Engineer"],
    outcomes: ["Design normalised schemas", "Tune indexes for retrieval workloads"],
    related: ["Python", "TypeScript"],
    creditBank: { status: "Mapped", credits: 3, unitCode: "NCB-IT-DATA-220" },
  },
  Docker: {
    standards: [
      { framework: "ESCO", code: "S1.7.2", name: "Deploy ICT systems", level: "Level 4" },
      { framework: "O*NET", code: "15-1244.00", name: "Network and Computer Systems Administrators" },
      { framework: "SFIA", code: "RELM", name: "Release and deployment", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-7", name: "System deployment competency", level: "Bachelor" },
    ],
    occupations: ["DevOps Engineer", "Platform Engineer", "Backend Developer"],
    outcomes: ["Author multi-stage container images", "Reproduce environments across stages"],
    related: ["CI/CD (GitHub Actions)", "AWS"],
    creditBank: { status: "Mapped", credits: 2, unitCode: "NCB-IT-OPS-140" },
  },
  "CI/CD (GitHub Actions)": {
    standards: [
      { framework: "ESCO", code: "S1.7.4", name: "Automate software delivery", level: "Level 4" },
      { framework: "O*NET", code: "15-1252.00", name: "Software Developers" },
      { framework: "SFIA", code: "RELM", name: "Release and deployment", level: "Level 3" },
      { framework: "TQF", code: "TQF-IT-7", name: "System deployment competency", level: "Bachelor" },
    ],
    occupations: ["DevOps Engineer", "Software Engineer"],
    outcomes: ["Gate merges with automated tests", "Ship repeatable deployments"],
    related: ["Docker", "AWS"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-IT-OPS-141" },
  },
  AWS: {
    standards: [
      { framework: "ESCO", code: "S1.8.1", name: "Use cloud services", level: "Level 4" },
      { framework: "O*NET", code: "15-1241.00", name: "Computer Network Architects" },
      { framework: "SFIA", code: "ITOP", name: "IT infrastructure operation", level: "Level 2" },
      { framework: "TQF", code: "TQF-IT-8", name: "Cloud computing fundamentals", level: "Bachelor" },
    ],
    occupations: ["Cloud Engineer", "Platform Engineer"],
    outcomes: ["Deploy containerised workloads to managed compute", "Explain core cloud pricing models"],
    related: ["Docker", "CI/CD (GitHub Actions)"],
    creditBank: { status: "Mapped", credits: 2, unitCode: "NCB-IT-CLOUD-120" },
  },
  "Applied Research & Evaluation": {
    standards: [
      { framework: "ESCO", code: "S2.1.1", name: "Conduct scientific research", level: "Level 5" },
      { framework: "O*NET", code: "19-1099.00", name: "Research Specialists" },
      { framework: "SFIA", code: "RSCH", name: "Research", level: "Level 3" },
      { framework: "TQF", code: "TQF-RES-3", name: "Research methodology", level: "Bachelor" },
    ],
    occupations: ["AI Engineer", "Research Assistant", "Data Scientist"],
    outcomes: ["Design a benchmark with baselines", "Apply significance testing to results"],
    related: ["Python", "PostgreSQL"],
    creditBank: { status: "Mapped", credits: 3, unitCode: "NCB-RES-310" },
  },
  "Team Leadership": {
    standards: [
      { framework: "ESCO", code: "T3.1.1", name: "Lead a team", level: "Level 4" },
      { framework: "O*NET", code: "2.B.1.f", name: "Coordination / Social Skills" },
      { framework: "SFIA", code: "PEMT", name: "People management", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-2", name: "Interpersonal skills and responsibility" },
    ],
    occupations: ["Team Lead", "Project Coordinator"],
    outcomes: ["Facilitate stand-ups and unblock teammates", "Present outcomes to stakeholders"],
    related: ["Communication", "Project Management"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-GEN-210" },
  },
  "UI Design (Figma)": {
    standards: [
      { framework: "ESCO", code: "S1.3.2", name: "Design user interfaces", level: "Level 3" },
      { framework: "O*NET", code: "27-1024.00", name: "Graphic Designers" },
      { framework: "SFIA", code: "HCEV", name: "User experience design", level: "Level 2" },
      { framework: "TQF", code: "TQF-DES-3", name: "Visual communication design" },
    ],
    occupations: ["UI Designer", "Product Designer"],
    outcomes: ["Produce component specs from wireframes", "Document design decisions"],
    related: ["React", "Creativity"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-DES-130" },
  },
  Communication: {
    standards: [
      { framework: "ESCO", code: "T4.1.1", name: "Communicate with others", level: "Level 4" },
      { framework: "O*NET", code: "2.A.1.a", name: "Active Listening / Speaking" },
      { framework: "SFIA", code: "RLMT", name: "Stakeholder relationship management", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-5", name: "Communication and IT skills" },
    ],
    occupations: ["Customer Success Associate", "Team Lead", "Community Coordinator"],
    outcomes: ["Explain complex information to non-experts", "De-escalate difficult conversations"],
    related: ["Customer Service", "Negotiation"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-GEN-201" },
  },
  "Customer Service": {
    standards: [
      { framework: "ESCO", code: "S4.2.1", name: "Provide customer service", level: "Level 3" },
      { framework: "O*NET", code: "43-4051.00", name: "Customer Service Representatives" },
      { framework: "SFIA", code: "USUP", name: "Customer service support", level: "Level 2" },
      { framework: "TQF", code: "TQF-GEN-2", name: "Interpersonal skills and responsibility" },
    ],
    occupations: ["Customer Support Specialist", "Retail Supervisor", "Service Desk Analyst"],
    outcomes: ["Resolve complaints within service expectations", "Track and follow up on issues"],
    related: ["Communication", "Negotiation"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-SRV-110" },
  },
  "Entrepreneurial Mindset": {
    standards: [
      { framework: "ESCO", code: "T5.2.1", name: "Take an entrepreneurial approach", level: "Level 4" },
      { framework: "O*NET", code: "11-1021.00", name: "General and Operations Managers" },
      { framework: "SFIA", code: "BUSA", name: "Business situation analysis", level: "Level 3" },
      { framework: "TQF", code: "TQF-BUS-4", name: "Business planning competency" },
    ],
    occupations: ["Small Business Owner", "Operations Associate", "Growth Analyst"],
    outcomes: ["Model unit economics for a small venture", "Test demand before investing capital"],
    related: ["Negotiation", "Digital Literacy", "Problem Solving"],
    creditBank: { status: "Draft mapping", credits: 3, unitCode: "NCB-BUS-220" },
  },
  Negotiation: {
    standards: [
      { framework: "ESCO", code: "S4.3.2", name: "Negotiate terms with suppliers", level: "Level 3" },
      { framework: "O*NET", code: "2.B.1.e", name: "Negotiation" },
      { framework: "SFIA", code: "SORC", name: "Sourcing", level: "Level 2" },
      { framework: "TQF", code: "TQF-BUS-5", name: "Commercial communication" },
    ],
    occupations: ["Purchasing Assistant", "Account Executive", "Small Business Owner"],
    outcomes: ["Prepare and defend a price position", "Reach agreements that hold over time"],
    related: ["Communication", "Entrepreneurial Mindset"],
    creditBank: { status: "Draft mapping", credits: 1, unitCode: "NCB-BUS-221" },
  },
  "Project Management": {
    standards: [
      { framework: "ESCO", code: "T3.2.1", name: "Manage projects", level: "Level 4" },
      { framework: "O*NET", code: "13-1082.00", name: "Project Management Specialists" },
      { framework: "SFIA", code: "PRMG", name: "Project management", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-3", name: "Planning and organisation" },
    ],
    occupations: ["Project Coordinator", "Event Manager", "Operations Associate"],
    outcomes: ["Plan a schedule with dependencies", "Report progress against a plan"],
    related: ["Team Leadership", "Time Management"],
    creditBank: { status: "Draft mapping", credits: 2, unitCode: "NCB-GEN-230" },
  },
  "Self Learning": {
    standards: [
      { framework: "ESCO", code: "T1.1.1", name: "Manage own learning", level: "Level 4" },
      { framework: "O*NET", code: "2.A.2.c", name: "Active Learning" },
      { framework: "SFIA", code: "PDSV", name: "Professional development", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-1", name: "Lifelong learning skills" },
    ],
    occupations: ["Junior Developer", "Career Changer", "Analyst"],
    outcomes: ["Complete a structured learning plan", "Apply new knowledge in a shipped artefact"],
    related: ["Digital Literacy", "Problem Solving"],
    creditBank: { status: "Mapped", credits: 2, unitCode: "NCB-GEN-101" },
  },
  "Digital Literacy": {
    standards: [
      { framework: "ESCO", code: "S1.1.1", name: "Use digital tools", level: "Level 3" },
      { framework: "O*NET", code: "2.B.3.e", name: "Technology Design" },
      { framework: "SFIA", code: "DTAN", name: "Digital tooling", level: "Level 2" },
      { framework: "TQF", code: "TQF-GEN-5", name: "Communication and IT skills" },
    ],
    occupations: ["Administrative Officer", "Content Coordinator", "Retail Operations"],
    outcomes: ["Operate commerce and content platforms", "Keep digital records accurately"],
    related: ["Self Learning", "Customer Service"],
    creditBank: { status: "Mapped", credits: 1, unitCode: "NCB-GEN-102" },
  },
  Adaptability: {
    standards: [
      { framework: "ESCO", code: "T1.2.2", name: "Adapt to changing situations", level: "Level 3" },
      { framework: "O*NET", code: "1.C.5.b", name: "Adaptability/Flexibility" },
      { framework: "SFIA", code: "PDSV", name: "Professional development", level: "Level 2" },
      { framework: "TQF", code: "TQF-GEN-1", name: "Lifelong learning skills" },
    ],
    occupations: ["Service Crew Lead", "Operations Associate", "Support Specialist"],
    outcomes: ["Maintain output under shifting priorities", "Learn new procedures quickly"],
    related: ["Self Learning", "Time Management"],
    creditBank: { status: "Awaiting standard", credits: 1, unitCode: "NCB-GEN-103" },
  },
  "Problem Solving": {
    standards: [
      { framework: "ESCO", code: "T2.1.1", name: "Solve problems", level: "Level 4" },
      { framework: "O*NET", code: "2.B.2.i", name: "Complex Problem Solving" },
      { framework: "SFIA", code: "PROB", name: "Problem management", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-4", name: "Analytical thinking" },
    ],
    occupations: ["Support Engineer", "Operations Analyst", "Developer"],
    outcomes: ["Diagnose root causes from limited information", "Document a durable fix"],
    related: ["Critical Thinking", "Adaptability"],
    creditBank: { status: "Mapped", credits: 2, unitCode: "NCB-GEN-240" },
  },
  "Time Management": {
    standards: [
      { framework: "ESCO", code: "T1.3.1", name: "Manage own time", level: "Level 3" },
      { framework: "O*NET", code: "2.B.5.a", name: "Time Management" },
      { framework: "SFIA", code: "PDSV", name: "Professional development", level: "Level 2" },
      { framework: "TQF", code: "TQF-GEN-3", name: "Planning and organisation" },
    ],
    occupations: ["Operations Associate", "Freelancer", "Student Worker"],
    outcomes: ["Balance concurrent commitments to deadline", "Prioritise by impact"],
    related: ["Project Management", "Adaptability"],
    creditBank: { status: "Awaiting standard", credits: 1, unitCode: "NCB-GEN-104" },
  },
  Creativity: {
    standards: [
      { framework: "ESCO", code: "T2.2.1", name: "Think creatively", level: "Level 3" },
      { framework: "O*NET", code: "1.A.1.b.2", name: "Originality" },
      { framework: "SFIA", code: "INOV", name: "Innovation", level: "Level 2" },
      { framework: "TQF", code: "TQF-DES-2", name: "Creative practice" },
    ],
    occupations: ["Content Creator", "Designer", "Marketing Associate"],
    outcomes: ["Produce original work to a brief", "Iterate from audience feedback"],
    related: ["UI Design (Figma)", "Digital Literacy"],
    creditBank: { status: "Awaiting standard", credits: 1, unitCode: "NCB-DES-105" },
  },
  Collaboration: {
    standards: [
      { framework: "ESCO", code: "T3.1.2", name: "Work in teams", level: "Level 3" },
      { framework: "O*NET", code: "2.B.1.d", name: "Coordination" },
      { framework: "SFIA", code: "RLMT", name: "Stakeholder relationship management", level: "Level 2" },
      { framework: "TQF", code: "TQF-GEN-2", name: "Interpersonal skills and responsibility" },
    ],
    occupations: ["Developer", "Volunteer Coordinator", "Operations Associate"],
    outcomes: ["Contribute to shared deliverables", "Give and receive review feedback"],
    related: ["Communication", "Team Leadership"],
    creditBank: { status: "Mapped", credits: 1, unitCode: "NCB-GEN-205" },
  },
  "Critical Thinking": {
    standards: [
      { framework: "ESCO", code: "T2.1.2", name: "Analyse information critically", level: "Level 4" },
      { framework: "O*NET", code: "2.A.2.a", name: "Critical Thinking" },
      { framework: "SFIA", code: "BUSA", name: "Business situation analysis", level: "Level 3" },
      { framework: "TQF", code: "TQF-GEN-4", name: "Analytical thinking" },
    ],
    occupations: ["Analyst", "Researcher", "Developer"],
    outcomes: ["Compare options against stated criteria", "Separate evidence from assumption"],
    related: ["Problem Solving", "Applied Research & Evaluation"],
    creditBank: { status: "Mapped", credits: 2, unitCode: "NCB-GEN-241" },
  },
};

export function getStandardProfile(skillName: string): StandardProfile | undefined {
  return LIBRARY[skillName];
}

export const FRAMEWORKS: { id: StandardFramework; label: string; note: string }[] = [
  { id: "ESCO", label: "ESCO", note: "European Skills, Competences and Occupations" },
  { id: "O*NET", label: "O*NET", note: "US occupational skill taxonomy" },
  { id: "SFIA", label: "SFIA", note: "Skills Framework for the Information Age" },
  { id: "TQF", label: "TQF", note: "Thailand Qualification Framework" },
  { id: "NCB", label: "National Credit Bank", note: "Structure prepared for future integration" },
];
