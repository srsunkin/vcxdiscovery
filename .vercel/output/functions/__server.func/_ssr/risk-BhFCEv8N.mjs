import { d as on, p as v } from "./router-fudB7XKc.mjs";
import { f as RISK_FLAGS } from "./playbook-xobszCRE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/risk-BhFCEv8N.js
function computeRisks() {
	const items = [];
	const high = [];
	if (!v("inspect_task") && !v("disc_defects")) high.push("Inspection objective / defect criteria are not captured.");
	if (!on("doc_cad")) items.push({
		level: "warn",
		text: "CAD / STP file not confirmed; fit checks and CT review may slip."
	});
	if (!on("sample_yesfull") && !on("sample_yespartial") && v("test_sample") !== "Full" && v("test_sample") !== "Partial") items.push({
		level: "warn",
		text: "Representative sample availability not confirmed."
	});
	if (!v("budget_custom")) items.push({
		level: "warn",
		text: "Budget status or range not captured."
	});
	if (!v("target_install") && !v("expected_order")) items.push({
		level: "warn",
		text: "Timeline / expected order / install date is not clear."
	});
	if (!v("site_constraints") && !v("disc_site")) items.push({
		level: "warn",
		text: "Site constraints, utilities, or installation location still need confirmation."
	});
	if (!v("software_req")) items.push({
		level: "warn",
		text: "Software / data / archive requirements not captured."
	});
	if (v("competition") === "Yes" || v("competition_who")) items.push({
		level: "warn",
		text: "Competitor active — clarify incumbent, pricing, strengths, and dissatisfaction."
	});
	if (!v("stake_budget") || !v("stake_tech")) items.push({
		level: "warn",
		text: "Buying group is thin — map economic buyer and technical decision-maker."
	});
	if (on("ct_check_planar") && v("project_type") === "New 2D DR") items.push({
		level: "high",
		text: "Planar / orientation-sensitive defects with a 2D-only project type — CT case is likely."
	});
	for (const f of RISK_FLAGS) if (on(f.id)) items.push({
		level: "warn",
		text: f.label
	});
	high.forEach((t) => items.unshift({
		level: "high",
		text: t
	}));
	if (!items.length) items.push({
		level: "ok",
		text: "No major risks detected from current inputs. Confirm with samples before committing performance."
	});
	const highs = items.filter((i) => i.level === "high").length;
	const warns = items.filter((i) => i.level === "warn").length;
	return {
		items,
		level: highs ? "High" : warns >= 4 ? "Medium" : "Low"
	};
}
//#endregion
export { computeRisks as t };
