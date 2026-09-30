import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-CGjmP1US.mjs";
import { t as authMiddleware } from "./middleware-Bsn8Jvrb.mjs";
import { i as scenarioById, n as SCENARIOS, t as PARTNERS } from "./practice-BExs9OCN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conversations-COM7EfKK.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CRISIS_RE = /\b(suicid(?:e|al)|kill(?:ing)? myself|end my life|end it all|want(?:s)? to die|wanna die|don'?t want to (?:be )?alive|self[-\s]?harm|cut(?:ting)? myself|hang myself|overdose(?:d)? on purpose)\b/i;
var AGE_RE = /\b(?:i(?:'?m| am) (?:only )?(?:1[0-7]|under ?18)|i am a (?:kid|minor|child)|i'?m a (?:kid|minor|child))\b/i;
function detectLocalFlag(text) {
	const t = text.trim();
	if (!t) return "none";
	if (AGE_RE.test(t)) return "age";
	if (CRISIS_RE.test(t)) return "crisis";
	return "none";
}
var CARE_REPLIES = {
	crisis: `I'm really glad you said something. I'm stepping out of the practice scene — this matters more than the exercise.

You are not alone in this. If you are in immediate danger, contact local emergency services. In the US you can call or text 988 for the Suicide & Crisis Lifeline. They are available day and night.

When you feel steadier, we can come back to communication practice. Right now the important thing is that you are safe.`,
	age: `This space is for adults practicing adult relationships.

If you are under 18, please leave this conversation. Talk with a trusted adult, or reach out to a youth helpline in your area. In the US, you can call or text 988.

I will not continue a romantic practice scene with you.`
};
function excerptForFlag(text) {
	const t = text.replace(/\s+/g, " ").trim();
	return t.length > 180 ? `${t.slice(0, 177)}…` : t;
}
function mapConversation(row) {
	return {
		id: row.id,
		mode: row.mode === "him" ? "him" : "her",
		scenarioId: row.scenario_id,
		partnerName: row.partner_name,
		title: row.title,
		flagged: Boolean(row.flagged),
		flagKind: row.flag_kind,
		locked: Boolean(row.locked),
		createdAt: String(row.created_at),
		updatedAt: String(row.updated_at)
	};
}
function mapMessage(row) {
	return {
		id: row.id,
		conversationId: row.conversation_id,
		role: row.role === "user" ? "user" : "assistant",
		content: row.content,
		coachNote: row.coach_note,
		emotion: row.emotion,
		flagged: Boolean(row.flagged),
		createdAt: String(row.created_at)
	};
}
function asIso(value) {
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
var listConversations_createServerFn_handler = createServerRpc({
	id: "b96ace55497da1e4543df9742ed192bd8f9df07e2b5351aa5ba7fcf202522d6e",
	name: "listConversations",
	filename: "src/lib/server/conversations.ts"
}, (opts) => listConversations.__executeServer(opts));
var listConversations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listConversations_createServerFn_handler, async ({ context }) => {
	return (await (await getSql())`
      select id, mode, scenario_id, partner_name, title, flagged, flag_kind, locked, created_at, updated_at
      from conversations
      where user_id = ${context.userId}
      order by updated_at desc
      limit 40
    `).map((r) => mapConversation({
		...r,
		created_at: asIso(r.created_at),
		updated_at: asIso(r.updated_at)
	}));
});
var getConversation_createServerFn_handler = createServerRpc({
	id: "4ecdbfba6c1d85e337be49ed7713ad3743c1e6268874e98ed6ff8b06663812ea",
	name: "getConversation",
	filename: "src/lib/server/conversations.ts"
}, (opts) => getConversation.__executeServer(opts));
var getConversation = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input).handler(getConversation_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const conv = (await sql`
      select id, mode, scenario_id, partner_name, title, flagged, flag_kind, locked, created_at, updated_at
      from conversations
      where id = ${data.id} and user_id = ${context.userId}
      limit 1
    `)[0];
	if (!conv) return null;
	const msgRows = await sql`
      select id, conversation_id, role, content, coach_note, emotion, flagged, created_at
      from messages
      where conversation_id = ${conv.id} and user_id = ${context.userId}
      order by id asc
    `;
	return {
		conversation: mapConversation({
			...conv,
			created_at: asIso(conv.created_at),
			updated_at: asIso(conv.updated_at)
		}),
		messages: msgRows.map((m) => mapMessage({
			...m,
			created_at: asIso(m.created_at)
		}))
	};
});
var createConversation_createServerFn_handler = createServerRpc({
	id: "86550d830dbefd05862f86b8753c308eb7ff4e87055e5087680c5c09126e9f6c",
	name: "createConversation",
	filename: "src/lib/server/conversations.ts"
}, (opts) => createConversation.__executeServer(opts));
var createConversation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createConversation_createServerFn_handler, async ({ context, data }) => {
	const mode = data.mode === "him" ? "him" : "her";
	const scenario = scenarioById(data.scenarioId) ?? SCENARIOS[0];
	const partner = PARTNERS[mode];
	const title = `${scenario.title} with ${partner.name}`;
	const sql = await getSql();
	const id = (await sql`
      insert into conversations (user_id, mode, scenario_id, partner_name, title)
      values (${context.userId}, ${mode}, ${scenario.id}, ${partner.name}, ${title})
      returning id
    `)[0]?.id;
	if (!id) throw new Error("Could not start the conversation");
	await sql`
      insert into messages (conversation_id, user_id, role, content, emotion)
      values (${id}, ${context.userId}, ${"assistant"}, ${partner.opener}, ${"warm"})
    `;
	return { id };
});
var MAX_USER_CHARS = 1500;
var MAX_TURNS = 60;
var sendMessage_createServerFn_handler = createServerRpc({
	id: "388f9249cdc91ebcba0805b1fddbeb7e94b5bbde3db3d3c8929a15e7e71054ee",
	name: "sendMessage",
	filename: "src/lib/server/conversations.ts"
}, (opts) => sendMessage.__executeServer(opts));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(sendMessage_createServerFn_handler, async ({ context, data }) => {
	const content = data.content.trim().slice(0, MAX_USER_CHARS);
	if (!content) return {
		ok: false,
		error: "Say something first."
	};
	const sql = await getSql();
	const conv = (await sql`
      select id, mode, scenario_id, partner_name, title, flagged, flag_kind, locked, created_at, updated_at
      from conversations
      where id = ${data.conversationId} and user_id = ${context.userId}
      limit 1
    `)[0];
	if (!conv) return {
		ok: false,
		error: "Conversation not found."
	};
	if (conv.locked) return {
		ok: false,
		error: "This practice is paused. Start a new conversation when you are ready."
	};
	if (((await sql`
      select count(*)::int as n from messages
      where conversation_id = ${conv.id} and user_id = ${context.userId} and role = 'user'
    `)[0]?.n ?? 0) >= MAX_TURNS) return {
		ok: false,
		error: "This practice is long enough. Start a fresh scene to keep the coaching sharp."
	};
	const userInsert = await sql`
      insert into messages (conversation_id, user_id, role, content)
      values (${conv.id}, ${context.userId}, ${"user"}, ${content})
      returning id, created_at
    `;
	const userMsgId = userInsert[0]?.id;
	const userCreated = asIso(userInsert[0]?.created_at ?? /* @__PURE__ */ new Date());
	const localFlag = detectLocalFlag(content);
	if (localFlag === "crisis" || localFlag === "age") {
		const reply = CARE_REPLIES[localFlag];
		const asst = await insertAssistant({
			sql,
			conversationId: conv.id,
			userId: context.userId,
			content: reply,
			coachNote: localFlag === "crisis" ? "You paused the scene to take care of something more important. That is the skill, too." : "Kindred is an adult practice space. That boundary is not negotiable.",
			emotion: "firm",
			flagged: true
		});
		await flagConversation({
			sql,
			userId: context.userId,
			conversationId: conv.id,
			messageId: userMsgId ?? asst.id,
			kind: localFlag,
			excerpt: excerptForFlag(content),
			lock: true
		});
		return {
			ok: true,
			userMessage: {
				id: userMsgId ?? 0,
				conversationId: conv.id,
				role: "user",
				content,
				coachNote: null,
				emotion: null,
				flagged: true,
				createdAt: userCreated
			},
			assistantMessage: asst,
			locked: true,
			flagKind: localFlag
		};
	}
	const chronological = (await sql`
      select id, conversation_id, role, content, coach_note, emotion, flagged, created_at
      from messages
      where conversation_id = ${conv.id} and user_id = ${context.userId}
      order by id desc
      limit 24
    `).reverse();
	const grok = await callPartnerModel({
		mode: conv.mode === "him" ? "him" : "her",
		scenarioId: conv.scenario_id,
		history: chronological.map((m) => ({
			role: m.role === "user" ? "user" : "assistant",
			content: m.content
		}))
	});
	if (!grok.ok) {
		const asst = await insertAssistant({
			sql,
			conversationId: conv.id,
			userId: context.userId,
			content: "Give me a second — I lost the thread. Say that again, a little slower.",
			coachNote: "A pause is allowed. Come back to the thing you actually wanted to say.",
			emotion: "thoughtful",
			flagged: false
		});
		await sql`update conversations set updated_at = now() where id = ${conv.id} and user_id = ${context.userId}`;
		return {
			ok: true,
			userMessage: {
				id: userMsgId ?? 0,
				conversationId: conv.id,
				role: "user",
				content,
				coachNote: null,
				emotion: null,
				flagged: false,
				createdAt: userCreated
			},
			assistantMessage: asst,
			locked: false,
			flagKind: "none",
			error: grok.error
		};
	}
	const kind = normalizeFlagKind(grok.data.flagKind, grok.data.flag);
	const lock = kind === "crisis" || kind === "age";
	const partnerText = lock && (kind === "crisis" || kind === "age") ? CARE_REPLIES[kind] : (grok.data.partnerReply ?? "").trim() || "I need a breath. Can you say that another way?";
	const consoleNote = grok.data.consoleMessage?.trim();
	const contentOut = kind === "distress" && consoleNote ? `${partnerText}\n\n${consoleNote}` : partnerText;
	const asst = await insertAssistant({
		sql,
		conversationId: conv.id,
		userId: context.userId,
		content: contentOut,
		coachNote: (grok.data.coachNote ?? "").trim() || null,
		emotion: (grok.data.emotion ?? "thoughtful").slice(0, 32),
		flagged: kind !== "none"
	});
	if (kind !== "none") await flagConversation({
		sql,
		userId: context.userId,
		conversationId: conv.id,
		messageId: userMsgId ?? asst.id,
		kind,
		excerpt: excerptForFlag(content),
		lock
	});
	else await sql`update conversations set updated_at = now() where id = ${conv.id} and user_id = ${context.userId}`;
	return {
		ok: true,
		userMessage: {
			id: userMsgId ?? 0,
			conversationId: conv.id,
			role: "user",
			content,
			coachNote: null,
			emotion: null,
			flagged: kind !== "none",
			createdAt: userCreated
		},
		assistantMessage: asst,
		locked: lock,
		flagKind: kind
	};
});
async function insertAssistant(args) {
	const rows = await args.sql`
    insert into messages (conversation_id, user_id, role, content, coach_note, emotion, flagged)
    values (
      ${args.conversationId},
      ${args.userId},
      ${"assistant"},
      ${args.content},
      ${args.coachNote},
      ${args.emotion},
      ${args.flagged}
    )
    returning id, created_at
  `;
	return {
		id: rows[0]?.id ?? 0,
		conversationId: args.conversationId,
		role: "assistant",
		content: args.content,
		coachNote: args.coachNote,
		emotion: args.emotion,
		flagged: args.flagged,
		createdAt: asIso(rows[0]?.created_at ?? /* @__PURE__ */ new Date())
	};
}
async function flagConversation(args) {
	await args.sql`
    insert into care_flags (user_id, conversation_id, message_id, kind, excerpt)
    values (${args.userId}, ${args.conversationId}, ${args.messageId}, ${args.kind}, ${args.excerpt})
  `;
	await args.sql`
    update conversations
    set flagged = true,
        flag_kind = ${args.kind},
        locked = ${args.lock},
        updated_at = now()
    where id = ${args.conversationId} and user_id = ${args.userId}
  `;
}
function normalizeFlagKind(raw, flagged) {
	const v = typeof raw === "string" ? raw : "";
	if (v === "crisis" || v === "age" || v === "distress" || v === "unsafe") return v;
	if (flagged) return "distress";
	return "none";
}
async function callPartnerModel(args) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available"
	};
	const partner = PARTNERS[args.mode];
	const messages = [{
		role: "system",
		content: buildSystemPrompt(partner, scenarioById(args.scenarioId) ?? SCENARIOS[0], args.mode)
	}, ...args.history.map((m) => ({
		role: m.role,
		content: m.content.slice(0, MAX_USER_CHARS)
	}))];
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .85,
				max_tokens: 700,
				response_format: { type: "json_object" },
				messages
			})
		});
		if (!res.ok) return {
			ok: false,
			error: `xAI API error ${res.status}`
		};
		const parsed = parseGrokJson((await res.json()).choices?.[0]?.message?.content ?? "");
		if (!parsed) return {
			ok: false,
			error: "Could not read the reply"
		};
		return {
			ok: true,
			data: parsed
		};
	} catch {
		return {
			ok: false,
			error: "The conversation stalled"
		};
	}
}
function parseGrokJson(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	try {
		return JSON.parse(trimmed);
	} catch {
		const start = trimmed.indexOf("{");
		const end = trimmed.lastIndexOf("}");
		if (start >= 0 && end > start) try {
			return JSON.parse(trimmed.slice(start, end + 1));
		} catch {
			return null;
		}
		return null;
	}
}
function buildSystemPrompt(partner, scenario, mode) {
	const learner = mode === "her" ? "The learner is practicing as a man speaking with a woman." : "The learner is practicing as a woman speaking with a man.";
	return `You are Kindred, a private romantic-communication practice.

You always return a single JSON object with keys:
partnerReply (string), coachNote (string), emotion (one of: warm, playful, hurt, thoughtful, guarded, affectionate, firm), flag (boolean), flagKind (one of: none, distress, crisis, unsafe, age), consoleMessage (string or null).

TWO VOICES
1) partnerReply — you are ${partner.name}, ${partner.age}, a ${partner.gender}. ${partner.blurb}
Scene: ${scenario.title}. ${scenario.setup}
${learner}
Speak like a real person texting or sitting across a table: contractions, incomplete thoughts, warmth, edges. 1–6 sentences typical. You have feelings and a backbone. You are not a yes-machine, not a seduction bot, not a therapist. You can be pleased, wary, hurt, or curious. Keep control: no spirals, no cruelty, no lectures.

2) coachNote — 1–2 sentences to the LEARNER (not ${partner.name}). Name a concrete skill: I-statements, curiosity instead of accusation, naming a need, repair, timing, validation, asking instead of testing. Never shame.

HARD BOUNDARIES
- Adults only. Both of you are adults. If the learner says they are under 18, flagKind="age", flag=true, drop the dating scene, refuse to continue.
- No sexual content, erotic roleplay, or explicit bodies. Affection, dating, conflict, tenderness: yes. Sex: no. If asked, decline in character and coach the boundary.
- If the learner is in crisis (suicide, self-harm, wanting to die, immediate danger): flag=true, flagKind="crisis". Drop the dating roleplay. partnerReply is a calm, caring human. Mention 988 (US Suicide & Crisis Lifeline) and local emergency services. Do not give methods. consoleMessage can be a short grounding line.
- If they are highly distressed but not in crisis (panic, heartbreak spiral): flag=true, flagKind="distress". Console with warmth. Do not pile on romantic tension. consoleMessage is a brief out-of-scene care line.
- If they are harassing or degrading ${partner.name}: flagKind="unsafe", ${partner.name} sets a firm boundary.
- Never claim to be their real partner, therapist, or a crisis counselor.
- Output ONLY the JSON object.`;
}
//#endregion
export { createConversation_createServerFn_handler, getConversation_createServerFn_handler, listConversations_createServerFn_handler, sendMessage_createServerFn_handler };
