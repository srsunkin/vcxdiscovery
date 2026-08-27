import { create } from "zustand";
import { uid, todayISO } from "@/lib/utils";
import { loadProfile } from "@/lib/profile";

export type DealValues = Record<string, string | boolean>;

export type Deal = {
  id: string
  createdAt: string
  updatedAt: string
  values: DealValues
};

type State = {
  hydrated: boolean
  deals: Deal[]
  activeId: string | null
  setHydrated: (v: boolean) => void
  active: () => Deal | undefined
  get: (id: string) => string
  checked: (id: string) => boolean
  setValue: (id: string, value: string | boolean) => void
  newDeal: () => void
  duplicateDeal: () => void
  deleteDeal: (id: string) => void
  setActive: (id: string) => void
  importFields: (fields: Record<string, unknown>, merge?: boolean) => void
  clearActive: () => void
  replaceAll: (deals: Deal[], activeId: string | null) => void
};

const STORAGE_KEY = "vcxray-discovery-v1";

function defaults(): DealValues {
  const p = typeof window === "undefined" ? { owner: "" } : loadProfile();
  return {
    sales_owner: p.owner || "",
    call_date: todayISO(),
  };
}

function blankDeal(): Deal {
  return {
    id: uid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    values: defaults(),
  };
}

export const useDealStore = create<State>()((set, get) => ({
  hydrated: false,
  deals: [],
  activeId: null,
  setHydrated: (v) => set({ hydrated: v }),
  replaceAll: (deals, activeId) => set({ deals, activeId, hydrated: true }),
  active: () => {
    const s = get();
    return s.deals.find((d) => d.id === s.activeId) ?? s.deals[0];
  },
  get: (id) => {
    const v = get().active()?.values[id];
    return typeof v === "string" ? v : "";
  },
  checked: (id) => get().active()?.values[id] === true,
  setValue: (id, value) => {
    const s = get();
    let deals = s.deals;
    let activeId = s.activeId;
    if (!deals.length || !activeId) {
      const d = blankDeal();
      deals = [d];
      activeId = d.id;
    }
    set({
      activeId,
      deals: deals.map((d) =>
        d.id === activeId
          ? { ...d, updatedAt: new Date().toISOString(), values: { ...d.values, [id]: value } }
          : d,
      ),
    });
  },
  newDeal: () => {
    const d = blankDeal();
    set((s) => ({ deals: [d, ...s.deals], activeId: d.id }));
  },
  duplicateDeal: () => {
    const src = get().active();
    if (!src) return get().newDeal();
    const d: Deal = {
      ...src,
      id: uid(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      values: { ...src.values },
    };
    set((s) => ({ deals: [d, ...s.deals], activeId: d.id }));
  },
  deleteDeal: (id) => {
    set((s) => {
      const deals = s.deals.filter((d) => d.id !== id);
      const activeId = s.activeId === id ? (deals[0]?.id ?? null) : s.activeId;
      return { deals, activeId };
    });
  },
  setActive: (id) => set({ activeId: id }),
  importFields: (fields, merge = true) => {
    const flat: DealValues = {};
    Object.entries(fields).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      if (typeof v === "boolean") flat[k] = v;
      else if (typeof v === "number") flat[k] = String(v);
      else if (typeof v === "string") flat[k] = v;
    });
    const s = get();
    if (!s.activeId || !s.deals.length) {
      const d = blankDeal();
      d.values = { ...d.values, ...flat };
      set({ deals: [d, ...s.deals], activeId: d.id });
      return;
    }
    set({
      deals: s.deals.map((d) =>
        d.id === s.activeId
          ? {
              ...d,
              updatedAt: new Date().toISOString(),
              values: merge ? { ...d.values, ...flat } : { ...defaults(), ...flat },
            }
          : d,
      ),
    });
  },
  clearActive: () => {
    const s = get();
    if (!s.activeId) return;
    set({
      deals: s.deals.map((d) =>
        d.id === s.activeId
          ? { ...d, updatedAt: new Date().toISOString(), values: defaults() }
          : d,
      ),
    });
  },
}));

export function loadDealsFromStorage() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { deals?: Deal[]; activeId?: string | null; state?: { deals?: Deal[]; activeId?: string | null } };
      const deals = parsed.deals ?? parsed.state?.deals ?? [];
      const activeId = parsed.activeId ?? parsed.state?.activeId ?? deals[0]?.id ?? null;
      if (deals.length) {
        useDealStore.getState().replaceAll(deals, activeId);
        return;
      }
    }
  } catch {
    /* ignore corrupt storage */
  }
  const s = useDealStore.getState();
  if (!s.deals.length) s.newDeal();
  s.setHydrated(true);
}

export function saveDealsToStorage() {
  if (typeof window === "undefined") return;
  const { deals, activeId, hydrated } = useDealStore.getState();
  if (!hydrated) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ deals, activeId }));
  } catch {
    /* quota */
  }
}

export function allValues(): DealValues {
  return useDealStore.getState().active()?.values ?? {};
}

export function v(id: string): string {
  const val = allValues()[id];
  return typeof val === "string" ? val : "";
}

export function on(id: string): boolean {
  return allValues()[id] === true;
}
