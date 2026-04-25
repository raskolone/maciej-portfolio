/* =============================================================
   DESIGN: Dark Constellation — Animated Canvas Background
   Stars + connecting lines, reacts to mouse movement
   Dark: bright white stars + green lines on deep black-green bg
   Light: dark navy stars + green lines on pale green-white bg
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

const STAR_COUNT = 110;
const CONNECTION_DIST = 140;
const MOUSE_DIST = 180;

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

    // Dark: white stars, green lines
    // Light: dark navy stars, dark green lines
    const starColor = isDark ? "200,230,210" : "15,40,25";
    const lineColor = isDark ? "80,200,120" : "30,120,60";

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Init stars
    starsRef.current = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      radius: Math.random() * 1.8 + 0.6,
      opacity: Math.random() * 0.45 + 0.45,  // 0.45–0.90 — more visible
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const stars = starsRef.current;

      // Draw connections between stars
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            // More visible lines: alpha up to 0.35
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Mouse connections — bright green glow lines
        const mdx = stars[i].x - mouseRef.current.x;
        const mdy = stars[i].y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < MOUSE_DIST) {
          const alpha = (1 - mdist / MOUSE_DIST) * 0.6;
          ctx.beginPath();
          ctx.moveTo(stars[i].x, stars[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(${lineColor},${alpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }

      // Draw stars with subtle glow
      for (const star of stars) {
        // Glow halo
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 3
        );
        gradient.addColorStop(0, `rgba(${starColor},${star.opacity})`);
        gradient.addColorStop(1, `rgba(${starColor},0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starColor},${star.opacity})`;
        ctx.fill();

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
