# Me2baby — Luxury E-Commerce Platform
> *Comfort, Made Beautiful.*

An original, production-minded e-commerce web application for **Me2baby**, a premium women's intimate apparel and comfort wear brand. Built with Next.js App Router, TypeScript, Tailwind CSS, and custom editorial design aesthetics.

---

## 1. Brand Concept & Aesthetic Direction

- **Category**: Premium women's lingerie, innerwear, wireless essentials, and tactile comfort lounge wear.
- **Brand Philosophy**: 
  - *Less, But Better* — An intentionally limited, curated collection of high-grade essentials.
  - *Quiet Luxury* — Natural daylight tones, subtle dividers, refined letter spacing, and zero loud logos.
  - *Tactile Comfort* — Micro-modal, grade 6A mulberry silk, and raw bonded edges that eliminate panty lines.
  - *Discreet & Respectful* — Neutral, unbranded FSC-certified recyclable shipping boxes.

### Restrained Color Palette
- **Warm Ivory**: `#FAF7F2` (Primary background)
- **Soft Cream**: `#F3EDE5` (Secondary background & cards)
- **Champagne Beige**: `#D9C7B3` (Borders & accents)
- **Dusty Rose**: `#C9A6A0` (Subtle feminine highlight)
- **Muted Cocoa**: `#766157` (Secondary typography & details)
- **Deep Espresso**: `#302522` (Primary headlines & buttons)
- **White**: `#FFFFFF` (Surface contrast)

### Typography Pairing
- **Headlines & Editorial Statements**: *Cormorant Garamond* (Editorial Serif)
- **Navigation, Buttons, Body & Sizing**: *Plus Jakarta Sans* / *Inter* (Clean Modern Sans)

---

## 2. Key Features & Implemented Architecture

### A. Homepage Experience (`/`)
- **Announcement Bar**: Dynamic threshold tracker (*"Complimentary shipping above $100"*).
- **Navigation Bar**: Sticky blur transition, luxury brand wordmark, category links, wishlist indicator with badge, and interactive bag trigger.
- **Editorial Hero Section**: Split-screen composition featuring authentic editorial campaign imagery, eyebrow tag, *"Feel Beautiful. Feel Entirely Yourself"* headline, and primary/secondary CTAs.
- **Brand Introduction**: *"Less, But Better"* with three core pillars: *Considered Materials*, *Everyday Comfort*, and *Timeless Femininity*.
- **Curated Collection Cards**: *The Everyday Edit*, *The Soft Form Collection*, *Lounge Essentials*, and *The Signature Collection*.
- **Featured Products ("The Pieces You'll Reach For")**: Filterable grid with interactive color swatches, quick add size picker, wishlist toggle, and secondary hover photography.
- **Fabric & Comfort Story**: Alternating layout highlighting raw edges, Austrian modal, and temperature-regulating silk.
- **Interactive Fit Experience**: Direct entry point to home sizing guidance and interactive calculator.
- **Brand Story & Atelier Notes**: Authentic philosophy narrative and craftsmanship photography.
- **Trust & Service Section**: Secure checkout, discreet plain packaging guarantee, clear 30-day trial exchanges, and concierge support.
- **Newsletter**: Verified private circle subscription form with instant feedback.
- **Footer**: Brand statement, collection links, customer care, currency selector, and provisional notices.

### B. Catalog & Product Listing (`/shop`)
- Real-time filtering by **Category** (Bras, Briefs, Lounge & Comfort, Sleepwear), **Size** (XS, S, M, L, XL), **Color Palette**, and **Price Cap**.
- In-stock availability toggle and responsive mobile filter drawer.
- Sorting by *Featured Pieces*, *New Arrivals*, *Price: Low to High*, *Price: High to Low*, and *Highest Rated*.
- 2-column or 3-column grid layout toggle.

### C. Product Detail Page (`/product/[slug]`)
- Multi-angle thumbnail gallery with smooth switching.
- Interactive shade selector with visual swatch indicators.
- Size selector with live reserve status indicator.
- Accordion sections: *Silhouettes & Construction*, *Tactile Materials & Care*, and *Discreet Shipping & Returns*.
- Complete The Look recommendation carousel.

