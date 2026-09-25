import { AppImage } from "../common/AppImage";
import { Icon } from "../common/Icon";
import { quietLinkClassName } from "../common/ProseLink";
import { ContentCard, NestedContentCard } from "@/components/ui/surface";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n/server";
import { msg } from "@/i18n/messages";
import { cn } from "@/lib/utils";

const PIRU_SITE_HREF = "https://kagerou.glass/piru/";
const PIRU_TESTFLIGHT_HREF = "https://testflight.apple.com/join/4vcA7dY3";

const AUTHORS = {
  kageroumado: { name: "kageroumado", href: "https://github.com/kageroumado" },
  pharmacykitty: { name: "pharmacykitty", href: "https://github.com/pharmacykitty" },
} as const;

function AuthorLink({ author }: { author: { name: string; href: string } }) {
  return (
    <a
      href={author.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("theme-focus-ring", quietLinkClassName)}
    >
      {author.name}
    </a>
  );
}

/**
 * Screenshots are the app in its dose.wiki skin, downscaled from 1320 × 2868 captures to 720 px
 * wide (a 3x phone at the rendered size) and encoded as 4:4:4 AVIF so small coloured UI text
 * stays sharp. They are served `unoptimized`: the optimizer would re-encode them to 4:2:0 WebP.
 */
const SCREENSHOT_WIDTH = 720;
const SCREENSHOT_HEIGHT = 1564;

const SCREENSHOTS = [
  { src: "/about/piru/journal-timeline.avif", alt: msg("Piru's journal timeline with LSD and MDMA effect curves") },
  { src: "/about/piru/session-notes.avif", alt: msg("A Piru session with its summary and timestamped trip notes") },
  { src: "/about/piru/substance-mdma.avif", alt: msg("A Piru substance page crediting dose.wiki for dose and duration") },
] as const;

const FEATURES = [
  {
    icon: "lucide:wifi-off",
    title: msg("Works offline"),
    body: msg("The substance library ships inside the app, so the reference is there without a signal."),
  },
  {
    icon: "lucide:notebook-pen",
    title: msg("Dose logging"),
    body: msg("Doses, routes, and times on a daily timeline, with effect curves estimated from duration data."),
  },
  {
    icon: "lucide:scroll-text",
    title: msg("Trip reports"),
    body: msg("Check-ins record mood, intensity, and effects during a session, and a session exports as a report."),
  },
  {
    icon: "lucide:lock",
    title: msg("Stored on your device"),
    body: msg("No account, ads, or analytics. Imports journals exported from the PsychonautWiki app."),
  },
] as const;

/**
 * "Unofficial mobile app" section body (dose.wiki only): the Piru app card.
 *
 * Piru is an independent iPhone app that reads the dose.wiki dataset. The card names that
 * independence outright, because a reader on dose.wiki's own About page would otherwise
 * take an app card for a first-party product.
 */
export function AboutPiruSection() {
  return (
    <ContentCard padding="lg" className="flex flex-col gap-6">
      <div className="flex items-center gap-4 sm:gap-5">
        <AppImage
          src="/about/piru/icon.avif"
          alt=""
          width={72}
          height={72}
          unoptimized
          className="h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px]"
        />
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="theme-text-primary font-display text-2xl font-bold tracking-tight">Piru</h3>
          <p className="theme-text-faint text-sm font-medium sm:text-base">
            {t("An iPhone app for logging doses and writing trip reports, using dose.wiki's data")}
          </p>
        </div>
      </div>

      <div className="theme-text-secondary max-w-[65ch] space-y-3 text-[0.95rem] leading-7">
        <p>
          {t(
            "Piru is a dose journal for iPhone. It records what was taken, when, and how much, with notes on what was noticed, and works with or without a connection.",
          )}
        </p>
        <p>
          {t(
            "Its offline library reads dose.wiki as one of its sources, and each field shows which source it came from. The screenshots below are its dose.wiki skin, in the site's own plum and fuchsia.",
          )}
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {FEATURES.map((feature) => (
          <li key={feature.icon}>
            <NestedContentCard padding="md" className="flex h-full gap-3">
              <Icon icon={feature.icon} size={18} className="theme-icon-accent mt-0.5 shrink-0" />
              <span className="flex flex-col gap-1">
                <span className="theme-text-primary text-sm font-semibold">{t(feature.title)}</span>
                <span className="theme-text-faint text-sm leading-6">{t(feature.body)}</span>
              </span>
            </NestedContentCard>
          </li>
        ))}
      </ul>

      <ul className="mx-auto grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-5">
        {SCREENSHOTS.map((shot) => (
          <li key={shot.src}>
            <AppImage
              src={shot.src}
              alt={t(shot.alt)}
              width={SCREENSHOT_WIDTH}
              height={SCREENSHOT_HEIGHT}
              unoptimized
              className="h-auto w-full rounded-[1.1rem] border border-dose-border shadow-[var(--theme-elevation-control-primary)] sm:rounded-[1.6rem]"
            />
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="accent" size="pill" className="rounded-full">
          <a href={PIRU_SITE_HREF} target="_blank" rel="noopener noreferrer">
            {t("Visit Piru")}
            <Icon icon="lucide:arrow-up-right" size={16} />
          </a>
        </Button>
        <Button asChild variant="glass" size="pill">
          <a href={PIRU_TESTFLIGHT_HREF} target="_blank" rel="noopener noreferrer">
            <Icon icon="lucide:download" size={16} />
            {t("Download for free")}
          </a>
        </Button>
        <span className="theme-text-faint text-sm">{t("Coming soon to the App Store")}</span>
      </div>

      <p className="theme-text-faint text-sm leading-6">
        {t("Piru is made by")}{" "}
        <AuthorLink author={AUTHORS.kageroumado} /> {t("and")} <AuthorLink author={AUTHORS.pharmacykitty} />
        {t(", independently of the dose.wiki team, from its CC0 dataset.")}
      </p>
    </ContentCard>
  );
}
