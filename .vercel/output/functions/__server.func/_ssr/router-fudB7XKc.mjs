import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ClipboardList, E as Compass, M as Boxes, P as BookOpen, S as FileOutput, b as LayoutDashboard, c as ShieldAlert, i as TriangleAlert, l as Settings, m as Phone, n as Waypoints, t as X, u as Search, v as Menu, y as Library } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-fudB7XKc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "Command",
		hint: "Live snapshot of the active deal",
		icon: LayoutDashboard,
		group: "work"
	},
	{
		to: "/call",
		label: "Call mode",
		hint: "One question at a time",
		icon: Phone,
		group: "work"
	},
	{
		to: "/discovery",
		label: "Discovery",
		hint: "Full Q1–Q10 capture",
		icon: ClipboardList,
		group: "work"
	},
	{
		to: "/compass",
		label: "COMPASS / ADR",
		hint: "AI deployment capture",
		icon: Compass,
		group: "work"
	},
	{
		to: "/routing",
		label: "Routing & fit",
		hint: "System pick + envelope checker",
		icon: Waypoints,
		group: "work"
	},
	{
		to: "/risk",
		label: "Risk radar",
		hint: "Missing capture and red flags",
		icon: ShieldAlert,
		group: "work"
	},
	{
		to: "/outputs",
		label: "Handoff",
		hint: "Briefs and emails",
		icon: FileOutput,
		group: "work"
	},
	{
		to: "/playbook",
		label: "Playbook",
		hint: "Roles, objections, ROI",
		icon: BookOpen,
		group: "intel"
	},
	{
		to: "/library",
		label: "Library",
		hint: "kV, systems, standards, glossary",
		icon: Library,
		group: "intel"
	},
	{
		to: "/deals",
		label: "Deals",
		hint: "Switch, export, import",
		icon: Boxes,
		group: "intel"
	},
	{
		to: "/settings",
		label: "Settings",
		hint: "Your name, company, script",
		icon: Settings,
		group: "intel"
	}
];
var LIBRARY_PAGES = [
	{
		slug: "kv",
		letter: "A",
		title: "kV / tube",
		blurb: "Density groups, thickness windows, source class."
	},
	{
		slug: "systems",
		letter: "B",
		title: "VCxray systems",
		blurb: "Published envelopes + picking guide."
	},
	{
		slug: "diondo",
		letter: "C",
		title: "diondo CT",
		blurb: "dsubµ through d7 — sample vs scan volume."
	},
	{
		slug: "detectors",
		letter: "D",
		title: "Detectors",
		blurb: "DDA shortlist — add your local SKUs."
	},
	{
		slug: "detection",
		letter: "E",
		title: "Detection / IQI",
		blurb: "2-2T, EPS heuristic, duplex wire."
	},
	{
		slug: "modality",
		letter: "F",
		title: "Modality",
		blurb: "DR vs laminography vs CT vs ADR."
	},
	{
		slug: "objections",
		letter: "G",
		title: "Objections",
		blurb: "Acknowledge, reframe, prove on their parts."
	},
	{
		slug: "standards",
		letter: "H",
		title: "Standards",
		blurb: "ASTM, ISO, Nadcap, DICONDE — add customer specs."
	},
	{
		slug: "executive",
		letter: "I",
		title: "Exec / ROI",
		blurb: "Translate features into outcomes."
	},
	{
		slug: "commercial",
		letter: "J",
		title: "Commercial",
		blurb: "Incoterms, milestones, BANT."
	},
	{
		slug: "safety",
		letter: "K",
		title: "Safety",
		blurb: "Cabinet vs vault, dose, NRTL."
	},
	{
		slug: "glossary",
		letter: "L",
		title: "Glossary",
		blurb: "NDT sales terms + your local slang."
	},
	{
		slug: "conversions",
		letter: "M",
		title: "Conversions",
		blurb: "µm, mm, inches, kg, envelopes."
	},
	{
		slug: "chain",
		letter: "N",
		title: "Imaging chain",
		blurb: "Customer-safe screen-share sheet."
	},
	{
		slug: "linac",
		letter: "O",
		title: "Linac sources",
		blurb: "d7, Varex M6, Siemens SILAC."
	}
];
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
	return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function fmtDate(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function downloadText(filename, text, mime = "text/plain") {
	const blob = new Blob([text], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function copyText(text) {
	return navigator.clipboard.writeText(text);
}
function mmToIn(mm) {
	return mm / 25.4;
}
function inToMm(inches) {
	return inches * 25.4;
}
function kgToLb(kg) {
	return kg * 2.20462;
}
function lbToKg(lb) {
	return lb / 2.20462;
}
function formatMmIn(mm) {
	if (!Number.isFinite(mm) || mm <= 0) return "Custom";
	return `${Math.round(mm)} mm / ${mmToIn(mm).toFixed(1)} in`;
}
function formatKgLb(kg) {
	if (!Number.isFinite(kg) || kg <= 0) return "Custom";
	return `${Math.round(kg)} kg / ${Math.round(kgToLb(kg)).toLocaleString()} lb`;
}
var COVER_FIELDS = [
	{
		id: "customer",
		label: "Customer",
		kind: "text",
		placeholder: "Company name",
		critical: true
	},
	{
		id: "contact_name",
		label: "Contact name",
		kind: "text",
		placeholder: "Full name",
		critical: true
	},
	{
		id: "location",
		label: "Location of end-use",
		kind: "text",
		placeholder: "City, country",
		critical: true
	},
	{
		id: "project_name",
		label: "Project name",
		kind: "text",
		placeholder: "Customer — AL inspection at new plant",
		critical: true
	},
	{
		id: "project_number",
		label: "Project number",
		kind: "text",
		placeholder: "YYYY-XXXXX",
		critical: true
	},
	{
		id: "project_type",
		label: "Project type",
		kind: "radio",
		critical: true,
		options: [
			{
				id: "pt_2d",
				label: "New 2D DR",
				value: "New 2D DR"
			},
			{
				id: "pt_ct",
				label: "New CT",
				value: "New CT"
			},
			{
				id: "pt_retro",
				label: "Retrofit",
				value: "Retrofit"
			},
			{
				id: "pt_xline",
				label: "X-line",
				value: "X-line"
			}
		]
	},
	{
		id: "call_date",
		label: "Call / discovery date",
		kind: "date",
		critical: true
	},
	{
		id: "sales_owner",
		label: "Sales owner",
		kind: "text",
		placeholder: "Your name"
	},
	{
		id: "stage",
		label: "Stage",
		kind: "select",
		critical: true,
		options: [
			{
				id: "s0",
				label: "Lead / inquiry"
			},
			{
				id: "s1",
				label: "Qualified discovery"
			},
			{
				id: "s2",
				label: "Application study"
			},
			{
				id: "s3",
				label: "Budgetary quote"
			},
			{
				id: "s4",
				label: "Formal proposal"
			},
			{
				id: "s5",
				label: "Negotiation"
			},
			{
				id: "s6",
				label: "Closed won"
			},
			{
				id: "s7",
				label: "Closed lost"
			}
		]
	},
	{
		id: "next_action_date",
		label: "Next action date",
		kind: "date",
		critical: true
	},
	{
		id: "next_action_owner",
		label: "Next action owner",
		kind: "text",
		placeholder: "Owner name",
		critical: true
	},
	{
		id: "fit_confidence",
		label: "Fit confidence",
		kind: "select",
		critical: true,
		options: [
			{
				id: "f1",
				label: "High"
			},
			{
				id: "f2",
				label: "Medium"
			},
			{
				id: "f3",
				label: "Low"
			},
			{
				id: "f4",
				label: "Unknown"
			}
		]
	}
];
var QUESTIONS = [
	{
		id: "q1",
		num: "Q1",
		title: "Pain point",
		prompt: "What's the most pressing inspection challenge right now?",
		hint: "Speed, quality, consistency, labor, compliance — or something else?",
		notesId: "disc_pain",
		fields: []
	},
	{
		id: "q2",
		num: "Q2",
		title: "Industry & compliance",
		prompt: "What industry? What standards must you meet?",
		hint: "ASTM, ASME, Nadcap, customer specs, DICONDE, export.",
		notesId: "disc_industry",
		fields: []
	},
	{
		id: "q3",
		num: "Q3",
		title: "Part specifications",
		prompt: "Walk me through your parts: dimensions, weight, alloy.",
		hint: "Technique sheet, DWG/CAD, MTR. Capture envelope early. Use + Add part for a family.",
		notesId: "disc_parts",
		fields: [
			{
				id: "part_desc",
				label: "Part & geometry",
				kind: "textarea",
				placeholder: "L × W × H, diameter",
				critical: true
			},
			{
				id: "materials",
				label: "Materials",
				kind: "text"
			},
			{
				id: "weight",
				label: "Weight",
				kind: "text"
			},
			{
				id: "wall_thickness",
				label: "Wall thickness",
				kind: "text"
			},
			{
				id: "docs",
				label: "Documents on hand",
				kind: "checks",
				options: [
					{
						id: "doc_technique",
						label: "Technique sheet"
					},
					{
						id: "doc_cad",
						label: "CAD / STP"
					},
					{
						id: "doc_2d",
						label: "2D drawing"
					}
				]
			}
		]
	},
	{
		id: "q4",
		num: "Q4",
		title: "Defects & resolution",
		prompt: "What flaws are you targeting? Smallest feature to detect?",
		hint: "Cracks, porosity, delamination, inclusions. Min defect size.",
		notesId: "disc_defects",
		fields: [
			{
				id: "inspect_task",
				label: "Inspection task",
				kind: "textarea",
				critical: true
			},
			{
				id: "defect_char",
				label: "Defect character",
				kind: "checks",
				options: [
					{
						id: "defect_vol",
						label: "Volumetric"
					},
					{
						id: "defect_planar",
						label: "Planar / orientation-sensitive"
					},
					{
						id: "defect_lowcon",
						label: "Low contrast / disbond-like"
					},
					{
						id: "defect_unknown",
						label: "Unknown / mixed"
					}
				]
			},
			{
				id: "current_inspect",
				label: "Current method",
				kind: "text",
				placeholder: "Film, CR, DDA, outsourced CT…"
			},
			{
				id: "app_study",
				label: "Application study",
				kind: "radio",
				options: [
					{
						id: "app_study_yes",
						label: "Done",
						value: "Done"
					},
					{
						id: "app_study_needed",
						label: "Needed",
						value: "Needed"
					},
					{
						id: "app_study_no",
						label: "Not required",
						value: "No"
					}
				]
			},
			{
				id: "app_study_notes",
				label: "Study notes",
				kind: "text"
			}
		]
	},
	{
		id: "q5",
		num: "Q5",
		title: "Volume & cycle time",
		prompt: "How many parts? How fast does the line need to move?",
		hint: "100% vs sample. Peak vs average. Takt time.",
		notesId: "disc_volume",
		fields: [
			{
				id: "coverage",
				label: "Coverage",
				kind: "checks",
				options: [{
					id: "cov_100",
					label: "100%"
				}, {
					id: "cov_sample",
					label: "Sample"
				}]
			},
			{
				id: "sample_pct",
				label: "Sample %",
				kind: "text"
			},
			{
				id: "sample_qty",
				label: "Sample qty",
				kind: "text"
			},
			{
				id: "rate_volume",
				label: "Rate / volume",
				kind: "text",
				critical: true
			},
			{
				id: "peak_avg",
				label: "Peak vs average",
				kind: "text"
			}
		]
	},
	{
		id: "q6",
		num: "Q6",
		title: "Loading & automation",
		prompt: "How do parts arrive? How much automation do you want?",
		hint: "Manual, assisted, robot, conveyor. ADR, marking, sorting.",
		notesId: "disc_loading",
		fields: [
			{
				id: "loading",
				label: "Loading",
				kind: "checks",
				options: [
					{
						id: "auto_load_manual",
						label: "Manual"
					},
					{
						id: "auto_load_assisted",
						label: "Assisted"
					},
					{
						id: "auto_load_robotic",
						label: "Robotic"
					},
					{
						id: "auto_load_conveyor",
						label: "Conveyor"
					}
				]
			},
			{
				id: "acquisition",
				label: "Acquisition",
				kind: "checks",
				options: [
					{
						id: "auto_acq_manual",
						label: "Manual"
					},
					{
						id: "auto_acq_semi",
						label: "Semi-auto"
					},
					{
						id: "auto_acq_full",
						label: "Full CNC / recipe"
					}
				]
			},
			{
				id: "downstream",
				label: "Downstream",
				kind: "checks",
				options: [
					{
						id: "auto_defect",
						label: "ADR / defect recognition"
					},
					{
						id: "auto_marking",
						label: "Marking"
					},
					{
						id: "auto_sorting",
						label: "Sorting"
					},
					{
						id: "auto_stats",
						label: "SPC / stats"
					}
				]
			},
			{
				id: "post_process_details",
				label: "Post-process details",
				kind: "textarea"
			},
			{
				id: "post_flow",
				label: "Part flow after inspect",
				kind: "text"
			}
		]
	},
	{
		id: "q7",
		num: "Q7",
		title: "Detector & image quality",
		prompt: "What image quality do you need to prove?",
		hint: "2-2T, duplex wire, DDA vs panel origin, pixel pitch.",
		notesId: "disc_detector",
		fields: [
			{
				id: "detector_req",
				label: "Detection requirement",
				kind: "text",
				placeholder: "Min feature, IQI class"
			},
			{
				id: "xray_source",
				label: "Source preference",
				kind: "text"
			},
			{
				id: "software_req",
				label: "Software / DICONDE / ADR",
				kind: "text"
			}
		]
	},
	{
		id: "q8",
		num: "Q8",
		title: "3D / CT requirements",
		prompt: "Is 2D enough, or do you need 3D CT?",
		hint: "Two or more CT checks = strong CT case.",
		notesId: "disc_ct",
		fields: [{
			id: "ct_checks",
			label: "CT decision checklist",
			kind: "checks",
			options: [
				{
					id: "ct_check_planar",
					label: "Critical defect planar / orientation-sensitive"
				},
				{
					id: "ct_check_overlap",
					label: "Features overlap in 2D"
				},
				{
					id: "ct_check_internal",
					label: "Internal geometry must be measured"
				},
				{
					id: "ct_check_3d",
					label: "3D characterisation required"
				},
				{
					id: "ct_check_process",
					label: "Process feedback needs 3D"
				},
				{
					id: "ct_check_metrology",
					label: "Traceable metrology CT"
				}
			]
		}, {
			id: "ct_why",
			label: "Why CT / why not",
			kind: "textarea"
		}]
	},
	{
		id: "q9",
		num: "Q9",
		title: "Site constraints",
		prompt: "Available footprint? Infrastructure constraints?",
		hint: "Ceiling, door, 480V 3-phase, vibration, humidity, vault.",
		notesId: "disc_site",
		fields: [{
			id: "site_constraints",
			label: "Site notes",
			kind: "textarea",
			placeholder: "Footprint, ceiling, door, power, vault"
		}]
	},
	{
		id: "q10",
		num: "Q10",
		title: "Timeline, budget, people",
		prompt: "Timeline? Budget process? Who decides? Other vendors?",
		hint: "Never hang up without a dated next action and an owner.",
		notesId: "disc_timeline",
		fields: [
			{
				id: "budget_custom",
				label: "Budget range",
				kind: "text"
			},
			{
				id: "expected_order",
				label: "Expected order date",
				kind: "text"
			},
			{
				id: "budget_quote_deadline",
				label: "Budgetary quote deadline",
				kind: "text"
			},
			{
				id: "final_quote_deadline",
				label: "Final quote deadline",
				kind: "text"
			},
			{
				id: "target_install",
				label: "Target install",
				kind: "text"
			},
			{
				id: "other_milestones",
				label: "Other milestones",
				kind: "text"
			},
			{
				id: "incoterms",
				label: "Incoterms",
				kind: "text",
				placeholder: "FCA / DAP / DDP"
			},
			{
				id: "recommended_solution",
				label: "Recommended solution concept",
				kind: "textarea"
			},
			{
				id: "risks",
				label: "Noted risks",
				kind: "textarea"
			},
			{
				id: "stakeholders",
				label: "Stakeholders identified",
				kind: "checks",
				options: [
					{
						id: "stake_budget",
						label: "Budget"
					},
					{
						id: "stake_tech",
						label: "Technical"
					},
					{
						id: "stake_purch",
						label: "Purchasing"
					},
					{
						id: "stake_ops",
						label: "Operations"
					}
				]
			},
			{
				id: "quoting_entity",
				label: "Quoting entity",
				kind: "radio",
				options: [{
					id: "entity_partner",
					label: "Channel partner",
					value: "Partner"
				}, {
					id: "entity_customer",
					label: "Customer",
					value: "Customer"
				}]
			},
			{
				id: "stake_other",
				label: "Other influencers",
				kind: "text"
			},
			{
				id: "multithreading",
				label: "Multi-threading status",
				kind: "text"
			},
			{
				id: "competition",
				label: "Competition",
				kind: "radio",
				options: [{
					id: "comp_no",
					label: "No other vendors",
					value: "No"
				}, {
					id: "comp_yes",
					label: "Yes — other vendors",
					value: "Yes"
				}]
			},
			{
				id: "competition_who",
				label: "Who / which vendors",
				kind: "text"
			},
			{
				id: "comp_stage",
				label: "Stage & known pricing",
				kind: "textarea"
			},
			{
				id: "comp_likes",
				label: "What they like / dislike about them",
				kind: "textarea"
			},
			{
				id: "test_sample",
				label: "Test sample",
				kind: "radio",
				options: [
					{
						id: "sample_yesfull",
						label: "Full part",
						value: "Full"
					},
					{
						id: "sample_yespartial",
						label: "Partial / coupon",
						value: "Partial"
					},
					{
						id: "sample_no",
						label: "No",
						value: "No"
					}
				]
			},
			{
				id: "sample_avail",
				label: "Sample availability",
				kind: "text"
			},
			{
				id: "possible_solution",
				label: "Customer's ideas / possible solution",
				kind: "text"
			},
			{
				id: "roadmap1",
				label: "Next step 1",
				kind: "text",
				placeholder: "Who does what by when"
			},
			{
				id: "roadmap2",
				label: "Next step 2",
				kind: "text"
			},
			{
				id: "roadmap3",
				label: "Next step 3",
				kind: "text"
			},
			{
				id: "contacts_cadence",
				label: "Primary contacts, cadence & channel",
				kind: "textarea"
			}
		]
	}
];
var COMPASS_FIELDS = [
	{
		group: "Readiness",
		fields: [
			{
				id: "ai_ready",
				label: "Stage gates",
				kind: "checks",
				options: [
					{
						id: "ai_checkup_done",
						label: "Check-up done"
					},
					{
						id: "ai_feasibility_done",
						label: "Feasibility done"
					},
					{
						id: "ai_model_ready",
						label: "Model ready"
					}
				]
			},
			{
				id: "ai_system_type",
				label: "System type (brand, model)",
				kind: "text"
			},
			{
				id: "ai_system_count",
				label: "Number of systems",
				kind: "text"
			},
			{
				id: "ai_acq_freq",
				label: "Image acquisition frequency",
				kind: "text"
			},
			{
				id: "ai_retrofit",
				label: "Retrofit / upgrade planned?",
				kind: "radio",
				options: [{
					id: "ai_retrofit_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_retrofit_no",
					label: "No",
					value: "No"
				}]
			}
		]
	},
	{
		group: "Images",
		fields: [
			{
				id: "ai_img_format",
				label: "Image format",
				kind: "text",
				placeholder: "DICONDE, TIFF, raw…"
			},
			{
				id: "ai_img_size",
				label: "Image size [MB]",
				kind: "text"
			},
			{
				id: "ai_binning",
				label: "Binning",
				kind: "radio",
				options: [{
					id: "ai_binning_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_binning_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_binning_factor",
				label: "Binning factor",
				kind: "text"
			},
			{
				id: "ai_bit",
				label: "Bit depth",
				kind: "radio",
				options: [
					{
						id: "ai_bit_16",
						label: "16-bit",
						value: "16"
					},
					{
						id: "ai_bit_14",
						label: "14-bit",
						value: "14"
					},
					{
						id: "ai_bit_other",
						label: "Other",
						value: "Other"
					}
				]
			},
			{
				id: "ai_bit_other_txt",
				label: "Other bit depth",
				kind: "text"
			},
			{
				id: "ai_nok_rate",
				label: "NOK rate",
				kind: "text"
			},
			{
				id: "ai_overlay",
				label: "Overlay / annotation today",
				kind: "radio",
				options: [{
					id: "ai_overlay_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_overlay_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_repr",
				label: "Images representative of production",
				kind: "radio",
				options: [{
					id: "ai_repr_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_repr_no",
					label: "No",
					value: "No"
				}]
			}
		]
	},
	{
		group: "Parts & defects",
		fields: [
			{
				id: "ai_part_types",
				label: "Part types",
				kind: "text"
			},
			{
				id: "ai_part_material",
				label: "Material",
				kind: "text"
			},
			{
				id: "ai_defect_types",
				label: "Defect types",
				kind: "textarea"
			},
			{
				id: "ai_defect_classes",
				label: "Defect classes / labels",
				kind: "textarea"
			},
			{
				id: "ai_views_count",
				label: "Views per part",
				kind: "text"
			},
			{
				id: "ai_views",
				label: "View geometry",
				kind: "checks",
				options: [{
					id: "ai_views_static",
					label: "Static views"
				}, {
					id: "ai_views_variable",
					label: "Variable / recipe views"
				}]
			},
			{
				id: "ai_part_variants",
				label: "Part variants",
				kind: "text"
			},
			{
				id: "ai_current_process",
				label: "Current review process",
				kind: "textarea"
			}
		]
	},
	{
		group: "COMPASS mode",
		fields: [
			{
				id: "ai_mode",
				label: "Mode interest",
				kind: "checks",
				options: [
					{
						id: "ai_compass_assist",
						label: "Assist"
					},
					{
						id: "ai_compass_copilot",
						label: "Copilot"
					},
					{
						id: "ai_compass_auto",
						label: "Auto"
					},
					{
						id: "ai_compass_compliance",
						label: "Compliance"
					}
				]
			},
			{
				id: "ai_inline",
				label: "Inline / PLC",
				kind: "radio",
				options: [{
					id: "ai_inline_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_inline_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_inline_protocol",
				label: "Protocol",
				kind: "text"
			},
			{
				id: "ai_plc_info",
				label: "PLC / MES notes",
				kind: "textarea"
			},
			{
				id: "ai_ideal_workflow",
				label: "Ideal workflow",
				kind: "textarea"
			}
		]
	},
	{
		group: "Archive & IT",
		fields: [
			{
				id: "ai_archive",
				label: "Archive results",
				kind: "radio",
				options: [{
					id: "ai_archive_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_archive_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_archive_where",
				label: "Where",
				kind: "text"
			},
			{
				id: "ai_arch_what",
				label: "What to keep",
				kind: "checks",
				options: [
					{
						id: "ai_arch_image",
						label: "Image"
					},
					{
						id: "ai_arch_result",
						label: "Result"
					},
					{
						id: "ai_arch_seg",
						label: "Segmentation"
					},
					{
						id: "ai_arch_other",
						label: "Other"
					}
				]
			},
			{
				id: "ai_arch_duration",
				label: "Retention",
				kind: "text"
			},
			{
				id: "ai_inet",
				label: "Internet on the cell",
				kind: "radio",
				options: [{
					id: "ai_inet_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_inet_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_remote",
				label: "Remote access",
				kind: "radio",
				options: [{
					id: "ai_remote_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_remote_no",
					label: "No",
					value: "No"
				}]
			},
			{
				id: "ai_remote_tool",
				label: "Remote tool",
				kind: "text"
			},
			{
				id: "ai_linux",
				label: "Linux allowed on cell PC",
				kind: "radio",
				options: [{
					id: "ai_linux_ok_yes",
					label: "Yes",
					value: "Yes"
				}, {
					id: "ai_linux_ok_no",
					label: "No",
					value: "No"
				}]
			}
		]
	}
];
var SCRIPT = {
	opening: "Welcome and thanks for taking the time. I cover industrial X-ray and CT inspection systems. I'm here to understand your challenges and see how we might help.",
	intros: "Perhaps we can start with some quick intros and what you're hoping to get out of this call?",
	transition: "Thanks for the context. To focus on what matters most, I'd like to ask some targeted questions. Sound good?",
	close: "Never end a call without a scheduled next action. Follow-up email within two hours."
};
[...COVER_FIELDS.filter((f) => f.critical).map((f) => f.id), ...QUESTIONS.flatMap((q) => [q.notesId, ...q.fields.filter((f) => f.critical).map((f) => f.id)])];
var KEY = "discovery-kit-profile-v1";
var PROFILE_EVENT = "discovery-kit-profile";
var DEFAULT_PROFILE = {
	owner: "",
	org: "",
	roleLine: "Industrial X-ray / CT",
	opening: "Welcome and thanks for taking the time. I cover industrial X-ray and CT inspection systems. I'm here to understand your challenges and see how we might help.",
	intros: SCRIPT.intros,
	transition: SCRIPT.transition
};
function loadProfile() {
	if (typeof window === "undefined") return DEFAULT_PROFILE;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return { ...DEFAULT_PROFILE };
		const p = JSON.parse(raw);
		return {
			...DEFAULT_PROFILE,
			...p
		};
	} catch {
		return { ...DEFAULT_PROFILE };
	}
}
function saveProfile(p) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify(p));
	window.dispatchEvent(new Event(PROFILE_EVENT));
}
function displayOrg(p = loadProfile()) {
	return p.org.trim() || p.roleLine;
}
function displayOwner(p = loadProfile(), dealOwner) {
	const fromDeal = (dealOwner || "").trim();
	const fromProfile = p.owner.trim();
	return fromDeal || fromProfile || "[Your name]";
}
var STORAGE_KEY = "vcxray-discovery-v1";
function defaults() {
	return {
		sales_owner: (typeof window === "undefined" ? { owner: "" } : loadProfile()).owner || "",
		call_date: todayISO()
	};
}
function blankDeal() {
	return {
		id: uid(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
		values: defaults()
	};
}
var useDealStore = create()((set, get) => ({
	hydrated: false,
	deals: [],
	activeId: null,
	setHydrated: (v) => set({ hydrated: v }),
	replaceAll: (deals, activeId) => set({
		deals,
		activeId,
		hydrated: true
	}),
	active: () => {
		const s = get();
		return s.deals.find((d) => d.id === s.activeId) ?? s.deals[0];
	},
	get: (id) => {
		const v = get().active()?.values[id];
		return typeof v === "string" ? v : "";
	},
	checked: (id) => get().active()?.values[id] === true,
	setValue: (id, value) => {
		const s = get();
		let deals = s.deals;
		let activeId = s.activeId;
		if (!deals.length || !activeId) {
			const d = blankDeal();
			deals = [d];
			activeId = d.id;
		}
		set({
			activeId,
			deals: deals.map((d) => d.id === activeId ? {
				...d,
				updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
				values: {
					...d.values,
					[id]: value
				}
			} : d)
		});
	},
	newDeal: () => {
		const d = blankDeal();
		set((s) => ({
			deals: [d, ...s.deals],
			activeId: d.id
		}));
	},
	duplicateDeal: () => {
		const src = get().active();
		if (!src) return get().newDeal();
		const d = {
			...src,
			id: uid(),
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			values: { ...src.values }
		};
		set((s) => ({
			deals: [d, ...s.deals],
			activeId: d.id
		}));
	},
	deleteDeal: (id) => {
		set((s) => {
			const deals = s.deals.filter((d) => d.id !== id);
			return {
				deals,
				activeId: s.activeId === id ? deals[0]?.id ?? null : s.activeId
			};
		});
	},
	setActive: (id) => set({ activeId: id }),
	importFields: (fields, merge = true) => {
		const flat = {};
		Object.entries(fields).forEach(([k, v]) => {
			if (v === null || v === void 0) return;
			if (typeof v === "boolean") flat[k] = v;
			else if (typeof v === "number") flat[k] = String(v);
			else if (typeof v === "string") flat[k] = v;
		});
		const s = get();
		if (!s.activeId || !s.deals.length) {
			const d = blankDeal();
			d.values = {
				...d.values,
				...flat
			};
			set({
				deals: [d, ...s.deals],
				activeId: d.id
			});
			return;
		}
		set({ deals: s.deals.map((d) => d.id === s.activeId ? {
			...d,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			values: merge ? {
				...d.values,
				...flat
			} : {
				...defaults(),
				...flat
			}
		} : d) });
	},
	clearActive: () => {
		const s = get();
		if (!s.activeId) return;
		set({ deals: s.deals.map((d) => d.id === s.activeId ? {
			...d,
			updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
			values: defaults()
		} : d) });
	}
}));
function loadDealsFromStorage() {
	if (typeof window === "undefined") return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			const deals = parsed.deals ?? parsed.state?.deals ?? [];
			const activeId = parsed.activeId ?? parsed.state?.activeId ?? deals[0]?.id ?? null;
			if (deals.length) {
				useDealStore.getState().replaceAll(deals, activeId);
				return;
			}
		}
	} catch {}
	const s = useDealStore.getState();
	if (!s.deals.length) s.newDeal();
	s.setHydrated(true);
}
function saveDealsToStorage() {
	if (typeof window === "undefined") return;
	const { deals, activeId, hydrated } = useDealStore.getState();
	if (!hydrated) return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			deals,
			activeId
		}));
	} catch {}
}
function allValues() {
	return useDealStore.getState().active()?.values ?? {};
}
function v(id) {
	const val = allValues()[id];
	return typeof val === "string" ? val : "";
}
function on(id) {
	return allValues()[id] === true;
}
function filled(id, kind) {
	const v = allValues()[id];
	if (kind === "checks") return v === true;
	if (kind === "radio") return typeof v === "string" && v.length > 0;
	if (typeof v === "boolean") return v;
	return typeof v === "string" && v.trim().length > 0;
}
function criticalList() {
	const out = [];
	for (const f of COVER_FIELDS) if (f.critical) out.push({
		id: f.id,
		label: f.label
	});
	for (const q of QUESTIONS) {
		out.push({
			id: q.notesId,
			label: `${q.num} notes`
		});
		for (const f of q.fields) if (f.critical) out.push({
			id: f.id,
			label: f.label
		});
	}
	return out;
}
function computeProgress() {
	if (!useDealStore.getState().hydrated) return {
		pct: 0,
		filled: 0,
		total: criticalList().length,
		missing: criticalList()
	};
	const crit = criticalList();
	const missing = crit.filter((c) => !filled(c.id));
	const filledN = crit.length - missing.length;
	return {
		pct: crit.length ? Math.round(filledN / crit.length * 100) : 0,
		filled: filledN,
		total: crit.length,
		missing
	};
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,box-shadow,opacity,transform] duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:bg-accent/90 shadow-[0_0_0_1px_rgba(77,124,255,0.35)]",
			secondary: "bg-elevated text-fg shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-elevated/80",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated hover:border-border-strong",
			danger: "bg-danger text-fg hover:bg-danger/90",
			success: "bg-success text-fg hover:bg-success/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-11 rounded-lg px-5",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function Progress({ value = 0, className }) {
	const pct = Math.max(0, Math.min(100, value));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 w-full overflow-hidden rounded-full bg-elevated", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-accent transition-[width] duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
			style: { width: `${pct}%` }
		})
	});
}
var Sheet = Dialog;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-bg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(292px,88vw)] flex-col bg-panel shadow-[var(--shadow-elevated)]", side === "left" ? "left-0 top-0" : "right-0 top-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute right-3 top-3 text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function TooltipProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration: 250,
		children
	});
}
var GLOSSARY = [
	{
		"id": "g1",
		"title": "1. Modalities & Methods",
		"entries": [
			{
				"term": "NDT / NDE",
				"def": "Non-Destructive Testing / Evaluation. Umbrella term for inspection without damaging the part (RT, UT, MT, PT, ET, VT)."
			},
			{
				"term": "RT",
				"def": "Radiographic Testing; X-ray or gamma, the NDT method this workbook is about."
			},
			{
				"term": "DR / 2D DR",
				"def": "Digital Radiography; fast single-shot, no depth info. Best for FOD, welds, inline sorting."
			},
			{
				"term": "CR",
				"def": "Computed Radiography; image plate + scanner, bridge between film and DDA. Slower, lower resolution than DR."
			},
			{
				"term": "CT / 3D CT",
				"def": "Computed Tomography; full 360° volume reconstruction. Metrology + internal defects, slower than 2D."
			},
			{
				"term": "2.5D / CL",
				"def": "Computed Laminography; limited rotation (±20–40°), separates layers in flat parts (PCBs, panels)."
			},
			{
				"term": "4D CT",
				"def": "CT over time or under load. In-situ crack growth, thermal cycling studies."
			},
			{
				"term": "In-situ CT",
				"def": "CT while part is under mechanical/thermal/chemical stress. Research & material science."
			},
			{
				"term": "Helical / Helix CT",
				"def": "Continuous spiral scan; tall parts, higher throughput vs. step-and-shoot."
			},
			{
				"term": "Offset CT",
				"def": "Detector offset to double the effective FOV. For oversized parts."
			},
			{
				"term": "Fan-beam vs. Cone-beam",
				"def": "Fan = slice-by-slice via line detector (less scatter, slower). Cone = volumetric via flat panel (faster, more scatter)."
			},
			{
				"term": "FDK (Feldkamp)",
				"def": "Default cone-beam reconstruction algorithm (filtered back-projection variant)."
			},
			{
				"term": "FBP",
				"def": "Filtered back-projection; fast, noisier baseline CT algorithm."
			},
			{
				"term": "Iterative Recon (ART / SART / MBIR)",
				"def": "Family of CT reconstruction algorithms that refine the 3D volume estimate through repeated passes, unlike filtered back-projection (FBP/FDK) which is a single-pass calculation. Iterative methods handle noisy, incomplete, or limited-projection data significantly better, at the cost of more computation time."
			},
			{
				"term": "AI Recon",
				"def": "Learned denoise / sparse-view reconstruction; faster + cleaner, emerging standard."
			}
		]
	},
	{
		"id": "g2",
		"title": "2. X-Ray Sources & Physics",
		"entries": [
			{
				"term": "kV / kVp",
				"def": "Tube voltage / peak kilovoltage = penetration. Higher kV = thicker/denser material, lower contrast."
			},
			{
				"term": "mA / Power (W)",
				"def": "Tube current = flux. More mA = more photons, better SNR, more heat."
			},
			{
				"term": "Exposure",
				"def": "mA × time = total signal dose delivered to detector."
			},
			{
				"term": "Focal Spot (f)",
				"def": "Source size. Small = sharp + low power; large = power + blur."
			},
			{
				"term": "Focus types (nano/micro/mini/meso/macro)",
				"def": "From <1 µm (nano, research) through µm (micro) to hundreds of µm (meso/macro, high-power)."
			},
			{
				"term": "Reflection Target",
				"def": "Standard tube type; high power, large focal spot."
			},
			{
				"term": "Transmission Target",
				"def": "Microfocus tube type; focal spot <5 µm, low power."
			},
			{
				"term": "LINAC",
				"def": "Linear accelerator; accelerates electrons to generate high-energy X-rays. Industrial range broadly 1–15+ MeV; diondo d7 offers 3 / 6 / 9 MeV. Required only for very thick or very dense cross-sections where kV systems cannot penetrate. Do not default to LINAC for titanium at normal thicknesses — confirm with applications engineering."
			},
			{
				"term": "Filtration",
				"def": "Cu/Al added; hardens beam, cuts low-energy scatter, reduces dose."
			},
			{
				"term": "Dual Energy",
				"def": "Two kV spectra; material discrimination, better FOD contrast."
			},
			{
				"term": "COMET",
				"def": "Swiss X-ray tube manufacturer; VCxray's standard partner for 160–450 kV tubes."
			},
			{
				"term": "Beam Hardening",
				"def": "False density gradients (cupping/streaks) from polychromatic beam absorbed unevenly."
			},
			{
				"term": "JIMA",
				"def": "Japan Inspection Instruments Manufacturers' Association; standard resolution target for microfocus tubes."
			}
		]
	},
	{
		"id": "g3",
		"title": "3. Detectors & Image Chain",
		"entries": [
			{
				"term": "DDA / FPD",
				"def": "Digital Detector Array / Flat-Panel Detector; CMOS or a-Si based."
			},
			{
				"term": "a-Si (detector)",
				"def": "Amorphous silicon; large active area, high DQE, robust at high energies."
			},
			{
				"term": "CMOS (detector)",
				"def": "Fast, small pixel, high MTF; smaller active area than a-Si."
			},
			{
				"term": "Line detector",
				"def": "1D array; fan-beam, low scatter, slower than FPD. Used in d4/d5/d7."
			},
			{
				"term": "CsI Scintillator",
				"def": "Needle crystal structure; sharp, high MTF."
			},
			{
				"term": "GOS Scintillator",
				"def": "Gadolinium oxysulfide; brighter, cheaper, lower spatial resolution than CsI."
			},
			{
				"term": "Pixel Pitch",
				"def": "Detector element size; 50–200 µm typical."
			},
			{
				"term": "Bit Depth",
				"def": "14–16 bit = 16k–65k grey levels. More bits = more contrast steps."
			},
			{
				"term": "Imaging Chain",
				"def": "Tube + filter + part + detector combination; sizing balances penetration, resolution, throughput."
			},
			{
				"term": "Stitching / Subvolume",
				"def": "Combining multiple partial scans when part exceeds detector FOV."
			}
		]
	},
	{
		"id": "g4",
		"title": "4. Performance Metrics & Geometry",
		"entries": [
			{
				"term": "M = SDD/SOD",
				"def": "Geometric magnification. Higher M = higher resolution, more blur risk, smaller FOV."
			},
			{
				"term": "SDD",
				"def": "Source-to-detector distance."
			},
			{
				"term": "SOD",
				"def": "Source-to-object distance."
			},
			{
				"term": "Ug = f(M−1)",
				"def": "Geometric unsharpness; keep below detector resolution."
			},
			{
				"term": "EPS / SRb",
				"def": "Effective Pixel Size / Basic Spatial Resolution; true system resolution at part plane."
			},
			{
				"term": "Voxel Size",
				"def": "3D pixel; CT resolution set by magnification and detector pitch."
			},
			{
				"term": "VOI",
				"def": "Volume Of Interest; sub-region within a CT dataset for targeted analysis."
			},
			{
				"term": "MTF",
				"def": "Modulation Transfer Function; sharpness vs. spatial frequency."
			},
			{
				"term": "DQE",
				"def": "Detective Quantum Efficiency; low-dose performance benchmark."
			},
			{
				"term": "SNR",
				"def": "Signal-to-Noise Ratio; ≥5 to detect, ≥20 to measure."
			},
			{
				"term": "CNR",
				"def": "Contrast-to-Noise Ratio; defect visibility metric, often more important than SNR in practice."
			},
			{
				"term": "Contrast Sensitivity",
				"def": "Smallest % thickness change visible; per ASTM E2698."
			},
			{
				"term": "Dynamic Range",
				"def": "Ratio of brightest to darkest level captured without saturation."
			},
			{
				"term": "IQI",
				"def": "Image Quality Indicator; wire/duplex reference for daily performance check (see Appendix C for 2-2T / 1-2T details)."
			},
			{
				"term": "POD",
				"def": "Probability of Detection; a90/95 is aerospace gold standard."
			}
		]
	},
	{
		"id": "g5",
		"title": "5. Defects & Features",
		"entries": [
			{
				"term": "Cracks",
				"def": "Planar, orientation-sensitive; hardest to detect in 2D. CT sees all angles."
			},
			{
				"term": "Gas Porosity",
				"def": "Round low-density voids; trapped gas during solidification or welding."
			},
			{
				"term": "Shrinkage Porosity",
				"def": "Dendritic/irregular voids; solidification shrinkage in castings."
			},
			{
				"term": "Keyhole Porosity",
				"def": "AM-specific; spherical, from high-energy laser/e-beam process."
			},
			{
				"term": "Lack of Fusion (LoF)",
				"def": "AM + weld critical; planar gap, worst-case for 2D orientation."
			},
			{
				"term": "Cold Lap / Misrun",
				"def": "Casting flow defect; premature solidification, linear seam or underfill."
			},
			{
				"term": "Inclusions",
				"def": "Embedded foreign material; slag, oxides, tungsten in welds."
			},
			{
				"term": "Delamination",
				"def": "Layer separation in composites, PCBs, laminates."
			},
			{
				"term": "FOD",
				"def": "Foreign Object Debris; metallic/non-metallic contamination inside assembly."
			},
			{
				"term": "Wire Sweep / Solder Voids",
				"def": "Electronics; bond wire displaced or solder joint void."
			},
			{
				"term": "Wall Thickness Analysis",
				"def": "Colour map of min/max wall; replaces destructive sectioning."
			},
			{
				"term": "Porosity Analysis",
				"def": "Automated void characterization & statistics."
			}
		]
	},
	{
		"id": "g6",
		"title": "6. Artifacts (CT Image Problems)",
		"entries": [
			{
				"term": "Ring Artifacts",
				"def": "Concentric rings in CT; detector pixel gain/offset calibration drift."
			},
			{
				"term": "Metal Streaking / Starburst",
				"def": "Lines from dense material; photon starvation in projection."
			},
			{
				"term": "MAR",
				"def": "Metal Artifact Reduction algorithm; reduces starburst streaks from dense inserts."
			},
			{
				"term": "Scatter Fog",
				"def": "Contrast loss across image; cone-beam geometry, thick/large parts."
			},
			{
				"term": "Scatter Correction / diScatter",
				"def": "Restores contrast lost in cone-beam CT due to secondary photons."
			},
			{
				"term": "Aliasing",
				"def": "Jagged edges / false features from too few projections (undersampling)."
			},
			{
				"term": "Truncation",
				"def": "Part larger than detector FOV; clips projections, distorts reconstruction."
			},
			{
				"term": "Motion Blur",
				"def": "Part shifts during exposure; manipulator vibration or loose fixturing."
			},
			{
				"term": "Calibration Drift",
				"def": "Detector gain/geometry change over time; auto-cal routines mitigate."
			}
		]
	},
	{
		"id": "g7",
		"title": "7. Software, Automation & Integration",
		"entries": [
			{
				"term": "ADR",
				"def": "Automated Defect Recognition; rules-based, consistent pass/fail."
			},
			{
				"term": "ATR / AI-ADR",
				"def": "AI-assisted defect detection; reduces false-call rate vs. threshold-only ADR."
			},
			{
				"term": "x.OS",
				"def": "VisiConsult's unified operating suite (PRO line & X line); acquisition, CT, ADR, reporting in one UI."
			},
			{
				"term": "Xplus / VC.acquire / VC.review",
				"def": "VisiConsult image processing modules (ECO and PRO)."
			},
			{
				"term": "diControl",
				"def": "diondo CT software suite; Helix, Batch, Daily Check, Health Monitor, Metrology VDI/VDE 2630-1.3."
			},
			{
				"term": "Recipe / Part Program",
				"def": "Stored scan parameters (kV, mA, geometry, filter, integration) for a specific part."
			},
			{
				"term": "CAD Comparison",
				"def": "Nominal/actual deviation map; CT surface vs. imported CAD."
			},
			{
				"term": "GD&T",
				"def": "Geometric Dimensioning & Tolerancing; per ASME Y14.5 on internal features."
			},
			{
				"term": "Surface Determination",
				"def": "Defines iso-surface for metrology; ISO 50% or adaptive threshold."
			},
			{
				"term": "Digital Twin",
				"def": "Virtual system for recipe optimisation before physical scan."
			},
			{
				"term": "DICONDE",
				"def": "NDT DICOM standard; traceability, PACS archive, regulatory compliance (ASTM E2767 / E2738)."
			},
			{
				"term": "MES",
				"def": "Manufacturing Execution System; real-time shop-floor control (work orders, recipes, operator tracking, SPC)."
			},
			{
				"term": "ERP",
				"def": "Enterprise Resource Planning; company-wide business system (SAP, Oracle, Dynamics). Integrates with MES for automated quality records."
			},
			{
				"term": "OPC-UA",
				"def": "Open Platform Communications Unified Architecture (IEC 62541); secure industrial M2M protocol used by VisiConsult for MES/ERP/PLC integration."
			},
			{
				"term": "SPC",
				"def": "Statistical Process Control; feeds pass/fail + measurements to track process capability over time."
			},
			{
				"term": "NDE 4.0",
				"def": "Connected, data-driven inspection; SPC feedback, remote monitoring, AI-assisted review."
			}
		]
	},
	{
		"id": "g8",
		"title": "8. Metrology & Reference",
		"entries": [
			{
				"term": "VDI/VDE 2630-1.3",
				"def": "German metrology guideline for CT-based coordinate measurement; basis for MPE (Maximum Permissible Error) specifications."
			},
			{
				"term": "CMM",
				"def": "Coordinate Measuring Machine; traditional contact/tactile metrology; CT is the non-destructive complement for internal features."
			},
			{
				"term": "MPE",
				"def": "Maximum Permissible Error; e.g. MPE"
			},
			{
				"term": "FAI",
				"def": "First Article Inspection; complete dimensional verification of the first production part against drawings."
			},
			{
				"term": "Nominal / Actual",
				"def": "Drawing spec vs. measured result (used in CAD comparison deviation maps)."
			}
		]
	},
	{
		"id": "g9",
		"title": "9. Hardware & Mechanical",
		"entries": [
			{
				"term": "C-arm Geometry",
				"def": "Source/detector rotates around stationary part; for large/heavy assemblies, MRO."
			},
			{
				"term": "Manipulator",
				"def": "Multi-axis motion platform positioning part between source and detector. Granite-based on diondo, heavy-duty industrial on PRO line."
			},
			{
				"term": "Fixture / Part Holder",
				"def": "Custom mount keeping part stable and repeatably positioned during scan."
			},
			{
				"term": "Cabinet vs. Walk-in Vault",
				"def": "Cabinet = enclosed, FDA-regulated (21 CFR 1020.40). Vault = permanent shielded room, state-regulated."
			},
			{
				"term": "TÜV",
				"def": "German technical inspection association; certifies cabinet safety compliance."
			},
			{
				"term": "CE",
				"def": "Conformité Européenne; EU declaration of compliance (safety, EMC, etc.)."
			}
		]
	},
	{
		"id": "g10",
		"title": "10. Radiation Safety",
		"entries": [
			{
				"term": "ALARA",
				"def": "As Low As Reasonably Achievable; dose optimisation principle."
			},
			{
				"term": "RSO",
				"def": "Radiation Safety Officer; designated person responsible for the radiation-safety program at a facility (required under 10 CFR / state rules for permanent installations)."
			},
			{
				"term": "mR / mrem / mSv",
				"def": "Exposure and dose units. 1 rem = 10 mSv = 1000 mrem. Cabinet limit: 0.5 mR integrated over any 1 hour at 5 cm (21 CFR 1020.40)."
			},
			{
				"term": "Agreement State",
				"def": "U.S. state (40 as of Oct 2025) with authority from NRC to regulate radioactive material use in its borders."
			},
			{
				"term": "Interlock",
				"def": "Safety switch that disables x-rays when door/barrier is opened; required in cabinets and vaults."
			},
			{
				"term": "Dose Rate",
				"def": "Radiation intensity at a point (mR/hr or µSv/hr); drives area posting category."
			}
		]
	},
	{
		"id": "g11",
		"title": "11. Applications & Industries",
		"entries": [
			{
				"term": "AM",
				"def": "Additive Manufacturing (3D printing); high-value aerospace / medical parts where CT finds keyhole porosity and LoF."
			},
			{
				"term": "MRO",
				"def": "Maintenance, Repair, Overhaul; aerospace aftermarket where large/complex parts benefit from C-arm geometry."
			},
			{
				"term": "OEM",
				"def": "Original Equipment Manufacturer."
			},
			{
				"term": "Giga-casting",
				"def": "Single large aluminum structural casting (e.g. Tesla rear underbody); drives need for PRO FI Giga-class systems."
			},
			{
				"term": "Battery cell / tray",
				"def": "Lithium-ion cell interior (anode/cathode alignment, electrolyte fill); a core VCbattery focus."
			}
		]
	},
	{
		"id": "g12",
		"title": "12. Throughput & Operations",
		"entries": [
			{
				"term": "Takt Time",
				"def": "Production line pace; the clock you must beat for inline inspection."
			},
			{
				"term": "Cycle Time",
				"def": "Load + scan + recon + ADR + unload; must fit inside takt time."
			},
			{
				"term": "Throughput (PPH)",
				"def": "Parts Per Hour; inline typically >600, atline 30–120."
			},
			{
				"term": "OEE",
				"def": "Overall Equipment Effectiveness; availability × performance × quality. Sell for >95%."
			},
			{
				"term": "MTBF / MTTR",
				"def": "Mean Time Between Failures / Mean Time To Repair; underpins uptime claims."
			},
			{
				"term": "Uptime",
				"def": "Percentage of scheduled production time the system is available and running."
			},
			{
				"term": "FCR / POF",
				"def": "False Call Rate / Probability of False Alarm; key ADR objection. Target <2%."
			}
		]
	},
	{
		"id": "g13",
		"title": "13. Commercial & Logistics",
		"entries": [
			{
				"term": "RFQ",
				"def": "Request For Quotation; customer's formal request for pricing."
			},
			{
				"term": "PO",
				"def": "Purchase Order; customer's commitment triggering contract + production."
			},
			{
				"term": "SOW",
				"def": "Statement Of Work; scope document defining deliverables, milestones, exclusions."
			},
			{
				"term": "CAPEX / OPEX",
				"def": "Capital Expenditure (purchase) vs. Operating Expenditure (maintenance, consumables, dose)."
			},
			{
				"term": "TCO",
				"def": "Total Cost of Ownership; CAPEX + OPEX over 5–7 yr (tube, power, service, cal)."
			},
			{
				"term": "ROI",
				"def": "Return On Investment; labour savings + scrap reduction + escapes avoided."
			},
			{
				"term": "LC",
				"def": "Letter of Credit; secure payment for first-time international buyers."
			},
			{
				"term": "FCA",
				"def": "Free Carrier (Incoterm); seller delivers to carrier + export clearance. Most common for VC systems."
			},
			{
				"term": "DAP",
				"def": "Delivered At Place; seller delivers ready for unloading, buyer handles import clearance."
			},
			{
				"term": "DPU",
				"def": "Delivered at Place Unloaded; seller delivers and unloads."
			},
			{
				"term": "DDP",
				"def": "Delivered Duty Paid; seller bears all costs incl. import duties. Highest seller obligation."
			},
			{
				"term": "HS Code",
				"def": "Harmonized System; 9022.19 for X-ray apparatus; drives duty rate."
			}
		]
	},
	{
		"id": "g14",
		"title": "14. Quality & Compliance Workflow",
		"entries": [
			{
				"term": "FAT",
				"def": "Factory Acceptance Test; customer sign-off at VisiConsult Germany / diondo before shipment."
			},
			{
				"term": "SAT",
				"def": "Site Acceptance Test; final acceptance at customer site, triggers warranty start."
			},
			{
				"term": "Application Study",
				"def": "Pre-sale feasibility: customer samples scanned to prove system meets their detection / metrology requirements before quote / contract."
			},
			{
				"term": "CAPA",
				"def": "Corrective And Preventive Action; formal process triggered by audit findings or NDT escapes."
			},
			{
				"term": "SLA",
				"def": "Service Level Agreement; 24/7 remote support, next-day parts, response time commitments."
			},
			{
				"term": "Traceability",
				"def": "Serial no. + recipe + operator + result archived in DICONDE."
			}
		]
	},
	{
		"id": "g15",
		"title": "15. U.S. Safety, Certification & Installation Terms",
		"entries": [
			{
				"term": "Radiation-Producing Machine",
				"def": "Device that generates ionizing radiation electrically, such as an X-ray tube system or accelerator. For these systems, state radiation-control programs are usually the practical regulatory interface."
			},
			{
				"term": "State Radiation-Control Program",
				"def": "State agency or program that registers, inspects, and regulates X-ray machines / radiation-producing machines. This is more directly relevant to cabinet/vault X-ray systems than Agreement State radioactive-material licensing."
			},
			{
				"term": "Agreement State",
				"def": "NRC agreement status for regulating certain radioactive materials. Important for sealed-source/gamma work, but for X-ray tube systems the state still regulates radiation-producing machines whether or not the “Agreement State” label is the main issue."
			},
			{
				"term": "UL Listing",
				"def": "Product or assembly listing by UL to an applicable safety standard. In custom industrial machinery, confirm whether the whole system, panel, component, or field evaluation is covered."
			},
			{
				"term": "NRTL",
				"def": "Nationally Recognized Testing Laboratory. OSHA-recognized organization that tests/certifies equipment to U.S. safety standards where NRTL approval is required."
			},
			{
				"term": "ETL / Intertek",
				"def": "Another NRTL mark often accepted similarly to UL when the certification scope and standard are appropriate."
			},
			{
				"term": "Field Evaluation",
				"def": "On-site evaluation by an NRTL or qualified body when a custom system does not carry a complete listing acceptable to the AHJ or customer."
			},
			{
				"term": "AHJ",
				"def": "Authority Having Jurisdiction. The entity that decides whether an installation satisfies local/electrical/building/radiation requirements."
			},
			{
				"term": "Shielding Plan Review",
				"def": "State or customer review of shielding calculations/layout before vault construction or high-energy installation."
			},
			{
				"term": "Radiation Survey",
				"def": "Measurement after installation or modification to verify dose rates at boundaries, doors, seams, and occupied areas."
			}
		]
	}
];
var SYSTEMS = [
	{
		id: "pro-h",
		line: "vcxray",
		name: "PRO H",
		short: "Compact premium cabinet",
		energy: "160 / 225 kV",
		maxDiaMm: 400,
		maxHeightMm: 600,
		maxWeightKg: 25,
		bestFor: "Small/medium parts, electronics, AM, fuzes, fine-detail DR/CT.",
		triggers: "Small part? High magnification? 225 kV enough? Small footprint?",
		picking: "Small parts / electronics / AM",
		tags: [
			"cabinet",
			"dr",
			"ct",
			"small",
			"am",
			"electronics"
		],
		source: "vc-xray.com/products/pro-line/pro-h — Ø400×600 mm, 25 kg"
	},
	{
		id: "eco-c",
		line: "vcxray",
		name: "ECO C",
		short: "Cost-optimized universal C-arm",
		energy: "160 / 225 / 320 / 450 kV",
		maxDiaMm: 700,
		maxHeightMm: 1200,
		maxWeightKg: 150,
		bestFor: "Manual/semi-auto inspection when the part fits and complexity is moderate.",
		triggers: "Budget-sensitive? Standardized workflow? Moderate envelope?",
		picking: "Budget-conscious, mid-envelope",
		tags: [
			"cabinet",
			"dr",
			"c-arm",
			"value"
		],
		source: "vc-xray.com/products/eco-line/eco-c — Ø700×1200 mm, 150 kg"
	},
	{
		id: "eco-r",
		line: "vcxray",
		name: "ECO R",
		short: "Robot-in-cabinet production",
		energy: "160 / 225 kV",
		maxDiaMm: 700,
		maxHeightMm: 1800,
		maxWeightKg: 30,
		bestFor: "Repeatable automated production inspection; manual or robotic load. Casting cells.",
		triggers: "Robotic handling? Repeatable recipes? Inline / at-line casting?",
		picking: "Automated production casting",
		tags: [
			"robot",
			"casting",
			"adr",
			"production",
			"inline"
		],
		source: "vc-xray.com/products/eco-line/eco-r — envelope range 700×400×1150 to 200×400×1800 mm, 30 kg",
		note: "Published envelope is a range, not a cylinder. Confirm manipulator travel with applications."
	},
	{
		id: "pro-c",
		line: "vcxray",
		name: "PRO C",
		short: "Flagship flexible C-arm",
		energy: "225 / 320 / 450 kV",
		maxDiaMm: 650,
		maxHeightMm: 900,
		maxWeightKg: 60,
		weightKgHigh: 600,
		bestFor: "Medium parts — aerospace, defense, welds, castings, composites. CT/ADR-ready. XL cabinet option exists — confirm envelope.",
		triggers: "Unknown future parts? 320/450 kV? Heavy parts? Flexible axes, CT later?",
		picking: "Flagship flexible / aerospace",
		tags: [
			"cabinet",
			"dr",
			"ct",
			"aerospace",
			"defense",
			"flexible",
			"450kv"
		],
		source: "vc-xray.com/products/pro-line/pro-c — Ø650×900 mm; .225 = 60 kg; .320/.450 = 600 kg",
		note: "PRO C.225 max 60 kg. PRO C.320 and .450 max 600 kg. XL is a larger cabinet — do not assume a bigger inspection envelope without applications."
	},
	{
		id: "pro-c-tl",
		line: "vcxray",
		name: "PRO C TL",
		short: "Top-loader for crane access",
		energy: "225 / 320 / 450 kV",
		maxDiaMm: 950,
		maxHeightMm: 1500,
		maxWeightKg: 600,
		bestFor: "Big/heavy castings or weldments loaded by overhead crane.",
		triggers: "Customer loads by crane? Heavy casting/weldment? Top access?",
		picking: "Crane-loaded heavy parts",
		tags: [
			"cabinet",
			"crane",
			"heavy",
			"casting",
			"450kv"
		],
		source: "vc-xray.com/products/pro-line/pro-c-tl — Ø950×1500 mm, 600 kg"
	},
	{
		id: "pro-fi",
		line: "vcxray",
		name: "PRO FI",
		short: "High-speed casting workhorse",
		energy: "160 / 225 kV",
		maxDiaMm: 1600,
		maxHeightMm: 500,
		maxWeightKg: 50,
		rectangular: {
			w: 1600,
			d: 1e3,
			h: 500
		},
		bestFor: "High-throughput casting inspection; manual or automatic; ADR-capable.",
		triggers: "Casting volume? Fast changeover? Table loading, ADR, takt time?",
		picking: "High-volume casting / ADR",
		tags: [
			"casting",
			"adr",
			"throughput",
			"inline",
			"production"
		],
		source: "vc-xray.com/products/pro-line/pro-fi — 1600×1000×500 mm, 50 kg",
		note: "Envelope is a table volume (L×W×H), not a rotary cylinder."
	},
	{
		id: "x-line",
		line: "vcxray",
		name: "X-line / Giga / vault",
		short: "Custom gantry, vault, giga-casting",
		energy: "Project-specific / LINAC",
		maxDiaMm: 0,
		maxHeightMm: 0,
		maxWeightKg: 0,
		custom: true,
		bestFor: "Giga-castings, battery trays, custom gantries/vaults, inline automation, MeV concepts.",
		triggers: "Outside cabinet envelope? Large automation cell? MeV / gantry / vault?",
		picking: "Giga-casting / custom",
		tags: [
			"custom",
			"linac",
			"vault",
			"giga",
			"gantry",
			"high-energy"
		],
		source: "Project-specific. Do not quote a catalog envelope."
	},
	{
		id: "software",
		line: "vcxray",
		name: "Software / Service",
		short: "Acquire, review, COMPASS, retrofit",
		energy: "N/A",
		maxDiaMm: 0,
		maxHeightMm: 0,
		maxWeightKg: 0,
		custom: true,
		bestFor: "vc.acquire / vc.review, DICONDE, COMPASS/ADR, retrofit, training, qualification, lifecycle.",
		triggers: "Software, service, retrofit, DICONDE, COMPASS, archive?",
		picking: "Software / service / retrofit",
		tags: [
			"software",
			"compass",
			"adr",
			"diconde",
			"retrofit",
			"service"
		],
		source: "Software/service path — not a cabinet."
	},
	{
		id: "dsubu",
		line: "diondo",
		name: "dsubµ",
		short: "Sub-micron research CT",
		energy: "Low-kV optical / sub-µ class",
		maxDiaMm: 5,
		maxHeightMm: 50,
		maxWeightKg: 1,
		bestFor: "Sub-micron research: composites, foams, wood/bone.",
		triggers: "Research resolution below 1 µm?",
		picking: "Sub-micron research",
		tags: [
			"ct",
			"research",
			"micro",
			"composites"
		],
		source: "Starting filter only — confirm current diondo d sub µ datasheet before quote.",
		note: "Public pages vary. Treat as research-class, not production envelope."
	},
	{
		id: "d1",
		line: "diondo",
		name: "d1",
		short: "High-res µCT",
		energy: "190–240 kV class",
		maxDiaMm: 470,
		maxHeightMm: 600,
		maxWeightKg: 20,
		scanDiaMm: 450,
		scanHeightMm: 400,
		bestFor: "High-res µCT, AM, battery cells, composites.",
		triggers: "AM + battery R&D? High magnification CT?",
		picking: "AM + battery R&D",
		tags: [
			"ct",
			"am",
			"battery",
			"micro",
			"metrology"
		],
		source: "diondo.com/en/products/diondo-d1 — sample Ø470×H600; scan Ø450×H400; 20 kg",
		note: "Sample can be larger than the scan volume. CT coverage is Ø450×H400 mm."
	},
	{
		id: "d2",
		line: "diondo",
		name: "d2",
		short: "Small-medium production CT",
		energy: "Reflection 240/300/320 kV; transmission 190–240 kV",
		maxDiaMm: 520,
		maxHeightMm: 750,
		maxWeightKg: 50,
		scanDiaMm: 520,
		scanHeightMm: 650,
		bestFor: "Small-medium parts, connectors, Al castings, metrology.",
		triggers: "Production metrology on small-medium parts?",
		picking: "Production metrology",
		tags: [
			"ct",
			"metrology",
			"casting",
			"production"
		],
		source: "diondo.com/en/products/diondo-d2 — sample Ø520×H750; scan Ø520×H650; 50 kg",
		note: "Scan height is 650 mm; sample size is Ø520×H750 mm."
	},
	{
		id: "d3",
		line: "diondo",
		name: "d3",
		short: "Flexible CT, compact footprint",
		energy: "µF 190–320 kV; mini/meso 450 kV",
		maxDiaMm: 600,
		maxHeightMm: 870,
		maxWeightKg: 100,
		scanDiaMm: 650,
		scanHeightMm: 1500,
		bestFor: "Flexible industrial CT in a compact cell — dual-tube option, 100 kg.",
		triggers: "Need CT flexibility without a d5 footprint?",
		picking: "Compact flexible CT",
		tags: [
			"ct",
			"metrology",
			"dual-tube",
			"450kv"
		],
		source: "diondo.com/en/products/diondo-d3 — sample Ø600×H870; micro scan Ø600×900; mini/meso Ø650×1500; 100 kg",
		note: "Sample size is Ø600×H870 mm. Mini/meso scan volume is published larger — confirm fixturing with applications."
	},
	{
		id: "d4",
		line: "diondo",
		name: "d4",
		short: "High-energy industrial CT",
		energy: "450 / 500 / 600 kV",
		maxDiaMm: 670,
		maxHeightMm: 1e3,
		maxWeightKg: 50,
		scanDiaMm: 600,
		scanHeightMm: 900,
		bestFor: "Cylinder heads, crankcases, turbine blades, dense cast iron.",
		triggers: "Cylinder heads / ICE / dense cast iron?",
		picking: "Cylinder heads / ICE",
		tags: [
			"ct",
			"450kv",
			"600kv",
			"dense",
			"turbine",
			"casting"
		],
		source: "diondo.com/en/products/diondo-d4 — sample Ø670×H1000; scan Ø600×H900 or Ø750×H800; 50 kg",
		note: "Scan volume is config-dependent (Ø600×H900 or Ø750×H800). Sample can be Ø670×H1000."
	},
	{
		id: "d5",
		line: "diondo",
		name: "d5",
		short: "Universal flagship CT",
		energy: "µF 190–320 kV + mini/meso 450–600 kV",
		maxDiaMm: 1200,
		maxHeightMm: 2e3,
		maxWeightKg: 350,
		scanDiaMm: 1100,
		scanHeightMm: 1500,
		bestFor: "Universal flagship — granite manipulator, dual-tube options.",
		triggers: "Flagship all-purpose? Dual-tube? Tall envelope?",
		picking: "Flagship all-purpose",
		tags: [
			"ct",
			"metrology",
			"flagship",
			"dual-tube",
			"600kv"
		],
		source: "diondo.com/en/products/diondo-d5 — scan vol. mini/meso Ø1100×H1500; sample up to Ø1200×H2000; 100/250/350 kg",
		note: "Use 1100×1500 as the practical scan-volume filter. Sample size can be larger than scan volume. Weight is config-dependent (100 / 250 / 350 kg)."
	},
	{
		id: "d7",
		line: "diondo",
		name: "d7",
		short: "Linac-CT 3 / 6 / 9 MeV",
		energy: "Linac 3 / 6 / 9 MeV",
		maxDiaMm: 1e3,
		maxHeightMm: 1e3,
		maxWeightKg: 200,
		bestFor: "Very thick/dense cross-sections — thick copper, large-section steel, rocket motors, turbines.",
		triggers: "Thickness exceeds practical 450–600 kV? MeV required?",
		picking: "Thick steel / turbines / motors",
		tags: [
			"ct",
			"linac",
			"mev",
			"high-energy",
			"dense",
			"defense"
		],
		source: "diondo.com/en/products/diondo-d7 — FPD Ø700×H1000; line detector Ø1000×H1000; 200 kg",
		note: "Line-detector envelope is larger in diameter than FPD. Confirm detector path."
	}
];
var SOFTWARE_STACK = [
	{
		name: "vc.acquire",
		detail: "Acquisition and recipe control"
	},
	{
		name: "vc.review",
		detail: "Image review, analysis, reporting"
	},
	{
		name: "COMPASS / ADR",
		detail: "Automated defect recognition"
	},
	{
		name: "DICONDE",
		detail: "Compliant archival and traceability"
	},
	{
		name: "OPC-UA / MES",
		detail: "Factory integration"
	},
	{
		name: "diControl",
		detail: "diondo scan / recon / Daily Check / metrology"
	},
	{
		name: "VG Studio Max",
		detail: "CT analysis, CAD comparison, porosity, wall thickness"
	}
];
function CommandPalette({ open, onOpenChange }) {
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
			if (e.key === "Escape") onOpenChange(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);
	const glossHits = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (s.length < 2) return [];
		return GLOSSARY.flatMap((c) => c.entries.map((e) => ({
			...e,
			cat: c.title
		}))).filter((e) => e.term.toLowerCase().includes(s) || e.def.toLowerCase().includes(s)).slice(0, 8);
	}, [q]);
	if (!open) return null;
	const go = (to) => {
		onOpenChange(false);
		navigate({ to });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "absolute inset-0 bg-bg/70",
			onClick: () => onOpenChange(false),
			"aria-label": "Close search"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
			className: "relative z-10 w-full max-w-xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-elevated)]",
			label: "Search Discovery",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
				autoFocus: true,
				value: q,
				onValueChange: setQ,
				placeholder: "Search questions, systems, glossary…",
				className: "h-12 w-full border-b border-border bg-transparent px-4 text-sm text-fg outline-none placeholder:text-subtle"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
				className: "max-h-80 overflow-y-auto p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-6 text-center text-sm text-muted",
						children: "No matches"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Go to",
						className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle",
						children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `${n.label} ${n.hint}`,
							onSelect: () => go(n.to),
							className: "flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: n.hint
							})]
						}, n.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Library",
						className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle",
						children: LIBRARY_PAGES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `${p.title} ${p.blurb} ${p.letter}`,
							onSelect: () => go(`/library/${p.slug}`),
							className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] text-accent",
								children: p.letter
							}), p.title]
						}, p.slug))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Systems",
						className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle",
						children: SYSTEMS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `${s.name} ${s.bestFor} ${s.energy}`,
							onSelect: () => go("/routing"),
							className: "flex cursor-pointer flex-col rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								s.name,
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted",
									children: s.energy
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: s.short
							})]
						}, s.id))
					}),
					glossHits.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: "Glossary",
						className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle",
						children: glossHits.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `${e.term} ${e.def}`,
							onSelect: () => go("/library/glossary"),
							className: "flex cursor-pointer flex-col rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: e.term
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "line-clamp-2 text-xs text-muted",
								children: e.def
							})]
						}, e.term))
					}) : null
				]
			})]
		})]
	});
}
function Sidebar({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const customer = useDealStore((s) => {
		const v = s.deals.find((x) => x.id === s.activeId)?.values.customer;
		return typeof v === "string" ? v : "";
	});
	const tick = useDealStore((s) => s.deals);
	const pct = useDealStore((s) => s.hydrated) && tick.length ? computeProgress().pct : 0;
	const [org, setOrg] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const sync = () => setOrg(loadProfile().org.trim());
		sync();
		window.addEventListener(PROFILE_EVENT, sync);
		return () => window.removeEventListener(PROFILE_EVENT, sync);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-panel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-4 py-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-[0.18em] text-accent",
						children: "Industrial X-ray / CT"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold tracking-tight",
						children: "Discovery Kit"
					}),
					org ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 truncate text-xs text-subtle",
						children: org
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capture" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums",
									children: [pct, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 truncate text-xs text-subtle",
								children: customer || "Untitled deal"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex-1 overflow-y-auto px-2 py-3",
				children: ["work", "intel"].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle",
						children: g === "work" ? "On the call" : "Reference"
					}), NAV.filter((n) => n.group === g).map((n) => {
						const active = n.to === "/" ? pathname === "/" : pathname === n.to || pathname.startsWith(n.to + "/");
						const Icon = n.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							onClick: onNavigate,
							className: cn("mb-0.5 flex min-h-11 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors", active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0 opacity-80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1",
								children: n.label
							})]
						}, n.to);
					})]
				}, g))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border px-3 py-3 text-[11px] text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Stays on this device" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5",
					children: "Autosave · Ctrl/⌘K search"
				})]
			})
		]
	});
}
var DOCK = [
	{
		to: "/",
		label: "Home",
		icon: LayoutDashboard
	},
	{
		to: "/call",
		label: "Call",
		icon: Phone
	},
	{
		to: "/discovery",
		label: "Capture",
		icon: ClipboardList
	},
	{
		to: "/library",
		label: "Library",
		icon: Library
	}
];
function AppShell() {
	const [cmd, setCmd] = (0, import_react.useState)(false);
	const [mobile, setMobile] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		loadDealsFromStorage();
		const unsub = useDealStore.subscribe(() => saveDealsToStorage());
		return () => unsub();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "fixed inset-y-0 left-0 hidden w-[272px] lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-[272px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-md lg:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "icon",
						className: "lg:hidden",
						onClick: () => setMobile(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Menu"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setCmd(true),
						className: "flex h-11 min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-panel px-3 text-left text-sm text-subtle hover:border-border-strong",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: "Search systems, Nadcap, objections…"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
								className: "ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline",
								children: "⌘K"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "mx-auto w-full max-w-[1280px] px-4 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden",
				children: DOCK.map((d) => {
					const active = d.to === "/" ? pathname === "/" : pathname === d.to || pathname.startsWith(d.to + "/");
					const Icon = d.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: d.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]", active ? "text-fg" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" }), d.label]
					}, d.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobile,
				onOpenChange: setMobile,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { onNavigate: () => setMobile(false) }) })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: cmd,
				onOpenChange: setCmd
			})
		]
	}) });
}
function PageHeader({ kicker, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			kicker ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent",
				children: kicker
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-2xl text-sm text-muted",
				children: description
			}) : null
		] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
