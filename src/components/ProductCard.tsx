"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { Heart, Eye, Plus, Zap, Star, ShieldCheck, Check } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { isInWishlist, toggleWishlist, openQuickView, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "S");
  const [isHovered, setIsHovered] = useState(false);
  const [quickSizeOpen, setQuickSizeOpen] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const activeImage = isHovered && product.secondaryImage ? product.secondaryImage : product.images[0];

  const compareAt = product.compareAtPrice || Math.round(product.price * 1.45);
  const savingsPct = Math.round(((compareAt - product.price) / compareAt) * 100);

  const handleQuickAdd = (size: string) => {
    addToCart(product, size, selectedColor);
    setQuickSizeOpen(false);
  };

  const handleInstantBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, selectedSize, selectedColor);
    router.push("/checkout");
  };

  return (
    <div
      className="group relative flex flex-col bg-white rounded-xs border border-[#C5A059]/25 hover:border-[#C5A059] transition-all duration-300 shadow-2xs hover:shadow-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickSizeOpen(false);
      }}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/5 w-full bg-[#FAF7F2] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="relative block w-full h-full">
          <Image
            src={activeImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#120E0D] text-[#F4E8C1] border border-[#C5A059]/60 text-[9px] uppercase tracking-widest px-2.5 py-1 font-sans font-semibold rounded-2xs shadow-md">
              {product.badge}
            </span>
          )}
          {savingsPct > 0 && (
            <span className="bg-[#C5A059] text-[#120E0D] text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-2xs shadow-xs self-start">
              Save {savingsPct}%
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-300 z-10 ${
            inWishlist
              ? "bg-[#120E0D] text-[#D4AF37] shadow-md border border-[#C5A059]"
              : "bg-white/85 text-[#211917] hover:bg-white hover:text-[#D4AF37] shadow-xs"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`} />
        </button>

        {/* Quick View trigger */}
        <button
          onClick={() => openQuickView(product)}
          className="absolute bottom-3 right-3 bg-white/90 hover:bg-[#120E0D] text-[#211917] hover:text-[#F4E8C1] p-2 rounded-xs shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          title="Quick Inspection"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Rating Snippet */}
          <div className="flex items-center gap-1.5 text-xs text-[#766157]">
            <div className="flex text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <span className="text-[11px] font-sans font-medium text-[#211917]">
              {product.rating} ({product.reviewCount})
            </span>
          </div>

          {/* Title */}
          <Link
            href={`/product/${product.slug}`}
            className="font-serif text-lg text-[#211917] group-hover:text-[#766157] transition-colors leading-snug block mt-1 line-clamp-1 font-medium"
          >
            {product.name}
          </Link>

          <p className="text-[11px] text-[#766157] line-clamp-1 font-sans mt-0.5">
            {product.tagline}
          </p>

          {/* Pricing with Strike-through */}
          <div className="flex items-baseline gap-2 mt-2">
            <span className="font-sans text-lg font-bold text-[#120E0D]">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="font-sans text-xs line-through text-[#766157]/70">
              ₹{compareAt.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">
              Limited Atelier Run
            </span>
          </div>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 pt-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                  selectedColor === color.name
                    ? "border-[#120E0D] scale-125 ring-1 ring-[#C5A059]"
                    : "border-black/20 hover:scale-110"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-[#766157] ml-1 font-sans">
              {product.colors.length} premium shades
            </span>
          </div>
        </div>

        {/* Action Buttons: Add to Bag & Buy Now (Like sockscarving.in) */}
        <div className="pt-2 border-t border-[#D9C7B3]/30 space-y-1.5">
          {quickSizeOpen ? (
            <div className="bg-[#FAF8F5] p-2 rounded-xs border border-[#C5A059]/40 animate-fadeIn text-center">
              <span className="text-[10px] uppercase tracking-wider text-[#766157] block mb-1">
                Choose Size:
              </span>
              <div className="flex justify-center gap-1.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => handleQuickAdd(sz)}
                    className="w-7 h-7 text-[11px] font-sans font-semibold uppercase bg-white hover:bg-[#120E0D] hover:text-[#F4E8C1] border border-[#C5A059]/60 rounded-2xs transition-colors"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setQuickSizeOpen(true)}
                className="py-2.5 px-2 bg-[#FAF7F2] hover:bg-[#120E0D] text-[#211917] hover:text-[#FAF7F2] border border-[#C5A059]/50 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-2xs transition-all flex items-center justify-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#C5A059]" />
                <span>Add to Bag</span>
              </button>

              <button
                onClick={handleInstantBuyNow}
                className="py-2.5 px-2 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] hover:from-[#E5BE4A] hover:to-[#D4AF37] text-[#120E0D] font-sans font-bold text-[10px] uppercase tracking-wider rounded-2xs shadow-xs transition-all flex items-center justify-center gap-1"
              >
                <Zap className="w-3 h-3 fill-current" />
                <span>Buy Now</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
