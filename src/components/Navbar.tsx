"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Search, ShoppingBag, Heart, User, Menu, X, Ruler, Sparkles, Crown, Truck, Lock } from "lucide-react";

export default function Navbar() {
  const { cartCount, wishlistCount, openCart, openSearch, openSizeGuide, user, isAdmin } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#070B14]/95 backdrop-blur-md shadow-lg border-b border-[#D4AF37]/35 py-3 text-white"
            : "bg-[#FAF8F5] border-b border-[#D4AF37]/25 py-4 text-[#120E0D]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 hover:text-[#D4AF37] transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={openSearch}
              className="p-2 hover:text-[#D4AF37] transition-colors ml-1 focus:outline-hidden cursor-pointer"
              aria-label="Search collection"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Left Brand Wordmark with Piano Black & Gold Emblem */}
          <div className="flex-1 lg:flex-none text-center lg:text-left lg:mr-6 xl:mr-10">
            <Link
              href="/"
              className="inline-block group focus:outline-hidden"
            >
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <div className="w-6 h-6 rounded-full bg-[#000000] border border-[#D4AF37] flex items-center justify-center text-[#F4E8C1] shadow-xs">
                  <Crown className="w-3.5 h-3.5" />
                </div>
                <span className={`font-serif text-2xl lg:text-[28px] tracking-[0.16em] font-normal transition-colors ${
                  scrolled ? "text-white group-hover:text-[#F4E8C1]" : "text-[#120E0D] group-hover:text-[#000000]"
                }`}>
                  Me<span className="text-[#C5A059] italic">2</span>baby
                </span>
              </div>
              <span className="block text-[8px] tracking-[0.45em] text-[#766157] dark:text-[#E8D39A] -mt-1 font-sans uppercase font-bold text-center lg:text-left">
                Premium Luxury Atelier
              </span>
            </Link>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className={`hidden lg:flex items-center gap-4 xl:gap-6 text-[12px] xl:text-[13px] tracking-[0.12em] uppercase font-sans ${
            scrolled ? "text-[#E2E8F0]" : "text-[#120E0D]"
          }`}>
            <Link
              href="/shop?department=Women&category=Innerwear"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group font-semibold"
            >
              Women&apos;s Inners
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/shop?department=Women&category=Night+Comfort"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group font-semibold"
            >
              Night Comfort
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/shop?category=Leggings"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group font-semibold"
            >
              Butter Leggings
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/shop?department=Girls+%26+Kids"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group font-bold text-[#120E0D] dark:text-[#FAF7F2]"
            >
              Girls &amp; Kids
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/#bundles"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group font-bold text-[#D4AF37]"
            >
              Value Packs
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/track-order"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group flex items-center gap-1 font-medium"
            >
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Track Order</span>
            </Link>

            <Link
              href="/size-guide"
              className="relative py-1 hover:text-[#D4AF37] transition-colors group flex items-center gap-1 font-medium"
            >
              <Ruler className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fit Guide</span>
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-[11px] bg-[#000000] hover:bg-[#1A1A1A] text-[#F4E8C1] border border-[#D4AF37] px-2.5 py-1 rounded-2xs transition-colors shadow-xs font-semibold cursor-pointer animate-fadeIn"
                title="Me2baby Administration Console"
              >
                <Lock className="w-3 h-3 text-[#D4AF37]" />
                <span>Admin Console</span>
              </Link>
            )}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={openSearch}
              className="hidden lg:flex p-2 hover:text-[#D4AF37] transition-colors focus:outline-hidden cursor-pointer"
              aria-label="Search catalog"
              title="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <Link
              href="/wishlist"
              className="p-2 hover:text-[#D4AF37] transition-colors relative focus:outline-hidden"
              aria-label="View wishlist"
              title="Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#000000] text-[#F4E8C1] text-[9px] font-sans font-bold flex items-center justify-center animate-scaleIn border border-[#D4AF37]">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href={user ? "/account" : "/login"}
              className="p-2 hover:text-[#D4AF37] transition-colors hidden sm:flex items-center gap-1.5 focus:outline-hidden"
              aria-label={user ? "My Account" : "Sign In with Mobile OTP"}
              title={user ? (isAdmin ? "Admin Console Portal" : `Patron Account: +91 ${user.phone}`) : "Sign In with Mobile OTP"}
            >
              <div className="relative">
                <User className="w-4.5 h-4.5" />
                {user && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D4AF37] ring-2 ring-black" />
                )}
              </div>
              {user && (
                <span className="hidden xl:inline text-[11px] font-sans font-semibold text-[#D4AF37] max-w-[85px] truncate">
                  {isAdmin ? "Admin" : user.name.split(" ")[0]}
                </span>
              )}
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-linear-to-r from-[#000000] via-[#111111] to-[#000000] hover:from-[#1A1A1A] hover:to-[#111111] text-[#F4E8C1] border border-[#D4AF37]/60 py-2 px-3.5 rounded-2xs transition-all shadow-md focus:outline-hidden cursor-pointer"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-sans font-bold tracking-wider">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#000000] text-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-[#D4AF37]/30">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                  <span className="font-serif text-2xl tracking-[0.16em] text-white">
                    Me2baby
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#94A3B8] hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 pt-6 text-xs uppercase tracking-[0.16em] text-[#E2E8F0] font-sans">
                <Link
                  href="/shop?department=Women&category=Innerwear"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  Women&apos;s Innerwear
                </Link>
                <Link
                  href="/shop?department=Women&category=Night+Comfort"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  Women&apos;s Night Comfort
                </Link>
                <Link
                  href="/shop?category=Leggings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors font-medium"
                >
                  Butter-Soft Leggings
                </Link>
                <Link
                  href="/shop?department=Girls+%26+Kids"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-white hover:text-[#D4AF37] transition-colors font-bold"
                >
                  Girls &amp; Kids Collection
                </Link>
                <Link
                  href="/#bundles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 text-[#D4AF37] hover:text-white transition-colors font-bold"
                >
                  Curated Multipacks (Save 30%)
                </Link>
                <Link
                  href="/track-order"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Track Live Order</span>
                </Link>
                <Link
                  href="/size-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors flex items-center gap-2"
                >
                  <Ruler className="w-4 h-4 text-[#D4AF37]" />
                  <span>Interactive Size Guide</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors"
                >
                  FAQ &amp; Discreet Packaging
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1.5 hover:text-[#D4AF37] transition-colors"
                >
                  Contact &amp; WhatsApp Concierge
                </Link>
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 bg-[#111111] text-[#F4E8C1] border border-[#D4AF37]/50 rounded-2xs flex items-center gap-2 font-bold cursor-pointer animate-fadeIn"
                  >
                    <Lock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Admin Panel Console</span>
                  </Link>
                )}
              </nav>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-[#94A3B8] font-sans">
              <Link
                href={user ? "/account" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-white py-1 hover:text-[#D4AF37] transition-colors"
              >
                <User className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {user ? (isAdmin ? `Admin Portal (+91 ${user.phone})` : `My Account (+91 ${user.phone})`) : "Sign In / OTP Verification"}
                </span>
              </Link>
              <div className="text-[11px] text-[#94A3B8]">
                Prices in Indian Rupees (₹). Complimentary priority delivery above ₹1,999.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
