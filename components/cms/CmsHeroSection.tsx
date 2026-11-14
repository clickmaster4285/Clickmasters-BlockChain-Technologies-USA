// components/cms/CmsHeroSection.tsx
// CMS "hero" in the site's hero style. settings.layout:
//   background — full-bleed image behind the text (dark overlay)
//   split      — text left, image right
//   (other)    — centered, on the site's grid + amber/emerald glow backdrop
import {
  ButtonRow,
  CmsImg,
  CmsSection,
  Eyebrow,
  GradientHeading,
  containerClass,
  settingStr,
  type Settings,
} from "./CmsSection";
import type { CmsLink } from "./cmsContent";

export type CmsHeroData = {
  eyebrow: string;
  heading: string;
  description: string;
  meta: string;
  image: string;
  primary?: CmsLink;
  secondary?: CmsLink;
  buttonStyle: string;
};

const H1 =
  "text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl";

export default function CmsHeroSection({
  data,
  settings,
  id,
}: {
  data: CmsHeroData;
  settings: Settings;
  id?: string;
}) {
  const layout = settingStr(settings, "layout");
  const width = containerClass(settings, "wide");

  if (layout === "background" && data.image) {
    return (
      <CmsSection
        settings={settings}
        id={id}
        defaultPadding={[160, 140]}
        background="cms-surface-dark"
        contained={false}
      >
        <CmsImg
          src={data.image}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-slate-950/90 via-slate-900/75 to-amber-dim/50" />
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-20" />
        <div className={`relative ${width}`}>
          <div className="max-w-3xl">
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <GradientHeading
              as="h1"
              text={data.heading}
              className={`${data.eyebrow ? "mt-6" : ""} ${H1}`}
            />
            {data.description && (
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-xl">
                {data.description}
              </p>
            )}
            <ButtonRow
              primary={data.primary}
              secondary={data.secondary}
              shape={data.buttonStyle}
            />
            {data.meta && (
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">
                {data.meta}
              </p>
            )}
          </div>
        </div>
      </CmsSection>
    );
  }

  const backdrop = (
    <>
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[28rem] w-[28rem] animate-orb rounded-full bg-amber-glow blur-[100px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[28rem] w-[28rem] animate-orb rounded-full bg-emerald-glow blur-[100px]" />
    </>
  );

  if (layout === "split" && data.image) {
    return (
      <CmsSection
        settings={settings}
        id={id}
        defaultPadding={[150, 96]}
        contained={false}
      >
        {backdrop}
        <div
          className={`relative grid items-center gap-12 lg:grid-cols-2 ${width}`}
        >
          <div>
            {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
            <GradientHeading
              as="h1"
              text={data.heading}
              className={`${data.eyebrow ? "mt-6" : ""} ${H1}`}
            />
            {data.description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg">
                {data.description}
              </p>
            )}
            <ButtonRow
              primary={data.primary}
              secondary={data.secondary}
              shape={data.buttonStyle}
            />
            {data.meta && (
              <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">
                {data.meta}
              </p>
            )}
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-primary opacity-15 blur-2xl" />
            <CmsImg
              src={data.image}
              className="relative aspect-[4/3] w-full rounded-3xl border border-border object-cover shadow-soft"
            />
          </div>
        </div>
      </CmsSection>
    );
  }

  return (
    <CmsSection
      settings={settings}
      id={id}
      defaultPadding={[160, 112]}
      contained={false}
    >
      {backdrop}
      <div className={`relative text-center ${width}`}>
        <div className="mx-auto max-w-4xl">
          {data.eyebrow && <Eyebrow>{data.eyebrow}</Eyebrow>}
          <GradientHeading
            as="h1"
            text={data.heading}
            className={`${data.eyebrow ? "mt-6" : ""} ${H1}`}
          />
          {data.description && (
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-xl">
              {data.description}
            </p>
          )}
          <ButtonRow
            primary={data.primary}
            secondary={data.secondary}
            shape={data.buttonStyle}
            center
          />
          {data.meta && (
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-text-muted">
              {data.meta}
            </p>
          )}
        </div>
      </div>
    </CmsSection>
  );
}
