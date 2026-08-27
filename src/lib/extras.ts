import { uid } from "@/lib/utils";

export type ExtraRow = { id: string; cells: string[] };

export type LibExtras = {
  added: Record<string, ExtraRow[]>
  overrides: Record<string, Record<string, string[]>>
  hidden: Record<string, string[]>
};

const KEY = "discovery-kit-library-v1";

const EMPTY: LibExtras = { added: {}, overrides: {}, hidden: {} };

export function loadExtras(): LibExtras {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { added: {}, overrides: {}, hidden: {} };
    const p = JSON.parse(raw) as Partial<LibExtras>;
    return {
      added: p.added ?? {},
      overrides: p.overrides ?? {},
      hidden: p.hidden ?? {},
    };
  } catch {
    return { added: {}, overrides: {}, hidden: {} };
  }
}

export function saveExtras(data: LibExtras) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function addRow(tableId: string, colCount: number): LibExtras {
  const data = loadExtras();
  const row: ExtraRow = { id: uid(), cells: Array.from({ length: colCount }, () => "") };
  data.added[tableId] = [...(data.added[tableId] ?? []), row];
  saveExtras(data);
  return data;
}

export function updateAdded(tableId: string, id: string, cells: string[]): LibExtras {
  const data = loadExtras();
  data.added[tableId] = (data.added[tableId] ?? []).map((r) => (r.id === id ? { ...r, cells } : r));
  saveExtras(data);
  return data;
}

export function removeAdded(tableId: string, id: string): LibExtras {
  const data = loadExtras();
  data.added[tableId] = (data.added[tableId] ?? []).filter((r) => r.id !== id);
  saveExtras(data);
  return data;
}

export function overrideFactory(tableId: string, key: string, cells: string[]): LibExtras {
  const data = loadExtras();
  data.overrides[tableId] = { ...(data.overrides[tableId] ?? {}), [key]: cells };
  saveExtras(data);
  return data;
}

export function hideFactory(tableId: string, key: string): LibExtras {
  const data = loadExtras();
  const cur = new Set(data.hidden[tableId] ?? []);
  cur.add(key);
  data.hidden[tableId] = [...cur];
  saveExtras(data);
  return data;
}

export function restoreFactory(tableId: string, key: string): LibExtras {
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
