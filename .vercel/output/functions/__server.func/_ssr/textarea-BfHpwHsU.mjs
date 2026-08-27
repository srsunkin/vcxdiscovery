import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { w as cn } from "./router-fudB7XKc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-BfHpwHsU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-24 w-full rounded-md border border-border bg-panel px-3 py-2 text-sm text-fg placeholder:text-subtle", "transition-[border-color,box-shadow] duration-150 resize-y", "focus-visible:outline-none focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(77,124,255,0.18)]", "disabled:cursor-not-allowed disabled:opacity-50", className),
	...props
}));
Textarea.displayName = "Textarea";
//#endregion
export { Textarea as t };
