import { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDealStore } from "@/lib/store";
import { uid } from "@/lib/utils";

export type ExtraPart = {
  id: string
  desc: string
  material: string
  envelope: string
  weight: string
};

function parseParts(raw: string | boolean | undefined): ExtraPart[] {
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const v = JSON.parse(raw) as ExtraPart[];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function ExtraParts() {
  const raw = useDealStore((s) => {
    const d = s.deals.find((x) => x.id === s.activeId);
    return d?.values.extra_parts;
  });
  const setValue = useDealStore((s) => s.setValue);
  const parts = parseParts(raw);
  const [fresh, setFresh] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement | null>(null);

  const write = (next: ExtraPart[]) => setValue("extra_parts", JSON.stringify(next));

  useEffect(() => {
    if (fresh) firstRef.current?.focus();
  }, [fresh]);

  return (
    <div className="sm:col-span-2">
      <Label>Additional parts</Label>
      <p className="mb-2 text-xs text-subtle">Add each extra geometry — envelope checker uses the primary part plus these notes.</p>
      <div className="flex flex-col gap-3">
        {parts.map((p, i) => (
          <div key={p.id} className="grid gap-2 rounded-xl bg-elevated/60 p-3 shadow-[var(--shadow-border)] sm:grid-cols-2">
            <Input
              ref={p.id === fresh ? firstRef : undefined}
              placeholder="Description / geometry"
              value={p.desc}
              onChange={(e) => write(parts.map((x) => (x.id === p.id ? { ...x, desc: e.target.value } : x)))}
            />
            <Input placeholder="Material" value={p.material} onChange={(e) => write(parts.map((x) => (x.id === p.id ? { ...x, material: e.target.value } : x)))} />
            <Input placeholder="Envelope (mm or in)" value={p.envelope} onChange={(e) => write(parts.map((x) => (x.id === p.id ? { ...x, envelope: e.target.value } : x)))} />
            <div className="flex gap-2">
              <Input placeholder="Weight" value={p.weight} onChange={(e) => write(parts.map((x) => (x.id === p.id ? { ...x, weight: e.target.value } : x)))} />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove part ${i + 1}`}
                onClick={() => write(parts.filter((x) => x.id !== p.id))}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="mt-2"
        onClick={() => {
          const id = uid();
          write([...parts, { id, desc: "", material: "", envelope: "", weight: "" }]);
          setFresh(id);
        }}
      >
        <Plus className="size-4" />
        Add part
      </Button>
    </div>
  );
}

export function ExtraFlags({ fieldId = "extra_flags" }: { fieldId?: string }) {
  const raw = useDealStore((s) => {
    const d = s.deals.find((x) => x.id === s.activeId);
    return d?.values[fieldId];
  });
  const setValue = useDealStore((s) => s.setValue);
  const items = parseParts(typeof raw === "string" ? raw : undefined).map((p) => ({ id: p.id, text: p.desc }));
  const [fresh, setFresh] = useState<string | null>(null);
  const firstRef = useRef<HTMLInputElement | null>(null);

  const write = (next: { id: string; text: string }[]) =>
    setValue(fieldId, JSON.stringify(next.map((x) => ({ id: x.id, desc: x.text, material: "", envelope: "", weight: "" }))));

  useEffect(() => {
    if (fresh) firstRef.current?.focus();
  }, [fresh]);

  return (
    <div className="mt-4">
      <Label>Custom flags</Label>
      <div className="mt-2 flex flex-col gap-2">
        {items.map((it) => (
          <div key={it.id} className="flex gap-2">
            <Input
              ref={it.id === fresh ? firstRef : undefined}
              value={it.text}
              placeholder="Add a deal-specific risk"
              onChange={(e) => write(items.map((x) => (x.id === it.id ? { ...x, text: e.target.value } : x)))}
            />
            <Button type="button" variant="ghost" size="icon" aria-label="Remove" onClick={() => write(items.filter((x) => x.id !== it.id))}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="mt-2"
        onClick={() => {
          const id = uid();
          write([...items, { id, text: "" }]);
          setFresh(id);
        }}
      >
        <Plus className="size-4" />
        Add flag
      </Button>
    </div>
  );
}
