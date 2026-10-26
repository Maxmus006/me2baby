"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Package, Truck, CheckCircle2, ShieldCheck, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/data/products";

export default function TrackOrderPage() {
  const [orderQuery, setOrderQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [orderData, setOrderData] = useState<{
    id: string;
    customer: string;
    status: string;
    currentStage: number;
    destination: string;
    estimatedDelivery: string;
    carrier: string;
    trackingCode: string;
    items: string[];
  } | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    // Simulate order tracking lookup
    setIsSearched(true);
    setOrderData({
      id: orderQuery.toUpperCase().startsWith("M2B-") ? orderQuery.toUpperCase() : `M2B-${orderQuery.toUpperCase()}`,
      customer: "Valued Atelier Patron",
      status: "In Transit — Out for Delivery Today",
      currentStage: 3,
      destination: "Boutique Residence, Mumbai, MH",
      estimatedDelivery: "Today by 6:00 PM IST",
      carrier: "BlueDart Premium Priority Express",
      trackingCode: "BD-849201938IN",
      items: [
        "1x The Butter-Soft High-Rise Legging (Rich Espresso / S)",
        "1x The Everyday Wire-Free Sculpt Bra (Warm Ivory / S)",
      ],
    });
  };

  const stages = [
    { label: "Order Received", desc: "Security verified & item selected" },
    { label: "Atelier Packaging", desc: "Sealed in discreet unbranded box with gold crest" },
    { label: "Dispatched & In Transit", desc: "Air courier express moving to hub" },
    { label: "Out for Delivery", desc: "Arriving with contact-free discreet delivery" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-sans font-semibold block mb-2">
            Priority Express Logistics
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#120E0D] font-normal">
            Track Your Premium Atelier Order
          </h1>
          <p className="text-xs text-[#766157] font-sans mt-2">
            Enter your order confirmation number (e.g. M2B-849201) or 10-digit mobile number to view live courier transit milestones.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white p-6 sm:p-8 rounded-xs border border-[#C5A059]/40 shadow-sm max-w-xl mx-auto mb-12">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#120E0D] font-sans block">
                Order ID or Registered Mobile Number
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[#766157] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={orderQuery}
                  onChange={(e) => setOrderQuery(e.target.value)}
                  placeholder="e.g. M2B-849201 or 9820123456"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#D9C7B3] text-xs text-[#120E0D] placeholder:text-[#766157]/60 focus:outline-hidden focus:border-[#000000] rounded-2xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-piano-black py-3.5 text-xs font-semibold tracking-wider uppercase cursor-pointer"
            >
              Locate Order Transit Status
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#D9C7B3]/30 flex justify-between items-center text-[11px] text-[#766157]">
            <span>Need immediate human help?</span>
            <a
              href={BRAND_CONFIG.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-[#120E0D] font-semibold hover:underline flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Live Result */}
        {isSearched && orderData && (
          <div className="bg-white p-6 sm:p-10 rounded-xs border border-[#D4AF37]/40 shadow-lg animate-fadeIn space-y-8">
            {/* Top Status Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#D9C7B3]/40">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#D4AF37] font-bold">
                  LIVE CONSIGNMENT: {orderData.id}
                </span>
                <h3 className="font-serif text-2xl text-[#120E0D] mt-0.5">
                  {orderData.status}
                </h3>
                <span className="text-xs text-[#766157]">
                  Estimated Delivery: <strong className="text-[#120E0D]">{orderData.estimatedDelivery}</strong>
                </span>
              </div>

              <div className="bg-[#FAF7F2] px-4 py-2.5 rounded-2xs border border-[#C5A059]/40 text-right">
                <span className="text-[10px] text-[#766157] uppercase tracking-wider block font-mono">Courier Partner</span>
                <span className="text-xs font-semibold text-[#120E0D]">{orderData.carrier}</span>
                <span className="text-[10px] text-[#766157] font-mono block">AWB: {orderData.trackingCode}</span>
              </div>
            </div>

            {/* Step Timeline */}
            <div className="relative py-4">
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-0.5 bg-[#D9C7B3]/50 -translate-y-1/2 z-0" />
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative z-10">
                {stages.map((stage, idx) => {
                  const isDone = idx <= orderData.currentStage;
                  const isCurrent = idx === orderData.currentStage;
                  return (
                    <div key={idx} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-xs font-bold transition-all ${
                          isDone
                            ? "bg-[#000000] text-white border-2 border-[#D4AF37] shadow-md"
                            : "bg-[#F3EDE5] text-[#766157] border border-[#D9C7B3]"
                        } ${isCurrent ? "scale-110 ring-4 ring-[#D4AF37]/30" : ""}`}
                      >
                        {isDone ? <CheckCircle2 className="w-5 h-5 text-[#F4E8C1]" /> : idx + 1}
                      </div>
                      <div>
                        <span className={`text-xs font-semibold block ${isDone ? "text-[#120E0D]" : "text-[#766157]"}`}>
                          {stage.label}
                        </span>
                        <span className="text-[10px] text-[#766157] leading-tight block">
                          {stage.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Packaging Guarantee */}
            <div className="bg-[#F3EDE5]/60 p-4 rounded-xs border border-[#C5A059]/30 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
              <div className="text-xs text-[#120E0D]">
                <strong>100% Plain Outer Packaging Verified:</strong> Your shipment is safely packed in an anonymous recycled kraft parcel with zero external brand names or intimates labelling.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
