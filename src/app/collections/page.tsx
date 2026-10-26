import React from "react";
import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";

export const metadata = {
  title: "Curated Collections | Me2baby",
  description: "Explore our thoughtfully edited collections of intimate essentials, wire-free bras, and comfort loungewear.",
};

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
          Capsule Edits
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#302522]">
          Our Curated Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#766157] font-sans leading-relaxed">
          Each capsule is designed with a specific tactile intention—from foundations that vanish beneath tailored garments to indulgent modal-cashmere layers for restful repose.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {COLLECTIONS.map((col, idx) => (
          <div
            key={col.id}
            className="group bg-[#F3EDE5]/40 rounded-xs overflow-hidden border border-[#D9C7B3]/40 flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 w-full overflow-hidden bg-[#FAF7F2]">
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#302522]/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-xs px-3 py-1 rounded-xs text-[10px] uppercase tracking-wider text-[#302522] font-sans">
                Edit 0{idx + 1}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex justify-between items-baseline">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#302522]">
                  {col.title}
                </h2>
                <span className="text-xs text-[#766157] font-sans">
                  {col.productCount} Pieces
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#766157] leading-relaxed font-sans">
                {col.subtitle}
              </p>
              <div className="pt-4">
                <Link
                  href={`/shop?collection=${encodeURIComponent(col.title)}`}
                  className="btn-primary py-3 px-6 text-xs tracking-wider inline-flex items-center gap-2"
                >
                  <span>Explore Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
