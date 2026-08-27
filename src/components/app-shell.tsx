import { useEffect, useState, type ReactNode } from "react";
import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ClipboardList, LayoutDashboard, Library, Menu, Phone, Search } from "lucide-react";
import { NAV } from "@/data/nav";
import { loadDealsFromStorage, saveDealsToStorage, useDealStore } from "@/lib/store";
import { computeProgress } from "@/lib/engine/progress";
import { loadProfile, PROFILE_EVENT } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const customer = useDealStore((s) => {
    const d = s.deals.find((x) => x.id === s.activeId);
    const v = d?.values.customer;
    return typeof v === "string" ? v : "";
  });
  const tick = useDealStore((s) => s.deals);
  const hydrated = useDealStore((s) => s.hydrated);
  const pct = hydrated && tick.length ? computeProgress().pct : 0;
  const [org, setOrg] = useState("");
  useEffect(() => {
    const sync = () => setOrg(loadProfile().org.trim());
    sync();
    window.addEventListener(PROFILE_EVENT, sync);
    return () => window.removeEventListener(PROFILE_EVENT, sync);
  }, [pathname]);

  return (
    <div className="flex h-full flex-col bg-panel">
      <div className="border-b border-border px-4 py-5">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">Industrial X-ray / CT</div>
        <div className="mt-1 text-lg font-semibold tracking-tight">Discovery Kit</div>
        {org ? <p className="mt-1 truncate text-xs text-subtle">{org}</p> : null}
        <div className="mt-4">
          <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-muted">
            <span>Capture</span>
            <span className="tabular-nums">{pct}%</span>
          </div>
          <Progress value={pct} />
          <p className="mt-2 truncate text-xs text-subtle">{customer || "Untitled deal"}</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        {(["work", "intel"] as const).map((g) => (
          <div key={g} className="mb-4">
            <div className="px-2 pb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-subtle">
              {g === "work" ? "On the call" : "Reference"}
            </div>
            {NAV.filter((n) => n.group === g).map((n) => {
              const active = n.to === "/" ? pathname === "/" : pathname === n.to || pathname.startsWith(n.to + "/");
              const Icon = n.icon;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={onNavigate}
                  className={cn(
                    "mb-0.5 flex min-h-11 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
                    active ? "bg-elevated text-fg" : "text-muted hover:bg-elevated/60 hover:text-fg",
                  )}
                >
                  <Icon className="size-4 shrink-0 opacity-80" />
                  <span className="flex-1">{n.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-border px-3 py-3 text-[11px] text-subtle">
        <p>Stays on this device</p>
        <p className="mt-0.5">Autosave · Ctrl/⌘K search</p>
      </div>
    </div>
  );
}

const DOCK = [
  { to: "/", label: "Home", icon: LayoutDashboard },
  { to: "/call", label: "Call", icon: Phone },
  { to: "/discovery", label: "Capture", icon: ClipboardList },
  { to: "/library", label: "Library", icon: Library },
];

export function AppShell() {
  const [cmd, setCmd] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    loadDealsFromStorage();
    const unsub = useDealStore.subscribe(() => saveDealsToStorage());
    return () => unsub();
  }, []);
  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-bg text-fg">
        <aside className="fixed inset-y-0 left-0 hidden w-[272px] lg:block">
          <Sidebar />
        </aside>
        <div className="lg:pl-[272px]">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-bg/90 px-3 backdrop-blur-md lg:px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobile(true)}>
              <Menu className="size-4" />
              <span className="sr-only">Menu</span>
            </Button>
            <button
              type="button"
              onClick={() => setCmd(true)}
              className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-md border border-border bg-panel px-3 text-left text-sm text-subtle hover:border-border-strong"
            >
              <Search className="size-3.5 shrink-0" />
              <span className="truncate">Search systems, Nadcap, objections…</span>
              <kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-subtle sm:inline">
                ⌘K
              </kbd>
            </button>
          </header>
          <main className="mx-auto w-full max-w-[1280px] px-4 py-6 pb-24 lg:px-8 lg:py-8 lg:pb-8">
            <Outlet />
          </main>
        </div>
        <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-panel/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
          {DOCK.map((d) => {
            const active = d.to === "/" ? pathname === "/" : pathname === d.to || pathname.startsWith(d.to + "/");
            const Icon = d.icon;
            return (
              <Link
                key={d.to}
                to={d.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px]",
                  active ? "text-fg" : "text-muted",
                )}
              >
                <Icon className="size-5" />
                {d.label}
              </Link>
            );
          })}
        </nav>
        <Sheet open={mobile} onOpenChange={setMobile}>
          <SheetContent>
            <Sidebar onNavigate={() => setMobile(false)} />
          </SheetContent>
        </Sheet>
        <CommandPalette open={cmd} onOpenChange={setCmd} />
      </div>
    </TooltipProvider>
  );
}

export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker?: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {kicker ? (
          <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">{kicker}</div>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-1 max-w-2xl text-sm text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
