"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import {
  Heart,
  Ruler,
  ShieldCheck,
  Plus,
  Minus,
  Check,
  ChevronDown,
  Sparkles,
  ArrowRight,
  Package,
  RefreshCw,
  Star,
  Zap,
  Crown,
  CreditCard,
  Truck,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    notFound();
  }

  const { addToCart, isInWishlist, toggleWishlist, openSizeGuide } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Accordion open states
  const [openSection, setOpenSection] = useState<string>("details");

  const inWishlist = isInWishlist(product.id);
  const compareAt = product.compareAtPrice || Math.round(product.price * 1.45);
  const savingsPct = Math.round(((compareAt - product.price) / compareAt) * 100);

  const matchedVariant = product.variants.find(
    (v) => v.size === selectedSize && v.color === selectedColor
  );
  const inStock = matchedVariant ? matchedVariant.inStock : true;
  const stockCount = matchedVariant ? matchedVariant.stockCount : 12;

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past 500px
      setShowStickyBar(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 3);

  const toggleAccordion = (section: string) => {
    setOpenSection(openSection === section ? "" : section);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-16 pb-24">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-[#766157] font-sans flex items-center gap-2">
        <Link href="/" className="hover:text-[#120E0D]">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-[#120E0D]">
          Premium Collection
        </Link>
        <span>/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-[#120E0D]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#120E0D] font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Display Image */}
          <div className="relative aspect-4/5 w-full bg-[#FAF7F2] overflow-hidden rounded-xs border border-[#C5A059]/40 shadow-md">
            <Image
              src={product.images[activeImageIndex] || product.images[0]}
              alt={`${product.name} editorial photograph`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-[#120E0D] text-[#F4E8C1] border border-[#C5A059] text-[10px] uppercase tracking-widest px-3 py-1 font-sans font-bold shadow-md">
                {product.badge}
              </span>
            )}
            {savingsPct > 0 && (
              <span className="absolute top-4 right-4 bg-[#C5A059] text-[#120E0D] text-xs uppercase tracking-wider font-bold px-2.5 py-1 shadow-md">
                Save {savingsPct}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 bg-[#FAF7F2] overflow-hidden rounded-xs border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#120E0D] ring-2 ring-[#C5A059]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} angle ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Actions & Details */}
        <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                {product.collection}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#766157]">
                <div className="flex text-[#D4AF37]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-sans font-semibold text-[#120E0D]">{product.rating}</span>
                <span className="text-[#766157]">({product.reviewCount} patron notes)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#120E0D] mt-1.5 leading-tight font-medium">
              {product.name}
            </h1>

            {/* Price with Compare-at */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-sans text-3xl font-bold text-[#120E0D]">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="font-sans text-base line-through text-[#766157]/70">
                ₹{compareAt.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-[#C5A059] font-bold bg-[#FAF8F5] border border-[#C5A059]/40 px-2 py-0.5 rounded-2xs">
                Save ₹{(compareAt - product.price).toLocaleString("en-IN")} ({savingsPct}%)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#766157] font-sans mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Color Selection */}
          <div className="pt-2 border-t border-[#D9C7B3]/30">
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="text-[#120E0D] font-medium font-sans">
                Selected Shade: <span className="font-normal text-[#766157]">{selectedColor}</span>
              </span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                    selectedColor === color.name
                      ? "border-[#120E0D] scale-110 ring-2 ring-[#C5A059]"
                      : "border-transparent hover:scale-105"
                  }`}
                  title={color.name}
                >
                  <span
                    className="w-6 h-6 rounded-full inline-block border border-black/15 shadow-2xs"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="pt-2 border-t border-[#D9C7B3]/30">
            <div className="flex justify-between items-center text-xs mb-2.5">
              <span className="text-[#120E0D] font-medium font-sans">
                Select Size: <span className="font-bold text-[#120E0D]">{selectedSize}</span>
              </span>
              <button
                onClick={() =>
                  openSizeGuide(
                    product.category === "Innerwear"
                      ? "Bras"
                      : product.category === "Leggings"
                      ? "Briefs"
                      : "Lounge"
                  )
                }
                className="inline-flex items-center gap-1.5 text-[#C5A059] hover:text-[#120E0D] underline text-xs font-sans font-semibold"
              >
                <Ruler className="w-3.5 h-3.5" />
                Interactive Size Guide
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2.5 text-xs font-sans tracking-wider uppercase border-2 transition-all ${
                    selectedSize === size
                      ? "bg-[#120E0D] text-[#F4E8C1] border-[#120E0D] font-bold"
                      : "bg-white text-[#120E0D] border-[#D9C7B3]/60 hover:border-[#C5A059]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Fit Note */}
            <p className="text-[11px] text-[#766157] mt-2 italic font-sans flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Fit recommendation: {product.fitNotes}</span>
            </p>
          </div>

          {/* Dual Action Commercial Buttons (Reference Site Style) */}
          <div className="pt-2 space-y-3">
            <div className="flex gap-3">
              {/* Quantity selector */}
              <div className="inline-flex items-center border border-[#D9C7B3] rounded-xs bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-[#766157] hover:text-[#120E0D]"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-sans text-[#120E0D] font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-[#766157] hover:text-[#120E0D]"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className="flex-1 btn-primary py-3.5 text-xs tracking-[0.14em] uppercase flex items-center justify-center gap-2"
              >
                <span>Add To Shopping Bag</span>
                <span>•</span>
                <span>₹{(product.price * quantity).toLocaleString("en-IN")}</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 border border-[#D9C7B3] hover:border-[#120E0D] transition-colors flex items-center justify-center ${
                  inWishlist ? "text-[#D4AF37] bg-[#120E0D] border-[#C5A059]" : "text-[#766157]"
                }`}
                title={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Instant Express Buy Now Button (High-Converting Reference Feature) */}
            <button
              onClick={handleBuyNow}
              className="w-full btn-buy-now-premium py-4 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>BUY NOW — INSTANT EXPRESS CHECKOUT</span>
            </button>

            {/* Reassurance Trust Ticker */}
            <div className="p-3.5 bg-[#FAF8F5] border border-[#C5A059]/40 rounded-xs space-y-2 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#120E0D]">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-medium">Ships within 24 Hours via Carbon-Neutral Express Courier</span>
              </div>
              <div className="flex items-center gap-2 text-[#120E0D]">
                <CreditCard className="w-4 h-4 text-[#D4AF37]" />
                <span>Cash on Delivery, UPI & Credit Cards Accepted</span>
              </div>
              <div className="flex items-center gap-2 text-[#120E0D]">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>100% Discreet Unbranded Packaging Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Accordion Tabs for Materials, Fit, Shipping */}
          <div className="pt-4 border-t border-[#D9C7B3]/40 space-y-3">
            {/* 1. Craft & Details */}
            <div className="border border-[#C5A059]/30 rounded-xs bg-white">
              <button
                onClick={() => toggleAccordion("details")}
                className="w-full flex items-center justify-between p-4 text-xs font-sans uppercase tracking-wider text-[#120E0D] font-bold"
              >
                <span>Silhouettes & Atelier Construction</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#766157] transition-transform ${
                    openSection === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "details" && (
                <div className="px-4 pb-4 text-xs text-[#766157] space-y-2 border-t border-[#D9C7B3]/30 pt-3">
                  <ul className="space-y-1.5 list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 2. Materials & Sustainability */}
            <div className="border border-[#C5A059]/30 rounded-xs bg-white">
              <button
                onClick={() => toggleAccordion("materials")}
                className="w-full flex items-center justify-between p-4 text-xs font-sans uppercase tracking-wider text-[#120E0D] font-bold"
              >
                <span>Tactile Materials & Care</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#766157] transition-transform ${
                    openSection === "materials" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "materials" && (
                <div className="px-4 pb-4 text-xs text-[#766157] space-y-3 border-t border-[#D9C7B3]/30 pt-3">
                  <p>
                    <strong className="text-[#120E0D]">Composition:</strong> {product.materials}
                  </p>
                  <div>
                    <strong className="text-[#120E0D] block mb-1">Recommended Care:</strong>
                    <ul className="space-y-1 list-disc list-inside">
                      {product.careInstructions.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Shipping & Discreet Packaging */}
            <div className="border border-[#C5A059]/30 rounded-xs bg-white">
              <button
                onClick={() => toggleAccordion("shipping")}
                className="w-full flex items-center justify-between p-4 text-xs font-sans uppercase tracking-wider text-[#120E0D] font-bold"
              >
                <span>Discreet Shipping & Clear Returns</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#766157] transition-transform ${
                    openSection === "shipping" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSection === "shipping" && (
                <div className="px-4 pb-4 text-xs text-[#766157] space-y-2 border-t border-[#D9C7B3]/30 pt-3">
                  <p>
                    • Every order arrives in an unbranded, neutral Kraft box with no exterior logo or intimate apparel description.
                  </p>
                  <p>
                    • Complimentary shipping on orders above $100. Delivered in 2–4 business days via carbon-neutral transit.
                  </p>
                  <p>
                    • Unworn items with hygienic strips and tags attached are eligible for 30-day trial exchanges.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Complete the Look Carousel */}
      {relatedProducts.length > 0 && (
        <section className="pt-16 border-t border-[#C5A059]/30 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Harmonious Comfort Layers
            </span>
            <h2 className="font-serif text-3xl text-[#120E0D]">
              Complete The Look
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* STICKY FLOATING BUY NOW BAR ON SCROLL (Direct sockscarving.in reference pattern) */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t-2 border-[#C5A059] p-3 sm:p-4 shadow-2xl z-40 animate-slideUp">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-14 bg-[#FAF7F2] rounded-xs overflow-hidden border border-[#D9C7B3] shrink-0 hidden sm:block">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <h4 className="font-serif text-base text-[#120E0D] font-medium line-clamp-1">{product.name}</h4>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-sans font-bold text-[#120E0D]">₹{product.price.toLocaleString("en-IN")}</span>
                  <span className="font-sans line-through text-[#766157]/70">₹{compareAt.toLocaleString("en-IN")}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Save {savingsPct}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="hidden md:inline-flex py-3 px-5 border border-[#120E0D] text-[#120E0D] hover:bg-[#120E0D] hover:text-white text-xs font-sans font-semibold uppercase tracking-wider rounded-2xs transition-colors"
              >
                Add To Bag
              </button>

              <button
                onClick={handleBuyNow}
                className="btn-buy-now-premium py-3 px-6 text-xs font-bold whitespace-nowrap"
              >
                <span>Instant Buy Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
