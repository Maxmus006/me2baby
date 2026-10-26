"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Crown, Zap } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    closeCart,
    cartSubtotal,
    freeShippingThreshold,
    shippingRemaining,
    isFreeShipping,
    updateQuantity,
    removeFromCart,
    discountCode,
    discountAmount,
    applyDiscount,
    removeDiscount,
    orderTotal,
  } = useStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  if (!cartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyDiscount(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoError("");
      setPromoInput("");
    }
  };

  const progressPct = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#120E0D]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className="relative w-full max-w-md bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between z-10 animate-slideLeft border-l border-[#C5A059]/40">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#C5A059]/30 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="font-serif text-2xl text-[#120E0D] tracking-wide">
                Your Shopping Bag
              </h2>
            </div>
            <p className="text-xs text-[#766157] font-sans">
              {cart.length === 0 ? "Empty" : `${cart.reduce((a, b) => a + b.quantity, 0)} premium pieces selected`}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-[#766157] hover:text-[#302522] transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#F3EDE5] px-6 py-3 border-b border-[#D9C7B3]/30">
          <div className="text-xs text-[#302522] flex justify-between font-sans mb-1.5">
            {isFreeShipping ? (
              <span className="font-medium text-[#302522]">
                ✨ Congratulations! You unlocked <span className="underline">Free Shipping</span>
              </span>
            ) : (
              <span>
                Add <strong className="text-[#302522]">₹{Math.round(shippingRemaining).toLocaleString('en-IN')}</strong> more for complimentary delivery
              </span>
            )}
            <span className="text-[#766157]">{progressPct}%</span>
          </div>
          <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#C9A6A0] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F3EDE5] mx-auto flex items-center justify-center text-[#766157]">
                <ShieldCheck className="w-8 h-8 text-[#C9A6A0]" />
              </div>
              <h3 className="font-serif text-xl text-[#302522]">Your bag is currently empty</h3>
              <p className="text-xs text-[#766157] max-w-xs mx-auto leading-relaxed">
                Discover our considered essentials made with soft-touch finishes and effortless silhouettes.
              </p>
              <button
                onClick={closeCart}
                className="btn-primary mt-2 text-xs"
              >
                Explore The Collection
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-[#D9C7B3]/30 last:border-b-0"
              >
                <div className="relative w-20 h-24 bg-[#F3EDE5] shrink-0 overflow-hidden rounded-xs">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-serif text-base text-[#302522] leading-snug">
                        {item.name}
                      </h4>
                      <span className="font-sans text-sm font-medium text-[#302522]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-[#766157]">
                      <span>Size: <strong className="text-[#302522]">{item.size}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-black/10"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        {item.color}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#766157]/70 font-mono mt-0.5">
                      SKU: {item.sku}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity controls */}
                    <div className="inline-flex items-center border border-[#D9C7B3]/60 rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 text-[#766157] hover:text-[#302522]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-sans text-[#302522] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 text-[#766157] hover:text-[#302522]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-[#766157] hover:text-[#C9A6A0] inline-flex items-center gap-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Totals */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#FAF7F2] border-t border-[#D9C7B3]/40 space-y-4">
            {/* Promo code form */}
            {discountCode ? (
              <div className="flex items-center justify-between bg-[#F3EDE5] p-2.5 rounded-xs text-xs">
                <span className="flex items-center gap-1.5 text-[#302522] font-medium">
                  <Tag className="w-3.5 h-3.5 text-[#C9A6A0]" />
                  Code: {discountCode} (-₹{discountAmount.toLocaleString('en-IN')})
                </span>
                <button
                  onClick={removeDiscount}
                  className="text-[#766157] hover:text-[#302522] underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Gift or promo code (e.g. WELCOME10)"
                    className="flex-1 bg-white border border-[#D9C7B3]/60 px-3 py-2 text-xs text-[#302522] placeholder:text-[#766157]/60 focus:outline-hidden focus:border-[#302522]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 text-xs uppercase tracking-wider bg-[#F3EDE5] hover:bg-[#D9C7B3] text-[#302522] transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-[11px] text-[#C9A6A0]">{promoError}</p>
                )}
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#766157] pt-2 border-t border-[#D9C7B3]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#302522] font-medium">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C9A6A0]">
                  <span>Privilege Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-[#302522]">
                  {isFreeShipping ? "Free" : "₹149"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-serif text-[#302522] pt-2 border-t border-[#D9C7B3]/30">
                <span className="font-medium text-base">Estimated Total</span>
                <span className="font-sans font-semibold text-base">₹{orderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full btn-buy-now-premium py-4 flex items-center justify-center gap-2 group text-xs tracking-[0.16em]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Instant Secure Checkout (₹{orderTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="flex justify-between items-center text-[11px] text-[#766157] px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#766157]" />
                  Discreet Plain Packaging
                </span>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="underline hover:text-[#302522]"
                >
                  View Full Bag
                </Link>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
