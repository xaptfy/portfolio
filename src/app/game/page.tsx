"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";


const DOT_GRID = {
  backgroundColor: "#0F0F0F",
  backgroundImage:
    "radial-gradient(circle, rgba(217,217,217,0.1) 2px, transparent 2px)",
  backgroundSize: "36px 36px",
} as const;

type Brick = {
  x: number;
  y: number;
  r: number;
  active: boolean;
};


type GameStatus = "idle" | "playing" | "lost" | "won";

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
const [bestScore, setBestScore] = useState(0);
const scoreRef = useRef(0);
const bestScoreRef = useRef(0);
  const lang =
  typeof window !== "undefined" &&
  sessionStorage.getItem("homeLang") === "en"
    ? "en"
    : "ru";

  const statusRef = useRef<GameStatus>("idle");
  const animationRef = useRef<number | null>(null);

  const paddleRef = useRef({
    width: 280,
    height: 12,
    x: 0,
    y: 0,
  });


  const ballRef = useRef({
    x: 0,
    y: 0,
    r: 15,
    dx: 5,
    dy: -5,
    speed: 6,
  });

  const bricksRef = useRef<Brick[]>([]);

  const widthRef = useRef(0);
  const heightRef = useRef(0);

  const setStatus = (next: GameStatus) => {
    statusRef.current = next;
    setGameStatus(next);
  };

  const resetGameRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const best = localStorage.getItem("bestScore");

    if (best) {
      const value = Number(best);
    
      setBestScore(value);
      bestScoreRef.current = value;
    }

    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
widthRef.current = width;
heightRef.current = height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const paddle = paddleRef.current;
      paddle.width = width < 768 ? 160 : 280;
