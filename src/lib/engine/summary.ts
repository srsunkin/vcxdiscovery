import { topRoute } from "@/lib/engine/routing";
import { computeRisks } from "@/lib/engine/risk";
import { computeProgress } from "@/lib/engine/progress";
import { on, useDealStore, v } from "@/lib/store";

function dash(s: string) {
  return s.trim() ? s.trim() : "—";
}

export function buildSummary(): string {
  if (!useDealStore.getState().hydrated) return "";
  const route = topRoute();
  const risks = computeRisks();
  const lines = [
    `Customer: ${dash(v("customer"))} | Contact: ${dash(v("contact_name"))} | Date: ${dash(v("call_date"))}`,
    `Project: ${dash(v("project_name"))} | Stage: ${dash(v("stage"))} | Owner: ${dash(v("sales_owner"))}`,
    `Objective: ${dash(v("inspect_task") || v("disc_defects"))}`,
    `Pain / why now: ${dash(v("disc_pain"))}`,
    `Part / material: ${dash(v("part_desc") || v("disc_parts"))} | ${dash(v("materials"))} | Thickness: ${dash(v("wall_thickness"))} | Weight: ${dash(v("weight"))}`,
    `Defects / IQ: ${dash(v("inspect_task"))} | Detector: ${dash(v("detector_req"))} | Source: ${dash(v("xray_source"))}`,
    `Throughput: ${dash(v("rate_volume") || v("disc_volume"))} | Peak: ${dash(v("peak_avg"))}`,
    `Software/data: ${dash(v("software_req"))}`,
    `Site: ${dash(v("site_constraints") || v("disc_site"))} | Incoterms: ${dash(v("incoterms"))} | Budget: ${dash(v("budget_custom"))}`,
    `Suggested route: ${route ? `${route.system.name} — ${route.reasons[0] ?? route.system.short}` : "—"}`,
    `Risks: ${risks.items
      .filter((i) => i.level !== "ok")
      .slice(0, 6)
      .map((i) => i.text)
      .join("; ") || "No major risks detected"}`,
    `Next action: ${dash(v("roadmap1"))} | Owner: ${dash(v("next_action_owner"))} | Date: ${dash(v("next_action_date"))}`,
  ];
  return lines.join("\n");
}

export function buildHandoff(): string {
  if (!useDealStore.getState().hydrated) return "";
  const p = computeProgress();
  return `INTERNAL HANDOFF

${buildSummary()}

Capture: ${p.filled}/${p.total} critical fields (${p.pct}%)

Required files:
- CAD/STP: ${on("doc_cad") ? "Yes" : "No / not confirmed"}
- 2D drawings: ${on("doc_2d") ? "Yes" : "No / not confirmed"}
- Technique: ${on("doc_technique") ? "Yes" : "No / not confirmed"}
- Samples: ${on("sample_yesfull") || on("sample_yespartial") || v("test_sample") === "Full" || v("test_sample") === "Partial" ? "Yes" : "No / not confirmed"}

Stakeholders:
- Budget owner: ${dash(v("stake_budget"))}
- Technical decision-maker: ${dash(v("stake_tech"))}
- Purchasing: ${dash(v("stake_purch"))}
- Operations/quality: ${dash(v("stake_ops"))}

Commercial timing:
- Budgetary quote: ${dash(v("budget_quote_deadline"))}
- Final quote: ${dash(v("final_quote_deadline"))}
- Target install: ${dash(v("target_install"))}
- Expected order: ${dash(v("expected_order"))}

Risks / mitigation:
${computeRisks()
  .items.map((i) => `- ${i.text}`)
  .join("\n")}
${v("risk_mitigation") ? `\nMitigation notes: ${v("risk_mitigation")}` : ""}`;
}

export function snapshotSignals() {
  const p = computeProgress();
  if (!useDealStore.getState().hydrated) {
    return {
      progress: `0% complete (0/${p.total})`,
      pct: 0,
      missing: "—",
      route: "—",
      routeReason: "",
      risk: "Low",
      next: "—",
    };
  }
  const route = topRoute();
  const risks = computeRisks();
  const next = [v("roadmap1"), v("next_action_owner"), v("next_action_date")].filter(Boolean).join(" · ");
  return {
    progress: `${p.pct}% complete (${p.filled}/${p.total})`,
    pct: p.pct,
    missing: p.missing.slice(0, 8).map((m) => m.label).join(", ") + (p.missing.length > 8 ? "…" : "") || "None",
    route: route?.system.name ?? "—",
    routeReason: route?.reasons[0] ?? "",
    risk: risks.level,
    next: next || "—",
  };
}
