"use client";

import React, { useState } from "react";
import { MessageSquare, X, Send, Crown, Sparkles, MessageCircle } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function ConciergeWidget() {
  const { addCustomerMessage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "whatsapp">("chat");

  const [customerName] = useState("");
  const [customerPhone] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [localThread, setLocalThread] = useState<Array<{ sender: "bot" | "user"; text: string; time: string }>>([
    {
      sender: "bot",
      text: "Namaste! Welcome to Me2baby Premium Atelier. I am Aria, your personal comfort stylist. How may I assist you with sizes, pure fabrics, or discreet delivery today?",
      time: "Just now",
    },
  ]);

  const quickFaqs = [
    "How does the Wire-Free Sculpt Bra fit?",
    "Are the Butter Leggings squat-proof?",
    "How discreet is delivery packaging?",
    "Do you accept Cash on Delivery & UPI?",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message to local thread
    setLocalThread((prev) => [...prev, { sender: "user", text, time: now }]);
    setInputMessage("");

    // Push into StoreContext so it shows up in Admin Console for manual review
    addCustomerMessage({
      text,
      customerName: customerName || "Online Patron",
      customerPhone: customerPhone || "+91 98765 00000",
      productInterest: "General Premium Atelier Query",
    });

    // Simulate instant stylist auto-response
    setIsTyping(true);
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our atelier stylist has noted your query and will assist you.";
      const lower = text.toLowerCase();

      if (lower.includes("bra") || lower.includes("size") || lower.includes("fit")) {
        reply = "Our Wire-Free Sculpt Bras fit true to size! If you are between cup sizes (e.g. C/D), we recommend checking our Interactive Size Guide or opting for our flexible micro-rib bralette for relaxing comfort.";
      } else if (lower.includes("legging") || lower.includes("squat") || lower.includes("sheer")) {
        reply = "Our Butter-Soft High-Rise Leggings are 100% squat-proof and non-sheer! Crafted with high-density Italian micro-nylon, they provide weightless 4-way stretch with zero waist rolling.";
      } else if (lower.includes("packaging") || lower.includes("discreet") || lower.includes("box")) {
        reply = "Every order is dispatched in an anonymous, plain unbranded outer parcel. The courier label will never mention lingerie or intimate apparel. Inside, you'll find our signature gold-embossed gift box.";
      } else if (lower.includes("cod") || lower.includes("payment") || lower.includes("upi")) {
        reply = "Yes! We proudly accept Cash on Delivery (COD) across India, along with instant zero-fee UPI (GPay, PhonePe, Paytm), and all major Credit/Debit Cards.";
      } else {
        reply = `Thank you, ${customerName || "Patron"}. Our senior comfort consultant is reviewing your question: "${text}". If you need immediate assistance, click our WhatsApp tab to chat directly!`;
      }

      setLocalThread((prev) => [...prev, { sender: "bot", text: reply, time: "Just now" }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleWhatsAppRedirect = (customMsg?: string) => {
    const msg = encodeURIComponent(
      customMsg ||
        inputMessage ||
        "Hello Me2baby Atelier! I am interested in your Premium Women's & Girls' Comfort collection."
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Floating Concierge Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {!isOpen && (
          <div className="flex items-center gap-2 bg-[#000000]/95 backdrop-blur-md border border-[#D4AF37]/60 text-white px-3.5 py-1.5 rounded-full shadow-2xl text-xs font-sans animate-bounce hidden sm:flex">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#F4E8C1] font-semibold tracking-wide">24/7 Premium Concierge</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Premium Concierge and WhatsApp support"
          className="relative w-14 h-14 rounded-full bg-linear-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#000000] text-white flex items-center justify-center border-2 border-[#D4AF37]/80 shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:scale-105 transition-all duration-300 group cursor-pointer"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#F4E8C1]" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#000000]" />
            </>
          )}
        </button>
      </div>

      {/* Concierge Modal / Slide-in Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] max-h-[82vh] bg-[#0A0A0A] text-[#FAF7F2] rounded-xs border border-[#D4AF37]/50 shadow-[0_20px_60px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden animate-slideUp font-sans">
          {/* Header */}
          <div className="bg-linear-to-r from-[#000000] via-[#111111] to-[#1C1C1C] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/70 flex items-center justify-center bg-[#000000]">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="font-serif text-lg text-white font-medium flex items-center gap-1.5">
                  Me2baby Premium Concierge
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[#FAF7F2]/80">Aria • Senior Stylist Online</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-[#D9C7B3]/70 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Selector */}
          <div className="grid grid-cols-2 border-b border-white/10 bg-[#050505] text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab("chat")}
              className={`py-2.5 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === "chat"
                  ? "text-[#F4E8C1] border-b-2 border-[#D4AF37] bg-[#121212]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Live Stylist</span>
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`py-2.5 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                activeTab === "whatsapp"
                  ? "text-[#F4E8C1] border-b-2 border-[#D4AF37] bg-[#121212]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Direct</span>
            </button>
          </div>

          {/* Tab 1: Live Chat Thread */}
          {activeTab === "chat" ? (
            <div className="flex-1 flex flex-col justify-between overflow-hidden bg-[#0A0A0A]">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[380px]">
                {localThread.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xs p-3 text-xs leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-[#1E1E1E] text-white border border-[#D4AF37]/50 shadow-sm"
                          : "bg-[#111111] text-[#FAF7F2] border border-white/10 shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-white/40 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37] p-2 bg-[#141414] w-fit rounded-xs border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" style={{ animationDelay: "300ms" }} />
                    <span className="text-[11px] ml-1 text-white/80">Stylist is replying...</span>
                  </div>
                )}

                {/* Quick FAQs */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] block mb-2 font-mono">
                    Frequent Inquiries:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickFaqs.map((faq, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(faq)}
                        className="text-[11px] bg-[#141414] hover:bg-[#1E1E1E] text-white/90 border border-white/15 hover:border-[#D4AF37] px-2.5 py-1.5 rounded-2xs text-left transition-colors cursor-pointer"
                      >
                        {faq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-3 bg-[#000000] border-t border-white/10 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask about sizes, fabrics, delivery..."
                    className="flex-1 bg-[#121212] border border-white/15 rounded-2xs px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="btn-piano-black py-2 px-3.5 text-xs cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#D4AF37]" />
                  </button>
                </div>
                <div className="flex justify-between items-center text-[10px] text-white/50">
                  <span>🔒 End-to-end encrypted concierge</span>
                  <span>WhatsApp: +91 98765 43210</span>
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: WhatsApp Direct */
            <div className="p-6 bg-[#0A0A0A] space-y-5 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-serif text-xl text-white">Chat on Official WhatsApp</h4>
                <p className="text-xs text-white/70 mt-1">
                  Connect instantly with our dedicated boutique concierge for personalized sizing, custom gift packaging, or immediate order dispatch updates.
                </p>
              </div>

              <div className="space-y-2 text-left text-xs bg-[#121212] p-4 rounded-xs border border-white/10">
                <label className="text-[11px] uppercase tracking-wider text-[#D4AF37] block font-mono">
                  Your Inquiry / Message
                </label>
                <textarea
                  rows={2}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Hi Me2baby, I would like assistance with..."
                  className="w-full bg-[#000000] border border-white/15 rounded-2xs p-2.5 text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              <button
                onClick={() => handleWhatsAppRedirect()}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs tracking-wider uppercase py-3.5 px-4 rounded-2xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(37,211,102,0.35)] cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Launch WhatsApp (+91 98765 43210)</span>
              </button>

              <p className="text-[11px] text-white/50">
                Operating hours: 9:00 AM – 10:00 PM IST (Monday to Sunday)
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
