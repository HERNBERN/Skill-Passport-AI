import { i as __toESM } from "../_runtime.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { H as Globe, O as Quote, U as Github, _ as ShoppingBag, ct as ChevronRight, h as Sparkles, o as UserRound, q as FileText, r as X, z as HeartHandshake } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Separator } from "./separator-B3hsz7IR.mjs";
import { t as Progress } from "./progress-DOIEKRJF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skill-evidence-DItBqdZ7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var LIBRARY = {
	TypeScript: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.2.2",
				name: "Use computer programming languages",
				level: "Level 5"
			},
			{
				framework: "O*NET",
				code: "15-1252.00",
				name: "Software Developers"
			},
			{
				framework: "SFIA",
				code: "PROG",
				name: "Programming/software development",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-6",
				name: "Software development competency",
				level: "Bachelor"
			}
		],
		occupations: [
			"Software Developer",
			"Backend Developer",
			"Full Stack Developer"
		],
		outcomes: ["Design typed API contracts and enforce them at build time", "Refactor JavaScript codebases to strict type safety"],
		related: [
			"React",
			"Node.js",
			"PostgreSQL"
		],
		creditBank: {
			status: "Mapped",
			credits: 3,
			unitCode: "NCB-IT-PROG-301"
		}
	},
	Python: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.2.2",
				name: "Use computer programming languages",
				level: "Level 5"
			},
			{
				framework: "O*NET",
				code: "15-2051.00",
				name: "Data Scientists"
			},
			{
				framework: "SFIA",
				code: "PROG",
				name: "Programming/software development",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-6",
				name: "Software development competency",
				level: "Bachelor"
			}
		],
		occupations: [
			"Backend Developer",
			"Data Engineer",
			"AI Engineer"
		],
		outcomes: ["Build service APIs with FastAPI", "Implement data and retrieval pipelines"],
		related: ["Applied Research & Evaluation", "PostgreSQL"],
		creditBank: {
			status: "Mapped",
			credits: 3,
			unitCode: "NCB-IT-PROG-302"
		}
	},
	React: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.2.3",
				name: "Develop web applications",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "15-1254.00",
				name: "Web Developers"
			},
			{
				framework: "SFIA",
				code: "PROG",
				name: "Programming/software development",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-5",
				name: "Application development",
				level: "Bachelor"
			}
		],
		occupations: [
			"Frontend Developer",
			"Full Stack Developer",
			"UI Engineer"
		],
		outcomes: ["Compose accessible component libraries", "Manage client data-fetching state"],
		related: ["TypeScript", "UI Design (Figma)"],
		creditBank: {
			status: "Mapped",
			credits: 3,
			unitCode: "NCB-IT-WEB-210"
		}
	},
	PostgreSQL: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.4.1",
				name: "Manage database systems",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "15-1242.00",
				name: "Database Administrators"
			},
			{
				framework: "SFIA",
				code: "DBAD",
				name: "Database administration",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-4",
				name: "Data management competency",
				level: "Bachelor"
			}
		],
		occupations: ["Backend Developer", "Data Engineer"],
		outcomes: ["Design normalised schemas", "Tune indexes for retrieval workloads"],
		related: ["Python", "TypeScript"],
		creditBank: {
			status: "Mapped",
			credits: 3,
			unitCode: "NCB-IT-DATA-220"
		}
	},
	Docker: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.7.2",
				name: "Deploy ICT systems",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "15-1244.00",
				name: "Network and Computer Systems Administrators"
			},
			{
				framework: "SFIA",
				code: "RELM",
				name: "Release and deployment",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-7",
				name: "System deployment competency",
				level: "Bachelor"
			}
		],
		occupations: [
			"DevOps Engineer",
			"Platform Engineer",
			"Backend Developer"
		],
		outcomes: ["Author multi-stage container images", "Reproduce environments across stages"],
		related: ["CI/CD (GitHub Actions)", "AWS"],
		creditBank: {
			status: "Mapped",
			credits: 2,
			unitCode: "NCB-IT-OPS-140"
		}
	},
	"CI/CD (GitHub Actions)": {
		standards: [
			{
				framework: "ESCO",
				code: "S1.7.4",
				name: "Automate software delivery",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "15-1252.00",
				name: "Software Developers"
			},
			{
				framework: "SFIA",
				code: "RELM",
				name: "Release and deployment",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-IT-7",
				name: "System deployment competency",
				level: "Bachelor"
			}
		],
		occupations: ["DevOps Engineer", "Software Engineer"],
		outcomes: ["Gate merges with automated tests", "Ship repeatable deployments"],
		related: ["Docker", "AWS"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-IT-OPS-141"
		}
	},
	AWS: {
		standards: [
			{
				framework: "ESCO",
				code: "S1.8.1",
				name: "Use cloud services",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "15-1241.00",
				name: "Computer Network Architects"
			},
			{
				framework: "SFIA",
				code: "ITOP",
				name: "IT infrastructure operation",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-IT-8",
				name: "Cloud computing fundamentals",
				level: "Bachelor"
			}
		],
		occupations: ["Cloud Engineer", "Platform Engineer"],
		outcomes: ["Deploy containerised workloads to managed compute", "Explain core cloud pricing models"],
		related: ["Docker", "CI/CD (GitHub Actions)"],
		creditBank: {
			status: "Mapped",
			credits: 2,
			unitCode: "NCB-IT-CLOUD-120"
		}
	},
	"Applied Research & Evaluation": {
		standards: [
			{
				framework: "ESCO",
				code: "S2.1.1",
				name: "Conduct scientific research",
				level: "Level 5"
			},
			{
				framework: "O*NET",
				code: "19-1099.00",
				name: "Research Specialists"
			},
			{
				framework: "SFIA",
				code: "RSCH",
				name: "Research",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-RES-3",
				name: "Research methodology",
				level: "Bachelor"
			}
		],
		occupations: [
			"AI Engineer",
			"Research Assistant",
			"Data Scientist"
		],
		outcomes: ["Design a benchmark with baselines", "Apply significance testing to results"],
		related: ["Python", "PostgreSQL"],
		creditBank: {
			status: "Mapped",
			credits: 3,
			unitCode: "NCB-RES-310"
		}
	},
	"Team Leadership": {
		standards: [
			{
				framework: "ESCO",
				code: "T3.1.1",
				name: "Lead a team",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "2.B.1.f",
				name: "Coordination / Social Skills"
			},
			{
				framework: "SFIA",
				code: "PEMT",
				name: "People management",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-2",
				name: "Interpersonal skills and responsibility"
			}
		],
		occupations: ["Team Lead", "Project Coordinator"],
		outcomes: ["Facilitate stand-ups and unblock teammates", "Present outcomes to stakeholders"],
		related: ["Communication", "Project Management"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-GEN-210"
		}
	},
	"UI Design (Figma)": {
		standards: [
			{
				framework: "ESCO",
				code: "S1.3.2",
				name: "Design user interfaces",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "27-1024.00",
				name: "Graphic Designers"
			},
			{
				framework: "SFIA",
				code: "HCEV",
				name: "User experience design",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-DES-3",
				name: "Visual communication design"
			}
		],
		occupations: ["UI Designer", "Product Designer"],
		outcomes: ["Produce component specs from wireframes", "Document design decisions"],
		related: ["React", "Creativity"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-DES-130"
		}
	},
	Communication: {
		standards: [
			{
				framework: "ESCO",
				code: "T4.1.1",
				name: "Communicate with others",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "2.A.1.a",
				name: "Active Listening / Speaking"
			},
			{
				framework: "SFIA",
				code: "RLMT",
				name: "Stakeholder relationship management",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-5",
				name: "Communication and IT skills"
			}
		],
		occupations: [
			"Customer Success Associate",
			"Team Lead",
			"Community Coordinator"
		],
		outcomes: ["Explain complex information to non-experts", "De-escalate difficult conversations"],
		related: ["Customer Service", "Negotiation"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-GEN-201"
		}
	},
	"Customer Service": {
		standards: [
			{
				framework: "ESCO",
				code: "S4.2.1",
				name: "Provide customer service",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "43-4051.00",
				name: "Customer Service Representatives"
			},
			{
				framework: "SFIA",
				code: "USUP",
				name: "Customer service support",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-2",
				name: "Interpersonal skills and responsibility"
			}
		],
		occupations: [
			"Customer Support Specialist",
			"Retail Supervisor",
			"Service Desk Analyst"
		],
		outcomes: ["Resolve complaints within service expectations", "Track and follow up on issues"],
		related: ["Communication", "Negotiation"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-SRV-110"
		}
	},
	"Entrepreneurial Mindset": {
		standards: [
			{
				framework: "ESCO",
				code: "T5.2.1",
				name: "Take an entrepreneurial approach",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "11-1021.00",
				name: "General and Operations Managers"
			},
			{
				framework: "SFIA",
				code: "BUSA",
				name: "Business situation analysis",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-BUS-4",
				name: "Business planning competency"
			}
		],
		occupations: [
			"Small Business Owner",
			"Operations Associate",
			"Growth Analyst"
		],
		outcomes: ["Model unit economics for a small venture", "Test demand before investing capital"],
		related: [
			"Negotiation",
			"Digital Literacy",
			"Problem Solving"
		],
		creditBank: {
			status: "Draft mapping",
			credits: 3,
			unitCode: "NCB-BUS-220"
		}
	},
	Negotiation: {
		standards: [
			{
				framework: "ESCO",
				code: "S4.3.2",
				name: "Negotiate terms with suppliers",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "2.B.1.e",
				name: "Negotiation"
			},
			{
				framework: "SFIA",
				code: "SORC",
				name: "Sourcing",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-BUS-5",
				name: "Commercial communication"
			}
		],
		occupations: [
			"Purchasing Assistant",
			"Account Executive",
			"Small Business Owner"
		],
		outcomes: ["Prepare and defend a price position", "Reach agreements that hold over time"],
		related: ["Communication", "Entrepreneurial Mindset"],
		creditBank: {
			status: "Draft mapping",
			credits: 1,
			unitCode: "NCB-BUS-221"
		}
	},
	"Project Management": {
		standards: [
			{
				framework: "ESCO",
				code: "T3.2.1",
				name: "Manage projects",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "13-1082.00",
				name: "Project Management Specialists"
			},
			{
				framework: "SFIA",
				code: "PRMG",
				name: "Project management",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-3",
				name: "Planning and organisation"
			}
		],
		occupations: [
			"Project Coordinator",
			"Event Manager",
			"Operations Associate"
		],
		outcomes: ["Plan a schedule with dependencies", "Report progress against a plan"],
		related: ["Team Leadership", "Time Management"],
		creditBank: {
			status: "Draft mapping",
			credits: 2,
			unitCode: "NCB-GEN-230"
		}
	},
	"Self Learning": {
		standards: [
			{
				framework: "ESCO",
				code: "T1.1.1",
				name: "Manage own learning",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "2.A.2.c",
				name: "Active Learning"
			},
			{
				framework: "SFIA",
				code: "PDSV",
				name: "Professional development",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-1",
				name: "Lifelong learning skills"
			}
		],
		occupations: [
			"Junior Developer",
			"Career Changer",
			"Analyst"
		],
		outcomes: ["Complete a structured learning plan", "Apply new knowledge in a shipped artefact"],
		related: ["Digital Literacy", "Problem Solving"],
		creditBank: {
			status: "Mapped",
			credits: 2,
			unitCode: "NCB-GEN-101"
		}
	},
	"Digital Literacy": {
		standards: [
			{
				framework: "ESCO",
				code: "S1.1.1",
				name: "Use digital tools",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "2.B.3.e",
				name: "Technology Design"
			},
			{
				framework: "SFIA",
				code: "DTAN",
				name: "Digital tooling",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-5",
				name: "Communication and IT skills"
			}
		],
		occupations: [
			"Administrative Officer",
			"Content Coordinator",
			"Retail Operations"
		],
		outcomes: ["Operate commerce and content platforms", "Keep digital records accurately"],
		related: ["Self Learning", "Customer Service"],
		creditBank: {
			status: "Mapped",
			credits: 1,
			unitCode: "NCB-GEN-102"
		}
	},
	Adaptability: {
		standards: [
			{
				framework: "ESCO",
				code: "T1.2.2",
				name: "Adapt to changing situations",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "1.C.5.b",
				name: "Adaptability/Flexibility"
			},
			{
				framework: "SFIA",
				code: "PDSV",
				name: "Professional development",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-1",
				name: "Lifelong learning skills"
			}
		],
		occupations: [
			"Service Crew Lead",
			"Operations Associate",
			"Support Specialist"
		],
		outcomes: ["Maintain output under shifting priorities", "Learn new procedures quickly"],
		related: ["Self Learning", "Time Management"],
		creditBank: {
			status: "Awaiting standard",
			credits: 1,
			unitCode: "NCB-GEN-103"
		}
	},
	"Problem Solving": {
		standards: [
			{
				framework: "ESCO",
				code: "T2.1.1",
				name: "Solve problems",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "2.B.2.i",
				name: "Complex Problem Solving"
			},
			{
				framework: "SFIA",
				code: "PROB",
				name: "Problem management",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-4",
				name: "Analytical thinking"
			}
		],
		occupations: [
			"Support Engineer",
			"Operations Analyst",
			"Developer"
		],
		outcomes: ["Diagnose root causes from limited information", "Document a durable fix"],
		related: ["Critical Thinking", "Adaptability"],
		creditBank: {
			status: "Mapped",
			credits: 2,
			unitCode: "NCB-GEN-240"
		}
	},
	"Time Management": {
		standards: [
			{
				framework: "ESCO",
				code: "T1.3.1",
				name: "Manage own time",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "2.B.5.a",
				name: "Time Management"
			},
			{
				framework: "SFIA",
				code: "PDSV",
				name: "Professional development",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-3",
				name: "Planning and organisation"
			}
		],
		occupations: [
			"Operations Associate",
			"Freelancer",
			"Student Worker"
		],
		outcomes: ["Balance concurrent commitments to deadline", "Prioritise by impact"],
		related: ["Project Management", "Adaptability"],
		creditBank: {
			status: "Awaiting standard",
			credits: 1,
			unitCode: "NCB-GEN-104"
		}
	},
	Creativity: {
		standards: [
			{
				framework: "ESCO",
				code: "T2.2.1",
				name: "Think creatively",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "1.A.1.b.2",
				name: "Originality"
			},
			{
				framework: "SFIA",
				code: "INOV",
				name: "Innovation",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-DES-2",
				name: "Creative practice"
			}
		],
		occupations: [
			"Content Creator",
			"Designer",
			"Marketing Associate"
		],
		outcomes: ["Produce original work to a brief", "Iterate from audience feedback"],
		related: ["UI Design (Figma)", "Digital Literacy"],
		creditBank: {
			status: "Awaiting standard",
			credits: 1,
			unitCode: "NCB-DES-105"
		}
	},
	Collaboration: {
		standards: [
			{
				framework: "ESCO",
				code: "T3.1.2",
				name: "Work in teams",
				level: "Level 3"
			},
			{
				framework: "O*NET",
				code: "2.B.1.d",
				name: "Coordination"
			},
			{
				framework: "SFIA",
				code: "RLMT",
				name: "Stakeholder relationship management",
				level: "Level 2"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-2",
				name: "Interpersonal skills and responsibility"
			}
		],
		occupations: [
			"Developer",
			"Volunteer Coordinator",
			"Operations Associate"
		],
		outcomes: ["Contribute to shared deliverables", "Give and receive review feedback"],
		related: ["Communication", "Team Leadership"],
		creditBank: {
			status: "Mapped",
			credits: 1,
			unitCode: "NCB-GEN-205"
		}
	},
	"Critical Thinking": {
		standards: [
			{
				framework: "ESCO",
				code: "T2.1.2",
				name: "Analyse information critically",
				level: "Level 4"
			},
			{
				framework: "O*NET",
				code: "2.A.2.a",
				name: "Critical Thinking"
			},
			{
				framework: "SFIA",
				code: "BUSA",
				name: "Business situation analysis",
				level: "Level 3"
			},
			{
				framework: "TQF",
				code: "TQF-GEN-4",
				name: "Analytical thinking"
			}
		],
		occupations: [
			"Analyst",
			"Researcher",
			"Developer"
		],
		outcomes: ["Compare options against stated criteria", "Separate evidence from assumption"],
		related: ["Problem Solving", "Applied Research & Evaluation"],
		creditBank: {
			status: "Mapped",
			credits: 2,
			unitCode: "NCB-GEN-241"
		}
	}
};
function getStandardProfile(skillName) {
	return LIBRARY[skillName];
}
function ConfidenceMeter({ value, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: "Confidence"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono",
				children: [Math.round(value * 100), "%"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			value: value * 100,
			className: "h-1.5"
		})]
	});
}
var sourceIcon = {
	document: FileText,
	github: Github,
	portfolio: Globe,
	experience: UserRound,
	community: HeartHandshake,
	commerce: ShoppingBag
};
function StandardChips({ skill }) {
	const profile = getStandardProfile(skill.name);
	if (!profile) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: profile.standards.map((standard) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
			title: `${standard.name}${standard.level ? ` · ${standard.level}` : ""}`,
			children: [
				standard.framework,
				" ",
				standard.code
			]
		}, `${standard.framework}-${standard.code}`))
	});
}
function StandardDetails({ skill }) {
	const profile = getStandardProfile(skill.name);
	if (!profile) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-sm font-semibold",
				children: "Skill standard alignment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2",
				children: profile.standards.map((standard) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[11px] text-primary",
						children: [
							standard.framework,
							" · ",
							standard.code
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [standard.name, standard.level ? ` — ${standard.level}` : ""]
					})]
				}, `${standard.framework}-${standard.code}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "space-y-2 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-eyebrow",
						children: "Related occupations"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 text-muted-foreground",
						children: profile.occupations.join(" · ")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-eyebrow",
						children: "Related learning outcomes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "list-inside list-disc",
							children: profile.outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: outcome }, outcome))
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-eyebrow",
						children: "Related skills"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-0.5 text-muted-foreground",
						children: profile.related.join(" · ")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-eyebrow",
						children: "National Credit Bank (future integration)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "mt-0.5 font-mono text-[11px] text-muted-foreground",
						children: [
							profile.creditBank.unitCode,
							" · ",
							profile.creditBank.credits,
							" credits ·",
							" ",
							profile.creditBank.status
						]
					})] })
				]
			})
		]
	});
}
function SkillCard({ skill, onOpenEvidence }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel flex flex-col gap-3 p-4 transition-shadow hover:shadow-raised",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "truncate font-display text-base font-semibold",
						children: skill.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow mt-1",
						children: skill.category
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: skill.verified ? "default" : "outline",
					className: "shrink-0",
					children: skill.verified ? "Verified" : "Unverified"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: skill.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						children: skill.level
					}),
					skill.transferable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						children: "Transferable"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						skill.evidence.length,
						" evidence item",
						skill.evidence.length > 1 ? "s" : ""
					] })
				]
			}),
			skill.informalSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: ["แหล่งประสบการณ์: ", skill.informalSource]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardChips, { skill }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, { value: skill.confidence }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				className: "mt-1 min-h-11",
				onClick: () => onOpenEvidence(skill),
				children: ["ดูหลักฐาน / View evidence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
			})
		]
	});
}
function EvidencePanel({ skill, open, onOpenChange, onOpenSource }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
			className: "w-full overflow-y-auto sm:max-w-xl",
			children: skill ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
				className: "font-display",
				children: skill.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Every claim below is traced to source material the candidate uploaded. Nothing here is inferred without evidence." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 px-4 pb-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, { value: skill.confidence }),
					skill.evidence.map((evidence) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EvidenceItem, {
						evidence,
						onOpenSource
					}, evidence.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StandardDetails, { skill })
				]
			})] }) : null
		})
	});
}
function EvidenceItem({ evidence, onOpenSource }) {
	const [showReasoning, setShowReasoning] = (0, import_react.useState)(true);
	const Icon = sourceIcon[evidence.sourceType];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium",
						children: evidence.sourceName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence.sourceType }),
							evidence.page ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["page ", evidence.page] }) : null,
							evidence.paragraph ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["¶ ", evidence.paragraph] }) : null,
							evidence.repository ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence.repository }) : null,
							evidence.filePath ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence.filePath }) : null,
							evidence.commit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["commit ", evidence.commit] }) : null,
							evidence.lineNumber ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["line ", evidence.lineNumber] }) : null,
							evidence.section ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: evidence.section }) : null
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "mt-3 rounded-md border-l-2 border-primary bg-background p-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, { className: "mb-1 size-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "whitespace-pre-wrap",
					children: evidence.quote
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceMeter, {
				value: evidence.confidence,
				className: "mt-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex min-h-11 items-center gap-2 text-xs font-medium text-primary",
				onClick: () => setShowReasoning((v) => !v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3" }), showReasoning ? "Hide AI reasoning" : "Show AI reasoning"]
			}),
			showReasoning ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs leading-relaxed text-muted-foreground",
				children: evidence.reasoning
			}) : null,
			onOpenSource ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				size: "sm",
				className: "mt-3 min-h-11 w-full",
				onClick: () => onOpenSource(evidence),
				children: "เปิดต้นฉบับ / Open source"
			}) : null
		]
	});
}
//#endregion
export { SkillCard as i, EvidenceItem as n, EvidencePanel as r, ConfidenceMeter as t };
