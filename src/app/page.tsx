"use client";

import { motion } from "framer-motion";
import { FolderOpen, List } from "lucide-react";
import { useEffect, useState } from "react";


type HomeViewMode = "folders" | "desktop";
type CollectionYear = "2023" | "2024" | "2025" | "2026";
type Lang = "ru" | "en";

const ease = [0.22, 1, 0.36, 1] as const;

const CANVAS_GRID = {
  backgroundColor: "#0F0F0F",
  backgroundImage:
    "radial-gradient(circle, rgba(217,217,217,0.1) 2px, transparent 2px)",
  backgroundSize: "36px 36px",
} as const;

const T = {
  ru: {
    name: "Арина Быковская",
    role: "Product Designer",
    description: "Проектирую сложные B2B/B2C продукты: упрощаю сценарии и помогаю интерфейсам работать на метрики",
    worked: "Работала тут",
    studied: "Училась тут",
    caseCollection: "Case Collection",
    showDesktop: "Показать рабочий стол",
    showFolders: "Показать папки",
    switchLang: "Switch to English",
  },
  en: {
    name: "Arina Bykovskaya",
    role: "Product Designer",
    description: "I design complex B2B/B2C products: simplify user flows and help interfaces work for metrics",
    worked: "Worked here",
    studied: "Studied here",
    caseCollection: "Case Collection",
    showDesktop: "Show desktop",
    showFolders: "Show folders",
    switchLang: "Переключить на русский",
  },
} as const;

const PREVIEW_ASSETS: Record<CollectionYear, string[]> = {
  "2023": ["/case-previews/2023/1.png", "/case-previews/2023/2.png"],
  "2024": ["/case-previews/2024/1.png", "/case-previews/2024/2.png", "/case-previews/2024/3.png"],
  "2025": ["/case-previews/2025/1.png", "/case-previews/2025/2.png", "/case-previews/2025/3.png"],
  "2026": ["/case-previews/2026/1.png", "/case-previews/2026/2.png", "/case-previews/2026/3.png"],
};

const PREVIEW_LINKS: Record<CollectionYear, string[]> = {
  "2023": ["/cases/casino", "/cases/tender"],
  "2024": ["/cases/seamm", "/cases/itmo", "/cases/vk"],
  "2025": ["/cases/crypto", "/cases/ozon-tech", "/cases/vtb"],
  "2026": ["/cases/otr", "/cases/pragmatica-vk", "/cases/petrix"],
};

const DESKTOP_CASES: Record<
  CollectionYear,
  {
    title: {
      ru: string;
      en: string;
    };
    href: string;
    color: string;
  }[]
> = {
  "2026": [
    {
      title: {
        ru: "Pragmatica x VK",
        en: "Pragmatica x VK",
      },
      href: "/cases/pragmatica-vk",
      color: "#FFFFFF",
    },
  ],
  "2025": [
    {
      title: {
        ru: "Ozon Tech",
        en: "Ozon Tech",
      },
      href: "/cases/ozon-tech",
      color: "#005BFE",
    },
    {
      title: {
        ru: "Криптоброкер",
        en: "Crypto Broker",
      },
      href: "/cases/crypto",
      color: "#7AEB86",
    },
    {
      title: {
        ru: "ВТБ",
        en: "VTB",
      },
      href: "/cases/vtb",
      color: "#0066FF",
    },
    {
      title: {
        ru: "Тендеры",
        en: "Tenders",
      },
      href: "/cases/tender",
      color: "#C8D0FF",
    },
  ],
  "2024": [
    {
      title: {
        ru: "Seamm",
        en: "Seamm",
      },
      href: "/cases/seamm",
      color: "#29E1BB",
    },
    {
      title: {
        ru: "ITMO",
        en: "ITMO",
      },
      href: "/cases/itmo",
      color: "#D7FF25",
    },
    {
      title: {
        ru: "Mail.ru",
        en: "Mail.ru",
      },
      href: "/cases/vk",
      color: "#6197FF",
    },
  ],
  "2023": [
    {
      title: {
        ru: "Казино NDA",
        en: "Casino NDA",
      },
      href: "/cases/casino",
      color: "#99A5FC",
    },
  ],
};

