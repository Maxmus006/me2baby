"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Package,
  Truck,
  CreditCard,
  ArrowRight,
  Sparkles,
  Crown,
  Zap,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, cartSubtotal, isFreeShipping, discountCode, discountAmount, orderTotal, clearCart } = useStore();

  const [step, setStep] = useState<"details" | "success">("details");
  const [orderId, setOrderId] = useState<string>("");

  // Form Fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("India");
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "stripe_demo" | "razorpay_demo">("card");

  // Mock Card Inputs
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shippingCost = isFreeShipping
    ? 0
    : shippingMethod === "express"
    ? 249
    : 149;

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !zip) {
      setErrorMessage("Please complete all required shipping fields.");
      return;
    }

    setErrorMessage("");
    setIsProcessing(true);

    // Simulate verified backend payment transaction
    setTimeout(() => {
      const generatedId = "M2B-" + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep("success");
      clearCart();
    }, 1200);
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F3EDE5] mx-auto flex items-center justify-center text-[#302522]">
          <CheckCircle2 className="w-9 h-9 text-[#C9A6A0]" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
            Payment Verified & Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#302522]">
            Thank You for Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#766157] font-sans">
            Order Reference: <strong className="text-[#302522] font-mono">{orderId}</strong>
          </p>
        </div>

        <div className="bg-[#F3EDE5]/60 border border-[#D9C7B3]/50 p-6 rounded-xs text-left text-xs text-[#766157] space-y-3 font-sans">
          <div className="flex justify-between items-center pb-3 border-b border-[#D9C7B3]/40">
            <span className="font-medium text-[#302522]">Discreet Delivery Address</span>
            <span className="text-[#C9A6A0]">Standard 2–4 Business Days</span>
          </div>
          <p className="leading-relaxed">
            {firstName} {lastName} <br />
            {address} {apartment && `, ${apartment}`} <br />
            {city}, {state} {zip}, {country}
          </p>
          <p className="pt-2 text-[11px] text-[#766157]/80">
            A confirmation receipt has been sent to <strong className="text-[#302522]">{email}</strong>.
            Your parcel will arrive in our neutral, unbranded FSC-certified box.
          </p>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <Link href="/shop" className="btn-primary text-xs tracking-wider">
            Continue Shopping
          </Link>
          <Link href="/account" className="btn-secondary text-xs tracking-wider">
            View Order In Account
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl text-[#302522]">There are no items to checkout</h2>
        <p className="text-xs text-[#766157]">Please add pieces to your bag before proceeding to checkout.</p>
        <Link href="/shop" className="btn-primary text-xs mt-2">
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="border-b border-[#D9C7B3]/40 pb-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#302522]">
            Secure Checkout
          </h1>
          <p className="text-xs text-[#766157] font-sans mt-0.5">
            Test mode simulation · No live card charges
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#766157]">
          <Lock className="w-3.5 h-3.5 text-[#C9A6A0]" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form: Contact & Shipping */}
        <div className="lg:col-span-7 space-y-8">
          {/* Contact */}
          <div className="space-y-4">
            <h2 className="font-serif text-xl text-[#302522]">1. Contact Details</h2>
            <div>
              <label className="block text-xs text-[#766157] mb-1 font-sans">
                Email Address for Order Confirmation *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
              />
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-4 pt-4 border-t border-[#D9C7B3]/30">
            <h2 className="font-serif text-xl text-[#302522]">2. Discreet Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#766157] mb-1 font-sans">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#766157] mb-1 font-sans">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#766157] mb-1 font-sans">Street Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Apartment number and street name"
                className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
              />
            </div>

            <div>
              <label className="block text-xs text-[#766157] mb-1 font-sans">Apartment, Suite, Unit (Optional)</label>
              <input
                type="text"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#766157] mb-1 font-sans">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#766157] mb-1 font-sans">State / Province</label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#766157] mb-1 font-sans">Postal Code *</label>
                <input
                  type="text"
                  required
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full bg-white border border-[#D9C7B3]/70 px-3.5 py-2.5 text-xs text-[#302522] focus:outline-hidden focus:border-[#302522]"
                />
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="space-y-4 pt-4 border-t border-[#D9C7B3]/30">
            <h2 className="font-serif text-xl text-[#302522]">3. Delivery Method</h2>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-3.5 border border-[#D9C7B3]/60 bg-white rounded-xs cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "standard"}
                    onChange={() => setShippingMethod("standard")}
                    className="accent-[#302522]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#302522] block font-sans">
                      Carbon-Neutral Standard Delivery (2–4 Business Days)
                    </span>
                    <span className="text-[11px] text-[#766157]">Anonymous plain Kraft packaging</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#302522]">
                  {isFreeShipping ? "Free" : "₹149"}
                </span>
              </label>

              <label className="flex items-center justify-between p-3.5 border border-[#D9C7B3]/60 bg-white rounded-xs cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="accent-[#302522]"
                  />
                  <div>
                    <span className="text-xs font-medium text-[#302522] block font-sans">
                      Priority Air Courier (1–2 Business Days)
                    </span>
                    <span className="text-[11px] text-[#766157]">Expedited transit & signature on arrival</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#302522]">₹249</span>
              </label>
            </div>
          </div>

          {/* Payment Selection */}
          <div className="space-y-4 pt-4 border-t border-[#D9C7B3]/30">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-xl text-[#302522]">4. Payment Selection</h2>
              <span className="text-[11px] px-2 py-0.5 bg-[#F3EDE5] text-[#766157] rounded-xs font-sans">
                Demo Test Environment
              </span>
            </div>

            <div className="space-y-3">
              {/* Payment Tabs */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-2 text-xs border rounded-xs ${
                    paymentMethod === "card"
                      ? "bg-[#302522] text-white border-[#302522]"
                      : "bg-white text-[#766157] border-[#D9C7B3]/60"
                  }`}
                >
                  Credit / Debit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("stripe_demo")}
                  className={`flex-1 py-2 text-xs border rounded-xs ${
                    paymentMethod === "stripe_demo"
                      ? "bg-[#302522] text-white border-[#302522]"
                      : "bg-white text-[#766157] border-[#D9C7B3]/60"
                  }`}
                >
                  Stripe Test Mode
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("razorpay_demo")}
                  className={`flex-1 py-2 text-xs border rounded-xs ${
                    paymentMethod === "razorpay_demo"
                      ? "bg-[#302522] text-white border-[#302522]"
                      : "bg-white text-[#766157] border-[#D9C7B3]/60"
                  }`}
                >
                  Razorpay Demo
                </button>
              </div>

              {/* Card Form */}
              <div className="p-4 bg-white border border-[#D9C7B3]/70 rounded-xs space-y-3">
                <div>
                  <label className="block text-xs text-[#766157] mb-1 font-sans">Card Number (Demo Simulator)</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full bg-[#FAF7F2] border border-[#D9C7B3]/60 px-3 py-2 text-xs font-mono text-[#302522]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#766157] mb-1 font-sans">MM / YY</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3]/60 px-3 py-2 text-xs font-mono text-[#302522]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#766157] mb-1 font-sans">CVC</label>
                    <input
                      type="text"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="888"
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3]/60 px-3 py-2 text-xs font-mono text-[#302522]"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-[#766157]/80">
                  This prototype uses a sandbox mock adapter. No actual financial transaction will be charged.
                </p>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full btn-buy-now-premium py-4 text-xs tracking-[0.18em] uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isProcessing ? (
              <span>Verifying Secure Payment Session...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#120E0D]" />
                <span>Complete Order (₹{finalTotal.toLocaleString('en-IN')})</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Order Summary Review */}
        <div className="lg:col-span-5 bg-[#F3EDE5]/40 p-6 sm:p-8 rounded-xs border border-[#D9C7B3]/40 space-y-5">
          <h2 className="font-serif text-2xl text-[#302522]">Order Summary ({cart.length})</h2>

          <div className="divide-y divide-[#D9C7B3]/30 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="relative w-14 h-16 bg-[#FAF7F2] shrink-0 overflow-hidden rounded-xs">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                  <span className="absolute top-0 right-0 bg-[#302522] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-[#302522] truncate">{item.name}</h4>
                  <p className="text-[11px] text-[#766157]">
                    {item.size} / {item.color}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#302522]">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs text-[#766157] pt-3 border-t border-[#D9C7B3]/30 font-sans">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-[#302522]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#C9A6A0]">
                <span>Promotional Discount ({discountCode})</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({shippingMethod === "express" ? "Express" : "Standard"})</span>
              <span className="text-[#302522]">
                {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-serif text-[#302522] pt-3 border-t border-[#D9C7B3]/40">
              <span className="font-medium">Total (INR)</span>
              <span className="font-sans font-semibold">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 border border-[#D9C7B3]/40 rounded-xs text-[11px] text-[#766157] space-y-1">
            <p className="font-medium text-[#302522] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A6A0]" />
              Discreet Delivery Guarantee
            </p>
            <p>
              Your billing description will appear as &quot;ME2BABY RETAIL&quot;. The parcel is unbranded and fully recyclable.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
