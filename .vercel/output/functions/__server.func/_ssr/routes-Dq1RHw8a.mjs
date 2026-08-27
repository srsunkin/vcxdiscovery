import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ArrowRight, T as Copy, m as Phone, r as UserRound } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { T as copyText, c as Button, f as useDealStore, h as PROFILE_EVENT, r as PageHeader, v as loadProfile, x as COVER_FIELDS } from "./router-fudB7XKc.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CbtnwBn7.mjs";
import { t as Badge } from "./badge-ChkhkFu-.mjs";
import { t as FieldControl } from "./fields-Dq7qz2rW.mjs";
import { n as buildSummary, r as snapshotSignals } from "./summary-CwKvbJ3b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Dq1RHw8a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EMPTY_SIG = {
	progress: "0% complete (0/32)",
	pct: 0,
	missing: "—",
	route: "—",
	routeReason: "",
	risk: "Low",
	next: "—"
};
function Home() {
	useDealStore((s) => s.deals);
	useDealStore((s) => s.activeId);
	const hydrated = useDealStore((s) => s.hydrated);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const live = mounted && hydrated;
	const sig = live ? snapshotSignals() : EMPTY_SIG;
	const summary = live ? buildSummary() : "";
	const [needsIdentity, setNeedsIdentity] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const sync = () => {
			const p = loadProfile();
			setNeedsIdentity(!p.owner.trim() && !p.org.trim());
		};
		sync();
		window.addEventListener(PROFILE_EVENT, sync);
		return () => window.removeEventListener(PROFILE_EVENT, sync);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Command center",
			title: "Live discovery snapshot",
			description: "Fill the cover sheet, then run the call. Routing, risk, and the internal brief update as you capture.",
			actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/call",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" }), "Start call mode"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				onClick: () => {
					copyText(summary).then(() => toast.success("Brief copied"));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), "Copy brief"]
			})] })
		}),
		needsIdentity ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 flex flex-col gap-3 rounded-xl bg-accent-dim/40 px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Channel-partner ready. Set your name and company once — emails and the opening script use it, not a personal brand." })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "secondary",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/settings",
					children: "Open Settings"
				})
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
					label: "Progress",
					value: sig.progress
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
					label: "Auto route",
					value: sig.route,
					hint: sig.routeReason
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
					label: "Risk",
					value: sig.risk,
					tone: sig.risk === "High" ? "danger" : sig.risk === "Medium" ? "warn" : "ok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, {
					label: "Next action",
					value: sig.next
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 rounded-xl bg-surface p-4 text-sm text-muted shadow-[var(--shadow-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-medium text-fg",
				children: "Missing critical: "
			}), sig.missing]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Cover sheet" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "grid gap-4 sm:grid-cols-2",
				children: COVER_FIELDS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: f.kind === "radio" ? "sm:col-span-2" : "",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, { field: f })
				}, f.id))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
						className: "flex-row items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Internal brief" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "muted",
							children: "Customer-unsafe"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "max-h-[420px] overflow-auto whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-muted",
						children: summary
					}) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
							to: "/routing",
							label: "Confirm routing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
							to: "/risk",
							label: "Review risks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
							to: "/outputs",
							label: "Handoff & emails"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Jump, {
							to: "/library",
							label: "Open library"
						})
					]
				})]
			})]
		})
	] });
}
function Signal({ label, value, hint, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-[10px] uppercase tracking-[0.12em] text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: tone === "danger" ? "mt-1 text-sm font-semibold text-danger" : tone === "warn" ? "mt-1 text-sm font-semibold text-warn" : "mt-1 text-sm font-semibold text-fg",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 line-clamp-2 text-xs text-subtle",
				children: hint
			}) : null
		]
	}) });
}
function Jump({ to, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		className: "justify-between",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
		})
	});
}
//#endregion
export { Home as component };
