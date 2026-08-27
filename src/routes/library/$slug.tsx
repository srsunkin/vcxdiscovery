import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { EditableTable } from "@/components/editable-table";
import { DetectorTypesVisual, ImagingChainVisual, ScatterVisual, ShieldCallout } from "@/components/imaging-visuals";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GLOSSARY } from "@/data/glossary";
import { LIBRARY_PAGES } from "@/data/nav";
import {
  DENSITY_GROUPS,
  EPS_ROWS,
  IQI_LEVELS,
  MATERIALS,
  SOURCE_CLASSES,
  STEEL_EQ,
} from "@/data/materials";
import {
  COMMERCIAL,
  DETECTORS,
  INCOTERMS,
  LINAC_COMPARE,
  MODALITY,
  SAFETY,
  STANDARDS,
} from "@/data/playbook";
import { SOFTWARE_STACK, SYSTEMS } from "@/data/systems";
import { formatKgLb, formatMmIn } from "@/lib/utils";

export const Route = createFileRoute("/library/$slug")({
  component: LibraryArticle,
});

function LibraryArticle() {
  const { slug } = Route.useParams();
  const meta = LIBRARY_PAGES.find((p) => p.slug === slug);
  if (!meta) throw notFound();

  return (
    <div>
      <Link to="/library" className="mb-4 inline-flex min-h-11 items-center gap-1 text-xs text-muted hover:text-fg">
        <ArrowLeft className="size-3.5" />
        Library
      </Link>
      <PageHeader kicker={`Appendix ${meta.letter}`} title={meta.title} description={meta.blurb} />
      {render(slug)}
    </div>
  );
}

function render(slug: string) {
  switch (slug) {
    case "kv":
      return <Kv />;
    case "systems":
      return <VcSystems />;
    case "diondo":
      return <Diondo />;
    case "detectors":
      return <Detectors />;
    case "detection":
      return <Detection />;
    case "modality":
      return <Modality />;
    case "objections":
      return (
        <p className="text-sm text-muted">
          Objection handling lives in the <Link to="/playbook" className="text-accent underline">Playbook</Link> so it sits next to role questions and ROI.
        </p>
      );
    case "standards":
      return <Standards />;
    case "executive":
      return (
        <p className="text-sm text-muted">
          Executive translation is in the <Link to="/playbook" className="text-accent underline">Playbook → Exec / ROI</Link> tab.
        </p>
      );
    case "commercial":
      return <Commercial />;
    case "safety":
      return <Safety />;
    case "glossary":
      return <Glossary />;
    case "conversions":
      return <Conversions />;
    case "chain":
      return <Chain />;
    case "linac":
      return <Linac />;
    default:
      return null;
  }
}

function Kv() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Fast discovery reference only. Final kV/source selection depends on grade, path length, geometry, defect type, CNR/SNR, scatter, detector, and application-study results.
      </p>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Density groups</h2>
      <EditableTable
        tableId="kv-density"
        addLabel="Add material group"
        headers={["Group", "Examples", "Starting kV", "Notes"]}
        factory={DENSITY_GROUPS.map((g) => ({ key: g.id, cells: [g.name, g.examples, g.kv, g.notes] }))}
      />
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Thickness windows</h2>
      <EditableTable
        tableId="kv-thickness"
        addLabel="Add material row"
        headers={["Material", "Density", "kV", "Thickness", "Notes"]}
        factory={MATERIALS.map((m) => ({ key: m.id, cells: [m.name, m.density, m.kv, m.thickness, m.notes] }))}
      />
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Source class</h2>
      <EditableTable
        tableId="kv-source"
        addLabel="Add source class"
        headers={["Class", "Focal spot", "Power", "Where it fits"]}
        factory={SOURCE_CLASSES.map((s) => ({ key: s.name, cells: [s.name, s.spot, s.power, s.fit] }))}
      />
      <p className="text-sm text-muted">
        Steel-equivalent rule of thumb: {STEEL_EQ.map((s) => `${s.alloy} ${s.factor}`).join(" · ")}. Always validate when quoting detection commitments.
      </p>
    </div>
  );
}

