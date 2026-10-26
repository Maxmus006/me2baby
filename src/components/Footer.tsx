"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Sparkles,
  Check,
  Truck,
  CreditCard,
  Lock,
  Crown,
  MessageCircle,
} from "lucide-react";
import { BRAND_CONFIG } from "@/data/products";

export default function Footer() {
  const { openSizeGuide, showToast, isAdmin } = useStore();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [currency, setCurrency] = useState("INR (₹)");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      showToast("Please enter a valid email address.", "warning");
      return;
    }
    setSubscribed(true);
    showToast("👑 Welcome to Me2baby Premium Circle. 15% VIP Privilege unlocked.", "success");
    setEmail("");
  };

  return (
    <footer className="bg-[#000000] text-[#FAF7F2] border-t-2 border-[#D4AF37]/40 relative z-10 font-sans">
      {/* Newsletter Section */}
      <div className="bg-linear-to-b from-[#0A0A0A] to-[#000000] border-b border-white/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
            <Crown className="w-4 h-4 text-[#D4AF37]" />
            <span>The Premium Atelier Circle</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-wide">
            Receive 15% Premium Privilege
          </h2>

          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto leading-relaxed">
            Subscribe to receive private invitations to limited-edition women&apos;s and girls&apos; comfort drops, fabric care notes, and exclusive privileges.
          </p>

          {subscribed ? (
            <div className="p-4 bg-[#141414] border border-[#D4AF37] rounded-xs text-xs text-[#F4E8C1] inline-flex items-center gap-2">
              <Check className="w-4 h-4 text-[#D4AF37]" />
              <span>You have joined the Premium Circle. Use code <strong>PREMIUM15</strong> at checkout for 15% off.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-[#121212] border border-white/20 px-4 py-3.5 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="btn-piano-black text-xs py-3.5 px-6 whitespace-nowrap cursor-pointer"
              >
                Claim 15% Privilege
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#64748B] pt-1">
            We hold your privacy sacred. 100% discreet and encrypted.
          </p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <Crown className="w-6 h-6 text-[#D4AF37]" />
                <span className="font-serif text-3xl tracking-[0.16em] text-white font-medium">
                  Me<span className="text-[#D4AF37] italic">2</span>baby
                </span>
              </div>
              <span className="block text-[9px] tracking-[0.42em] text-[#D4AF37] uppercase font-bold mt-0.5">
                Premium Luxury Living • Women &amp; Girls
              </span>
            </Link>

            <p className="text-xs text-[#94A3B8] max-w-sm leading-relaxed">
              Dedicated exclusively to women&apos;s and girls&apos; premium wire-free innerwear, cloud-soft night comfort sleepwear, and 4-way stretch butter leggings. Handcrafted with certified Austrian modal and GOTS organic cotton.
            </p>

            <div className="pt-2 text-xs text-[#94A3B8] space-y-2">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>100% Plain Unbranded Outer Packaging Guaranteed</span>
              </p>
              <p className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>Certified GOTS Organic Cotton &amp; Grade-6A Mulberry Silk</span>
              </p>
              <p className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Complimentary Express Courier Across India Above ₹1,999</span>
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F4E8C1] font-bold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/shop?category=Leggings" className="hover:text-white transition-colors">
                  Butter-Soft High-Rise Leggings
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Innerwear&department=Women" className="hover:text-white transition-colors">
                  Wire-Free Sculpt Bras
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Night+Comfort" className="hover:text-white transition-colors">
                  Night Comfort Loungewear
                </Link>
              </li>
              <li>
                <Link href="/shop?department=Girls+%26+Kids" className="hover:text-white transition-colors font-medium text-[#F4E8C1]">
                  Girls Cloud Nightsuits &amp; Leggings
                </Link>
              </li>
              <li>
                <Link href="/#bundles" className="hover:text-white transition-colors text-[#D4AF37] font-semibold">
                  Curated Multipacks (Save 30%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Extra Pages */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F4E8C1] font-bold">
              Patron Services
            </h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Interactive Size Atelier
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors text-[#F4E8C1] font-semibold">
                  Track Live Order Status
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ &amp; Discreet Packaging
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact &amp; Concierge
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link href="/admin" className="hover:text-[#F4E8C1] transition-colors text-[#D4AF37] font-semibold">
                    Admin Console &amp; Atelier Suite
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Preferences & WhatsApp */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F4E8C1] font-bold">
              Direct Assistance
            </h4>
            <div className="space-y-3 text-xs text-[#94A3B8]">
              <div>
                <label className="block text-[11px] mb-1 font-mono text-[#D4AF37]">Active Currency</label>
                <div className="p-2 bg-[#111111] border border-white/15 rounded-2xs text-white text-xs font-semibold flex items-center justify-between">
                  <span>INR (₹) — Indian Rupee</span>
                  <span>🇮🇳</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={BRAND_CONFIG.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase py-2.5 px-3 rounded-2xs flex items-center justify-center gap-2 transition-all w-full"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp: {BRAND_CONFIG.whatsappNumber}</span>
                </a>
              </div>

              <div className="text-[11px] text-[#64748B] leading-relaxed">
                Toll-free customer support: <br />
                <span className="text-[#D4AF37]">1800-209-ME2BABY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Accepted Payment Methods Bar */}
        <div className="pt-10 mt-10 border-t border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#D4AF37]" />
            <span>256-Bit SSL Encrypted Premium Secure Checkout</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-2xs font-sans">
              UPI
            </span>
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-2xs font-sans">
              RUPAY
            </span>
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-2xs font-sans">
              GOOGLE PAY
            </span>
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-2xs font-sans">
              PHONEPE
            </span>
            <span className="px-2.5 py-1 bg-white text-black text-[10px] font-bold rounded-2xs font-sans">
              VISA / MASTERCARD
            </span>
            <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-[10px] font-bold rounded-2xs font-sans">
              CASH ON DELIVERY (COD)
            </span>
          </div>
        </div>

        {/* Legal Copyright */}
        <div className="pt-8 mt-6 border-t border-[#1E293B] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] gap-4">
          <div>
            <span>© {new Date().getFullYear()} Me2baby Premium Luxury Atelier India. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy Charter</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms of Atelier</Link>
            <Link href="/track-order" className="hover:text-white transition-colors">Delivery Timeline</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
