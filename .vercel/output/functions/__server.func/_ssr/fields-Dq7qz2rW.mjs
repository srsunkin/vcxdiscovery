import { h as require_jsx_runtime, n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { j as Check } from "../_libs/lucide-react.mjs";
import { f as useDealStore, w as cn } from "./router-fudB7XKc.mjs";
import { n as Label, t as Input } from "./label-CFGKn3FA.mjs";
import { t as Textarea } from "./textarea-BfHpwHsU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fields-Dq7qz2rW.js
var import_jsx_runtime = require_jsx_runtime();
function Checkbox({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer size-4 shrink-0 rounded-[4px] border border-border-strong bg-panel", "data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-fg", "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_rgba(77,124,255,0.25)]", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
				className: "size-3",
				strokeWidth: 3
			})
		})
	});
}
var EMPTY_VALUES = {};
function FieldControl({ field }) {
	const hydrated = useDealStore((s) => s.hydrated);
	const value = useDealStore((s) => {
		if (!s.hydrated) return void 0;
		return s.deals.find((d) => d.id === s.activeId)?.values[field.id];
	});
	const setValue = useDealStore((s) => s.setValue);
	const values = useDealStore((s) => {
		if (!s.hydrated) return EMPTY_VALUES;
		return s.deals.find((d) => d.id === s.activeId)?.values ?? EMPTY_VALUES;
	});
	const str = hydrated && typeof value === "string" ? value : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: field.id,
				children: field.label
			}),
			field.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: field.hint
			}) : null,
			field.kind === "text" || field.kind === "date" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id: field.id,
				type: field.kind === "date" ? "date" : "text",
				placeholder: field.placeholder,
				value: str,
				onChange: (e) => setValue(field.id, e.target.value)
			}) : null,
			field.kind === "textarea" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				id: field.id,
				placeholder: field.placeholder,
				value: str,
				onChange: (e) => setValue(field.id, e.target.value)
			}) : null,
			field.kind === "select" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				id: field.id,
				value: str,
				onChange: (e) => setValue(field.id, e.target.value),
				className: "h-11 w-full rounded-md border border-border bg-panel px-3 text-sm text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Select…"
				}), field.options?.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o.label,
					children: o.label
				}, o.id))]
			}) : null,
			field.kind === "radio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: field.options?.map((o) => {
					const val = o.value ?? o.label;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setValue(field.id, val),
						className: cn("min-h-11 rounded-full border px-3 py-2 text-left text-xs transition-colors", str === val ? "border-accent bg-accent-dim text-fg" : "border-border bg-panel text-muted hover:border-border-strong hover:text-fg"),
						children: o.label
					}, o.id);
				})
			}) : null,
			field.kind === "checks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2",
				children: field.options?.map((o) => {
					const checked = values[o.id] === true;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-sm text-fg hover:border-border-strong",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked,
							onCheckedChange: (c) => setValue(o.id, c === true)
						}), o.label]
					}, o.id);
				})
			}) : null
		]
	});
}
function NotesField({ id, label = "Call notes", placeholder, large }) {
	const hydrated = useDealStore((s) => s.hydrated);
	const value = useDealStore((s) => {
		if (!s.hydrated) return "";
		const v = s.deals.find((d) => d.id === s.activeId)?.values[id];
		return typeof v === "string" ? v : "";
	});
	const setValue = useDealStore((s) => s.setValue);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			id,
			placeholder: placeholder ?? "Capture what they actually said…",
			value: hydrated ? value : "",
			onChange: (e) => setValue(id, e.target.value),
			className: large ? "min-h-40 text-base" : "min-h-28"
		})]
	});
}
//#endregion
export { NotesField as n, FieldControl as t };
