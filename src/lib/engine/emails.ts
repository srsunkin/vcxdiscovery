import { topRoute } from "@/lib/engine/routing";
import { computeProgress } from "@/lib/engine/progress";
import { v } from "@/lib/store";
import { displayOrg, displayOwner, loadProfile } from "@/lib/profile";

function n(s: string, fallback: string) {
  return s.trim() ? s.trim() : fallback;
}

function owner() {
  return displayOwner(loadProfile(), v("sales_owner"));
}

function org() {
  return displayOrg(loadProfile());
}

function sign() {
  const o = org();
  return `${owner()}\n${o}`;
}

function routeName() {
  return topRoute()?.system.name ?? "[direction]";
}

function missingBullets() {
  const m = computeProgress().missing.map((x) => `• ${x.label}`);
  return m.length ? m.join("\n") : "• No obvious missing critical fields.";
}

export type EmailKey =
  | "intro"
  | "followup"
  | "missing"
  | "sample"
  | "quote"
  | "procurement"
  | "proposal"
  | "cadence"
  | "breakup";

export const EMAIL_META: { key: EmailKey; label: string }[] = [
  { key: "intro", label: "Pre-call intro" },
  { key: "followup", label: "Follow-up" },
  { key: "missing", label: "Missing inputs" },
  { key: "sample", label: "Sample / study" },
  { key: "quote", label: "Quote next steps" },
  { key: "procurement", label: "Procurement" },
  { key: "proposal", label: "Proposal cover" },
  { key: "cadence", label: "Check-in" },
  { key: "breakup", label: "Close the loop" },
];

export function buildEmail(key: EmailKey): string {
  const name = n(v("contact_name"), "[Name]");
  const company = n(v("customer"), "[Company]");
  const project = n(v("project_name"), "the X-ray / CT inspection project");
  const pain = n(v("disc_pain"), "[pain point]");
  const part = n(v("part_desc") || v("disc_parts"), "[part / geometry]");
  const mat = n(v("materials"), "[material]");
  const thk = n(v("wall_thickness"), "[thickness]");
  const obj = n(v("inspect_task") || v("disc_defects"), "[inspection objective]");
  const vol = n(v("rate_volume") || v("disc_volume"), "[volume / cycle time]");
  const next = n(v("roadmap1"), "[recommended next step]");
  const date = v("call_date") || "[scheduled date]";
  const brand = org();

  switch (key) {
    case "intro":
      return `Subject: Ahead of our call — X-ray / CT discovery

Hi ${name},

Looking forward to speaking on ${date}. I work with industrial X-ray and CT inspection — helping manufacturers in aerospace, additive, casting, defense, and advanced manufacturing find what other methods miss.

A few things that would help me prepare:

1. What parts are you looking to inspect, and what's the critical defect or measurement objective?
2. Are you working from a specific standard or customer quality requirement (Nadcap, ASTM, ISO, customer spec)?
3. What does your current inspection process look like today — film, legacy DR, outsourced CT, or something else?
4. Is this for a new capability, a capacity upgrade, or replacing existing equipment?

A sentence or two on each is plenty. It means I show up with the right reference material.

Best,
${sign()}`;
    case "followup":
      return `Subject: Follow-up — ${company} X-ray inspection discovery

Hi ${name},

Thank you for the time today. My understanding of the project is:

• Primary challenge: ${pain}
• Parts/materials: ${part}; ${mat}; thickness ${thk}
• Inspection objective: ${obj}
• Production need: ${vol}
• Potential direction: ${routeName()}

The most useful next inputs are CAD/STP files, 2D drawings, acceptance criteria, current technique sheets or example images, and representative sample parts if available.

Recommended next step: ${next}

Best,
${sign()}`;
    case "missing":
      return `Subject: Missing inputs for X-ray / CT application review

Hi ${name},

To move ${project} forward accurately, could you please help us gather the following?

${missingBullets()}

The highest-value items are usually CAD/STP, 2D drawings, acceptance criteria, technique sheets/images, and representative samples.

Best,
${sign()}`;
    case "sample":
      return `Subject: Application study / sample scan inputs — ${company}

Hi ${name},

Based on the target inspection objective (${obj}), an application study or sample scan would help confirm the right configuration before quoting.

Useful sample package:
• Representative production part(s)
• Known-good and known-bad samples if available
• CAD/STP and 2D drawing(s)
• Acceptance criteria / inspection procedure
• Any current film, CR, DDA, or CT images
• Desired detection target: ${n(v("detector_req"), "[minimum feature size]")}

Best,
${sign()}`;
    case "quote":
      return `Subject: Quote next steps — ${company} ${project}

Hi ${name},

Based on what we captured, we are aligning the proposed direction around ${routeName()}.

Before issuing or finalizing the quote, the main items to confirm are:

${missingBullets()}

Commercial timing captured so far:
• Budgetary quote deadline: ${n(v("budget_quote_deadline"), "[date]")}
• Final quote deadline: ${n(v("final_quote_deadline"), "[date]")}
• Target install: ${n(v("target_install"), "[date]")}
• Incoterms: ${n(v("incoterms"), "[FCA / DAP / DDP]")}

Best,
${sign()}`;
    case "procurement":
      return `Subject: Commercial clarification — Incoterms, payment, and project schedule

Hi ${name},

To align our proposal with your purchasing process, could you please confirm:

• Quoting entity / ordering entity
• Preferred Incoterms: ${n(v("incoterms"), "[FCA / DAP / DDP]")}
• Required payment terms or milestone structure
• Vendor setup requirements
• Required quote validity
• Any import, tariff, insurance, or delivery requirements
• Target PO date and required delivery / installation schedule

Best,
${sign()}`;
    case "proposal":
      return `Subject: Proposal — ${company} X-ray inspection project

Hi ${name},

Thank you for the opportunity to support ${company}. Based on the information captured so far, I am preparing / sending the proposal around:

• Application: ${part}
• Material / thickness: ${mat}; ${thk}
• Inspection objective: ${obj}
• Throughput / workflow: ${vol}
• Proposed direction: ${routeName()}
• Target timing: ${n(v("target_install") || v("expected_order"), "[timing]")}

After you have had a chance to review, I recommend a short technical/commercial review to confirm configuration, responsibilities, timeline, and any open exceptions.

Best,
${sign()}`;
    case "cadence":
      return `Subject: Checking in — ${company}

Hi ${name},

I wanted to check in on ${project} and see if your team has had a chance to review what we discussed.

• Primary driver: ${pain}
• Application: ${part}
• Inspection need: ${obj}
• Current next step: ${next}

Would it be useful to reconnect for 15–20 minutes on open technical questions, missing inputs, or quote timing?

Best,
${sign()}`;
    case "breakup":
      return `Subject: Should I close the loop for now? — ${company}

Hi ${name},

I wanted to close the loop on ${project}. My last understanding was that your team was evaluating ${routeName()} for ${part}, with the key driver being ${pain}.

If this is still active, I am happy to help with the next step — sample scan, technical review, budgetary quote, or proposal clarification.

If priorities have shifted, no problem at all; I can pause follow-up and reconnect when the project becomes active again.

Best,
${sign()}`;
  }
}
