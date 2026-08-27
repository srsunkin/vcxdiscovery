import { useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { FieldControl, NotesField } from "@/components/fields";
import { ExtraParts } from "@/components/extra-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COVER_FIELDS, QUESTIONS } from "@/data/questions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/discovery")({ component: Discovery });

function Discovery() {
  const [open, setOpen] = useState<Record<string, boolean>>({ q1: true });
  const expand = (v: boolean) => {
    const next: Record<string, boolean> = { cover: v };
    QUESTIONS.forEach((q) => {
      next[q.id] = v;
    });
    setOpen(next);
  };

  return (
    <div>
      <PageHeader
        kicker="Full capture"
        title="Discovery workbook"
        description="Same questions as the original toolkit — structured fields under live notes, without a 5,000-line HTML file."
        actions={
          <>
            <Button variant="secondary" onClick={() => expand(true)}>
              Expand all
            </Button>
            <Button variant="ghost" onClick={() => expand(false)}>
              Collapse all
            </Button>
          </>
        }
      />

      <Section
        num="00"
        title="Cover sheet"
        prompt="Account, project, stage, next action."
        open={open.cover ?? false}
        onToggle={() => setOpen((s) => ({ ...s, cover: !s.cover }))}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COVER_FIELDS.map((f) => (
            <div key={f.id} className={f.kind === "radio" ? "sm:col-span-2 lg:col-span-3" : ""}>
              <FieldControl field={f} />
            </div>
          ))}
        </div>
      </Section>

      {QUESTIONS.map((q) => (
        <Section
          key={q.id}
          num={q.num}
          title={q.title}
          prompt={q.prompt}
          open={open[q.id] ?? false}
          onToggle={() => setOpen((s) => ({ ...s, [q.id]: !s[q.id] }))}
        >
          <p className="mb-4 text-sm text-muted">{q.hint}</p>
          <NotesField id={q.notesId} />
          {q.fields.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {q.fields.map((f) => (
                <div
                  key={f.id}
                  className={f.kind === "textarea" || f.kind === "checks" || f.kind === "radio" ? "sm:col-span-2" : ""}
                >
                  <FieldControl field={f} />
                </div>
              ))}
              {q.id === "q3" ? <ExtraParts /> : null}
            </div>
          ) : null}
        </Section>
      ))}
    </div>
  );
}

function Section({
  num,
  title,
  prompt,
  open,
  onToggle,
  children,
}: {
  num: string
  title: string
  prompt: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <Card className="mb-3 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-elevated/40"
      >
        <span className="rounded-full bg-accent px-2 py-0.5 font-mono text-[10px] font-semibold text-accent-fg">
          {num}
        </span>
        <span className="flex-1">
          <span className="block text-sm font-semibold">{title}</span>
          <span className="mt-0.5 block text-sm text-muted">{prompt}</span>
        </span>
        <ChevronDown className={cn("mt-1 size-4 text-muted transition-transform", open ? "rotate-0" : "-rotate-90")} />
      </button>
      {open ? <CardContent className="border-t border-border pt-4">{children}</CardContent> : null}
    </Card>
  );
}
