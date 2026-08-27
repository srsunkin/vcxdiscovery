import { SYSTEMS, type System } from "@/data/systems";

export type FitInput = {
  diaMm: number
  heightMm: number
  weightKg: number
  needCt: boolean
  robotic: boolean
  highThroughput: boolean
  crane: boolean
  energyHint: "low" | "mid" | "high" | "linac" | "any"
};

export type FitRow = {
  system: System
  fit: "yes" | "tight" | "no" | "custom"
  reasons: string[]
};

export function fitSystems(input: FitInput): FitRow[] {
  return SYSTEMS.filter((s) => s.id !== "software").map((system) => {
    const reasons: string[] = [];
    if (system.custom) {
      reasons.push("Custom / project envelope — engineering path");
      if (input.energyHint === "linac" && system.tags.includes("linac")) reasons.push("Linac / MeV match");
      if (input.highThroughput && system.tags.includes("giga")) reasons.push("Giga / custom throughput");
      return { system, fit: "custom" as const, reasons };
    }

    const massLimit = system.weightKgHigh && input.weightKg > system.maxWeightKg ? system.weightKgHigh : system.maxWeightKg;
    const useScan = input.needCt && Boolean(system.scanDiaMm || system.scanHeightMm);
    const diaLimit =
      useScan && system.scanDiaMm ? Math.min(system.maxDiaMm, system.scanDiaMm) : system.maxDiaMm;
    const hLimit =
      useScan && system.scanHeightMm ? Math.min(system.maxHeightMm, system.scanHeightMm) : system.maxHeightMm;
    const diaOk = !input.diaMm || input.diaMm <= diaLimit;
    const hOk = !input.heightMm || input.heightMm <= hLimit;
    const wOk = !input.weightKg || input.weightKg <= massLimit;
    if (input.diaMm && !diaOk) {
      reasons.push(`Diameter ${Math.round(input.diaMm)} mm exceeds published ${diaLimit} mm${useScan ? " scan volume" : ""}`);
    }
    if (input.heightMm && !hOk) {
      reasons.push(`Height ${Math.round(input.heightMm)} mm exceeds published ${hLimit} mm${useScan ? " scan volume" : ""}`);
    }
    if (input.weightKg && !wOk) reasons.push(`Weight ${Math.round(input.weightKg)} kg exceeds published ${massLimit} kg`);

    if (system.id === "pro-c" && input.weightKg > 60 && input.weightKg <= 600) {
      reasons.push("Mass needs PRO C.320/450 (600 kg). PRO C.225 is 60 kg.");
    }
    if (system.id === "d7" && input.diaMm > 700 && input.diaMm <= 1000) {
      reasons.push("Diameter needs line-detector path (Ø1000). FPD is Ø700.");
    }
    if (system.note && diaOk && hOk && wOk) reasons.push(system.note);

    if (diaOk && hOk && wOk && !system.note) reasons.push("Envelope and mass fit published catalog");

    if (input.needCt && system.line === "diondo") reasons.push("Dedicated CT platform");
    if (input.needCt && system.tags.includes("ct")) reasons.push("CT-capable");
    if (input.robotic && system.tags.includes("robot")) reasons.push("Robot-in-cabinet");
    if (input.highThroughput && system.tags.includes("throughput")) reasons.push("High-throughput casting");
    if (input.crane && system.tags.includes("crane")) reasons.push("Top-loader / crane access");
    if (input.energyHint === "linac" && !system.tags.includes("linac") && !system.tags.includes("high-energy")) {
      reasons.push("Energy class may be insufficient for MeV work");
    }
    if (input.energyHint === "high" && /160 \/ 225/.test(system.energy) && !/320|450|600/.test(system.energy)) {
      reasons.push("Max published energy is 225 kV");
    }

    const hardFail = !diaOk || !hOk || !wOk;
    const tight =
      !hardFail &&
      ((input.diaMm && input.diaMm > diaLimit * 0.85) ||
        (input.heightMm && input.heightMm > hLimit * 0.85) ||
        (input.weightKg && input.weightKg > massLimit * 0.85));

    return {
      system,
      fit: hardFail ? ("no" as const) : tight ? ("tight" as const) : ("yes" as const),
      reasons,
    };
  });
}
