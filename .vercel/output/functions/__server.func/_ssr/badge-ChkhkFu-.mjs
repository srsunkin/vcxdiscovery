import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { w as cn } from "./router-fudB7XKc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-ChkhkFu-.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide", {
	variants: { variant: {
		default: "bg-accent-dim text-accent",
		muted: "bg-elevated text-muted",
		success: "bg-success-dim text-success",
		warn: "bg-warn-dim text-warn",
		danger: "bg-danger-dim text-danger",
		outline: "border border-border text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
