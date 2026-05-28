"use client";

import { useEffect, useState } from "react";

type SlotLoaderProps = {
  onFinish: () => void;
};

export default function SlotLoader({ onFinish }: SlotLoaderProps) {
  const [numbers, setNumbers] = useState([1, 2, 9]);
  const [isFinal, setIsFinal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const appearTimer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const spinInterval = window.setInterval(() => {
      setNumbers([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]);
    }, 70);

    const stopTimer = window.setTimeout(() => {
      window.clearInterval(spinInterval);
      setNumbers([0, 0, 0]);
      setIsFinal(true);
    }, 2800);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, 4800);

    return () => {
      window.clearTimeout(appearTimer);
      window.clearInterval(spinInterval);
      window.clearTimeout(stopTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F]/90 backdrop-blur-[18px] transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
      }}
    >
      <div className="flex gap-8">
        {numbers.map((number, index) => {
          const prev = number === 0 ? 9 : number - 1;
          const next = number === 9 ? 0 : number + 1;

          return (
            <div
              key={index}
              className="relative flex h-[236px] w-[250px] items-center justify-center overflow-hidden rounded-[52px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              }}
            >
              <span
                className="absolute left-1/2 top-[-42px] -translate-x-1/2 text-[150px] font-semibold leading-none text-white/18"
                style={{ letterSpacing: "-0.08em" }}
              >
                {prev}
              </span>

              <span
                className="relative z-10 text-[150px] font-semibold leading-none text-white transition-all duration-100"
                style={{
                  letterSpacing: "-0.08em",
                  transform: isFinal ? "translateY(0)" : "translateY(-2px)",
                }}
              >
                {number}
              </span>

              <span
                className="absolute bottom-[-42px] left-1/2 -translate-x-1/2 text-[150px] font-semibold leading-none text-white/18"
                style={{ letterSpacing: "-0.08em" }}
              >
                {next}
              </span>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-[72px] bg-gradient-to-b from-[#0F0F0F]/45 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[72px] bg-gradient-to-t from-[#0F0F0F]/45 to-transparent" />
            </div>
          );
        })}
      </div>
    </div>
  );
}