import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { FieldDef } from "@/data/questions";
import { useDealStore, type DealValues } from "@/lib/store";
import { cn } from "@/lib/utils";

const EMPTY_VALUES: DealValues = {};

export function FieldControl({ field }: { field: FieldDef }) {
  const hydrated = useDealStore((s) => s.hydrated);
  const value = useDealStore((s) => {
    if (!s.hydrated) return undefined;
    const deal = s.deals.find((d) => d.id === s.activeId);
    return deal?.values[field.id];
  });
  const setValue = useDealStore((s) => s.setValue);
  const values = useDealStore((s) => {
    if (!s.hydrated) return EMPTY_VALUES;
    return s.deals.find((d) => d.id === s.activeId)?.values ?? EMPTY_VALUES;
  });

  const str = hydrated && typeof value === "string" ? value : "";

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={field.id}>{field.label}</Label>
      {field.hint ? <p className="text-xs text-subtle">{field.hint}</p> : null}

      {field.kind === "text" || field.kind === "date" ? (
        <Input
          id={field.id}
          type={field.kind === "date" ? "date" : "text"}
          placeholder={field.placeholder}
          value={str}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      ) : null}

      {field.kind === "textarea" ? (
        <Textarea
          id={field.id}
          placeholder={field.placeholder}
          value={str}
          onChange={(e) => setValue(field.id, e.target.value)}
        />
      ) : null}

      {field.kind === "select" ? (
        <select
          id={field.id}
          value={str}
          onChange={(e) => setValue(field.id, e.target.value)}
          className="h-11 w-full rounded-md border border-border bg-panel px-3 text-sm text-fg"
        >
          <option value="">Select…</option>
          {field.options?.map((o) => (
            <option key={o.id} value={o.label}>
              {o.label}
            </option>
          ))}
        </select>
      ) : null}

      {field.kind === "radio" ? (
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => {
            const val = o.value ?? o.label;
            const on = str === val;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setValue(field.id, val)}
                className={cn(
                  "min-h-11 rounded-full border px-3 py-2 text-left text-xs transition-colors",
                  on
                    ? "border-accent bg-accent-dim text-fg"
                    : "border-border bg-panel text-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {field.kind === "checks" ? (
        <div className="flex flex-col gap-2">
          {field.options?.map((o) => {
            const checked = values[o.id] === true;
            return (
              <label
                key={o.id}
                className="flex min-h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-panel px-3 py-2 text-sm text-fg hover:border-border-strong"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={(c) => setValue(o.id, c === true)}
                />
                {o.label}
              </label>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function NotesField({
  id,
  label = "Call notes",
  placeholder,
  large,
}: {
  id: string
  label?: string
  placeholder?: string
  large?: boolean
}) {
  const hydrated = useDealStore((s) => s.hydrated);
  const value = useDealStore((s) => {
    if (!s.hydrated) return "";
    const deal = s.deals.find((d) => d.id === s.activeId);
    const v = deal?.values[id];
    return typeof v === "string" ? v : "";
  });
  const setValue = useDealStore((s) => s.setValue);
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        placeholder={placeholder ?? "Capture what they actually said…"}
        value={hydrated ? value : ""}
        onChange={(e) => setValue(id, e.target.value)}
        className={large ? "min-h-40 text-base" : "min-h-28"}
      />
    </div>
  );
}
