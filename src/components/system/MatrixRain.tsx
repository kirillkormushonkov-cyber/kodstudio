"use client";

import * as React from "react";

const CHARS = "01{}[]()<>=+-*/&#@!?\\|^~$;:.";
const FONT_SIZE = 13;
const FPS = 18;

function initCanvas(canvas: HTMLCanvasElement, side: "left" | "right") {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const resize = () => {
    const margin = Math.floor((window.innerWidth - 1280) / 2);
    // Always show at least 80px, capped at margin+20 on large screens
    const stripW = margin > 0 ? Math.min(margin + 20, 200) : 80;
    canvas.width = stripW;
    canvas.height = window.innerHeight;
    canvas.style.width = `${stripW}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.display = "block";
  };
  resize();

  const cols = () => Math.max(1, Math.floor(canvas.width / FONT_SIZE));
  let drops = Array.from({ length: cols() }, () =>
    Math.floor(Math.random() * -60),
  );

  const draw = () => {
    ctx.fillStyle = "rgba(10, 10, 20, 0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${FONT_SIZE}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = CHARS[Math.floor(Math.random() * CHARS.length)];
      const x = i * FONT_SIZE;
      const y = drops[i] * FONT_SIZE;

      ctx.fillStyle = "rgba(167, 139, 250, 0.6)";
      ctx.fillText(char, x, y);
      ctx.fillStyle = "rgba(109, 40, 217, 0.3)";
      const prev = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(prev, x, y - FONT_SIZE);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };

  const onResize = () => {
    resize();
    drops = Array.from({ length: cols() }, () =>
      Math.floor(Math.random() * -60),
    );
  };
  window.addEventListener("resize", onResize);

  const interval = setInterval(draw, 1000 / FPS);
  return () => {
    clearInterval(interval);
    window.removeEventListener("resize", onResize);
  };
}

export function MatrixRain() {
  const leftRef = React.useRef<HTMLCanvasElement>(null);
  const rightRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c1 = leftRef.current ? initCanvas(leftRef.current, "left") : null;
    const c2 = rightRef.current ? initCanvas(rightRef.current, "right") : null;
    return () => { c1?.(); c2?.(); };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: 0,
    height: 0,
    zIndex: -1,
    pointerEvents: "none",
    opacity: 0.4,
    display: "none",
  };

  return (
    <>
      <canvas
        ref={leftRef}
        aria-hidden="true"
        style={{
          ...base,
          left: 0,
          maskImage: "linear-gradient(to right, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to right, black 0%, transparent 80%)",
        }}
      />
      <canvas
        ref={rightRef}
        aria-hidden="true"
        style={{
          ...base,
          right: 0,
          maskImage: "linear-gradient(to left, black 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 80%)",
        }}
      />
    </>
  );
}
