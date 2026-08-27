import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { A as ChevronDown } from "../_libs/lucide-react.mjs";
import { S as QUESTIONS, c as Button, r as PageHeader, w as cn, x as COVER_FIELDS } from "./router-fudB7XKc.mjs";
import { n as CardContent, t as Card } from "./card-CbtnwBn7.mjs";
import { n as ExtraParts } from "./extra-list-CSA-uqT4.mjs";
import { n as NotesField, t as FieldControl } from "./fields-Dq7qz2rW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discovery-CSCYGrTe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Discovery() {
	const [open, setOpen] = (0, import_react.useState)({ q1: true });
	const expand = (v) => {
		const next = { cover: v };
		QUESTIONS.forEach((q) => {
			next[q.id] = v;
		});
		setOpen(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Full capture",
			title: "Discovery workbook",
			description: "Same questions as the original toolkit — structured fields under live notes, without a 5,000-line HTML file.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => expand(true),
				children: "Expand all"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				onClick: () => expand(false),
				children: "Collapse all"
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			num: "00",
			title: "Cover sheet",
			prompt: "Account, project, stage, next action.",
			open: open.cover ?? false,
			onToggle: () => setOpen((s) => ({
				...s,
				cover: !s.cover
			})),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: COVER_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: f.kind === "radio" ? "sm:col-span-2 lg:col-span-3" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f })
				}, f.id))
			})
		}),
		QUESTIONS.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			num: q.num,
			title: q.title,
			prompt: q.prompt,
			open: open[q.id] ?? false,
			onToggle: () => setOpen((s) => ({
				...s,
				[q.id]: !s[q.id]
			})),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-muted",
					children: q.hint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesField, { id: q.notesId }),
				q.fields.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2",
					children: [q.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: f.kind === "textarea" || f.kind === "checks" || f.kind === "radio" ? "sm:col-span-2" : "",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f })
					}, f.id)), q.id === "q3" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraParts, {}) : null]
				}) : null
			]
		}, q.id))
	] });
}
function Section({ num, title, prompt, open, onToggle, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mb-3 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: onToggle,
			className: "flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-elevated/40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-fg",
					children: num
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm font-semibold",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-sm text-muted",
						children: prompt
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("mt-1 size-4 text-muted transition-transform", open ? "rotate-0" : "-rotate-90") })
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "border-t border-border pt-4",
			children
		}) : null]
	});
}
//#endregion
export { Discovery as component };
