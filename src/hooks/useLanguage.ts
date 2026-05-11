"use client";

import { useEffect, useState } from "react";

export type Lang = "ru" | "en";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("ru");

  useEffect(() => {
    const savedLang = localStorage.getItem("siteLang");
    if (savedLang === "ru" || savedLang === "en") {
      setLang(savedLang);
    }
  }, []);

  const switchLanguage = () => {
    setLang((current) => {
      const next = current === "ru" ? "en" : "ru";
      localStorage.setItem("siteLang", next);
      return next;
    });
  };

  return { lang, switchLanguage };
}