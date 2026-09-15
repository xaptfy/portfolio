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
    }, 50);

    const spinInterval = window.setInterval(() => {
      setNumbers([
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
      ]);
    }, 55);

    const stopTimer = window.setTimeout(() => {
      window.clearInterval(spinInterval);
      setNumbers([0, 0, 0]);
      setIsFinal(true);
    }, 850);

    const finishTimer = window.setTimeout(() => {
      onFinish();
    }, 1200);

    return () => {
      window.clearTimeout(appearTimer);
      window.clearInterval(spinInterval);
      window.clearTimeout(stopTimer);
      window.clearTimeout(finishTimer);
    };
  }, [onFinish]);


  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0F0F0F] backdrop-blur-[18px]">
      <div
className="flex gap-8 max-md:w-full max-md:gap-2 max-md:px-2 transition-opacity duration-200"
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      >
        {numbers.map((number, index) => {
          const prev = number === 0 ? 9 : number - 1;
          const next = number === 9 ? 0 : number + 1;

          return (
            <div
              key={index}
              className="relative flex h-[236px] w-[250px] shrink-0 items-center justify-center overflow-hidden rounded-[52px]
max-md:h-[150px] max-md:w-[calc((100vw-40px)/3)] max-md:rounded-[28px]"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              }}
            >              <span
              className="absolute left-1/2 top-[-42px] -translate-x-1/2 text-[150px] font-semibold leading-none text-white/18 max-md:top-[-30px] max-md:text-[105px]"
              style={{ letterSpacing: "-0.08em" }}
            >
                {prev}
              </span>

              <span
                className="relative z-10 text-[150px] font-semibold leading-none text-white transition-all duration-100 max-md:text-[105px]"
                style={{
                  letterSpacing: "-0.08em",
                  transform: isFinal ? "translateY(0)" : "translateY(-2px)",
                }}
              >
                {number}
              </span>

              <span
                className="absolute bottom-[-42px] left-1/2 -translate-x-1/2 text-[150px] font-semibold leading-none text-white/18 max-md:bottom-[-30px] max-md:text-[105px]"
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