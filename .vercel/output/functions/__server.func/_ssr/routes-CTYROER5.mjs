import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as PARTNERS } from "./practice-BExs9OCN.mjs";
import { t as AppHeader } from "./app-header-izwP3rzo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CTYROER5.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 pb-16 pt-6 sm:px-8 sm:pt-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "stagger-in max-w-3xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.22em] text-muted uppercase",
							children: "Romantic communication, practiced"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-5xl italic leading-tight tracking-tight text-fg sm:text-6xl lg:text-7xl",
							children: [
								"Say the hard thing.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Keep the connection."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base text-muted sm:text-lg",
							children: "Kindred is a private room to practice talking with someone you care about — first dates, feelings, fights, boundaries. A partner answers like a person. A coach tells you why it landed."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 grid gap-4 md:grid-cols-2 md:gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						mode: "her",
						kicker: "For men",
						title: "Practice with her",
						partner: PARTNERS.her.name,
						blurb: PARTNERS.her.blurb
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeCard, {
						mode: "him",
						kicker: "For women",
						title: "Practice with him",
						partner: PARTNERS.him.name,
						blurb: PARTNERS.him.blurb
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 grid gap-8 border-t border-border pt-10 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: "01",
							title: "Pick a scene",
							body: "A first date. A repair. A boundary. Situations people actually freeze in."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: "02",
							title: "Talk like you",
							body: "No scripts. The partner answers with feeling — and with a spine."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
							n: "03",
							title: "Stay private",
							body: "Sign in. Every conversation is stored for you alone. Nobody else can read it."
						})
					]
				})
			]
		})]
	});
}
function ModeCard({ mode, kicker, title, partner, blurb }) {
	const tint = mode === "her" ? "her" : "him";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/practice",
		search: { mode },
		className: "group relative flex min-h-72 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 no-underline transition-[border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-border-strong sm:p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: tint === "her" ? "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_0%_100%,color-mix(in_oklab,var(--color-her)_18%,transparent),transparent_70%)] opacity-70" : "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_100%,color-mix(in_oklab,var(--color-him)_18%,transparent),transparent_70%)] opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs tracking-[0.18em] uppercase ${tint === "her" ? "text-her" : "text-him"}`,
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-4xl italic tracking-tight text-fg sm:text-5xl",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted",
						children: ["with ", partner]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "relative mt-8 max-w-md text-sm leading-relaxed text-muted",
				children: blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative mt-6 inline-flex h-11 items-center text-sm font-medium text-fg",
				children: ["Choose this path", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 inline-block transition-transform duration-150 group-hover:translate-x-1",
					children: "→"
				})]
			})
		]
	});
}
function Step({ n, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-sm italic text-subtle",
			children: n
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-2 font-display text-2xl italic tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: body
		})
	] });
}
//#endregion
export { Home as component };
