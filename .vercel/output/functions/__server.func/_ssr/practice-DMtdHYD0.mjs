import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as SCENARIOS, t as PARTNERS } from "./practice-BExs9OCN.mjs";
import { n as cn } from "./wordmark-CqOyDSZT.mjs";
import { n as Skeleton, r as useCurrentUserState, t as AppHeader } from "./app-header-izwP3rzo.mjs";
import { r as listConversations, t as createConversation } from "./conversations-LT_tc4PM.mjs";
import { r as Route$2 } from "./router-D6TP2Bni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice-DMtdHYD0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PracticePage() {
	const { user, isPending } = useCurrentUserState();
	const { mode, scenario } = Route$2.useSearch();
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-5xl px-5 py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-10 w-48" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-6 h-24 w-full max-w-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-3 sm:grid-cols-2",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-36 rounded-xl" }, i))
				})
			]
		})]
	});
	if (!user) {
		const next = mode ? `/practice?mode=${mode}${scenario ? `&scenario=${encodeURIComponent(scenario)}` : ""}` : "/practice";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/login",
			search: { next }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PracticePicker, {
		mode,
		presetScenario: scenario
	});
}
function PracticePicker({ mode: initialMode, presetScenario }) {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)(initialMode);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [recent, setRecent] = (0, import_react.useState)(null);
	const autoStarted = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setMode(initialMode);
	}, [initialMode]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		listConversations().then((rows) => {
			if (alive) setRecent(rows);
		}).catch(() => {
			if (alive) setRecent([]);
		});
		return () => {
			alive = false;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mode || !presetScenario || autoStarted.current) return;
		if (!SCENARIOS.some((s) => s.id === presetScenario)) return;
		autoStarted.current = true;
		start(presetScenario);
	}, [mode, presetScenario]);
	async function start(scenarioId) {
		if (!mode || busy) return;
		setBusy(true);
		setError(null);
		try {
			const { id } = await createConversation({ data: {
				mode,
				scenarioId
			} });
			await navigate({
				to: "/practice/$conversationId",
				params: { conversationId: String(id) }
			});
		} catch {
			setError("Could not start the conversation. Try signing in again.");
			setBusy(false);
			autoStarted.current = false;
		}
	}
	const partner = mode ? PARTNERS[mode] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-16 pt-4 sm:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-muted uppercase",
					children: "Choose a path"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl italic tracking-tight sm:text-5xl",
					children: "Who are you practicing with?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-muted",
					children: "Two rooms. Same skills. Pick the counterpart you want to talk to."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {
						active: mode === "her",
						label: "Her",
						name: PARTNERS.her.name,
						hint: "Practice as a man",
						onClick: () => setMode("her"),
						tint: "her"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeToggle, {
						active: mode === "him",
						label: "Him",
						name: PARTNERS.him.name,
						hint: "Practice as a woman",
						onClick: () => setMode("him"),
						tint: "him"
					})]
				}),
				partner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-10 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: partner.name
							}),
							", ",
							partner.age,
							". ",
							partner.blurb
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-8 font-display text-2xl italic tracking-tight",
						children: "Pick a scene"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-3 sm:grid-cols-2",
						children: SCENARIOS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void start(s.id),
							className: "flex min-h-32 flex-col items-start rounded-xl border border-border bg-surface p-5 text-left transition-[border-color,background-color,transform] duration-150 hover:border-border-strong hover:bg-elevated active:scale-[0.99] disabled:opacity-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-xl italic tracking-tight text-fg",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-2 text-sm text-muted",
								children: s.lede
							})]
						}, s.id))
					})
				] }) : null,
				recent && recent.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-14 border-t border-border pt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl italic tracking-tight",
							children: "Continue privately"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/history",
							className: "text-sm text-muted hover:text-fg",
							children: "All conversations"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-border",
						children: recent.slice(0, 5).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/practice/$conversationId",
							params: { conversationId: String(c.id) },
							className: "flex items-center justify-between gap-4 py-3.5 text-sm no-underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: c.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 text-subtle",
								children: c.locked ? "Paused" : c.flagged ? "Care" : "Open"
							})]
						}) }, c.id))
					})]
				}) : null
			]
		})]
	});
}
function ModeToggle({ active, label, name, hint, onClick, tint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("rounded-xl border px-5 py-5 text-left transition-[border-color,background-color] duration-150", active ? "border-border-strong bg-elevated" : "border-border bg-surface hover:border-border-strong"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs tracking-[0.18em] uppercase", tint === "her" ? "text-her" : "text-him"),
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl italic tracking-tight",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: name
			})
		]
	});
}
//#endregion
export { PracticePage as component };
