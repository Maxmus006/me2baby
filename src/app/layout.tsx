import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SearchModal from "@/components/SearchModal";
import SizeGuideModal from "@/components/SizeGuideModal";
import QuickViewModal from "@/components/QuickViewModal";
import ToastNotification from "@/components/ToastNotification";
import BrandSplashLoader from "@/components/BrandSplashLoader";
import BackgroundAtmosphere from "@/components/BackgroundAtmosphere";
import ConciergeWidget from "@/components/ConciergeWidget";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Me2baby | Premium Luxury Women's & Girls' Intimates, Night Comfort & Leggings",
  description:
    "Me2baby is India's premier luxury comfort atelier offering wire-free sculpted innerwear, cloud-soft sleep sets, and second-skin butter leggings for women and little girls.",
  keywords: [
    "Me2baby",
    "premium luxury comfort",
    "women innerwear india",
    "butter soft leggings",
    "wire-free sculpt bra",
    "girls cloud nightsuit",
    "girls stretch leggings 3 pack",
    "silk slip camisole",
    "modal sleep pants",
  ],
  openGraph: {
    title: "Me2baby | Premium Luxury Comfort Atelier",
    description: "Pure tactile softness. Exquisite wire-free innerwear, cloud night comfort, and second-skin butter leggings in Indian Rupees (₹).",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#120E0D] font-sans selection:bg-[#000000]/20 selection:text-[#000000] relative">
        <StoreProvider>
          {/* 4-Second Brand Splash Screen */}
          <BrandSplashLoader />

          {/* Contextual Background Atmosphere Animation */}
          <Suspense fallback={null}>
            <BackgroundAtmosphere />
          </Suspense>

          {/* Top Marquee Announcement */}
          <AnnouncementBar />

          {/* Atelier Navigation */}
          <Navbar />

          {/* Main Application Page */}
          <main className="flex-1 relative z-10">{children}</main>

          {/* Atelier Boutique Footer */}
          <Footer />

          {/* Floating Interactive Live Chat & WhatsApp Concierge */}
          <ConciergeWidget />

          {/* Global Drawers & Modals */}
          <CartDrawer />
          <SearchModal />
          <SizeGuideModal />
          <QuickViewModal />
          <ToastNotification />
        </StoreProvider>
      </body>
    </html>
  );
}
