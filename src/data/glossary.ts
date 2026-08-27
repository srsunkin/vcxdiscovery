export type GlossaryEntry = { term: string; def: string };
export type GlossaryCat = { id: string; title: string; entries: GlossaryEntry[] };

export const GLOSSARY: GlossaryCat[] = [
  {
    "id": "g1",
    "title": "1. Modalities & Methods",
    "entries": [
      {
        "term": "NDT / NDE",
        "def": "Non-Destructive Testing / Evaluation. Umbrella term for inspection without damaging the part (RT, UT, MT, PT, ET, VT)."
      },
      {
        "term": "RT",
        "def": "Radiographic Testing; X-ray or gamma, the NDT method this workbook is about."
      },
      {
        "term": "DR / 2D DR",
        "def": "Digital Radiography; fast single-shot, no depth info. Best for FOD, welds, inline sorting."
      },
      {
        "term": "CR",
        "def": "Computed Radiography; image plate + scanner, bridge between film and DDA. Slower, lower resolution than DR."
      },
      {
        "term": "CT / 3D CT",
        "def": "Computed Tomography; full 360\u00b0 volume reconstruction. Metrology + internal defects, slower than 2D."
      },
      {
        "term": "2.5D / CL",
        "def": "Computed Laminography; limited rotation (\u00b120\u201340\u00b0), separates layers in flat parts (PCBs, panels)."
      },
      {
        "term": "4D CT",
        "def": "CT over time or under load. In-situ crack growth, thermal cycling studies."
      },
      {
        "term": "In-situ CT",
        "def": "CT while part is under mechanical/thermal/chemical stress. Research & material science."
      },
      {
        "term": "Helical / Helix CT",
        "def": "Continuous spiral scan; tall parts, higher throughput vs. step-and-shoot."
      },
      {
        "term": "Offset CT",
        "def": "Detector offset to double the effective FOV. For oversized parts."
      },
      {
        "term": "Fan-beam vs. Cone-beam",
        "def": "Fan = slice-by-slice via line detector (less scatter, slower). Cone = volumetric via flat panel (faster, more scatter)."
      },
      {
        "term": "FDK (Feldkamp)",
        "def": "Default cone-beam reconstruction algorithm (filtered back-projection variant)."
      },
      {
        "term": "FBP",
        "def": "Filtered back-projection; fast, noisier baseline CT algorithm."
      },
      {
        "term": "Iterative Recon (ART / SART / MBIR)",
        "def": "Family of CT reconstruction algorithms that refine the 3D volume estimate through repeated passes, unlike filtered back-projection (FBP/FDK) which is a single-pass calculation. Iterative methods handle noisy, incomplete, or limited-projection data significantly better, at the cost of more computation time."
      },
      {
        "term": "AI Recon",
        "def": "Learned denoise / sparse-view reconstruction; faster + cleaner, emerging standard."
      }
    ]
  },
  {
    "id": "g2",
    "title": "2. X-Ray Sources & Physics",
    "entries": [
      {
        "term": "kV / kVp",
        "def": "Tube voltage / peak kilovoltage = penetration. Higher kV = thicker/denser material, lower contrast."
      },
      {
        "term": "mA / Power (W)",
        "def": "Tube current = flux. More mA = more photons, better SNR, more heat."
      },
      {
        "term": "Exposure",
        "def": "mA \u00d7 time = total signal dose delivered to detector."
      },
      {
        "term": "Focal Spot (f)",
        "def": "Source size. Small = sharp + low power; large = power + blur."
      },
      {
        "term": "Focus types (nano/micro/mini/meso/macro)",
        "def": "From <1 \u00b5m (nano, research) through \u00b5m (micro) to hundreds of \u00b5m (meso/macro, high-power)."
      },
      {
        "term": "Reflection Target",
        "def": "Standard tube type; high power, large focal spot."
      },
      {
        "term": "Transmission Target",
        "def": "Microfocus tube type; focal spot <5 \u00b5m, low power."
      },
      {
        "term": "LINAC",
        "def": "Linear accelerator; accelerates electrons to generate high-energy X-rays. Industrial range broadly 1\u201315+ MeV; diondo d7 offers 3 / 6 / 9 MeV. Required only for very thick or very dense cross-sections where kV systems cannot penetrate. Do not default to LINAC for titanium at normal thicknesses \u2014 confirm with applications engineering."
      },
      {
        "term": "Filtration",
        "def": "Cu/Al added; hardens beam, cuts low-energy scatter, reduces dose."
      },
      {
        "term": "Dual Energy",
        "def": "Two kV spectra; material discrimination, better FOD contrast."
      },
      {
        "term": "COMET",
        "def": "Swiss X-ray tube manufacturer; VCxray's standard partner for 160\u2013450 kV tubes."
      },
      {
        "term": "Beam Hardening",
        "def": "False density gradients (cupping/streaks) from polychromatic beam absorbed unevenly."
      },
      {
        "term": "JIMA",
        "def": "Japan Inspection Instruments Manufacturers' Association; standard resolution target for microfocus tubes."
      }
    ]
  },
  {
    "id": "g3",
    "title": "3. Detectors & Image Chain",
    "entries": [
      {
        "term": "DDA / FPD",
        "def": "Digital Detector Array / Flat-Panel Detector; CMOS or a-Si based."
      },
      {
        "term": "a-Si (detector)",
        "def": "Amorphous silicon; large active area, high DQE, robust at high energies."
      },
      {
        "term": "CMOS (detector)",
        "def": "Fast, small pixel, high MTF; smaller active area than a-Si."
      },
      {
        "term": "Line detector",
        "def": "1D array; fan-beam, low scatter, slower than FPD. Used in d4/d5/d7."
      },
      {
        "term": "CsI Scintillator",
        "def": "Needle crystal structure; sharp, high MTF."
      },
      {
        "term": "GOS Scintillator",
        "def": "Gadolinium oxysulfide; brighter, cheaper, lower spatial resolution than CsI."
      },
      {
        "term": "Pixel Pitch",
        "def": "Detector element size; 50\u2013200 \u00b5m typical."
      },
      {
        "term": "Bit Depth",
        "def": "14\u201316 bit = 16k\u201365k grey levels. More bits = more contrast steps."
      },
      {
        "term": "Imaging Chain",
        "def": "Tube + filter + part + detector combination; sizing balances penetration, resolution, throughput."
      },
      {
        "term": "Stitching / Subvolume",
        "def": "Combining multiple partial scans when part exceeds detector FOV."
      }
    ]
  },
  {
    "id": "g4",
    "title": "4. Performance Metrics & Geometry",
    "entries": [
      {
        "term": "M = SDD/SOD",
        "def": "Geometric magnification. Higher M = higher resolution, more blur risk, smaller FOV."
      },
      {
        "term": "SDD",
        "def": "Source-to-detector distance."
      },
      {
        "term": "SOD",
        "def": "Source-to-object distance."
      },
      {
        "term": "Ug = f(M\u22121)",
        "def": "Geometric unsharpness; keep below detector resolution."
      },
      {
        "term": "EPS / SRb",
        "def": "Effective Pixel Size / Basic Spatial Resolution; true system resolution at part plane."
      },
      {
        "term": "Voxel Size",
        "def": "3D pixel; CT resolution set by magnification and detector pitch."
      },
      {
        "term": "VOI",
        "def": "Volume Of Interest; sub-region within a CT dataset for targeted analysis."
      },
      {
        "term": "MTF",
        "def": "Modulation Transfer Function; sharpness vs. spatial frequency."
      },
      {
        "term": "DQE",
        "def": "Detective Quantum Efficiency; low-dose performance benchmark."
      },
      {
        "term": "SNR",
        "def": "Signal-to-Noise Ratio; \u22655 to detect, \u226520 to measure."
      },
      {
        "term": "CNR",
        "def": "Contrast-to-Noise Ratio; defect visibility metric, often more important than SNR in practice."
      },
      {
        "term": "Contrast Sensitivity",
        "def": "Smallest % thickness change visible; per ASTM E2698."
      },
      {
        "term": "Dynamic Range",
        "def": "Ratio of brightest to darkest level captured without saturation."
      },
      {
        "term": "IQI",
        "def": "Image Quality Indicator; wire/duplex reference for daily performance check (see Appendix C for 2-2T / 1-2T details)."
      },
      {
        "term": "POD",
        "def": "Probability of Detection; a90/95 is aerospace gold standard."
      }
    ]
  },
  {
    "id": "g5",
    "title": "5. Defects & Features",
    "entries": [
      {
        "term": "Cracks",
        "def": "Planar, orientation-sensitive; hardest to detect in 2D. CT sees all angles."
      },
      {
        "term": "Gas Porosity",
        "def": "Round low-density voids; trapped gas during solidification or welding."
      },
      {
        "term": "Shrinkage Porosity",
        "def": "Dendritic/irregular voids; solidification shrinkage in castings."
      },
      {
        "term": "Keyhole Porosity",
        "def": "AM-specific; spherical, from high-energy laser/e-beam process."
      },
      {
        "term": "Lack of Fusion (LoF)",
        "def": "AM + weld critical; planar gap, worst-case for 2D orientation."
      },
      {
        "term": "Cold Lap / Misrun",
        "def": "Casting flow defect; premature solidification, linear seam or underfill."
      },
      {
        "term": "Inclusions",
        "def": "Embedded foreign material; slag, oxides, tungsten in welds."
      },
      {
        "term": "Delamination",
        "def": "Layer separation in composites, PCBs, laminates."
      },
      {
        "term": "FOD",
        "def": "Foreign Object Debris; metallic/non-metallic contamination inside assembly."
      },
      {
        "term": "Wire Sweep / Solder Voids",
        "def": "Electronics; bond wire displaced or solder joint void."
      },
      {
        "term": "Wall Thickness Analysis",
        "def": "Colour map of min/max wall; replaces destructive sectioning."
      },
      {
        "term": "Porosity Analysis",
        "def": "Automated void characterization & statistics."
      }
    ]
  },
  {
    "id": "g6",
    "title": "6. Artifacts (CT Image Problems)",
    "entries": [
      {
        "term": "Ring Artifacts",
        "def": "Concentric rings in CT; detector pixel gain/offset calibration drift."
      },
      {
        "term": "Metal Streaking / Starburst",
        "def": "Lines from dense material; photon starvation in projection."
      },
      {
        "term": "MAR",
        "def": "Metal Artifact Reduction algorithm; reduces starburst streaks from dense inserts."
      },
      {
        "term": "Scatter Fog",
        "def": "Contrast loss across image; cone-beam geometry, thick/large parts."
      },
      {
        "term": "Scatter Correction / diScatter",
        "def": "Restores contrast lost in cone-beam CT due to secondary photons."
      },
      {
        "term": "Aliasing",
        "def": "Jagged edges / false features from too few projections (undersampling)."
      },
      {
        "term": "Truncation",
        "def": "Part larger than detector FOV; clips projections, distorts reconstruction."
      },
      {
        "term": "Motion Blur",
        "def": "Part shifts during exposure; manipulator vibration or loose fixturing."
      },
      {
        "term": "Calibration Drift",
        "def": "Detector gain/geometry change over time; auto-cal routines mitigate."
      }
    ]
  },
  {
    "id": "g7",
    "title": "7. Software, Automation & Integration",
    "entries": [
      {
        "term": "ADR",
        "def": "Automated Defect Recognition; rules-based, consistent pass/fail."
      },
      {
        "term": "ATR / AI-ADR",
        "def": "AI-assisted defect detection; reduces false-call rate vs. threshold-only ADR."
      },
      {
        "term": "x.OS",
        "def": "VisiConsult's unified operating suite (PRO line & X line); acquisition, CT, ADR, reporting in one UI."
      },
      {
        "term": "Xplus / VC.acquire / VC.review",
        "def": "VisiConsult image processing modules (ECO and PRO)."
      },
      {
        "term": "diControl",
        "def": "diondo CT software suite; Helix, Batch, Daily Check, Health Monitor, Metrology VDI/VDE 2630-1.3."
      },
      {
        "term": "Recipe / Part Program",
        "def": "Stored scan parameters (kV, mA, geometry, filter, integration) for a specific part."
      },
      {
        "term": "CAD Comparison",
        "def": "Nominal/actual deviation map; CT surface vs. imported CAD."
      },
      {
        "term": "GD&T",
        "def": "Geometric Dimensioning & Tolerancing; per ASME Y14.5 on internal features."
      },
      {
        "term": "Surface Determination",
        "def": "Defines iso-surface for metrology; ISO 50% or adaptive threshold."
      },
      {
        "term": "Digital Twin",
        "def": "Virtual system for recipe optimisation before physical scan."
      },
      {
        "term": "DICONDE",
        "def": "NDT DICOM standard; traceability, PACS archive, regulatory compliance (ASTM E2767 / E2738)."
      },
      {
        "term": "MES",
        "def": "Manufacturing Execution System; real-time shop-floor control (work orders, recipes, operator tracking, SPC)."
      },
      {
        "term": "ERP",
        "def": "Enterprise Resource Planning; company-wide business system (SAP, Oracle, Dynamics). Integrates with MES for automated quality records."
      },
      {
        "term": "OPC-UA",
        "def": "Open Platform Communications Unified Architecture (IEC 62541); secure industrial M2M protocol used by VisiConsult for MES/ERP/PLC integration."
      },
      {
        "term": "SPC",
        "def": "Statistical Process Control; feeds pass/fail + measurements to track process capability over time."
      },
      {
        "term": "NDE 4.0",
        "def": "Connected, data-driven inspection; SPC feedback, remote monitoring, AI-assisted review."
      }
    ]
  },
  {
    "id": "g8",
    "title": "8. Metrology & Reference",
    "entries": [
      {
        "term": "VDI/VDE 2630-1.3",
        "def": "German metrology guideline for CT-based coordinate measurement; basis for MPE (Maximum Permissible Error) specifications."
      },
      {
        "term": "CMM",
        "def": "Coordinate Measuring Machine; traditional contact/tactile metrology; CT is the non-destructive complement for internal features."
      },
      {
        "term": "MPE",
        "def": "Maximum Permissible Error; e.g. MPE"
      },
      {
        "term": "FAI",
        "def": "First Article Inspection; complete dimensional verification of the first production part against drawings."
      },
      {
        "term": "Nominal / Actual",
        "def": "Drawing spec vs. measured result (used in CAD comparison deviation maps)."
      }
    ]
  },
  {
    "id": "g9",
    "title": "9. Hardware & Mechanical",
    "entries": [
      {
        "term": "C-arm Geometry",
        "def": "Source/detector rotates around stationary part; for large/heavy assemblies, MRO."
      },
      {
        "term": "Manipulator",
        "def": "Multi-axis motion platform positioning part between source and detector. Granite-based on diondo, heavy-duty industrial on PRO line."
      },
      {
        "term": "Fixture / Part Holder",
        "def": "Custom mount keeping part stable and repeatably positioned during scan."
      },
      {
        "term": "Cabinet vs. Walk-in Vault",
        "def": "Cabinet = enclosed, FDA-regulated (21 CFR 1020.40). Vault = permanent shielded room, state-regulated."
      },
      {
        "term": "T\u00dcV",
        "def": "German technical inspection association; certifies cabinet safety compliance."
      },
      {
        "term": "CE",
        "def": "Conformit\u00e9 Europ\u00e9enne; EU declaration of compliance (safety, EMC, etc.)."
      }
    ]
  },
  {
    "id": "g10",
    "title": "10. Radiation Safety",
    "entries": [
      {
        "term": "ALARA",
        "def": "As Low As Reasonably Achievable; dose optimisation principle."
      },
      {
        "term": "RSO",
        "def": "Radiation Safety Officer; designated person responsible for the radiation-safety program at a facility (required under 10 CFR / state rules for permanent installations)."
      },
      {
        "term": "mR / mrem / mSv",
        "def": "Exposure and dose units. 1 rem = 10 mSv = 1000 mrem. Cabinet limit: 0.5 mR integrated over any 1 hour at 5 cm (21 CFR 1020.40)."
      },
      {
        "term": "Agreement State",
        "def": "U.S. state (40 as of Oct 2025) with authority from NRC to regulate radioactive material use in its borders."
      },
      {
        "term": "Interlock",
        "def": "Safety switch that disables x-rays when door/barrier is opened; required in cabinets and vaults."
      },
      {
        "term": "Dose Rate",
        "def": "Radiation intensity at a point (mR/hr or \u00b5Sv/hr); drives area posting category."
      }
    ]
  },
  {
    "id": "g11",
    "title": "11. Applications & Industries",
    "entries": [
      {
        "term": "AM",
        "def": "Additive Manufacturing (3D printing); high-value aerospace / medical parts where CT finds keyhole porosity and LoF."
      },
      {
        "term": "MRO",
        "def": "Maintenance, Repair, Overhaul; aerospace aftermarket where large/complex parts benefit from C-arm geometry."
      },
      {
        "term": "OEM",
        "def": "Original Equipment Manufacturer."
      },
      {
        "term": "Giga-casting",
        "def": "Single large aluminum structural casting (e.g. Tesla rear underbody); drives need for PRO FI Giga-class systems."
      },
      {
        "term": "Battery cell / tray",
        "def": "Lithium-ion cell interior (anode/cathode alignment, electrolyte fill); a core VCbattery focus."
      }
    ]
  },
  {
    "id": "g12",
    "title": "12. Throughput & Operations",
    "entries": [
      {
        "term": "Takt Time",
        "def": "Production line pace; the clock you must beat for inline inspection."
      },
      {
        "term": "Cycle Time",
        "def": "Load + scan + recon + ADR + unload; must fit inside takt time."
      },
      {
        "term": "Throughput (PPH)",
        "def": "Parts Per Hour; inline typically >600, atline 30\u2013120."
      },
      {
        "term": "OEE",
        "def": "Overall Equipment Effectiveness; availability \u00d7 performance \u00d7 quality. Sell for >95%."
      },
      {
        "term": "MTBF / MTTR",
        "def": "Mean Time Between Failures / Mean Time To Repair; underpins uptime claims."
      },
      {
        "term": "Uptime",
        "def": "Percentage of scheduled production time the system is available and running."
      },
      {
        "term": "FCR / POF",
        "def": "False Call Rate / Probability of False Alarm; key ADR objection. Target <2%."
      }
    ]
  },
  {
    "id": "g13",
    "title": "13. Commercial & Logistics",
    "entries": [
      {
        "term": "RFQ",
        "def": "Request For Quotation; customer's formal request for pricing."
      },
      {
        "term": "PO",
        "def": "Purchase Order; customer's commitment triggering contract + production."
      },
      {
        "term": "SOW",
        "def": "Statement Of Work; scope document defining deliverables, milestones, exclusions."
      },
      {
        "term": "CAPEX / OPEX",
        "def": "Capital Expenditure (purchase) vs. Operating Expenditure (maintenance, consumables, dose)."
      },
      {
        "term": "TCO",
        "def": "Total Cost of Ownership; CAPEX + OPEX over 5\u20137 yr (tube, power, service, cal)."
      },
      {
        "term": "ROI",
        "def": "Return On Investment; labour savings + scrap reduction + escapes avoided."
      },
      {
        "term": "LC",
        "def": "Letter of Credit; secure payment for first-time international buyers."
      },
      {
        "term": "FCA",
        "def": "Free Carrier (Incoterm); seller delivers to carrier + export clearance. Most common for VC systems."
      },
      {
        "term": "DAP",
        "def": "Delivered At Place; seller delivers ready for unloading, buyer handles import clearance."
      },
      {
        "term": "DPU",
        "def": "Delivered at Place Unloaded; seller delivers and unloads."
      },
      {
        "term": "DDP",
        "def": "Delivered Duty Paid; seller bears all costs incl. import duties. Highest seller obligation."
      },
      {
        "term": "HS Code",
        "def": "Harmonized System; 9022.19 for X-ray apparatus; drives duty rate."
      }
    ]
  },
  {
    "id": "g14",
    "title": "14. Quality & Compliance Workflow",
    "entries": [
      {
        "term": "FAT",
        "def": "Factory Acceptance Test; customer sign-off at VisiConsult Germany / diondo before shipment."
      },
      {
        "term": "SAT",
        "def": "Site Acceptance Test; final acceptance at customer site, triggers warranty start."
      },
      {
        "term": "Application Study",
        "def": "Pre-sale feasibility: customer samples scanned to prove system meets their detection / metrology requirements before quote / contract."
      },
      {
        "term": "CAPA",
        "def": "Corrective And Preventive Action; formal process triggered by audit findings or NDT escapes."
      },
      {
        "term": "SLA",
        "def": "Service Level Agreement; 24/7 remote support, next-day parts, response time commitments."
      },
      {
        "term": "Traceability",
        "def": "Serial no. + recipe + operator + result archived in DICONDE."
      }
    ]
  },
  {
    "id": "g15",
    "title": "15. U.S. Safety, Certification & Installation Terms",
    "entries": [
      {
        "term": "Radiation-Producing Machine",
        "def": "Device that generates ionizing radiation electrically, such as an X-ray tube system or accelerator. For these systems, state radiation-control programs are usually the practical regulatory interface."
      },
      {
        "term": "State Radiation-Control Program",
        "def": "State agency or program that registers, inspects, and regulates X-ray machines / radiation-producing machines. This is more directly relevant to cabinet/vault X-ray systems than Agreement State radioactive-material licensing."
      },
      {
        "term": "Agreement State",
        "def": "NRC agreement status for regulating certain radioactive materials. Important for sealed-source/gamma work, but for X-ray tube systems the state still regulates radiation-producing machines whether or not the \u201cAgreement State\u201d label is the main issue."
      },
      {
        "term": "UL Listing",
        "def": "Product or assembly listing by UL to an applicable safety standard. In custom industrial machinery, confirm whether the whole system, panel, component, or field evaluation is covered."
      },
      {
        "term": "NRTL",
        "def": "Nationally Recognized Testing Laboratory. OSHA-recognized organization that tests/certifies equipment to U.S. safety standards where NRTL approval is required."
      },
      {
        "term": "ETL / Intertek",
        "def": "Another NRTL mark often accepted similarly to UL when the certification scope and standard are appropriate."
      },
      {
        "term": "Field Evaluation",
        "def": "On-site evaluation by an NRTL or qualified body when a custom system does not carry a complete listing acceptable to the AHJ or customer."
      },
      {
        "term": "AHJ",
        "def": "Authority Having Jurisdiction. The entity that decides whether an installation satisfies local/electrical/building/radiation requirements."
      },
      {
        "term": "Shielding Plan Review",
        "def": "State or customer review of shielding calculations/layout before vault construction or high-energy installation."
      },
      {
        "term": "Radiation Survey",
        "def": "Measurement after installation or modification to verify dose rates at boundaries, doors, seams, and occupied areas."
      }
    ]
  }
];
