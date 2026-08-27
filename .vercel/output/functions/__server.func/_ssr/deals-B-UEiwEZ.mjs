import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as fmtDate, E as downloadText, c as Button, f as useDealStore, r as PageHeader, w as cn } from "./router-fudB7XKc.mjs";
import { n as CardContent, t as Card } from "./card-CbtnwBn7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deals-B-UEiwEZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DealsPage() {
	const deals = useDealStore((s) => s.deals);
	const activeId = useDealStore((s) => s.activeId);
	const setActive = useDealStore((s) => s.setActive);
	const newDeal = useDealStore((s) => s.newDeal);
	const duplicateDeal = useDealStore((s) => s.duplicateDeal);
	const deleteDeal = useDealStore((s) => s.deleteDeal);
	const clearActive = useDealStore((s) => s.clearActive);
	const importFields = useDealStore((s) => s.importFields);
	const fileRef = (0, import_react.useRef)(null);
	const exportJson = () => {
		const deal = deals.find((d) => d.id === activeId);
		const customer = String(deal?.values.customer || "Unknown").replace(/[^a-z0-9]/gi, "_");
		const payload = {
			meta: {
				exported: (/* @__PURE__ */ new Date()).toISOString(),
				version: "Discovery Kit"
			},
			fields: deal?.values ?? {}
		};
		downloadText(`Discovery_${customer}_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, JSON.stringify(payload, null, 2), "application/json");
		toast.success("Exported JSON");
	};
	const onFile = (file) => {
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const obj = JSON.parse(String(reader.result));
				const fields = obj.fields ?? {
					...obj.customer_info,
					...obj.discovery
				};
				importFields(fields, true);
				toast.success("Imported JSON");
			} catch (e) {
				toast.error(e instanceof Error ? e.message : "Could not import");
			}
		};
		reader.readAsText(file);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Pipeline",
			title: "Deals",
			description: "Multiple discoveries on this device. The original HTML could only hold one form in localStorage. Import still understands the old workbook JSON.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => newDeal(),
					children: "New deal"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => duplicateDeal(),
					children: "Duplicate"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: exportJson,
					children: "Export JSON"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => fileRef.current?.click(),
					children: "Import JSON"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					onClick: () => clearActive(),
					children: "Clear notes"
				})
			] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			ref: fileRef,
			type: "file",
			accept: "application/json",
			className: "hidden",
			onChange: (e) => {
				onFile(e.target.files?.[0]);
				e.target.value = "";
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3",
			children: deals.map((d) => {
				const customer = String(d.values.customer || "Untitled deal");
				const contact = String(d.values.contact_name || "");
				const stage = String(d.values.stage || "No stage");
				const active = d.id === activeId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: cn(active && "shadow-[0_0_0_1px_var(--color-accent)]"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
						className: "flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "text-left",
							onClick: () => setActive(d.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold",
								children: customer
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted",
								children: [
									contact ? `${contact} · ` : "",
									stage,
									" · updated ",
									fmtDate(d.updatedAt)
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: active ? "default" : "secondary",
								onClick: () => setActive(d.id),
								children: active ? "Active" : "Open"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									if (confirm("Delete this deal from this device?")) deleteDeal(d.id);
								},
								children: "Delete"
							})]
						})]
					})
				}, d.id);
			})
		})
	] });
}
//#endregion
export { DealsPage as component };
