"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Heart, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, wishlistCount } = useStore();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <div className="border-b border-[#D9C7B3]/40 pb-6 text-center sm:text-left flex flex-col sm:flex-row justify-between sm:items-end gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans block mb-1">
            Personal Curation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#302522]">
            Your Saved Pieces
          </h1>
          <p className="text-xs text-[#766157] font-sans mt-0.5">
            {wishlistCount === 0 ? "No saved items" : `${wishlistCount} essentials saved for later`}
          </p>
        </div>

        {wishlistCount > 0 && (
          <Link href="/shop" className="text-xs text-[#302522] hover:text-[#C9A6A0] inline-flex items-center gap-1 font-sans">
            <span>Continue Browsing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {savedProducts.length === 0 ? (
        <div className="text-center py-20 bg-[#F3EDE5]/30 rounded-xs border border-[#D9C7B3]/30 p-8 space-y-4 max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] mx-auto flex items-center justify-center text-[#766157]">
            <Heart className="w-6 h-6 text-[#C9A6A0]" />
          </div>
          <h2 className="font-serif text-2xl text-[#302522]">Your wishlist is currently empty</h2>
          <p className="text-xs text-[#766157] leading-relaxed">
            Click the heart icon on any bra, brief, or lounge piece to save it to your personal curation.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-xs tracking-wider">
              Explore The Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
