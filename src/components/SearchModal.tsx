"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS, Product } from "@/data/products";
import { Search, X, ArrowRight } from "lucide-react";

export default function SearchModal() {
  const { searchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, closeSearch]);

  if (!searchOpen) return null;

  const results: Product[] = query.trim()
    ? PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
        );
      })
    : [];

  const quickPills = ["Soft Bra", "Silk Camisole", "Lounge", "Briefs", "Second-Skin"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302522]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeSearch}
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 flex justify-center items-start">
        <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-xs shadow-2xl p-6 sm:p-8 border border-[#D9C7B3]/40 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D9C7B3]/40">
            <span className="text-xs uppercase tracking-[0.2em] text-[#766157] font-sans">
              Search The Collection
            </span>
            <button
              onClick={closeSearch}
              className="text-[#766157] hover:text-[#302522] p-1"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative my-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#766157]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by silhouette, fabric, or piece..."
              className="w-full bg-[#F3EDE5] border border-[#D9C7B3]/40 rounded-none pl-12 pr-10 py-3.5 text-sm sm:text-base text-[#302522] placeholder:text-[#766157]/60 focus:outline-hidden focus:border-[#302522]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#766157] hover:text-[#302522]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="py-2">
              <span className="text-xs text-[#766157] block mb-2 font-sans tracking-wider">
                Popular Searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPills.map((pill) => (
                  <button
                    key={pill}
                    onClick={() => setQuery(pill)}
                    className="text-xs bg-[#F3EDE5] hover:bg-[#D9C7B3]/50 text-[#302522] px-3 py-1.5 rounded-xs transition-colors"
                  >
                    {pill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() && (
            <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
              <div className="text-xs text-[#766157] mb-2 font-sans">
                Found {results.length} result{results.length === 1 ? "" : "s"} for &quot;{query}&quot;
              </div>

              {results.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#766157]">
                  No pieces matched your search. Try searching for &quot;Bra&quot;, &quot;Briefs&quot;, or &quot;Lounge&quot;.
                </div>
              ) : (
                results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center gap-4 p-2 hover:bg-[#F3EDE5] rounded-xs transition-colors group"
                  >
                    <div className="relative w-14 h-16 bg-[#F3EDE5] shrink-0 overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="56px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-base text-[#302522] group-hover:text-[#766157] transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#766157] truncate">{product.tagline}</p>
                      <span className="text-xs font-sans text-[#302522] font-medium mt-0.5 block">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#766157] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))
              )}
            </div>
          )}

          {/* Footer Link */}
          <div className="mt-6 pt-4 border-t border-[#D9C7B3]/40 flex justify-between items-center text-xs text-[#766157]">
            <span>Press Esc to close</span>
            <Link
              href="/shop"
              onClick={closeSearch}
              className="text-[#302522] hover:underline"
            >
              Browse Full Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
