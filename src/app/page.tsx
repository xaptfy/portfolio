"use client";

import SlotLoader from "./components/SlotLoader";
import { animate, motion, useMotionValue } from "framer-motion";
import { FolderOpen, List } from "lucide-react";
import { useEffect, useState } from "react";


type HomeViewMode = "folders" | "desktop";
type CollectionYear = "2023" | "2024" | "2025" | "2026";
type Lang = "ru" | "en";
type IntroPhase = "loading" | "roulette" | "portfolio";
type CaseImageEntry =
  | string
  | {
    src: string;
    variant?: "regular" | "wide";
  };


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
        ru: "OTP-верификация",
        en: "Banking case",
      },
      href: "/cases/otr",
      color: "#FFFFFF",
    },
    {
      title: {
        ru: "Pragmatica x VK",
        en: "Pragmatica x VK",
      },
      href: "/cases/pragmatica-vk",
      color: "#3B82F6",
    },
    {
      title: {
        ru: "Petrix",
        en: "Petrix",
      },
      href: "/cases/petrix",
      color: "#E774BF",
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
const ROULETTE_CASES = [
  {
    id: "otr",
    title: "Banking case",
    href: "/cases/otr",
    logo: "/logo/otp.svg",
  },
  {
    id: "ozon",
    title: "Ozon Tech",
    href: "/cases/ozon-tech",
    logo: "/logo/ozon.svg",
  },

  {
    id: "vtb",
    title: "VTB",
    href: "/cases/vtb",
    logo: "/logo/vtb.svg",
  }, 
   {
    id: "vk",
    title: "Pragmatica x VK",
    href: "/cases/pragmatica-vk",
    logo: "/logo/vk.svg",
  },
  {
    id: "seamm",
    title: "Seamm",
    href: "/cases/seamm",
    logo: "/logo/seamm.svg",
  },
  {
    id: "crypto",
    title: "Crypto Broker",
    href: "/cases/crypto",
    logo: "/logo/crypto.svg",
  },
  {
    id: "itmo",
    title: "ITMO",
    href: "/cases/itmo",
    logo: "/logo/itmo.svg",
  },
  
  {
    id: "petrix",
    title: "Petrix",
    href: "/cases/petrix",
    logo: "/logo/petrix.svg",
  },
  {
    id: "tender",
    title: "Tender B2B",
    href: "/cases/tender",
    logo: "/logo/tender.svg",
  },
] as const;

function CaseRouletteIntro({
  onClose,
}: {
  onClose: () => void;
}) {
  const rotation = useMotionValue(0);
  const viewportWidth = useViewportWidth();
  const isMobile = viewportWidth < 768;
  const [isSpinning, setIsSpinning] = useState(false);

  const itemSize = isMobile ? 108 : 162;
  const wheelSize = isMobile ? 720 : 1018;
  const center = wheelSize / 2;
  const radius = isMobile ? 270 : 390;
  const step = 360 / ROULETTE_CASES.length;

  useEffect(() => {
    if (isSpinning) return;

    const idleSpin = animate(rotation, rotation.get() - 360, {
      duration: 44,
      ease: "linear",
      repeat: Infinity,
    });

    return () => idleSpin.stop();
  }, [isSpinning, rotation]);

  const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;

  const handleSpin = async () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const selectedIndex = Math.floor(Math.random() * ROULETTE_CASES.length);
    const selectedCase = ROULETTE_CASES[selectedIndex];


    const current = rotation.get();
    const currentMod = normalizeAngle(current);

    // Чтобы выбранная иконка встала ровно наверх, под треугольник
    const targetMod = normalizeAngle(-selectedIndex * step);

    let closestTarget = current - (currentMod - targetMod);

    if (closestTarget > current) {
      closestTarget -= 360;
    }

    const finalRotation = closestTarget - 360 * 5;

    await animate(rotation, finalRotation, {
      duration: 3.6,
      ease: [0.12, 0.82, 0.16, 1],
    });

    setTimeout(() => {
      sessionStorage.setItem("portfolioIntroShown", "true");
      window.location.href = selectedCase.href;
    }, 650);
  };

  return (
    <motion.section
      className="fixed inset-0 z-[300] flex items-center justify-center overflow-hidden bg-[#030303] font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-full w-full overflow-hidden md:h-[800px] md:w-[1200px]">
        {/* Blur / затемнение — теперь ПОД иконками */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/55 backdrop-blur-[10px]" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(3,3,3,0)_29.69%,#030303_95%)]" />

        {/* Иконки — теперь НАД блюром */}
        <motion.div
          className="absolute left-1/2 z-[2] -translate-x-1/2"
          style={{
            top: isMobile ? 145 : 96,
            width: wheelSize,
            height: wheelSize,
            rotate: rotation,
          }}
        >
          {ROULETTE_CASES.map((item, index) => {
            const angle = step * index - 90;
            const rad = (angle * Math.PI) / 180;

            const x = center + radius * Math.cos(rad) - itemSize / 2;
            const y = center + radius * Math.sin(rad) - itemSize / 2;

            return (
              <motion.a
                key={item.id}
                href={item.href}
                className="absolute flex items-center justify-center overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                style={{
                  width: itemSize,
                  height: itemSize,
                  left: x,
                  top: y,
                  borderRadius: isMobile ? 36 : 56,
                  rotate: angle + 90,
                  background: "transparent",
                }}
                whileHover={isSpinning ? undefined : { scale: 1.04 }}
                whileTap={isSpinning ? undefined : { scale: 0.96 }}
              >
                <img
                  src={item.logo}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Затемнение снизу — поверх иконок, но без blur */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background: isMobile
              ? "linear-gradient(180deg, rgba(3,3,3,0) 20%, rgba(3,3,3,0.28) 35%, rgba(3,3,3,0.88) 53%, #030303 68%)"
              : "linear-gradient(180deg, rgba(3,3,3,0) 35%, #030303 96%)",
          }}
        />
        <div
          className="absolute left-1/2 z-20 -translate-x-1/2"
          style={{ top: isMobile ? 330 : 340 }}
        >
          <div
            className={
              isMobile
                ? `
          h-0 w-0
          border-l-[22px]
          border-r-[22px]
          border-b-[42px]
          border-l-transparent
          border-r-transparent
          border-b-white
        `
                : `
          h-0 w-0
          border-l-[28px]
          border-r-[28px]
          border-b-[52px]
          border-l-transparent
          border-r-transparent
          border-b-white
        `
            }
          />
        </div>


        <div
          className="absolute left-1/2 z-[5] flex -translate-x-1/2 flex-col items-center text-center"
          style={{
            top: isMobile ? 405 : 430,
            width: isMobile ? "calc(100vw - 40px)" : 400,
            gap: isMobile ? 24 : 32,
          }}
        >
          <div className="flex w-full flex-col items-center gap-3">
            <h1
              className="w-full text-center font-medium leading-[110%] text-white"
              style={{
                fontSize: isMobile ? 27 : 32,
                maxWidth: isMobile ? 320 : 400,
              }}
            >
              Designing complex digital products
            </h1>

            <p
              className="text-center font-normal leading-[115%] text-white/70"
              style={{
                width: isMobile ? "100%" : 374,
                maxWidth: isMobile ? 310 : 374,
                fontSize: isMobile ? 15 : 16,
              }}
            >
              Product designer focused on B2B/B2C products, fintech, AI-first tools and
              scalable user flows
            </p>

            
          </div>

          <motion.button
            type="button"
            onClick={handleSpin}
            disabled={isSpinning}
            className="
    flex h-[50px] items-center justify-center
    rounded-full bg-white
    px-8 text-[16px] font-medium leading-[110%] text-[#0E0E0E]
    disabled:pointer-events-none disabled:opacity-80
    max-md:h-[54px] max-md:w-full max-md:max-w-[280px]
  "
            whileHover={isSpinning ? undefined : { scale: 1.04 }}
            whileTap={isSpinning ? undefined : { scale: 0.96 }}
          >
            {isSpinning ? "Choosing..." : "View projects"}
          </motion.button>
        </div>

        <motion.button
          type="button"
          onClick={onClose}
          className="absolute z-[6] flex items-center justify-center rounded-full bg-white text-[#0E0E0E]"
          style={{
            right: isMobile ? 20 : 64,
            top: isMobile ? 20 : 64,
            width: isMobile ? 44 : 52,
            height: isMobile ? 44 : 52,
          }}
          aria-label="Close intro"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative h-6 w-6">
            <span className="absolute left-1/2 top-1/2 h-[2px] w-[20px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#0E0E0E]" />
            <span className="absolute left-1/2 top-1/2 h-[2px] w-[20px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#0E0E0E]" />
          </span>
        </motion.button>
      </div>
    </motion.section>
  );
}

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
    href: "https://drive.google.com/drive/folders/1x_S6CWJrHiZfxYIT-Uc6WgP9INVPwqHW?usp=sharing",
    external: false,
    size: 28,
  },
] as const;

