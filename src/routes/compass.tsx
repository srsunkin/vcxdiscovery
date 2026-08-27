import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { FieldControl, NotesField } from "@/components/fields";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPASS_FIELDS } from "@/data/questions";

export const Route = createFileRoute("/compass")({ component: CompassPage });

function CompassPage() {
  return (
    <div>
      <PageHeader
        kicker="AI / ADR"
        title="COMPASS deployment"
        description="Where are they in the AI journey? Images, defect classes, operating mode, inline PLC, archive, and IT constraints — the original workbook's longest section, grouped so you can actually fill it on a call."
      />
      <Card className="mb-4">
        <CardContent className="pt-5">
          <NotesField
            id="disc_ai"
            label="Call notes"
            placeholder="Check-up / feasibility done? Existing systems & retrofit? Image readiness? Defect classes? COMPASS mode? Inline / PLC? Archiving? IT & maintenance?"
          />
        </CardContent>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        {COMPASS_FIELDS.map((g) => (
          <Card key={g.group}>
            <CardHeader>
              <CardTitle>{g.group}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {g.fields.map((f) => (
                <FieldControl key={f.id} field={f} />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
