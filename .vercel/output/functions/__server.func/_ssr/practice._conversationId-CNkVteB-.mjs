import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, X as require_react, b as Navigate, x as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as scenarioById, t as PARTNERS } from "./practice-BExs9OCN.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./wordmark-CqOyDSZT.mjs";
import { n as Skeleton, r as useCurrentUserState, t as AppHeader } from "./app-header-izwP3rzo.mjs";
import { i as sendMessage, n as getConversation } from "./conversations-LT_tc4PM.mjs";
import { n as Route$1 } from "./router-D6TP2Bni.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/practice._conversationId-CNkVteB-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[transform,opacity,background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg border border-border hover:border-border-strong hover:bg-elevated",
			subtle: "bg-elevated text-fg hover:bg-surface border border-border",
			her: "bg-her text-accent-fg hover:opacity-90",
			him: "bg-him text-accent-fg hover:opacity-90"
		},
		size: {
			sm: "h-10 px-3.5 text-sm rounded-[10px]",
			md: "h-11 px-5 text-sm rounded-md",
			lg: "h-12 px-6 text-base rounded-lg"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(({ className, variant, size, type = "button", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
	ref,
	type,
	className: cn(buttonVariants({
		variant,
		size
	}), className),
	...props
}));
Button.displayName = "Button";
var Textarea = (0, import_react.forwardRef)(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("min-h-12 w-full resize-none rounded-lg border border-border bg-elevated px-4 py-3 text-base text-fg placeholder:text-subtle shadow-none outline-none transition-[border-color,box-shadow] duration-150", "focus-visible:border-border-strong focus-visible:ring-2 focus-visible:ring-accent/50", className),
	...props
}));
Textarea.displayName = "Textarea";
function ConversationPage() {
	const { conversationId } = Route$1.useParams();
	const { user, isPending } = useCurrentUserState();
	const id = Number(conversationId);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl flex-1 px-5 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-40" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-24 w-2/3 rounded-xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "ml-auto mt-4 h-16 w-1/2 rounded-xl" })
			]
		})]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { next: `/practice/${conversationId}` }
	});
	if (!Number.isFinite(id) || id <= 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatRoom, { id });
}
function Missing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl italic",
					children: "That conversation is not here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: "It may be private to another account, or it never existed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					className: "mt-8 text-sm text-fg underline-offset-4 hover:underline",
					children: "Start a new practice"
				})
			]
		})]
	});
}
function ChatRoom({ id }) {
	const navigate = useNavigate();
	const [conv, setConv] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [loadError, setLoadError] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sendError, setSendError] = (0, import_react.useState)(null);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		getConversation({ data: { id } }).then((payload) => {
			if (!alive) return;
			if (!payload) {
				setLoadError("missing");
				return;
			}
			setConv(payload.conversation);
			setMessages(payload.messages);
		}).catch(() => {
			if (alive) setLoadError("failed");
		});
		return () => {
			alive = false;
		};
	}, [id]);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "end"
		});
	}, [messages, sending]);
	async function onSend() {
		const content = draft.trim();
		if (!content || sending || conv?.locked) return;
		setSending(true);
		setSendError(null);
		setDraft("");
		const optimistic = {
			id: -Date.now(),
			conversationId: id,
			role: "user",
			content,
			coachNote: null,
			emotion: null,
			flagged: false,
			createdAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		setMessages((prev) => [...prev, optimistic]);
		try {
			const result = await sendMessage({ data: {
				conversationId: id,
				content
			} });
			if (!result.ok) {
				setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
				setDraft(content);
				setSendError(result.error);
				setSending(false);
				return;
			}
			setMessages((prev) => [
				...prev.filter((m) => m.id !== optimistic.id),
				result.userMessage,
				result.assistantMessage
			]);
			setConv((c) => c ? {
				...c,
				locked: result.locked,
				flagged: result.flagKind !== "none" ? true : c.flagged,
				flagKind: result.flagKind === "none" ? c.flagKind : result.flagKind
			} : c);
		} catch {
			setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
			setDraft(content);
			setSendError("The reply did not come through. Try once more.");
		}
		setSending(false);
	}
	if (loadError === "missing") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Missing, {});
	if (loadError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto flex max-w-lg flex-1 flex-col justify-center px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Could not open this conversation."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 min-h-11 text-left text-sm underline-offset-4 hover:underline",
				onClick: () => void navigate({ to: "/practice" }),
				children: "Back to practice"
			})]
		})]
	});
	if (!conv) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-3xl flex-1 px-5 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-8 w-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-8 h-24 w-2/3 rounded-xl" })]
		})]
	});
	const mode = conv.mode;
	const partner = PARTNERS[mode];
	const scenario = scenarioById(conv.scenarioId);
	const crisis = conv.flagKind === "crisis" || conv.flagKind === "age";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-svh min-h-svh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-3xl items-end justify-between gap-4 px-5 pb-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("text-xs tracking-[0.18em] uppercase", mode === "her" ? "text-her" : "text-him"),
						children: partner.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "truncate font-display text-2xl italic tracking-tight",
						children: scenario?.title ?? conv.title
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/practice",
					search: { mode },
					className: "inline-flex h-11 shrink-0 items-center text-sm text-muted hover:text-fg",
					children: "New scene"
				})]
			}),
			conv.flagged ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto w-full max-w-3xl px-5 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-lg border border-care/40 bg-elevated px-4 py-3 text-sm text-care",
					children: crisis ? "This practice is paused. Kindred stepped out of the scene to keep you safe. Your words stay private." : "Kindred marked a care flag on this conversation. The partner will stay gentle. You can continue when you are ready, or start a new scene."
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-5",
					children: [messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageBubble, {
						message: m,
						mode,
						partnerName: partner.name
					}, m.id)), sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typing, {
						mode,
						name: partner.name
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: endRef,
					className: "h-4"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mx-auto w-full max-w-3xl px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-6",
				onSubmit: (e) => {
					e.preventDefault();
					onSend();
				},
				children: [
					sendError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm text-danger",
						children: sendError
					}) : null,
					conv.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-surface px-4 py-4 text-sm text-muted",
						children: [
							"This scene is closed.",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/practice",
								search: { mode },
								className: "text-fg underline-offset-4 hover:underline",
								children: "Start a new conversation"
							}),
							" ",
							"when you want to practice again."
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-3 rounded-xl border border-border bg-surface p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									onSend();
								}
							},
							placeholder: `Talk to ${partner.name}…`,
							rows: 1,
							maxLength: 1500,
							className: "max-h-36 min-h-12 border-0 bg-transparent py-3 focus-visible:ring-0",
							disabled: sending
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "md",
							disabled: sending || !draft.trim(),
							className: "mb-0.5 shrink-0",
							children: "Send"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 px-1 text-xs text-subtle",
						children: "Private to you. If things get heavy, Kindred will pause the scene and flag it for care."
					})
				]
			})
		]
	});
}
function MessageBubble({ message, mode, partnerName }) {
	const mine = message.role === "user";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: cn("flex flex-col", mine ? "items-end" : "items-start"),
		children: [
			!mine ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mb-1.5 text-xs tracking-[0.14em] uppercase", mode === "her" ? "text-her" : "text-him"),
				children: partnerName
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1.5 text-xs tracking-[0.14em] text-subtle uppercase",
				children: "You"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("max-w-lg whitespace-pre-wrap rounded-xl px-4 py-3 text-base leading-relaxed", mine ? "rounded-br-sm bg-accent text-accent-fg" : "rounded-bl-sm border border-border bg-elevated text-fg"),
				children: message.content
			}),
			!mine && message.coachNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-lg text-sm italic text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "not-italic tracking-[0.14em] text-subtle uppercase",
					children: "Coach — "
				}), message.coachNote]
			}) : null
		]
	});
}
function Typing({ mode, name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-col items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mb-1.5 text-xs tracking-[0.14em] uppercase", mode === "her" ? "text-her" : "text-him"),
			children: name
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-11 items-center gap-1.5 rounded-xl rounded-bl-sm border border-border bg-elevated px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1.5 rounded-full bg-muted",
					style: { animation: "pulse-dot 1s infinite" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1.5 rounded-full bg-muted",
					style: { animation: "pulse-dot 1s infinite 0.15s" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "size-1.5 rounded-full bg-muted",
					style: { animation: "pulse-dot 1s infinite 0.3s" }
				})
			]
		})]
	});
}
//#endregion
export { ConversationPage as component };
