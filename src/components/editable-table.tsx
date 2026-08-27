import { useEffect, useRef, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  addRow,
  hideFactory,
  loadExtras,
  removeAdded,
  restoreFactory,
  updateAdded,
  overrideFactory,
  type ExtraRow,
  type LibExtras,
} from "@/lib/extras";
import { cn } from "@/lib/utils";

export type FactoryRow = { key: string; cells: string[] };

const EMPTY: LibExtras = { added: {}, overrides: {}, hidden: {} };

export function EditableTable({
  tableId,
  headers,
  factory,
  addLabel = "Add item",
}: {
  tableId: string
  headers: string[]
  factory: FactoryRow[]
  addLabel?: string
}) {
  const [data, setData] = useState<LibExtras>(EMPTY);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setData(loadExtras());
  }, []);

  useEffect(() => {
    if (editing) formRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [editing]);

  const hidden = new Set(data.hidden[tableId] ?? []);
  const added: ExtraRow[] = data.added[tableId] ?? [];
  const overrides = data.overrides[tableId] ?? {};
  const visibleFactory = factory.filter((r) => !hidden.has(r.key));

  const startEdit = (id: string, cells: string[]) => {
    const padded = [...cells];
    while (padded.length < headers.length) padded.push("");
    setEditing(id);
    setDraft(padded.slice(0, headers.length));
  };

  const cancel = () => {
    if (editing?.startsWith("a:")) {
      const id = editing.slice(2);
      const row = added.find((r) => r.id === id);
      if (row && row.cells.every((c) => !c.trim()) && draft.every((c) => !c.trim())) {
        setData(removeAdded(tableId, id));
      }
    }
    setEditing(null);
    setDraft([]);
  };

  const save = () => {
    if (!editing) return;
    if (editing.startsWith("f:")) setData(overrideFactory(tableId, editing.slice(2), draft));
    else if (editing.startsWith("a:")) setData(updateAdded(tableId, editing.slice(2), draft));
    cancel();
  };

  const onAdd = () => {
    const next = addRow(tableId, headers.length);
    setData(next);
    const last = (next.added[tableId] ?? []).at(-1);
    if (last) startEdit(`a:${last.id}`, last.cells);
  };

  return (
    <div className="mb-6">
      <div className="hidden overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)] md:block">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-subtle">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-3 font-medium">
                  {h}
                </th>
              ))}
              <th className="w-[88px] px-2 py-3" />
            </tr>
          </thead>
          <tbody>
            {visibleFactory.map((r) => {
              const cells = overrides[r.key] ?? r.cells;
              const id = `f:${r.key}`;
              return (
                <ViewRow
                  key={r.key}
                  cells={cells}
                  active={editing === id}
                  onEdit={() => startEdit(id, cells)}
                  onRemove={() => setData(hideFactory(tableId, r.key))}
                  removeLabel="Hide catalog row"
                />
              );
            })}
            {added.map((r) => {
              const id = `a:${r.id}`;
              return (
                <ViewRow
                  key={r.id}
                  cells={r.cells}
                  active={editing === id}
                  onEdit={() => startEdit(id, r.cells)}
                  onRemove={() => setData(removeAdded(tableId, r.id))}
                  removeLabel="Delete row"
                  added
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 md:hidden">
        {visibleFactory.map((r) => {
          const cells = overrides[r.key] ?? r.cells;
          const id = `f:${r.key}`;
          return (
            <ViewCard
              key={r.key}
              headers={headers}
              cells={cells}
              active={editing === id}
              onEdit={() => startEdit(id, cells)}
              onRemove={() => setData(hideFactory(tableId, r.key))}
              removeLabel="Hide"
            />
          );
        })}
        {added.map((r) => {
          const id = `a:${r.id}`;
          return (
            <ViewCard
              key={r.id}
              headers={headers}
              cells={r.cells}
              active={editing === id}
              onEdit={() => startEdit(id, r.cells)}
              onRemove={() => setData(removeAdded(tableId, r.id))}
              removeLabel="Delete"
              added
            />
          );
        })}
      </div>

      {editing ? (
        <div ref={formRef} className="mt-3 rounded-xl bg-accent-dim/25 p-4 shadow-[var(--shadow-border)]">
          <p className="mb-3 text-sm font-semibold">{editing.startsWith("a:") ? addLabel : "Edit row"}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {headers.map((h, j) => (
              <label key={h} className={cn("grid gap-1.5", headers.length <= 3 && j === headers.length - 1 && "sm:col-span-2")}>
                <Label>{h}</Label>
                {h.toLowerCase().includes("desc") || h.toLowerCase().includes("detail") || h.toLowerCase().includes("note") || h.toLowerCase().includes("use") || h.toLowerCase().includes("caution") || h.toLowerCase().includes("definition") ? (
                  <Textarea
                    autoFocus={j === 0}
                    rows={3}
                    value={draft[j] ?? ""}
                    onChange={(e) => {
                      const next = [...draft];
                      next[j] = e.target.value;
                      setDraft(next);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") cancel();
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
                    }}
                  />
                ) : (
                  <Input
                    autoFocus={j === 0}
                    value={draft[j] ?? ""}
                    onChange={(e) => {
                      const next = [...draft];
                      next[j] = e.target.value;
                      setDraft(next);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") cancel();
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) save();
                    }}
                  />
                )}
              </label>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" size="lg" onClick={save}>
              <Check className="size-4" /> Save
            </Button>
            <Button type="button" variant="ghost" onClick={cancel}>
              <X className="size-4" /> Cancel
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" variant="secondary" size="lg" onClick={onAdd}>
          <Plus className="size-4" />
          {addLabel}
        </Button>
        {hidden.size ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              for (const key of hidden) restoreFactory(tableId, key);
              setData(loadExtras());
            }}
          >
            Restore hidden catalog rows ({hidden.size})
          </Button>
        ) : null}
      </div>
      <p className="mt-2 text-xs text-subtle">Tap Edit or {addLabel}. Changes stay on this device.</p>
    </div>
  );
}

function ViewRow({
  cells,
  active,
  onEdit,
  onRemove,
  removeLabel,
  added,
}: {
  cells: string[]
  active?: boolean
  onEdit: () => void
  onRemove: () => void
  removeLabel: string
  added?: boolean
}) {
  return (
    <tr className={cn("border-b border-border/70 align-top", added && "bg-accent-dim/15", active && "bg-accent-dim/40")}>
      {cells.map((c, j) => (
        <td key={j} className={cn("px-4 py-3", j === 0 ? "font-medium text-fg" : "text-muted")}>
          {c || <span className="text-subtle">—</span>}
        </td>
      ))}
      <td className="px-1 py-2">
        <div className="flex">
          <button type="button" className="min-h-11 min-w-11 rounded-md p-2.5 text-subtle hover:bg-elevated hover:text-fg" aria-label="Edit row" onClick={onEdit}>
            <Pencil className="size-3.5" />
          </button>
          <button type="button" className="min-h-11 min-w-11 rounded-md p-2.5 text-subtle hover:bg-elevated hover:text-danger" aria-label={removeLabel} onClick={onRemove}>
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}

function ViewCard({
  headers,
  cells,
  active,
  onEdit,
  onRemove,
  removeLabel,
  added,
}: {
  headers: string[]
  cells: string[]
  active?: boolean
  onEdit: () => void
  onRemove: () => void
  removeLabel: string
  added?: boolean
}) {
  return (
    <div className={cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]", added && "ring-1 ring-accent/30", active && "ring-1 ring-accent")}>
      <div className="text-sm font-semibold">{cells[0] || "Untitled"}</div>
      <dl className="mt-2 grid gap-1.5">
        {headers.slice(1).map((h, i) => (
          <div key={h}>
            <dt className="font-mono text-[10px] uppercase tracking-wide text-subtle">{h}</dt>
            <dd className="text-sm text-muted">{cells[i + 1] || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-3 flex gap-2">
        <Button type="button" variant="secondary" onClick={onEdit}>
          <Pencil className="size-3.5" /> Edit
        </Button>
        <Button type="button" variant="ghost" onClick={onRemove}>
          <Trash2 className="size-3.5" /> {removeLabel}
        </Button>
      </div>
    </div>
  );
}
