export default function ServicePageSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground animate-pulse">
      {/* Navbar placeholder */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[85vw] h-14 rounded-full bg-surface border border-border z-50" />

      <main className="pt-32 pb-24">
        <section className="container mx-auto max-w-5xl px-6">
          {/* Breadcrumbs */}
          <div className="mb-6 flex gap-2">
            <div className="h-4 w-16 bg-surface rounded" />
            <div className="h-4 w-4 bg-surface rounded" />
            <div className="h-4 w-20 bg-surface rounded" />
            <div className="h-4 w-4 bg-surface rounded" />
            <div className="h-4 w-32 bg-surface rounded" />
          </div>

          {/* Hero */}
          <div className="rounded-3xl h-80 bg-surface border border-border" />

          {/* Content grid */}
          <section className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2 space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface p-6 md:p-8">
                  <div className="flex gap-6 items-start">
                    <div className="h-14 w-14 rounded-2xl bg-surface/60 flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-48 bg-surface/60 rounded" />
                      <div className="h-4 w-full bg-surface/40 rounded" />
                      <div className="h-4 w-3/4 bg-surface/40 rounded" />
                      <div className="mt-4 space-y-2">
                        <div className="h-3 w-5/6 bg-surface/30 rounded" />
                        <div className="h-3 w-4/6 bg-surface/30 rounded" />
                        <div className="h-3 w-5/6 bg-surface/30 rounded" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Timeline */}
              <div className="space-y-4">
                <div className="h-6 w-32 bg-surface/60 rounded" />
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-full bg-surface/60 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-32 bg-surface/40 rounded" />
                      <div className="h-3 w-full bg-surface/30 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-border bg-surface p-6 sticky top-32">
                <div className="h-5 w-28 bg-surface/60 rounded" />
                <div className="mt-3 h-4 w-full bg-surface/40 rounded" />
                <div className="mt-4 h-10 w-full bg-surface/30 rounded-full" />
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="h-4 w-24 bg-surface/60 rounded" />
                <div className="mt-3 space-y-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-3 w-full bg-surface/30 rounded" />
                  ))}
                </div>
              </div>
            </aside>
          </section>
        </section>
      </main>
    </div>
  );
}
