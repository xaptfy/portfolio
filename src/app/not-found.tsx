import Link from "next/link";


const DOT_GRID = {
  backgroundColor: "#0F0F0F",
  backgroundImage:
    "radial-gradient(circle, rgba(217,217,217,0.1) 2px, transparent 2px)",
  backgroundSize: "36px 36px",
} as const;

export default function NotFound() {
  return (
    <main
      className="flex min-h-screen w-full items-center justify-center px-6 text-white"
      style={DOT_GRID}
    >
      <div className="flex w-full max-w-[520px] flex-col items-center text-center">
        <div className="mb-8 overflow-hidden">
          <img
            src="/404/cat.png"
            alt=""
            className="h-auto w-[280px] object-cover md:w-[360px]"
          />
        </div>

        <h1
          className="mb-14 font-medium"
          style={{
            fontSize: "clamp(28px, 4vw, 40px)",
            lineHeight: "110%",
            letterSpacing: "-0.04em",
          }}
        >
          Пока тут не заехал кейс,
          <br />
          но ты можешь поиграть
        </h1>

        <Link
  href="/game"
  className="mb-10 flex h-[76px] w-full max-w-[400px] items-center justify-center rounded-full bg-white text-[#0F0F0F] transition-transform hover:scale-[1.02] active:scale-[0.98]"
  style={{
    fontSize: 28,
    lineHeight: "110%",
    fontWeight: 500,
    letterSpacing: "-0.04em",
  }}
>
  Играть
</Link>

        <Link
          href="/"
          className="text-white transition-opacity hover:opacity-70"
          style={{
            fontSize: 28,
            lineHeight: "110%",
            fontWeight: 500,
            letterSpacing: "-0.04em",
          }}
        >
          На главную
        </Link>
      </div>
    </main>
  );
}