import { SYSTEMS, type System } from "@/data/systems";
import { allValues, on, v } from "@/lib/store";

export type RouteResult = {
  system: System
  score: number
  reasons: string[]
};

function blob(): string {
  return Object.values(allValues())
    .map((x) => (typeof x === "string" ? x : x ? "yes" : ""))
    .join(" ")
    .toLowerCase();
}

export function inferRoutes(): RouteResult[] {
  const text = blob();
  const scores = new Map<string, { score: number; reasons: string[] }>();
  const bump = (id: string, n: number, reason: string) => {
    const cur = scores.get(id) ?? { score: 0, reasons: [] };
    cur.score += n;
    if (reason && !cur.reasons.includes(reason)) cur.reasons.push(reason);
    scores.set(id, cur);
  };

  const ctTicks = [
    "ct_check_planar",
    "ct_check_overlap",
    "ct_check_internal",
    "ct_check_3d",
    "ct_check_process",
    "ct_check_metrology",
  ].filter(on).length;

  if (/linac|mev|vault|rocket|motor|gantry|walk.?in|oversize|giga|x[- ]?line/.test(text)) {
    bump("x-line", 40, "Large / custom / high-energy language in the capture");
  }
  if (/linac|mev|rocket|thick steel|turbine/.test(text)) {
    bump("d7", 28, "MeV / thick-section indicators");
  }
  if (v("project_type") === "New CT" || /ct|metrology|voxel|cad comparison|diondo|dimensional/.test(text) || ctTicks >= 2) {
    bump("d5", 18, "CT / metrology need indicated");
    bump("d2", 12, "CT / metrology need indicated");
    if (ctTicks >= 2) bump("d5", 10, `${ctTicks} CT decision checks ticked`);
  }
  if (on("ct_check_metrology")) bump("d5", 12, "Traceable metrology CT required");
  if (/casting|giga|battery tray|inline|1\.5 seconds|high.?speed|adr/.test(text) || on("auto_defect")) {
    bump("pro-fi", 24, "Casting / high-throughput / ADR indicators");
  }
  if (on("auto_load_robotic") || /robot|kuka|fanuc|abb/.test(text)) {
    bump("eco-r", 22, "Robotic loading / production cell");
  }
  if (/small|electronics|additive|\bam\b|micro|225\s*kv|<5 lbs/.test(text)) {
    bump("pro-h", 20, "Small / precision / 225 kV class");
  }
  if (/450|320|heavy|600 kg|aerospace|defense|c-arm/.test(text)) {
    bump("pro-c", 20, "Medium/large flexible cabinet indicators");
  }
  if (/crane|top.?load/.test(text)) bump("pro-c-tl", 22, "Crane / top-load access");
  if (/retrofit|diconde|compass|vc\.review|software/.test(text) || v("project_type") === "Retrofit") {
    bump("software", 26, "Software / service / retrofit path");
  }
  if (/battery|am |additive/.test(text)) bump("d1", 14, "AM / battery R&D CT");
  if (/d3|compact ct|flexible footprint/.test(text)) bump("d3", 12, "Compact flexible CT");
  if (/cylinder head|crankcase|cast iron/.test(text)) bump("d4", 16, "Dense ICE / cast iron CT");
  if (v("project_type") === "X-line") bump("x-line", 30, "Project type set to X-line");
  if (v("project_type") === "New 2D DR") bump("pro-c", 8, "New 2D DR — default flexible cabinet");

  if (![...scores.values()].some((s) => s.score >= 12)) {
    bump("pro-c", 8, "Default flexible cabinet until envelope and throughput are confirmed");
    bump("eco-c", 6, "Value alternative if budget is the constraint");
  }

  return SYSTEMS.map((system) => {
    const s = scores.get(system.id) ?? { score: 0, reasons: [] };
    return { system, score: s.score, reasons: s.reasons };
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function topRoute(): RouteResult | undefined {
  return inferRoutes()[0];
}
