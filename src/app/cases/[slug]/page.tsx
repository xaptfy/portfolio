"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

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

export const CASES: Record<string, CaseStudy> = {
  "pragmatica-vk": {
    slug: "pragmatica-vk",
    title: "Pragmatica x VK",
    description:
      "Участвовала в дизайн-кемпе от Практики совместно с VK: в течение месяца работала над двумя продуктовыми кейсами в формате спринтов, концептила интерфейсы, презентовала решения и дорабатывала их на основе подробной обратной связи от менторов",
    tags: ["Camp", "B2C"],
    sections: [
      {
        title: "— Мои питомцы в сервисе ВКонтакте",
        text:
          "Провела редизайн 4 ключевых экранов раздела «Мои питомцы»: переосмыслила структуру, визуальную подачу и пользовательские сценарии внутри сервиса",
      },
      {
        title: "— Музыкальный плеер эпох",
        text:
          "Спроектировала мини-приложение, в котором пользователь погружается в атмосферу музыкальных устройств прошлого: от винилового проигрывателя до iPod Classic. Сохранила дух разных эпох, но адаптировала решение под современные UI-паттерны",
      },
    ],
    images: [
      "/cases/pragmatica-vk/1.png",
      "/cases/pragmatica-vk/2.png",
      "/cases/pragmatica-vk/3.png",
      "/cases/pragmatica-vk/4.png",
      "/cases/pragmatica-vk/5.png",
      "/cases/pragmatica-vk/6.png",
      "/cases/pragmatica-vk/7.png",
    ],
  },
  "ozon-tech": {
    slug: "ozon-tech",
    title: "Ozon Tech",
    description:
      "Работала продуктовым дизайнером в команде Checkout: занималась интерфейсами оформления заказа, геосервисами и задачами смежных продуктовых доменов. Участвовала в крупных визуальных обновлениях, проектировала сценарии внутри пользовательского пути и сопровождала решения до реализации.",
    tags: ["E-commerce", "B2C", "Checkout"],
    sections: [
      {
        title: "— Ozon Select",
        text:
          "Адаптировала около 1000 экранов чекаута и геосервисов под новое визуальное решение: обновляла токены, формы и компоненты, проверяла консистентность интерфейсов и сопровождала внедрение в разработке.",
      },
      {
        title: "— Чаевые сотрудникам ПВЗ",
        text:
          "Прорабатывала сценарий добавления чаевых в пользовательский путь: продумывала точки входа, состояния, ограничения и интеграцию механики в оформление заказа.",
      },
      {
        title: "— Список ПВЗ на карте",
        text:
          "Участвовала в проработке сценария выбора пункта выдачи на карте: помогала улучшить читаемость списка, работу с геоданными и навигацию между картой и карточками ПВЗ.",
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
  "vtb": {
    slug: "vtb",
    title: "ВТБ",
    description:
      "Работала продуктовым дизайнером в команде Оформления: занималась доменами чекаута, геосервисов и Select, а также поддерживала задачи в смежных доменах",
    tags: ["B2C"],
    sections: [
      {
        title: "— Семейный счёт",
        text:
          "Проработала концепцию семейного счёта: сценарии совместного баланса, трат, целей и детского профиля внутри банковского приложения.",
      },
      {
        title: "— Кешбэк и категории",
        text:
          "Спроектировала экран выбора категорий кешбэка: упростила механику выбора, визуально усилила активные категории и сделала сценарий понятнее для пользователя.",
      },
      {
        title: "— Детский профиль",
        text:
          "Продумала логику детского счёта: баланс, пополнение, траты и цели, чтобы родитель мог контролировать финансы ребёнка в понятном интерфейсе.",
      },
      {
        title: "— Совместные цели",
        text:
          "Разработала сценарии накоплений для семьи: отображение прогресса, участников цели и действий по пополнению.",
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
    title: "Криптоброкер",
    description:
      "Концептила приложение криптоброкера для крупного банка: проектировала ключевые сценарии покупки, обмена и хранения цифровых активов для новичков и опытных пользователей",
    tags: ["B2C", "B2B"],
    sections: [
      {
        title: "— Исследование пользователей",
        text:
          "Провела интервью с новичками и опытными пользователями, выявила барьеры первой покупки: страх ошибки, непонимание комиссий, рисков и терминов.",
      },
      {
        title: "— Ключевые сценарии криптоброкера",
        text:
          "Спроектировала онбординг, покупку, обмен и хранение цифровых активов внутри банковской экосистемы.",
      },
      {
        title: "— Финансовые детали и безопасность",
        text:
          "Упростила подачу комиссий, итоговой суммы, ограничений и рисков, чтобы пользователь понимал, что происходит на каждом шаге.",
      },
      {
        title: "— Тестирование и доработка",
        text:
          "Провела UX-тесты, доработала онбординг, шаг подтверждения и детали операции.",
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
    title: "Тендеры",
    description:
      "Проектировала сервис для работы с тендерами в рамках госзаказа",
    tags: ["B2B"],
    sections: [
      {
        title: "— Структура сервиса",
        text:
          "Спроектировала основную логику продукта: каталог тендеров, карточку закупки, фильтры, статусы, личный кабинет и рабочие сценарии пользователя.",
      },
      {
        title: "— Ключевые сценарии",
        text:
          "Проработала путь от поиска тендера до просмотра деталей, сохранения, подготовки заявки и отслеживания статуса.",
      },
      {
        title: "— Интерфейсы и состояния",
        text:
          "Отрисовала основные экраны, таблицы, формы, пустые состояния, ошибки, статусы и сложные сценарии взаимодействия.",
      },
      {
        title: "— Передача в разработку",
        text:
          "Подготовила макеты, спецификации и UI-состояния для разработки, сопровождала вопросы команды на этапе реализации.",
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
    description:
      "Концептила экран Product Details для SEAMM — digital fashion стартапа, где пользователь может взаимодействовать с цифровой одеждой",
    tags: ["B2C"],
    sections: [
      {
        title: "— Приоритизация функций",
        text:
          "Разделила действия по важности и вывела AR-примерку и перенос в игры в основные CTA.",
      },
      {
        title: "— Структура экрана",
        text:
          "Пересобрала Product Details: усилила hero-зону с 3D-визуалом, сгруппировала действия и инфоблоки.",
      },
      {
        title: "— Ключевые сценарии",
        text:
          "Проработала AR-примерку, transfer to games, кастомизацию, подарок другому пользователю, digital passport и order tracking.",
      },
      {
        title: "— Состояния и микротексты",
        text:
          "Добавила подсказки, подтверждения и error states для сложных действий вроде передачи владения и переноса в игру.",
      },
      {
        title: "— Результат",
        text:
          "Ключевые функции стали заметнее и быстрее доступны, а экран начал работать не только как карточка товара, но и как центр управления digital-fashion объектом.",
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
    description:
      "Лидировала дизайн-команду, занимающуюся редизайном сайта курсов повышения квалификации ИТМО",
    tags: ["B2C", "Education"],
    sections: [
      {
        title: "— Лидирование и коммуникация",
        text:
          "Координировала работу дизайн-команды, общалась с заказчиками и разработчиками, уточняла требования и помогала принимать продуктовые решения.",
      },
      {
        title: "— Арт-дирекшн и интерфейс",
        text:
          "Курировала 3D-модели, иконки, моушн и анимации, а также разработала дизайн статей и полезных материалов для сотрудников.",
      },
      {
        title: "— Дизайн-концепции",
        text:
          "Разработала два варианта дизайна: один по брендбуку ИТМО, второй — как уникальную визуальную концепцию.",
      },
      {
        title: "— Исследование и структура сервиса",
        text:
          "Проводила интервью, анализировала данные и строила CJM, чтобы понять потребности сотрудников и студентов ИТМО.",
      },
      {
        title: "— Результат",
        text:
          "Разработали обновлённый дизайн сайта, который объединяет курсы повышения квалификации ИТМО в единую платформу. Проект находится в разработке, параллельно продолжается доработка связанных сервисов и проверка актуальности курсов.",
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
    description:
      "Работала над новым видом сервиса почты Mail.ru: концептила обновлённый пользовательский опыт, упрощала вход в аккаунт, навигацию и доступ к ключевым действиям",
    tags: ["B2C"],
    sections: [
      {
        title: "— Дискавери и анализ продукта",
        text:
          "Разобрала текущий пользовательский путь, изучила главный экран, сценарий входа и доступность ключевых функций, чтобы понять, где пользователь теряет время или не доходит до нужного действия.",
      },
      {
        title: "— Проблемы и точки трения",
        text:
          "Выявила основные боли: неочевидный быстрый вход в аккаунт, сложный поиск кнопки «Написать» и перегруженность главного экрана дополнительными функциями.",
      },
      {
        title: "— UX-гипотезы и сценарии",
        text:
          "Сформулировала гипотезы для улучшения ключевых сценариев: ускорить вход, сделать создание письма заметнее и сократить путь до основных действий в приложении.",
      },
      {
        title: "— Редизайн ключевых экранов",
        text:
          "Подготовила обновлённые экраны с более понятной навигацией, усиленными акцентами на важных действиях и очищенной структурой главного экрана.",
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
    title: "Казино NDA",
    description:
      "Проектировала онбординг и первые игровые сценарии для онлайн-геймблинга",
    tags: ["B2C", "NDA"],
    sections: [
      {
        title: "— Онбординг новичков",
        text:
          "Сократила путь с 7 до 3 шагов, убрала лишние поля и добавила прогресс, увеличив конверсию.",
      },
      {
        title: "— Безопасный первый опыт",
        text:
          "Спроектировала механику бесплатного демо-раунда без депозита, чтобы пользователь мог попробовать продукт без лишнего риска.",
      },
      {
        title: "— Сценарий первого депозита",
        text:
          "Переработала флоу пополнения, объединила авторизацию и создание кошелька, снизив drop-off при создании кошелька.",
      },
      {
        title: "— Визуальный язык и главный экран",
        text:
          "Убрала визуальный шум, выстроила иерархию и смягчила агрессивный визуал, что помогло расширить охват продукта.",
      },
    ],
    images: [
      { src: "/cases/casino/1.png", variant: "wide" },
    ],
  },
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

function CollapsibleWhatIDidCard({ sections }: { sections: CaseSection[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex w-full shrink-0 flex-col"
      style={{
        maxWidth: 428,
        gap: 16,
        borderRadius: 36,
        background: "#FFFFFF",
        padding: 28,
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
          style={{ fontSize: 16, lineHeight: "110%" }}
        >
          Что сделала?
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
            style={{ overflow: "hidden" }}
          >
            <div style={{ gap: 16 }} className="flex flex-col pb-px pt-px">
              {sections.map((s, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <p className="font-medium text-[#0F0F0F]" style={{ fontSize: 16 }}>
                    {s.title}
                  </p>
                  <p className="font-medium" style={{ fontSize: 16, lineHeight: "110%", color: "rgba(15,15,15,0.5)" }}>
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
  const data = useMemo(() => CASES[slug], [slug]);

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
  className="relative flex min-h-0 shrink-0 flex-col justify-between overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:h-full"
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
              aria-label="Вернуться на главную"
              className="absolute inset-x-0 top-0 z-[5] h-[120px] rounded-[40px] rounded-b-none bg-transparent [-webkit-tap-highlight-color:transparent] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
            />
            <CornerMarks />

            <div className="relative z-[2] flex flex-col items-center gap-4 pt-5 pb-6">
              <h1 className="w-full px-4 text-center font-medium text-white" style={{ fontSize: 40, lineHeight: "110%" }}>
                {data.title}
              </h1>
              <p className="w-full px-4 text-center" style={{ fontSize: 16, lineHeight: "110%", color: "rgba(255,255,255,0.8)" }}>
                {data.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 px-2">
                {data.tags.map((t) => (
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
              <CollapsibleWhatIDidCard sections={data.sections} />
            </div>
          </div>
        </section>

        <section className="flex min-w-0 flex-col overflow-hidden lg:h-full lg:min-h-0 lg:flex-1">
  <div
    role="region"
    aria-label="Screenshots"
    className={
      isVerticalCase
        ? "flex h-full min-h-0 w-full min-w-0 flex-col items-stretch gap-4 overflow-y-auto overflow-x-hidden pb-2 pt-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        : "flex h-full min-h-0 w-full min-w-0 flex-row flex-nowrap items-end justify-start gap-2 overflow-x-auto overflow-y-hidden pb-2 pt-11 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden"
    }
  >
            {data.images.map((raw, idx) => {
              const { src, variant } = normalizedCaseImage(raw);
              const isWide = variant === "wide";

              return (
                <figure
                  key={`${slug}-${idx}-${src}`}
                  className={
                    isWide
                      ? isVerticalCase
                        ? "m-0 flex w-full shrink-0 overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                      : "m-0 flex h-[min(748px,calc(100vh-12rem))] w-fit shrink-0 snap-start overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)] lg:h-full"
                      : isVerticalCase
                        ? "m-0 w-full shrink-0 overflow-hidden rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                        : "m-0 flex h-full shrink-0 snap-start"
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
                          : "m-0 h-full w-auto max-w-none rounded-none bg-transparent object-contain"
                        : isVerticalCase
                          ? "h-auto w-full rounded-[40px] object-cover"
                          : "h-full w-auto shrink-0 rounded-[40px] object-cover shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
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

    </main>
  );
}
