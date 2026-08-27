import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDealStore } from "@/lib/store";
import { downloadText, fmtDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/deals")({ component: DealsPage });

function DealsPage() {
  const deals = useDealStore((s) => s.deals);
  const activeId = useDealStore((s) => s.activeId);
  const setActive = useDealStore((s) => s.setActive);
  const newDeal = useDealStore((s) => s.newDeal);
  const duplicateDeal = useDealStore((s) => s.duplicateDeal);
  const deleteDeal = useDealStore((s) => s.deleteDeal);
  const clearActive = useDealStore((s) => s.clearActive);
  const importFields = useDealStore((s) => s.importFields);
  const fileRef = useRef<HTMLInputElement>(null);

  const exportJson = () => {
    const deal = deals.find((d) => d.id === activeId);
    const customer = String(deal?.values.customer || "Unknown").replace(/[^a-z0-9]/gi, "_");
    const payload = {
      meta: { exported: new Date().toISOString(), version: "Discovery Kit" },
      fields: deal?.values ?? {},
    };
    downloadText(
      `Discovery_${customer}_${new Date().toISOString().slice(0, 10)}.json`,
      JSON.stringify(payload, null, 2),
      "application/json",
    );
    toast.success("Exported JSON");
  };

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result)) as {
          fields?: Record<string, unknown>
          customer_info?: Record<string, unknown>
          discovery?: Record<string, unknown>
        };
        const fields = obj.fields ?? { ...obj.customer_info, ...obj.discovery };
        importFields(fields as Record<string, unknown>, true);
        toast.success("Imported JSON");
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not import");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <PageHeader
        kicker="Pipeline"
        title="Deals"
        description="Multiple discoveries on this device. The original HTML could only hold one form in localStorage. Import still understands the old workbook JSON."
        actions={
          <>
            <Button onClick={() => newDeal()}>New deal</Button>
            <Button variant="secondary" onClick={() => duplicateDeal()}>
              Duplicate
            </Button>
            <Button variant="outline" onClick={exportJson}>
              Export JSON
            </Button>
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              Import JSON
            </Button>
            <Button variant="ghost" onClick={() => clearActive()}>
              Clear notes
            </Button>
          </>
        }
      />
      <input
        ref={fileRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={(e) => {
          onFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div className="grid gap-3">
        {deals.map((d) => {
          const customer = String(d.values.customer || "Untitled deal");
          const contact = String(d.values.contact_name || "");
          const stage = String(d.values.stage || "No stage");
          const active = d.id === activeId;
          return (
            <Card key={d.id} className={cn(active && "shadow-[0_0_0_1px_var(--color-accent)]")}>
              <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" className="text-left" onClick={() => setActive(d.id)}>
                  <div className="text-sm font-semibold">{customer}</div>
                  <div className="text-xs text-muted">
                    {contact ? `${contact} · ` : ""}
                    {stage} · updated {fmtDate(d.updatedAt)}
                  </div>
                </button>
                <div className="flex gap-2">
                  <Button size="sm" variant={active ? "default" : "secondary"} onClick={() => setActive(d.id)}>
                    {active ? "Active" : "Open"}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm("Delete this deal from this device?")) deleteDeal(d.id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
