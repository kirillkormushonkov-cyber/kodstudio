"use client";

import * as React from "react";

const CHARS = "01{}[]()<>=+-*/&#@!?\\|^~$;:.,'`";
const FONT_SIZE = 13;
const SIDE_WIDTH = 0.14; // fraction of viewport width for each side strip
const FPS = 18;
const OPACITY = 0.045; // very subtle — just atmosphere

export function MatrixRain() {
  const leftRef = React.useRef<HTMLCanvasElement>(null);
  const rightRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setup = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const resize = () => {
        const stripW = Math.floor(window.innerWidth * SIDE_WIDTH);
        canvas.width = stripW;
        canvas.height = window.innerHeight;
        return stripW;
      };

      let w = resize();
      const cols = Math.floor(w / FONT_SIZE);
      const drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -50),
      );

      const draw = () => {
        ctx.fillStyle = "rgba(10, 10, 20, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < drops.length; i++) {
          const char = CHARS[Math.floor(Math.random() * CHARS.length)];
          const y = drops[i] * FONT_SIZE;

          // Head — brighter
          ctx.fillStyle = `rgba(167, 139, 250, ${OPACITY * 5})`;
          ctx.font = `${FONT_SIZE}px monospace`;
          ctx.fillText(char, i * FONT_SIZE, y);

          // Trail — dimmer
          if (drops[i] > 2) {
            ctx.fillStyle = `rgba(139, 92, 246, ${OPACITY * 2})`;
            const prev = CHARS[Math.floor(Math.random() * CHARS.length)];
            ctx.fillText(prev, i * FONT_SIZE, y - FONT_SIZE);
          }

          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const onResize = () => {
        w = resize();
        const newCols = Math.floor(w / FONT_SIZE);
        drops.length = newCols;
        for (let i = drops.length; i < newCols; i++) {
          drops[i] = Math.floor(Math.random() * -30);
        }
      };

      window.addEventListener("resize", onResize);

      const interval = setInterval(draw, 1000 / FPS);

      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", onResize);
      };
    };

    const cleanups: Array<(() => void) | undefined> = [];
    if (leftRef.current) cleanups.push(setup(leftRef.current) ?? undefined);
    if (rightRef.current) cleanups.push(setup(rightRef.current) ?? undefined);

    return () => cleanups.forEach((fn) => fn?.());
  }, []);

  const canvasClass =
    "pointer-events-none fixed top-0 h-full w-[14vw] opacity-100 select-none";

  return (
    <>
      <canvas ref={leftRef} className={`${canvasClass} left-0`} aria-hidden="true" />
      <canvas ref={rightRef} className={`${canvasClass} right-0`} aria-hidden="true" />
    </>
  );
}
