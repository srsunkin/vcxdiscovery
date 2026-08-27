export type FieldKind = "text" | "textarea" | "select" | "radio" | "checks" | "date";

export type FieldDef = {
  id: string
  label: string
  kind: FieldKind
  placeholder?: string
  hint?: string
  options?: { id: string; label: string; value?: string }[]
  critical?: boolean
  group?: string
};

export type Question = {
  id: string
  num: string
  title: string
  prompt: string
  hint: string
  notesId: string
  fields: FieldDef[]
};

export const COVER_FIELDS: FieldDef[] = [
  { id: "customer", label: "Customer", kind: "text", placeholder: "Company name", critical: true },
  { id: "contact_name", label: "Contact name", kind: "text", placeholder: "Full name", critical: true },
  { id: "location", label: "Location of end-use", kind: "text", placeholder: "City, country", critical: true },
  { id: "project_name", label: "Project name", kind: "text", placeholder: "Customer — AL inspection at new plant", critical: true },
  { id: "project_number", label: "Project number", kind: "text", placeholder: "YYYY-XXXXX", critical: true },
  {
    id: "project_type",
    label: "Project type",
    kind: "radio",
    critical: true,
    options: [
      { id: "pt_2d", label: "New 2D DR", value: "New 2D DR" },
      { id: "pt_ct", label: "New CT", value: "New CT" },
      { id: "pt_retro", label: "Retrofit", value: "Retrofit" },
      { id: "pt_xline", label: "X-line", value: "X-line" },
    ],
  },
  { id: "call_date", label: "Call / discovery date", kind: "date", critical: true },
  { id: "sales_owner", label: "Sales owner", kind: "text", placeholder: "Your name" },
  {
    id: "stage",
    label: "Stage",
    kind: "select",
    critical: true,
    options: [
      { id: "s0", label: "Lead / inquiry" },
      { id: "s1", label: "Qualified discovery" },
      { id: "s2", label: "Application study" },
      { id: "s3", label: "Budgetary quote" },
      { id: "s4", label: "Formal proposal" },
      { id: "s5", label: "Negotiation" },
      { id: "s6", label: "Closed won" },
      { id: "s7", label: "Closed lost" },
    ],
  },
  { id: "next_action_date", label: "Next action date", kind: "date", critical: true },
  { id: "next_action_owner", label: "Next action owner", kind: "text", placeholder: "Owner name", critical: true },
  {
    id: "fit_confidence",
    label: "Fit confidence",
    kind: "select",
    critical: true,
    options: [
      { id: "f1", label: "High" },
      { id: "f2", label: "Medium" },
      { id: "f3", label: "Low" },
      { id: "f4", label: "Unknown" },
    ],
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    num: "Q1",
    title: "Pain point",
    prompt: "What's the most pressing inspection challenge right now?",
    hint: "Speed, quality, consistency, labor, compliance — or something else?",
    notesId: "disc_pain",
    fields: [],
  },
  {
    id: "q2",
    num: "Q2",
    title: "Industry & compliance",
    prompt: "What industry? What standards must you meet?",
    hint: "ASTM, ASME, Nadcap, customer specs, DICONDE, export.",
    notesId: "disc_industry",
    fields: [],
  },
  {
    id: "q3",
    num: "Q3",
    title: "Part specifications",
    prompt: "Walk me through your parts: dimensions, weight, alloy.",
    hint: "Technique sheet, DWG/CAD, MTR. Capture envelope early. Use + Add part for a family.",
    notesId: "disc_parts",
    fields: [
      { id: "part_desc", label: "Part & geometry", kind: "textarea", placeholder: "L × W × H, diameter", critical: true },
      { id: "materials", label: "Materials", kind: "text" },
      { id: "weight", label: "Weight", kind: "text" },
      { id: "wall_thickness", label: "Wall thickness", kind: "text" },
      {
        id: "docs",
        label: "Documents on hand",
        kind: "checks",
        options: [
          { id: "doc_technique", label: "Technique sheet" },
          { id: "doc_cad", label: "CAD / STP" },
          { id: "doc_2d", label: "2D drawing" },
        ],
      },
    ],
  },
  {
    id: "q4",
    num: "Q4",
    title: "Defects & resolution",
    prompt: "What flaws are you targeting? Smallest feature to detect?",
    hint: "Cracks, porosity, delamination, inclusions. Min defect size.",
    notesId: "disc_defects",
    fields: [
      { id: "inspect_task", label: "Inspection task", kind: "textarea", critical: true },
      {
        id: "defect_char",
        label: "Defect character",
        kind: "checks",
        options: [
          { id: "defect_vol", label: "Volumetric" },
          { id: "defect_planar", label: "Planar / orientation-sensitive" },
          { id: "defect_lowcon", label: "Low contrast / disbond-like" },
          { id: "defect_unknown", label: "Unknown / mixed" },
        ],
      },
      { id: "current_inspect", label: "Current method", kind: "text", placeholder: "Film, CR, DDA, outsourced CT…" },
      {
        id: "app_study",
        label: "Application study",
        kind: "radio",
        options: [
          { id: "app_study_yes", label: "Done", value: "Done" },
          { id: "app_study_needed", label: "Needed", value: "Needed" },
          { id: "app_study_no", label: "Not required", value: "No" },
        ],
      },
      { id: "app_study_notes", label: "Study notes", kind: "text" },
    ],
  },
  {
    id: "q5",
    num: "Q5",
    title: "Volume & cycle time",
    prompt: "How many parts? How fast does the line need to move?",
    hint: "100% vs sample. Peak vs average. Takt time.",
    notesId: "disc_volume",
    fields: [
      {
        id: "coverage",
        label: "Coverage",
        kind: "checks",
        options: [
          { id: "cov_100", label: "100%" },
          { id: "cov_sample", label: "Sample" },
        ],
      },
      { id: "sample_pct", label: "Sample %", kind: "text" },
      { id: "sample_qty", label: "Sample qty", kind: "text" },
      { id: "rate_volume", label: "Rate / volume", kind: "text", critical: true },
      { id: "peak_avg", label: "Peak vs average", kind: "text" },
    ],
  },
  {
    id: "q6",
    num: "Q6",
    title: "Loading & automation",
    prompt: "How do parts arrive? How much automation do you want?",
    hint: "Manual, assisted, robot, conveyor. ADR, marking, sorting.",
    notesId: "disc_loading",
    fields: [
      {
        id: "loading",
        label: "Loading",
        kind: "checks",
        options: [
          { id: "auto_load_manual", label: "Manual" },
          { id: "auto_load_assisted", label: "Assisted" },
          { id: "auto_load_robotic", label: "Robotic" },
          { id: "auto_load_conveyor", label: "Conveyor" },
        ],
      },
      {
        id: "acquisition",
        label: "Acquisition",
        kind: "checks",
        options: [
          { id: "auto_acq_manual", label: "Manual" },
          { id: "auto_acq_semi", label: "Semi-auto" },
          { id: "auto_acq_full", label: "Full CNC / recipe" },
        ],
      },
      {
        id: "downstream",
        label: "Downstream",
        kind: "checks",
        options: [
          { id: "auto_defect", label: "ADR / defect recognition" },
          { id: "auto_marking", label: "Marking" },
          { id: "auto_sorting", label: "Sorting" },
          { id: "auto_stats", label: "SPC / stats" },
        ],
      },
      { id: "post_process_details", label: "Post-process details", kind: "textarea" },
      { id: "post_flow", label: "Part flow after inspect", kind: "text" },
    ],
  },
  {
    id: "q7",
    num: "Q7",
    title: "Detector & image quality",
    prompt: "What image quality do you need to prove?",
    hint: "2-2T, duplex wire, DDA vs panel origin, pixel pitch.",
    notesId: "disc_detector",
    fields: [
      { id: "detector_req", label: "Detection requirement", kind: "text", placeholder: "Min feature, IQI class" },
      { id: "xray_source", label: "Source preference", kind: "text" },
      { id: "software_req", label: "Software / DICONDE / ADR", kind: "text" },
    ],
  },
  {
    id: "q8",
    num: "Q8",
    title: "3D / CT requirements",
    prompt: "Is 2D enough, or do you need 3D CT?",
    hint: "Two or more CT checks = strong CT case.",
    notesId: "disc_ct",
    fields: [
      {
        id: "ct_checks",
        label: "CT decision checklist",
        kind: "checks",
        options: [
          { id: "ct_check_planar", label: "Critical defect planar / orientation-sensitive" },
          { id: "ct_check_overlap", label: "Features overlap in 2D" },
          { id: "ct_check_internal", label: "Internal geometry must be measured" },
          { id: "ct_check_3d", label: "3D characterisation required" },
          { id: "ct_check_process", label: "Process feedback needs 3D" },
          { id: "ct_check_metrology", label: "Traceable metrology CT" },
        ],
      },
      { id: "ct_why", label: "Why CT / why not", kind: "textarea" },
    ],
  },
  {
    id: "q9",
    num: "Q9",
    title: "Site constraints",
    prompt: "Available footprint? Infrastructure constraints?",
    hint: "Ceiling, door, 480V 3-phase, vibration, humidity, vault.",
    notesId: "disc_site",
    fields: [
      { id: "site_constraints", label: "Site notes", kind: "textarea", placeholder: "Footprint, ceiling, door, power, vault" },
    ],
  },
  {
    id: "q10",
    num: "Q10",
    title: "Timeline, budget, people",
    prompt: "Timeline? Budget process? Who decides? Other vendors?",
    hint: "Never hang up without a dated next action and an owner.",
    notesId: "disc_timeline",
    fields: [
      { id: "budget_custom", label: "Budget range", kind: "text" },
      { id: "expected_order", label: "Expected order date", kind: "text" },
      { id: "budget_quote_deadline", label: "Budgetary quote deadline", kind: "text" },
      { id: "final_quote_deadline", label: "Final quote deadline", kind: "text" },
      { id: "target_install", label: "Target install", kind: "text" },
      { id: "other_milestones", label: "Other milestones", kind: "text" },
      { id: "incoterms", label: "Incoterms", kind: "text", placeholder: "FCA / DAP / DDP" },
      { id: "recommended_solution", label: "Recommended solution concept", kind: "textarea" },
      { id: "risks", label: "Noted risks", kind: "textarea" },
      {
        id: "stakeholders",
        label: "Stakeholders identified",
        kind: "checks",
        options: [
          { id: "stake_budget", label: "Budget" },
          { id: "stake_tech", label: "Technical" },
          { id: "stake_purch", label: "Purchasing" },
          { id: "stake_ops", label: "Operations" },
        ],
      },
      {
        id: "quoting_entity",
        label: "Quoting entity",
        kind: "radio",
        options: [
          { id: "entity_partner", label: "Channel partner", value: "Partner" },
          { id: "entity_customer", label: "Customer", value: "Customer" },
        ],
      },
      { id: "stake_other", label: "Other influencers", kind: "text" },
      { id: "multithreading", label: "Multi-threading status", kind: "text" },
      {
        id: "competition",
        label: "Competition",
        kind: "radio",
        options: [
          { id: "comp_no", label: "No other vendors", value: "No" },
          { id: "comp_yes", label: "Yes — other vendors", value: "Yes" },
        ],
      },
      { id: "competition_who", label: "Who / which vendors", kind: "text" },
      { id: "comp_stage", label: "Stage & known pricing", kind: "textarea" },
      { id: "comp_likes", label: "What they like / dislike about them", kind: "textarea" },
      {
        id: "test_sample",
        label: "Test sample",
        kind: "radio",
        options: [
          { id: "sample_yesfull", label: "Full part", value: "Full" },
          { id: "sample_yespartial", label: "Partial / coupon", value: "Partial" },
          { id: "sample_no", label: "No", value: "No" },
        ],
      },
      { id: "sample_avail", label: "Sample availability", kind: "text" },
      { id: "possible_solution", label: "Customer's ideas / possible solution", kind: "text" },
      { id: "roadmap1", label: "Next step 1", kind: "text", placeholder: "Who does what by when" },
      { id: "roadmap2", label: "Next step 2", kind: "text" },
      { id: "roadmap3", label: "Next step 3", kind: "text" },
      { id: "contacts_cadence", label: "Primary contacts, cadence & channel", kind: "textarea" },
    ],
  },
];

