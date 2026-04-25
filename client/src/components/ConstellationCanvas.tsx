/* =============================================================
   DESIGN: Dark Constellation — Animated Canvas Background
   Pure black bg, bright white stars with glow, vivid green lines
   ============================================================= */

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

const CONNECTION_DIST = 150;
const MOUSE_DIST = 200;

export default function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = theme !== "light";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Reduce star count by half on mobile (< 768px)
      const isMobile = canvas.width < 768;
      const starCount = isMobile ? 50 : 100;
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        radius: Math.random() * 1.6 + 0.7,
        opacity: Math.random() * 0.35 + 0.65,  // 0.65–1.0 — bright
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stars = starsRef.current;

      // Draw connections between nearby stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = isDark
              ? (1 - dist / CONNECTION_DIST) * 0.55   // bright on dark
              : (1 - dist / CONNECTION_DIST) * 0.4;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(80, 200, 120, ${alpha})`
              : `rgba(20, 110, 50, ${alpha})`;
            ctx.lineWidth = isDark ? 0.8 : 0.7;
            ctx.stroke();
          }
        }

        // Mouse connections — bright green
        const mdx = stars[i].x - mouseRef.current.x;
        const mdy = stars[i].y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.75;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = isDark
            ? `rgba(100, 230, 140, ${alpha})`
            : `rgba(20, 110, 50, ${alpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      // Draw stars
      for (const star of stars) {
        if (isDark) {
          // Glow halo — soft white
          const grd = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.radius * 4
          );
          grd.addColorStop(0, `rgba(255,255,255,${star.opacity * 0.6})`);
          grd.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Bright core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
          ctx.fill();
        } else {
          // Light mode: dark navy dots
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,40,20,${star.opacity * 0.7})`;
          ctx.fill();
        }

        // Move
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
