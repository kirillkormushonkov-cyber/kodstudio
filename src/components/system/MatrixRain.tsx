"use client";

import * as React from "react";

const CHARS = "01{}[]()<>=+-*/&#@!?\\|^~$;:.";
const FONT_SIZE = 13;
const FPS = 18;
// max-w-7xl = 1280px; px-8 = 32px padding on each side
const CONTENT_MAX_W = 1280;
const CONTAINER_PAD = 32;

function initCanvas(canvas: HTMLCanvasElement, side: "left" | "right") {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const resize = () => {
    const margin = Math.floor((window.innerWidth - CONTENT_MAX_W) / 2);
    // Hide when there is no margin space outside the content container
    if (margin < 40) {
      canvas.style.display = "none";
      return;
    }
    // Canvas width = margin area + extra buffer for a smooth fade tail
    const stripW = Math.min(margin + 120, 600);
    canvas.width = stripW;
    canvas.height = window.innerHeight;
    canvas.style.width = `${stripW}px`;
    canvas.style.height = `${window.innerHeight}px`;
    canvas.style.display = "block";

    // Fade to transparent before the content text begins (margin + container padding)
    const contentEdge = margin + CONTAINER_PAD;
    const fadePct = Math.round(Math.min((contentEdge / stripW) * 100, 90));
    const grad =
      side === "left"
        ? `linear-gradient(to right, black 0%, transparent ${fadePct}%)`
        : `linear-gradient(to left, black 0%, transparent ${fadePct}%)`;
    canvas.style.maskImage = grad;
    (canvas.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = grad;
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
    opacity: 0.55,
    display: "none",
  };

  return (
    <>
      <canvas ref={leftRef} aria-hidden="true" style={{ ...base, left: 0 }} />
      <canvas ref={rightRef} aria-hidden="true" style={{ ...base, right: 0 }} />
    </>
  );
}
