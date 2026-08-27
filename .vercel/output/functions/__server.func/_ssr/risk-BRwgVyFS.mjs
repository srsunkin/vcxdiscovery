import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { f as useDealStore, r as PageHeader, w as cn } from "./router-fudB7XKc.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CbtnwBn7.mjs";
import { t as Badge } from "./badge-ChkhkFu-.mjs";
import { f as RISK_FLAGS } from "./playbook-xobszCRE.mjs";
import { t as ExtraFlags } from "./extra-list-CSA-uqT4.mjs";
import { n as NotesField, t as FieldControl } from "./fields-Dq7qz2rW.mjs";
import { t as computeRisks } from "./risk-BhFCEv8N.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/risk-BRwgVyFS.js
var import_jsx_runtime = require_jsx_runtime();
function RiskPage() {
	useDealStore((s) => s.deals);
	const { items, level } = computeRisks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Risk radar",
		title: "What can still kill this deal",
		description: "Auto-detected gaps from the capture, plus the manual red-flag list from the original workbook.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: level === "High" ? "danger" : level === "Medium" ? "warn" : "success",
			children: level
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Auto-detected" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "flex flex-col gap-2",
			children: items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("rounded-lg border-l-4 px-3 py-2 text-sm", r.level === "high" ? "border-danger bg-danger-dim text-fg" : r.level === "ok" ? "border-success bg-success-dim text-fg" : "border-warn bg-warn-dim text-fg"),
				children: r.text
			}, r.text))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Manual flags" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: {
				id: "manual_risks",
				label: "Tick anything the auto list missed",
				kind: "checks",
				options: RISK_FLAGS.map((f) => ({
					id: f.id,
					label: f.label
				}))
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtraFlags, {})] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Mitigation" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesField, {
				id: "risk_mitigation",
				label: "Top risk / mitigation notes"
			}) })] })]
		})]
	})] });
}
//#endregion
export { RiskPage as component };
