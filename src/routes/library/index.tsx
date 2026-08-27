import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { LIBRARY_PAGES } from "@/data/nav";

export const Route = createFileRoute("/library/")({ component: LibraryIndex });

function LibraryIndex() {
  return (
    <div>
      <PageHeader
        kicker="Reference"
        title="Library"
        description="The appendixes from the workbook, searchable from the command bar. Customer-safe sheets are marked. Commercial content stays internal."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {LIBRARY_PAGES.map((p) => (
          <Link key={p.slug} to="/library/$slug" params={{ slug: p.slug }} className="block">
            <Card className="h-full transition-colors hover:bg-elevated/50">
              <CardContent className="pt-5">
                <div className="font-mono text-[11px] text-accent">{p.letter}</div>
                <div className="mt-1 text-sm font-semibold">{p.title}</div>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
