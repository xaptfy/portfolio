"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
type Lang = "ru" | "en";

export type CaseSection = {
  title: string;
  text: string;
};

export type CaseImageVariant = "regular" | "wide";

export type CaseImageEntry =
  | string
  | {
      src: string;
      variant?: CaseImageVariant;
    };

export type CaseLayout = "default" | "vertical";

export type CaseStudy = {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    sections: CaseSection[];
    images: CaseImageEntry[];
    layout?: CaseLayout;
};

const CASE_IMAGES = {
  otr: [
    { src: "/cases/otr/1.png", variant: "regular" },
    { src: "/cases/otr/2.png", variant: "regular" },
    { src: "/cases/otr/3.png", variant: "regular" },
    { src: "/cases/otr/4.png", variant: "regular" },
    { src: "/cases/otr/5.png", variant: "regular" },
    { src: "/cases/otr/6.png", variant: "regular" },
    { src: "/cases/otr/7.png", variant: "regular" },
    { src: "/cases/otr/8.png", variant: "regular" },
    { src: "/cases/otr/9.png", variant: "regular" },
    { src: "/cases/otr/10.png", variant: "regular" },
  ] satisfies CaseImageEntry[],

  pragmaticaVk: [
    "/cases/pragmatica-vk/1.png",
    "/cases/pragmatica-vk/2.png",
    "/cases/pragmatica-vk/3.png",
    "/cases/pragmatica-vk/4.png",
    "/cases/pragmatica-vk/5.png",
    "/cases/pragmatica-vk/6.png",
    "/cases/pragmatica-vk/7.png",
  ] satisfies CaseImageEntry[],

  ozonTech: [
    { src: "/cases/ozon-tech/1.png", variant: "regular" },
    { src: "/cases/ozon-tech/2.png", variant: "regular" },
    { src: "/cases/ozon-tech/3.png", variant: "wide" },
    { src: "/cases/ozon-tech/4.png", variant: "regular" },
    { src: "/cases/ozon-tech/5.png", variant: "regular" },
    { src: "/cases/ozon-tech/6.png", variant: "regular" },
    { src: "/cases/ozon-tech/7.png", variant: "regular" },
    { src: "/cases/ozon-tech/8.png", variant: "regular" },
    { src: "/cases/ozon-tech/9.png", variant: "regular" },
  ] satisfies CaseImageEntry[],
};