var styles_default = "/assets/styles-DCS2tFF4.css";
var APP_NAME = "Discovery Kit";
var Route$12 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#0c0e16"
			},
			{
				name: "description",
				content: "Field toolkit for industrial X-ray and CT discovery — channel-partner ready."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					richColors: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$11 = () => import("./routes-Dq1RHw8a.mjs");
var Route$11 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./call-B--8zp7y.mjs");
var Route$10 = createFileRoute("/call")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./compass-9rqLJOdi.mjs");
var Route$9 = createFileRoute("/compass")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./deals-B-UEiwEZ.mjs");
var Route$8 = createFileRoute("/deals")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./discovery-CSCYGrTe.mjs");
var Route$7 = createFileRoute("/discovery")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./outputs-Ba2eLUDf.mjs");
var Route$6 = createFileRoute("/outputs")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./playbook-D3KWsj17.mjs");
var Route$5 = createFileRoute("/playbook")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./risk-BRwgVyFS.mjs");
var Route$4 = createFileRoute("/risk")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./routing-DGeqsShU.mjs");
var Route$3 = createFileRoute("/routing")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-CR-KKw0K.mjs");
var Route$2 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./library-CEL581pq.mjs");
var Route$1 = createFileRoute("/library/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("../_slug-BpNszrk7.mjs");
var Route = createFileRoute("/library/$slug")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var CallRoute = Route$10.update({
	id: "/call",
	path: "/call",
	getParentRoute: () => Route$12
});
var CompassRoute = Route$9.update({
	id: "/compass",
	path: "/compass",
	getParentRoute: () => Route$12
});
var DealsRoute = Route$8.update({
	id: "/deals",
	path: "/deals",
	getParentRoute: () => Route$12
});
var DiscoveryRoute = Route$7.update({
	id: "/discovery",
	path: "/discovery",
	getParentRoute: () => Route$12
});
var OutputsRoute = Route$6.update({
	id: "/outputs",
	path: "/outputs",
	getParentRoute: () => Route$12
});
var PlaybookRoute = Route$5.update({
	id: "/playbook",
	path: "/playbook",
	getParentRoute: () => Route$12
});
var RiskRoute = Route$4.update({
	id: "/risk",
	path: "/risk",
	getParentRoute: () => Route$12
});
var RoutingRoute = Route$3.update({
	id: "/routing",
	path: "/routing",
	getParentRoute: () => Route$12
});
var SettingsRoute = Route$2.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => Route$12
});
var LibraryIndexRoute = Route$1.update({
	id: "/library/",
	path: "/library/",
	getParentRoute: () => Route$12
});
var rootRouteChildren = {
	IndexRoute,
	CallRoute,
	CompassRoute,
	DealsRoute,
	DiscoveryRoute,
	OutputsRoute,
	PlaybookRoute,
	RiskRoute,
	RoutingRoute,
	SettingsRoute,
	LibrarySlugRoute: Route.update({
		id: "/library/$slug",
		path: "/library/$slug",
		getParentRoute: () => Route$12
	}),
	LibraryIndexRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { inToMm as A, SCRIPT as C, fmtDate as D, downloadText as E, uid as M, LIBRARY_PAGES as N, formatKgLb as O, QUESTIONS as S, copyText as T, displayOwner as _, SYSTEMS as a, COMPASS_FIELDS as b, Button as c, on as d, useDealStore as f, displayOrg as g, PROFILE_EVENT as h, SOFTWARE_STACK as i, lbToKg as j, formatMmIn as k, computeProgress as l, DEFAULT_PROFILE as m, Route as n, GLOSSARY as o, v as p, PageHeader as r, Progress as s, router_exports as t, allValues as u, loadProfile as v, cn as w, COVER_FIELDS as x, saveProfile as y };
