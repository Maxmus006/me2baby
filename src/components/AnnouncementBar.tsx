"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { BRAND_CONFIG } from "@/data/products";
import { Sparkles, X, ShieldCheck, Heart, Truck, Crown, MessageCircle } from "lucide-react";

export default function AnnouncementBar() {
  const { shippingRemaining, isFreeShipping, settings } = useStore();
  const [showNotice, setShowNotice] = useState(false);

  const marqueeText = settings?.announcementMarquee || "DIWALI LUXURY PRIVILEGE • 15% OFF ATELIER CODE: PREMIUM15 • COMPLIMENTARY EXPRESS DELIVERY ABOVE ₹1,999 • 100% DISCREET PACKAGING";

  return (
    <>
      {/* Top Premium Marquee Ticker with Piano Black & Gold Finishing */}
      <div className="bg-[#000000] text-[#F4E8C1] py-2 px-4 border-b border-[#D4AF37]/40 overflow-hidden relative">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* VIP Badge (Desktop) */}
          <button
            onClick={() => setShowNotice(!showNotice)}
            className="hidden lg:inline-flex items-center gap-1.5 text-[11px] text-[#F4E8C1] hover:text-white transition-colors shrink-0 pr-4 z-10 bg-[#0A0A0A] px-2.5 py-0.5 rounded-2xs border border-[#D4AF37]/40 cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-sans tracking-widest uppercase font-semibold">Me2baby Premium Privileges</span>
          </button>

          {/* Scrolling Animated Ticker */}
          <div className="overflow-hidden flex-1 relative whitespace-nowrap">
            <div className="animate-marquee font-sans tracking-widest text-[11px] sm:text-xs uppercase flex items-center gap-8">
              <span className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">👑</span>
                <span>{marqueeText}</span>
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                {isFreeShipping ? (
                  <span className="text-emerald-300 font-semibold">✨ Free Express Delivery Unlocked Across India</span>
                ) : (
                  <span>Complimentary Priority Express Above ₹{(settings?.freeShippingThreshold || BRAND_CONFIG.freeShippingThreshold).toLocaleString('en-IN')} (Add ₹{Math.round(shippingRemaining).toLocaleString('en-IN')} more)</span>
                )}
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>100% Plain Unbranded Discreet Packaging Guaranteed</span>
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span>Zero-Fee UPI, Cards &amp; Verified Cash on Delivery Accepted</span>
              <span className="text-[#D4AF37]">•</span>

              {/* Duplicate for seamless continuous looping */}
              <span className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">👑</span>
                <span>{marqueeText}</span>
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Complimentary Priority Express Above ₹{BRAND_CONFIG.freeShippingThreshold.toLocaleString('en-IN')}</span>
              </span>
            </div>
          </div>

          {/* Quick Contact & Currency Tag */}
          <div className="hidden md:flex items-center gap-3 text-[11px] font-sans shrink-0 pl-4 z-10">
            <span className="text-[#F4E8C1] font-mono font-bold bg-[#0A0A0A] px-2 py-0.5 rounded-2xs border border-[#D4AF37]/40">
              INR (₹)
            </span>
            <a
              href={BRAND_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-[#FAF7F2] hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-[11px] font-semibold"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Slide-down VIP Policy Notice Modal */}
      {showNotice && (
        <div className="bg-[#000000] text-[#FAF7F2] p-4 border-b border-[#D4AF37]/40 text-xs font-sans animate-fadeIn">
          <div className="max-w-4xl mx-auto flex items-start justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>Me2baby Premium Luxury Living Policy</span>
              </span>
              <p className="text-white/90 leading-relaxed">
                {BRAND_CONFIG.provisionalNotice} All apparel orders are packed in anonymous outer kraft packaging for 100% complete privacy. Cash on delivery and instant UPI are fully supported.
              </p>
            </div>
            <button
              onClick={() => setShowNotice(false)}
              className="text-[#D9C7B3] hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
