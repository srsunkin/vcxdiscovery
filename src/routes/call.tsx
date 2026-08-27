import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ExtraParts } from "@/components/extra-list";
import { FieldControl, NotesField } from "@/components/fields";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { COVER_FIELDS, QUESTIONS, SCRIPT } from "@/data/questions";
import { loadProfile } from "@/lib/profile";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/call")({ component: CallMode });

const STEPS = [
  { id: "cover", kind: "cover" as const, title: "Cover sheet", prompt: "Lock the account, project, and next action before you dive in." },
  { id: "script", kind: "script" as const, title: "Opening script", prompt: "Thirty seconds. Then invite intros. Then transition." },
  ...QUESTIONS.map((q) => ({
    id: q.id,
    kind: "q" as const,
    title: `${q.num} · ${q.title}`,
    prompt: q.prompt,
    q,
  })),
  { id: "close", kind: "close" as const, title: "Close the call", prompt: "Never hang up without a dated next action and an owner." },
];

function CallMode() {
  const [i, setI] = useState(0);
  const [script, setScript] = useState(SCRIPT);
  const step = STEPS[i]!;
  const pct = Math.round((i / (STEPS.length - 1)) * 100);

  useEffect(() => {
    const p = loadProfile();
    setScript({
      opening: p.opening || SCRIPT.opening,
      intros: p.intros || SCRIPT.intros,
      transition: p.transition || SCRIPT.transition,
      close: SCRIPT.close,
    });
  }, [i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing) return;
      if (e.key === "ArrowRight" || e.key === "j") setI((n) => Math.min(STEPS.length - 1, n + 1));
      if (e.key === "ArrowLeft" || e.key === "k") setI((n) => Math.max(0, n - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const body = useMemo(() => {
    if (step.kind === "cover") {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {COVER_FIELDS.map((f) => (
            <div key={f.id} className={f.kind === "radio" ? "sm:col-span-2" : ""}>
              <FieldControl field={f} />
            </div>
          ))}
        </div>
      );
    }
    if (step.kind === "script") {
      return (
        <div className="grid gap-3">
          <ScriptCard title="Opening (30 sec)" body={script.opening} />
          <ScriptCard title="Invite introductions" body={script.intros} />
          <ScriptCard title="Transition to discovery" body={script.transition} />
          <p className="text-sm text-warn">{script.close}</p>
          <Link to="/settings" className="text-sm text-accent underline">
            Edit script in Settings
          </Link>
        </div>
      );
    }
    if (step.kind === "q" && "q" in step && step.q) {
      const q = step.q;
      return (
        <div className="grid gap-5">
          <p className="text-sm text-muted">{q.hint}</p>
          <NotesField id={q.notesId} large />
          {q.fields.length ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {q.fields.map((f) => (
                <div key={f.id} className={f.kind === "textarea" || f.kind === "checks" || f.kind === "radio" ? "sm:col-span-2" : ""}>
                  <FieldControl field={f} />
                </div>
              ))}
              {q.id === "q3" ? <ExtraParts /> : null}
            </div>
          ) : null}
        </div>
      );
    }
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <FieldControl field={COVER_FIELDS.find((f) => f.id === "next_action_date")!} />
        <FieldControl field={COVER_FIELDS.find((f) => f.id === "next_action_owner")!} />
        <FieldControl field={COVER_FIELDS.find((f) => f.id === "fit_confidence")!} />
        <FieldControl field={COVER_FIELDS.find((f) => f.id === "roadmap1") ?? { id: "roadmap1", label: "Who does what by when", kind: "text" }} />
      </div>
    );
  }, [step, script]);

  return (
    <div>
      <PageHeader
        kicker="On the call"
        title="Call mode"
        description="One beat at a time. J / K or arrows when you are not typing."
      />
      <Progress value={pct} className="mb-4" />
      <div className="-mx-1 mb-4 flex gap-1 overflow-x-auto px-1 pb-1">
        {STEPS.map((s, idx) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setI(idx)}
            className={cn(
              "h-11 shrink-0 rounded-md px-3 text-xs",
              idx === i ? "bg-accent text-accent-fg" : "bg-elevated text-muted",
            )}
          >
            {s.title.split(" ")[0]}
          </button>
        ))}
      </div>
      <p className="mb-2 text-lg font-semibold">{step.title}</p>
      <p className="mb-4 text-sm text-muted">{step.prompt}</p>
      <Card>
        <CardContent className="pt-5">{body}</CardContent>
      </Card>
      <div className="mt-4 flex justify-between gap-2">
        <Button variant="secondary" className="min-h-11" disabled={i === 0} onClick={() => setI((n) => Math.max(0, n - 1))}>
          <ChevronLeft className="size-4" /> Back
        </Button>
        <Button className="min-h-11" disabled={i === STEPS.length - 1} onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}>
          Next <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function ScriptCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl bg-elevated px-4 py-3 shadow-[var(--shadow-border)]">
      <div className="text-xs font-semibold uppercase tracking-wide text-accent">{title}</div>
      <p className="mt-2 text-sm text-fg">{body}</p>
    </div>
  );
}
