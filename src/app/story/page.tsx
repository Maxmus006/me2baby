import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Feather, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Story & Philosophy | Me2baby",
  description: "Learn about the quiet-luxury philosophy behind Me2baby. Fewer, better essentials crafted for authentic comfort and effortless femininity.",
};

export default function StoryPage() {
  return (
    <div className="space-y-20 sm:space-y-28 py-12 sm:py-20">
      {/* Header Statement */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
          The Me2baby Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#302522] leading-tight">
          Quiet Luxury in Every Layer.
        </h1>
        <p className="text-sm sm:text-base text-[#766157] font-sans leading-relaxed max-w-2xl mx-auto">
          We believe intimate apparel should never be a compromise between beauty and ease.
          Every piece is designed around real bodies, considered materials, and timeless femininity.
        </p>
      </section>

      {/* Editorial Spread 1 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative aspect-16/10 w-full bg-[#F3EDE5] overflow-hidden rounded-xs border border-[#D9C7B3]/40">
            <Image
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=85"
              alt="Atelier material examination"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
              Principle 01
            </span>
            <h2 className="font-serif text-3xl text-[#302522]">
              Less, But Better.
            </h2>
            <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
              We reject the fast-fashion cycle of hundreds of poorly constructed garments. Instead, we offer a carefully edited wardrobe of foundational pieces—each refined over dozens of fit trials until it fits flawlessly.
            </p>
            <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
              When an item feels this good against your skin, you need fewer pieces. You reach for the ones that make you feel entirely at home in your own body.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Spread 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-4 lg:order-1 order-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
              Principle 02
            </span>
            <h2 className="font-serif text-3xl text-[#302522]">
              Comfort Without Compromise.
            </h2>
            <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
              For decades, lingerie was designed around external gaze and rigid hardware: pinching wires, scratchy tags, and thick seams.
            </p>
            <p className="text-xs sm:text-sm text-[#766157] leading-relaxed">
              We replaced stiff underwires with anatomic contouring and ultra-fine microfiber. The result is light, natural shaping that supports you through an active schedule without requiring adjustment.
            </p>
          </div>
          <div className="lg:col-span-7 lg:order-2 order-1 relative aspect-16/10 w-full bg-[#F3EDE5] overflow-hidden rounded-xs border border-[#D9C7B3]/40">
            <Image
              src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85"
              alt="Soft micro-modal drape"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>
      </section>

      {/* Sustainable Craft Pillars */}
      <section className="bg-[#F3EDE5]/50 py-16 sm:py-24 border-y border-[#D9C7B3]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C9A6A0] font-sans">
              Responsible Standards
            </span>
            <h3 className="font-serif text-3xl text-[#302522]">
              Our Ethical Commitments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xs border border-[#D9C7B3]/40 space-y-3 text-center">
              <Feather className="w-6 h-6 text-[#C9A6A0] mx-auto" />
              <h4 className="font-serif text-xl text-[#302522]">Natural Fibers</h4>
              <p className="text-xs text-[#766157] leading-relaxed">
                Certified Lenzing™ micro-modal and pure Mulberry silk that decompose naturally and are processed without harsh chemical agents.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xs border border-[#D9C7B3]/40 space-y-3 text-center">
              <ShieldCheck className="w-6 h-6 text-[#C9A6A0] mx-auto" />
              <h4 className="font-serif text-xl text-[#302522]">Discreet Shopping</h4>
              <p className="text-xs text-[#766157] leading-relaxed">
                We believe innerwear is deeply personal. All parcels arrive in unmarked, 100% recyclable boxes with no product labels on the outside.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xs border border-[#D9C7B3]/40 space-y-3 text-center">
              <HeartHandshake className="w-6 h-6 text-[#C9A6A0] mx-auto" />
              <h4 className="font-serif text-xl text-[#302522]">Conscious Ateliers</h4>
              <p className="text-xs text-[#766157] leading-relaxed">
                We partner with specialized boutique ateliers that guarantee safe working environments, fair living wages, and meticulous hand-craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center max-w-xl mx-auto px-4 space-y-5">
        <h3 className="font-serif text-3xl text-[#302522]">
          Experience The Collection
        </h3>
        <p className="text-xs sm:text-sm text-[#766157]">
          Discover essentials designed to make every day feel a little softer, more considered, and undeniably beautiful.
        </p>
        <Link href="/shop" className="btn-primary py-3.5 px-8 text-xs tracking-wider inline-flex items-center gap-2">
          <span>Explore All Pieces</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