### D. Interactive Fit Assistant & Size Guide Modal
- Interactive Bra Fit Calculator: Underbust + Bust measurement inputs (inches or cm) with instant recommended band/cup and bralette sizing.
- Briefs & Bottoms Calculator (Waist & Hip measurements).
- International conversion tables (US/UK, EU, FR, AU).
- Sizing privacy guarantee (100% client-side calculation; no private measurements are stored).

### E. Shopping Bag & Cart Drawer (`/cart`)
- Persistent localStorage cart state across browser sessions.
- Dynamic free shipping progress bar showing exact dollar amount remaining.
- Quantity modifiers and item removal.
- Promo code application (`WELCOME10` for 10% off, `COMFORT15` for 15% off).
- Complimentary handwritten gift card message option.

### F. Checkout & Test Payments (`/checkout`)
- Contact & shipping address validation.
- Delivery method selection (Carbon-neutral standard vs. Priority courier).
- Test-mode payment gateway options (Credit Card simulator, Stripe Test Mode, Razorpay Demo).
- Duplicate-payment protection.
- Verified order confirmation screen displaying generated Order Reference (e.g. `EL-849201`) and packaging reassurance.

### G. Customer Account Portal (`/account`)
- Order archive with step-by-step visual shipment tracking (*Confirmed* → *In Atelier* → *With Carrier* → *Delivered*).
- Saved size preferences (Bra size, Briefs size).
- Saved discreet delivery address.

### H. Store Owner Admin Dashboard (`/admin`)
- Key business metrics: Revenue, orders fulfilled, average order value, discreet packaging rate.
- Live catalog inventory table with reserve status indicators.
- Order management console with real-time status transitions.
- Store configuration for free shipping thresholds and announcement bar messages.

---

## 3. Quick Start & Installation

### Requirements
- Node.js `v18+` or `v20+` or `v24+`
- npm `v9+` or `v10+` or `v11+`

### Setup Instructions
```bash
# 1. Clone repository or navigate to root
cd m2baby

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

### Production Build & Type Checking
```bash
# Run production build and verify all 12 routes
npm run build

# Start production server
npm run start
```

---

## 4. Project Structure

```
m2baby/
├── .env.example              # Environment variables template
├── package.json              # Project dependencies & scripts
├── next.config.ts            # Next.js configuration & image domains
├── tsconfig.json             # TypeScript configuration
├── src/
│   ├── app/
│   │   ├── globals.css       # Luxury color tokens, typography & keyframes
│   │   ├── layout.tsx        # Cormorant Garamond & Jakarta Sans font loaders
│   │   ├── page.tsx          # Phase 2 visual editorial homepage
│   │   ├── shop/             # Product listing page with filters & sorting
│   │   ├── collections/      # Curated capsule edits page
│   │   ├── product/[slug]/   # Dynamic luxury product detail page
│   │   ├── cart/             # Dedicated full shopping bag page
│   │   ├── checkout/         # Secure test-mode checkout & confirmation
│   │   ├── account/          # Customer account & order tracking
│   │   ├── story/            # Atelier philosophy & ethical craft
│   │   ├── wishlist/         # Saved pieces curation
│   │   └── admin/            # Store owner console & fulfillment
│   ├── components/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProductCard.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── SearchModal.tsx
│   │   ├── SizeGuideModal.tsx
│   │   ├── QuickViewModal.tsx
│   │   └── ToastNotification.tsx
│   ├── context/
│   │   └── StoreContext.tsx  # Global state for cart, wishlist, and modals
│   └── data/
│       └── products.ts       # 10 curated intimate pieces & collections
```

---

## 5. Provisional Brand & Content Notice

*"M2Baby"* is the brand identity developed for this luxury intimates and comfort wear platform. Product specifications, imagery, and prices represent sample demo data until real client inventory is configured.
