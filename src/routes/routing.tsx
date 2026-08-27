import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SYSTEMS } from "@/data/systems";
import { fitSystems, type FitInput } from "@/lib/engine/fit";
import { inferRoutes } from "@/lib/engine/routing";
import { useDealStore } from "@/lib/store";
import { formatKgLb, formatMmIn, inToMm, lbToKg } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/routing")({ component: RoutingPage });

function RoutingPage() {
  useDealStore((s) => s.deals);
  const ranked = inferRoutes();
  const top = ranked[0];

  const [unit, setUnit] = useState<"mm" | "in">("mm");
  const [dia, setDia] = useState("");
  const [h, setH] = useState("");
  const [w, setW] = useState("");
  const [needCt, setNeedCt] = useState(false);
  const [robotic, setRobotic] = useState(false);
  const [highThroughput, setHighThroughput] = useState(false);
  const [crane, setCrane] = useState(false);
  const [energy, setEnergy] = useState<FitInput["energyHint"]>("any");

  const input: FitInput = useMemo(() => {
    const n = (s: string) => Number.parseFloat(s) || 0;
    const diaN = unit === "in" ? inToMm(n(dia)) : n(dia);
    const hN = unit === "in" ? inToMm(n(h)) : n(h);
    const wN = unit === "in" ? lbToKg(n(w)) : n(w);
    return { diaMm: diaN, heightMm: hN, weightKg: unit === "in" ? wN : n(w), needCt, robotic, highThroughput, crane, energyHint: energy };
  }, [unit, dia, h, w, needCt, robotic, highThroughput, crane, energy]);

  const hasFitQuery = Boolean(dia || h || w);
  const rows = hasFitQuery ? fitSystems(input) : [];

  return (
    <div>
      <PageHeader
        kicker="Solution routing"
        title="Direction + envelope checker"
        description="Capture scores a shortlist from published envelopes. Type the part size to see what actually fits — then confirm with applications before you quote."
      />

      {top ? (
        <div className="mb-6 rounded-xl border border-accent/40 bg-accent-dim/50 px-5 py-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Generated route</div>
          <div className="mt-1 text-lg font-semibold">{top.system.name}</div>
          <p className="mt-1 text-sm text-muted">
            {top.reasons.join(" · ") || top.system.short}. Confirm with application study, part envelope, defect size, throughput, and standards before quote.
          </p>
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {ranked.slice(0, 6).map((r, i) => (
          <Card key={r.system.id} className={i === 0 ? "border border-accent/50" : ""}>
            <CardHeader className="flex-row items-start justify-between gap-3">
              <div>
                <CardTitle>{r.system.name}</CardTitle>
                <p className="mt-1 text-xs text-muted">{r.system.short}</p>
              </div>
              <Badge>{r.score}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{r.system.bestFor}</p>
              <ul className="mt-2 list-disc pl-4 text-xs text-subtle">
                {r.reasons.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold tracking-tight">Envelope checker</h2>
      <p className="mt-1 mb-4 text-sm text-muted">
        Dual-unit: type mm/kg or inches/lb. Fits are a starting filter — always confirm manipulator travel, fixture, and application study.
      </p>
      <Card className="mb-4">
        <CardContent className="grid gap-4 pt-5 sm:grid-cols-4">
          <div className="sm:col-span-4 flex flex-wrap gap-2">
            <Toggle on={unit === "mm"} onClick={() => setUnit("mm")} label="Metric (mm / kg)" />
            <Toggle on={unit === "in"} onClick={() => setUnit("in")} label="US (in / lb)" />
          </div>
          <Num label={unit === "mm" ? "Diameter (mm)" : "Diameter (in)"} value={dia} onChange={setDia} />
          <Num label={unit === "mm" ? "Height (mm)" : "Height (in)"} value={h} onChange={setH} />
          <Num label={unit === "mm" ? "Weight (kg)" : "Weight (lb)"} value={w} onChange={setW} />
          <div className="flex flex-col gap-1.5">
            <Label>Energy hint</Label>
            <select
              value={energy}
              onChange={(e) => setEnergy(e.target.value as FitInput["energyHint"])}
              className="h-11 rounded-md border border-border bg-panel px-3 text-sm"
            >
              <option value="any">Any</option>
              <option value="low">≤ 225 kV</option>
              <option value="mid">320 kV class</option>
              <option value="high">450–600 kV</option>
              <option value="linac">Linac / MeV</option>
            </select>
          </div>
          <div className="sm:col-span-4 flex flex-wrap gap-2">
            <Toggle on={needCt} onClick={() => setNeedCt(!needCt)} label="Needs CT" />
            <Toggle on={robotic} onClick={() => setRobotic(!robotic)} label="Robotic load" />
            <Toggle on={highThroughput} onClick={() => setHighThroughput(!highThroughput)} label="High throughput" />
            <Toggle on={crane} onClick={() => setCrane(!crane)} label="Crane / top load" />
          </div>
        </CardContent>
      </Card>

      {hasFitQuery ? (
        <div className="overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-subtle">
              <tr>
                <th className="px-4 py-3">System</th>
                <th className="px-4 py-3">Fit</th>
                <th className="px-4 py-3">Envelope</th>
                <th className="px-4 py-3">Energy</th>
                <th className="px-4 py-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.system.id} className="border-b border-border/70">
                  <td className="px-4 py-3 font-medium">{r.system.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant={r.fit === "yes" ? "success" : r.fit === "tight" ? "warn" : r.fit === "custom" ? "default" : "danger"}>
                      {r.fit}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {r.system.custom
                      ? "Custom"
                      : `${formatMmIn(r.system.maxDiaMm)} × ${formatMmIn(r.system.maxHeightMm)} · ${formatKgLb(r.system.maxWeightKg)}`}
                  </td>
                  <td className="px-4 py-3 text-muted">{r.system.energy}</td>
                  <td className="px-4 py-3 text-xs text-subtle">{r.reasons.join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Catalog />
      )}
    </div>
  );
}

function Catalog() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {SYSTEMS.filter((s) => s.id !== "software").map((s) => (
        <Card key={s.id}>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle>{s.name}</CardTitle>
              <Badge variant="muted">{s.line === "diondo" ? "diondo" : "VCxray"}</Badge>
            </div>
            <p className="text-xs text-muted">{s.energy}</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{s.bestFor}</p>
            <p className="mt-2 font-mono text-[11px] text-subtle">
              {s.custom ? "Custom envelope" : `${formatMmIn(s.maxDiaMm)} Ø · ${formatMmIn(s.maxHeightMm)} H · ${formatKgLb(s.maxWeightKg)}`}
            </p>
            <p className="mt-2 text-xs text-subtle">Ask: {s.triggers}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Num({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Input inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 rounded-full border px-3 py-2 text-xs",
        on ? "border-accent bg-accent-dim text-fg" : "border-border text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