function VcSystems() {
  const vc = SYSTEMS.filter((s) => s.line === "vcxray");
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Numbers below are published catalog envelopes (vc-xray.com, 2026). They are a starting filter, not a quote. Confirm manipulator travel, fixtures, and energy class with applications.
      </p>
      {vc.map((s) => (
        <Card key={s.id} className="mb-3">
          <CardHeader>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <CardTitle>{s.name}</CardTitle>
              <Badge variant="muted">{s.energy}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{s.bestFor}</p>
            <p className="mt-2 font-mono text-xs text-subtle">
              {s.custom
                ? "Custom envelope"
                : s.rectangular
                  ? `${s.rectangular.w} × ${s.rectangular.d} × ${s.rectangular.h} mm · ${formatKgLb(s.maxWeightKg)}`
                  : `${formatMmIn(s.maxDiaMm)} Ø · ${formatMmIn(s.maxHeightMm)} H · ${formatKgLb(s.maxWeightKg)}${s.weightKgHigh ? ` (up to ${formatKgLb(s.weightKgHigh)} on 320/450)` : ""}`}
            </p>
            <p className="mt-2 text-xs text-subtle">Ask: {s.triggers}</p>
            {s.note ? <p className="mt-2 text-xs text-warn">{s.note}</p> : null}
            <p className="mt-2 text-[11px] text-subtle">{s.source}</p>
          </CardContent>
        </Card>
      ))}
      <h2 className="mt-8 mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Software</h2>
      <EditableTable
        tableId="software-stack"
        addLabel="Add software"
        headers={["Product", "Role"]}
        factory={SOFTWARE_STACK.map((s) => ({ key: s.name, cells: [s.name, s.detail] }))}
      />
    </div>
  );
}

function Diondo() {
  const d = SYSTEMS.filter((s) => s.line === "diondo");
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        diondo is VisiConsult’s CT partner. Specs from diondo.com product pages (2026). Sample size is what you can load; scan volume is what you can actually reconstruct. Envelope checker uses scan volume when CT is ticked.
      </p>
      {d.map((s) => (
        <Card key={s.id} className="mb-3">
          <CardHeader>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <CardTitle>{s.name}</CardTitle>
              <Badge variant="muted">{s.energy}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{s.bestFor}</p>
            <p className="mt-2 font-mono text-xs text-subtle">
              Sample {formatMmIn(s.maxDiaMm)} Ø · {formatMmIn(s.maxHeightMm)} H · {formatKgLb(s.maxWeightKg)}
            </p>
            {s.scanDiaMm ? (
              <p className="mt-1 font-mono text-xs text-subtle">
                Scan {formatMmIn(s.scanDiaMm)} Ø · {formatMmIn(s.scanHeightMm ?? 0)} H
              </p>
            ) : null}
            {s.note ? <p className="mt-2 text-xs text-warn">{s.note}</p> : null}
            <p className="mt-2 text-[11px] text-subtle">{s.source}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Detectors() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Origin matters on aerospace/defense deals. Confirm OEM, energy rating, scintillator, and qualification package before quoting. Add the SKUs you actually sell.
      </p>
      <DetectorTypesVisual />
      <EditableTable
        tableId="detectors"
        addLabel="Add detector"
        headers={["Model", "Origin", "Pitch", "Area", "Energy", "Fit", "Caution"]}
        factory={DETECTORS.map((d) => ({
          key: d.model,
          cells: [d.model, d.origin, d.pitch, d.area, d.energy, d.fit, d.caution],
        }))}
      />
    </div>
  );
}

function Detection() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        IQI sensitivity is % of material thickness. 2-2T = plaque 2% of part thickness + the 2T hole must be visible. Duplex wire IQI (ISO 19232-5 / ASTM E2002) evaluates unsharpness and SRb for digital systems.
      </p>
      <EditableTable
        tableId="iqi-levels"
        addLabel="Add IQI level"
        headers={["Level", "Meaning", "Use"]}
        factory={IQI_LEVELS.map((i) => ({ key: i.level, cells: [i.level, i.meaning, i.use] }))}
      />
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">EPS heuristic</h2>
      <p className="mb-2 text-sm text-muted">Defect ≥ 2–3× EPS is a starting point only.</p>
      <EditableTable
        tableId="eps-rows"
        addLabel="Add EPS row"
        headers={["EPS / SRb", "Rough reliable 2D feature", "US"]}
        factory={EPS_ROWS.map((e) => ({ key: e.eps, cells: [e.eps, e.feature, e.us] }))}
      />
    </div>
  );
}

