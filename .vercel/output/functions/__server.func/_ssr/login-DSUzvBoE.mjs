import { C as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-1vAx-gM_.mjs";
import { r as safeNextPath } from "./practice-BExs9OCN.mjs";
import { t as GROK_PROVIDERS } from "./server-EZPVj049.mjs";
import { t as Wordmark } from "./wordmark-CqOyDSZT.mjs";
import { i as Route$3 } from "./router-D6TP2Bni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DSUzvBoE.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { next } = Route$3.useSearch();
	const callbackURL = safeNextPath(next);
	const returningToPractice = callbackURL.startsWith("/practice");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "px-5 py-4 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.22em] text-muted uppercase",
					children: "Private practice"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl italic tracking-tight text-fg sm:text-5xl",
					children: "Sign in to keep this yours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-md text-muted",
					children: returningToPractice ? "After you sign in, you will come back to the room you chose. Conversations stay on your account only." : "Conversations are stored privately on your account. Nobody else can open them."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex flex-col gap-3",
					children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => signIn(p.providerId, { callbackURL }),
						className: "flex h-12 w-full items-center justify-center rounded-lg border border-border bg-elevated text-sm font-medium text-fg transition-[border-color,background-color,transform] duration-150 hover:border-border-strong hover:bg-surface active:scale-[0.96]",
						children: ["Continue with ", p.label]
					}, p.providerId))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-sm text-subtle",
					children: "By continuing you agree this is an adult communication practice, not a dating service and not therapy."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex h-11 items-center text-sm text-muted underline-offset-4 transition-colors hover:text-fg hover:underline",
					children: "Back to Kindred"
				})
			]
		})]
	});
}
//#endregion
export { Login as component };
