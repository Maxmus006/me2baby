"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function BackgroundAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Subtle mood variant depending on page
  let themeVariant = "atelier";
  if (pathname.includes("admin")) {
    themeVariant = "admin";
  } else if (pathname.includes("login") || pathname.includes("account")) {
    themeVariant = "portal";
  } else if (pathname.includes("shop") || pathname.includes("product")) {
    themeVariant = "boutique";
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for luxury parallax drift
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rich Particle Architecture
    interface LuxuryParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;
      phase: number;
      pulseSpeed: number;
      type: "ember" | "star" | "bokeh";
      color: string;
    }

    const particles: LuxuryParticle[] = [];
    const particleCount = 45;

    // Palette of shimmering champagne gold, pearl silk, and soft starlight
    const luxuryColors = [
      "rgba(212, 175, 55, 0.45)",  // Pure Champagne Gold
      "rgba(244, 232, 193, 0.40)", // Soft Silk Warm Light
      "rgba(255, 255, 255, 0.48)", // Starlight Pearl
      "rgba(197, 160, 89, 0.35)",  // Burnished Gold
      "rgba(226, 203, 153, 0.30)", // Velvet Cashmere
    ];

    for (let i = 0; i < particleCount; i++) {
      const typeRoll = Math.random();
      let type: "ember" | "star" | "bokeh" = "ember";
      let size = Math.random() * 2.2 + 0.8;

      if (typeRoll > 0.8) {
        type = "star";
        size = Math.random() * 3 + 1.5;
      } else if (typeRoll > 0.6) {
        type = "bokeh";
        size = Math.random() * 5 + 3;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35 - 0.1, // gentle upward drift like silk dust
        size,
        baseAlpha: Math.random() * 0.5 + 0.25,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        type,
        color: luxuryColors[Math.floor(Math.random() * luxuryColors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      ctx.clearRect(0, 0, width, height);

      const mouseNormX = (mouse.x / width - 0.5) * 40;
      const mouseNormY = (mouse.y / height - 0.5) * 30;

      // --- LAYER 1: Flowing Silk Aurora Waves ---
      // Wave 1: Golden Silk Filament
      ctx.save();
      ctx.beginPath();
      const wave1Y = height * 0.32 + Math.sin(time * 0.7) * 45 + mouseNormY * 0.5;
      ctx.moveTo(-50, wave1Y);
      ctx.bezierCurveTo(
        width * 0.28 + mouseNormX * 0.8,
        wave1Y - 90 + Math.cos(time * 0.5) * 40,
        width * 0.68 - mouseNormX * 0.8,
        wave1Y + 90 + Math.sin(time * 0.6) * 40,
        width + 50,
        wave1Y - 30
      );
      const grad1 = ctx.createLinearGradient(0, wave1Y - 60, width, wave1Y + 60);
      grad1.addColorStop(0, "rgba(212, 175, 55, 0.0)");
      grad1.addColorStop(0.3, "rgba(212, 175, 55, 0.07)");
      grad1.addColorStop(0.7, "rgba(244, 232, 193, 0.09)");
      grad1.addColorStop(1, "rgba(212, 175, 55, 0.0)");
      ctx.strokeStyle = grad1;
      ctx.lineWidth = 75;
      ctx.filter = "blur(12px)";
      ctx.stroke();
      ctx.restore();

      // Wave 2: Pearl Ivory Undulation
      ctx.save();
      ctx.beginPath();
      const wave2Y = height * 0.68 + Math.cos(time * 0.6) * 55 - mouseNormY * 0.6;
      ctx.moveTo(-50, wave2Y + 30);
      ctx.bezierCurveTo(
        width * 0.35 - mouseNormX,
        wave2Y + 110 + Math.sin(time * 0.8) * 45,
        width * 0.72 + mouseNormX,
        wave2Y - 80 + Math.cos(time * 0.7) * 40,
        width + 50,
        wave2Y + 40
      );
      const grad2 = ctx.createLinearGradient(0, wave2Y - 50, width, wave2Y + 80);
      grad2.addColorStop(0, "rgba(255, 255, 255, 0.0)");
      grad2.addColorStop(0.4, "rgba(244, 232, 193, 0.06)");
      grad2.addColorStop(0.8, "rgba(212, 175, 55, 0.05)");
      grad2.addColorStop(1, "rgba(255, 255, 255, 0.0)");
      ctx.strokeStyle = grad2;
      ctx.lineWidth = 90;
      ctx.filter = "blur(18px)";
      ctx.stroke();
      ctx.restore();

      // Wave 3: Delicate Gold Filament Contour
      ctx.save();
      ctx.beginPath();
      const wave3Y = height * 0.5 + Math.sin(time * 0.9) * 35;
      ctx.moveTo(-30, wave3Y);
      ctx.bezierCurveTo(
        width * 0.42 + mouseNormX * 0.4,
        wave3Y - 50 + Math.cos(time * 0.6) * 25,
        width * 0.62 - mouseNormX * 0.4,
        wave3Y + 50 + Math.sin(time * 0.7) * 25,
        width + 30,
        wave3Y - 15
      );
      ctx.strokeStyle = "rgba(212, 175, 55, 0.12)";
      ctx.lineWidth = 1.8;
      ctx.stroke();
      ctx.restore();

      // --- LAYER 2: Luminous Floating Particles & Star Dust ---
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const pulse = Math.sin(time * 60 * p.pulseSpeed + p.phase) * 0.35 + 0.65;
        const currentAlpha = p.baseAlpha * pulse;

        ctx.save();
        ctx.globalAlpha = currentAlpha;

        if (p.type === "star") {
          // Draw sparkling 4-point luxury star
          ctx.translate(p.x, p.y);
          ctx.rotate(time * 0.5 + p.phase);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;

          ctx.beginPath();
          const s = p.size * pulse;
          ctx.moveTo(0, -s * 2);
          ctx.quadraticCurveTo(0, 0, s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 2);
          ctx.quadraticCurveTo(0, 0, -s * 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 2);
          ctx.fill();
        } else if (p.type === "bokeh") {
          // Soft luxury bokeh orb
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          ctx.fill();

          // Outer delicate ring
          ctx.strokeStyle = "rgba(212, 175, 55, 0.2)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        } else {
          // Ambient golden ember
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * pulse, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [themeVariant]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
