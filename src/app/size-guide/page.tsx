"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Ruler, ShieldCheck, Check, Sparkles, MessageCircle } from "lucide-react";
import { BRAND_CONFIG } from "@/data/products";

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"bras" | "briefs" | "leggings" | "girls">("bras");

  // Calculator states
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [underbust, setUnderbust] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const calculateBra = (e: React.FormEvent) => {
    e.preventDefault();
    const ub = parseFloat(underbust);
    const b = parseFloat(bust);
    if (isNaN(ub) || isNaN(b) || b <= ub) {
      setRecommendation("Please enter valid positive measurements (Bust must exceed Underbust).");
      return;
    }
    const ubIn = unit === "cm" ? ub / 2.54 : ub;
    const bIn = unit === "cm" ? b / 2.54 : b;
    let band = Math.round(ubIn);
    if (band % 2 !== 0) band += 1;
    const diff = Math.round(bIn - band);
    const cups = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F"];
    const cup = cups[Math.max(0, Math.min(6, diff))] || "B";
    const alphaLookup: Record<number, string> = { 30: "XS", 32: "S", 34: "M", 36: "L", 38: "XL" };
    const alpha = alphaLookup[band] || "M";
    setRecommendation(
      `Your Recommended Me2baby Sculpt Size: ${band}${cup} (Wire-free / Bralette Size: ${alpha}). Engineered for weightless support without rigid underwire.`
    );
  };

  const calculateLeggings = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(waist);
    const h = parseFloat(hip);
    if (isNaN(w) || isNaN(h)) {
      setRecommendation("Please enter both waist and hip measurements.");
      return;
    }
    const wIn = unit === "cm" ? w / 2.54 : w;
    let size = "M";
    if (wIn < 26) size = "XS (24-25 in)";
    else if (wIn <= 28) size = "S (26-28 in)";
    else if (wIn <= 31) size = "M (29-31 in)";
    else if (wIn <= 34) size = "L (32-34 in)";
    else size = "XL (35-38 in)";
    setRecommendation(
      `Your Recommended Me2baby Legging Size: ${size}. Our 4-way butter knit offers gentle contouring; if you prefer gentle lounge fit, size up.`
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Anatomical Precision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#120E0D] font-normal">
            Interactive Size Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#766157] mt-3">
            Find your seamless, non-pinching fit across women&apos;s wire-free bras, second-skin briefs, butter-soft leggings, and girls&apos; cloud sleepwear.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-[#D9C7B3]/50 justify-center gap-4 sm:gap-8 mb-10 overflow-x-auto text-xs uppercase tracking-wider font-semibold">
          {[
            { id: "bras", label: "Wire-Free Bras" },
            { id: "leggings", label: "Butter Leggings" },
            { id: "briefs", label: "Seamless Briefs" },
            { id: "girls", label: "Girls & Kids (2-12Y)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setRecommendation(null);
              }}
              className={`pb-3 transition-colors relative cursor-pointer ${
                activeTab === tab.id
                  ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                  : "text-[#766157] hover:text-[#120E0D]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Calculator Section */}
        {(activeTab === "bras" || activeTab === "leggings") && (
          <div className="bg-white p-6 sm:p-10 rounded-xs border border-[#C5A059]/40 shadow-sm max-w-2xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl text-[#120E0D]">
                {activeTab === "bras" ? "Bra Fit Calculator" : "Butter Leggings Fit Recommender"}
              </h3>
              <div className="flex border border-[#D9C7B3] rounded-2xs overflow-hidden text-xs">
                <button
                  onClick={() => setUnit("in")}
                  className={`px-3 py-1 cursor-pointer ${unit === "in" ? "bg-[#000000] text-white" : "bg-white text-[#766157]"}`}
                >
                  Inches
                </button>
                <button
                  onClick={() => setUnit("cm")}
                  className={`px-3 py-1 cursor-pointer ${unit === "cm" ? "bg-[#000000] text-white" : "bg-white text-[#766157]"}`}
                >
                  CM
                </button>
              </div>
            </div>

            <form onSubmit={activeTab === "bras" ? calculateBra : calculateLeggings} className="space-y-4 text-xs">
              {activeTab === "bras" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">
                      Snug Underbust Measurement ({unit})
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={underbust}
                      onChange={(e) => setUnderbust(e.target.value)}
                      placeholder={unit === "in" ? "e.g. 32" : "e.g. 81"}
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">
                      Fullest Bust Measurement ({unit})
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={bust}
                      onChange={(e) => setBust(e.target.value)}
                      placeholder={unit === "in" ? "e.g. 35" : "e.g. 89"}
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">
                      Natural Waist ({unit})
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={waist}
                      onChange={(e) => setWaist(e.target.value)}
                      placeholder={unit === "in" ? "e.g. 28" : "e.g. 71"}
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">
                      Fullest Hip ({unit})
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={hip}
                      onChange={(e) => setHip(e.target.value)}
                      placeholder={unit === "in" ? "e.g. 38" : "e.g. 96"}
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full btn-piano-black py-3.5 text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Calculate My Recommended Size
              </button>
            </form>

            {recommendation && (
              <div className="mt-5 p-4 bg-[#F3EDE5] border border-[#C5A059]/50 rounded-xs text-xs text-[#120E0D] animate-fadeIn leading-relaxed">
                <Sparkles className="w-4 h-4 text-[#D4AF37] inline mr-1.5" />
                <strong>{recommendation}</strong>
              </div>
            )}
          </div>
        )}

        {/* Girls Chart Tab */}
        {activeTab === "girls" && (
          <div className="bg-white p-6 sm:p-10 rounded-xs border border-[#C5A059]/40 shadow-sm max-w-3xl mx-auto mb-12">
            <h3 className="font-serif text-2xl text-[#120E0D] mb-4">Little Girls Atelier Sizing Chart</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#FAF7F2] text-[#D4AF37] uppercase font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Age Range</th>
                    <th className="p-3">Child Height (cm / in)</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Waist (in)</th>
                    <th className="p-3">Best Fit Category</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D9C7B3]/40">
                  <tr>
                    <td className="p-3 font-semibold text-[#120E0D]">2 – 3 Years</td>
                    <td className="p-3 text-[#766157]">86 – 98 cm (34 – 38&quot;)</td>
                    <td className="p-3 text-[#766157]">20 – 21&quot;</td>
                    <td className="p-3 text-[#766157]">19.5 – 20&quot;</td>
                    <td className="p-3 text-[#D4AF37] font-medium">Nightsuits &amp; 3-Pack Leggings</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#120E0D]">4 – 5 Years</td>
                    <td className="p-3 text-[#766157]">104 – 110 cm (41 – 43&quot;)</td>
                    <td className="p-3 text-[#766157]">22 – 23&quot;</td>
                    <td className="p-3 text-[#766157]">21 – 21.5&quot;</td>
                    <td className="p-3 text-[#D4AF37] font-medium">Nightsuits &amp; 3-Pack Leggings</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#120E0D]">6 – 7 Years</td>
                    <td className="p-3 text-[#766157]">116 – 122 cm (45 – 48&quot;)</td>
                    <td className="p-3 text-[#766157]">24 – 25&quot;</td>
                    <td className="p-3 text-[#766157]">22 – 22.5&quot;</td>
                    <td className="p-3 text-[#D4AF37] font-medium">All Girls Apparel</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-[#120E0D]">8 – 9 Years</td>
                    <td className="p-3 text-[#766157]">128 – 134 cm (50 – 53&quot;)</td>
                    <td className="p-3 text-[#766157]">26 – 27&quot;</td>
                    <td className="p-3 text-[#766157]">23 – 24&quot;</td>
                    <td className="p-3 text-[#D4AF37] font-medium">All Girls Apparel</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Free Exchanges Guarantee */}
        <div className="bg-[#000000] text-white p-6 rounded-xs border border-[#D4AF37]/40 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-[#D4AF37] shrink-0" />
            <div className="text-xs">
              <strong className="block text-white text-sm">Complimentary 30-Day Doorstep Size Exchanges</strong>
              <span className="text-white/70">
                If your chosen size feels even slightly off, we exchange it for the next size with zero shipping charges.
              </span>
            </div>
          </div>
          <Link href="/shop" className="btn-piano-black text-xs py-2.5 px-6 whitespace-nowrap">
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
