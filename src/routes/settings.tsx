import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_PROFILE, loadProfile, saveProfile, type Profile } from "@/lib/profile";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const [p, setP] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    setP(loadProfile());
  }, []);

  const set = (k: keyof Profile, v: string) => setP((s) => ({ ...s, [k]: v }));

  return (
    <div>
      <PageHeader
        kicker="Workspace"
        title="Settings"
        description="Set your name and company once. Emails, the opening script, and the sidebar use this — so channel partners can run the same kit."
        actions={
          <Button
            onClick={() => {
              saveProfile(p);
              toast.success("Saved on this device");
            }}
          >
            Save
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Identity</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Field label="Your name" value={p.owner} onChange={(v) => set("owner", v)} placeholder="Used on emails and cover sheet" />
            <Field label="Company / channel" value={p.org} onChange={(v) => set("org", v)} placeholder="Appears on sign-off instead of a personal brand" />
            <Field label="Role line" value={p.roleLine} onChange={(v) => set("roleLine", v)} placeholder="Industrial X-ray / CT" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Call script</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Area label="Opening (30 sec)" value={p.opening} onChange={(v) => set("opening", v)} />
            <Area label="Invite intros" value={p.intros} onChange={(v) => set("intros", v)} />
            <Area label="Transition" value={p.transition} onChange={(v) => set("transition", v)} />
            <Button
              variant="ghost"
              onClick={() => {
                setP({ ...DEFAULT_PROFILE, owner: p.owner, org: p.org, roleLine: p.roleLine });
              }}
            >
              Reset script to generic
            </Button>
          </CardContent>
        </Card>
      </div>
      <p className="mt-4 text-sm text-muted">
        Catalog names (PRO C, diondo d5, COMPASS) stay — those are the products. Your identity is local to this browser, not baked into the file.
      </p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Input value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} rows={4} />
    </div>
  );
}
