"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { X, Heart, ShieldCheck, Ruler, ArrowRight, Check } from "lucide-react";

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, isInWishlist, toggleWishlist, openSizeGuide } = useStore();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]?.name || "");
      setSelectedSize(quickViewProduct.sizes[0] || "");
      setActiveImageIndex(0);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const inWishlist = isInWishlist(product.id);

  const handleAdd = () => {
    const success = addToCart(product, selectedSize, selectedColor);
    if (success) {
      closeQuickView();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#302522]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeQuickView}
      />

      <div className="relative min-h-screen px-4 py-8 sm:py-16 flex justify-center items-center">
        <div className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-xs shadow-2xl p-6 sm:p-8 border border-[#D9C7B3]/40 animate-fadeIn">
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-10 p-2 text-[#766157] hover:text-[#302522] bg-white/80 rounded-full"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-4/5 bg-[#F3EDE5] overflow-hidden rounded-xs">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#302522] text-[#FAF7F2] text-[10px] uppercase tracking-widest px-2.5 py-1 font-sans">
                    {product.badge}
                  </span>
                )}
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 bg-[#F3EDE5] overflow-hidden border transition-all ${
                        activeImageIndex === idx
                          ? "border-[#302522]"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Selection */}
            <div className="space-y-5">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#766157] font-sans">
                  {product.category}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#302522] mt-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="font-sans text-xl text-[#302522] font-medium">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-[#766157] border-l border-[#D9C7B3] pl-3">
                    Complimentary Express Shipping
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#302522] font-medium">
                    Color: <span className="font-normal text-[#766157]">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color.name
                          ? "border-[#302522] scale-110"
                          : "border-transparent hover:scale-105"
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-5 h-5 rounded-full inline-block border border-black/15"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#302522] font-medium">
                    Select Size: <span className="font-normal text-[#766157]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => {
                      closeQuickView();
                      openSizeGuide(product.category === "Innerwear" ? "Bras" : product.category === "Leggings" ? "Briefs" : "Lounge");
                    }}
                    className="inline-flex items-center gap-1 text-[#766157] hover:text-[#302522] underline text-[11px]"
                  >
                    <Ruler className="w-3 h-3" />
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-sans tracking-wider uppercase border transition-all ${
                        selectedSize === size
                          ? "bg-[#302522] text-[#FAF7F2] border-[#302522]"
                          : "bg-white text-[#302522] border-[#D9C7B3]/60 hover:border-[#302522]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex-1 btn-primary py-3.5 text-xs tracking-[0.16em]"
                  >
                    Add To Shopping Bag
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 border border-[#D9C7B3]/60 hover:border-[#302522] transition-colors flex items-center justify-center ${
                      inWishlist ? "text-[#C9A6A0] bg-[#F3EDE5]" : "text-[#766157]"
                    }`}
                    title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>
                </div>

                <div className="flex justify-between items-center text-xs pt-2">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeQuickView}
                    className="text-[#302522] hover:text-[#766157] inline-flex items-center gap-1.5 font-medium group"
                  >
                    <span>View Full Product Experience</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <span className="flex items-center gap-1 text-[11px] text-[#766157]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C9A6A0]" />
                    Discreet shipping
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
