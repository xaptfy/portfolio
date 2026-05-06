"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

type CollectionYear = "2023" | "2024" | "2025" | "2026";

const ease = [0.22, 1, 0.36, 1] as const;

const CANVAS_GRID = {
  backgroundColor: "#0F0F0F",
  backgroundImage:
    "radial-gradient(circle, rgba(217,217,217,0.1) 2px, transparent 2px)",
  backgroundSize: "36px 36px",
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
  "2026": ["/cases/pragmatica-vk", "/cases/pragmatica-vk", "/cases/pragmatica-vk"],
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
    href: "#",
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
      style={{ bottom: FOLDER_BEFORE.h - 78, width: 226, height: 172 }}
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
            marginLeft: -slot.width / 2,
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
            style={{ width: slot.width }}
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
          className="pointer-events-none absolute bottom-0 left-1/2 z-[40] flex -translate-x-1/2 flex-col items-center justify-center gap-0.5 px-3"
          style={{ width: FOLDER_BEFORE.w, height: FOLDER_BEFORE.h }}
        >
          <p
            className="text-center text-[18px] font-semibold leading-[110%]"
            style={{ color: "#0F0F0F" }}
          >
            Case Collection
          </p>
          <p
            className="text-center text-[14px] font-semibold leading-[110%]"
            style={{ color: "#0F0F0F" }}
          >
            {year}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

const COLLECTIONS: CollectionYear[] = ["2025", "2026", "2024", "2023"];

export default function Home() {
  const [hoverYear, setHoverYear] = useState<CollectionYear | null>(null);
  const sidebarScale = useSidebarScale(800);
  const vw = useViewportWidth();
  const isNarrow = vw < 1024;
  const mobileSidebarScale = Math.min(1, Math.max(0.64, (vw - 24) / 383));
  const mobileFolderScale = Math.min(1, Math.max(0.72, (vw - 24) / 260));

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
            ? { justifyContent: "center", paddingTop: 20, paddingBottom: 14 }
            : { position: "fixed", top: 48, right: 48 }
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

      {!isNarrow && (
      <motion.button
        type="button"
        aria-label="Меню"
        className="pointer-events-auto fixed z-[60] flex items-center justify-center rounded-full text-white"
        style={{
          width: 52,
          height: 52,
          right: 48,
          bottom: 48,
          background: "rgba(217,217,217,0.1)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="size-[22px]" strokeWidth={1.5} />
      </motion.button>
      )}

      {/* Folders on canvas */}
      {!isNarrow && (
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

      {/* Left sidebar — Figma: 383×800; clip box matches scaled height so it fits in 100vh */}
      <aside
        className="z-[50] flex flex-col justify-end overflow-hidden"
        style={{
          position: isNarrow ? "relative" : "absolute",
          left: isNarrow ? undefined : 0,
          bottom: isNarrow ? undefined : 0,
          width: isNarrow ? "100%" : 383 * sidebarScale,
          height: isNarrow ? "auto" : "100vh",
          maxHeight: isNarrow ? "none" : "100vh",
          alignItems: isNarrow ? "center" : undefined,
          paddingLeft: isNarrow ? 12 : 0,
          paddingRight: isNarrow ? 12 : 0,
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: isNarrow ? 383 * mobileSidebarScale : 383 * sidebarScale,
            height: isNarrow ? 800 * mobileSidebarScale : 800 * sidebarScale,
          }}
        >
          <div
            className="flex flex-col"
            style={{
              width: 383,
              height: 800,
              padding: 4,
              gap: 2,
              transform: `scale(${isNarrow ? mobileSidebarScale : sidebarScale})`,
              transformOrigin: "top left",
            }}
          >
        <div
          className="relative shrink-0 overflow-hidden"
          style={{ width: 375, height: 179, borderRadius: 40 }}
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
            height: 257,
            padding: "32px 40px",
            borderRadius: 40,
            gap: 28,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <h1
              className="text-center font-medium"
              style={{
                fontSize: 40,
                lineHeight: "110%",
                color: "#0F0F0F",
              }}
            >
              Арина Быковская
            </h1>
            <p
              className="text-center font-medium"
              style={{ fontSize: 16, lineHeight: "90%", color: "rgba(15,15,15,0.6)" }}
            >
              Product Designer
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-medium"
              style={{ fontSize: 32, lineHeight: "90%", color: "#0F0F0F" }}
            >
              3 года
            </span>
            <span
              className="font-medium"
              style={{ fontSize: 16, lineHeight: "110%", color: "rgba(15,15,15,0.6)" }}
            >
              8 месяцев
            </span>
          </div>
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
          <div className="flex flex-col items-center" style={{ gap: 24 }}>
            <h2
              className="text-center font-medium"
              style={{ fontSize: 24, lineHeight: "110%", color: "#0F0F0F" }}
            >
              Работала тут
            </h2>
            <div className="flex w-full justify-center gap-8">
              <LogoCell60 src="/logos/ozon.svg" label="Ozon Tech" />
              <LogoCell60 src="/logos/vk.svg" label="VK" />
              <LogoCell60 src="/logos/ids.svg" label="IDS" />
            </div>
          </div>
          <div className="flex flex-col items-center" style={{ gap: 24 }}>
            <h2
              className="text-center font-medium"
              style={{ fontSize: 24, lineHeight: "110%", color: "#0F0F0F" }}
            >
              Училась тут
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

      {isNarrow && (
        <div className="relative z-[20] flex w-full flex-col items-center px-3 pb-8 pt-4" style={{ gap: 14 }}>
          {COLLECTIONS.map((year) => {
            const h = year === "2023" ? 327 : 345;
            return (
              <div
                key={year}
                className="relative flex w-full justify-center overflow-visible"
                style={{ height: h * mobileFolderScale }}
                onMouseEnter={() => setHoverYear(year)}
                onMouseLeave={() => setHoverYear((prev) => (prev === year ? null : prev))}
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
    </main>
  );
}
