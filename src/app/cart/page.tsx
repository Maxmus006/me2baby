"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Lock, Zap, Crown } from "lucide-react";

export default function CartPage() {
  const {
    cart,
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

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [giftNote, setGiftNote] = useState("");
  const [showGiftInput, setShowGiftInput] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    applyDiscount(promoCodeInput);
    setPromoCodeInput("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="border-b border-[#D9C7B3]/40 pb-6 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl text-[#302522]">
          Your Shopping Bag
        </h1>
        <p className="text-xs sm:text-sm text-[#766157] font-sans mt-1">
          {cart.length === 0 ? "No items in bag" : `${cart.reduce((a, b) => a + b.quantity, 0)} carefully selected pieces`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-[#F3EDE5]/30 rounded-xs border border-[#D9C7B3]/30 p-8 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAF7F2] mx-auto flex items-center justify-center text-[#766157]">
            <ShieldCheck className="w-8 h-8 text-[#C9A6A0]" />
          </div>
          <h2 className="font-serif text-2xl text-[#302522]">Your bag is currently empty</h2>
          <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
            Take your time browsing our collection of wireless bras, invisible second-skin briefs, and cashmere loungewear.
          </p>
          <div className="pt-2">
            <Link href="/shop" className="btn-primary text-xs tracking-wider">
              Explore The Collection
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Table / Items Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free shipping banner */}
            <div className="bg-[#F3EDE5] p-4 rounded-xs border border-[#D9C7B3]/40 text-xs text-[#302522]">
              {isFreeShipping ? (
                <span className="font-medium">
                  ✨ You have unlocked Complimentary Express Shipping.
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#302522]">₹{Math.round(shippingRemaining).toLocaleString('en-IN')}</strong> more to receive complimentary delivery above ₹{freeShippingThreshold.toLocaleString('en-IN')}.
                </span>
              )}
            </div>

            {/* List */}
            <div className="divide-y divide-[#D9C7B3]/40 border-t border-b border-[#D9C7B3]/40">
              {cart.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-24 bg-[#F3EDE5] overflow-hidden rounded-xs shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <Link href={`/product/${item.slug}`} className="font-serif text-lg text-[#302522] hover:text-[#766157]">
                        {item.name}
                      </Link>
                      <div className="text-xs text-[#766157] flex items-center gap-2 mt-1 font-sans">
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
                      <span className="text-xs text-[#302522] font-sans font-medium mt-1 block">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    {/* Quantity */}
                    <div className="inline-flex items-center border border-[#D9C7B3]/70 rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-[#766157] hover:text-[#302522]"
                        aria-label="Decrease"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-sans text-[#302522] font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-[#766157] hover:text-[#302522]"
                        aria-label="Increase"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Line total */}
                    <span className="font-sans text-sm font-semibold text-[#302522] min-w-[60px] text-right">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#766157] hover:text-[#C9A6A0] p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Note Option */}
            <div className="pt-2">
              <button
                onClick={() => setShowGiftInput(!showGiftInput)}
                className="text-xs text-[#766157] hover:text-[#302522] underline"
              >
                {showGiftInput ? "Close complimentary gift message" : "+ Add a complimentary handwritten note"}
              </button>
              {showGiftInput && (
                <div className="mt-3 animate-fadeIn">
                  <textarea
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your personal note here (max 250 characters). We handwrite this on heavy letterpress cardstock."
                    rows={3}
                    maxLength={250}
                    className="w-full bg-[#F3EDE5]/50 border border-[#D9C7B3]/70 p-3 text-xs text-[#302522] focus:outline-hidden"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-4 bg-[#F3EDE5]/40 p-6 sm:p-8 rounded-xs border border-[#D9C7B3]/40 space-y-5">
            <h2 className="font-serif text-2xl text-[#302522]">Order Summary</h2>

            {/* Promo Code */}
            {discountCode ? (
              <div className="flex items-center justify-between bg-white p-3 rounded-xs text-xs border border-[#D9C7B3]/60">
                <span className="flex items-center gap-1.5 text-[#302522] font-medium">
                  <Tag className="w-3.5 h-3.5 text-[#C9A6A0]" />
                  {discountCode} (-₹{discountAmount.toLocaleString('en-IN')})
                </span>
                <button
                  onClick={removeDiscount}
                  className="text-[#766157] hover:text-[#302522] underline text-[11px]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex gap-2">
                <input
                  type="text"
                  value={promoCodeInput}
                  onChange={(e) => setPromoCodeInput(e.target.value)}
                  placeholder="Promo Code (e.g. PREMIUM15)"
                  className="flex-1 bg-white border border-[#D9C7B3]/70 px-3 py-2 text-xs text-[#302522] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs uppercase tracking-wider bg-[#302522] text-[#FAF7F2] hover:bg-[#766157] transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            {/* Totals Breakdown */}
            <div className="space-y-2 text-xs text-[#766157] pt-2 border-t border-[#D9C7B3]/30 font-sans">
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
                <span>Estimated Standard Shipping</span>
                <span className="text-[#302522]">{isFreeShipping ? "Free" : "₹149"}</span>
              </div>
              <div className="flex justify-between text-base font-serif text-[#302522] pt-3 border-t border-[#D9C7B3]/40">
                <span className="font-medium">Estimated Total</span>
                <span className="font-sans font-semibold">₹{orderTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/checkout"
                className="w-full btn-buy-now-premium py-4 flex items-center justify-center gap-2 text-xs tracking-[0.16em]"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Proceed to Secure Checkout (₹{orderTotal.toLocaleString('en-IN')})</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <p className="text-[11px] text-[#766157] text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C9A6A0]" />
                <span>Discreet unbranded packaging on every order</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
