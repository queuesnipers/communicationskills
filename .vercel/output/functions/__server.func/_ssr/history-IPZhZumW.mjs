import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, b as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Skeleton, r as useCurrentUserState, t as AppHeader } from "./app-header-izwP3rzo.mjs";
import { r as listConversations } from "./conversations-LT_tc4PM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-IPZhZumW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HistoryPage() {
	const { user, isPending } = useCurrentUserState();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-56" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-16 w-full" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-3 h-16 w-full" })
			]
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { next: "/history" }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList, {});
}
function HistoryList() {
	const [rows, setRows] = (0, import_react.useState)(null);
	const [failed, setFailed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		listConversations().then((data) => {
			if (alive) setRows(data);
		}).catch(() => {
			if (alive) setFailed(true);
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl flex-1 px-5 pb-16 pt-6 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-muted uppercase",
					children: "Only you can see these"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl italic tracking-tight sm:text-5xl",
					children: "Your conversations"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-lg text-muted",
					children: "Every practice is saved privately to your account. Open one to continue, or start a new scene."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					className: "mt-6 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-accent-fg",
					children: "New practice"
				}),
				failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-danger",
					children: "Could not load your conversations."
				}) : null,
				rows === null && !failed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 w-full" })]
				}) : null,
				rows && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-12 text-muted",
					children: "No conversations yet. Pick a path and start talking."
				}) : null,
				rows && rows.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-10 divide-y divide-border border-t border-border",
					children: rows.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/practice/$conversationId",
						params: { conversationId: String(c.id) },
						className: "flex min-h-11 items-center justify-between gap-4 py-4 no-underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-fg",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs tracking-[0.14em] text-subtle uppercase",
								children: ["with ", c.partnerName]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs text-muted",
							children: c.locked ? "Paused" : c.flagged ? "Care flag" : "Open"
						})]
					}) }, c.id))
				}) : null
			]
		})]
	});
}
//#endregion
export { HistoryPage as component };
