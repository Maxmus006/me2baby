"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, COLLECTIONS, PREMIUM_BUNDLES, PREMIUM_REVIEWS, PremiumBundle } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";
import {
  ArrowRight,
  Ruler,
  ShieldCheck,
  Sparkles,
  Heart,
  Package,
  Star,
  CheckCircle2,
  Zap,
  Truck,
  Feather,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { openSizeGuide, addToCart, products } = useStore();
  const [activeTab, setActiveTab] = useState<string>("All");

  const catalog = products?.length ? products : PRODUCTS;
  const filteredFeatured = catalog.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Women's Inners") return p.department === "Women" && p.category === "Innerwear";
    if (activeTab === "Night Comfort") return p.category === "Night Comfort";
    if (activeTab === "Butter Leggings") return p.category === "Leggings";
    if (activeTab === "Girls & Kids") return p.department === "Girls & Kids";
    return true;
  }).slice(0, 6);

  const handleAddBundle = (bundle: PremiumBundle) => {
    // Add representative item to cart
    const matched = catalog.find((p) => bundle.title.toLowerCase().includes(p.name.toLowerCase())) || catalog[0];
    addToCart(matched, matched.sizes[0], matched.colors[0]?.name || "Warm Ivory");
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 overflow-hidden">
      {/* =========================================================================
          HERO SECTION: WOMEN'S & GIRLS' PREMIUM COMFORT CLOTHING
          ========================================================================= */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center bg-gradient-to-b from-[#1F1917] to-[#120E0D] text-[#FAF7F2] overflow-hidden border-b border-[#C5A059]/25">
        {/* Subtle gold ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(197,160,89,0.14),transparent_60%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FAF8F5]/10 backdrop-blur-md border border-[#C5A059]/50 rounded-full text-[11px] tracking-[0.22em] text-[#F4E8C1] uppercase font-sans">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Me2baby Premium Comfort Atelier</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] text-white leading-[1.08] tracking-tight">
                Pure Comfort in Every Layer. <br />
                <span className="text-gold-gradient italic font-light">
                  For Women &amp; Little Girls.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#D9C7B3] max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed">
                Dedicated exclusively to women&apos;s and girls&apos; premium essentials: weightless wire-free innerwear,
                cloud-soft sleep comforters, and butter-stretch leggings crafted from GOTS organic cotton and Austrian modal.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  href="/shop?department=Women"
                  className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#E5BE4A] hover:to-[#D4AF37] text-[#120E0D] font-sans font-bold py-4 px-8 text-xs tracking-[0.18em] uppercase rounded-xs shadow-lg transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Shop Women&apos;s Collection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/shop?department=Girls+%26+Kids"
                  className="w-full sm:w-auto border border-[#C5A059]/70 hover:border-[#F4E8C1] text-[#F4E8C1] hover:text-white py-4 px-7 text-xs font-sans font-semibold tracking-[0.18em] uppercase transition-all rounded-xs backdrop-blur-xs flex items-center justify-center gap-2"
                >
                  <Heart className="w-3.5 h-3.5 text-[#E8C8C2]" />
                  <span>Shop Girls &amp; Kids</span>
                </Link>
              </div>

              {/* Social Proof & Reassurance */}
              <div className="pt-6 border-t border-[#C5A059]/25 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#D9C7B3]">
                <div className="flex items-center gap-2">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans font-medium text-white">4.97/5</span>
                  <span className="text-[11px] text-[#D9C7B3]/80">(18,000+ Verified Buyers)</span>
                </div>
                <div className="hidden sm:inline opacity-30">|</div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>100% Discreet Unbranded Luxury Box</span>
                </div>
              </div>
            </div>

            {/* Right Hero Image Column with Bespoke Mother & Daughter Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Gold Frame Outline */}
                <div className="absolute -inset-2 rounded-xs border border-[#C5A059]/35 -rotate-1 pointer-events-none" />

                <div className="relative aspect-4/5 w-full bg-[#120E0D] overflow-hidden rounded-xs shadow-2xl border-2 border-[#C5A059]/60">
                  <Image
                    src="/images/hero-premium-mom-daughter.jpg"
                    alt="Me2baby Women and Girls Comfort Loungewear Collection"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120E0D]/75 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Overlaid Floating Value Pill */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#120E0D]/95 backdrop-blur-md p-4 sm:p-5 rounded-xs shadow-2xl border border-[#C5A059] max-w-[280px] hidden sm:block text-left">
                  <span className="text-[9px] uppercase tracking-[0.24em] text-[#D4AF37] font-sans font-bold block mb-1">
                    ✨ Mother &amp; Daughter Signature
                  </span>
                  <h4 className="font-serif text-lg text-white">Matching Comfort Loungewear</h4>
                  <p className="text-[11px] text-[#D9C7B3] mt-0.5">Austrian modal &amp; GOTS cloud-cotton pyjamas.</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-sm font-sans font-bold text-white">₹3,999</span>
                    <span className="text-xs font-sans line-through text-[#766157]">₹5,499</span>
                    <span className="text-[10px] text-[#D4AF37] font-bold">Bundle Save 27%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4-PILLAR STATS BAR
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-xs border border-[#C5A059]/25 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Feather className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#120E0D] block">4-Way Butter Stretch</span>
              <span className="text-[11px] text-[#766157] font-sans">Zero Pinch or Rolling</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#120E0D] block">24 Hours</span>
              <span className="text-[11px] text-[#766157] font-sans">Priority Express Dispatch</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#120E0D] block">100% Discreet</span>
              <span className="text-[11px] text-[#766157] font-sans">Plain Unbranded Luxury Box</span>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#FAF8F5] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#120E0D] block">GOTS Cloud-Cotton</span>
              <span className="text-[11px] text-[#766157] font-sans">Hypoallergenic &amp; Gentle</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXCLUSIVE CURATED VALUE PACKS (High-Converting Multipacks)
          ========================================================================= */}
      <section id="bundles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#C5A059]/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold">
                Curated Multipacks
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#120E0D]">
              Curated Value Packs — Save Up To 33%
            </h2>
          </div>
          <p className="text-xs text-[#766157] font-sans mt-2 sm:mt-0 max-w-xs">
            Complete wardrobing sets for women and girls bundled with complimentary gift wrap and express courier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PREMIUM_BUNDLES.map((bundle) => (
            <div
              key={bundle.id}
              className="bg-white rounded-xs border border-[#C5A059]/35 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF7F2]">
                  <Image
                    src={bundle.image}
                    alt={bundle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <span className="absolute top-2.5 left-2.5 bg-[#120E0D] text-[#F4E8C1] border border-[#C5A059] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5">
                    {bundle.tag}
                  </span>
                  <span className="absolute top-2.5 right-2.5 bg-[#C5A059] text-[#120E0D] text-[9px] uppercase font-bold px-2 py-0.5 shadow-xs">
                    Save {bundle.savePct}%
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <h3 className="font-serif text-xl text-[#120E0D] leading-snug">
                    {bundle.title}
                  </h3>
                  <p className="text-[11px] text-[#766157] font-sans leading-relaxed">
                    {bundle.subtitle}
                  </p>

                  <div className="pt-2 pb-1 border-t border-[#D9C7B3]/25 space-y-1">
                    {bundle.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#211917]">
                        <CheckCircle2 className="w-3 h-3 text-[#C5A059] shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2.5 pt-2">
                    <span className="font-sans text-xl font-bold text-[#120E0D]">
                      ₹{bundle.salePrice.toLocaleString("en-IN")}
                    </span>
                    <span className="font-sans text-xs line-through text-[#766157]/70">
                      ₹{bundle.originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">
                      Save ₹{(bundle.originalPrice - bundle.salePrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handleAddBundle(bundle)}
                  className="w-full btn-buy-now-premium py-3 text-xs flex items-center justify-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Claim Value Pack</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FEATURED PRODUCTS: WOMEN & GIRLS ESSENTIALS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#C5A059]/30 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold">
                Premium Selection
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#120E0D]">
              Bestselling Inners, Sleepwear &amp; Leggings
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 text-xs font-sans uppercase tracking-wider">
            {["All", "Women's Inners", "Night Comfort", "Butter Leggings", "Girls & Kids"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xs transition-all ${
                  activeTab === tab
                    ? "bg-[#120E0D] text-[#F4E8C1] border border-[#C5A059] font-semibold"
                    : "bg-[#FAF7F2] text-[#766157] hover:text-[#120E0D] border border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid with live strike-through prices & Buy Now buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="btn-primary py-4 px-10 text-xs tracking-[0.18em] uppercase inline-flex items-center gap-2"
          >
            <span>Explore All {PRODUCTS.length} Premium Essentials</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =========================================================================
          QUALITY COMPARISON TABLE: ME2BABY VS MASS-MARKET BRANDS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] p-8 sm:p-12 rounded-xs border border-[#C5A059]/40 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              The Standard of Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#120E0D]">
              Why Women &amp; Mothers Choose Me2baby
            </h2>
            <p className="text-xs sm:text-sm text-[#766157]">
              Compare our certified premium materials with ordinary commercial retail innerwear.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-[#C5A059]/40 text-sm">
                  <th className="py-4 px-4 font-serif text-base text-[#120E0D] w-1/3">Key Quality Feature</th>
                  <th className="py-4 px-4 bg-[#120E0D] text-[#F4E8C1] font-serif text-base rounded-t-xs text-center border-t-2 border-t-[#D4AF37]">
                    ✨ Me2baby Premium Quality
                  </th>
                  <th className="py-4 px-4 text-[#766157] text-center w-1/3">Standard Retail Brands</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7B3]/30">
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#120E0D]">Fabrics &amp; Safety</td>
                  <td className="py-4 px-4 bg-[#120E0D]/95 text-white text-center font-medium">
                    100% GOTS Organic Cotton, Pure Silk &amp; Modal
                  </td>
                  <td className="py-4 px-4 text-[#766157] text-center">Rough Synthetic Polyester &amp; Harsh Dyes</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#120E0D]">Leggings Construction</td>
                  <td className="py-4 px-4 bg-[#120E0D]/95 text-white text-center font-medium">
                    Butter-Soft 4-Way Stretch, Non-Sheer &amp; Non-Rolling
                  </td>
                  <td className="py-4 px-4 text-[#766157] text-center">Stiff Elastics, Baggy Knees &amp; Sheer Fade</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#120E0D]">Innerwear Comfort</td>
                  <td className="py-4 px-4 bg-[#120E0D]/95 text-white text-center font-medium">
                    Wire-Free Anatomic Shaping &amp; Scratch-Free Seams
                  </td>
                  <td className="py-4 px-4 text-[#766157] text-center">Rigid Underwires, Scratchy Tags &amp; Red Marks</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#120E0D]">Girls &amp; Kids Safety</td>
                  <td className="py-4 px-4 bg-[#120E0D]/95 text-white text-center font-medium">
                    Hypoallergenic Breathable Cloud-Cotton
                  </td>
                  <td className="py-4 px-4 text-[#766157] text-center">Untested Synthetic Knits &amp; Tight Elastics</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-[#120E0D]">Packaging &amp; Discretion</td>
                  <td className="py-4 px-4 bg-[#120E0D]/95 text-white text-center font-medium rounded-b-xs">
                    100% Discreet Unbranded Plain Luxury Gift Box
                  </td>
                  <td className="py-4 px-4 text-[#766157] text-center">Thin Clear Branded Plastic Envelopes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          VERIFIED PATRON REVIEWS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold">
              Verified Patron Stories
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#120E0D]">
            Loved by Women &amp; Mothers Worldwide
          </h2>
          <p className="text-xs text-[#766157] font-sans">
            Real feedback on our butter leggings, wire-free bras, and girls&apos; night comfort wear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PREMIUM_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-7 rounded-xs border border-[#C5A059]/35 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified Buyer
                  </span>
                </div>

                <h4 className="font-serif text-lg text-[#120E0D] leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>

                <p className="text-xs text-[#766157] font-sans leading-relaxed italic">
                  {rev.content}
                </p>
              </div>

              <div className="pt-4 border-t border-[#D9C7B3]/30">
                <span className="font-serif text-sm font-semibold text-[#120E0D] block">
                  {rev.author}
                </span>
                <span className="text-[11px] text-[#766157] font-sans block">
                  {rev.location} · Purchased <em>{rev.itemPurchased}</em>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE FIT SUITE BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] border border-[#C5A059] p-8 sm:p-14 rounded-xs text-center space-y-4 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-[#120E0D] mx-auto flex items-center justify-center text-[#D4AF37] border border-[#C5A059]">
            <Ruler className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#120E0D]">
            Discover Your Perfect Fit For Women &amp; Girls
          </h3>
          <p className="text-xs sm:text-sm text-[#766157] max-w-xl mx-auto font-sans leading-relaxed">
            Our interactive fit guide calculates wire-free bra cup sizing, butter legging measurements, and girls&apos; age-graded comfort charts in complete privacy.
          </p>
          <div className="pt-2">
            <button
              onClick={() => openSizeGuide("Bras")}
              className="btn-primary py-3.5 px-8 text-xs tracking-wider cursor-pointer"
            >
              Launch Interactive Size Guide
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
