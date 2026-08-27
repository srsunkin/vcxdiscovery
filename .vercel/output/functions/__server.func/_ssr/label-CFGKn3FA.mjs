import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { w as cn } from "./router-fudB7XKc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/label-CFGKn3FA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-11 w-full rounded-md border border-border bg-panel px-3 text-sm text-fg placeholder:text-subtle", "transition-[border-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(77,124,255,0.18)]", "disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn("text-xs font-medium uppercase tracking-[0.08em] text-muted", className),
	...props
}));
Label.displayName = "Label";
//#endregion
export { Label as n, Input as t };
