import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Copy, Phone, UserRound } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { FieldControl } from "@/components/fields";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COVER_FIELDS } from "@/data/questions";
import { buildSummary, snapshotSignals } from "@/lib/engine/summary";
import { loadProfile, PROFILE_EVENT } from "@/lib/profile";
import { useDealStore } from "@/lib/store";
import { copyText } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const EMPTY_SIG = {
  progress: "0% complete (0/32)",
  pct: 0,
  missing: "—",
  route: "—",
  routeReason: "",
  risk: "Low",
  next: "—",
};

function Home() {
  useDealStore((s) => s.deals);
  useDealStore((s) => s.activeId);
  const hydrated = useDealStore((s) => s.hydrated);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const live = mounted && hydrated;
  const sig = live ? snapshotSignals() : EMPTY_SIG;
  const summary = live ? buildSummary() : "";
  const [needsIdentity, setNeedsIdentity] = useState(false);
  useEffect(() => {
    const sync = () => {
      const p = loadProfile();
      setNeedsIdentity(!p.owner.trim() && !p.org.trim());
    };
    sync();
    window.addEventListener(PROFILE_EVENT, sync);
    return () => window.removeEventListener(PROFILE_EVENT, sync);
  }, []);

  return (
    <div>
      <PageHeader
        kicker="Command center"
        title="Live discovery snapshot"
        description="Fill the cover sheet, then run the call. Routing, risk, and the internal brief update as you capture."
        actions={
          <>
            <Button asChild>
              <Link to="/call">
                <Phone className="size-4" />
                Start call mode
              </Link>
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                void copyText(summary).then(() => toast.success("Brief copied"));
              }}
            >
              <Copy className="size-4" />
              Copy brief
            </Button>
          </>
        }
      />

      {needsIdentity ? (
        <div className="mb-5 flex flex-col gap-3 rounded-xl bg-accent-dim/40 px-4 py-3 text-sm text-fg shadow-[var(--shadow-border)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2">
            <UserRound className="mt-0.5 size-4 shrink-0 text-accent" />
            <p>
              Channel-partner ready. Set your name and company once — emails and the opening script use it, not a personal brand.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0">
            <Link to="/settings">Open Settings</Link>
          </Button>
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Signal label="Progress" value={sig.progress} />
        <Signal label="Auto route" value={sig.route} hint={sig.routeReason} />
        <Signal
          label="Risk"
          value={sig.risk}
          tone={sig.risk === "High" ? "danger" : sig.risk === "Medium" ? "warn" : "ok"}
        />
        <Signal label="Next action" value={sig.next} />
      </div>

      <div className="mt-3 rounded-xl bg-surface p-4 text-sm text-muted shadow-[var(--shadow-border)]">
        <span className="font-medium text-fg">Missing critical: </span>
        {sig.missing}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Cover sheet</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {COVER_FIELDS.map((f) => (
              <div key={f.id} className={f.kind === "radio" ? "sm:col-span-2" : ""}>
                <FieldControl field={f} />
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle>Internal brief</CardTitle>
              <Badge variant="muted">Customer-unsafe</Badge>
            </CardHeader>
            <CardContent>
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap font-mono text-[12px] leading-relaxed text-muted">
                {summary}
              </pre>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-2">
            <Jump to="/routing" label="Confirm routing" />
            <Jump to="/risk" label="Review risks" />
            <Jump to="/outputs" label="Handoff & emails" />
            <Jump to="/library" label="Open library" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Signal({
  label,
  value,
  hint,
  tone,
}: {
  label: string
  value: string
  hint?: string
  tone?: "ok" | "warn" | "danger"
}) {
  return (
    <Card>
      <CardContent className="pt-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">{label}</div>
        <div
          className={
            tone === "danger"
              ? "mt-1 text-sm font-semibold text-danger"
              : tone === "warn"
                ? "mt-1 text-sm font-semibold text-warn"
                : "mt-1 text-sm font-semibold text-fg"
          }
        >
          {value}
        </div>
        {hint ? <div className="mt-1 line-clamp-2 text-xs text-subtle">{hint}</div> : null}
      </CardContent>
    </Card>
  );
}

function Jump({ to, label }: { to: string; label: string }) {
  return (
    <Button variant="outline" className="justify-between" asChild>
      <Link to={to}>
        {label}
        <ArrowRight className="size-3.5" />
      </Link>
    </Button>
  );
}
