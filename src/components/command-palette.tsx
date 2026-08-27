import { useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { GLOSSARY } from "@/data/glossary";
import { LIBRARY_PAGES, NAV } from "@/data/nav";
import { SYSTEMS } from "@/data/systems";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const glossHits = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return GLOSSARY.flatMap((c) => c.entries.map((e) => ({ ...e, cat: c.title })))
      .filter((e) => e.term.toLowerCase().includes(s) || e.def.toLowerCase().includes(s))
      .slice(0, 8);
  }, [q]);

  if (!open) return null;

  const go = (to: string) => {
    onOpenChange(false);
    void navigate({ to });
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]">
      <button className="absolute inset-0 bg-bg/70" onClick={() => onOpenChange(false)} aria-label="Close search" />
      <Command
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-elevated)]"
        label="Search Discovery"
      >
        <Command.Input
          autoFocus
          value={q}
          onValueChange={setQ}
          placeholder="Search questions, systems, glossary…"
          className="h-12 w-full border-b border-border bg-transparent px-4 text-sm text-fg outline-none placeholder:text-subtle"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No matches</Command.Empty>
          <Command.Group heading="Go to" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle">
            {NAV.map((n) => (
              <Command.Item
                key={n.to}
                value={`${n.label} ${n.hint}`}
                onSelect={() => go(n.to)}
                className="flex cursor-pointer items-center justify-between rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
              >
                <span>{n.label}</span>
                <span className="text-xs text-subtle">{n.hint}</span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Library" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle">
            {LIBRARY_PAGES.map((p) => (
              <Command.Item
                key={p.slug}
                value={`${p.title} ${p.blurb} ${p.letter}`}
                onSelect={() => go(`/library/${p.slug}`)}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
              >
                <span className="font-mono text-[10px] text-accent">{p.letter}</span>
                {p.title}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Systems" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle">
            {SYSTEMS.map((s) => (
              <Command.Item
                key={s.id}
                value={`${s.name} ${s.bestFor} ${s.energy}`}
                onSelect={() => go("/routing")}
                className="flex cursor-pointer flex-col rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
              >
                <span>
                  {s.name} <span className="text-xs text-muted">{s.energy}</span>
                </span>
                <span className="text-xs text-subtle">{s.short}</span>
              </Command.Item>
            ))}
          </Command.Group>
          {glossHits.length ? (
            <Command.Group heading="Glossary" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-subtle">
              {glossHits.map((e) => (
                <Command.Item
                  key={e.term}
                  value={`${e.term} ${e.def}`}
                  onSelect={() => go("/library/glossary")}
                  className="flex cursor-pointer flex-col rounded-md px-2 py-2 text-sm text-fg data-[selected=true]:bg-elevated"
                >
                  <span className="font-medium">{e.term}</span>
                  <span className="line-clamp-2 text-xs text-muted">{e.def}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ) : null}
        </Command.List>
      </Command>
    </div>
  );
}
