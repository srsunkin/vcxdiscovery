import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as copyText, _ as displayOwner, c as Button, f as useDealStore, g as displayOrg, l as computeProgress, p as v, r as PageHeader, v as loadProfile, w as cn } from "./router-fudB7XKc.mjs";
import { t as Textarea } from "./textarea-BfHpwHsU.mjs";
import { n as CardContent, t as Card } from "./card-CbtnwBn7.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as topRoute } from "./routing-BtOsCza6.mjs";
import { t as buildHandoff } from "./summary-CwKvbJ3b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/outputs-Ba2eLUDf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function n(s, fallback) {
	return s.trim() ? s.trim() : fallback;
}
function owner() {
	return displayOwner(loadProfile(), v("sales_owner"));
}
function org() {
	return displayOrg(loadProfile());
}
function sign() {
	const o = org();
	return `${owner()}\n${o}`;
}
function routeName() {
	return topRoute()?.system.name ?? "[direction]";
}
function missingBullets() {
	const m = computeProgress().missing.map((x) => `• ${x.label}`);
	return m.length ? m.join("\n") : "• No obvious missing critical fields.";
}
var EMAIL_META = [
	{
		key: "intro",
		label: "Pre-call intro"
	},
	{
		key: "followup",
		label: "Follow-up"
	},
	{
		key: "missing",
		label: "Missing inputs"
	},
	{
		key: "sample",
		label: "Sample / study"
	},
	{
		key: "quote",
		label: "Quote next steps"
	},
	{
		key: "procurement",
		label: "Procurement"
	},
	{
		key: "proposal",
		label: "Proposal cover"
	},
	{
		key: "cadence",
		label: "Check-in"
	},
	{
		key: "breakup",
		label: "Close the loop"
	}
];
function buildEmail(key) {
	const name = n(v("contact_name"), "[Name]");
	const company = n(v("customer"), "[Company]");
	const project = n(v("project_name"), "the X-ray / CT inspection project");
	const pain = n(v("disc_pain"), "[pain point]");
	const part = n(v("part_desc") || v("disc_parts"), "[part / geometry]");
	const mat = n(v("materials"), "[material]");
	const thk = n(v("wall_thickness"), "[thickness]");
	const obj = n(v("inspect_task") || v("disc_defects"), "[inspection objective]");
	const vol = n(v("rate_volume") || v("disc_volume"), "[volume / cycle time]");
	const next = n(v("roadmap1"), "[recommended next step]");
	const date = v("call_date") || "[scheduled date]";
	org();
	switch (key) {
		case "intro": return `Subject: Ahead of our call — X-ray / CT discovery

Hi ${name},

Looking forward to speaking on ${date}. I work with industrial X-ray and CT inspection — helping manufacturers in aerospace, additive, casting, defense, and advanced manufacturing find what other methods miss.

A few things that would help me prepare:

1. What parts are you looking to inspect, and what's the critical defect or measurement objective?
2. Are you working from a specific standard or customer quality requirement (Nadcap, ASTM, ISO, customer spec)?
3. What does your current inspection process look like today — film, legacy DR, outsourced CT, or something else?
4. Is this for a new capability, a capacity upgrade, or replacing existing equipment?

A sentence or two on each is plenty. It means I show up with the right reference material.

Best,
${sign()}`;
		case "followup": return `Subject: Follow-up — ${company} X-ray inspection discovery

Hi ${name},

Thank you for the time today. My understanding of the project is:

• Primary challenge: ${pain}
• Parts/materials: ${part}; ${mat}; thickness ${thk}
• Inspection objective: ${obj}
• Production need: ${vol}
• Potential direction: ${routeName()}

The most useful next inputs are CAD/STP files, 2D drawings, acceptance criteria, current technique sheets or example images, and representative sample parts if available.

Recommended next step: ${next}

Best,
${sign()}`;
		case "missing": return `Subject: Missing inputs for X-ray / CT application review

Hi ${name},

To move ${project} forward accurately, could you please help us gather the following?

${missingBullets()}

The highest-value items are usually CAD/STP, 2D drawings, acceptance criteria, technique sheets/images, and representative samples.

Best,
${sign()}`;
		case "sample": return `Subject: Application study / sample scan inputs — ${company}

Hi ${name},

Based on the target inspection objective (${obj}), an application study or sample scan would help confirm the right configuration before quoting.

Useful sample package:
• Representative production part(s)
• Known-good and known-bad samples if available
• CAD/STP and 2D drawing(s)
• Acceptance criteria / inspection procedure
• Any current film, CR, DDA, or CT images
• Desired detection target: ${n(v("detector_req"), "[minimum feature size]")}

Best,
${sign()}`;
		case "quote": return `Subject: Quote next steps — ${company} ${project}

Hi ${name},

Based on what we captured, we are aligning the proposed direction around ${routeName()}.

Before issuing or finalizing the quote, the main items to confirm are:

${missingBullets()}

Commercial timing captured so far:
• Budgetary quote deadline: ${n(v("budget_quote_deadline"), "[date]")}
• Final quote deadline: ${n(v("final_quote_deadline"), "[date]")}
• Target install: ${n(v("target_install"), "[date]")}
• Incoterms: ${n(v("incoterms"), "[FCA / DAP / DDP]")}

Best,
${sign()}`;
		case "procurement": return `Subject: Commercial clarification — Incoterms, payment, and project schedule

Hi ${name},

To align our proposal with your purchasing process, could you please confirm:

• Quoting entity / ordering entity
• Preferred Incoterms: ${n(v("incoterms"), "[FCA / DAP / DDP]")}
• Required payment terms or milestone structure
• Vendor setup requirements
• Required quote validity
• Any import, tariff, insurance, or delivery requirements
• Target PO date and required delivery / installation schedule

Best,
${sign()}`;
		case "proposal": return `Subject: Proposal — ${company} X-ray inspection project

Hi ${name},

Thank you for the opportunity to support ${company}. Based on the information captured so far, I am preparing / sending the proposal around:

• Application: ${part}
• Material / thickness: ${mat}; ${thk}
• Inspection objective: ${obj}
• Throughput / workflow: ${vol}
• Proposed direction: ${routeName()}
• Target timing: ${n(v("target_install") || v("expected_order"), "[timing]")}

After you have had a chance to review, I recommend a short technical/commercial review to confirm configuration, responsibilities, timeline, and any open exceptions.

Best,
${sign()}`;
		case "cadence": return `Subject: Checking in — ${company}

Hi ${name},

I wanted to check in on ${project} and see if your team has had a chance to review what we discussed.

• Primary driver: ${pain}
• Application: ${part}
• Inspection need: ${obj}
• Current next step: ${next}

Would it be useful to reconnect for 15–20 minutes on open technical questions, missing inputs, or quote timing?

Best,
${sign()}`;
		case "breakup": return `Subject: Should I close the loop for now? — ${company}

Hi ${name},

I wanted to close the loop on ${project}. My last understanding was that your team was evaluating ${routeName()} for ${part}, with the key driver being ${pain}.

If this is still active, I am happy to help with the next step — sample scan, technical review, budgetary quote, or proposal clarification.

If priorities have shifted, no problem at all; I can pause follow-up and reconnect when the project becomes active again.

Best,
${sign()}`;
	}
}
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
var assistDeal = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("68dd462549e8c2e4da03ad33191368701999b91fb87b5dde3567a1f558028f87"));
function OutputsPage() {
	useDealStore((s) => s.deals);
	const [tab, setTab] = (0, import_react.useState)("handoff");
	const [ai, setAi] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const text = tab === "handoff" ? buildHandoff() : tab === "ai" ? ai : buildEmail(tab);
	const runAi = async (mode) => {
		setBusy(true);
		setTab("ai");
		const res = await assistDeal({ data: {
			mode,
			summary: buildHandoff()
		} });
		setBusy(false);
		if (!res.ok) {
			toast.error(res.error);
			setAi(res.error);
			return;
		}
		setAi(res.text);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Handoff",
			title: "Briefs and emails",
			description: "Generated from the live capture. Copy, then send. Optional Grok polish is on-demand — it never runs by itself.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						copyText(text).then(() => toast.success("Copied"));
					},
					children: "Copy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: busy,
					onClick: () => void runAi("brief"),
					children: "Polish brief"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					disabled: busy,
					onClick: () => void runAi("questions"),
					children: "Suggest questions"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: tab === "handoff",
					onClick: () => setTab("handoff"),
					label: "Internal handoff"
				}),
				EMAIL_META.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: tab === e.key,
					onClick: () => setTab(e.key),
					label: e.label
				}, e.key)),
				ai ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					on: tab === "ai",
					onClick: () => setTab("ai"),
					label: "Grok output"
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs text-subtle",
				children: tab === "handoff" ? "Internal only — not customer-safe." : tab === "ai" ? busy ? "Working…" : "Review before you send. Grok does not invent specs that are not in the capture — still check." : "Customer-facing. Tokens filled from the active deal."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				readOnly: true,
				value: busy && tab === "ai" ? "Working…" : text,
				className: "min-h-[420px] font-mono text-[12.5px] leading-relaxed"
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-subtle",
			children: "Also available: copy the live snapshot from Command, or export JSON from Deals."
		})
	] });
}
function Chip({ on, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("rounded-full border px-3 py-1.5 text-xs", on ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-muted hover:text-fg"),
		children: label
	});
}
//#endregion
export { OutputsPage as component };
