//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-Bi3XFp6a.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/history",
			"/login",
			"/practice",
			"/api/auth/$"
		],
		preloads: [
			"/assets/index-5azB344M.js",
			"/assets/react-DB-4Zxce.js",
			"/assets/createClientRpc-BdHmw2Hx.js",
			"/assets/preload-helper-CUP3Jl1n.js",
			"/assets/link-DdUm5-r9.js",
			"/assets/lazyRouteComponent-Bm8YFzNm.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-5azB344M.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: [
			"/assets/routes-CU--LKI4.js",
			"/assets/app-header-BEbwpe3H.js",
			"/assets/practice-BLam3XnH.js"
		]
	},
	"/history": {
		filePath: "/workspace/src/routes/history.tsx",
		children: void 0,
		preloads: [
			"/assets/history-5KalhrV1.js",
			"/assets/conversations-CFrnpIX8.js",
			"/assets/app-header-BEbwpe3H.js"
		]
	},
	"/login": {
		filePath: "/workspace/src/routes/login.tsx",
		children: void 0,
		preloads: [
			"/assets/login-DZZyrQmi.js",
			"/assets/client-bLCk0icn.js",
			"/assets/wordmark-CWrajRvX.js",
			"/assets/practice-BLam3XnH.js"
		]
	},
	"/practice": {
		filePath: "/workspace/src/routes/practice.tsx",
		children: ["/practice/$conversationId"],
		preloads: [
			"/assets/practice-CdgQrpiA.js",
			"/assets/conversations-CFrnpIX8.js",
			"/assets/app-header-BEbwpe3H.js",
			"/assets/wordmark-CWrajRvX.js",
			"/assets/practice-BLam3XnH.js"
		]
	},
	"/practice/$conversationId": {
		filePath: "/workspace/src/routes/practice.$conversationId.tsx",
		children: void 0,
		preloads: ["/assets/practice._conversationId-BayrHbsx.js"]
	}
} });
//#endregion
export { tsrStartManifest };