export const COMPASS_FIELDS: { group: string; fields: FieldDef[] }[] = [
  {
    group: "Readiness",
    fields: [
      {
        id: "ai_ready",
        label: "Stage gates",
        kind: "checks",
        options: [
          { id: "ai_checkup_done", label: "Check-up done" },
          { id: "ai_feasibility_done", label: "Feasibility done" },
          { id: "ai_model_ready", label: "Model ready" },
        ],
      },
      { id: "ai_system_type", label: "System type (brand, model)", kind: "text" },
      { id: "ai_system_count", label: "Number of systems", kind: "text" },
      { id: "ai_acq_freq", label: "Image acquisition frequency", kind: "text" },
      {
        id: "ai_retrofit",
        label: "Retrofit / upgrade planned?",
        kind: "radio",
        options: [
          { id: "ai_retrofit_yes", label: "Yes", value: "Yes" },
          { id: "ai_retrofit_no", label: "No", value: "No" },
        ],
      },
    ],
  },
  {
    group: "Images",
    fields: [
      { id: "ai_img_format", label: "Image format", kind: "text", placeholder: "DICONDE, TIFF, raw…" },
      { id: "ai_img_size", label: "Image size [MB]", kind: "text" },
      {
        id: "ai_binning",
        label: "Binning",
        kind: "radio",
        options: [
          { id: "ai_binning_yes", label: "Yes", value: "Yes" },
          { id: "ai_binning_no", label: "No", value: "No" },
        ],
      },
      { id: "ai_binning_factor", label: "Binning factor", kind: "text" },
      {
        id: "ai_bit",
        label: "Bit depth",
        kind: "radio",
        options: [
          { id: "ai_bit_16", label: "16-bit", value: "16" },
          { id: "ai_bit_14", label: "14-bit", value: "14" },
          { id: "ai_bit_other", label: "Other", value: "Other" },
        ],
      },
      { id: "ai_bit_other_txt", label: "Other bit depth", kind: "text" },
      { id: "ai_nok_rate", label: "NOK rate", kind: "text" },
      {
        id: "ai_overlay",
        label: "Overlay / annotation today",
        kind: "radio",
        options: [
          { id: "ai_overlay_yes", label: "Yes", value: "Yes" },
          { id: "ai_overlay_no", label: "No", value: "No" },
        ],
      },
      {
        id: "ai_repr",
        label: "Images representative of production",
        kind: "radio",
        options: [
          { id: "ai_repr_yes", label: "Yes", value: "Yes" },
          { id: "ai_repr_no", label: "No", value: "No" },
        ],
      },
    ],
  },
  {
    group: "Parts & defects",
    fields: [
      { id: "ai_part_types", label: "Part types", kind: "text" },
      { id: "ai_part_material", label: "Material", kind: "text" },
      { id: "ai_defect_types", label: "Defect types", kind: "textarea" },
      { id: "ai_defect_classes", label: "Defect classes / labels", kind: "textarea" },
      { id: "ai_views_count", label: "Views per part", kind: "text" },
      {
        id: "ai_views",
        label: "View geometry",
        kind: "checks",
        options: [
          { id: "ai_views_static", label: "Static views" },
          { id: "ai_views_variable", label: "Variable / recipe views" },
        ],
      },
      { id: "ai_part_variants", label: "Part variants", kind: "text" },
      { id: "ai_current_process", label: "Current review process", kind: "textarea" },
    ],
  },
  {
    group: "COMPASS mode",
    fields: [
      {
        id: "ai_mode",
        label: "Mode interest",
        kind: "checks",
        options: [
          { id: "ai_compass_assist", label: "Assist" },
          { id: "ai_compass_copilot", label: "Copilot" },
          { id: "ai_compass_auto", label: "Auto" },
          { id: "ai_compass_compliance", label: "Compliance" },
        ],
      },
      {
        id: "ai_inline",
        label: "Inline / PLC",
        kind: "radio",
        options: [
          { id: "ai_inline_yes", label: "Yes", value: "Yes" },
          { id: "ai_inline_no", label: "No", value: "No" },
        ],
      },
      { id: "ai_inline_protocol", label: "Protocol", kind: "text" },
      { id: "ai_plc_info", label: "PLC / MES notes", kind: "textarea" },
      { id: "ai_ideal_workflow", label: "Ideal workflow", kind: "textarea" },
    ],
  },
  {
    group: "Archive & IT",
    fields: [
      {
        id: "ai_archive",
        label: "Archive results",
        kind: "radio",
        options: [
          { id: "ai_archive_yes", label: "Yes", value: "Yes" },
          { id: "ai_archive_no", label: "No", value: "No" },
        ],
      },
      { id: "ai_archive_where", label: "Where", kind: "text" },
      {
        id: "ai_arch_what",
        label: "What to keep",
        kind: "checks",
        options: [
          { id: "ai_arch_image", label: "Image" },
          { id: "ai_arch_result", label: "Result" },
          { id: "ai_arch_seg", label: "Segmentation" },
          { id: "ai_arch_other", label: "Other" },
        ],
      },
      { id: "ai_arch_duration", label: "Retention", kind: "text" },
      {
        id: "ai_inet",
        label: "Internet on the cell",
        kind: "radio",
        options: [
          { id: "ai_inet_yes", label: "Yes", value: "Yes" },
          { id: "ai_inet_no", label: "No", value: "No" },
        ],
      },
      {
        id: "ai_remote",
        label: "Remote access",
        kind: "radio",
        options: [
          { id: "ai_remote_yes", label: "Yes", value: "Yes" },
          { id: "ai_remote_no", label: "No", value: "No" },
        ],
      },
      { id: "ai_remote_tool", label: "Remote tool", kind: "text" },
      {
        id: "ai_linux",
        label: "Linux allowed on cell PC",
        kind: "radio",
        options: [
          { id: "ai_linux_ok_yes", label: "Yes", value: "Yes" },
          { id: "ai_linux_ok_no", label: "No", value: "No" },
        ],
      },
    ],
  },
];

export const SCRIPT = {
  opening:
    "Welcome and thanks for taking the time. I cover industrial X-ray and CT inspection systems. I'm here to understand your challenges and see how we might help.",
  intros: "Perhaps we can start with some quick intros and what you're hoping to get out of this call?",
  transition: "Thanks for the context. To focus on what matters most, I'd like to ask some targeted questions. Sound good?",
  close: "Never end a call without a scheduled next action. Follow-up email within two hours.",
};

export const CRITICAL_IDS = [
  ...COVER_FIELDS.filter((f) => f.critical).map((f) => f.id),
  ...QUESTIONS.flatMap((q) => [q.notesId, ...q.fields.filter((f) => f.critical).map((f) => f.id)]),
];
