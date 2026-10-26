"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, Product } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X, ArrowUpDown, Grid3X3, Grid2X2, Sparkles, Heart } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const initialDepartment = searchParams.get("department") || "All";
  const initialCollection = searchParams.get("collection") || "All";
  const initialFilter = searchParams.get("filter") || "";
  const initialBadge = searchParams.get("badge") || "";

  const { products: storeProducts } = useStore();
  const catalog = storeProducts && storeProducts.length > 0 ? storeProducts : PRODUCTS;

  const [department, setDepartment] = useState<string>(initialDepartment);
  const [category, setCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>("All");
  const [selectedColor, setSelectedColor] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<2 | 3>(3);

  React.useEffect(() => {
    const cat = searchParams.get("category");
    const dept = searchParams.get("department");
    if (cat) setCategory(cat);
    if (dept) setDepartment(dept);
  }, [searchParams]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return catalog.filter((p) => {
      // Department filter (Women vs Girls & Kids)
      if (department !== "All" && p.department.toLowerCase() !== department.toLowerCase()) return false;

      // Category filter (Innerwear vs Night Comfort vs Leggings)
      if (category !== "All" && p.category.toLowerCase() !== category.toLowerCase()) return false;

      // Collection filter
      if (initialCollection !== "All" && p.collection.toLowerCase() !== initialCollection.toLowerCase()) return false;

      // Badge / New arrival filter
      if (initialFilter === "new" && p.badge !== "NEW ARRIVAL") return false;
      if (initialBadge && p.badge !== initialBadge) return false;

      // Size filter
      if (selectedSize !== "All" && !p.sizes.includes(selectedSize)) return false;

      // Color filter
      if (selectedColor !== "All" && !p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) return false;

      // Price filter
      if (p.price > maxPrice) return false;

      // In stock check
      if (inStockOnly && !p.variants.some((v) => v.inStock)) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") {
        return (b.badge === "NEW ARRIVAL" ? 1 : 0) - (a.badge === "NEW ARRIVAL" ? 1 : 0);
      }
      return 0; // featured default order
    });
  }, [department, category, initialCollection, initialFilter, initialBadge, selectedSize, selectedColor, maxPrice, inStockOnly, sortBy]);

  const allSizes = ["XS", "S", "M", "L", "XL", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"];
  const allColors = [
    { name: "Warm Ivory", hex: "#FAF7F2" },
    { name: "Soft Blush", hex: "#E8C8C2" },
    { name: "Rich Espresso", hex: "#211917" },
    { name: "Dusty Cocoa", hex: "#766157" },
    { name: "Champagne Gold", hex: "#D9C7B3" },
    { name: "Soft Cream", hex: "#F3EDE5" },
  ];

  const clearFilters = () => {
    setDepartment("All");
    setCategory("All");
    setSelectedSize("All");
    setSelectedColor("All");
    setMaxPrice(6000);
    setInStockOnly(false);
  };

  const hasActiveFilters =
    department !== "All" ||
    category !== "All" ||
    selectedSize !== "All" ||
    selectedColor !== "All" ||
    maxPrice < 6000 ||
    inStockOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Category Header */}
      <div className="border-b border-[#C5A059]/35 pb-8 mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-sans font-bold flex items-center justify-center sm:justify-start gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            {initialCollection !== "All" ? initialCollection : "Me2baby Premium Comfort Boutique"}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#120E0D]">
            {department !== "All"
              ? `${department} — ${category === "All" ? "Collection" : category}`
              : category === "All"
              ? "Women's & Girls' Collection"
              : category}
          </h1>
          <p className="text-xs sm:text-sm text-[#766157] mt-1 max-w-xl font-sans">
            Exclusively premium innerwear, cloud-soft night comfort wear, and butter-soft leggings.
          </p>
        </div>

        <div className="flex items-center justify-center sm:justify-end gap-3 text-xs text-[#766157]">
          <span>{filteredProducts.length} pieces available</span>
          <span className="opacity-40">|</span>
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1.5 rounded-xs transition-colors ${gridColumns === 2 ? "bg-[#211917] text-white" : "text-[#766157]"}`}
              title="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded-xs transition-colors ${gridColumns === 3 ? "bg-[#211917] text-white" : "text-[#766157]"}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Department & Category Quick Pills */}
      <div className="space-y-4 pb-6 border-b border-[#D9C7B3]/25 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Department Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
            <span className="text-[11px] font-semibold text-[#766157] uppercase tracking-wider mr-1">Audience:</span>
            {[
              { label: "All Items", val: "All" },
              { label: "Women's Comfort", val: "Women" },
              { label: "Girls & Kids", val: "Girls & Kids" }
            ].map((d) => (
              <button
                key={d.val}
                onClick={() => setDepartment(d.val)}
                className={`px-3.5 py-1.5 rounded-xs transition-all ${
                  department === d.val
                    ? "bg-[#211917] text-[#FAF8F5] font-semibold shadow-xs"
                    : "bg-[#F3EDE5] text-[#766157] hover:text-[#211917]"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <span className="text-[#766157]">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-[#C5A059]/40 rounded-xs px-2.5 py-1.5 text-xs text-[#211917] focus:outline-hidden focus:border-[#C5A059]"
            >
              <option value="featured">Bestsellers &amp; Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Patron Rating</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-sans">
          <span className="text-[11px] font-semibold text-[#766157] uppercase tracking-wider mr-1">Category:</span>
          {["All", "Innerwear", "Night Comfort", "Leggings"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 text-xs rounded-2xs border transition-all ${
                category === cat
                  ? "border-[#C5A059] bg-[#FAF8F5] text-[#120E0D] font-bold"
                  : "border-transparent text-[#766157] hover:text-[#120E0D]"
              }`}
            >
              {cat === "All" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block space-y-6 text-xs font-sans">
          {/* Size Filter */}
          <div className="space-y-3 pb-6 border-b border-[#D9C7B3]/30">
            <h4 className="font-serif text-base text-[#120E0D]">Filter by Size</h4>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize("All")}
                className={`py-1.5 px-3 rounded-2xs border text-[11px] font-sans ${
                  selectedSize === "All"
                    ? "bg-[#211917] text-white border-[#211917]"
                    : "bg-white text-[#766157] border-[#D9C7B3]"
                }`}
              >
                All
              </button>
              {allSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`py-1.5 px-3 rounded-2xs border text-[11px] font-sans ${
                    selectedSize === sz
                      ? "bg-[#211917] text-white border-[#211917]"
                      : "bg-white text-[#766157] border-[#D9C7B3] hover:border-[#C5A059]"
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3 pb-6 border-b border-[#D9C7B3]/30">
            <h4 className="font-serif text-base text-[#120E0D]">Shade &amp; Tone</h4>
            <div className="flex flex-wrap gap-2">
              {allColors.map((col) => (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(selectedColor === col.name ? "All" : col.name)}
                  className={`w-6 h-6 rounded-full border-2 transition-transform ${
                    selectedColor === col.name
                      ? "scale-125 border-[#211917] ring-1 ring-[#C5A059]"
                      : "border-black/20 hover:scale-110"
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3 pb-6 border-b border-[#D9C7B3]/30">
            <div className="flex justify-between items-center">
              <h4 className="font-serif text-base text-[#120E0D]">Max Price</h4>
              <span className="font-sans font-bold text-[#211917]">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="999"
              max="6000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C5A059]"
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#C5A059] hover:underline font-semibold"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Grid Column */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white rounded-xs border border-[#C5A059]/20 p-8">
              <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto" />
              <h3 className="font-serif text-2xl text-[#120E0D]">No Pieces Match Your Filters</h3>
              <p className="text-xs text-[#766157] max-w-sm mx-auto">
                Try widening your price range or clearing selected size filters to explore all women&apos;s and girls&apos; pieces.
              </p>
              <button
                onClick={clearFilters}
                className="btn-primary py-2.5 px-6 text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridColumns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              }`}
            >
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto py-20 text-center text-xs text-[#766157]">Loading Me2baby Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
