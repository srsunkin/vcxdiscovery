import { h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { w as cn } from "./router-fudB7XKc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-CbtnwBn7.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-surface text-fg shadow-[var(--shadow-border)]", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-5 pb-3", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("text-sm font-semibold tracking-tight text-fg", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("px-5 pb-5", className),
		...props
	});
}
//#endregion
export { CardTitle as i, CardContent as n, CardHeader as r, Card as t };
