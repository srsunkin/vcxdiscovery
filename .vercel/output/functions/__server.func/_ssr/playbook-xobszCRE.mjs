//#region node_modules/.nitro/vite/services/ssr/assets/playbook-xobszCRE.js
var ROLES = [
	{
		id: "ndt",
		title: "Quality / NDT Level III",
		questions: [
			"What acceptance standard or internal procedure controls the decision?",
			"What IQI / SRb / CNR / SNR evidence must be documented?",
			"What defect types have actually escaped or caused debate?",
			"Do you need DICONDE, review audit trail, annotations, measurements, or image archive?",
			"Who approves a technique change from film / CR to DDA or CT?"
		]
	},
	{
		id: "ops",
		title: "Manufacturing / Operations",
		questions: [
			"How many parts per shift and what cycle time is acceptable?",
			"Where does inspection occur in the process flow?",
			"What happens to accepted, rejected, and suspect parts?",
			"Manual loading, crane, conveyor, robot, or mixed?",
			"What would make the system a bottleneck?"
		]
	},
	{
		id: "eng",
		title: "Engineering / R&D",
		questions: [
			"What feature or failure mode are you trying to understand?",
			"Do you need depth, volume, metrology, CAD comparison, or only detection?",
			"Are samples representative and do they include known defects?",
			"What minimum feature size matters, and in what orientation?",
			"Do you have CAD / STP, drawings, or prior images?"
		]
	},
	{
		id: "auto",
		title: "Production / Automation",
		questions: [
			"Recipe-based inspection or operator-driven review?",
			"ADR, marking, sorting, PLC handshakes, or MES integration?",
			"Which PLC / robot standard is preferred?",
			"What data must move back to production?",
			"What uptime, spare parts, and service response are expected?"
		]
	},
	{
		id: "ehs",
		title: "EHS / Facilities / RSO",
		questions: [
			"Where will the system be installed?",
			"Who owns radiation safety registration and state requirements?",
			"Ceiling height, door, floor load, power, HVAC, or access constraints?",
			"Cabinet system or permanent radiographic installation / vault?",
			"Customer-specific safety devices, light curtains, scanners, or access controls?"
		]
	},
	{
		id: "buyer",
		title: "Procurement / Economic Buyer",
		questions: [
			"Is budget allocated or still being requested?",
			"What is the quote deadline and desired validity?",
			"Are Incoterms, payment milestones, tariffs, or vendor setup already defined?",
			"Who signs the PO and who can block it?",
			"What other vendors are being evaluated and by what criteria?"
		]
	}
];
var OBJECTIONS = [
	{
		group: "Price & cost",
		items: [
			{
				objection: "Just email me a quote.",
				reframe: "A quote without the part, defect, and volume is a number with no relevance. Ask two questions about the part and what they need to find so the number means something."
			},
			{
				objection: "CT is too expensive.",
				reframe: "Shift from price to the cost of the problem — escapes, scrap, destructive testing, outsourcing. Build TCO/ROI on their numbers."
			},
			{
				objection: "Your competitor is cheaper.",
				reframe: "Compare 5-year total cost, not sticker — tube life, false-call scrap, downtime, software upsells."
			},
			{
				objection: "Can't justify the capital now.",
				reframe: "Explore OPEX / leasing. Test whether the cost of waiting exceeds financing cost."
			}
		]
	},
	{
		group: "Technical",
		items: [
			{
				objection: "CT is too slow for production.",
				reframe: "Sampling/R&D don't need takt speed. For higher rates, sparse-view + AI recon cut cycle time. Demo at their cycle time."
			},
			{
				objection: "Not accurate enough for our tolerances.",
				reframe: "That's defect CT. Metrology CT with calibrated hardware + surface determination delivers traceable uncertainty. Prove with CMM correlation."
			},
			{
				objection: "AI false calls will be worse than our inspectors.",
				reframe: "Measured AI-ADR FCR is typically <2% and consistent. Pilot on their parts with agreed success criteria."
			},
			{
				objection: "All CT has artifacts anyway.",
				reframe: "The physics is universal; the correction quality is not. Show BH / scatter / MAR corrections side by side on their part."
			}
		]
	},
	{
		group: "Status quo",
		items: [
			{
				objection: "Our current method catches everything.",
				reframe: "How do you know what you're not catching? Comparison scan on parts they've already passed ends the debate."
			},
			{
				objection: "We've always used film / legacy is fine.",
				reframe: "It works, but carries hidden cost and can't do AI, traceability, or 3D. Quantify chemistry, retakes, archival, labor."
			},
			{
				objection: "We just outsource CT when we need it.",
				reframe: "Per-scan fees + multi-week turnaround stalls development. Annual spend + recovered turnaround often pays back alone."
			}
		]
	},
	{
		group: "Integration, risk & timing",
		items: [
			{
				objection: "Integration will be a nightmare.",
				reframe: "OPC-UA / REST — a scoped project. Reference integrations + a scoping session with IT/OT."
			},
			{
				objection: "How do I know it'll still meet spec in 3 years?",
				reframe: "FAT/SAT acceptance, SLA + MTBF, upgrade path. Named long-term references."
			},
			{
				objection: "We're too early — check back next quarter.",
				reframe: "Offer a benchmark scan, ROI model, or standards review now so the next conversation isn't a reset."
			}
		]
	}
];
var DISPLACEMENT = [
	{
		pain: "High false-call rate scrapping good parts",
		counter: "AI-ADR with measured <2% FCR — pilot on their parts."
	},
	{
		pain: "Short tube life / high replacement cost",
		counter: "Tube-life data + 5-year TCO comparison."
	},
	{
		pain: "Clunky, slow software",
		counter: "Live workflow demo; time-to-result side by side."
	},
	{
		pain: "Slow support / long downtime",
		counter: "SLA terms, MTBF/MTTR, remote diagnostics."
	},
	{
		pain: "Can't do CT / metrology / automation",
		counter: "Demonstrate the missing capability on their parts."
	},
	{
		pain: "Throughput can't keep up",
		counter: "Sparse-view / AI-recon timing on their cycle."
	}
];
var EXEC_ROLES = [
	{
		role: "Plant Manager",
		lead: "Cycle time, OEE, labor recovery, downtime reduction."
	},
	{
		role: "Director of Quality",
		lead: "Escape reduction, audit readiness, POD, traceability."
	},
	{
		role: "Operations Leader",
		lead: "Removing the inspection bottleneck, predictable flow."
	},
	{
		role: "VP / GM",
		lead: "ROI, new revenue enabled, strategic risk avoided."
	},
	{
		role: "CFO / Finance",
		lead: "Payback period, TCO, CAPEX vs OPEX options."
	}
];
var FEATURE_OUTCOMES = [
	{
		feature: "AI-ADR with <2% false-call rate",
		outcome: "Stop scrapping good parts; recover scrap + inspector labor."
	},
	{
		feature: "Higher POD / orientation-independent CT",
		outcome: "Fewer escapes, lower warranty/recall exposure, protected contracts."
	},
	{
		feature: "Faster scan / sparse-view / high-DQE detector",
		outcome: "Inspection keeps pace with production."
	},
	{
		feature: "CT defect data + SPC feedback",
		outcome: "Fix defects at the source; scrap rate falls over time."
	},
	{
		feature: "Non-destructive 3D inspection",
		outcome: "Stop destroying parts to inspect them."
	},
	{
		feature: "Automated loading + recognition",
		outcome: "Redeploy scarce certified inspectors."
	},
	{
		feature: "DICONDE / traceability / 21 CFR 11",
		outcome: "Pass audits, satisfy primes and the FDA."
	},
	{
		feature: "Standards qualification (Nadcap)",
		outcome: "Win/keep contracts that require it."
	},
	{
		feature: "Reliable metrology CT",
		outcome: "Catch dimensional problems before assembly."
	},
	{
		feature: "Remote diagnostics + SLA + high MTBF",
		outcome: "Protect production continuity."
	}
];
var ROI_LEVERS = [
	{
		lever: "Escape avoidance",
		how: "expected escapes/yr × fully-loaded cost per escape"
	},
	{
		lever: "Scrap reduction",
		how: "scrap-rate reduction × volume × cost per scrapped part"
	},
	{
		lever: "False-call reduction",
		how: "FCR reduction × volume × part value"
	},
	{
		lever: "Destructive-test elimination",
		how: "parts scrapped for testing × part value + technician hours"
	},
	{
		lever: "Outsourced-CT elimination",
		how: "annual outsourced spend + recovered turnaround"
	},
	{
		lever: "Labor recovery",
		how: "inspector/metrology hours saved × fully-loaded rate"
	},
	{
		lever: "Development velocity",
		how: "development weeks saved × value of time-to-market"
	}
];
var INCOTERMS = [
	{
		term: "EXW",
		detail: "Ex Works. Buyer handles transport, export, insurance. Lowest seller obligation."
	},
	{
		term: "FCA",
		detail: "Free Carrier. Seller delivers to carrier and completes export clearance. Factory default is often FCA origin (seller's plant)."
	},
	{
		term: "CPT",
		detail: "Carriage Paid To — seller pays freight; risk transfers at first carrier."
	},
	{
		term: "CIP",
		detail: "Carriage and Insurance Paid To. 2020 update requires 110% insurance coverage."
	},
	{
		term: "DAP",
		detail: "Delivered At Place — seller delivers ready for unloading; buyer handles import, duties, taxes."
	},
	{
		term: "DPU",
		detail: "Delivered at Place Unloaded — seller delivers and unloads; buyer handles import."
	},
	{
		term: "DDP",
		detail: "Delivered Duty Paid — seller bears all costs including US import duties. Often requested; price it in or push to DAP."
	}
];
var COMMERCIAL = [
	{
		term: "Milestone split",
		detail: "Typical: 30% on PO, 40% on FAT, 20% on shipment, 10% on SAT."
	},
	{
		term: "NET 30 / 60",
		detail: "Full invoice due 30 / 60 days after invoice or delivery."
	},
	{
		term: "Quote validity",
		detail: "Typically 30–60 days — protects against FX and component price changes."
	},
	{
		term: "Warranty start",
		detail: "Typically SAT date or 3 months after shipment, whichever comes first."
	},
	{
		term: "BANT",
		detail: "Budget, Authority, Need, Timeline. Confirm all four before investing demo time."
	},
	{
		term: "FAR",
		detail: "Feasibility Application Report — post-demo detection results. Buying signal when requested."
	}
];
var SAFETY = [
	{
		context: "Cabinet X-ray (21 CFR 1020.40)",
		point: "≤0.5 mR in one hour at 5 cm from the external surface. Enclosure independent of architecture except the floor."
	},
	{
		context: "Walk-in vault",
		point: "Permanent radiographic installation. State registration, shielding plan, surveys, RSO. Not a cabinet."
	},
	{
		context: "Unrestricted / public area",
		point: "Often designed around 100 mrem/year public dose; occupancy factor matters."
	},
	{
		context: "Radiation Area posting",
		point: ">5 mrem/hr at 30 cm from source or surface"
	},
	{
		context: "High Radiation Area posting",
		point: ">100 mrem/hr at 30 cm from source or surface"
	},
	{
		context: "Occupational whole-body limit",
		point: "5 rem/year (50 mSv/year); ALARA still applies."
	}
];
var MODALITY = [
	{
		title: "2D DR is enough",
		when: "Defect is volumetric / high-contrast (gas porosity, FOD, gross inclusions) and not orientation-dependent. Throughput is paramount. Geometry is simple."
	},
	{
		title: "Laminography (CL) fits",
		when: "Part is flat / board-like (PCB, thin composite, planar assembly) where full rotation is impractical. Need layer separation by depth, not a metrology-grade volume."
	},
	{
		title: "CT becomes necessary",
		when: "Critical defect is planar and orientation-dependent; features overlap in projection; 3D characterisation required; internal geometry must be seen; AM process feedback needs 3D maps."
	},
	{
		title: "Metrology CT is required",
		when: "Deliverable is a traceable dimensional measurement (VDA 5, ISO 10360, PPAP). Calibrated stage, SNR ≥ 20, rigorous surface determination. Qualify early so you price for it."
	},
	{
		title: "AI / ADR creates value",
		when: "Volume is too high for consistent manual review; false-call rate is scrapping good parts; defect types are well-characterized with labeled data."
	}
];
var LINAC_COMPARE = [
	{
		param: "Nominal energy",
		varex: "6.0 MV",
		siemens: "6 MeV"
	},
	{
		param: "Max dose rate (stated)",
		varex: "8.0 Gy/min @ 1 m, 10×10 cm",
		siemens: "9 Gy/min @ 1 m (H₂O)"
	},
	{
		param: "Spot size",
		varex: "≤ 2.0 mm FWHM",
		siemens: "1.2–2.0 mm"
	},
	{
		param: "Best leakage package",
		varex: "Ultra-Low 2.5×10⁻⁶",
		siemens: "≤ 2×10⁻⁶ (>60°)"
	},
	{
		param: "Dual energy",
		varex: "Not a primary M6 feature",
		siemens: "Interlaced pulse-to-pulse"
	},
	{
		param: "Typical fit",
		varex: "Modular OEM source for NDT cells / gantry",
		siemens: "NDT + cargo; rotatable head; dual-E"
	}
];
var DETECTORS = [
	{
		model: "NDT 1012M / 1012HS",
		origin: "Confirm OEM / origin",
		pitch: "100 µm",
		area: "250×301 mm",
		energy: "40–225/450 kV",
		fit: "Aerospace-style detail, welds, small/medium parts",
		caution: "Verify qualification package"
	},
	{
		model: "NDT 1717M / 1717HS",
		origin: "iRay / China — confirm restrictions",
		pitch: "139 µm",
		area: "427×427 mm",
		energy: "40–450 kV",
		fit: "Castings, larger field DR, production screening",
		caution: "May be a poor fit for aerospace/defense origin restrictions"
	},
	{
		model: "NDT 1717X2 / 1717HE",
		origin: "Confirm OEM / origin",
		pitch: "100 µm",
		area: "426×426 mm",
		energy: "40–450 kV or HE",
		fit: "Large FOV with better pixel pitch",
		caution: "Confirm frame rate, energy rating, saturation"
	},
	{
		model: "Varex / 2520-class",
		origin: "Varex / USA",
		pitch: "~127 µm",
		area: "~250×200 mm",
		energy: "Model-dependent",
		fit: "Aerospace/defense-friendly when origin matters",
		caution: "Add exact model/spec sheet before quoting"
	},
	{
		model: "4343 HE / CT / N-class",
		origin: "Confirm OEM / origin",
		pitch: "139–150 µm",
		area: "~430×430 mm",
		energy: "HE variants available",
		fit: "Large field, high energy, CT-specific variants",
		caution: "Confirm energy, DQE/MTF, cooling, CT suitability"
	}
];
var STANDARDS = {
	DR: [
		{
			id: "ASTM E1742/E1742M-23",
			type: "Practice",
			desc: "Radiographic examination — minimum requirements, all materials. Baseline that E2698 is written against."
		},
		{
			id: "ASTM E2002-22",
			type: "Practice",
			desc: "Image unsharpness & basic spatial resolution (SRb)."
		},
		{
			id: "ASTM E2597/E2597M-22",
			type: "Practice",
			desc: "Manufacturing characterization of DDAs."
		},
		{
			id: "ASTM E2698-26",
			type: "Practice",
			desc: "Radiographic examination using DDAs — the how-to-inspect-with-a-DDA standard."
		},
		{
			id: "ASTM E2737-23",
			type: "Practice",
			desc: "DDA performance evaluation + long-term stability."
		},
		{
			id: "ASTM E2903-18",
			type: "Test Method",
			desc: "Effective focal spot size of mini/micro focus tubes."
		},
		{
			id: "ASTM E3388-23",
			type: "Practice",
			desc: "Unsharpness & SRb for high-energy radiography (MeV/LINAC)."
		},
		{
			id: "ISO 17636-2:2013",
			type: "Standard",
			desc: "Weld radiography using digital detectors (DR / CR)."
		},
		{
			id: "ASME BPVC Section V, Art. 2",
			type: "Code",
			desc: "RT including DR; mandatory for pressure vessels."
		},
		{
			id: "AWS D1.1/D1.1M:2020",
			type: "Standard",
			desc: "Structural steel welds — RT acceptance criteria."
		}
	],
	CT: [
		{
			id: "ASTM E1441-19",
			type: "Guide",
			desc: "CT imaging fundamentals & principles."
		},
		{
			id: "ASTM E1672-12",
			type: "Guide",
			desc: "CT system selection — application needs into purchase specs."
		},
		{
			id: "ASTM E1695-20",
			type: "Test Method",
			desc: "Measurement of CT system performance (MTF, noise, contrast)."
		},
		{
			id: "ASTM E1814-25",
			type: "Practice",
			desc: "CT examination of castings — cite on any casting CT deal."
		},
		{
			id: "ASTM E3166-20e01",
			type: "Guide",
			desc: "NDE of metal AM aerospace parts after build."
		},
		{
			id: "ASTM E3505-25",
			type: "Practice",
			desc: "CT detail detection sensitivity (DDS) using disk IQIs."
		},
		{
			id: "ISO 15708 series",
			type: "Standard",
			desc: "CT principles, equipment, operation, interpretation & metrology."
		}
	],
	Aero: [
		{
			id: "AS9100D:2016",
			type: "Standard",
			desc: "Aerospace QMS."
		},
		{
			id: "Nadcap AC7114/10",
			type: "Audit criteria",
			desc: "Digital radiography audit criteria for DDA / CR."
		},
		{
			id: "NAS-410 Rev 5 (2020)",
			type: "Standard",
			desc: "U.S. aerospace NDT personnel qualification."
		},
		{
			id: "EN 4179:2017",
			type: "Standard",
			desc: "European aerospace NDT personnel qualification."
		},
		{
			id: "SNT-TC-1A / CP-189",
			type: "Practice / Standard",
			desc: "ASNT general NDT personnel qualification."
		}
	],
	Data: [
		{
			id: "DICONDE — E2767 / E2738",
			type: "Practice",
			desc: "NDT DICOM standard for archive & traceability."
		},
		{
			id: "ECCN / EAR99",
			type: "Regulation",
			desc: "Most NDT systems (non-ITAR)."
		},
		{
			id: "ITAR",
			type: "Regulation",
			desc: "US defense export controls. Confirm with legal/export."
		},
		{
			id: "ALARA",
			type: "Principle",
			desc: "As Low As Reasonably Achievable."
		}
	]
};
var IMAGING_CHAIN = [
	{
		n: "1",
		title: "X-ray source",
		controls: "kV = penetration · mA = signal · focal spot = sharpness",
		key: "Match kV to material + thickness; spot to detail."
	},
	{
		n: "2",
		title: "Part & fixturing",
		controls: "Orientation, stability, repeatability",
		key: "Stable fixturing prevents blur and enables automation."
	},
	{
		n: "3",
		title: "Geometry",
		controls: "SOD / ODD set magnification & blur",
		key: "M = SDD/SOD; Ug = F × ODD/SOD."
	},
	{
		n: "4",
		title: "Detector",
		controls: "Pixel pitch, scintillator, frame rate, dynamic range",
		key: "System SRb + CNR drive detectability, not pitch alone."
	},
	{
		n: "5",
		title: "Acquisition",
		controls: "Calibration, integration time, frame averaging",
		key: "Offset/gain cal and bad-pixel map keep images honest."
	},
	{
		n: "6",
		title: "Processing",
		controls: "Filtering, corrections, enhancement",
		key: "Enhance for the reviewer — never invent or hide detail."
	},
	{
		n: "7",
		title: "Review / ADR",
		controls: "Operator evaluation or automated defect recognition",
		key: "Accept/reject against the written acceptance criteria."
	},
	{
		n: "8",
		title: "Report & archive",
		controls: "Disposition, traceability, DICONDE storage",
		key: "Auditable record: image + technique + decision."
	}
];
var SCATTER_CONTROLS = [
	{
		n: "01",
		title: "Collimate the beam",
		doThis: "Close diaphragms to the region of interest. Less irradiated volume = less scatter generated.",
		when: "First lever on every setup. Cheap, immediate, no hardware change."
	},
	{
		n: "02",
		title: "Air gap",
		doThis: "Increase object-to-detector distance so scatter misses the detector. Direct beam still lands.",
		when: "When you can give up some geometric magnification / FOV."
	},
	{
		n: "03",
		title: "Filtration",
		doThis: "Harden the beam (Cu / Al) to strip low-energy photons that scatter easily and fog the image.",
		when: "Thick or mixed-density parts; watch exposure time."
	},
	{
		n: "04",
		title: "Grid / Bucky",
		doThis: "Anti-scatter grid prefers primary photons. Confirm grid ratio vs energy — wrong grid can cost more dose than it returns.",
		when: "2D DR of thick sections when collimation and air gap are not enough."
	},
	{
		n: "05",
		title: "Masks & blockers",
		doThis: "Lead or tungsten masks around the part, behind holes, or over bright paths that bloom adjacent features.",
		when: "Assemblies, hollows, and high-contrast neighbors."
	},
	{
		n: "06",
		title: "Software correction",
		doThis: "Scatter correction / beam-hardening / MAR in recon. Prove it on the actual part — algorithms can invent or hide detail.",
		when: "CT, after the physical levers are in place. Never a substitute for collimation."
	}
];
var DETECTOR_TYPES = [
	{
		short: "DDA",
		title: "Flat-panel detector",
		fit: "Default for cabinet DR/CT. Fast, calibrated, recipe-friendly.",
		trade: "Pitch, scintillator, energy rating, and origin all matter on aerospace/defense deals."
	},
	{
		short: "LDA",
		title: "Line detector",
		fit: "Fan-beam / high-energy / thick-section work. Larger envelopes on d7-class systems.",
		trade: "Scan is a pass, not a snapshot. Different fixturing and cycle time."
	},
	{
		short: "CR / film",
		title: "Image plate or film",
		fit: "Legacy procedures, odd geometries, or a bridge during digital qualification.",
		trade: "Slower, weaker for ADR and archive. Plan the DDA replacement path."
	}
];
var RISK_FLAGS = [
	{
		id: "risk_defect_undefined",
		label: "Defect / acceptance undefined"
	},
	{
		id: "risk_cycle_unrealistic",
		label: "Cycle time unrealistic"
	},
	{
		id: "risk_no_samples",
		label: "No samples available"
	},
	{
		id: "risk_no_budget",
		label: "Budget not confirmed"
	},
	{
		id: "risk_site_unknown",
		label: "Site / utilities unknown"
	},
	{
		id: "risk_radiation_owner",
		label: "Radiation owner unknown"
	},
	{
		id: "risk_data_unclear",
		label: "Data / DICONDE / IT unclear"
	},
	{
		id: "risk_spec_conflict",
		label: "Spec conflict / unclear flow-down"
	},
	{
		id: "risk_export",
		label: "Export / ITAR / foreign-national risk"
	},
	{
		id: "risk_competitor",
		label: "Competitor active"
	},
	{
		id: "risk_fx_tariff",
		label: "FX / tariff / Incoterms risk"
	},
	{
		id: "risk_custom_scope",
		label: "Custom scope / long lead risk"
	}
];
//#endregion
export { STANDARDS as _, EXEC_ROLES as a, INCOTERMS as c, OBJECTIONS as d, RISK_FLAGS as f, SCATTER_CONTROLS as g, SAFETY as h, DISPLACEMENT as i, LINAC_COMPARE as l, ROLES as m, DETECTORS as n, FEATURE_OUTCOMES as o, ROI_LEVERS as p, DETECTOR_TYPES as r, IMAGING_CHAIN as s, COMMERCIAL as t, MODALITY as u };
