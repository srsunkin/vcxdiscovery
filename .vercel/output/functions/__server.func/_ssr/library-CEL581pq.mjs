import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as LIBRARY_PAGES, r as PageHeader } from "./router-fudB7XKc.mjs";
import { n as CardContent, t as Card } from "./card-CbtnwBn7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/library-CEL581pq.js
var import_jsx_runtime = require_jsx_runtime();
function LibraryIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Reference",
		title: "Library",
		description: "The appendixes from the workbook, searchable from the command bar. Customer-safe sheets are marked. Commercial content stays internal."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
		children: LIBRARY_PAGES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/library/$slug",
			params: { slug: p.slug },
			className: "block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "h-full transition-colors hover:bg-elevated/50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
					className: "pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[11px] text-accent",
							children: p.letter
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm font-semibold",
							children: p.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: p.blurb
						})
					]
				})
			})
		}, p.slug))
	})] });
}
//#endregion
export { LibraryIndex as component };
