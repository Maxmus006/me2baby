"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Lock,
  Crown,
  Phone,
  Sparkles
} from "lucide-react";

export default function AccountPage() {
  const { wishlistCount, user, isAdmin, logout, formatPrice } = useStore();
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "addresses">("orders");

  // Mock Orders in INR
  const [orders] = useState([
    {
      id: "M2B-849201",
      date: "October 20, 2026",
      status: "In Transit — Out for Delivery",
      statusStep: 3,
      trackingNumber: "BD-849201938IN",
      total: 3898,
      items: [
        { name: "The Butter-Soft High-Rise Legging", size: "S", color: "Rich Espresso", price: 1899, qty: 1 },
        { name: "The Everyday Wire-Free Sculpt Bra", size: "S", color: "Warm Ivory", price: 1999, qty: 1 },
      ],
    },
    {
      id: "M2B-719302",
      date: "September 28, 2026",
      status: "Delivered",
      statusStep: 4,
      trackingNumber: "BD-661849201IN",
      total: 2999,
      items: [
        { name: "The Mulberry Silk Slip Camisole Set", size: "M", color: "Champagne Gold", price: 2999, qty: 1 },
      ],
    },
  ]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24 font-sans">
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/50 p-8 rounded-xs shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-6 text-center text-[#FAF7F2]">
          <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#D4AF37]/60 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            <Crown className="w-7 h-7 text-[#D4AF37]" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              ME2BABY CLIENT PORTAL
            </span>
            <h1 className="font-serif text-3xl text-white">Patron Sign In Required</h1>
            <p className="text-xs text-white/60 leading-relaxed">
              Please verify your mobile number with a quick one-time password (OTP) to view your orders, saved sizes, and private privileges.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="w-full btn-piano-black py-3.5 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Sign In with Mobile OTP</span>
            </Link>

            <Link
              href="/login?mode=admin"
              className="w-full bg-[#121212] hover:bg-[#1A1A1A] text-white/80 border border-white/15 py-3 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 rounded-2xs transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Administrator Portal Access</span>
            </Link>
          </div>

          <p className="text-[11px] text-white/40 pt-2">
            New patron? Enter any 10-digit mobile number to create your instant atelier account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 font-sans">
      {/* Header Profile Greeting */}
      <div className="bg-[#000000] text-white p-6 sm:p-8 rounded-xs border border-[#D4AF37]/40 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#141414] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shrink-0 shadow-sm">
            {isAdmin ? <Lock className="w-7 h-7" /> : <User className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                {isAdmin ? "OFFICIAL ATELIER ADMINISTRATOR" : "PRIVILEGED ATELIER PATRON"}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white">
              {user.name}
            </h1>
            <p className="text-xs text-white/70 font-sans mt-0.5">
              +91 {user.phone} • Member since {user.joinedDate || "October 2026"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              href="/admin"
              className="btn-piano-black text-xs py-2.5 px-4 font-bold flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin Console</span>
            </Link>
          )}

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white px-3.5 py-2.5 rounded-2xs border border-white/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Quick Callout if Logged in as Admin */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-[#000000] via-[#111111] to-[#0A0A0A] p-4 sm:p-5 rounded-xs border border-[#D4AF37]/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/50 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <strong className="text-white text-sm block">Administrator Authorization Active</strong>
              <span className="text-white/70">
                You have elevated permissions to add and edit products, update specialities &amp; INR prices, and reply to customer inquiries.
              </span>
            </div>
          </div>
          <Link
            href="/admin"
            className="btn-piano-black text-xs py-2 px-5 whitespace-nowrap cursor-pointer shrink-0"
          >
            Open Admin Console →
          </Link>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2 font-sans text-xs">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xs text-left transition-colors cursor-pointer ${
              activeTab === "orders"
                ? "bg-[#000000] text-[#FAF7F2] border border-[#D4AF37]/60 font-semibold"
                : "bg-white text-[#120E0D] border border-[#D9C7B3]/50 hover:bg-[#FAF7F2]"
            }`}
          >
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xs text-left transition-colors cursor-pointer ${
              activeTab === "profile"
                ? "bg-[#000000] text-[#FAF7F2] border border-[#D4AF37]/60 font-semibold"
                : "bg-white text-[#120E0D] border border-[#D9C7B3]/50 hover:bg-[#FAF7F2]"
            }`}
          >
            <User className="w-4 h-4 text-[#D4AF37]" />
            <span>Profile &amp; Fit Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center gap-2.5 p-3 rounded-xs text-left transition-colors cursor-pointer ${
              activeTab === "addresses"
                ? "bg-[#000000] text-[#FAF7F2] border border-[#D4AF37]/60 font-semibold"
                : "bg-white text-[#120E0D] border border-[#D9C7B3]/50 hover:bg-[#FAF7F2]"
            }`}
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Saved Shipping Addresses</span>
          </button>

          <Link
            href="/wishlist"
            className="w-full flex items-center justify-between p-3 rounded-xs bg-white text-[#120E0D] border border-[#D9C7B3]/50 hover:bg-[#FAF7F2] transition-colors"
          >
            <span className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              Saved Wishlist
            </span>
            <span className="text-[11px] font-bold text-[#D4AF37]">{wishlistCount}</span>
          </Link>
        </aside>

        {/* Tab Content Panel */}
        <main className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-xs border border-[#D9C7B3]/50 shadow-sm">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-[#D9C7B3]/30 pb-4">
                <h2 className="font-serif text-2xl text-[#120E0D]">Order Archive</h2>
                <span className="text-xs text-[#766157]">Discreet Courier Dispatch Guaranteed</span>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-[#FAF7F2] border border-[#D9C7B3]/60 p-5 rounded-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-[#D9C7B3]/30 gap-2">
                      <div>
                        <span className="font-mono text-xs font-semibold text-[#120E0D] block">
                          {ord.id}
                        </span>
                        <span className="text-xs text-[#766157] font-sans">
                          Placed on {ord.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-[#000000] text-[#F4E8C1] border border-[#D4AF37]/50">
                          {ord.status}
                        </span>
                        <span className="font-sans font-bold text-sm text-[#120E0D]">
                          ₹{ord.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-[#120E0D]">
                          <span>
                            {item.qty}x {item.name} ({item.size} / {item.color})
                          </span>
                          <span className="font-mono text-[#766157]">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#D9C7B3]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
                      <span className="text-[#766157] font-mono">
                        Tracking: <strong className="text-[#120E0D]">{ord.trackingNumber}</strong>
                      </span>
                      <Link
                        href={`/track-order?id=${ord.id}`}
                        className="text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
                      >
                        <span>View Live Courier Milestones</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#120E0D]">Profile &amp; Fit Preferences</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-[#FAF7F2] border border-[#D9C7B3]/40 rounded-xs space-y-1">
                  <span className="text-[#766157] block font-mono text-[10px] uppercase">Patron Name</span>
                  <strong className="text-[#120E0D] text-sm">{user.name}</strong>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#D9C7B3]/40 rounded-xs space-y-1">
                  <span className="text-[#766157] block font-mono text-[10px] uppercase">Registered Phone</span>
                  <strong className="text-[#120E0D] text-sm">+91 {user.phone}</strong>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#D9C7B3]/40 rounded-xs space-y-1">
                  <span className="text-[#766157] block font-mono text-[10px] uppercase">Preferred Bra Size</span>
                  <strong className="text-[#120E0D] text-sm">34B / S (Wire-Free)</strong>
                </div>

                <div className="p-4 bg-[#FAF7F2] border border-[#D9C7B3]/40 rounded-xs space-y-1">
                  <span className="text-[#766157] block font-mono text-[10px] uppercase">Leggings Comfort Fit</span>
                  <strong className="text-[#120E0D] text-sm">Size S (28-inch Ankle Inseam)</strong>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9C7B3]/30 flex justify-between items-center text-xs">
                <span className="text-[#766157]">Want personal fit guidance?</span>
                <Link href="/size-guide" className="btn-piano-black py-2 px-4 text-xs cursor-pointer">
                  Open Interactive Size Guide
                </Link>
              </div>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#120E0D]">Saved Shipping Addresses</h2>

              <div className="p-5 bg-[#FAF7F2] border border-[#D9C7B3]/60 rounded-xs space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-[#120E0D] uppercase tracking-wider text-[11px]">
                    Default Residence Address
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded-2xs font-bold">
                    PRIMARY
                  </span>
                </div>
                <p className="text-[#120E0D] leading-relaxed">
                  {user.name} <br />
                  Boutique Tower, Flat 802, Nariman Point <br />
                  Mumbai, Maharashtra - 400021 <br />
                  Phone: +91 {user.phone}
                </p>
                <div className="pt-2 text-[11px] text-[#766157] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Discreet outer packaging enabled for all deliveries to this address</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
