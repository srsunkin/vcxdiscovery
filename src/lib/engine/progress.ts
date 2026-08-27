import { COVER_FIELDS, QUESTIONS, type FieldDef } from "@/data/questions";
import { allValues, useDealStore } from "@/lib/store";

function filled(id: string, kind?: FieldDef["kind"]): boolean {
  const vals = allValues();
  const v = vals[id];
  if (kind === "checks") return v === true;
  if (kind === "radio") return typeof v === "string" && v.length > 0;
  if (typeof v === "boolean") return v;
  return typeof v === "string" && v.trim().length > 0;
}

export function criticalList(): { id: string; label: string }[] {
  const out: { id: string; label: string }[] = [];
  for (const f of COVER_FIELDS) {
    if (f.critical) out.push({ id: f.id, label: f.label });
  }
  for (const q of QUESTIONS) {
    out.push({ id: q.notesId, label: `${q.num} notes` });
    for (const f of q.fields) {
      if (f.critical) out.push({ id: f.id, label: f.label });
    }
  }
  return out;
}

export function computeProgress() {
  if (!useDealStore.getState().hydrated) {
    const total = criticalList().length;
    return { pct: 0, filled: 0, total, missing: criticalList() };
  }
  const crit = criticalList();
  const missing = crit.filter((c) => !filled(c.id));
  const filledN = crit.length - missing.length;
  const pct = crit.length ? Math.round((filledN / crit.length) * 100) : 0;
  return { pct, filled: filledN, total: crit.length, missing };
}
