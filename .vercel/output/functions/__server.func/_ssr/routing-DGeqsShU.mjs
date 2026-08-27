import { i as __toESM } from "../_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { A as inToMm, O as formatKgLb, a as SYSTEMS, f as useDealStore, j as lbToKg, k as formatMmIn, r as PageHeader, w as cn } from "./router-fudB7XKc.mjs";
import { n as Label, t as Input } from "./label-CFGKn3FA.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./card-CbtnwBn7.mjs";
import { t as Badge } from "./badge-ChkhkFu-.mjs";
import { t as inferRoutes } from "./routing-BtOsCza6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routing-DGeqsShU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function fitSystems(input) {
	return SYSTEMS.filter((s) => s.id !== "software").map((system) => {
		const reasons = [];
		if (system.custom) {
			reasons.push("Custom / project envelope — engineering path");
			if (input.energyHint === "linac" && system.tags.includes("linac")) reasons.push("Linac / MeV match");
			if (input.highThroughput && system.tags.includes("giga")) reasons.push("Giga / custom throughput");
			return {
				system,
				fit: "custom",
				reasons
			};
		}
		const massLimit = system.weightKgHigh && input.weightKg > system.maxWeightKg ? system.weightKgHigh : system.maxWeightKg;
		const useScan = input.needCt && Boolean(system.scanDiaMm || system.scanHeightMm);
		const diaLimit = useScan && system.scanDiaMm ? Math.min(system.maxDiaMm, system.scanDiaMm) : system.maxDiaMm;
		const hLimit = useScan && system.scanHeightMm ? Math.min(system.maxHeightMm, system.scanHeightMm) : system.maxHeightMm;
		const diaOk = !input.diaMm || input.diaMm <= diaLimit;
		const hOk = !input.heightMm || input.heightMm <= hLimit;
		const wOk = !input.weightKg || input.weightKg <= massLimit;
		if (input.diaMm && !diaOk) reasons.push(`Diameter ${Math.round(input.diaMm)} mm exceeds published ${diaLimit} mm${useScan ? " scan volume" : ""}`);
		if (input.heightMm && !hOk) reasons.push(`Height ${Math.round(input.heightMm)} mm exceeds published ${hLimit} mm${useScan ? " scan volume" : ""}`);
		if (input.weightKg && !wOk) reasons.push(`Weight ${Math.round(input.weightKg)} kg exceeds published ${massLimit} kg`);
		if (system.id === "pro-c" && input.weightKg > 60 && input.weightKg <= 600) reasons.push("Mass needs PRO C.320/450 (600 kg). PRO C.225 is 60 kg.");
		if (system.id === "d7" && input.diaMm > 700 && input.diaMm <= 1e3) reasons.push("Diameter needs line-detector path (Ø1000). FPD is Ø700.");
		if (system.note && diaOk && hOk && wOk) reasons.push(system.note);
		if (diaOk && hOk && wOk && !system.note) reasons.push("Envelope and mass fit published catalog");
		if (input.needCt && system.line === "diondo") reasons.push("Dedicated CT platform");
		if (input.needCt && system.tags.includes("ct")) reasons.push("CT-capable");
		if (input.robotic && system.tags.includes("robot")) reasons.push("Robot-in-cabinet");
		if (input.highThroughput && system.tags.includes("throughput")) reasons.push("High-throughput casting");
		if (input.crane && system.tags.includes("crane")) reasons.push("Top-loader / crane access");
		if (input.energyHint === "linac" && !system.tags.includes("linac") && !system.tags.includes("high-energy")) reasons.push("Energy class may be insufficient for MeV work");
		if (input.energyHint === "high" && /160 \/ 225/.test(system.energy) && !/320|450|600/.test(system.energy)) reasons.push("Max published energy is 225 kV");
		const hardFail = !diaOk || !hOk || !wOk;
		const tight = !hardFail && (input.diaMm && input.diaMm > diaLimit * .85 || input.heightMm && input.heightMm > hLimit * .85 || input.weightKg && input.weightKg > massLimit * .85);
		return {
			system,
			fit: hardFail ? "no" : tight ? "tight" : "yes",
			reasons
		};
	});
}
function RoutingPage() {
	useDealStore((s) => s.deals);
	const ranked = inferRoutes();
	const top = ranked[0];
	const [unit, setUnit] = (0, import_react.useState)("mm");
	const [dia, setDia] = (0, import_react.useState)("");
	const [h, setH] = (0, import_react.useState)("");
	const [w, setW] = (0, import_react.useState)("");
	const [needCt, setNeedCt] = (0, import_react.useState)(false);
	const [robotic, setRobotic] = (0, import_react.useState)(false);
	const [highThroughput, setHighThroughput] = (0, import_react.useState)(false);
	const [crane, setCrane] = (0, import_react.useState)(false);
	const [energy, setEnergy] = (0, import_react.useState)("any");
	const input = (0, import_react.useMemo)(() => {
		const n = (s) => Number.parseFloat(s) || 0;
		const diaN = unit === "in" ? inToMm(n(dia)) : n(dia);
		const hN = unit === "in" ? inToMm(n(h)) : n(h);
		const wN = unit === "in" ? lbToKg(n(w)) : n(w);
		return {
			diaMm: diaN,
			heightMm: hN,
			weightKg: unit === "in" ? wN : n(w),
			needCt,
			robotic,
			highThroughput,
			crane,
			energyHint: energy
		};
	}, [
		unit,
		dia,
		h,
		w,
		needCt,
		robotic,
		highThroughput,
		crane,
		energy
	]);
	const hasFitQuery = Boolean(dia || h || w);
	const rows = hasFitQuery ? fitSystems(input) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Solution routing",
			title: "Direction + envelope checker",
			description: "Capture scores a shortlist from published envelopes. Type the part size to see what actually fits — then confirm with applications before you quote."
		}),
		top ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 rounded-xl border border-accent/40 bg-accent-dim/50 px-5 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] uppercase tracking-[0.14em] text-accent",
					children: "Generated route"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 text-lg font-semibold",
					children: top.system.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [top.reasons.join(" · ") || top.system.short, ". Confirm with application study, part envelope, defect size, throughput, and standards before quote."]
				})
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 md:grid-cols-2",
			children: ranked.slice(0, 6).map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: i === 0 ? "border border-accent/50" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
					className: "flex-row items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: r.system.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: r.system.short
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: r.score })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: r.system.bestFor
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc pl-4 text-xs text-subtle",
					children: r.reasons.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: x }, x))
				})] })]
			}, r.system.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-lg font-semibold tracking-tight",
			children: "Envelope checker"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 mb-4 text-sm text-muted",
			children: "Dual-unit: type mm/kg or inches/lb. Fits are a starting filter — always confirm manipulator travel, fixture, and application study."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "grid gap-4 pt-5 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on: unit === "mm",
							onClick: () => setUnit("mm"),
							label: "Metric (mm / kg)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							on: unit === "in",
							onClick: () => setUnit("in"),
							label: "US (in / lb)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: unit === "mm" ? "Diameter (mm)" : "Diameter (in)",
						value: dia,
						onChange: setDia
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: unit === "mm" ? "Height (mm)" : "Height (in)",
						value: h,
						onChange: setH
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Num, {
						label: unit === "mm" ? "Weight (kg)" : "Weight (lb)",
						value: w,
						onChange: setW
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Energy hint" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: energy,
							onChange: (e) => setEnergy(e.target.value),
							className: "h-11 rounded-md border border-border bg-panel px-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "any",
									children: "Any"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "low",
									children: "≤ 225 kV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "mid",
									children: "320 kV class"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "high",
									children: "450–600 kV"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "linac",
									children: "Linac / MeV"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: needCt,
								onClick: () => setNeedCt(!needCt),
								label: "Needs CT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: robotic,
								onClick: () => setRobotic(!robotic),
								label: "Robotic load"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: highThroughput,
								onClick: () => setHighThroughput(!highThroughput),
								label: "High throughput"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
								on: crane,
								onClick: () => setCrane(!crane),
								label: "Crane / top load"
							})
						]
					})
				]
			})
		}),
		hasFitQuery ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[720px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "border-b border-border text-xs uppercase tracking-wide text-subtle",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "System"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Fit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Envelope"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Energy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3",
							children: "Notes"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border/70",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 font-medium",
							children: r.system.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: r.fit === "yes" ? "success" : r.fit === "tight" ? "warn" : r.fit === "custom" ? "default" : "danger",
								children: r.fit
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: r.system.custom ? "Custom" : `${formatMmIn(r.system.maxDiaMm)} × ${formatMmIn(r.system.maxHeightMm)} · ${formatKgLb(r.system.maxWeightKg)}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-muted",
							children: r.system.energy
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-3 text-xs text-subtle",
							children: r.reasons.join(" · ")
						})
					]
				}, r.system.id)) })]
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, {})
	] });
}
function Catalog() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: SYSTEMS.filter((s) => s.id !== "software").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "muted",
				children: s.line === "diondo" ? "diondo" : "VCxray"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: s.energy
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: s.bestFor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-mono text-[11px] text-subtle",
				children: s.custom ? "Custom envelope" : `${formatMmIn(s.maxDiaMm)} Ø · ${formatMmIn(s.maxHeightMm)} H · ${formatKgLb(s.maxWeightKg)}`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-subtle",
				children: ["Ask: ", s.triggers]
			})
		] })] }, s.id))
	});
}
function Num({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			inputMode: "decimal",
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function Toggle({ on, onClick, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 rounded-full border px-3 py-2 text-xs", on ? "border-accent bg-accent-dim text-fg" : "border-border text-muted hover:text-fg"),
		children: label
	});
}
//#endregion
export { RoutingPage as component };
