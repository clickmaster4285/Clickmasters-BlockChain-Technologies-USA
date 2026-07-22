// app/industries/[slug]/loading.tsx

export default function IndustryLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="site-container px-6 pb-24 pt-36">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="h-9 w-44 animate-pulse rounded-full bg-surface" />

            <div className="mt-8 space-y-4">
              <div className="h-14 w-full animate-pulse rounded-2xl bg-surface" />

              <div className="h-14 w-[92%] animate-pulse rounded-2xl bg-surface" />

              <div className="h-14 w-[72%] animate-pulse rounded-2xl bg-surface" />
            </div>

            <div className="mt-8 space-y-3">
              <div className="h-5 w-full animate-pulse rounded-lg bg-surface/80" />

              <div className="h-5 w-[88%] animate-pulse rounded-lg bg-surface/80" />

              <div className="h-5 w-[62%] animate-pulse rounded-lg bg-surface/80" />
            </div>

            <div className="mt-9 flex gap-3">
              <div className="h-14 w-48 animate-pulse rounded-full bg-amber-base/20" />

              <div className="h-14 w-40 animate-pulse rounded-full bg-surface" />
            </div>
          </div>

          <div className="aspect-[4/4.5] animate-pulse rounded-[2.5rem] bg-surface" />
        </div>

        <div className="mt-24 grid gap-8 xl:grid-cols-[240px_1fr]">
          <div className="hidden h-[430px] animate-pulse rounded-[2rem] bg-surface xl:block" />

          <div className="space-y-8">
            <div className="h-52 animate-pulse rounded-[2rem] bg-surface" />

            <div className="space-y-4">
              <div className="h-10 w-[62%] animate-pulse rounded-xl bg-surface" />

              <div className="h-5 w-full animate-pulse rounded-lg bg-surface/80" />

              <div className="h-5 w-full animate-pulse rounded-lg bg-surface/80" />

              <div className="h-5 w-[78%] animate-pulse rounded-lg bg-surface/80" />
            </div>

            <div className="h-72 animate-pulse rounded-[2rem] bg-surface" />
          </div>
        </div>
      </div>
    </div>
  );
}