"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ShieldCheck, Truck, RefreshCw, Sparkles, MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/data/products";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Me2baby apparel truly 'Premium Luxury'?",
      a: "Every garment is crafted exclusively from ultra-rare tactile fabrics: 100% GOTS-certified organic cloud cotton, genuine Grade-6A 19mm Mulberry silk, and Austrian micro-modal. Our women's wire-free bras and butter leggings undergo 18 anatomical contour fittings to ensure zero rolling, pinching, or digging.",
    },
    {
      q: "How discreet is the shipping packaging?",
      a: "Discretion is our foremost pledge. Your order arrives in a completely plain, unbranded recycled kraft outer envelope or box. The shipping courier label lists the sender simply as 'M2B Retail Logistics' with no mention of intimate apparel, lingerie, or pyjamas.",
    },
    {
      q: "Do you accept Cash on Delivery (COD) and UPI in India?",
      a: "Yes! We proudly offer Cash on Delivery (COD) across 19,000+ pin codes in India. In addition, you can pay using instant zero-fee UPI (Google Pay, PhonePe, Paytm, BHIM) as well as all major Credit/Debit Cards and Netbanking.",
    },
    {
      q: "What is the Free Shipping threshold?",
      a: "All orders across India totaling ₹1,999 or more receive complimentary carbon-neutral priority express air delivery. Orders below ₹1,999 carry a flat priority delivery charge of ₹149.",
    },
    {
      q: "How do I choose the right size for the Wire-Free Sculpt Bra?",
      a: "Our Sculpt Bras are engineered with molded contour cups that gently adapt to your natural cup volume (A through DD). If you wear a 32B/32C, choose S. If you wear 34B/34C/34D, choose M. If you wear 36B/36C/36D, choose L. You can also use our Interactive Size Guide or chat with our WhatsApp stylist.",
    },
    {
      q: "Are the Butter-Soft High-Rise Leggings squat-proof and non-sheer?",
      a: "Yes, 100%. We use a high-density double-knit micro-nylon and Lycra blend with an ultra-soft peached tactile finish. Even in deep squats or bends, the fabric remains completely opaque, opaque under sunlight, and the waistband does not roll down.",
    },
    {
      q: "What is your Return and Exchange policy?",
      a: "We offer a 30-day effortless comfort guarantee. Leggings, sleepwear, robes, and unopened innerwear sets can be returned or exchanged for size with complimentary doorstep pickup. For hygiene reasons, individual unwrapped briefs cannot be returned once the protective hygienic seal is broken.",
    },
    {
      q: "Are the girls' pyjamas and innerwear safe for sensitive skin?",
      a: "Yes! Our Little Girls collection uses 100% GOTS-certified organic cotton with zero synthetic harsh dyes, formaldehyde, or heavy metals. All seam tags are replaced with printed scratch-free labels, and buttons are made from smooth natural mother-of-pearl.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Client Assistance
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#120E0D] font-normal">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[#766157] mt-3">
            Clear, transparent answers about our tactile fabrics, discreet courier deliveries, COD, and fit engineering.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white rounded-xs border border-[#C5A059]/40 divide-y divide-[#D9C7B3]/40 shadow-sm overflow-hidden mb-12">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="p-6 transition-colors">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center text-left gap-4 cursor-pointer"
                >
                  <h3 className="font-serif text-lg text-[#120E0D] font-medium">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-[#766157] leading-relaxed animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="bg-[#000000] text-white p-8 rounded-xs border border-[#D4AF37]/50 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-2xl text-white">Have a personal question?</h4>
            <p className="text-xs text-white/70">
              Our Mumbai atelier stylists are available 7 days a week on WhatsApp to assist you.
            </p>
          </div>
          <a
            href={BRAND_CONFIG.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-piano-black text-xs py-3 px-6 whitespace-nowrap flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat with Stylist</span>
          </a>
        </div>
      </div>
    </div>
  );
}
