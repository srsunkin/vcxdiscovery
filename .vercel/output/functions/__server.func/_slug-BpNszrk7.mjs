import { i as __toESM } from "./_runtime.mjs";
import { g as require_react, h as require_jsx_runtime } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { B as notFound, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as Eye, I as ArrowLeft, L as Archive, N as Box, R as Aperture, _ as Monitor, a as Trash2, d as Scan, f as Radiation, g as MoveHorizontal, h as Pencil, j as Check, o as SlidersHorizontal, p as Plus, s as Shield, t as X, w as Cpu, x as Layers } from "./_libs/lucide-react.mjs";
import { M as uid, N as LIBRARY_PAGES, O as formatKgLb, a as SYSTEMS, c as Button, i as SOFTWARE_STACK, k as formatMmIn, n as Route, o as GLOSSARY, r as PageHeader, w as cn } from "./_ssr/router-fudB7XKc.mjs";
import { n as Label, t as Input } from "./_ssr/label-CFGKn3FA.mjs";
import { t as Textarea } from "./_ssr/textarea-BfHpwHsU.mjs";
import { i as CardTitle, n as CardContent, r as CardHeader, t as Card } from "./_ssr/card-CbtnwBn7.mjs";
import { t as Badge } from "./_ssr/badge-ChkhkFu-.mjs";
import { _ as STANDARDS, c as INCOTERMS, g as SCATTER_CONTROLS, h as SAFETY, l as LINAC_COMPARE, n as DETECTORS, r as DETECTOR_TYPES, s as IMAGING_CHAIN, t as COMMERCIAL, u as MODALITY } from "./_ssr/playbook-xobszCRE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BpNszrk7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "discovery-kit-library-v1";
var EMPTY$1 = {
	added: {},
	overrides: {},
	hidden: {}
};
function loadExtras() {
	if (typeof window === "undefined") return EMPTY$1;
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return {
			added: {},
			overrides: {},
			hidden: {}
		};
		const p = JSON.parse(raw);
		return {
			added: p.added ?? {},
			overrides: p.overrides ?? {},
			hidden: p.hidden ?? {}
		};
	} catch {
		return {
			added: {},
			overrides: {},
			hidden: {}
		};
	}
}
function saveExtras(data) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, JSON.stringify(data));
}
function addRow(tableId, colCount) {
	const data = loadExtras();
	const row = {
		id: uid(),
		cells: Array.from({ length: colCount }, () => "")
	};
	data.added[tableId] = [...data.added[tableId] ?? [], row];
	saveExtras(data);
	return data;
}
function updateAdded(tableId, id, cells) {
	const data = loadExtras();
	data.added[tableId] = (data.added[tableId] ?? []).map((r) => r.id === id ? {
		...r,
		cells
	} : r);
	saveExtras(data);
	return data;
}
function removeAdded(tableId, id) {
	const data = loadExtras();
	data.added[tableId] = (data.added[tableId] ?? []).filter((r) => r.id !== id);
	saveExtras(data);
	return data;
}
function overrideFactory(tableId, key, cells) {
	const data = loadExtras();
	data.overrides[tableId] = {
		...data.overrides[tableId] ?? {},
		[key]: cells
	};
	saveExtras(data);
	return data;
}
function hideFactory(tableId, key) {
	const data = loadExtras();
	const cur = new Set(data.hidden[tableId] ?? []);
	cur.add(key);
	data.hidden[tableId] = [...cur];
	saveExtras(data);
	return data;
}
function restoreFactory(tableId, key) {
	const data = loadExtras();
	if (data.overrides[tableId]) {
		const next = { ...data.overrides[tableId] };
		delete next[key];
		data.overrides[tableId] = next;
	}
	data.hidden[tableId] = (data.hidden[tableId] ?? []).filter((k) => k !== key);
	saveExtras(data);
	return data;
}
var EMPTY = {
	added: {},
	overrides: {},
	hidden: {}
};
function EditableTable({ tableId, headers, factory, addLabel = "Add item" }) {
	const [data, setData] = (0, import_react.useState)(EMPTY);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)([]);
	const formRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setData(loadExtras());
	}, []);
	(0, import_react.useEffect)(() => {
		if (editing) formRef.current?.scrollIntoView({
			block: "nearest",
			behavior: "smooth"
		});
	}, [editing]);
	const hidden = new Set(data.hidden[tableId] ?? []);
	const added = data.added[tableId] ?? [];
	const overrides = data.overrides[tableId] ?? {};
	const visibleFactory = factory.filter((r) => !hidden.has(r.key));
	const startEdit = (id, cells) => {
		const padded = [...cells];
		while (padded.length < headers.length) padded.push("");
		setEditing(id);
		setDraft(padded.slice(0, headers.length));
	};
	const cancel = () => {
		if (editing?.startsWith("a:")) {
			const id = editing.slice(2);
			const row = added.find((r) => r.id === id);
			if (row && row.cells.every((c) => !c.trim()) && draft.every((c) => !c.trim())) setData(removeAdded(tableId, id));
		}
		setEditing(null);
		setDraft([]);
	};
	const save = () => {
		if (!editing) return;
		if (editing.startsWith("f:")) setData(overrideFactory(tableId, editing.slice(2), draft));
		else if (editing.startsWith("a:")) setData(updateAdded(tableId, editing.slice(2), draft));
		cancel();
	};
	const onAdd = () => {
		const next = addRow(tableId, headers.length);
		setData(next);
		const last = (next.added[tableId] ?? []).at(-1);
		if (last) startEdit(`a:${last.id}`, last.cells);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)] md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border text-xs uppercase tracking-wide text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [headers.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-4 py-3 font-medium",
							children: h
						}, h)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "w-[88px] px-2 py-3" })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [visibleFactory.map((r) => {
						const cells = overrides[r.key] ?? r.cells;
						const id = `f:${r.key}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewRow, {
							cells,
							active: editing === id,
							onEdit: () => startEdit(id, cells),
							onRemove: () => setData(hideFactory(tableId, r.key)),
							removeLabel: "Hide catalog row"
						}, r.key);
					}), added.map((r) => {
						const id = `a:${r.id}`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewRow, {
							cells: r.cells,
							active: editing === id,
							onEdit: () => startEdit(id, r.cells),
							onRemove: () => setData(removeAdded(tableId, r.id)),
							removeLabel: "Delete row",
							added: true
						}, r.id);
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 md:hidden",
				children: [visibleFactory.map((r) => {
					const cells = overrides[r.key] ?? r.cells;
					const id = `f:${r.key}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewCard, {
						headers,
						cells,
						active: editing === id,
						onEdit: () => startEdit(id, cells),
						onRemove: () => setData(hideFactory(tableId, r.key)),
						removeLabel: "Hide"
					}, r.key);
				}), added.map((r) => {
					const id = `a:${r.id}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ViewCard, {
						headers,
						cells: r.cells,
						active: editing === id,
						onEdit: () => startEdit(id, r.cells),
						onRemove: () => setData(removeAdded(tableId, r.id)),
						removeLabel: "Delete",
						added: true
					}, r.id);
				})]
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: formRef,
				className: "mt-3 rounded-xl bg-accent-dim/25 p-4 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 text-sm font-semibold",
						children: editing.startsWith("a:") ? addLabel : "Edit row"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: headers.map((h, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: cn("grid gap-1.5", headers.length <= 3 && j === headers.length - 1 && "sm:col-span-2"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: h }), h.toLowerCase().includes("desc") || h.toLowerCase().includes("detail") || h.toLowerCase().includes("note") || h.toLowerCase().includes("use") || h.toLowerCase().includes("caution") || h.toLowerCase().includes("definition") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								autoFocus: j === 0,
								rows: 3,
								value: draft[j] ?? "",
								onChange: (e) => {
									const next = [...draft];
									next[j] = e.target.value;
									setDraft(next);
								},
								onKeyDown: (e) => {
									if (e.key === "Escape") cancel();
									if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
								}
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoFocus: j === 0,
								value: draft[j] ?? "",
								onChange: (e) => {
									const next = [...draft];
									next[j] = e.target.value;
									setDraft(next);
								},
								onKeyDown: (e) => {
									if (e.key === "Escape") cancel();
									if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
								}
							})]
						}, h))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "lg",
							onClick: save,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Save"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							onClick: cancel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Cancel"]
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					size: "lg",
					onClick: onAdd,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), addLabel]
				}), hidden.size ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => {
						for (const key of hidden) restoreFactory(tableId, key);
						setData(loadExtras());
					},
					children: [
						"Restore hidden catalog rows (",
						hidden.size,
						")"
					]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-xs text-subtle",
				children: [
					"Tap Edit or ",
					addLabel,
					". Changes stay on this device."
				]
			})
		]
	});
}
function ViewRow({ cells, active, onEdit, onRemove, removeLabel, added }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: cn("border-b border-border/70 align-top", added && "bg-accent-dim/15", active && "bg-accent-dim/40"),
		children: [cells.map((c, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: cn("px-4 py-3", j === 0 ? "font-medium text-fg" : "text-muted"),
			children: c || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-subtle",
				children: "—"
			})
		}, j)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
			className: "px-1 py-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 rounded-md p-2.5 text-subtle hover:bg-elevated hover:text-fg",
					"aria-label": "Edit row",
					onClick: onEdit,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "min-h-11 min-w-11 rounded-md p-2.5 text-subtle hover:bg-elevated hover:text-danger",
					"aria-label": removeLabel,
					onClick: onRemove,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
				})]
			})
		})]
	});
}
function ViewCard({ headers, cells, active, onEdit, onRemove, removeLabel, added }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]", added && "ring-1 ring-accent/30", active && "ring-1 ring-accent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				children: cells[0] || "Untitled"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
				className: "mt-2 grid gap-1.5",
				children: headers.slice(1).map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "font-mono text-[10px] uppercase tracking-wide text-subtle",
					children: h
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "text-sm text-muted",
					children: cells[i + 1] || "—"
				})] }, h))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "secondary",
					onClick: onEdit,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), " Edit"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "ghost",
					onClick: onRemove,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }),
						" ",
						removeLabel
					]
				})]
			})
		]
	});
}
var CHAIN_ICONS = [
	Radiation,
	Box,
	MoveHorizontal,
	Scan,
	SlidersHorizontal,
	Cpu,
	Eye,
	Archive
];
function ImagingChainVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Customer-safe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-subtle",
					children: "Screen-share this — the weakest link sets image quality"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-accent/30 lg:block" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-8",
					children: IMAGING_CHAIN.map((s, i) => {
						const Icon = CHAIN_ICONS[i] ?? Radiation;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg bg-elevated/80 px-3 py-3 lg:flex-col lg:items-center lg:px-2 lg:py-4 lg:text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-accent ring-1 ring-accent/40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-mono text-[10px] text-subtle",
									children: s.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold leading-tight",
									children: s.title
								})] })]
							})
						}, s.n);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
				children: IMAGING_CHAIN.map((s, i) => {
					const Icon = CHAIN_ICONS[i] ?? Radiation;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-accent",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-[11px]",
							children: s.n
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-subtle",
							children: "Controls"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: s.controls
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs uppercase tracking-wide text-subtle",
							children: "Key point"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-fg",
							children: s.key
						})
					] })] }, s.n);
				})
			})
		]
	});
}
function ScatterVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Customer-safe" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-tight",
					children: "Scatter control"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Scatter is the silent contrast killer. Six practical levers — pick the cheapest one that actually moves CNR on this part."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: SCATTER_CONTROLS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[11px] text-accent",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: s.doThis
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-subtle",
					children: s.when
				})] })] }, s.title))
			})
		]
	});
}
function DetectorTypesVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-6 grid gap-3 sm:grid-cols-3",
		children: DETECTOR_TYPES.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: cn(i === 0 && "ring-1 ring-accent/30"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-accent",
				children: [i === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-4" }) : i === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Aperture, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono text-[11px]",
					children: d.short
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: d.title })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: d.fit
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: d.trade
			})] })]
		}, d.title))
	});
}
function ShieldCallout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4 flex items-start gap-3 rounded-xl bg-elevated/60 px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These sheets are meant for screen-share. They explain physics and process, not commercial pricing." })]
	});
}
var DENSITY_GROUPS = [
	{
		id: "low",
		name: "Non-metallic / very low density",
		examples: "Plastics, rubber, foam, CFRP/GFRP, ceramics",
		kv: "50–160 kV",
		notes: "Contrast is often easy; scatter and feature orientation can still dominate."
	},
	{
		id: "light",
		name: "Light metals",
		examples: "Magnesium, aluminum, beryllium",
		kv: "80–225 kV",
		notes: "Strong DR candidates; CT feasible if part size and voxel support it."
	},
	{
		id: "medium",
		name: "Medium density",
		examples: "Titanium, thin-wall stainless / Inconel / nickel alloys",
		kv: "160–450 kV",
		notes: "Watch total path length and the focal-spot / power tradeoff."
	},
	{
		id: "heavy",
		name: "Heavy metals",
		examples: "Copper, brass, bronze, dense steels, nickel-base superalloys",
		kv: "225–600 kV / MeV",
		notes: "May need higher-energy CT, fan-beam / line detector, or LINAC."
	},
	{
		id: "high-z",
		name: "Very dense / high-Z",
		examples: "Lead, tungsten, uranium, tantalum, thick superalloys",
		kv: "MeV / LINAC",
		notes: "Cabinet kV systems are unrealistic except very thin sections."
	}
];
var MATERIALS = [
	{
		id: "polymer",
		name: "Polymers / plastics",
		density: "0.9–1.5 g/cc",
		kv: "50–120 kV",
		thickness: "up to ~300–500 mm / 12–20 in",
		notes: "Great for voids, assemblies, low-density FOD.",
		group: "low"
	},
	{
		id: "cfrp",
		name: "CFRP / composites",
		density: "1.4–1.8 g/cc",
		kv: "60–160 kV",
		thickness: "up to ~200–400 mm / 8–16 in",
		notes: "Delamination orientation matters; laminography/CT may help.",
		group: "low"
	},
	{
		id: "mg",
		name: "Magnesium",
		density: "1.7 g/cc",
		kv: "80–160 kV",
		thickness: "up to ~200–300 mm / 8–12 in",
		notes: "Good DR contrast; common casting use case.",
		group: "light"
	},
	{
		id: "be",
		name: "Beryllium",
		density: "1.85 g/cc",
		kv: "80–160 kV",
		thickness: "application-specific",
		notes: "High safety/handling sensitivity; confirm customer controls.",
		group: "light"
	},
	{
		id: "al",
		name: "Aluminum",
		density: "2.7 g/cc",
		kv: "100–225 kV",
		thickness: "up to ~200–250 mm / 8–10 in",
		notes: "Aerospace/casting staple; scatter rises quickly on thick parts.",
		group: "light"
	},
	{
		id: "ti",
		name: "Titanium",
		density: "4.5 g/cc",
		kv: "160–320 kV",
		thickness: "~25–80 mm / 1–3 in",
		notes: "CT possible but geometry and SNR drive feasibility.",
		group: "medium"
	},
	{
		id: "fe",
		name: "Iron / carbon steel",
		density: "7.8 g/cc",
		kv: "225–450 kV",
		thickness: "~10–100+ mm / 0.4–4+ in",
		notes: "Thin steel can be 225 kV; thicker sections trend to 450 kV or MeV.",
		group: "heavy"
	},
	{
		id: "ss",
		name: "Stainless steel",
		density: "7.9–8.1 g/cc",
		kv: "225–450 kV",
		thickness: "~10–90 mm / 0.4–3.5 in",
		notes: "Similar to steel; alloy content can increase attenuation.",
		group: "heavy"
	},
	{
		id: "ni",
		name: "Nickel alloys / Inconel",
		density: "8.2–8.9 g/cc",
		kv: "320–450 kV / MeV",
		thickness: "~10–75+ mm / 0.4–3+ in",
		notes: "Dense aerospace hardware; often benefits from application study.",
		group: "heavy"
	},
	{
		id: "cu",
		name: "Copper",
		density: "8.96 g/cc",
		kv: "320–450 kV / MeV",
		thickness: "~5–60 mm / 0.2–2.4 in",
		notes: "High attenuation; watch beam hardening.",
		group: "heavy"
	},
	{
		id: "brass",
		name: "Brass / bronze",
		density: "8.4–8.9 g/cc",
		kv: "320–450 kV / MeV",
		thickness: "~5–60 mm / 0.2–2.4 in",
		notes: "Similar to copper; alloy mix matters.",
		group: "heavy"
	},
	{
		id: "pb",
		name: "Lead",
		density: "11.3 g/cc",
		kv: "MeV",
		thickness: "thin sections only below MeV",
		notes: "Very high attenuation; avoid casual kV assumptions.",
		group: "high-z"
	},
	{
		id: "w",
		name: "Tungsten",
		density: "19.3 g/cc",
		kv: "MeV / LINAC",
		thickness: "application-specific",
		notes: "High-Z; even small parts can be challenging.",
		group: "high-z"
	},
	{
		id: "u",
		name: "Uranium / DU",
		density: "~19 g/cc",
		kv: "MeV / LINAC",
		thickness: "application-specific",
		notes: "Regulated/sensitive; escalate early.",
		group: "high-z"
	}
];
var SOURCE_CLASSES = [
	{
		name: "Microfocus",
		spot: "single-digit µm to tens of µm",
		power: "Lower power",
		fit: "Small parts, high magnification, electronics, AM, high-resolution CT."
	},
	{
		name: "Mesofocus",
		spot: "~50–200 µm",
		power: "Middle ground",
		fit: "Balance of resolution and power for many aerospace/automotive parts."
	},
	{
		name: "Minifocus / industrial",
		spot: "0.4–1.0+ mm",
		power: "Higher power",
		fit: "General DR, thicker sections, throughput-focused work."
	},
	{
		name: "LINAC",
		spot: "~1–2 mm effective",
		power: "High pulsed dose",
		fit: "Large/dense parts, thick steel, rocket motors, turbines, defense hardware."
	}
];
var STEEL_EQ = [
	{
		alloy: "Aluminum",
		factor: "≈ 0.35"
	},
	{
		alloy: "Titanium",
		factor: "≈ 0.60"
	},
	{
		alloy: "Inconel",
		factor: "≈ 1.1–1.2"
	},
	{
		alloy: "Copper",
		factor: "≈ 1.1"
	},
	{
		alloy: "Tungsten",
		factor: "≈ 2.4"
	}
];
var IQI_LEVELS = [
	{
		level: "2-2T",
		meaning: "2% sensitivity, 2T hole",
		use: "Common baseline in aerospace / industrial RT specs. Still must meet the actual customer procedure."
	},
	{
		level: "1-2T",
		meaning: "1% sensitivity, 2T hole",
		use: "Stricter contrast sensitivity; may drive source, detector, geometry, exposure, and scatter control."
	},
	{
		level: "2-1T",
		meaning: "2% plaque, 1T hole (smaller)",
		use: "Stricter than 2-2T because the hole is smaller. Verify exact customer procedure language."
	},
	{
		level: "1-1T",
		meaning: "Ultra-strict",
		use: "Critical applications only; validate by application study before committing."
	}
];
var EPS_ROWS = [
	{
		eps: "50 µm",
		feature: "≥150 µm",
		us: "≈ 0.006 in"
	},
	{
		eps: "100 µm",
		feature: "≥300 µm",
		us: "≈ 0.012 in"
	},
	{
		eps: "127 µm",
		feature: "≥380 µm",
		us: "≈ 0.015 in"
	},
	{
		eps: "200 µm",
		feature: "≥600 µm",
		us: "≈ 0.024 in"
	}
];
function LibraryArticle() {
	const { slug } = Route.useParams();
	const meta = LIBRARY_PAGES.find((p) => p.slug === slug);
	if (!meta) throw notFound();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/library",
			className: "mb-4 inline-flex min-h-11 items-center gap-1 text-xs text-muted hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), "Library"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: `Appendix ${meta.letter}`,
			title: meta.title,
			description: meta.blurb
		}),
		render(slug)
	] });
}
function render(slug) {
	switch (slug) {
		case "kv": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kv, {});
		case "systems": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VcSystems, {});
		case "diondo": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Diondo, {});
		case "detectors": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detectors, {});
		case "detection": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detection, {});
		case "modality": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modality, {});
		case "objections": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Objection handling lives in the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/playbook",
					className: "text-accent underline",
					children: "Playbook"
				}),
				" so it sits next to role questions and ROI."
			]
		});
		case "standards": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Standards, {});
		case "executive": return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Executive translation is in the ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/playbook",
					className: "text-accent underline",
					children: "Playbook → Exec / ROI"
				}),
				" tab."
			]
		});
		case "commercial": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Commercial, {});
		case "safety": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Safety, {});
		case "glossary": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Glossary, {});
		case "conversions": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Conversions, {});
		case "chain": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chain, {});
		case "linac": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linac, {});
		default: return null;
	}
}
function Kv() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Fast discovery reference only. Final kV/source selection depends on grade, path length, geometry, defect type, CNR/SNR, scatter, detector, and application-study results."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Density groups"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "kv-density",
			addLabel: "Add material group",
			headers: [
				"Group",
				"Examples",
				"Starting kV",
				"Notes"
			],
			factory: DENSITY_GROUPS.map((g) => ({
				key: g.id,
				cells: [
					g.name,
					g.examples,
					g.kv,
					g.notes
				]
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Thickness windows"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "kv-thickness",
			addLabel: "Add material row",
			headers: [
				"Material",
				"Density",
				"kV",
				"Thickness",
				"Notes"
			],
			factory: MATERIALS.map((m) => ({
				key: m.id,
				cells: [
					m.name,
					m.density,
					m.kv,
					m.thickness,
					m.notes
				]
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Source class"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "kv-source",
			addLabel: "Add source class",
			headers: [
				"Class",
				"Focal spot",
				"Power",
				"Where it fits"
			],
			factory: SOURCE_CLASSES.map((s) => ({
				key: s.name,
				cells: [
					s.name,
					s.spot,
					s.power,
					s.fit
				]
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [
				"Steel-equivalent rule of thumb: ",
				STEEL_EQ.map((s) => `${s.alloy} ${s.factor}`).join(" · "),
				". Always validate when quoting detection commitments."
			]
		})
	] });
}
function VcSystems() {
	const vc = SYSTEMS.filter((s) => s.line === "vcxray");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Numbers below are published catalog envelopes (vc-xray.com, 2026). They are a starting filter, not a quote. Confirm manipulator travel, fixtures, and energy class with applications."
		}),
		vc.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "muted",
					children: s.energy
				})]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: s.bestFor
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-mono text-xs text-subtle",
					children: s.custom ? "Custom envelope" : s.rectangular ? `${s.rectangular.w} × ${s.rectangular.d} × ${s.rectangular.h} mm · ${formatKgLb(s.maxWeightKg)}` : `${formatMmIn(s.maxDiaMm)} Ø · ${formatMmIn(s.maxHeightMm)} H · ${formatKgLb(s.maxWeightKg)}${s.weightKgHigh ? ` (up to ${formatKgLb(s.weightKgHigh)} on 320/450)` : ""}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-xs text-subtle",
					children: ["Ask: ", s.triggers]
				}),
				s.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-warn",
					children: s.note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[11px] text-subtle",
					children: s.source
				})
			] })]
		}, s.id)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Software"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "software-stack",
			addLabel: "Add software",
			headers: ["Product", "Role"],
			factory: SOFTWARE_STACK.map((s) => ({
				key: s.name,
				cells: [s.name, s.detail]
			}))
		})
	] });
}
function Diondo() {
	const d = SYSTEMS.filter((s) => s.line === "diondo");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted",
		children: "diondo is VisiConsult’s CT partner. Specs from diondo.com product pages (2026). Sample size is what you can load; scan volume is what you can actually reconstruct. Envelope checker uses scan volume when CT is ticked."
	}), d.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "mb-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: s.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "muted",
				children: s.energy
			})]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: s.bestFor
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 font-mono text-xs text-subtle",
				children: [
					"Sample ",
					formatMmIn(s.maxDiaMm),
					" Ø · ",
					formatMmIn(s.maxHeightMm),
					" H · ",
					formatKgLb(s.maxWeightKg)
				]
			}),
			s.scanDiaMm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-xs text-subtle",
				children: [
					"Scan ",
					formatMmIn(s.scanDiaMm),
					" Ø · ",
					formatMmIn(s.scanHeightMm ?? 0),
					" H"
				]
			}) : null,
			s.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-warn",
				children: s.note
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[11px] text-subtle",
				children: s.source
			})
		] })]
	}, s.id))] });
}
function Detectors() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Origin matters on aerospace/defense deals. Confirm OEM, energy rating, scintillator, and qualification package before quoting. Add the SKUs you actually sell."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetectorTypesVisual, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "detectors",
			addLabel: "Add detector",
			headers: [
				"Model",
				"Origin",
				"Pitch",
				"Area",
				"Energy",
				"Fit",
				"Caution"
			],
			factory: DETECTORS.map((d) => ({
				key: d.model,
				cells: [
					d.model,
					d.origin,
					d.pitch,
					d.area,
					d.energy,
					d.fit,
					d.caution
				]
			}))
		})
	] });
}
function Detection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "IQI sensitivity is % of material thickness. 2-2T = plaque 2% of part thickness + the 2T hole must be visible. Duplex wire IQI (ISO 19232-5 / ASTM E2002) evaluates unsharpness and SRb for digital systems."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "iqi-levels",
			addLabel: "Add IQI level",
			headers: [
				"Level",
				"Meaning",
				"Use"
			],
			factory: IQI_LEVELS.map((i) => ({
				key: i.level,
				cells: [
					i.level,
					i.meaning,
					i.use
				]
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "EPS heuristic"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm text-muted",
			children: "Defect ≥ 2–3× EPS is a starting point only."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "eps-rows",
			addLabel: "Add EPS row",
			headers: [
				"EPS / SRb",
				"Rough reliable 2D feature",
				"US"
			],
			factory: EPS_ROWS.map((e) => ({
				key: e.eps,
				cells: [
					e.eps,
					e.feature,
					e.us
				]
			}))
		})
	] });
}
function Modality() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Product routing picks the system; this picks the method."
		}), MODALITY.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: m.title }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: m.when
		}) })] }, m.title))]
	});
}
function Standards() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: Object.entries(STANDARDS).map(([k, rows]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
		tableId: `std-${k}`,
		addLabel: "Add standard",
		headers: [
			"Standard",
			"Type",
			"Description"
		],
		factory: rows.map((r) => ({
			key: r.id,
			cells: [
				r.id,
				r.type,
				r.desc
			]
		}))
	})] }, k)) });
}
function Commercial() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Incoterms 2020"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-2 text-sm text-muted",
			children: "Factory default is often FCA origin. US customers often ask for DDP — price it in or push to DAP."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "incoterms",
			addLabel: "Add Incoterm",
			headers: ["Term", "Detail"],
			factory: INCOTERMS.map((i) => ({
				key: i.term,
				cells: [i.term, i.detail]
			}))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "Process"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "commercial",
			addLabel: "Add commercial term",
			headers: ["Term", "Detail"],
			factory: COMMERCIAL.map((c) => ({
				key: c.term,
				cells: [c.term, c.detail]
			}))
		})
	] });
}
function Safety() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted",
		children: "For X-ray tube systems the practical question is usually cabinet vs permanent shielded room/vault."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
		tableId: "safety",
		addLabel: "Add safety note",
		headers: ["Context", "Reference"],
		factory: SAFETY.map((s) => ({
			key: s.context,
			cells: [s.context, s.point]
		}))
	})] });
}
function Glossary() {
	const factory = GLOSSARY.flatMap((c) => c.entries.map((e) => ({
		key: `${c.id}-${e.term}`,
		cells: [
			e.term,
			e.def,
			c.title
		]
	})));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted",
		children: "Factory glossary plus your local terms. Add the slang your plant uses."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
		tableId: "glossary",
		addLabel: "Add term",
		headers: [
			"Term",
			"Definition",
			"Category"
		],
		factory
	})] });
}
function Conversions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
		tableId: "conversions",
		addLabel: "Add conversion",
		headers: [
			"Microns",
			"mm",
			"Inches",
			"Use"
		],
		factory: [
			[
				"25 µm",
				"0.025 mm",
				"0.001 in",
				"Hi-res microfocus"
			],
			[
				"50 µm",
				"0.05 mm",
				"0.002 in",
				"Std microfocus"
			],
			[
				"100 µm",
				"0.1 mm",
				"0.004 in",
				"Fine detail CT"
			],
			[
				"127 µm",
				"0.127 mm",
				"0.005 in",
				"Std detector pixel"
			],
			[
				"200 µm",
				"0.2 mm",
				"0.008 in",
				"General purpose"
			],
			[
				"500 µm",
				"0.5 mm",
				"0.020 in",
				"Large parts"
			],
			[
				"1000 µm",
				"1.0 mm",
				"0.039 in",
				"Thick materials"
			]
		].map((r) => ({
			key: r[0],
			cells: r
		}))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-4 text-sm text-muted",
		children: "kg × 2.20462 = lb · 1 tonne = 1000 kg ≈ 2200 lb. Use Routing → Envelope checker for live unit conversion."
	})] });
}
function Chain() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCallout, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagingChainVisual, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScatterVisual, {})
	] });
}
function Linac() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-4 text-sm text-muted",
			children: "Use when thickness/density exceeds practical 450 kV. diondo d7 is the turnkey Linac-CT path. Confirm dose basis with the manufacturer — published Gy/min numbers are not interchangeable."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent",
			children: "6 MeV live-call compare"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableTable, {
			tableId: "linac-compare",
			addLabel: "Add compare row",
			headers: [
				"Parameter",
				"Varex Linatron M6 / M6A",
				"Siemens SILAC c"
			],
			factory: LINAC_COMPARE.map((r) => ({
				key: r.param,
				cells: [
					r.param,
					r.varex,
					r.siemens
				]
			}))
		})
	] });
}
//#endregion
export { LibraryArticle as component };
