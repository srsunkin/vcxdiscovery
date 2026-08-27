import { SCRIPT } from "@/data/questions";

export type Profile = {
  owner: string
  org: string
  roleLine: string
  opening: string
  intros: string
  transition: string
};

const KEY = "discovery-kit-profile-v1";
export const PROFILE_EVENT = "discovery-kit-profile";

export const DEFAULT_PROFILE: Profile = {
  owner: "",
  org: "",
  roleLine: "Industrial X-ray / CT",
  opening:
    "Welcome and thanks for taking the time. I cover industrial X-ray and CT inspection systems. I'm here to understand your challenges and see how we might help.",
  intros: SCRIPT.intros,
  transition: SCRIPT.transition,
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_PROFILE };
    const p = JSON.parse(raw) as Partial<Profile>;
    return { ...DEFAULT_PROFILE, ...p };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(p));
  window.dispatchEvent(new Event(PROFILE_EVENT));
}

export function displayOrg(p: Profile = loadProfile()) {
  return p.org.trim() || p.roleLine;
}

export function displayOwner(p: Profile = loadProfile(), dealOwner?: string) {
  const fromDeal = (dealOwner || "").trim();
  const fromProfile = p.owner.trim();
  return fromDeal || fromProfile || "[Your name]";
}
