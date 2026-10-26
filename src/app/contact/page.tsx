"use client";

import React, { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Clock, ShieldCheck, Send, Crown, CheckCircle2 } from "lucide-react";
import { BRAND_CONFIG } from "@/data/products";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Size & Fit Guidance",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-12 sm:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
            Private Atelier Concierge
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#120E0D] font-normal">
            We Are Here For You
          </h1>
          <p className="text-xs sm:text-sm text-[#766157] mt-3 leading-relaxed">
            Whether you require discreet bra fit recommendations, advice on girls&apos; sleepwear fabrics, or assistance with express order dispatch, our Mumbai atelier stylists are pleased to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Contact Cards */}
          <div className="space-y-4">
            {/* WhatsApp Direct Card */}
            <div className="bg-[#000000] text-white p-6 rounded-xs border border-[#D4AF37]/40 shadow-lg relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/40">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] tracking-widest uppercase text-[#F4E8C1] block font-mono">
                INSTANT HUMAN SUPPORT
              </span>
              <h3 className="font-serif text-xl text-white mt-1 mb-2">WhatsApp Concierge</h3>
              <p className="text-xs text-[#94A3B8] mb-4">
                Chat directly with our senior lingerie stylist. Average response time: under 5 minutes.
              </p>
              <a
                href={BRAND_CONFIG.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase py-3 px-4 rounded-2xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Launch WhatsApp (+91 98765 43210)</span>
              </a>
            </div>

            {/* Telephone & Email Card */}
            <div className="bg-white p-6 rounded-xs border border-[#C5A059]/30 shadow-xs space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#120E0D]">Toll-Free Priority Line</strong>
                  <span className="text-[#766157]">1800-209-ME2BABY (1800-209-6222)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#120E0D]">Private Inquiries</strong>
                  <span className="text-[#766157]">{BRAND_CONFIG.contactEmail}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#120E0D]">Atelier Operating Hours</strong>
                  <span className="text-[#766157]">Mon – Sun: 9:00 AM – 10:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#120E0D]">Registered Headquarters</strong>
                  <span className="text-[#766157]">Me2baby Luxury Living Ltd, Nariman Point, Mumbai 400021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 bg-white p-8 sm:p-10 rounded-xs border border-[#C5A059]/40 shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-2xl text-[#120E0D]">Inquiry Received with Honor</h3>
                <p className="text-xs text-[#766157] max-w-md mx-auto">
                  Thank you, {formData.name}. Our dedicated comfort consultant has received your inquiry and will contact you via {formData.email || formData.phone} within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs underline text-[#D4AF37] font-semibold cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <h3 className="font-serif text-2xl text-[#120E0D] font-normal border-b border-[#D9C7B3]/40 pb-3">
                  Submit a Confidential Inquiry
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Kapoor"
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">Mobile Number (for WhatsApp update) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[#120E0D] font-semibold block mb-1">Inquiry Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs"
                    >
                      <option value="Size & Fit Guidance">Size &amp; Fit Guidance</option>
                      <option value="Butter Leggings Material & Fabric Inquiry">Butter Leggings Material &amp; Fabric</option>
                      <option value="Girls Pyjamas Age Guidance">Girls Pyjamas Age Guidance</option>
                      <option value="Discreet Packaging Details">Discreet Packaging Details</option>
                      <option value="Order Tracking & Exchanges">Order Tracking &amp; Exchanges</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#120E0D] font-semibold block mb-1">How May We Assist You? *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please let us know your bust/waist dimensions or specific question..."
                    className="w-full bg-[#FAF7F2] border border-[#D9C7B3] p-3 rounded-2xs text-xs focus:outline-hidden focus:border-[#000000]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-piano-black w-full py-4 text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Transmit Message to Atelier Stylist
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
