export type Material = {
  id: string
  name: string
  density: string
  kv: string
  thickness: string
  notes: string
  group: "low" | "light" | "medium" | "heavy" | "high-z"
};

export const DENSITY_GROUPS = [
  {
    id: "low",
    name: "Non-metallic / very low density",
    examples: "Plastics, rubber, foam, CFRP/GFRP, ceramics",
    kv: "50–160 kV",
    notes: "Contrast is often easy; scatter and feature orientation can still dominate.",
  },
  {
    id: "light",
    name: "Light metals",
    examples: "Magnesium, aluminum, beryllium",
    kv: "80–225 kV",
    notes: "Strong DR candidates; CT feasible if part size and voxel support it.",
  },
  {
    id: "medium",
    name: "Medium density",
    examples: "Titanium, thin-wall stainless / Inconel / nickel alloys",
    kv: "160–450 kV",
    notes: "Watch total path length and the focal-spot / power tradeoff.",
  },
  {
    id: "heavy",
    name: "Heavy metals",
    examples: "Copper, brass, bronze, dense steels, nickel-base superalloys",
    kv: "225–600 kV / MeV",
    notes: "May need higher-energy CT, fan-beam / line detector, or LINAC.",
  },
  {
    id: "high-z",
    name: "Very dense / high-Z",
    examples: "Lead, tungsten, uranium, tantalum, thick superalloys",
    kv: "MeV / LINAC",
    notes: "Cabinet kV systems are unrealistic except very thin sections.",
  },
];

export const MATERIALS: Material[] = [
  { id: "polymer", name: "Polymers / plastics", density: "0.9–1.5 g/cc", kv: "50–120 kV", thickness: "up to ~300–500 mm / 12–20 in", notes: "Great for voids, assemblies, low-density FOD.", group: "low" },
  { id: "cfrp", name: "CFRP / composites", density: "1.4–1.8 g/cc", kv: "60–160 kV", thickness: "up to ~200–400 mm / 8–16 in", notes: "Delamination orientation matters; laminography/CT may help.", group: "low" },
  { id: "mg", name: "Magnesium", density: "1.7 g/cc", kv: "80–160 kV", thickness: "up to ~200–300 mm / 8–12 in", notes: "Good DR contrast; common casting use case.", group: "light" },
  { id: "be", name: "Beryllium", density: "1.85 g/cc", kv: "80–160 kV", thickness: "application-specific", notes: "High safety/handling sensitivity; confirm customer controls.", group: "light" },
  { id: "al", name: "Aluminum", density: "2.7 g/cc", kv: "100–225 kV", thickness: "up to ~200–250 mm / 8–10 in", notes: "Aerospace/casting staple; scatter rises quickly on thick parts.", group: "light" },
  { id: "ti", name: "Titanium", density: "4.5 g/cc", kv: "160–320 kV", thickness: "~25–80 mm / 1–3 in", notes: "CT possible but geometry and SNR drive feasibility.", group: "medium" },
  { id: "fe", name: "Iron / carbon steel", density: "7.8 g/cc", kv: "225–450 kV", thickness: "~10–100+ mm / 0.4–4+ in", notes: "Thin steel can be 225 kV; thicker sections trend to 450 kV or MeV.", group: "heavy" },
  { id: "ss", name: "Stainless steel", density: "7.9–8.1 g/cc", kv: "225–450 kV", thickness: "~10–90 mm / 0.4–3.5 in", notes: "Similar to steel; alloy content can increase attenuation.", group: "heavy" },
  { id: "ni", name: "Nickel alloys / Inconel", density: "8.2–8.9 g/cc", kv: "320–450 kV / MeV", thickness: "~10–75+ mm / 0.4–3+ in", notes: "Dense aerospace hardware; often benefits from application study.", group: "heavy" },
  { id: "cu", name: "Copper", density: "8.96 g/cc", kv: "320–450 kV / MeV", thickness: "~5–60 mm / 0.2–2.4 in", notes: "High attenuation; watch beam hardening.", group: "heavy" },
  { id: "brass", name: "Brass / bronze", density: "8.4–8.9 g/cc", kv: "320–450 kV / MeV", thickness: "~5–60 mm / 0.2–2.4 in", notes: "Similar to copper; alloy mix matters.", group: "heavy" },
  { id: "pb", name: "Lead", density: "11.3 g/cc", kv: "MeV", thickness: "thin sections only below MeV", notes: "Very high attenuation; avoid casual kV assumptions.", group: "high-z" },
  { id: "w", name: "Tungsten", density: "19.3 g/cc", kv: "MeV / LINAC", thickness: "application-specific", notes: "High-Z; even small parts can be challenging.", group: "high-z" },
  { id: "u", name: "Uranium / DU", density: "~19 g/cc", kv: "MeV / LINAC", thickness: "application-specific", notes: "Regulated/sensitive; escalate early.", group: "high-z" },
];

export const SOURCE_CLASSES = [
  { name: "Microfocus", spot: "single-digit µm to tens of µm", power: "Lower power", fit: "Small parts, high magnification, electronics, AM, high-resolution CT." },
  { name: "Mesofocus", spot: "~50–200 µm", power: "Middle ground", fit: "Balance of resolution and power for many aerospace/automotive parts." },
  { name: "Minifocus / industrial", spot: "0.4–1.0+ mm", power: "Higher power", fit: "General DR, thicker sections, throughput-focused work." },
  { name: "LINAC", spot: "~1–2 mm effective", power: "High pulsed dose", fit: "Large/dense parts, thick steel, rocket motors, turbines, defense hardware." },
];

export const STEEL_EQ = [
  { alloy: "Aluminum", factor: "≈ 0.35" },
  { alloy: "Titanium", factor: "≈ 0.60" },
  { alloy: "Inconel", factor: "≈ 1.1–1.2" },
  { alloy: "Copper", factor: "≈ 1.1" },
  { alloy: "Tungsten", factor: "≈ 2.4" },
];

export const IQI_LEVELS = [
  { level: "2-2T", meaning: "2% sensitivity, 2T hole", use: "Common baseline in aerospace / industrial RT specs. Still must meet the actual customer procedure." },
  { level: "1-2T", meaning: "1% sensitivity, 2T hole", use: "Stricter contrast sensitivity; may drive source, detector, geometry, exposure, and scatter control." },
  { level: "2-1T", meaning: "2% plaque, 1T hole (smaller)", use: "Stricter than 2-2T because the hole is smaller. Verify exact customer procedure language." },
  { level: "1-1T", meaning: "Ultra-strict", use: "Critical applications only; validate by application study before committing." },
];

export const EPS_ROWS = [
  { eps: "50 µm", feature: "≥150 µm", us: "≈ 0.006 in" },
  { eps: "100 µm", feature: "≥300 µm", us: "≈ 0.012 in" },
  { eps: "127 µm", feature: "≥380 µm", us: "≈ 0.015 in" },
  { eps: "200 µm", feature: "≥600 µm", us: "≈ 0.024 in" },
];
