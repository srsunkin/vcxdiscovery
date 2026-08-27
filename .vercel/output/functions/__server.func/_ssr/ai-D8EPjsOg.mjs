import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-D8EPjsOg.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var assistDeal_createServerFn_handler = createServerRpc({
	id: "68dd462549e8c2e4da03ad33191368701999b91fb87b5dde3567a1f558028f87",
	name: "assistDeal",
	filename: "src/lib/ai.ts"
}, (opts) => assistDeal.__executeServer(opts));
var assistDeal = createServerFn({ method: "POST" }).validator((input) => input).handler(assistDeal_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	const system = data.mode === "brief" ? "You are a senior industrial X-ray/CT applications engineer. Rewrite the discovery capture into a tight internal brief: situation, application, recommended direction, risks, and next action. Be concrete. No fluff. Use short labeled sections. Do not invent specs that are not in the capture. Do not assume a specific salesperson or region." : "You are a senior industrial X-ray/CT sales engineer at VisiConsult. Given this discovery capture, list the 6–10 highest-leverage questions still unasked. Group by technical / commercial / risk. One line each. Do not invent facts.";
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			max_tokens: 700,
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: data.summary.slice(0, 6e3)
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: `xAI API error ${res.status}`
	};
	return {
		ok: true,
		text: (await res.json()).choices[0]?.message.content ?? ""
	};
});
//#endregion
export { assistDeal_createServerFn_handler };
