import type { CSSProperties, ReactNode } from "react";

type LiquidGlassProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const LIQUID_GLASS_STYLE: CSSProperties = {
  position: "relative",
  background: "rgba(244, 244, 244, 0.03)",
  boxShadow: `
    inset 0 1px 1px rgba(255,255,255,0.34),
    inset 1px 0 1px rgba(255,255,255,0.16),
    inset 0 -1px 1px rgba(255,255,255,0.08),
    0 14px 36px rgba(0,0,0,0.24)
  `,
  backdropFilter: "blur(4px) saturate(115%) brightness(108%)",
  WebkitBackdropFilter: "blur(4px) saturate(115%) brightness(108%)",
  overflow: "hidden",
};

export default function LiquidGlass({
  children,
  className = "",
  style,
}: LiquidGlassProps) {
  return (
    <div
      className={`${className} overflow-hidden`}
      style={{
        ...LIQUID_GLASS_STYLE,
        ...style,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          borderRadius: "inherit",
          background: `
            radial-gradient(
              circle at 12% 4%,
              rgba(255,255,255,0.12) 0%,
              rgba(255,255,255,0.04) 24%,
              transparent 52%
            ),
            linear-gradient(
              135deg,
              rgba(255,255,255,0.045) 0%,
              transparent 38%,
              rgba(255,255,255,0.015) 68%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-[1px] z-0"
        style={{
          borderRadius: "inherit",
          boxShadow: "inset 0 0 14px rgba(255,255,255,0.025)",
        }}
      />

      {children}
    </div>
  );
}