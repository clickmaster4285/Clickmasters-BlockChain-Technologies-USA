import {
  HelpCircle,
  MessageCircleQuestion,
  Plus,
} from "lucide-react";

export default function GlossaryFAQ({
  item,
}: {
  item: any;
}) {
  const faqs = item?.faqs || item?.faq || [];

  if (!faqs.length) return null;

  return (
    <section className="mt-10 overflow-hidden rounded-[2.2rem] border border-white/10 bg-surface/80 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
      <div className="relative border-b border-white/10 bg-gradient-to-r from-amber-base/15 via-white/[0.03] to-transparent p-5 sm:p-6 md:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-base/15 blur-3xl" />

        <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-base/20 bg-amber-base/10 text-amber-base sm:h-14 sm:w-14">
              <HelpCircle className="h-6 w-6" />
            </span>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-base">
                Frequently Asked Questions
              </p>

              <h2 className="mt-3 text-3xl font-black leading-tight text-text-primary md:text-5xl">
                Common questions about this term
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-silver md:text-base">
                Clear answers to help you understand this blockchain concept,
                its purpose, and its practical use.
              </p>
            </div>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/10 bg-bg-base/60 px-5 py-4 text-center">
            <p className="text-3xl font-black text-amber-base">
              {faqs.length}
            </p>

            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-silver">
              Answers
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 md:p-10">
        {faqs.map((faq: any, index: number) => (
          <div
            key={faq?.question || index}
            className="group rounded-3xl border border-white/10 bg-bg-base/50 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-base/30 hover:bg-bg-base/70 md:p-6"
          >
            <div className="flex gap-4">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-base/10 text-amber-base">
                <MessageCircleQuestion className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-black leading-7 text-text-primary md:text-xl">
                    {faq.question}
                  </h3>

                  <span className="hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-amber-base transition-transform group-hover:rotate-45 md:grid">
                    <Plus className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-3 text-sm leading-7 text-silver md:text-base md:leading-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}