paddle.y = height - 96;if (paddle.x + paddle.width > width - 24) {
  paddle.x = width - paddle.width - 24;
}
      

      if (paddle.x === 0) {
        paddle.x = width / 2 - paddle.width / 2;
      } else {
        if (paddle.x < 24) paddle.x = 24;
        if (paddle.x + paddle.width > width - 24) {
          paddle.x = width - paddle.width - 24;
        }
      }

      if (statusRef.current === "idle") {
        const ball = ballRef.current;
        ball.x = paddle.x + paddle.width / 2;
        ball.y = paddle.y - 28;
      }
    };

    const createBricks = () => {
      const width = widthRef.current;
      const bricks: Brick[] = [];

      const isMobile = width < 768;

const r = isMobile ? 13 : 10;
const gap = isMobile ? 14 : 24;

const startY = isMobile ? 18 : 90;
const rows = isMobile ? 8 : 9;

const step = r * 2 + gap;
const cols = isMobile ? 8 : Math.ceil((width - 160) / step);

const totalWidth =
  (cols - 1) * step + r * 2;

const startX =
  (width - totalWidth) / 2;


for (let row = 0; row < rows; row++) {
  const rowShift = row % 2 === 0 ? 0 : step * 0.35;
const currentCols =
  row % 2 === 0
    ? cols
    : cols - 1;

for (let col = 0; col < currentCols; col++) {
    bricks.push({
      x: startX + col * step + rowShift + r,
      y: startY + row * step + r,
      r,
      active: true,
    });
  }
}

      bricksRef.current = bricks;
    };

    const resetGame = () => {
      const width = widthRef.current;
      const height = heightRef.current;

      const paddle = paddleRef.current;
      const ball = ballRef.current;

      paddle.x = width / 2 - paddle.width / 2;
      paddle.y = height - 96;

      ball.x = paddle.x + paddle.width / 2;
      ball.y = paddle.y - 28;
      ball.dx = 5;
      ball.dy = -5;

      createBricks();

scoreRef.current = 0;
setScore(0);

setStatus("idle");
    };

    resetGameRef.current = resetGame;

    const movePaddle = (clientX: number) => {
      const paddle = paddleRef.current;
      const width = widthRef.current;

      paddle.x = clientX - paddle.width / 2;

      if (paddle.x < 24) paddle.x = 24;
      if (paddle.x + paddle.width > width - 24) {
        paddle.x = width - paddle.width - 24;
      }

      if (statusRef.current === "idle") {
        const ball = ballRef.current;
        ball.x = paddle.x + paddle.width / 2;
        ball.y = paddle.y - 28;
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      movePaddle(event.clientX);
    };

    const onTouchMove = (event: TouchEvent) => {
      movePaddle(event.touches[0].clientX);
    };

    const onClick = () => {
      if (statusRef.current === "idle") {
        setStatus("playing");
      }
    };

    const drawBricks = () => {
      ctx.fillStyle = "#FFFFFF";

      bricksRef.current.forEach((brick) => {
        if (!brick.active) return;

        ctx.beginPath();
        ctx.arc(brick.x, brick.y, brick.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPaddle = () => {
      const paddle = paddleRef.current;

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(paddle.x, paddle.y, paddle.width, paddle.height, 100);
      ctx.fill();
    };

    const drawBall = () => {
      const ball = ballRef.current;

      ctx.fillStyle = "#006BFF";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawIdleHint = () => {
      if (statusRef.current !== "idle") return;

      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.font = "500 24px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Click to launch the ball",
        widthRef.current / 2,
        heightRef.current - 150
      );
    };

    const update = () => {
      if (statusRef.current !== "playing") return;

      const width = widthRef.current;
      const height = heightRef.current;
      const paddle = paddleRef.current;
      const ball = ballRef.current;

      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.x - ball.r <= 0 || ball.x + ball.r >= width) {
        ball.dx *= -1;
      }

      if (ball.y - ball.r <= 0) {
        ball.dy *= -1;
      }

      const hitPaddle =
        ball.y + ball.r >= paddle.y &&
        ball.y + ball.r <= paddle.y + paddle.height + 14 &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width;

      if (hitPaddle) {
        const hitPoint =
          (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);

        ball.dx = hitPoint * ball.speed;
        ball.dy = -Math.abs(ball.dy);
        ball.y = paddle.y - ball.r - 1;
      }

      for (const brick of bricksRef.current) {
        if (!brick.active) continue;

        const dx = ball.x - brick.x;
        const dy = ball.y - brick.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < ball.r + brick.r) {
          brick.active = false;
        
          scoreRef.current += 1;
setScore(scoreRef.current);
        
          ball.dy *= -1;
          break;
        }
      }

      if (bricksRef.current.every((brick) => !brick.active)) {
        setStatus("won");
      }

      if (ball.y - ball.r > height) {
        const finalScore = scoreRef.current;
      
        if (finalScore > bestScoreRef.current) {
          bestScoreRef.current = finalScore;
      
          setBestScore(finalScore);
      
          localStorage.setItem(
            "bestScore",
            String(finalScore)
          );
        }
      
        setStatus("lost");
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, widthRef.current, heightRef.current);

      drawBricks();
      drawPaddle();
      drawBall();
      drawIdleHint();

      update();

      animationRef.current = requestAnimationFrame(loop);
    };

    resize();
    resetGame();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("click", onClick);

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleRestart = () => {
    resetGameRef.current?.();
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={DOT_GRID}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />

      <Link
        href="/"
        className="fixed bottom-8 left-8 z-20 flex size-[52px] items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur transition-transform hover:scale-105 active:scale-95"
        aria-label="Back to home"
      >
        <span className="text-[22px] font-medium leading-none">N</span>
      </Link>

      {gameStatus === "lost" ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/55 backdrop-blur-[12px]">
          <Link
  href="/"
  className="absolute right-8 top-8 text-white/70 transition-opacity hover:text-white"
  style={{
    fontSize: 52,
    lineHeight: 1,
    fontWeight: 300,
  }}
>
  ×
</Link>
          <div className="flex w-full max-w-[520px] flex-col items-center px-6 text-center text-white">
          <div className="mb-6 overflow-hidden rounded-[40px]">
  <video
    src="/game/game-over.mp4"
    className="h-auto w-[280px] object-cover md:w-[360px]"
    autoPlay
    loop
    muted
    playsInline
  />
</div>

            <h2
              className="mb-6 font-medium"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                lineHeight: "110%",
                letterSpacing: "-0.04em",
              }}
            >
              {lang === "en" ? "Game Over" : "Айййй"}
            </h2>
            <div className="mb-6 text-center">
  <p
    style={{
      fontSize: 18,
      opacity: 0.6,
      marginBottom: 4,
    }}
  >
    Score
  </p>

  <p
    style={{
      fontSize: 32,
      fontWeight: 500,
      lineHeight: "100%",
      marginBottom: 16,
    }}
  >
    {score}
  </p>

  <p
    style={{
      fontSize: 18,
      opacity: 0.6,
      marginBottom: 4,
    }}
  >
    Best
  </p>

  <p
    style={{
      fontSize: 32,
      fontWeight: 500,
      lineHeight: "100%",
    }}
  >
    {bestScore}
  </p>
</div>

            <button
              type="button"
              onClick={handleRestart}
              className="mb-4 flex h-[76px] w-full max-w-[400px] items-center justify-center rounded-full bg-white text-[#0F0F0F] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontSize: 24,
                lineHeight: "110%",
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              {lang === "en" ? "Play Again" : "Играть снова"}
            </button>
            <a
  href="https://t.me/xaptfy"
  target="_blank"
  rel="noreferrer"
  className="flex h-[76px] w-full max-w-[400px] items-center justify-center rounded-full border border-white/25 text-white transition-all hover:bg-white/5 hover:border-white/40"
  style={{
    fontSize: 22,
    lineHeight: "110%",
    fontWeight: 500,
    letterSpacing: "-0.04em",
  }}
>
  {lang === "en"
    ? "Invite me to your team →"
    : "Позови меня в свою команду →"}
</a>
            
          </div>
        </div>
      ) : null}

      {gameStatus === "won" ? (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/10 backdrop-blur-[8px]">
          <div className="flex w-full max-w-[520px] flex-col items-center px-6 text-center text-white">
            <h2
              className="mb-12 font-medium"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                lineHeight: "110%",
                letterSpacing: "-0.04em",
              }}
            >
              {lang === "en" ? "You Win" : "Ура, ты победил (-а)"}
            </h2>

            <button
              type="button"
              onClick={handleRestart}
              className="mb-6 flex h-[76px] w-full max-w-[400px] items-center justify-center rounded-full bg-white text-[#0F0F0F] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{
                fontSize: 28,
                lineHeight: "110%",
                fontWeight: 500,
                letterSpacing: "-0.04em",
              }}
            >
              {lang === "en" ? "Play" : "Играть снова"}
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}