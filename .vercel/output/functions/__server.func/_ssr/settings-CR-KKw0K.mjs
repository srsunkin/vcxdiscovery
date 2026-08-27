import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as Button, m as DEFAULT_PROFILE, r as PageHeader, v as loadProfile, y as saveProfile } from "./router-fudB7XKc.mjs";
import { n as Label, t as Input } from "./label-CFGKn3FA.mjs";
import { t as Textarea } from "./textarea-BfHpwHsU.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CbtnwBn7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CR-KKw0K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const [p, setP] = (0, import_react.useState)(DEFAULT_PROFILE);
	(0, import_react.useEffect)(() => {
		setP(loadProfile());
	}, []);
	const set = (k, v) => setP((s) => ({
		...s,
		[k]: v
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Workspace",
			title: "Settings",
			description: "Set your name and company once. Emails, the opening script, and the sidebar use this — so channel partners can run the same kit.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => {
					saveProfile(p);
					toast.success("Saved on this device");
				},
				children: "Save"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Identity" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Your name",
						value: p.owner,
						onChange: (v) => set("owner", v),
						placeholder: "Used on emails and cover sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Company / channel",
						value: p.org,
						onChange: (v) => set("org", v),
						placeholder: "Appears on sign-off instead of a personal brand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Role line",
						value: p.roleLine,
						onChange: (v) => set("roleLine", v),
						placeholder: "Industrial X-ray / CT"
					})
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Call script" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Opening (30 sec)",
						value: p.opening,
						onChange: (v) => set("opening", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Invite intros",
						value: p.intros,
						onChange: (v) => set("intros", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						label: "Transition",
						value: p.transition,
						onChange: (v) => set("transition", v)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => {
							setP({
								...DEFAULT_PROFILE,
								owner: p.owner,
								org: p.org,
								roleLine: p.roleLine
							});
						},
						children: "Reset script to generic"
					})
				]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Catalog names (PRO C, diondo d5, COMPASS) stay — those are the products. Your identity is local to this browser, not baked into the file."
		})
	] });
}
function Field({ label, value, onChange, placeholder }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			placeholder,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Area({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value,
			onChange: (e) => onChange(e.target.value),
			rows: 4
		})]
	});
}
//#endregion
export { SettingsPage as component };
