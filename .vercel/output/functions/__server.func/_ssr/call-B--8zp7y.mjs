import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ChevronRight, k as ChevronLeft } from "../_libs/lucide-react.mjs";
import { C as SCRIPT, S as QUESTIONS, c as Button, r as PageHeader, s as Progress, v as loadProfile, w as cn, x as COVER_FIELDS } from "./router-fudB7XKc.mjs";
import { n as CardContent, t as Card } from "./card-CbtnwBn7.mjs";
import { n as ExtraParts } from "./extra-list-CSA-uqT4.mjs";
import { n as NotesField, t as FieldControl } from "./fields-Dq7qz2rW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/call-B--8zp7y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		id: "cover",
		kind: "cover",
		title: "Cover sheet",
		prompt: "Lock the account, project, and next action before you dive in."
	},
	{
		id: "script",
		kind: "script",
		title: "Opening script",
		prompt: "Thirty seconds. Then invite intros. Then transition."
	},
	...QUESTIONS.map((q) => ({
		id: q.id,
		kind: "q",
		title: `${q.num} · ${q.title}`,
		prompt: q.prompt,
		q
	})),
	{
		id: "close",
		kind: "close",
		title: "Close the call",
		prompt: "Never hang up without a dated next action and an owner."
	}
];
function CallMode() {
	const [i, setI] = (0, import_react.useState)(0);
	const [script, setScript] = (0, import_react.useState)(SCRIPT);
	const step = STEPS[i];
	const pct = Math.round(i / (STEPS.length - 1) * 100);
	(0, import_react.useEffect)(() => {
		const p = loadProfile();
		setScript({
			opening: p.opening || SCRIPT.opening,
			intros: p.intros || SCRIPT.intros,
			transition: p.transition || SCRIPT.transition,
			close: SCRIPT.close
		});
	}, [i]);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			const t = e.target;
			if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
			if (e.key === "ArrowRight" || e.key === "j") setI((n) => Math.min(STEPS.length - 1, n + 1));
			if (e.key === "ArrowLeft" || e.key === "k") setI((n) => Math.max(0, n - 1));
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const body = (0, import_react.useMemo)(() => {
		if (step.kind === "cover") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: COVER_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: f.kind === "radio" ? "sm:col-span-2" : "",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f })
			}, f.id))
		});
		if (step.kind === "script") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptCard, {
					title: "Opening (30 sec)",
					body: script.opening
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptCard, {
					title: "Invite introductions",
					body: script.intros
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScriptCard, {
					title: "Transition to discovery",
					body: script.transition
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-warn",
					children: script.close
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					className: "text-sm text-accent underline",
					children: "Edit script in Settings"
				})
			]
		});
		if (step.kind === "q" && "q" in step && step.q) {
			const q = step.q;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: q.hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesField, {
						id: q.notesId,
						large: true
					}),
					q.fields.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [q.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: f.kind === "textarea" || f.kind === "checks" || f.kind === "radio" ? "sm:col-span-2" : "",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f })
						}, f.id)), q.id === "q3" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraParts, {}) : null]
					}) : null
				]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: COVER_FIELDS.find((f) => f.id === "next_action_date") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: COVER_FIELDS.find((f) => f.id === "next_action_owner") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: COVER_FIELDS.find((f) => f.id === "fit_confidence") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: COVER_FIELDS.find((f) => f.id === "roadmap1") ?? {
					id: "roadmap1",
					label: "Who does what by when",
					kind: "text"
				} })
			]
		});
	}, [step, script]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "On the call",
			title: "Call mode",
			description: "One beat at a time. J / K or arrows when you are not typing."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
			value: pct,
			className: "mb-4"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 mb-4 flex gap-1 overflow-x-auto px-1 pb-1",
			children: STEPS.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setI(idx),
				className: cn("h-11 shrink-0 rounded-md px-3 text-xs", idx === i ? "bg-accent text-accent-fg" : "bg-elevated text-muted"),
				children: s.title.split(" ")[0]
			}, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-lg font-semibold",
			children: step.title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: step.prompt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "pt-5",
			children: body
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				className: "min-h-11",
				disabled: i === 0,
				onClick: () => setI((n) => Math.max(0, n - 1)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Back"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "min-h-11",
				disabled: i === STEPS.length - 1,
				onClick: () => setI((n) => Math.min(STEPS.length - 1, n + 1)),
				children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
			})]
		})
	] });
}
function ScriptCard({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-semibold uppercase tracking-wide text-accent",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-fg",
			children: body
		})]
	});
}
//#endregion
export { CallMode as component };
