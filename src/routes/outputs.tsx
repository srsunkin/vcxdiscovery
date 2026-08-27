import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { EMAIL_META, buildEmail, type EmailKey } from "@/lib/engine/emails";
import { buildHandoff, buildSummary } from "@/lib/engine/summary";
import { assistDeal } from "@/lib/ai";
import { useDealStore } from "@/lib/store";
import { copyText } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/outputs")({ component: OutputsPage });

function OutputsPage() {
  useDealStore((s) => s.deals);
  const [tab, setTab] = useState<"handoff" | EmailKey | "ai">("handoff");
  const [ai, setAi] = useState("");
  const [busy, setBusy] = useState(false);

  const text =
    tab === "handoff" ? buildHandoff() : tab === "ai" ? ai : buildEmail(tab);

  const runAi = async (mode: "brief" | "questions") => {
    setBusy(true);
    setTab("ai");
    const res = await assistDeal({ data: { mode, summary: buildHandoff() } });
    setBusy(false);
    if (!res.ok) {
      toast.error(res.error);
      setAi(res.error);
      return;
    }
    setAi(res.text);
  };

  return (
    <div>
      <PageHeader
        kicker="Handoff"
        title="Briefs and emails"
        description="Generated from the live capture. Copy, then send. Optional Grok polish is on-demand — it never runs by itself."
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => {
                void copyText(text).then(() => toast.success("Copied"));
              }}
            >
              Copy
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => void runAi("brief")}>
              Polish brief
            </Button>
            <Button variant="outline" disabled={busy} onClick={() => void runAi("questions")}>
              Suggest questions
            </Button>
          </>
        }
      />
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Chip on={tab === "handoff"} onClick={() => setTab("handoff")} label="Internal handoff" />
        {EMAIL_META.map((e) => (
          <Chip key={e.key} on={tab === e.key} onClick={() => setTab(e.key)} label={e.label} />
        ))}
        {ai ? <Chip on={tab === "ai"} onClick={() => setTab("ai")} label="Grok output" /> : null}
      </div>
      <Card>
        <CardContent className="pt-5">
          <p className="mb-2 text-xs text-subtle">
            {tab === "handoff"
              ? "Internal only — not customer-safe."
              : tab === "ai"
                ? busy
                  ? "Working…"
                  : "Review before you send. Grok does not invent specs that are not in the capture — still check."
                : "Customer-facing. Tokens filled from the active deal."}
          </p>
          <Textarea readOnly value={busy && tab === "ai" ? "Working…" : text} className="min-h-[420px] font-mono text-[12.5px] leading-relaxed" />
        </CardContent>
      </Card>
      <p className="mt-3 text-xs text-subtle">
        Also available: copy the live snapshot from Command, or export JSON from Deals.
      </p>
    </div>
  );
}

function Chip({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs",
        on ? "border-accent bg-accent text-accent-fg" : "border-border bg-surface text-muted hover:text-fg",
      )}
    >
      {label}
    </button>
  );
}