const SOCIAL_LINKS = [
  {
    icon: "/icons/telegram.svg",
    label: "Telegram",
    href: "https://t.me/xaptfy",
    external: true,
    size: 24,
  },
  {
    icon: "/icons/linkedin.svg",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/xaptfy",
    external: true,
    size: 28,
  },
  {
    icon: "/icons/dribbble.svg",
    label: "Dribbble",
    href: "https://dribbble.com/xaptfy",
    external: true,
    size: 28,
  },
  {
    icon: "/icons/document.svg",
    label: "Document",
    href: "https://drive.google.com/file/d/12oNKvnTw5xf8VSCUt2XJgqWb7fA-HVhb/view?usp=sharing",
    external: false,
    size: 28,
  },
] as const;

function useSidebarScale(maxHeight: number) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      setScale(vh < maxHeight ? vh / maxHeight : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [maxHeight]);
  return scale;
}

function useViewportWidth() {
  const [vw, setVw] = useState(1440);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return vw;
}

function LogoCell60({ src, label }: { src: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex size-[60px] shrink-0 items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="max-h-[60px] max-w-[60px] object-contain" loading="lazy" />
      </div>
      <span className="max-w-[100px] text-[12px]" style={{ color: "rgba(15,15,15,0.6)", lineHeight: "110%" }}>
        {label}
      </span>
    </div>
  );
}

