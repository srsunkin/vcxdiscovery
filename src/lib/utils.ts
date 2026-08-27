import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function uid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function fmtDate(iso?: string) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function downloadText(filename: string, text: string, mime = "text/plain") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function copyText(text: string) {
  return navigator.clipboard.writeText(text);
}

export function mmToIn(mm: number) {
  return mm / 25.4;
}

export function inToMm(inches: number) {
  return inches * 25.4;
}

export function kgToLb(kg: number) {
  return kg * 2.20462;
}

export function lbToKg(lb: number) {
  return lb / 2.20462;
}

export function formatMmIn(mm: number) {
  if (!Number.isFinite(mm) || mm <= 0) return "Custom";
  return `${Math.round(mm)} mm / ${mmToIn(mm).toFixed(1)} in`;
}

export function formatKgLb(kg: number) {
  if (!Number.isFinite(kg) || kg <= 0) return "Custom";
  return `${Math.round(kg)} kg / ${Math.round(kgToLb(kg)).toLocaleString()} lb`;
}
