//#region node_modules/.nitro/vite/services/ssr/assets/pipeline-state-B7tGPMm9.js
var SKILLS_KEY = "skilllens.currentSkills";
var JOB_MATCHES_KEY = "skilllens.currentJobMatches";
function safeParse(value) {
	if (!value) return null;
	try {
		return JSON.parse(value);
	} catch {
		return null;
	}
}
function readPipelineState() {
	if (typeof window === "undefined") return null;
	const skills = safeParse(window.localStorage.getItem(SKILLS_KEY));
	const jobMatches = safeParse(window.localStorage.getItem(JOB_MATCHES_KEY));
	if (!skills || !jobMatches) return null;
	return {
		skills,
		jobMatches,
		updatedAt: window.localStorage.getItem(`${SKILLS_KEY}.updatedAt`) ?? (/* @__PURE__ */ new Date()).toISOString()
	};
}
function savePipelineState(skills, jobMatches) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(SKILLS_KEY, JSON.stringify(skills));
	window.localStorage.setItem(JOB_MATCHES_KEY, JSON.stringify(jobMatches));
	window.localStorage.setItem(`${SKILLS_KEY}.updatedAt`, (/* @__PURE__ */ new Date()).toISOString());
}
//#endregion
export { savePipelineState as n, readPipelineState as t };
