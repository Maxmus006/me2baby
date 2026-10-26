"use client";

import React, { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { X, Check, Info, ShieldCheck, RefreshCw } from "lucide-react";

export default function SizeGuideModal() {
  const { sizeGuideOpen, sizeGuideCategory, closeSizeGuide } = useStore();
  const [activeTab, setActiveTab] = useState(sizeGuideCategory || "Bras");

  // Calculator states
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [underbust, setUnderbust] = useState<string>("");
  const [bust, setBust] = useState<string>("");
  const [waist, setWaist] = useState<string>("");
  const [hip, setHip] = useState<string>("");
  const [recommendation, setRecommendation] = useState<string | null>(null);

  if (!sizeGuideOpen) return null;

  const calculateBraSize = (e: React.FormEvent) => {
    e.preventDefault();
    const ubNum = parseFloat(underbust);
    const bNum = parseFloat(bust);

    if (isNaN(ubNum) || isNaN(bNum) || ubNum <= 0 || bNum <= ubNum) {
      setRecommendation("Please enter valid positive measurements (Bust must be larger than Underbust).");
      return;
    }

    const ubInches = unit === "cm" ? ubNum / 2.54 : ubNum;
    const bInches = unit === "cm" ? bNum / 2.54 : bNum;

    // Standard Bra Calculation:
    // Band: round to nearest even number after adding 4 (traditional) or direct snug band + 2
    let band = Math.round(ubInches);
    if (band % 2 !== 0) band += 1;

    const diff = Math.round(bInches - band);
    const cupLookup: { [key: number]: string } = {
      0: "AA",
      1: "A",
      2: "B",
      3: "C",
      4: "D",
      5: "DD/E",
      6: "DDD/F",
    };

    const cup = cupLookup[Math.max(0, Math.min(6, diff))] || "B";
    const alphaLookup: { [key: number]: string } = {
      30: "XS",
      32: "S",
      34: "M",
      36: "L",
      38: "XL",
    };
    const alpha = alphaLookup[band] || "M";

    setRecommendation(
      `Suggested Starting Size: ${band}${cup} (Wire-free / Bralette Size: ${alpha}). Note: Intimate sizing varies by natural shape, breast density, and comfort preference.`
    );
  };

  const calculateBriefSize = (e: React.FormEvent) => {
    e.preventDefault();
    const wNum = parseFloat(waist);
    const hNum = parseFloat(hip);

    if (isNaN(wNum) || isNaN(hNum)) {
      setRecommendation("Please enter both waist and hip measurements.");
      return;
    }

    const wInches = unit === "cm" ? wNum / 2.54 : wNum;
    const hInches = unit === "cm" ? hNum / 2.54 : hNum;

    let size = "M";
    if (wInches < 26 && hInches < 36) size = "XS";
    else if (wInches <= 28 && hInches <= 38) size = "S";
    else if (wInches <= 31 && hInches <= 41) size = "M";
    else if (wInches <= 34 && hInches <= 44) size = "L";
    else size = "XL";

    setRecommendation(`Suggested Starting Size: ${size}. If you prefer a gentle, non-compressing fit around the hips, we suggest choosing the larger size.`);
  };

  const resetCalculator = () => {
    setUnderbust("");
    setBust("");
    setWaist("");
    setHip("");
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302522]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeSizeGuide}
      />

      <div className="relative min-h-screen px-4 py-12 flex justify-center items-center">
        <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-xs shadow-2xl p-6 sm:p-10 border border-[#D9C7B3]/40 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#D9C7B3]/40">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#C9A6A0] font-sans block mb-1">
                Considered Sizing
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#302522]">
                Your Comfort. Your Fit.
              </h2>
            </div>
            <button
              onClick={closeSizeGuide}
              className="text-[#766157] hover:text-[#302522] p-2"
              aria-label="Close size guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#D9C7B3]/30 mt-6 gap-6 text-xs sm:text-sm uppercase tracking-wider font-sans">
            {["Bras", "Briefs", "Lounge"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  resetCalculator();
                }}
                className={`pb-3 font-medium transition-colors relative ${
                  activeTab === tab
                    ? "text-[#302522] border-b-2 border-[#302522]"
                    : "text-[#766157] hover:text-[#302522]"
                }`}
              >
                {tab === "Bras" ? "Bras & Bralettes" : tab === "Briefs" ? "Briefs & Bottoms" : "Lounge Essentials"}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-6 space-y-8">
            {/* Bras Tab */}
            {activeTab === "Bras" && (
              <>
                <div>
                  <h3 className="font-serif text-xl text-[#302522] mb-3">
                    Bralette & Wire-Free Conversion Chart
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans border border-[#D9C7B3]/40">
                      <thead className="bg-[#F3EDE5] text-[#302522] uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3 border-b border-[#D9C7B3]/40">Size</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">US / UK Band</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">Recommended Cups</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">EU / FR</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D9C7B3]/30 text-[#302522]">
                        <tr>
                          <td className="p-3 font-semibold">XS</td>
                          <td className="p-3">30A, 30B, 32A</td>
                          <td className="p-3">A – B</td>
                          <td className="p-3">65A–70B</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">S</td>
                          <td className="p-3">32B, 32C, 34A</td>
                          <td className="p-3">A – C</td>
                          <td className="p-3">70B–75B</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">M</td>
                          <td className="p-3">34B, 34C, 36A, 36B</td>
                          <td className="p-3">B – D</td>
                          <td className="p-3">75B–80C</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">L</td>
                          <td className="p-3">36C, 36D, 38B, 38C</td>
                          <td className="p-3">C – DD</td>
                          <td className="p-3">80C–85D</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">XL</td>
                          <td className="p-3">38C, 38D, 40B, 40C</td>
                          <td className="p-3">D – E</td>
                          <td className="p-3">85C–90D</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Interactive Fit Assistant */}
                <div className="bg-[#F3EDE5]/70 p-6 rounded-xs border border-[#D9C7B3]/50">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-serif text-lg text-[#302522]">
                      Interactive Fit Assistant
                    </h4>
                    <div className="flex gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setUnit("in")}
                        className={`px-2.5 py-1 rounded-xs ${
                          unit === "in" ? "bg-[#302522] text-white" : "bg-white text-[#766157]"
                        }`}
                      >
                        Inches
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit("cm")}
                        className={`px-2.5 py-1 rounded-xs ${
                          unit === "cm" ? "bg-[#302522] text-white" : "bg-white text-[#766157]"
                        }`}
                      >
                        CM
                      </button>
                    </div>
                  </div>

                  <form onSubmit={calculateBraSize} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#766157] mb-1 font-sans">
                        1. Snug Underbust Ribcage ({unit}):
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={underbust}
                        onChange={(e) => setUnderbust(e.target.value)}
                        placeholder={unit === "in" ? "e.g. 30" : "e.g. 75"}
                        className="w-full bg-white border border-[#D9C7B3]/60 px-3 py-2 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#766157] mb-1 font-sans">
                        2. Fullest Overbust Point ({unit}):
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={bust}
                        onChange={(e) => setBust(e.target.value)}
                        placeholder={unit === "in" ? "e.g. 34" : "e.g. 88"}
                        className="w-full bg-white border border-[#D9C7B3]/60 px-3 py-2 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                      />
                    </div>

                    <div className="sm:col-span-2 flex gap-3 pt-2">
                      <button type="submit" className="btn-primary text-xs py-2.5 px-6">
                        Find My Recommended Size
                      </button>
                      <button
                        type="button"
                        onClick={resetCalculator}
                        className="text-xs text-[#766157] hover:text-[#302522] inline-flex items-center gap-1"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset
                      </button>
                    </div>
                  </form>

                  {recommendation && (
                    <div className="mt-4 p-3.5 bg-white border border-[#C9A6A0]/50 rounded-xs text-xs text-[#302522] animate-fadeIn">
                      <p className="font-medium text-[#302522]">{recommendation}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Briefs Tab */}
            {activeTab === "Briefs" && (
              <>
                <div>
                  <h3 className="font-serif text-xl text-[#302522] mb-3">
                    Briefs & Bottoms Chart
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans border border-[#D9C7B3]/40">
                      <thead className="bg-[#F3EDE5] text-[#302522] uppercase tracking-wider text-[11px]">
                        <tr>
                          <th className="p-3 border-b border-[#D9C7B3]/40">Size</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">US Dress Size</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">Natural Waist</th>
                          <th className="p-3 border-b border-[#D9C7B3]/40">Fullest Hip</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D9C7B3]/30 text-[#302522]">
                        <tr>
                          <td className="p-3 font-semibold">XS</td>
                          <td className="p-3">0 – 2</td>
                          <td className="p-3">24&quot; – 25&quot; (61–64 cm)</td>
                          <td className="p-3">34&quot; – 35&quot; (86–89 cm)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">S</td>
                          <td className="p-3">4 – 6</td>
                          <td className="p-3">26&quot; – 27&quot; (66–69 cm)</td>
                          <td className="p-3">36&quot; – 38&quot; (91–97 cm)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">M</td>
                          <td className="p-3">8 – 10</td>
                          <td className="p-3">28&quot; – 30&quot; (71–76 cm)</td>
                          <td className="p-3">39&quot; – 41&quot; (99–104 cm)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">L</td>
                          <td className="p-3">12 – 14</td>
                          <td className="p-3">31&quot; – 33&quot; (79–84 cm)</td>
                          <td className="p-3">42&quot; – 44&quot; (107–112 cm)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold">XL</td>
                          <td className="p-3">16 – 18</td>
                          <td className="p-3">34&quot; – 36&quot; (86–91 cm)</td>
                          <td className="p-3">45&quot; – 47&quot; (114–119 cm)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-[#F3EDE5]/70 p-6 rounded-xs border border-[#D9C7B3]/50">
                  <h4 className="font-serif text-lg text-[#302522] mb-4">
                    Briefs Size Calculator
                  </h4>
                  <form onSubmit={calculateBriefSize} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#766157] mb-1 font-sans">
                        Natural Waist ({unit}):
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="e.g. 28"
                        className="w-full bg-white border border-[#D9C7B3]/60 px-3 py-2 text-xs text-[#302522]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#766157] mb-1 font-sans">
                        Fullest Hip ({unit}):
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="e.g. 39"
                        className="w-full bg-white border border-[#D9C7B3]/60 px-3 py-2 text-xs text-[#302522]"
                      />
                    </div>
                    <div className="sm:col-span-2 flex gap-3 pt-2">
                      <button type="submit" className="btn-primary text-xs py-2.5 px-6">
                        Calculate Size
                      </button>
                    </div>
                  </form>
                  {recommendation && (
                    <div className="mt-4 p-3.5 bg-white border border-[#C9A6A0]/50 rounded-xs text-xs text-[#302522]">
                      <p className="font-medium">{recommendation}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Lounge Tab */}
            {activeTab === "Lounge" && (
              <div>
                <h3 className="font-serif text-xl text-[#302522] mb-3">
                  Lounge, Camisoles & Robes
                </h3>
                <p className="text-xs text-[#766157] mb-4 leading-relaxed">
                  Our lounge apparel is cut with a relaxed, fluid drape to allow easy movement and unhindered comfort.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-sans border border-[#D9C7B3]/40">
                    <thead className="bg-[#F3EDE5] text-[#302522] uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3 border-b border-[#D9C7B3]/40">Size</th>
                        <th className="p-3 border-b border-[#D9C7B3]/40">Bust</th>
                        <th className="p-3 border-b border-[#D9C7B3]/40">Waist</th>
                        <th className="p-3 border-b border-[#D9C7B3]/40">Hip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9C7B3]/30 text-[#302522]">
                      <tr>
                        <td className="p-3 font-semibold">XS / S</td>
                        <td className="p-3">32&quot; – 34&quot;</td>
                        <td className="p-3">25&quot; – 27&quot;</td>
                        <td className="p-3">35&quot; – 37&quot;</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">M / L</td>
                        <td className="p-3">36&quot; – 38&quot;</td>
                        <td className="p-3">29&quot; – 32&quot;</td>
                        <td className="p-3">39&quot; – 42&quot;</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">XL</td>
                        <td className="p-3">40&quot; – 42&quot;</td>
                        <td className="p-3">33&quot; – 36&quot;</td>
                        <td className="p-3">43&quot; – 46&quot;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Privacy & Discreet Guarantee */}
          <div className="pt-6 border-t border-[#D9C7B3]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#766157] gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A6A0]" />
              <span>Measurements are calculated locally in your browser. Never stored.</span>
            </div>
            <button
              onClick={closeSizeGuide}
              className="text-[#302522] font-medium hover:underline self-end sm:self-auto"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
