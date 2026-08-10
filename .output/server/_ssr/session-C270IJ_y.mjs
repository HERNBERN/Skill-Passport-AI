import { i as __toESM } from "../_runtime.mjs";
import { t as DEMO_ACCOUNTS } from "./demo-D_HVL5mM.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/session-C270IJ_y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var KEY = "skilllens.session";
var EVT = "skilllens:session";
function readSession() {
	if (typeof window === "undefined") return null;
	try {
		const raw = window.localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
}
function signOut() {
	window.localStorage.removeItem(KEY);
	window.dispatchEvent(new Event(EVT));
}
function signIn(email, password) {
	const account = DEMO_ACCOUNTS[email.trim().toLowerCase()];
	if (!account || account.password !== password) return null;
	const session = {
		email: email.trim().toLowerCase(),
		name: account.name,
		role: account.role
	};
	window.localStorage.setItem(KEY, JSON.stringify(session));
	window.dispatchEvent(new Event(EVT));
	return session;
}
function useSession() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	const sync = (0, import_react.useCallback)(() => setSession(readSession()), []);
	(0, import_react.useEffect)(() => {
		sync();
		setReady(true);
		window.addEventListener(EVT, sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener(EVT, sync);
			window.removeEventListener("storage", sync);
		};
	}, [sync]);
	return {
		session,
		ready
	};
}
var THEME_KEY = "skilllens.theme";
function useTheme() {
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const isDark = window.localStorage.getItem(THEME_KEY) === "dark";
		setDark(isDark);
		document.documentElement.classList.toggle("dark", isDark);
	}, []);
	return {
		dark,
		toggle: (0, import_react.useCallback)(() => {
			setDark((prev) => {
				const next = !prev;
				window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
				document.documentElement.classList.toggle("dark", next);
				return next;
			});
		}, [])
	};
}
//#endregion
export { useTheme as i, signOut as n, useSession as r, signIn as t };
