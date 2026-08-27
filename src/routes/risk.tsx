import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { FieldControl, NotesField } from "@/components/fields";
import { ExtraFlags } from "@/components/extra-list";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RISK_FLAGS } from "@/data/playbook";
import { computeRisks } from "@/lib/engine/risk";
import { useDealStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/risk")({ component: RiskPage });

function RiskPage() {
  useDealStore((s) => s.deals);
  const { items, level } = computeRisks();

  return (
    <div>
      <PageHeader
        kicker="Risk radar"
        title="What can still kill this deal"
        description="Auto-detected gaps from the capture, plus the manual red-flag list from the original workbook."
        actions={
          <Badge variant={level === "High" ? "danger" : level === "Medium" ? "warn" : "success"}>
            {level}
          </Badge>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Auto-detected</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {items.map((r) => (
              <div
                key={r.text}
                className={cn(
                  "rounded-lg border-l-4 px-3 py-2 text-sm",
                  r.level === "high"
                    ? "border-danger bg-danger-dim text-fg"
                    : r.level === "ok"
                      ? "border-success bg-success-dim text-fg"
                      : "border-warn bg-warn-dim text-fg",
                )}
              >
                {r.text}
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Manual flags</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldControl
                field={{
                  id: "manual_risks",
                  label: "Tick anything the auto list missed",
                  kind: "checks",
                  options: RISK_FLAGS.map((f) => ({ id: f.id, label: f.label })),
                }}
              />
              <ExtraFlags />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mitigation</CardTitle>
            </CardHeader>
            <CardContent>
              <NotesField id="risk_mitigation" label="Top risk / mitigation notes" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