function FolderPreviews({
  year,
  lift,
  isHovered,
}: {
  year: CollectionYear;
  lift: number;
  isHovered: boolean;
}) {
  const assets = PREVIEW_ASSETS[year];
  const links = PREVIEW_LINKS[year];
  const previewSize = 1.25;
  const isSingle = assets.length === 1;

  const slots = isSingle
  ? [
      {
        x: 0,
        rotate: 0,
        y: isHovered ? -40 : 42,
        width: isHovered ? 172 : 176,
        scale: isHovered ? 1.18 : 1,
      },
    ]
    : year === "2023"
    ? [
        {
          x: isHovered ? -78 : -34,
          rotate: isHovered ? 0 : -3,
          y: isHovered ? -40 : 44,
          width: isHovered ? 124 : 104,
          scale: isHovered ? 1.12 : 1,
        },
        {
          x: isHovered ? 78 : 34,
          rotate: isHovered ? 0 : 3,
          y: isHovered ? -40 : 44,
          width: isHovered ? 124 : 104,
          scale: isHovered ? 1.12 : 1,
        },
      ]
    : year === "2024"
      ? [
          {
            x: isHovered ? -136 : -42,
            rotate: isHovered ? 0 : -7,
            y: isHovered ? -40 : 46,
            width: isHovered ? 64 : 68,
            scale: isHovered ? 1.18 : 1,
          },
          {
            x: 0,
            rotate: 0,
            y: isHovered ? -40 : 36,
            width: isHovered ? 118 : 108,
            scale: isHovered ? 1.5 : 1,
          },
          {
            x: isHovered ? 136 : 42,
            rotate: isHovered ? 0 : 7,
            y: isHovered ? -40 : 46,
            width: isHovered ? 64 : 68,
            scale: isHovered ? 1.18 : 1,
          },
        ]
      : [
          {
            x: isHovered ? -118 : -42,
            rotate: isHovered ? 0 : -7,
            y: isHovered ? -40 : 46,
            width: isHovered ? 76 : 72,
            scale: isHovered ? 1.18 : 1,
          },
          {
            x: 0,
            rotate: 0,
            y: isHovered ? -40 : 36,
            width: isHovered ? 76 : 72,
            scale: isHovered ? 1.18 : 1,
          },
          {
            x: isHovered ? 118 : 42,
            rotate: isHovered ? 0 : 7,
            y: isHovered ? -40 : 46,
            width: isHovered ? 76 : 72,
            scale: isHovered ? 1.18 : 1,
          },
        ];
            

  return (
    <motion.div
      className="pointer-events-none absolute left-1/2 z-[20] -translate-x-1/2"
      style={{ bottom: FOLDER_BEFORE.h - 64, width: 226, height: 172 }}
      animate={{ y: lift }}
      transition={{ duration: 0.4, ease }}
    >
      {assets.map((src, i) => {
        const slot = slots[i];
        if (!slot) return null;

        return (
        <motion.a
          key={src}
          href={links[i] ?? "#"}
          aria-label={`Open case ${year}-${i + 1}`}
          className="absolute bottom-0 left-1/2"
          style={{
            marginLeft: -(slot.width * previewSize) / 2,
            transformOrigin: "bottom center",
            pointerEvents: isHovered ? "auto" : "none",
          }}
          animate={{
            x: slot.x,
            y: slot.y,
            rotate: slot.rotate,
            scale: slot.scale,
          }}
          transition={{ duration: 0.4, ease }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="block h-auto max-w-none drop-shadow-[0_8px_22px_rgba(0,0,0,0.4)]"
            style={{ width: slot.width * previewSize }}
            draggable={false}
          />
        </motion.a>
        );
      })}
  </motion.div>
  );
}

/** SVG intrinsic dimensions — preserve aspect ratio when sizing */
const FOLDER_BEFORE = { w: 231, h: 138 } as const;
const FOLDER_AFTER = { w: 199, h: 178 } as const;

const FOLDER_POSITIONS: Record<CollectionYear, { left: string; top: string }> = {
  "2025": {
    left: "calc(50% - 233px / 2 - 54.5px)",
    top: "calc(50% - 345px / 2 - 115.5px)",
  },
  "2026": {
    left: "calc(50% - 233px / 2 + 326.5px)",
    top: "calc(50% - 345px / 2 - 199.5px)",
  },
  "2024": {
    left: "calc(50% - 232px / 2 + 107px)",
    top: "calc(50% - 345px / 2 + 191.5px)",
  },
  "2023": {
    left: "calc(50% - 233px / 2 + 434.5px)",
    top: "calc(50% - 327px / 2 + 101.5px)",
  },
};

function DesktopFileIcon({ color }: { color: string }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: 36,
        height: 55,
        filter: "drop-shadow(0px 10px 18px rgba(0, 0, 0, 0.28))",
      }}
    >
      {/* основной файл */}
      <div
        className="absolute inset-0"
        style={{
          background: color,
          borderRadius: "4px 0 4px 4px",
          clipPath: "polygon(0 0, 70% 0, 100% 22%, 100% 100%, 0 100%)",
        }}
      />

      {/* уголок — просто чуть темнее, без дурацкой тени */}
      <div
        className="absolute right-0 top-0"
        style={{
          width: 11,
          height: 13,
          background: "rgba(0, 0, 0, 0.1)",
          clipPath: "polygon(0 0, 100% 100%, 100% 0)",
        }}
      />
    </div>
  );
}