type WorkPreviewKey = "ozon" | "vk" | "ids";

const WORK_PREVIEWS: Record<
  WorkPreviewKey,
  {
    title: {
      ru: string;
      en: string;
    };
    description: {
      ru: string;
      en: string;
    };
    tags: string[];
    href: string;
    sections: { title: string; text: string }[];
    images: CaseImageEntry[];
  }
> = {
  ozon: {
    title: {
      ru: "Ozon Tech",
      en: "Ozon Tech",
    },
    description: {
      ru: "Работала продуктовым дизайнером в команде Оформления: занималась доменами чекаута, геосервисов и Select, а также поддерживала задачи смежных доменов",
      en: "Worked as a Product Designer in the Checkout team: owned checkout, geo services and Select flows, and supported adjacent product domains",
    },
    tags: ["B2C", "B2B"],
    href: "/cases/ozon-tech",
    sections: [
      {
        title: "— Ozon Select",
        text: "Адаптировала около 1000 экранов чекаута и геосервисов под новое визуальное решение, обновляла токены, формы и компоненты, сопровождала внедрение в разработке",
      },
      {
        title: "— Чаевые сотрудникам ПВЗ",
        text: "Прорабатывала сценарий добавления чаевых в пользовательский путь и поддерживала задачи смежного продуктового домена",
      },
      {
        title: "— Геосервисы",
        text: "Работала над списком ПВЗ на карте, участвовала в редизайне пинов и доработке сценариев выбора точки получения",
      },
    ],
    images: [
      { src: "/cases/ozon-tech/1.png", variant: "regular" },
      { src: "/cases/ozon-tech/2.png", variant: "regular" },
      { src: "/cases/ozon-tech/3.png", variant: "wide" },
      { src: "/cases/ozon-tech/4.png", variant: "regular" },
      { src: "/cases/ozon-tech/5.png", variant: "regular" },
      { src: "/cases/ozon-tech/6.png", variant: "regular" },
      { src: "/cases/ozon-tech/7.png", variant: "regular" },
      { src: "/cases/ozon-tech/8.png", variant: "regular" },
      { src: "/cases/ozon-tech/9.png", variant: "regular" },
    ],
  },

  vk: {
    title: {
      ru: "Mail.ru",
      en: "Mail.ru",
    },
    description: {
      ru: "Работала над новым видом сервиса почты Mail.ru: переосмысляла вход, навигацию и доступ к ключевым действиям",
      en: "Worked on a new Mail.ru experience: redesigned sign-in, navigation and access to key actions",
    },
    tags: ["B2C"],
    href: "/cases/vk",
    sections: [
      {
        title: "— Дискавери",
        text: "Разобрала текущий пользовательский путь, главный экран и сценарий входа, чтобы найти точки трения",
      },
      {
        title: "— Редизайн",
        text: "Подготовила обновлённые экраны с более понятной навигацией и усиленными акцентами на важных действиях",
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

  ids: {
    title: {
      ru: "Casino NDA",
      en: "Casino NDA",
    },
    description: {
      ru: "Проектировала онбординг и первые игровые сценарии для онлайн-геймблинга",
      en: "Designed onboarding and first-session flows for an online gambling product",
    },
    tags: ["B2C", "NDA"],
    href: "/cases/casino",
    sections: [
      {
        title: "— Онбординг",
        text: "Сократила путь новичка, убрала лишние шаги и сделала первый игровой опыт понятнее",
      },
      {
        title: "— Первый депозит",
        text: "Переработала флоу пополнения и снизила трение перед первой игровой сессией",
      },
    ],
    images: ["/cases/casino/1.png"],
  },
};

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

function useViewportHeight() {
  const [vh, setVh] = useState(900);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return vh;
}

function LogoCell60({
  src,
  label,
  onClick,
}: {
  src: string;
  label: string;
  onClick?: () => void;
}) {
  const content = (
    <>
      <div className="flex size-[60px] shrink-0 items-center justify-center">
        <img
          src={src}
          alt=""
          className="max-h-[60px] max-w-[60px] object-contain"
          loading="lazy"
        />
      </div>
      <span
        className="max-w-[100px] text-[14px]"
        style={{
          color: "rgba(14, 14, 14, 0.6)",
          lineHeight: "130%",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </>
  );

  if (!onClick) {
    return (
      <div className="flex w-full min-w-0 flex-col items-center gap-2 text-center">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full min-w-0 cursor-pointer flex-col items-center gap-2 text-center transition-transform hover:scale-[1.04] active:scale-[0.96]"
      style={{ background: "transparent", border: "none", padding: 0 }}
    >
      {content}
    </button>
  );
}

function WorkPreviewModal({
  preview,
  onClose,
  lang,
}: {
  preview: (typeof WORK_PREVIEWS)[WorkPreviewKey];
  onClose: () => void;
  lang: Lang;
}) {

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0F0F0F]/55 px-6 backdrop-blur-[10px]"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="
          relative flex w-full max-w-[948px]
          overflow-hidden bg-[#0F0F0F]
          md:h-[580px] md:flex-row md:gap-1
          max-md:h-[calc(100vh-48px)]
          max-md:flex-col
        "
        style={{ borderRadius: 44 }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-[220] flex size-[44px] items-center justify-center rounded-full bg-white text-[#0F0F0F] transition-transform hover:scale-105 active:scale-95"
          aria-label="Закрыть"
        >
          <span className="text-[26px] leading-none">×</span>
        </button>

        <div
          className="flex w-full shrink-0 flex-col justify-between p-1 md:w-[444px]"
          style={{ borderRadius: 44 }}
        >
          <div
            className="flex h-full flex-col overflow-hidden p-[24px_4px_4px]"
            style={{
              background: "rgba(255,255,255,0.1)",
              borderRadius: 40,
            }}
          >
            <div className="flex flex-col items-center gap-3 px-5 pt-8 text-center">
              <h2
                className="text-white"
                style={{
                  fontSize: 40,
                  lineHeight: "110%",
                  fontWeight: 500,
                  letterSpacing: "-0.04em",
                }}
              >
                {preview.title[lang]}
              </h2>

              <p
                style={{
                  maxWidth: 374,
                  fontSize: 16,
                  lineHeight: "110%",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {preview.description[lang]}
              </p>

              <div className="flex gap-2">
                {preview.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-4 py-2 text-[14px] font-medium text-white"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      lineHeight: "90%",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div style={{ height: 20 }} />
            </div>

            <a
              href={preview.href}
              className="mx-4 mb-4 mt-auto flex h-[58px] items-center justify-center bg-white text-[#0F0F0F] no-underline transition-transform hover:scale-[1.01] active:scale-[0.98]"
              style={{
                borderRadius: 999,
                fontSize: 18,
                lineHeight: "110%",
                fontWeight: 500,
              }}
            >
              {lang === "ru" ? "Посмотреть кейс →" : "View case →"}
            </a>
          </div>
        </div>

        <a
          href={preview.href}
          className="
            flex min-w-0 flex-1 gap-2
            overflow-x-auto overflow-y-hidden
            px-2 py-3
            md:h-full md:px-0 md:py-11 md:pr-2
            max-md:h-[260px]
            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
          "
        >
          {preview.images.map((item, index) => {
            const src = typeof item === "string" ? item : item.src;
            const variant =
              typeof item === "string" ? "regular" : item.variant ?? "regular";

            return (
              <img
                key={src}
                src={src}
                alt={`${preview.title} preview ${index + 1}`}
                className={
                  variant === "wide"
                    ? "h-full w-auto max-w-none shrink-0 rounded-[24px] object-contain"
                    : "h-full w-auto shrink-0 rounded-[24px] object-contain"
                }
                draggable={false}
              />
            );
          })}
        </a>
      </div>
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
    left: "calc(50% - 233px / 2 - 24.5px)",
    top: "calc(50% - 345px / 2 - 115.5px)",
  },
  "2026": {
    left: "calc(50% - 233px / 2 + 326.5px)",
    top: "calc(50% - 345px / 2 - 180px)",
  },
  "2024": {
    left: "calc(50% - 232px / 2 + 107px)",
    top: "calc(50% - 345px / 2 + 161.5px)",
  },
  "2023": {
    left: "calc(50% - 233px / 2 + 434.5px)",
    top: "calc(50% - 327px / 2 + 71.5px)",
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
                    lineHeight: "130%",
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
                      lineHeight: "130%",
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
                    lineHeight: "130%",
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
  const [activeWorkPreview, setActiveWorkPreview] = useState<WorkPreviewKey | null>(null);

  const [mounted, setMounted] = useState(false);
  const [introPhase, setIntroPhase] =
    useState<IntroPhase | null>(null);


  useEffect(() => {
    setMounted(true);

    const introWasShown =
      sessionStorage.getItem("portfolioIntroShown") === "true";

    setIntroPhase(introWasShown ? "portfolio" : "loading");
  }, []);

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
  const sidebarScale = useSidebarScale(900);
  const vw = useViewportWidth();
  const vh = useViewportHeight();

  const isNarrow = vw < 1024;
  const isShortDesktop = !isNarrow && vh < 650;

  const folderAdaptiveScale = isShortDesktop
    ? Math.max(0.5, Math.min(0.66, vh / 950))
    : Math.max(0.72, Math.min(1, vh / 900));

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
    <>
      {mounted && introPhase === "loading" ? (
        <SlotLoader
          onFinish={() => setIntroPhase("roulette")}
        />
      ) : null}

      {mounted && introPhase === "roulette" ? (
        <CaseRouletteIntro
          onClose={() => {
            sessionStorage.setItem("portfolioIntroShown", "true");
            setIntroPhase("portfolio");
          }}
        />
      ) : null}

      {mounted && introPhase === "portfolio" ? (

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
          {/* Social — right aligned, ~Figma spacing (12px gap), top 48px */}


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
            <div
              className="pointer-events-none absolute z-[10]"
              style={{
                left: 383 * sidebarScale + 48,
                right: 48,
                top: 64,
                bottom: 88,
              }}
            >
              <div
                className="pointer-events-none relative h-full"
                style={{
                  width: "min(100%, 1160px)",
                  height: "100%",
                  margin: "0 auto",
                }}
              >
                {COLLECTIONS.map((year, index) => {
                  const pos = FOLDER_POSITIONS[year];
                  const fh = isShortDesktop ? 345 : year === "2023" ? 327 : 345;

                  const shortDesktopStyle = isShortDesktop
                    ? {
                      left: `calc(50% - ${(COLLECTIONS.length * 233 + (COLLECTIONS.length - 1) * 72) *
                        folderAdaptiveScale
                        }px / 2 + ${index * (233 + 72) * folderAdaptiveScale}px)`,
                      top: `calc(50% - ${345 * folderAdaptiveScale}px / 2 + 28px)`,
                      transform: `scale(${folderAdaptiveScale})`,
                      transformOrigin: "top left",
                    }
                    : {
                      left: `calc(${pos.left} - 200px)`,
                      top: pos.top,
                      transform: `scale(${folderAdaptiveScale})`,
                      transformOrigin: "center center",
                    };

                  return (
                    <div
                      key={year}
                      className="pointer-events-auto absolute"
                      style={{
                        ...shortDesktopStyle,
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
              top: isNarrow ? undefined : "50%",
              bottom: undefined,
              transform: isNarrow ? undefined : "translateY(-50%)",
              width: isNarrow ? "100%" : 383 * sidebarScale,
              height: isNarrow ? "auto" : 800 * sidebarScale,
              maxHeight: isNarrow ? "none" : 800 * sidebarScale,
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
                  transform: `scale(${isNarrow ? mobileSidebarScale : sidebarScale})`,
                  padding: 4,
                  gap: 2,
                  transformOrigin: "top left",
                }}
              >
                <div
                  className="relative shrink-0 overflow-hidden"
                  style={{
                    width: 375,
                    height: 196,
                    minHeight: 196,
                    flex: 1,

                    borderRadius: 40
                  }}
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
                    height: 210,
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
                        lineHeight: "130%",
                        color: "#0F0F0F",
                        fontWeight: 500,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {t.name}
                    </h1>

                    <p
                      className="text-center font-medium"
                      style={{
                        fontSize: 16,
                        lineHeight: "100%",
                        color: "rgba(14, 14, 14, 0.52)",
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
                      color: "rgba(14, 14, 14, 0.6)",
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

                    height: 330,
                    padding: "28px 40px",
                    borderRadius: 40,
                  }}
                >
                  <div className="flex flex-col items-center" style={{ gap: 12 }}>
                    <h2
                      className="text-center font-medium"
                      style={{ fontSize: 24, lineHeight: "130%", color: "#0F0F0F" }}
                    >
                      {t.worked}
                    </h2>
                    <div className="grid w-full grid-cols-3 items-start">
                      <LogoCell60
                        src="/logos/ozon.svg"
                        label="Ozon Tech"
                        onClick={() => setActiveWorkPreview("ozon")}
                      />
                      <LogoCell60
                        src="/logos/vk.svg"
                        label="VK"
                        onClick={() => setActiveWorkPreview("vk")}
                      />
                      <LogoCell60
                        src="/logos/ids.svg"
                        label="IDS"
                        onClick={() => setActiveWorkPreview("ids")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center" style={{ gap: 12 }}>
                    <h2
                      className="text-center font-medium"
                      style={{ fontSize: 24, lineHeight: "130%", color: "#0F0F0F" }}
                    >
                      {t.studied}
                    </h2>
                    <div className="grid w-full grid-cols-3 items-start">
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
                const h = 345;

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
          {activeWorkPreview ? (
            <WorkPreviewModal
              preview={WORK_PREVIEWS[activeWorkPreview]}
              onClose={() => setActiveWorkPreview(null)}
              lang={lang}
            />
          ) : null}
        </main>
      ) : null}
    </>
  );
}
