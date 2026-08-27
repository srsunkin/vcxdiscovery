import {
  BookOpen,
  Boxes,
  ClipboardList,
  Compass,
  FileOutput,
  LayoutDashboard,
  Library,
  Phone,
  Settings,
  ShieldAlert,
  Waypoints,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  to: string
  label: string
  hint: string
  icon: LucideIcon
  group: "work" | "intel"
};

export const NAV: NavItem[] = [
  { to: "/", label: "Command", hint: "Live snapshot of the active deal", icon: LayoutDashboard, group: "work" },
  { to: "/call", label: "Call mode", hint: "One question at a time", icon: Phone, group: "work" },
  { to: "/discovery", label: "Discovery", hint: "Full Q1–Q10 capture", icon: ClipboardList, group: "work" },
  { to: "/compass", label: "COMPASS / ADR", hint: "AI deployment capture", icon: Compass, group: "work" },
  { to: "/routing", label: "Routing & fit", hint: "System pick + envelope checker", icon: Waypoints, group: "work" },
  { to: "/risk", label: "Risk radar", hint: "Missing capture and red flags", icon: ShieldAlert, group: "work" },
  { to: "/outputs", label: "Handoff", hint: "Briefs and emails", icon: FileOutput, group: "work" },
  { to: "/playbook", label: "Playbook", hint: "Roles, objections, ROI", icon: BookOpen, group: "intel" },
  { to: "/library", label: "Library", hint: "kV, systems, standards, glossary", icon: Library, group: "intel" },
  { to: "/deals", label: "Deals", hint: "Switch, export, import", icon: Boxes, group: "intel" },
  { to: "/settings", label: "Settings", hint: "Your name, company, script", icon: Settings, group: "intel" },
];

export const LIBRARY_PAGES = [
  { slug: "kv", letter: "A", title: "kV / tube", blurb: "Density groups, thickness windows, source class." },
  { slug: "systems", letter: "B", title: "VCxray systems", blurb: "Published envelopes + picking guide." },
  { slug: "diondo", letter: "C", title: "diondo CT", blurb: "dsubµ through d7 — sample vs scan volume." },
  { slug: "detectors", letter: "D", title: "Detectors", blurb: "DDA shortlist — add your local SKUs." },
  { slug: "detection", letter: "E", title: "Detection / IQI", blurb: "2-2T, EPS heuristic, duplex wire." },
  { slug: "modality", letter: "F", title: "Modality", blurb: "DR vs laminography vs CT vs ADR." },
  { slug: "objections", letter: "G", title: "Objections", blurb: "Acknowledge, reframe, prove on their parts." },
  { slug: "standards", letter: "H", title: "Standards", blurb: "ASTM, ISO, Nadcap, DICONDE — add customer specs." },
  { slug: "executive", letter: "I", title: "Exec / ROI", blurb: "Translate features into outcomes." },
  { slug: "commercial", letter: "J", title: "Commercial", blurb: "Incoterms, milestones, BANT." },
  { slug: "safety", letter: "K", title: "Safety", blurb: "Cabinet vs vault, dose, NRTL." },
  { slug: "glossary", letter: "L", title: "Glossary", blurb: "NDT sales terms + your local slang." },
  { slug: "conversions", letter: "M", title: "Conversions", blurb: "µm, mm, inches, kg, envelopes." },
  { slug: "chain", letter: "N", title: "Imaging chain", blurb: "Customer-safe screen-share sheet." },
  { slug: "linac", letter: "O", title: "Linac sources", blurb: "d7, Varex M6, Siemens SILAC." },
];