function Modality() {
  return (
    <div className="grid gap-3">
      <p className="text-sm text-muted">Product routing picks the system; this picks the method.</p>
      {MODALITY.map((m) => (
        <Card key={m.title}>
          <CardHeader>
            <CardTitle>{m.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{m.when}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Standards() {
  return (
    <div>
      {(Object.entries(STANDARDS) as [string, { id: string; type: string; desc: string }[]][]).map(([k, rows]) => (
        <div key={k}>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">{k}</h2>
          <EditableTable
            tableId={`std-${k}`}
            addLabel="Add standard"
            headers={["Standard", "Type", "Description"]}
            factory={rows.map((r) => ({ key: r.id, cells: [r.id, r.type, r.desc] }))}
          />
        </div>
      ))}
    </div>
  );
}

function Commercial() {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Incoterms 2020</h2>
      <p className="mb-2 text-sm text-muted">Factory default is often FCA origin. US customers often ask for DDP — price it in or push to DAP.</p>
      <EditableTable
        tableId="incoterms"
        addLabel="Add Incoterm"
        headers={["Term", "Detail"]}
        factory={INCOTERMS.map((i) => ({ key: i.term, cells: [i.term, i.detail] }))}
      />
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Process</h2>
      <EditableTable
        tableId="commercial"
        addLabel="Add commercial term"
        headers={["Term", "Detail"]}
        factory={COMMERCIAL.map((c) => ({ key: c.term, cells: [c.term, c.detail] }))}
      />
    </div>
  );
}

function Safety() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        For X-ray tube systems the practical question is usually cabinet vs permanent shielded room/vault.
      </p>
      <EditableTable
        tableId="safety"
        addLabel="Add safety note"
        headers={["Context", "Reference"]}
        factory={SAFETY.map((s) => ({ key: s.context, cells: [s.context, s.point] }))}
      />
    </div>
  );
}

function Glossary() {
  const factory = GLOSSARY.flatMap((c) => c.entries.map((e) => ({ key: `${c.id}-${e.term}`, cells: [e.term, e.def, c.title] })));
  return (
    <div>
      <p className="mb-4 text-sm text-muted">Factory glossary plus your local terms. Add the slang your plant uses.</p>
      <EditableTable tableId="glossary" addLabel="Add term" headers={["Term", "Definition", "Category"]} factory={factory} />
    </div>
  );
}

function Conversions() {
  const um = [
    ["25 µm", "0.025 mm", "0.001 in", "Hi-res microfocus"],
    ["50 µm", "0.05 mm", "0.002 in", "Std microfocus"],
    ["100 µm", "0.1 mm", "0.004 in", "Fine detail CT"],
    ["127 µm", "0.127 mm", "0.005 in", "Std detector pixel"],
    ["200 µm", "0.2 mm", "0.008 in", "General purpose"],
    ["500 µm", "0.5 mm", "0.020 in", "Large parts"],
    ["1000 µm", "1.0 mm", "0.039 in", "Thick materials"],
  ];
  return (
    <div>
      <EditableTable tableId="conversions" addLabel="Add conversion" headers={["Microns", "mm", "Inches", "Use"]} factory={um.map((r) => ({ key: r[0], cells: r }))} />
      <p className="mb-4 text-sm text-muted">kg × 2.20462 = lb · 1 tonne = 1000 kg ≈ 2200 lb. Use Routing → Envelope checker for live unit conversion.</p>
    </div>
  );
}

function Chain() {
  return (
    <div>
      <ShieldCallout />
      <ImagingChainVisual />
      <ScatterVisual />
    </div>
  );
}

function Linac() {
  return (
    <div>
      <p className="mb-4 text-sm text-muted">
        Use when thickness/density exceeds practical 450 kV. diondo d7 is the turnkey Linac-CT path. Confirm dose basis with the manufacturer — published Gy/min numbers are not interchangeable.
      </p>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">6 MeV live-call compare</h2>
      <EditableTable
        tableId="linac-compare"
        addLabel="Add compare row"
        headers={["Parameter", "Varex Linatron M6 / M6A", "Siemens SILAC c"]}
        factory={LINAC_COMPARE.map((r) => ({ key: r.param, cells: [r.param, r.varex, r.siemens] }))}
      />
    </div>
  );
}
