import { AlertTriangle, ArrowRight, FlaskConical } from "lucide-react";
import Link from "next/link";

import {
  CONSULTING_SERVICE_PATH,
  sampleAssessment as s,
} from "@/data/consulting";

/**
 * Illustrative sample deliverable (BC-09). Always carries the
 * "not a client engagement" label so it cannot be mistaken for a case study.
 *
 * `variant="preview"` shows the scenario and recommendation only and links to
 * the full worked example on the service page.
 */
export default function SampleAssessment({
  variant = "full",
  id,
}: {
  variant?: "full" | "preview";
  id?: string;
}) {
  const full = variant === "full";

  return (
    <section
      id={id}
      aria-labelledby={`${id ?? "sample"}-heading`}
      className="scroll-mt-32"
    >
      <div className="overflow-hidden rounded-2xl border-2 border-dashed border-amber-base/40 bg-white">
        <div className="flex flex-wrap items-center gap-3 border-b border-border-default bg-amber-base/10 px-5 py-4 sm:px-7">
          <FlaskConical
            className="h-5 w-5 shrink-0 text-amber-base"
            aria-hidden="true"
          />
          <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-base">
            {s.label}
          </p>
        </div>

        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-text-secondary">
              {full ? "Sample assessment" : "Sample deliverable preview"}
            </p>
            <h2
              id={`${id ?? "sample"}-heading`}
              className="mt-2 text-2xl font-black leading-tight text-text-primary sm:text-3xl"
            >
              {s.title}
            </h2>
          </div>

          <div>
            <h3 className="text-base font-black text-text-primary">
              Scenario (fictional)
            </h3>
            <p className="mt-2 text-base leading-8 text-text-secondary">
              {s.scenario}
            </p>
          </div>

          {full && (
            <>
              <div>
                <h3 className="text-base font-black text-text-primary">
                  Assumptions
                </h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-text-secondary">
                  {s.assumptions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base font-black text-text-primary">
                  Options considered
                </h3>
                <div className="mt-3 grid gap-3 md:grid-cols-3">
                  {s.options.map((option) => (
                    <div
                      key={option.title}
                      className="rounded-xl border border-border-default bg-bg-base p-4"
                    >
                      <p className="text-sm font-black text-text-primary">
                        {option.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">
                        {option.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className="rounded-xl border border-amber-base/20 bg-amber-base/10 p-4">
            <h3 className="text-base font-black text-text-primary">
              Recommendation
            </h3>
            <p className="mt-2 text-sm font-medium leading-7 text-text-primary">
              {s.recommendation}
            </p>
          </div>

          {full && (
            <div>
              <h3 className="text-base font-black text-text-primary">
                Rationale
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-7 text-text-secondary">
                {s.rationale.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 rounded-xl border border-border-default bg-bg-base p-4">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-base"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-sm font-black text-text-primary">
                Limitations
              </h3>
              <ul className="mt-1 space-y-1 text-sm leading-6 text-text-secondary">
                {(full ? s.limitations : s.limitations.slice(0, 1)).map(
                  (item) => (
                    <li key={item}>{item}</li>
                  ),
                )}
              </ul>
            </div>
          </div>

          {!full && (
            <Link
              href={`${CONSULTING_SERVICE_PATH}#sample-assessment`}
              className="inline-flex items-center gap-2 text-sm font-black text-amber-base hover:underline"
            >
              See the full worked example with assumptions and options
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
