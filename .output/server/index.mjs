globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/assistant-BzlXS39B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1803-Q1M0DPQiqx3NkaMX78JDhHhr/MI\"",
		"mtime": "2026-08-10T08:18:08.101Z",
		"size": 6147,
		"path": "../public/assets/assistant-BzlXS39B.js"
	},
	"/assets/app-shell-BpaO_bSO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25ef-uPURNahNhXPdNsjVfHZ2A9Kgf+8\"",
		"mtime": "2026-08-10T08:18:08.087Z",
		"size": 9711,
		"path": "../public/assets/app-shell-BpaO_bSO.js"
	},
	"/assets/auth-BJrRKSXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"188f-ELV1fX1Qb7z623LevCMvJe86cNo\"",
		"mtime": "2026-08-10T08:18:08.122Z",
		"size": 6287,
		"path": "../public/assets/auth-BJrRKSXX.js"
	},
	"/assets/audit-Dy_NnHDm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26a9-EMh4Zt2Mp9FkpUFo729dNHaujRo\"",
		"mtime": "2026-08-10T08:18:08.115Z",
		"size": 9897,
		"path": "../public/assets/audit-Dy_NnHDm.js"
	},
	"/assets/badge-X50nQsIY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"872-EBpX5D/P4pV7H5oEXzsXo+RvGA0\"",
		"mtime": "2026-08-10T08:18:08.136Z",
		"size": 2162,
		"path": "../public/assets/badge-X50nQsIY.js"
	},
	"/assets/BarChart-YMmGta5z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"608a-2ANTTCeI0Acz8eCOuugWzvWYQ70\"",
		"mtime": "2026-08-10T08:18:08.052Z",
		"size": 24714,
		"path": "../public/assets/BarChart-YMmGta5z.js"
	},
	"/assets/arrow-right-ChSSCp_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-AQH+Gyw4RPfK/BrhhEFTlpN7A7Q\"",
		"mtime": "2026-08-10T08:18:08.101Z",
		"size": 154,
		"path": "../public/assets/arrow-right-ChSSCp_o.js"
	},
	"/assets/check-DDiEaOuY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"71-2abnETN/kybnKBg03uKxjwUIkq4\"",
		"mtime": "2026-08-10T08:18:08.142Z",
		"size": 113,
		"path": "../public/assets/check-DDiEaOuY.js"
	},
	"/assets/button-o6J326Dd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"511-dZJ6pdFljDFX3mMiqdYxctl+1SE\"",
		"mtime": "2026-08-10T08:18:08.136Z",
		"size": 1297,
		"path": "../public/assets/button-o6J326Dd.js"
	},
	"/assets/checkbox-By1mrdpn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1195-L83lBiePCG6/2RLSXnQLD8CM3DM\"",
		"mtime": "2026-08-10T08:18:08.143Z",
		"size": 4501,
		"path": "../public/assets/checkbox-By1mrdpn.js"
	},
	"/assets/circle-check-CZLjBSF3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a7-VN+yxQGwZrv/6/EmsVspas4xjd0\"",
		"mtime": "2026-08-10T08:18:08.145Z",
		"size": 167,
		"path": "../public/assets/circle-check-CZLjBSF3.js"
	},
	"/assets/Combination-CGFcC7tI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57ea-cQbpz3ERb1rxzigIdRZDMqXiz8E\"",
		"mtime": "2026-08-10T08:18:08.065Z",
		"size": 22506,
		"path": "../public/assets/Combination-CGFcC7tI.js"
	},
	"/assets/compare-CNo3A-Rm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"271b-ewEpO/H/9Aln3gXSiCt0xV910sk\"",
		"mtime": "2026-08-10T08:18:08.150Z",
		"size": 10011,
		"path": "../public/assets/compare-CNo3A-Rm.js"
	},
	"/assets/dashboard-BWRfneIS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3de8-FV5Yh+M/sLlo6DsOCKv5SDnnTyM\"",
		"mtime": "2026-08-10T08:18:08.164Z",
		"size": 15848,
		"path": "../public/assets/dashboard-BWRfneIS.js"
	},
	"/assets/dist-BIvyxIXX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c98-8eF5nmbEEoOJD/H1vajtSxrs7k4\"",
		"mtime": "2026-08-10T08:18:08.192Z",
		"size": 7320,
		"path": "../public/assets/dist-BIvyxIXX.js"
	},
	"/assets/dist-COWu7GkH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1665-MhHf20RCXeaSIXtbHXGBkEyHt+4\"",
		"mtime": "2026-08-10T08:18:08.198Z",
		"size": 5733,
		"path": "../public/assets/dist-COWu7GkH.js"
	},
	"/assets/dist-C_sir9Uw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"925-RwvjTtO1j0VqsEmO9GTVsKj2Tw4\"",
		"mtime": "2026-08-10T08:18:08.204Z",
		"size": 2341,
		"path": "../public/assets/dist-C_sir9Uw.js"
	},
	"/assets/documents-4dASDxrs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2295-gjp5W0W0+Ggrf/d5uL8JHJN2YH4\"",
		"mtime": "2026-08-10T08:18:08.205Z",
		"size": 8853,
		"path": "../public/assets/documents-4dASDxrs.js"
	},
	"/assets/download-BQw4hGOk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dd-usnnG1gJz1eWOnULtWp8X7Gh0Mg\"",
		"mtime": "2026-08-10T08:18:08.221Z",
		"size": 221,
		"path": "../public/assets/download-BQw4hGOk.js"
	},
	"/assets/file-up-DC2qagpb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"156-bVgovVHpBmVbdop2XS61QA1V9BM\"",
		"mtime": "2026-08-10T08:18:08.247Z",
		"size": 342,
		"path": "../public/assets/file-up-DC2qagpb.js"
	},
	"/assets/evidence-viewer-CkDb-JLp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b64-fD0N3LzQjMOcDCxthCZ4cI7wxQY\"",
		"mtime": "2026-08-10T08:18:08.226Z",
		"size": 11108,
		"path": "../public/assets/evidence-viewer-CkDb-JLp.js"
	},
	"/assets/github-BoOBIyOJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"18c-RVddNnvVx4uFwS+ybgiXtrfXaKE\"",
		"mtime": "2026-08-10T08:18:08.733Z",
		"size": 396,
		"path": "../public/assets/github-BoOBIyOJ.js"
	},
	"/assets/github-zJW7FYb-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5f-L39qO73Q+AERJR/siTA3LXzmAD4\"",
		"mtime": "2026-08-10T08:18:08.740Z",
		"size": 3679,
		"path": "../public/assets/github-zJW7FYb-.js"
	},
	"/assets/generateCategoricalChart-DRuRlCnV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"546da-vBUAx9+5MyJ3H2a9e5Ph8f6NhCM\"",
		"mtime": "2026-08-10T08:18:08.247Z",
		"size": 345818,
		"path": "../public/assets/generateCategoricalChart-DRuRlCnV.js"
	},
	"/assets/globe-DIvJ0FPv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-uEY8qZ2eIOil27oNPoMD3TXkcy4\"",
		"mtime": "2026-08-10T08:18:08.746Z",
		"size": 231,
		"path": "../public/assets/globe-DIvJ0FPv.js"
	},
	"/assets/impact-C8c1-nOF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ef2-SLLhSD3xWEW5gJNqtR/95TbiJtY\"",
		"mtime": "2026-08-10T08:18:08.789Z",
		"size": 20210,
		"path": "../public/assets/impact-C8c1-nOF.js"
	},
	"/assets/jobs-u-LZWNZW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11ed-rgc7u6kLrKx451gEfE6RB5JdqCc\"",
		"mtime": "2026-08-10T08:18:08.824Z",
		"size": 4589,
		"path": "../public/assets/jobs-u-LZWNZW.js"
	},
	"/assets/input-B25-lf6R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"267-R77IGZjMzoXEW6ZlLekhILfJnYY\"",
		"mtime": "2026-08-10T08:18:08.810Z",
		"size": 615,
		"path": "../public/assets/input-B25-lf6R.js"
	},
	"/assets/job-match-panel-37Ww4aH6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d9f-uPTo1nL8lJw5cZSLqL1mR3+jlOM\"",
		"mtime": "2026-08-10T08:18:08.812Z",
		"size": 7583,
		"path": "../public/assets/job-match-panel-37Ww4aH6.js"
	},
	"/assets/label-59gjGjHE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"320-YUKUUpfJWBtfoZeRglYV/NVCsBs\"",
		"mtime": "2026-08-10T08:18:08.830Z",
		"size": 800,
		"path": "../public/assets/label-59gjGjHE.js"
	},
	"/assets/p._passportNumber-C-hofOnL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"326-9GRaMAoxq09kDmTh1veNQi2Vzsg\"",
		"mtime": "2026-08-10T08:18:08.837Z",
		"size": 806,
		"path": "../public/assets/p._passportNumber-C-hofOnL.js"
	},
	"/assets/p._passportNumber--zcSrYip.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5ce-3hI07jKe60cdV2lmhACmHiLuW8g\"",
		"mtime": "2026-08-10T08:18:08.837Z",
		"size": 1486,
		"path": "../public/assets/p._passportNumber--zcSrYip.js"
	},
	"/assets/passport-Bp1ScLoE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32f4-nI2J+CWrJ3dePiuOkMyGdN4epMo\"",
		"mtime": "2026-08-10T08:18:08.837Z",
		"size": 13044,
		"path": "../public/assets/passport-Bp1ScLoE.js"
	},
	"/assets/impact-BtoBHW8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6be5-7GUUfuRszCocJSIaQPVzTbG4C4Q\"",
		"mtime": "2026-08-10T08:18:08.747Z",
		"size": 27621,
		"path": "../public/assets/impact-BtoBHW8J.js"
	},
	"/assets/passport-document-uAOwiO6d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"536e-EUx+wUYAURC5AzNohWfesBwvWZE\"",
		"mtime": "2026-08-10T08:18:08.854Z",
		"size": 21358,
		"path": "../public/assets/passport-document-uAOwiO6d.js"
	},
	"/assets/pipeline-state-Hzn30EdO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"266-nfBTwwZwOhe1cFlpOOAWCyGktLY\"",
		"mtime": "2026-08-10T08:18:08.879Z",
		"size": 614,
		"path": "../public/assets/pipeline-state-Hzn30EdO.js"
	},
	"/assets/printer-Cyl8QfRI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"134-HzB7V6CMDbgadVwc9ZqEAUOpF3U\"",
		"mtime": "2026-08-10T08:18:08.879Z",
		"size": 308,
		"path": "../public/assets/printer-Cyl8QfRI.js"
	},
	"/assets/progress-BPdMoobs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8ca-xjLlIlI+BXUK37NVZu2YUGrpPig\"",
		"mtime": "2026-08-10T08:18:08.885Z",
		"size": 2250,
		"path": "../public/assets/progress-BPdMoobs.js"
	},
	"/assets/quote-rAHAJhqB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a-UW9WMhbsmpvKv3VJEPIJbVMb9JY\"",
		"mtime": "2026-08-10T08:18:08.888Z",
		"size": 378,
		"path": "../public/assets/quote-rAHAJhqB.js"
	},
	"/assets/personas-BddvG1WQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d99-V201IhdaJHY2shK7+4YAKapHBGo\"",
		"mtime": "2026-08-10T08:18:08.865Z",
		"size": 7577,
		"path": "../public/assets/personas-BddvG1WQ.js"
	},
	"/assets/RadarChart-LGXdzKu8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"659e-A1asPi8blK8NhSPGULjE+QXYNuc\"",
		"mtime": "2026-08-10T08:18:08.074Z",
		"size": 26014,
		"path": "../public/assets/RadarChart-LGXdzKu8.js"
	},
	"/assets/recruiter-CeXDHQ_c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f18-PVPlUDLLRaPR1msiqMrOHTcXszk\"",
		"mtime": "2026-08-10T08:18:08.907Z",
		"size": 7960,
		"path": "../public/assets/recruiter-CeXDHQ_c.js"
	},
	"/assets/readiness-DpinMHpk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2774-fYUSxcK1mnZROHpTBGB+QyLAUM4\"",
		"mtime": "2026-08-10T08:18:08.891Z",
		"size": 10100,
		"path": "../public/assets/readiness-DpinMHpk.js"
	},
	"/assets/review-BoeF8puu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c2-Gx7a5bqaV4xkZtiWWx8w0sDs4Zk\"",
		"mtime": "2026-08-10T08:18:08.920Z",
		"size": 2498,
		"path": "../public/assets/review-BoeF8puu.js"
	},
	"/assets/reevaluate-DetrE_P8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b14-gRstXdKdLK0XQmpEqFrvUV11W+Q\"",
		"mtime": "2026-08-10T08:18:08.914Z",
		"size": 11028,
		"path": "../public/assets/reevaluate-DetrE_P8.js"
	},
	"/assets/roadmap-BbT0OGFW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad9-zO03ccHy4NlGfH3SnC+kIyQqus0\"",
		"mtime": "2026-08-10T08:18:08.929Z",
		"size": 2777,
		"path": "../public/assets/roadmap-BbT0OGFW.js"
	},
	"/assets/index-BKXA6G1x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"65e64-AsWX8REykUwlzFLlDX+nM/HU6ts\"",
		"mtime": "2026-08-10T08:18:07.587Z",
		"size": 417380,
		"path": "../public/assets/index-BKXA6G1x.js"
	},
	"/assets/routes-CGiAjgBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b38-sh5+BIRAZL6jdEYpxbSJTrKvFio\"",
		"mtime": "2026-08-10T08:18:08.934Z",
		"size": 6968,
		"path": "../public/assets/routes-CGiAjgBM.js"
	},
	"/assets/separator-D_idUFCF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34b-kOxW3CxyK1uKPAH9uVM5jFvWnz4\"",
		"mtime": "2026-08-10T08:18:08.990Z",
		"size": 843,
		"path": "../public/assets/separator-D_idUFCF.js"
	},
	"/assets/select-DIUGDm1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdc2-CHBz+FFQtFDrnZJpplacDHCMy9E\"",
		"mtime": "2026-08-10T08:18:08.942Z",
		"size": 48578,
		"path": "../public/assets/select-DIUGDm1K.js"
	},
	"/assets/skills-DtI2CG_C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a05-pJq5LdT2ZiOcmJoomAixKCRf+ig\"",
		"mtime": "2026-08-10T08:18:09.011Z",
		"size": 2565,
		"path": "../public/assets/skills-DtI2CG_C.js"
	},
	"/assets/session-BKJVZ78-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"501-hb10RJeOYw+qxToyYWrBtOpNgK8\"",
		"mtime": "2026-08-10T08:18:08.990Z",
		"size": 1281,
		"path": "../public/assets/session-BKJVZ78-.js"
	},
	"/assets/skill-evidence-CU9DoTf0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6b84-Efy+doTH60EGjCqcH3/fdbVHcos\"",
		"mtime": "2026-08-10T08:18:08.996Z",
		"size": 27524,
		"path": "../public/assets/skill-evidence-CU9DoTf0.js"
	},
	"/assets/shield-check-ts8_a_fh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"135-4WPjPdqgylvmit5NR+leb8bz8EA\"",
		"mtime": "2026-08-10T08:18:08.990Z",
		"size": 309,
		"path": "../public/assets/shield-check-ts8_a_fh.js"
	},
	"/assets/styles-C3o1ZuAG.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1576c-xO1QXc69koa35XVPSblU5sb+siU\"",
		"mtime": "2026-08-10T08:18:09.067Z",
		"size": 87916,
		"path": "../public/assets/styles-C3o1ZuAG.css"
	},
	"/assets/tabs-BW37koBt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4b-9AgO76oXcokpuEWAt2IQFugSLEk\"",
		"mtime": "2026-08-10T08:18:09.018Z",
		"size": 7499,
		"path": "../public/assets/tabs-BW37koBt.js"
	},
	"/assets/textarea-COWnFG7R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"201-C4YJjK0rq6JsVTC4nQtY7BhN7l8\"",
		"mtime": "2026-08-10T08:18:09.018Z",
		"size": 513,
		"path": "../public/assets/textarea-COWnFG7R.js"
	},
	"/assets/upload-vKjHUThF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20e6-z9F061TqkGQe8VdigSqQdKqpzKo\"",
		"mtime": "2026-08-10T08:18:09.024Z",
		"size": 8422,
		"path": "../public/assets/upload-vKjHUThF.js"
	},
	"/assets/utils-BMlKtODc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7840-UipbpZxss6SJiLjWvnrqGED1750\"",
		"mtime": "2026-08-10T08:18:09.039Z",
		"size": 30784,
		"path": "../public/assets/utils-BMlKtODc.js"
	},
	"/assets/x-BWfZwlXU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f-cVrkw89YhdtGMCB8D1WpxU72/24\"",
		"mtime": "2026-08-10T08:18:09.059Z",
		"size": 143,
		"path": "../public/assets/x-BWfZwlXU.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_IKSqbs = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IKSqbs
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
