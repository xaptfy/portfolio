"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Briefcase, Globe, GraduationCap, Menu, Send } from "lucide-react";
import { useState } from "react";

type CollectionYear = "2023" | "2024" | "2025" | "2026";

const ease = [0.22, 1, 0.36, 1] as const;

const COLLECTIONS: {
  year: CollectionYear;
  tint: string;
  rim: string;
  glow: string;
}[] = [
  { year: "2025", tint: "from-amber-400/[0.12]", rim: "via-amber-200/45", glow: "bg-amber-500/22" },
  { year: "2026", tint: "from-emerald-400/[0.12]", rim: "via-emerald-300/40", glow: "bg-emerald-500/20" },
  { year: "2024", tint: "from-sky-400/[0.12]", rim: "via-sky-300/40", glow: "bg-sky-500/20" },
  { year: "2023", tint: "from-violet-400/[0.14]", rim: "via-violet-300/45", glow: "bg-violet-500/25" },
];

const PREVIEW_TILES = 6;

const PORTRAIT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80";

function PlaceholderLogo({ className }: { className?: string }) {
  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 ring-1 ring-black/[0.06] ${className ?? ""}`}
    >
      <div className="size-4 rounded-full bg-white/80" />
    </div>
  );
}

function ProjectTile({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay, ease }}
      className="relative aspect-[5/4] overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/[0.12] shadow-inner"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.18] via-transparent to-black/30" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-12 rounded-md bg-white/[0.08] ring-1 ring-white/10" />
      </div>
    </motion.div>
  );
}

function PhonePeek({
  i,
  lift,
  spread,
}: {
  i: number;
  lift: number;
  spread: number;
}) {
  const rot = (i - 1) * 6;
  const x = (i - 1) * spread;
  return (
    <motion.div
      className="relative h-[92px] w-[52px] shrink-0 rounded-[18px] bg-gradient-to-b from-white/[0.22] to-white/[0.04] p-[3px] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/25"
      animate={{ y: -lift, x, rotate: rot }}
      transition={{ duration: 0.42, ease }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[15px] bg-neutral-950/90">
        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/50" />
        <div className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-black/60" />
        <div className="absolute inset-3 rounded-lg bg-gradient-to-br from-neutral-600/40 to-neutral-900" />
      </div>
    </motion.div>
  );
}

function FloatingFolder({
  year,
  tint,
  rim,
  glow,
  isOpen,
  isHovered,
  onSelect,
}: {
  year: CollectionYear;
  tint: string;
  rim: string;
  glow: string;
  isOpen: boolean;
  isHovered: boolean;
  onSelect: () => void;
}) {
  const t = isOpen ? 1 : isHovered ? 0.55 : 0;
  const lift = isOpen ? 22 : isHovered ? 14 : 6;
  const spread = isOpen ? 10 : isHovered ? 7 : 4;
  const lidRotate = 12 + t * 26;
  const scale = isHovered && !isOpen ? 1.045 : isOpen ? 1.02 : 1;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      className="group relative block w-[min(280px,78vw)] cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060607]"
      animate={{ scale, zIndex: isOpen ? 40 : 1 }}
      transition={{ duration: 0.4, ease }}
      whileTap={{ scale: Math.min(scale, 1) * 0.98 }}
    >
      <div
        className={`pointer-events-none absolute -inset-10 -z-10 rounded-[40%] blur-3xl transition-opacity duration-500 ${glow} opacity-40 group-hover:opacity-70 ${isOpen ? "opacity-80" : ""}`}
      />

      <div className="relative [perspective:1100px]" style={{ transformStyle: "preserve-3d" }}>
          {/* Lid */}
          <motion.div
            className="pointer-events-none absolute left-[7%] right-[7%] top-0 z-30 h-[38%] rounded-t-[1.35rem] border border-white/[0.14] bg-gradient-to-b from-white/[0.22] via-white/[0.06] to-white/[0.02] shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9)]"
            style={{ transformOrigin: "50% 100%" }}
            animate={{
              rotateX: -lidRotate,
              y: -t * 4,
              scaleX: 1 - t * 0.02,
            }}
            transition={{ duration: 0.45, ease }}
          />

          {/* Phone / project previews peeking */}
          <div className="pointer-events-none absolute left-1/2 top-[6px] z-20 flex -translate-x-1/2 items-end gap-2">
            {[0, 1, 2].map((i) => (
              <PhonePeek key={i} i={i} lift={lift} spread={spread} />
            ))}
          </div>

          {/* Trapezoid body */}
          <div
            className="relative z-10 mt-[52px] overflow-hidden rounded-b-[1.75rem] border border-white/[0.12] bg-white/[0.04] pt-[58px] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
            style={{
              clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)",
            }}
          >
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${tint} via-transparent to-black/55`}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
            <div
              className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${rim} to-transparent opacity-80`}
            />

            <div className="relative px-6 pb-6 pt-2 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                Case Collection
              </p>
              <p className="mt-1.5 text-2xl font-semibold tracking-[-0.04em] text-white/95">
                {year}
              </p>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="open"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="relative overflow-hidden border-t border-white/[0.08]"
                >
                  <div className="relative bg-black/25 px-4 pb-5 pt-4 backdrop-blur-xl">
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: PREVIEW_TILES }).map((_, i) => (
                        <ProjectTile key={i} delay={0.05 * i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Floor gloss */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
    </motion.button>
  );
}

export default function Home() {
  const [openYear, setOpenYear] = useState<CollectionYear | null>(null);
  const [hoverYear, setHoverYear] = useState<CollectionYear | null>(null);

  const layoutFor = (year: CollectionYear) => {
    switch (year) {
      case "2025":
        return "lg:absolute lg:left-[4%] lg:top-[40%] lg:-translate-y-1/2";
      case "2026":
        return "lg:absolute lg:right-[3%] lg:top-[10%]";
      case "2024":
        return "lg:absolute lg:left-[34%] lg:bottom-[12%]";
      case "2023":
        return "lg:absolute lg:right-[5%] lg:bottom-[8%]";
      default:
        return "";
    }
  };

  return (
    <main
      className="relative min-h-[100dvh] overflow-x-hidden bg-[#060607] font-sans text-white selection:bg-white/20"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "30px 30px",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.025] via-transparent to-black/40" />
      <div className="pointer-events-none absolute -left-48 top-1/3 size-[560px] rounded-full bg-indigo-600/[0.06] blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/2 size-[420px] translate-x-1/3 rounded-full bg-cyan-500/[0.05] blur-[120px]" />

      {/* Top-right social */}
      <div className="pointer-events-auto fixed right-5 top-5 z-50 flex gap-2.5 md:right-8 md:top-8">
        {[
          { Icon: Globe, href: "#", label: "LinkedIn" },
          { Icon: AtSign, href: "#", label: "Instagram" },
          { Icon: Send, href: "#", label: "Telegram" },
        ].map(({ Icon, href, label }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            className="flex size-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.07] text-white/85 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md transition-colors hover:bg-white/[0.12]"
            whileHover={{ scale: 1.06, y: -1 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icon className="size-[18px]" strokeWidth={1.75} />
          </motion.a>
        ))}
      </div>

      {/* Bottom-right menu */}
      <motion.button
        type="button"
        aria-label="Меню"
        className="pointer-events-auto fixed bottom-6 right-5 z-50 flex size-14 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.08] text-white shadow-[0_16px_50px_-24px_rgba(0,0,0,0.85)] backdrop-blur-md md:bottom-10 md:right-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="size-6" strokeWidth={1.5} />
      </motion.button>

      <div className="relative z-10 flex min-h-[100dvh] flex-col pt-20 lg:flex-row lg:pt-0">
        {/* Left sidebar — narrow stack */}
        <aside className="relative z-20 mx-auto flex w-full max-w-[280px] shrink-0 flex-col gap-4 px-5 pb-8 lg:mx-0 lg:max-w-[300px] lg:px-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden rounded-[1.35rem] bg-white p-1.5 shadow-[0_28px_90px_-50px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[1.15rem] bg-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PORTRAIT_PLACEHOLDER}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/[0.06]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease }}
            className="rounded-[1.25rem] bg-white px-5 py-5 text-neutral-900 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.65)] ring-1 ring-black/[0.04]"
          >
            <h1 className="text-xl font-semibold tracking-[-0.03em]">Арина Быковская</h1>
            <p className="mt-1 text-xs font-medium text-neutral-500">Product Designer</p>
            <div className="mt-4 flex items-baseline justify-between gap-2 border-t border-neutral-100 pt-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Опыт
              </span>
              <span className="text-base font-semibold tracking-tight text-neutral-900">
                3 года / 8 месяцев
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="rounded-[1.25rem] bg-white px-5 py-5 text-neutral-900 shadow-[0_20px_70px_-45px_rgba(0,0,0,0.65)] ring-1 ring-black/[0.04]"
          >
            <div className="mb-5">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-100">
                  <Briefcase className="size-4 text-neutral-600" strokeWidth={1.75} />
                </span>
                <h2 className="text-xs font-semibold tracking-tight">Работала тут</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <PlaceholderLogo />
                <PlaceholderLogo />
                <PlaceholderLogo />
                <PlaceholderLogo />
              </div>
            </div>
            <div className="border-t border-neutral-100 pt-5">
              <div className="mb-2.5 flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-neutral-100">
                  <GraduationCap className="size-4 text-neutral-600" strokeWidth={1.75} />
                </span>
                <h2 className="text-xs font-semibold tracking-tight">Училась тут</h2>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <PlaceholderLogo />
                <PlaceholderLogo />
                <PlaceholderLogo />
              </div>
            </div>
          </motion.div>
        </aside>

        {/* Canvas — freeform folders */}
        <section className="relative flex-1 overflow-visible lg:min-h-[100dvh]">
          <div className="relative mx-auto min-h-[520px] w-full max-w-[1100px] overflow-visible px-4 pb-28 pt-6 lg:mx-0 lg:max-w-none lg:min-h-[calc(100dvh-2rem)] lg:px-10 lg:pb-24 lg:pt-12">
            <div className="flex flex-col items-center gap-14 overflow-visible lg:block lg:min-h-[calc(100dvh-8rem)]">
              {COLLECTIONS.map((c, index) => (
                <motion.div
                  key={c.year}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.08 + index * 0.05, ease }}
                  className={`relative ${layoutFor(c.year)}`}
                  onHoverStart={() => setHoverYear(c.year)}
                  onHoverEnd={() => setHoverYear((h) => (h === c.year ? null : h))}
                >
                  <FloatingFolder
                    year={c.year}
                    tint={c.tint}
                    rim={c.rim}
                    glow={c.glow}
                    isOpen={openYear === c.year}
                    isHovered={hoverYear === c.year && openYear !== c.year}
                    onSelect={() =>
                      setOpenYear((prev) => (prev === c.year ? null : c.year))
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
