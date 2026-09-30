import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Bsn8Jvrb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conversations-LT_tc4PM.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listConversations = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("b96ace55497da1e4543df9742ed192bd8f9df07e2b5351aa5ba7fcf202522d6e"));
var getConversation = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("4ecdbfba6c1d85e337be49ed7713ad3743c1e6268874e98ed6ff8b06663812ea"));
var createConversation = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("86550d830dbefd05862f86b8753c308eb7ff4e87055e5087680c5c09126e9f6c"));
var sendMessage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => input).handler(createSsrRpc("388f9249cdc91ebcba0805b1fddbeb7e94b5bbde3db3d3c8929a15e7e71054ee"));
//#endregion
export { sendMessage as i, getConversation as n, listConversations as r, createConversation as t };
