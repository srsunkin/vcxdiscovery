import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as Trash2, p as Plus } from "../_libs/lucide-react.mjs";
import { M as uid, c as Button, f as useDealStore } from "./router-fudB7XKc.mjs";
import { n as Label, t as Input } from "./label-CFGKn3FA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/extra-list-CSA-uqT4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseParts(raw) {
	if (typeof raw !== "string" || !raw.trim()) return [];
	try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v : [];
	} catch {
		return [];
	}
}
function ExtraParts() {
	const raw = useDealStore((s) => {
		return s.deals.find((x) => x.id === s.activeId)?.values.extra_parts;
	});
	const setValue = useDealStore((s) => s.setValue);
	const parts = parseParts(raw);
	const [fresh, setFresh] = (0, import_react.useState)(null);
	const firstRef = (0, import_react.useRef)(null);
	const write = (next) => setValue("extra_parts", JSON.stringify(next));
	(0, import_react.useEffect)(() => {
		if (fresh) firstRef.current?.focus();
	}, [fresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sm:col-span-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Additional parts" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs text-subtle",
				children: "Add each extra geometry — envelope checker uses the primary part plus these notes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: parts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 rounded-xl bg-elevated/60 p-3 shadow-[var(--shadow-border)] sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							ref: p.id === fresh ? firstRef : void 0,
							placeholder: "Description / geometry",
							value: p.desc,
							onChange: (e) => write(parts.map((x) => x.id === p.id ? {
								...x,
								desc: e.target.value
							} : x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Material",
							value: p.material,
							onChange: (e) => write(parts.map((x) => x.id === p.id ? {
								...x,
								material: e.target.value
							} : x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Envelope (mm or in)",
							value: p.envelope,
							onChange: (e) => write(parts.map((x) => x.id === p.id ? {
								...x,
								envelope: e.target.value
							} : x))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Weight",
								value: p.weight,
								onChange: (e) => write(parts.map((x) => x.id === p.id ? {
									...x,
									weight: e.target.value
								} : x))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								"aria-label": `Remove part ${i + 1}`,
								onClick: () => write(parts.filter((x) => x.id !== p.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})]
						})
					]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				size: "lg",
				className: "mt-2",
				onClick: () => {
					const id = uid();
					write([...parts, {
						id,
						desc: "",
						material: "",
						envelope: "",
						weight: ""
					}]);
					setFresh(id);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add part"]
			})
		]
	});
}
function ExtraFlags({ fieldId = "extra_flags" }) {
	const raw = useDealStore((s) => {
		return s.deals.find((x) => x.id === s.activeId)?.values[fieldId];
	});
	const setValue = useDealStore((s) => s.setValue);
	const items = parseParts(typeof raw === "string" ? raw : void 0).map((p) => ({
		id: p.id,
		text: p.desc
	}));
	const [fresh, setFresh] = (0, import_react.useState)(null);
	const firstRef = (0, import_react.useRef)(null);
	const write = (next) => setValue(fieldId, JSON.stringify(next.map((x) => ({
		id: x.id,
		desc: x.text,
		material: "",
		envelope: "",
		weight: ""
	}))));
	(0, import_react.useEffect)(() => {
		if (fresh) firstRef.current?.focus();
	}, [fresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Custom flags" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-col gap-2",
				children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: it.id === fresh ? firstRef : void 0,
						value: it.text,
						placeholder: "Add a deal-specific risk",
						onChange: (e) => write(items.map((x) => x.id === it.id ? {
							...x,
							text: e.target.value
						} : x))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon",
						"aria-label": "Remove",
						onClick: () => write(items.filter((x) => x.id !== it.id)),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})]
				}, it.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "secondary",
				size: "lg",
				className: "mt-2",
				onClick: () => {
					const id = uid();
					write([...items, {
						id,
						text: ""
					}]);
					setFresh(id);
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "Add flag"]
			})
		]
	});
}
//#endregion
export { ExtraParts as n, ExtraFlags as t };