function DesktopCaseView({
  left,
  top,
  language,
  isMobile,
}: {
  left: number;
  top: number;
  language: "ru" | "en";
  isMobile: boolean;
}) {
  
  const years: CollectionYear[] = ["2026", "2025", "2024", "2023"];

  return (
    <motion.div
  className="pointer-events-auto absolute z-[20]"
  style={{
    left,
    top,
    width: 828,
  }}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="flex w-full flex-col" style={{ gap: 40 }}>
        {years.map((year) => (
          <section key={year} className="flex w-full flex-col" style={{ gap: 24 }}>
            <div className="flex w-full flex-col" style={{ gap: 6 }}>
              <div className="flex h-[18px] items-center px-4">
                <p
                  className="font-semibold"
                  style={{
                    fontSize: 16,
                    lineHeight: "110%",
                    color: "#9B9B9A",
                  }}
                >
                  {year}
                </p>
              </div>

              <div
                className="h-px w-full"
                style={{ background: "#444341" }}
              />
            </div>

            <div className="flex flex-wrap items-start" style={{ gap: 14 }}>
              {DESKTOP_CASES[year].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-3 px-2 text-center"
                  style={{
                    width: 95,
                    minHeight: 80,
                    color: "#FFFFFF",
                  }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <DesktopFileIcon color={item.color} />

                  <span
                    className="font-medium"
                    style={{
                      fontSize: 12,
                      lineHeight: "110%",
                      color: "#FFFFFF",
                    }}
                  >
                    {item.title[language]}
                  </span>
                </motion.a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}

function MobileDesktopCaseView({
  language,
}: {
  language: Lang;
}) {
  const years: CollectionYear[] = ["2026", "2025", "2024", "2023"];

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease }}
    >
      <div className="flex w-full flex-col" style={{ gap: 40 }}>
        {years.map((year) => (
          <section key={year} className="flex w-full flex-col" style={{ gap: 20 }}>
            <div className="flex w-full flex-col" style={{ gap: 8 }}>
              <div className="flex h-[18px] items-center px-1">
                <p
                  className="font-semibold"
                  style={{
                    fontSize: 18,
                    lineHeight: "110%",
                    color: "#9B9B9A",
                  }}
                >
                  {year}
                </p>
              </div>

              <div
                className="h-px w-full"
                style={{ background: "#444341" }}
              />
            </div>

            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                rowGap: 28,
                columnGap: 14,
              }}
            >
              {DESKTOP_CASES[year].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center text-center"
                  style={{
                    gap: 10,
                    color: "#FFFFFF",
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <div
  className="flex items-center justify-center"
  style={{
    width: 92,
    height: 112,
  }}
>
  <div style={{ transform: "scale(1.55)", transformOrigin: "center" }}>
    <DesktopFileIcon color={item.color} />
  </div>
</div>

                  <span
                    className="font-medium"
                    style={{
                      fontSize: 14,
                      lineHeight: "115%",
                      color: "#FFFFFF",
                      maxWidth: 120,
                    }}
                  >
                    {item.title[language]}
                  </span>
                </motion.a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
}

function FloatingFolder({
  year,
  isHovered,
}: {
  year: CollectionYear;
  isHovered: boolean;
}) {
  const h = year === "2023" ? 327 : 345;
  const previewLift = 0;
  const scale = isHovered ? 1.02 : 1;

  return (
    <motion.div
      className="absolute left-0 top-0 cursor-default select-none"
      style={{ width: 233, height: h }}
      animate={{ scale, zIndex: isHovered ? 40 : 10 }}
      transition={{ duration: 0.38, ease }}
    >
      <div
        className="relative h-full w-full overflow-visible [perspective:1000px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* 1 — Back folder layer */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[10] -translate-x-1/2"
          style={{
            width: FOLDER_AFTER.w,
            height: FOLDER_AFTER.h,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/folders/after.svg"
            alt=""
            width={FOLDER_AFTER.w}
            height={FOLDER_AFTER.h}
            className="relative z-10 block h-auto w-full max-w-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
            draggable={false}
          />
        </div>

        {/* 2 — Preview SVGs (between back and front) */}
        <FolderPreviews
          year={year}
          lift={previewLift}
          isHovered={isHovered}
        />

        {/* 3 — Front folder layer */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[30] -translate-x-1/2"
          style={{ width: FOLDER_BEFORE.w, height: FOLDER_BEFORE.h }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/folders/before.svg"
            alt=""
            width={FOLDER_BEFORE.w}
            height={FOLDER_BEFORE.h}
            className="relative z-30 block h-auto w-full max-w-none drop-shadow-[0_14px_32px_rgba(0,0,0,0.5)]"
            draggable={false}
          />
        </div>

        {/* 4 — Label on top of front */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 z-[40] flex -translate-x-1/2 translate-y-3 flex-col items-center justify-center gap-0.5 px-3"
          style={{ width: FOLDER_BEFORE.w, height: FOLDER_BEFORE.h }}
        >
          <p
            className="text-center font-semibold leading-[90%]"
            style={{
              color: "#0F0F0F",
              fontSize: 28,
              letterSpacing: "-0.05em",
            }}
          >
            {year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const COLLECTIONS: CollectionYear[] = ["2026", "2025", "2024", "2023"];

export default function Home() {
  const [hoverYear, setHoverYear] = useState<CollectionYear | null>(null);
  const [viewMode, setViewMode] = useState<HomeViewMode>("folders");
  const [lang, setLang] = useState<Lang>("en");
  const t = T[lang];
  useEffect(() => {
    const savedViewMode = sessionStorage.getItem("homeViewMode");
    const savedLang = sessionStorage.getItem("homeLang");
  
    if (savedViewMode === "folders" || savedViewMode === "desktop") {
      setViewMode(savedViewMode);
    }
  
    if (savedLang === "ru" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);
  const sidebarScale = 1;
  const vw = useViewportWidth();
  const isNarrow = vw < 1024;
  const mobileSidebarScale = Math.min(1, Math.max(0.64, (vw - 24) / 383));
  const mobileFolderScale = Math.min(1, Math.max(0.72, (vw - 24) / 260));

  const DESKTOP_GAP = 40;
  const DESKTOP_TOP = 80;
  const SOCIAL_TOP = 32;
  const DESKTOP_CONTENT_WIDTH = 828;
  const DESKTOP_SHIFT_LEFT = 100;

  const desktopStart = 383 * sidebarScale + DESKTOP_GAP;
  const desktopLeft =
    desktopStart +
    Math.max(0, (vw - desktopStart - DESKTOP_CONTENT_WIDTH) / 2) -
    DESKTOP_SHIFT_LEFT;

  useEffect(() => {
    if (isNarrow) return;
    const { style } = document.documentElement;
    const prevHtml = style.overflow;
    const prevBody = document.body.style.overflow;
    style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [isNarrow]);

  return (
    <main
      className="relative isolate font-sans selection:bg-white/20"
      style={{
        width: "100vw",
        height: isNarrow ? "auto" : "100vh",
        minHeight: "100vh",
        maxHeight: isNarrow ? "none" : "100vh",
        overflowX: "hidden",
        overflowY: isNarrow ? "auto" : "hidden",
        ...CANVAS_GRID,
        color: "#fff",
      }}
    >
      {/* Social — right aligned, ~Figma spacing (12px gap), top 48px */}
      <div
        className="pointer-events-auto z-[60] flex gap-3"
        style={
          isNarrow
          ? {
              position: "relative",
              width: `${383 * mobileSidebarScale}px`,
              margin: "0 auto",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingBottom: 12,
              paddingLeft: 20,
              paddingRight: 20,
              boxSizing: "border-box",
            }
          : {
              position: "fixed",
              top: 48,
              right: 48,
            }
        }
      >
        {SOCIAL_LINKS.map(({ icon, label, href, external, size }) => (
          <motion.a
            key={label}
            href={href}
            aria-label={label}
            className="flex items-center justify-center rounded-full text-white"
            style={{
              width: 52,
              height: 52,
              background: "rgba(217,217,217,0.1)",
              borderRadius: 100,
            }}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={icon}
              alt=""
              width={size}
              height={size}
              className="block object-contain"
              style={{ filter: "brightness(0) invert(1)" }}
              draggable={false}
            />
          </motion.a>
        ))}
      </div>

      <div
  className="fixed z-[80] flex items-center gap-3"
  style={{
    right: isNarrow ? 28 : 48,
    bottom: isNarrow ? 28 : 48,
  }}
>
  <motion.button
    type="button"
    aria-label={t.switchLang}
    className="pointer-events-auto flex items-center justify-center rounded-full text-white"
    style={{
      width: 52,
      height: 52,
      background: isNarrow ? "#0F0F0F" : "rgba(217,217,217,0.1)",
      borderRadius: 100,
      boxShadow: isNarrow ? "0 12px 32px rgba(0,0,0,0.35)" : undefined,
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
    whileHover={isNarrow ? undefined : { scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {lang === "ru" ? "EN" : "RU"}
  </motion.button>

  <motion.button
    type="button"
    aria-label={
      viewMode === "folders" ? t.showDesktop : t.showFolders
    }
    className="pointer-events-auto flex items-center justify-center rounded-full text-white"
    style={{
      width: 52,
      height: 52,
      background: isNarrow ? "#0F0F0F" : "rgba(217,217,217,0.1)",
      borderRadius: 100,
      boxShadow: isNarrow ? "0 12px 32px rgba(0,0,0,0.35)" : undefined,
    }}
    onClick={() => {
      setViewMode((mode) => {
        const nextMode = mode === "folders" ? "desktop" : "folders";
        sessionStorage.setItem("homeViewMode", nextMode);
        return nextMode;
      });
    }}
    whileHover={isNarrow ? undefined : { scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {viewMode === "folders" ? (
      <List className="size-[26px]" strokeWidth={1.75} />
    ) : (
      <FolderOpen className="size-[25px]" strokeWidth={1.5} />
    )}
  </motion.button>
</div>

      {/* Folders on canvas */}
      {!isNarrow && viewMode === "folders" && (
        <div className="pointer-events-none absolute inset-0 z-[10]">
        {COLLECTIONS.map((year) => {
          const pos = FOLDER_POSITIONS[year];
          const fh = year === "2023" ? 327 : 345;
          return (
            <div
              key={year}
              className="pointer-events-auto absolute"
              style={{
                left: pos.left,
                top: pos.top,
                width: 233,
                height: fh,
              }}
              onMouseEnter={() => setHoverYear(year)}
              onMouseLeave={() => setHoverYear((h) => (h === year ? null : h))}
            >
              <FloatingFolder year={year} isHovered={hoverYear === year} />
            </div>
          );
        })}
      </div>
      )}
      {!isNarrow && viewMode === "desktop" && (
  <DesktopCaseView
  left={desktopLeft}
  top={DESKTOP_TOP}
  language={lang}
  isMobile={isNarrow}
/>
)}
      {/* Left sidebar — Figma: 383×800; clip box matches scaled height so it fits in 100vh */}
      <aside
  className="z-[50] flex flex-col overflow-hidden"
  style={{
    position: isNarrow ? "relative" : "absolute",
    left: isNarrow ? undefined : 0,
    top: isNarrow ? undefined : 48,
    bottom: isNarrow ? undefined : 48,
    width: isNarrow ? "100%" : 383,
    height: isNarrow ? "auto" : "calc(100vh - 96px)",
    maxHeight: isNarrow ? "none" : "calc(100vh - 96px)",
    alignItems: isNarrow ? "center" : undefined,
    paddingLeft: isNarrow ? 12 : 0,
    paddingRight: isNarrow ? 12 : 0,
  }}
>
<div
  className="overflow-hidden"
  style={{
    width: isNarrow ? 383 * mobileSidebarScale : 383,
    height: isNarrow ? 800 * mobileSidebarScale : "100%",
  }}
>
<div
  className="flex flex-col"
  style={{
    width: 383,
    height: isNarrow ? 800 : "100%",
    padding: 4,
    gap: 2,
    transform: isNarrow ? `scale(${mobileSidebarScale})` : undefined,
    transformOrigin: "top left",
  }}
>
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: 375, 
            height: 196,
            flex: 1,
 
            borderRadius: 40 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/profile/arina.jpg"
            alt="Арина Быковская"
            className="absolute inset-0 h-full w-full object-cover"
            width={375}
            height={179}
            decoding="async"
          />
        </div>

        <div
          className="flex shrink-0 flex-col items-center justify-center bg-white"
          style={{
            width: 375,
            height: 240,
            padding: "28px 28px",
            borderRadius: 40,
            
          }}
        > 
          <div
    className="flex flex-col items-center text-center"
    style={{ gap: 6 }}
  >

            <h1
              className="text-center font-medium"
              style={{
                fontSize: 36,
                lineHeight: "110%",
                color: "#0F0F0F",
                fontWeight: 500,
        letterSpacing: "-0.05em",
              }}
            >
              {t.name}
            </h1>
            
            <p
              className="text-center font-medium"
              style={{ fontSize: 16, 
                lineHeight: "100%", 
                color: "rgba(15,15,15,0.52)",
                fontWeight: 500
              }}
            >
              {t.role}
            </p>
            </div>
            <div style={{ height: 28 }} />
            <p
  className="mx-auto text-center"
  style={{
    fontSize: 18,
    lineHeight: "120%",
    color: "rgba(15,15,15,0.6)",
    fontWeight: 400,
  }}
>
{t.description}
</p>
          
          
        </div>

        <div
          className="flex shrink-0 flex-col justify-between overflow-hidden bg-white"
          style={{
            width: 375,
            
            height: 348,
            padding: "32px 40px",
            borderRadius: 40,
          }}
        >
          <div className="flex flex-col items-center" style={{ gap: 16 }}>
            <h2
              className="text-center font-medium"
              style={{ fontSize: 24, lineHeight: "110%", color: "#0F0F0F" }}
            >
              {t.worked}
            </h2>
            <div className="flex w-full justify-center gap-8">
              <LogoCell60 src="/logos/ozon.svg" label="Ozon Tech" />
              <LogoCell60 src="/logos/vk.svg" label="VK" />
              <LogoCell60 src="/logos/ids.svg" label="IDS" />
            </div>
          </div>
          <div className="flex flex-col items-center" style={{ gap: 16 }}>
            <h2
              className="text-center font-medium"
              style={{ fontSize: 24, lineHeight: "110%", color: "#0F0F0F" }}
            >
              {t.studied}
            </h2>
            <div className="flex w-full justify-center gap-8">
              <LogoCell60 src="/logos/pragmatica.svg" label="Pragmatica" />
              <LogoCell60 src="/logos/itmo.svg" label="ITMO" />
              <LogoCell60 src="/logos/mtuci.svg" label="MTUCI" />
            </div>
          </div>
        </div>
        </div>
        </div>
      </aside>

      {isNarrow && viewMode === "folders" && (
  <div
    className="relative z-[20] flex w-full flex-col items-center px-3 pb-8 pt-4"
    style={{ gap: 14 }}
  >
    {COLLECTIONS.map((year) => {
      const h = year === "2023" ? 327 : 345;

      return (
        <div
          key={year}
          className="relative flex w-full justify-center overflow-visible"
          style={{ height: h * mobileFolderScale }}
          onMouseEnter={() => setHoverYear(year)}
          onMouseLeave={() =>
            setHoverYear((prev) => (prev === year ? null : prev))
          }
        >
          <div
            style={{
              width: 233,
              height: h,
              transform: `scale(${mobileFolderScale})`,
              transformOrigin: "top center",
            }}
          >
            <FloatingFolder year={year} isHovered={hoverYear === year} />
          </div>
        </div>
      );
    })}
  </div>
)}

{isNarrow && viewMode === "desktop" && (
  <div className="relative z-[20] w-full px-6 pb-10 pt-8">
    <MobileDesktopCaseView language={lang} />
  </div>
)}
    </main>
  );
}
