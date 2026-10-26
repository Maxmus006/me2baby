"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Crown } from "lucide-react";

export default function BrandSplashLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter for 4 seconds (4000ms)
    const interval = 40; // every 40ms
    const step = 100 / (4000 / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(100, prev + step);
      });
    }, interval);

    // Fade out start at 3800ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 3600);

    // Unmount at 4200ms
    const finishTimer = setTimeout(() => {
      setVisible(false);
    }, 4200);

    return () => {
      clearInterval(timer);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    setFading(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-99999 flex flex-col items-center justify-center bg-[#000000] transition-all duration-700 select-none ${
        fading ? "opacity-0 pointer-events-none scale-102 blur-xs" : "opacity-100"
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 50% 65%, rgba(255, 255, 255, 0.04) 0%, transparent 70%)
        `,
      }}
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-[10px] tracking-[0.2em] uppercase font-sans text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors px-3 py-1.5 border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xs cursor-pointer"
      >
        Skip To Atelier ✕
      </button>

      {/* Main Luxury Brand Emblem */}
      <div className="relative flex flex-col items-center text-center px-6 max-w-lg">
        {/* Shimmering Gold Aura */}
        <div className="absolute -top-12 w-52 h-52 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse" />

        {/* Premium Crest */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-[#D4AF37]/70 flex items-center justify-center bg-radial from-[#1A1A1A] to-[#000000] shadow-[0_0_35px_rgba(212,175,55,0.35)]">
            <Crown className="w-8 h-8 text-[#D4AF37] stroke-[1.4]" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-[#F4E8C1] animate-spin" style={{ animationDuration: "8s" }} />
        </div>

        {/* Brand Name */}
        <div className="space-y-2 mb-6">
          <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-[#D4AF37] font-semibold flex items-center justify-center gap-2">
            <span className="w-6 h-px bg-linear-to-r from-transparent to-[#D4AF37]" />
            PREMIUM LUXURY ATELIER
            <span className="w-6 h-px bg-linear-to-l from-transparent to-[#D4AF37]" />
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl text-[#FAF7F2] tracking-[0.14em] font-light">
            Me<span className="text-[#D4AF37] italic">2</span>baby
          </h1>

          <p className="text-[12px] sm:text-xs text-[#D9C7B3]/90 font-sans tracking-[0.16em] uppercase max-w-sm mx-auto">
            Women&apos;s &amp; Girls&apos; Intimates • Night Comfort • Butter Leggings
          </p>
        </div>

        {/* 4-Second Animated Progress Bar */}
        <div className="w-64 max-w-full space-y-2 mt-4">
          <div className="h-[2px] w-full bg-[#1A1A1A] rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-[#D4AF37] via-[#FAF7F2] to-[#C5A059] transition-all duration-75 ease-linear rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-[#D9C7B3]/60">
            <span>PREPARING ATELIER</span>
            <span>{Math.round((progress / 100) * 4)}s / 4s</span>
          </div>
        </div>

        {/* Quality Seal */}
        <div className="mt-8 flex items-center gap-3 text-[10px] text-[#D4AF37]/80 tracking-widest uppercase font-sans">
          <span>Pure Silk</span>
          <span>•</span>
          <span>Austrian Modal</span>
          <span>•</span>
          <span>Organic Cloud Cotton</span>
        </div>
      </div>
    </div>
  );
}
