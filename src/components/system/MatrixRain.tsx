"use client";

import * as React from "react";

const CHARS = "01{}[]()<>=+-*/&#@!?\\|^~$;:.";
const FONT_SIZE = 13;
const FPS = 18;

function initCanvas(canvas: HTMLCanvasElement, side: "left" | "right") {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const stripW = Math.floor(window.innerWidth * 0.13);
  canvas.width = stripW;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.zIndex = "1";
  canvas.style.pointerEvents = "none";
  if (side === "left") canvas.style.left = "0";
  else canvas.style.right = "0";

  const cols = Math.max(1, Math.floor(stripW / FONT_SIZE));
  const drops = Array.from({ length: cols }, () =>
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

      // bright head
      ctx.fillStyle = "rgba(167, 139, 250, 0.55)";
      ctx.fillText(char, x, y);

      // dim trail
      ctx.fillStyle = "rgba(109, 40, 217, 0.25)";
      const prev = CHARS[Math.floor(Math.random() * CHARS.length)];
      ctx.fillText(prev, x, y - FONT_SIZE);

      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  };

  const interval = setInterval(draw, 1000 / FPS);

  const onResize = () => {
    const newW = Math.floor(window.innerWidth * 0.13);
    canvas.width = newW;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", onResize);

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

  return (
    <>
      <canvas ref={leftRef} aria-hidden="true" style={{ opacity: 0.35 }} />
      <canvas ref={rightRef} aria-hidden="true" style={{ opacity: 0.35 }} />
    </>
  );
}
