import {
  Aperture,
  Archive,
  Box,
  Cpu,
  Eye,
  Layers,
  Monitor,
  MoveHorizontal,
  Radiation,
  Scan,
  Shield,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMAGING_CHAIN, SCATTER_CONTROLS, DETECTOR_TYPES } from "@/data/playbook";
import { cn } from "@/lib/utils";

const CHAIN_ICONS = [Radiation, Box, MoveHorizontal, Scan, SlidersHorizontal, Cpu, Eye, Archive];

export function ImagingChainVisual() {
  return (
    <div className="mb-6">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge>Customer-safe</Badge>
        <span className="text-xs text-subtle">Screen-share this — the weakest link sets image quality</span>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
        <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-accent/30 lg:block" />
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
          {IMAGING_CHAIN.map((s, i) => {
            const Icon = CHAIN_ICONS[i] ?? Radiation;
            return (
              <li key={s.n} className="relative">
                <div className="flex items-center gap-3 rounded-lg bg-elevated/80 px-3 py-3 lg:flex-col lg:items-center lg:px-2 lg:py-4 lg:text-center">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-dim text-accent ring-1 ring-accent/40">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] text-subtle">{s.n}</div>
                    <div className="text-sm font-semibold leading-tight">{s.title}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {IMAGING_CHAIN.map((s, i) => {
          const Icon = CHAIN_ICONS[i] ?? Radiation;
          return (
            <Card key={s.n}>
              <CardHeader>
                <div className="flex items-center gap-2 text-accent">
                  <Icon className="size-4" />
                  <span className="font-mono text-[11px]">{s.n}</span>
                </div>
                <CardTitle>{s.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs uppercase tracking-wide text-subtle">Controls</p>
                <p className="mt-1 text-sm text-muted">{s.controls}</p>
                <p className="mt-3 text-xs uppercase tracking-wide text-subtle">Key point</p>
                <p className="mt-1 text-sm text-fg">{s.key}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function ScatterVisual() {
  return (
    <div className="mt-10">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge>Customer-safe</Badge>
        <h2 className="text-lg font-semibold tracking-tight">Scatter control</h2>
      </div>
      <p className="mb-4 text-sm text-muted">
        Scatter is the silent contrast killer. Six practical levers — pick the cheapest one that actually moves CNR on this part.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SCATTER_CONTROLS.map((s) => (
          <Card key={s.title}>
            <CardHeader>
              <div className="font-mono text-[11px] text-accent">{s.n}</div>
              <CardTitle>{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">{s.doThis}</p>
              <p className="mt-3 text-xs text-subtle">{s.when}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DetectorTypesVisual() {
  return (
    <div className="mb-6 grid gap-3 sm:grid-cols-3">
      {DETECTOR_TYPES.map((d, i) => (
        <Card key={d.title} className={cn(i === 0 && "ring-1 ring-accent/30")}>
          <CardHeader>
            <div className="flex items-center gap-2 text-accent">
              {i === 0 ? <Layers className="size-4" /> : i === 1 ? <Aperture className="size-4" /> : <Monitor className="size-4" />}
              <span className="font-mono text-[11px]">{d.short}</span>
            </div>
            <CardTitle>{d.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted">{d.fit}</p>
            <p className="mt-3 text-xs text-subtle">{d.trade}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ShieldCallout() {
  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl bg-elevated/60 px-4 py-3 text-sm text-muted shadow-[var(--shadow-border)]">
      <Shield className="mt-0.5 size-4 shrink-0 text-accent" />
      <p>These sheets are meant for screen-share. They explain physics and process, not commercial pricing.</p>
    </div>
  );
}