export const CASES_EN: Record<string, CaseStudy> = {
  "otr": {
    slug: "otr",
    title: "Banking case",
    description:
      "Designed an OTP flow for confirming a critical operation in a mobile fintech product.",
    tags: ["2026", "Fintech", "B2C"],
    sections: [
      {
        title: "— Context",
        text:
          "OTP appears at the end of a sensitive flow where a mistake can lead to financial or user risks. I approached the solution not as a single input screen, but as a system of states: code entry, SMS waiting, resend, errors, limits and blocking.",
      },
      {
        title: "— Solution",
        text:
          "Designed the main 6-digit code input screen, autofill, paste support, resend timer, invalid and expired code states, attempt limits and suspicious activity blocking. Also covered the case when the SMS does not arrive: clear status, resend logic, phone number check and calm hints.",
      },
      {
        title: "— UX logic",
        text:
          "The input flow is fast and predictable: autofocus, 6 separate cells, paste support and clear system states. At every step, the user understands what is happening, why an action is unavailable and what they can do next.",
      },
      {
        title: "— Result",
        text:
          "The result is a resilient confirmation flow: users can complete the operation faster, while the product keeps risk under control and edge states do not become dead ends. The solution can be measured through completion rate, input errors, resend requests and support tickets related to missing SMS codes.",
      },
    ],
    images: CASE_IMAGES.otr,
  },

  "pragmatica-vk": {
    slug: "pragmatica-vk",
    title: "Pragmatica × VK",
    description:
      "Took part in the Pragmatica × VK design camp: worked on two product cases in sprint format — from concept and presentation to iterations based on mentor feedback.",
    tags: ["2026", "Camp", "B2C"],
    sections: [
      {
        title: "— VK Pets",
        text:
          "Redesigned 4 key screens of the VK Pets section: reworked the structure, visual language and user scenarios to make the service feel more consistent within the VK ecosystem.",
      },
      {
        title: "— Music Player Through Eras",
        text:
          "Designed a mini app that brings the aesthetics of vinyl, cassette players and iPod Classic into a modern interface. The concept preserves the emotional feel of retro devices while using familiar contemporary UI patterns.",
      },
    ],
    images: CASE_IMAGES.pragmaticaVk,
  },

  "ozon-tech": {
    slug: "ozon-tech",
    title: "Ozon Tech",
    description:
      "Worked as a product designer in the Checkout team: designed order placement flows, geoservices and adjacent product scenarios. Contributed to large visual updates, improved user flows and supported solutions through development.",
    tags: ["2025", "E-commerce", "B2C", "Checkout", "Geo"],
    sections: [
      {
        title: "— Ozon Select",
        text:
          "Adapted around 1,000 checkout and geoservices screens to a new visual system. Updated tokens, forms and components, checked interface consistency and supported implementation during development.",
      },
      {
        title: "— Tips for pickup point staff",
        text:
          "Worked on the tipping mechanic for pickup point staff inside the user journey. Defined entry points, states, limitations and integration logic within the checkout flow.",
      },
      {
        title: "— Pickup points on the map",
        text:
          "Contributed to improving the pickup point selection scenario on the map. Worked on list readability, geodata logic and navigation between the map and pickup point cards.",
      },
    ],
    images: CASE_IMAGES.ozonTech, 
  },

  "vtb": {
    slug: "vtb",
    title: "VTB",
    description: "Designed a family finance concept for a banking product.",
    tags: ["2025", "B2C", "Fintech"],
    sections: [
      {
        title: "— Concept",
        text: "Worked on family account scenarios, shared goals, child profile and cashback category selection inside a banking app.",
      },
    ],
    images: [
      { src: "/cases/vtb/1.png", variant: "regular" },
      { src: "/cases/vtb/2.png", variant: "regular" },
      { src: "/cases/vtb/3.png", variant: "regular" },
      { src: "/cases/vtb/4.png", variant: "regular" },
    ],
  },

  "crypto": {
    slug: "crypto",
    title: "Crypto Broker",
    description: "Designed key flows for buying, exchanging and storing digital assets inside a banking ecosystem.",
    tags: ["2025", "B2C", "Fintech"],
    sections: [
      {
        title: "— Product logic",
        text: "Worked on onboarding, first purchase, exchange flow, operation details and risk communication for both beginners and experienced users.",
      },
    ],
    images: [
      { src: "/cases/crypto/1.png", variant: "regular" },
      { src: "/cases/crypto/2.png", variant: "regular" },
      { src: "/cases/crypto/3.png", variant: "regular" },
    ],
  },

  "tender": {
    slug: "tender",
    title: "Tenders",
    description: "Designed a B2B service for working with public procurement tenders.",
    tags: ["2023","B2B"],
    sections: [
      {
        title: "— Service structure",
        text: "Designed the core product logic: tender catalog, filters, tender card, statuses, personal account and key work scenarios.",
      },
    ],
    images: [
      { src: "/cases/tender/1.png", variant: "wide" },
      { src: "/cases/tender/2.png", variant: "wide" },
      { src: "/cases/tender/3.png", variant: "wide" },
    ],
  },

  "seamm": {
    slug: "seamm",
    title: "Seamm",
    description: "Designed a Product Details screen for a digital fashion startup.",
    tags: ["2024", "B2C", "E-commerce", "Gambling", "Geo"],
    sections: [
      {
        title: "— Product details",
        text: "Reworked the screen structure, highlighted key actions and made AR try-on, transfer to games and digital asset management easier to access.",
      },
    ],
    images: [
      { src: "/cases/seamm/1.png", variant: "regular" },
      { src: "/cases/seamm/2.png", variant: "regular" },
      { src: "/cases/seamm/3.png", variant: "regular" },
      { src: "/cases/seamm/4.png", variant: "regular" },
      { src: "/cases/seamm/5.png", variant: "regular" },
      { src: "/cases/seamm/6.png", variant: "regular" },
      { src: "/cases/seamm/7.png", variant: "regular" },
      { src: "/cases/seamm/8.png", variant: "regular" },
    ],
  },

  "itmo": {
    slug: "itmo",
    title: "ITMO",
    layout: "vertical",
    description: "Led a design team working on the redesign of ITMO’s continuing education website.",
    tags: ["2024", "B2C", "Education"],
    sections: [
      {
        title: "— Design leadership",
        text: "Coordinated the design team, worked with stakeholders and developers, clarified requirements and helped shape product decisions.",
      },
    ],
    images: [
      { src: "/cases/itmo/1.png", variant: "wide" },
      { src: "/cases/itmo/2.png", variant: "wide" },
      { src: "/cases/itmo/3.png", variant: "wide" },
    ],
  },

  "vk": {
    slug: "vk",
    title: "Mail.ru",
    description: "Worked on a redesigned Mail.ru email experience.",
    tags: ["2024", "B2C"],
    sections: [
      {
        title: "— Redesign",
        text: "Analyzed the current user journey and redesigned key screens to simplify login, navigation and access to core actions.",
      },
    ],
    images: [
      { src: "/cases/vk/1.png", variant: "regular" },
      { src: "/cases/vk/2.png", variant: "regular" },
      { src: "/cases/vk/3.png", variant: "regular" },
      { src: "/cases/vk/4.png", variant: "regular" },
      { src: "/cases/vk/5.png", variant: "regular" },
    ],
  },

  "casino": {
    slug: "casino",
    title: "Casino NDA",
    description: "Designed onboarding and first-game scenarios for an online gaming product.",
    tags: ["2023", "B2C", "NDA", "Onbording", "Profile"],
    sections: [
      {
        title: "— First user experience",
        text: "Simplified onboarding, reduced friction before the first session and reworked the first deposit scenario.",
      },
    ],
    images: [
      { src: "/cases/casino/1.png", variant: "wide" },
    ],
  },
};

