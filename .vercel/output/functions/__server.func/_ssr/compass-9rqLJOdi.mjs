import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { b as COMPASS_FIELDS, r as PageHeader } from "./router-fudB7XKc.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CbtnwBn7.mjs";
import { n as NotesField, t as FieldControl } from "./fields-Dq7qz2rW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/compass-9rqLJOdi.js
var import_jsx_runtime = require_jsx_runtime();
function CompassPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "AI / ADR",
			title: "COMPASS deployment",
			description: "Where are they in the AI journey? Images, defect classes, operating mode, inline PLC, archive, and IT constraints — the original workbook's longest section, grouped so you can actually fill it on a call."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "pt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesField, {
					id: "disc_ai",
					label: "Call notes",
					placeholder: "Check-up / feasibility done? Existing systems & retrofit? Image readiness? Defect classes? COMPASS mode? Inline / PLC? Archiving? IT & maintenance?"
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: COMPASS_FIELDS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: g.group }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-4",
				children: g.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f }, f.id))
			})] }, g.group))
		})
	] });
}
//#endregion
export { CompassPage as component };
