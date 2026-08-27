import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DISPLACEMENT,
  EXEC_ROLES,
  FEATURE_OUTCOMES,
  OBJECTIONS,
  ROI_LEVERS,
  ROLES,
} from "@/data/playbook";

export const Route = createFileRoute("/playbook")({ component: PlaybookPage });

function PlaybookPage() {
  return (
    <div>
      <PageHeader
        kicker="How to sell"
        title="Call playbook"
        description="Role questions, objection handling, and the executive translation layer. Pattern for every objection: acknowledge, reframe, prove on their parts."
      />
      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="objections">Objections</TabsTrigger>
          <TabsTrigger value="exec">Exec / ROI</TabsTrigger>
        </TabsList>
        <TabsContent value="roles">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {ROLES.map((r) => (
              <Card key={r.id}>
                <CardHeader>
                  <CardTitle>{r.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-4 text-sm text-muted">
                    {r.questions.map((q) => (
                      <li key={q}>{q}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="objections">
          <div className="flex flex-col gap-6">
            {OBJECTIONS.map((g) => (
              <div key={g.group}>
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent">{g.group}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {g.items.map((o) => (
                    <Card key={o.objection}>
                      <CardHeader>
                        <CardTitle className="text-[13px] leading-snug">“{o.objection}”</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted">{o.reframe}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent">
                Competitive displacement
              </h2>
              <p className="mb-3 text-sm text-muted">
                Anchor to a trigger, not a critique. Help them respond to a change — new program, tightened standard, scrap event.
              </p>
              <div className="overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
                <table className="w-full min-w-[640px] text-sm">
                  <thead className="border-b border-border text-xs uppercase tracking-wide text-subtle">
                    <tr>
                      <th className="px-4 py-3 text-left">Incumbent pain</th>
                      <th className="px-4 py-3 text-left">Counter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DISPLACEMENT.map((d) => (
                      <tr key={d.pain} className="border-b border-border/70">
                        <td className="px-4 py-3">{d.pain}</td>
                        <td className="px-4 py-3 text-muted">{d.counter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="exec">
          <p className="mb-4 text-sm text-muted">
            Plant managers, quality directors, VPs, and CFOs do not buy voxels. They buy outcomes.
          </p>
          <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {EXEC_ROLES.map((r) => (
              <Card key={r.role}>
                <CardHeader>
                  <CardTitle>{r.role}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{r.lead}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent">Feature → outcome</h2>
          <div className="mb-6 overflow-x-auto rounded-xl bg-surface shadow-[var(--shadow-border)]">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-subtle">
                <tr>
                  <th className="px-4 py-3 text-left">Capability</th>
                  <th className="px-4 py-3 text-left">Executive outcome</th>
                </tr>
              </thead>
              <tbody>
                {FEATURE_OUTCOMES.map((f) => (
                  <tr key={f.feature} className="border-b border-border/70">
                    <td className="px-4 py-3">{f.feature}</td>
                    <td className="px-4 py-3 text-muted">{f.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-accent">ROI levers</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {ROI_LEVERS.map((r) => (
              <Card key={r.lever}>
                <CardHeader>
                  <CardTitle>{r.lever}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{r.how}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm text-muted">
            Method: gross benefit − annual OPEX = net benefit; payback = (CAPEX + install) ÷ net benefit, in months.
            Use their numbers, round down, attribute each input. A conservative model the CFO believes beats an aggressive one they reject.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