export const CASES_RU: Record<string, CaseStudy> = {
  ...CASES_EN,
};




function normalizedCaseImage(entry: CaseImageEntry): { src: string; variant: CaseImageVariant } {
  if (typeof entry === "string") {
    return { src: entry, variant: "regular" };
  }
  return { src: entry.src, variant: entry.variant ?? "regular" };
}

const DOT_GRID = {
  backgroundColor: "#0F0F0F",
  backgroundImage: "radial-gradient(circle, rgba(217,217,217,0.1) 2px, transparent 2px)",
  backgroundSize: "36px 36px",
} as const;

function CornerMarks() {
  const base =
    "pointer-events-none absolute z-[6] box-border size-[20px] border-[3px] border-solid border-[rgba(255,255,255,0.5)]";

  return (
    <>
      <div className={`${base} left-[40px] top-[40px] border-r-0 border-b-0`} aria-hidden />
      <div className={`${base} right-[40px] top-[40px] border-l-0 border-b-0`} aria-hidden />
    </>
  );
}

function CollapsibleWhatIDidCard({
  sections,
  lang,
}: {
  sections: CaseSection[];
  lang: Lang;
}) {
    const [open, setOpen] = useState(false);

  return (
    <div
  className="flex w-full min-h-0 shrink flex-col"
  style={{
    maxWidth: 428,
    gap: 16,
    borderRadius: 36,
    background: "#FFFFFF",
    padding: 28,
    maxHeight: "100%",
  }}

    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        aria-expanded={open}
        style={{ padding: 0, border: "none", background: "transparent" }}
        onClick={() => setOpen((p) => !p)}
      >
        <span
          className="font-medium text-[#0F0F0F]"
          style={{ fontSize: 24, lineHeight: "130%", fontWeight: 500 }}
        >
          {lang === "ru" ? "Что сделала?" : "What I did"}
        </span>
        <span className="text-xl font-medium leading-none text-[#0F0F0F]" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
          key="sections"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="min-h-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{
            maxHeight: "calc(100vh - 400px)",
            paddingBottom: 56,
          }}
        >
            <div style={{ gap: 24 }} className="flex flex-col pb-px pt-px">
              {sections.map((s, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <p className="font-medium text-[#0F0F0F]" style={{ fontSize: 20, lineHeight: "130%" }}>
                    {s.title}
                  </p>
                  <p className="font-medium" style={{ fontSize: 18, lineHeight: "130%", color: "rgba(14, 14, 14, 0.5)", fontWeight: 400, }}>
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const savedLang = sessionStorage.getItem("homeLang");

    if (savedLang === "ru" || savedLang === "en") {
      setLang(savedLang);
    } else {
      sessionStorage.setItem("homeLang", "en");
    }
  }, []);

  const data = useMemo(() => {
    const source = lang === "ru" ? CASES_RU : CASES_EN;
    return source[slug] ?? CASES_EN[slug] ?? CASES_RU[slug];
  }, [slug, lang]);

  if (!data) {
  notFound();
  }

  const isVerticalCase = slug === "itmo" || data.layout === "vertical";

  return (
    <main
      className="isolate box-border flex min-h-screen w-full flex-col items-start justify-start overflow-x-hidden px-4 py-8 lg:w-screen lg:max-w-none lg:justify-start lg:p-2 lg:overflow-hidden"
      style={DOT_GRID}
    >
      <div
        className="flex w-full max-w-full min-w-0 flex-col gap-1 lg:h-[calc(100vh-16px)] lg:min-h-0 lg:w-full lg:flex-row lg:items-start lg:gap-1 lg:overflow-hidden"
      >
        <section
          className="relative flex w-full max-w-[444px] shrink-0 flex-col self-center lg:h-full lg:min-h-0 lg:w-[444px] lg:flex-[0_0_444px] lg:basis-[444px] lg:justify-between lg:self-start"
          style={{ borderRadius: 44, padding: 4 }}
        >
          <div
  className="relative flex min-h-0 shrink-0 flex-col justify-between overflow-hidden lg:h-full"
style={{
    width: "100%",
    maxWidth: 436,
    minHeight: 792,
    flex: "1 1 auto",
    borderRadius: 40,
    background: "rgba(255,255,255,0.1)",
    padding: "28px 4px 4px",
  }}
>
            <Link
              href="/"
              aria-label={lang === "ru" ? "Вернуться на главную" : "Back to home"}
              className="absolute inset-x-0 top-0 z-[5] h-[120px] rounded-[40px] rounded-b-none bg-transparent [-webkit-tap-highlight-color:transparent] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
            />
            <CornerMarks />

            <div className="relative z-[2] flex flex-col items-center gap-4 pt-10 pb-6">
              <h1 className="w-full px-4 text-center font-medium text-white" style={{ fontSize: 40, lineHeight: "110%" }}>
                {data.title}
              </h1>
              <p className="w-full px-4 text-center" style={{ fontSize: 16, lineHeight: "110%", color: "rgba(255,255,255,0.8)" }}>
                {data.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 px-2">
              {data.tags.map((t: string) => (
                  <span
                    key={t}
                    className="rounded-[100px] font-normal text-white"
                    style={{
                      padding: "8px 16px",
                      background: "rgba(255,255,255,0.1)",
                      fontSize: 14,
                      lineHeight: "110%",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-[2] flex w-full flex-col items-center px-px pb-[2px]">
            <CollapsibleWhatIDidCard sections={data.sections} lang={lang} />
            </div>
          </div>
        </section>

        <section className="flex w-full min-w-0 flex-col overflow-hidden lg:h-full lg:min-h-0 lg:flex-1">
  <div
    role="region"
    aria-label="Screenshots"
    className={
      isVerticalCase
        ? "flex h-full min-h-0 w-full min-w-0 flex-col items-stretch gap-4 overflow-y-auto overflow-x-hidden pb-2 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        : "flex h-[94dvh] min-h-[546px] w-full min-w-0 snap-x snap-mandatory flex-row flex-nowrap items-end justify-start gap-2 overflow-x-auto overflow-y-hidden px-0 pb-2 pt-4 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] touch-pan-x [&::-webkit-scrollbar]:hidden lg:h-full lg:min-h-0 lg:pt-11"
    }
  >
            {data.images.map((raw: CaseImageEntry, idx: number) => {
              const { src, variant } = normalizedCaseImage(raw);
              const isWide = variant === "wide";

              return (
                <figure
                  key={`${slug}-${idx}-${src}`}
                  className={
                    isWide
                      ? isVerticalCase
                        ? "m-0 flex w-full shrink-0 overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                        : "m-0 flex h-full w-auto shrink-0 snap-center overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                      : isVerticalCase
                        ? "m-0 w-full shrink-0 overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                        : "m-0 flex h-full w-auto shrink-0 snap-center overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${data.title} — скриншот ${idx + 1}`}
                    width={isWide ? 1640 : 344}
                    height={isWide ? 720 : 748}
                    className={
                      isWide
                        ? isVerticalCase
                          ? "m-0 h-auto w-full rounded-none bg-transparent object-contain"
                          : "m-0 h-full w-auto max-w-none rounded-[40px] bg-transparent object-contain"
                        : isVerticalCase
                          ? "h-auto w-full rounded-[40px] object-cover"
                          : "h-full w-auto max-w-none rounded-[40px] object-contain"
                    }
                    loading={idx === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                </figure>
              );
            })}
          </div>
        </section>
      </div>
      <div
  className="fixed bottom-8 right-8 z-[80] flex items-center gap-3"
>
  <motion.button
    type="button"
    aria-label={lang === "ru" ? "Switch to English" : "Переключить на русский"}
    className="pointer-events-auto flex items-center justify-center rounded-full text-white"
    style={{
      width: 52,
      height: 52,
      background: "rgba(217,217,217,0.1)",
      borderRadius: 100,
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "100%",
    }}
    onClick={() => {
      setLang((current) => {
        const nextLang = current === "ru" ? "en" : "ru";
        sessionStorage.setItem("homeLang", nextLang);
        return nextLang;
      });
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {lang === "ru" ? "EN" : "RU"}
  </motion.button>
</div>
    </main>
  );
}
