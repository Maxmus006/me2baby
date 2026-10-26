export interface ProductVariant {
  id: string;
  size: string;
  color: string;
  colorHex: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  speciality: string;
  department: 'Women' | 'Girls & Kids';
  category: 'Innerwear' | 'Night Comfort' | 'Leggings';
  collection: 'The Everyday Edit' | 'Night Comfort Studio' | 'Butter-Soft Leggings' | 'Little Girls Atelier';
  price: number;
  compareAtPrice?: number;
  images: string[];
  secondaryImage: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  details: string[];
  materials: string;
  careInstructions: string[];
  fitNotes: string;
  badge?: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "m2-001",
    slug: "women-butter-soft-leggings",
    name: "The Butter-Soft High-Rise Legging",
    tagline: "Weightless 4-way stretch with zero pinch and an ultra-flattering contour waist.",
    speciality: "Zero-Pinch 4-Way Butter Stretch • Seamless Double-Layer Waistband • Squat-Proof Non-Sheer Density",
    department: "Women",
    category: "Leggings",
    collection: "Butter-Soft Leggings",
    price: 1899,
    compareAtPrice: 2899,
    badge: "PREMIUM BESTSELLER",
    images: [
      "/images/women-butter-leggings.jpg",
      "/images/hero-premium-mom-daughter.jpg"
    ],
    secondaryImage: "/images/hero-premium-mom-daughter.jpg",
    colors: [
      { name: "Rich Espresso", hex: "#211917" },
      { name: "Warm Ivory", hex: "#FAF7F2" },
      { name: "Dusty Cocoa", hex: "#766157" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Engineered from our signature Butter-Silk microfiber knit. Sits high on the natural waist with a seamless double-layer waistband that moves fluidly with your body without rolling down, pinching, or sheer fading.",
    details: [
      "Ultra-soft brushed peach-skin tactile finish",
      "Seamless flatlock interior construction",
      "Squat-proof non-sheer premium density weave",
      "Gentle supportive compression for daylong comfort"
    ],
    materials: "80% Micro-Nylon, 20% Lycra Spandex with peach-soft finish.",
    careInstructions: [
      "Machine wash cold inside out with like colors",
      "Hang dry or tumble dry low",
      "Do not use fabric softeners"
    ],
    fitNotes: "True to size. Offers flattering gentle sculpt with a 28-inch full-length inseam.",
    variants: [
      { id: "v01", size: "XS", color: "Rich Espresso", colorHex: "#211917", sku: "WBL-ESP-XS", inStock: true, stockCount: 18 },
      { id: "v02", size: "S", color: "Rich Espresso", colorHex: "#211917", sku: "WBL-ESP-S", inStock: true, stockCount: 30 },
      { id: "v03", size: "M", color: "Rich Espresso", colorHex: "#211917", sku: "WBL-ESP-M", inStock: true, stockCount: 25 },
      { id: "v04", size: "L", color: "Rich Espresso", colorHex: "#211917", sku: "WBL-ESP-L", inStock: true, stockCount: 16 },
      { id: "v05", size: "S", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "WBL-IVR-S", inStock: true, stockCount: 14 }
    ],
    rating: 4.96,
    reviewCount: 284
  },
  {
    id: "m2-002",
    slug: "everyday-wirefree-sculpt-bra",
    name: "The Everyday Wire-Free Sculpt Bra",
    tagline: "Anatomic cloud contouring with a barely-there second skin feel.",
    speciality: "Anatomic Wire-Free Cloud Lift • Scalloped Laser-Cut Bonded Edges • Double-Lined Breathable Micro-Modal Cups",
    department: "Women",
    category: "Innerwear",
    collection: "The Everyday Edit",
    price: 1999,
    compareAtPrice: 2999,
    badge: "PREMIUM LUXURY EDITION",
    images: [
      "/images/sculpt-bra.jpg",
      "/images/rib-bralette.jpg"
    ],
    secondaryImage: "/images/rib-bralette.jpg",
    colors: [
      { name: "Warm Ivory", hex: "#FAF7F2" },
      { name: "Soft Blush", hex: "#E8C8C2" },
      { name: "Midnight Espresso", hex: "#211917" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Crafted for women who demand absolute ease without sacrificing lift. Built with ultra-fine Italian microfiber, laser-cut scalloped edges, and breathable molded wire-free cups that gently adapt to your natural curves.",
    details: [
      "Ultra-soft bonded seamless edges that disappear under tops",
      "Concealed wide elastic underband for weightless lift",
      "Adjustable brushed straps with rose gold hardware",
      "Breathable, double-lined cup construction"
    ],
    materials: "78% Recycled Polyamide, 22% Elastane. Cup lining: 100% Breathable Micro-Modal.",
    careInstructions: [
      "Hand wash cold or gentle machine cycle in a protective wash bag",
      "Lay flat to dry in shade",
      "Do not bleach or tumble dry"
    ],
    fitNotes: "True to size. Accommodates cup sizes A through DD with custom hook-and-eye closure.",
    variants: [
      { id: "v11", size: "S", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "ESB-IVR-S", inStock: true, stockCount: 24 },
      { id: "v12", size: "M", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "ESB-IVR-M", inStock: true, stockCount: 32 },
      { id: "v13", size: "L", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "ESB-IVR-L", inStock: true, stockCount: 18 },
      { id: "v14", size: "S", color: "Soft Blush", colorHex: "#E8C8C2", sku: "ESB-BLS-S", inStock: true, stockCount: 15 }
    ],
    rating: 4.94,
    reviewCount: 312
  },
  {
    id: "m2-003",
    slug: "girls-cloud-cotton-nightsuit",
    name: "Girls Cloud-Cotton Comfort Nightsuit",
    tagline: "GOTS-certified pure organic cloud-cotton pyjama set for serene restful sleep.",
    speciality: "100% Certified Organic Cloud Cotton • Mother-of-Pearl Buttons • Tagless Scratch-Free Interior",
    department: "Girls & Kids",
    category: "Night Comfort",
    collection: "Little Girls Atelier",
    price: 1499,
    compareAtPrice: 2299,
    badge: "GIRLS BESTSELLER",
    images: [
      "/images/girls-cloud-nightsuit.jpg",
      "/images/hero-premium-mom-daughter.jpg"
    ],
    secondaryImage: "/images/hero-premium-mom-daughter.jpg",
    colors: [
      { name: "Blush Pink", hex: "#F3D2CE" },
      { name: "Cloud Ivory", hex: "#FAF8F5" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "Designed for the gentlest sensitive young skin. Made from 100% combed organic long-staple cotton with mother-of-pearl buttons, flatlock scratch-free seams, and non-pinching elastic sleep pants.",
    details: [
      "100% GOTS-Certified hypoallergenic organic combed cotton",
      "Scratch-free printed labels — no scratchy tags",
      "Mother-of-pearl front button placket",
      "Gentle elastic waistband with comfortable ribbed cuffs"
    ],
    materials: "100% Certified Organic Cloud Cotton.",
    careInstructions: [
      "Machine wash warm with gentle baby-friendly detergent",
      "Tumble dry low",
      "Warm iron if desired"
    ],
    fitNotes: "Relaxed comfortable sleep fit. Size up if your girl is between age ranges.",
    variants: [
      { id: "v21", size: "2-3Y", color: "Blush Pink", colorHex: "#F3D2CE", sku: "GNS-PNK-23", inStock: true, stockCount: 15 },
      { id: "v22", size: "4-5Y", color: "Blush Pink", colorHex: "#F3D2CE", sku: "GNS-PNK-45", inStock: true, stockCount: 22 },
      { id: "v23", size: "6-7Y", color: "Blush Pink", colorHex: "#F3D2CE", sku: "GNS-PNK-67", inStock: true, stockCount: 19 },
      { id: "v24", size: "8-9Y", color: "Blush Pink", colorHex: "#F3D2CE", sku: "GNS-PNK-89", inStock: true, stockCount: 12 },
      { id: "v25", size: "4-5Y", color: "Cloud Ivory", colorHex: "#FAF8F5", sku: "GNS-IVR-45", inStock: true, stockCount: 16 }
    ],
    rating: 4.98,
    reviewCount: 187
  },
  {
    id: "m2-004",
    slug: "girls-stretch-leggings-trio",
    name: "Girls 4-Way Stretch Leggings 3-Pack",
    tagline: "Trio of ultra-durable, breathable organic cotton leggings for play and lounge.",
    speciality: "Value Trio Box (3 Pairs) • Anti-Bagging Reinforced Knees • Ultra-Gentle Non-Roll Elastic Band",
    department: "Girls & Kids",
    category: "Leggings",
    collection: "Little Girls Atelier",
    price: 1399,
    compareAtPrice: 1999,
    badge: "VALUE PACK OF 3",
    images: [
      "/images/girls-stretch-leggings-trio.jpg",
      "/images/girls-cloud-nightsuit.jpg"
    ],
    secondaryImage: "/images/girls-cloud-nightsuit.jpg",
    colors: [
      { name: "Pastel Trio (Blush / Oat / Grey)", hex: "#E8C8C2" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "The ultimate everyday essentials for girls. Three pairs of ultra-soft, 4-way stretch organic cotton leggings in signature Me2baby pastel tones. Resists knee-bagging and holds its softness wash after wash.",
    details: [
      "Set includes 3 pairs: Soft Blush Pink, Oat Cream, and Heather Grey",
      "Wide non-rolling elastic band that stays comfortably in place",
      "Reinforced knee seam construction for active play and all-day lounge",
      "Complimentary cotton ribbon presentation gift wrap"
    ],
    materials: "95% Organic Cotton, 5% Spandex for resilient stretch.",
    careInstructions: [
      "Machine wash warm with like colors",
      "Tumble dry low"
    ],
    fitNotes: "Snug yet flexible fit that grows with your child.",
    variants: [
      { id: "v31", size: "2-3Y", color: "Pastel Trio (Blush / Oat / Grey)", colorHex: "#E8C8C2", sku: "GSL-TRI-23", inStock: true, stockCount: 20 },
      { id: "v32", size: "4-5Y", color: "Pastel Trio (Blush / Oat / Grey)", colorHex: "#E8C8C2", sku: "GSL-TRI-45", inStock: true, stockCount: 35 },
      { id: "v33", size: "6-7Y", color: "Pastel Trio (Blush / Oat / Grey)", colorHex: "#E8C8C2", sku: "GSL-TRI-67", inStock: true, stockCount: 28 },
      { id: "v34", size: "8-9Y", color: "Pastel Trio (Blush / Oat / Grey)", colorHex: "#E8C8C2", sku: "GSL-TRI-89", inStock: true, stockCount: 16 }
    ],
    rating: 4.95,
    reviewCount: 214
  },
  {
    id: "m2-005",
    slug: "second-skin-seamless-brief",
    name: "The Second-Skin Seamless Brief",
    tagline: "Laser-cut perfection with 100% organic cotton hygienic gusset.",
    speciality: "Laser-Cut Zero Visible Panty Lines (VPL) • 100% Natural Organic Cotton Hygienic Gusset • Bonded Edges",
    department: "Women",
    category: "Innerwear",
    collection: "The Everyday Edit",
    price: 799,
    compareAtPrice: 1199,
    badge: "DAILY ESSENTIAL",
    images: [
      "/images/seamless-brief.jpg",
      "/images/sculpt-bra.jpg"
    ],
    secondaryImage: "/images/sculpt-bra.jpg",
    colors: [
      { name: "Warm Ivory", hex: "#FAF7F2" },
      { name: "Soft Blush", hex: "#E8C8C2" },
      { name: "Rich Espresso", hex: "#211917" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Our signature mid-rise brief cut from featherlight Italian microfiber. Raw bonded edges glide flush against your skin without digging, rolling, or showing through fitted leggings and trousers.",
    details: [
      "Raw-cut bonded leg openings and waist — zero visible panty lines",
      "Mid-rise silhouette with full comfortable back coverage",
      "100% natural organic cotton hygienic gusset",
      "Silky matte breathable touch"
    ],
    materials: "74% Polyamide, 26% Lycra. Gusset: 100% Organic Cotton.",
    careInstructions: [
      "Machine wash warm in delicate cycle",
      "Line dry or flat dry"
    ],
    fitNotes: "Mid-rise, fits true to standard dress sizes.",
    variants: [
      { id: "v41", size: "S", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "SSB-IVR-S", inStock: true, stockCount: 40 },
      { id: "v42", size: "M", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "SSB-IVR-M", inStock: true, stockCount: 50 },
      { id: "v43", size: "L", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "SSB-IVR-L", inStock: true, stockCount: 30 }
    ],
    rating: 4.88,
    reviewCount: 162
  },
  {
    id: "m2-006",
    slug: "mulberry-silk-slip-camisole",
    name: "The Mulberry Silk Slip Camisole Set",
    tagline: "Bias-cut 19mm Grade-6A silk with French lace trim for night comfort.",
    speciality: "100% Pure Grade-6A Mulberry Silk (19 Momme) • French Scalloped Floral Lace • Brushed Gold Hardware",
    department: "Women",
    category: "Night Comfort",
    collection: "Night Comfort Studio",
    price: 2999,
    compareAtPrice: 4499,
    badge: "PREMIUM SILK LUXURY",
    images: [
      "/images/silk-camisole.jpg",
      "/images/hero-campaign.jpg"
    ],
    secondaryImage: "/images/hero-campaign.jpg",
    colors: [
      { name: "Champagne Gold", hex: "#D9C7B3" },
      { name: "Midnight Espresso", hex: "#211917" }
    ],
    sizes: ["XS", "S", "M", "L"],
    description: "A sleepwear masterpiece. Expertly cut on the bias in 100% Grade-6A pure Mulberry silk to drape naturally over the body without clinging, finished with delicate scalloped French lace and gold sliders.",
    details: [
      "100% Grade 6A Mulberry Silk (19 momme weight)",
      "V-neckline front with French lace detailing",
      "Adjustable sliders in brushed matte gold",
      "Includes matching silk comfort sleep shorts"
    ],
    materials: "100% Pure Mulberry Silk. Lace: 90% Polyamide, 10% Elastane.",
    careInstructions: [
      "Hand wash cold with silk wash",
      "Roll in towel to remove excess water, hang dry"
    ],
    fitNotes: "Fluid drape. Size up if you have a fuller bust.",
    variants: [
      { id: "v51", size: "S", color: "Champagne Gold", colorHex: "#D9C7B3", sku: "MSC-CHP-S", inStock: true, stockCount: 14 },
      { id: "v52", size: "M", color: "Champagne Gold", colorHex: "#D9C7B3", sku: "MSC-CHP-M", inStock: true, stockCount: 18 },
      { id: "v53", size: "L", color: "Champagne Gold", colorHex: "#D9C7B3", sku: "MSC-CHP-L", inStock: true, stockCount: 9 }
    ],
    rating: 4.97,
    reviewCount: 98
  },
  {
    id: "m2-007",
    slug: "cocoon-cashmere-modal-robe",
    name: "The Cocoon Cashmere & Modal Wrap Robe",
    tagline: "Knee-length enveloping robe for serene mornings and restful evenings.",
    speciality: "15% Pure Mongolian Cashmere + 85% Lenzing Modal • Internal Privacy Ties • Enveloping Kimono Sleeves",
    department: "Women",
    category: "Night Comfort",
    collection: "Night Comfort Studio",
    price: 4999,
    compareAtPrice: 7499,
    badge: "PREMIUM EDITION",
    images: [
      "/images/lounge-cashmere.jpg",
      "/images/hero-campaign.jpg"
    ],
    secondaryImage: "/images/hero-campaign.jpg",
    colors: [
      { name: "Deep Espresso", hex: "#211917" },
      { name: "Oat Milk", hex: "#F3EDE5" }
    ],
    sizes: ["XS/S", "M/L", "XL"],
    description: "The definition of quiet home indulgence. Designed with generous kimono sleeves, an internal privacy tie, and an extra-wide sash belt to create a silhouette of relaxed refinement.",
    details: [
      "Dual hidden side-entry pockets",
      "Internal waist tie prevents accidental opening",
      "Knee-length drape with refined hem border",
      "Superb warmth without weight"
    ],
    materials: "15% Pure Cashmere, 85% Lenzing Micro-Modal.",
    careInstructions: [
      "Dry clean or hand wash cold with wool care shampoo",
      "Dry flat on clean towel"
    ],
    fitNotes: "Relaxed wrap fit with adjustable sash.",
    variants: [
      { id: "v61", size: "XS/S", color: "Deep Espresso", colorHex: "#211917", sku: "CMR-ESP-XSS", inStock: true, stockCount: 12 },
      { id: "v62", size: "M/L", color: "Deep Espresso", colorHex: "#211917", sku: "CMR-ESP-ML", inStock: true, stockCount: 16 }
    ],
    rating: 5.0,
    reviewCount: 76
  },
  {
    id: "m2-008",
    slug: "seamless-micro-rib-bralette",
    name: "The Seamless Micro-Rib Bralette",
    tagline: "Ultra-flexible wire-free innerwear with removable contour pads.",
    speciality: "4-Way Micro-Rib Stretch Knit • Removable Teardrop Contour Pads • Hook-Free Pullover Comfort",
    department: "Women",
    category: "Innerwear",
    collection: "The Everyday Edit",
    price: 1699,
    compareAtPrice: 2499,
    badge: "PREMIUM NOIR & GOLD",
    images: [
      "/images/rib-bralette.jpg",
      "/images/sculpt-bra.jpg"
    ],
    secondaryImage: "/images/sculpt-bra.jpg",
    colors: [
      { name: "Soft Cream", hex: "#F3EDE5" },
      { name: "Dusty Cocoa", hex: "#766157" },
      { name: "Midnight Espresso", hex: "#211917" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "An effortless slip-on bralette crafted from our micro-rib knit. Engineered to move in complete harmony with your body, whether lounging at home or under tailored clothing.",
    details: [
      "4-way stretch knit construction",
      "Removable teardrop foam padding",
      "Wide comfort straps that do not slip or dig",
      "Wire-free and hook-free pullover design"
    ],
    materials: "85% Lenzing Modal, 15% Spandex.",
    careInstructions: [
      "Remove pads before washing",
      "Machine wash gentle cold",
      "Dry flat"
    ],
    fitNotes: "Flexible fit accommodates sizes 30A to 38D.",
    variants: [
      { id: "v71", size: "S", color: "Soft Cream", colorHex: "#F3EDE5", sku: "SMR-CRM-S", inStock: true, stockCount: 19 },
      { id: "v72", size: "M", color: "Soft Cream", colorHex: "#F3EDE5", sku: "SMR-CRM-M", inStock: true, stockCount: 24 }
    ],
    rating: 4.91,
    reviewCount: 118
  },
  {
    id: "m2-009",
    slug: "girls-gentle-cotton-inner-set",
    name: "Girls Gentle Cloud-Cotton Cami & Brief Set",
    tagline: "Breathable 100% organic cotton undergarments crafted with soft flat seams.",
    speciality: "2x Camisoles + 2x Briefs 4-Piece Set • GOTS Certified Pure Organic Cotton • Non-Pinching Gentle Elastics",
    department: "Girls & Kids",
    category: "Innerwear",
    collection: "Little Girls Atelier",
    price: 1199,
    compareAtPrice: 1699,
    badge: "KIDS ESSENTIAL",
    images: [
      "/images/girls-cloud-nightsuit.jpg",
      "/images/girls-stretch-leggings-trio.jpg"
    ],
    secondaryImage: "/images/girls-stretch-leggings-trio.jpg",
    colors: [
      { name: "Cloud Ivory & Blush", hex: "#FAF8F5" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    description: "The ideal foundational innerwear set for young girls. Made from ultra-soft GOTS-certified organic cotton with smooth ribbing, flat non-scratch seams, and soft gentle elastics designed for delicate skin.",
    details: [
      "Includes 2 camisoles and 2 matching comfort briefs",
      "100% Hypoallergenic breathable organic cotton",
      "Scratch-free printed labels",
      "Gentle elastic leg openings that do not pinch"
    ],
    materials: "100% Certified Organic Cotton.",
    careInstructions: [
      "Machine wash warm with like colors",
      "Tumble dry low"
    ],
    fitNotes: "Standard kids fit with gentle stretch.",
    variants: [
      { id: "v81", size: "4-5Y", color: "Cloud Ivory & Blush", colorHex: "#FAF8F5", sku: "GCS-IVR-45", inStock: true, stockCount: 25 },
      { id: "v82", size: "6-7Y", color: "Cloud Ivory & Blush", colorHex: "#FAF8F5", sku: "GCS-IVR-67", inStock: true, stockCount: 22 }
    ],
    rating: 4.96,
    reviewCount: 94
  },
  {
    id: "m2-010",
    slug: "modal-comfort-sleep-pant",
    name: "The Modal Comfort Wide-Leg Sleep Pant",
    tagline: "Fluid, temperature-regulating Austrian modal with an easy elastic waistband.",
    speciality: "Silky Austrian Modal Poplin • Temperature-Regulating Microfiber • Deep Inset Pockets & Silk Tie",
    department: "Women",
    category: "Night Comfort",
    collection: "Night Comfort Studio",
    price: 2299,
    compareAtPrice: 3299,
    badge: "PREMIUM COMFORT",
    images: [
      "/images/lounge-cashmere.jpg",
      "/images/hero-premium-mom-daughter.jpg"
    ],
    secondaryImage: "/images/hero-premium-mom-daughter.jpg",
    colors: [
      { name: "Warm Ivory", hex: "#FAF7F2" },
      { name: "Rich Espresso", hex: "#211917" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description: "Cloud-soft wide-leg sleep pants cut from silky modal poplin. Drifts effortlessly over your skin, keeping you cool through the night and incomparably comfortable during morning repose.",
    details: [
      "94% Austrian Modal, 6% Elastane",
      "Flat front elastic waistband with adjustable silk twill tie",
      "Deep functional side pockets",
      "Subtle piped cuffs at the ankle"
    ],
    materials: "94% Modal, 6% Elastane.",
    careInstructions: [
      "Machine wash cold gentle",
      "Line dry or flat dry"
    ],
    fitNotes: "Relaxed wide-leg silhouette with 30-inch inseam.",
    variants: [
      { id: "v91", size: "S", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "MSP-IVR-S", inStock: true, stockCount: 16 },
      { id: "v92", size: "M", color: "Warm Ivory", colorHex: "#FAF7F2", sku: "MSP-IVR-M", inStock: true, stockCount: 20 }
    ],
    rating: 4.93,
    reviewCount: 82
  }
];

export const COLLECTIONS = [
  {
    id: "butter-leggings",
    title: "Butter-Soft Leggings",
    slug: "butter-leggings",
    subtitle: "Weightless 4-way stretch leggings for women & girls that never pinch or fade.",
    image: "/images/women-butter-leggings.jpg",
    productCount: 3
  },
  {
    id: "everyday-edit",
    title: "The Everyday Innerwear Edit",
    slug: "everyday-edit",
    subtitle: "Wire-free sculpted bras and seamless second-skin briefs made for pure comfort.",
    image: "/images/sculpt-bra.jpg",
    productCount: 4
  },
  {
    id: "night-comfort",
    title: "Night Comfort Studio",
    slug: "night-comfort",
    subtitle: "Mulberry silk camisoles, cashmere wrap robes, and fluid modal sleepwear.",
    image: "/images/lounge-cashmere.jpg",
    productCount: 4
  },
  {
    id: "little-girls",
    title: "Little Girls Atelier",
    slug: "little-girls",
    subtitle: "100% GOTS organic cotton nightsuits, stretch leggings 3-packs, and gentle inners.",
    image: "/images/girls-cloud-nightsuit.jpg",
    productCount: 3
  }
];

export const BRAND_CONFIG = {
  name: "Me2baby",
  tagline: "Premium Luxury Intimates, Night Comfort & Leggings",
  provisionalNotice: "Official Me2baby Premium Boutique. All specifications and orders are running in test mode.",
  currencySymbol: "₹",
  currencyCode: "INR",
  freeShippingThreshold: 1999,
  shippingRate: 149,
  announcementText: "⚡ PREMIUM LUXURY PRIVILEGE: COMPLIMENTARY EXPRESS DELIVERY ABOVE ₹1,999 • 100% DISCREET PACKAGING • 15% OFF WITH CODE: PREMIUM15 ⚡",
  contactEmail: "concierge@me2baby.com",
  whatsappNumber: "+91 98765 43210",
  whatsappLink: "https://wa.me/919876543210?text=Hello%20Me2baby%20Atelier,%20I%20would%20like%20to%20inquire%20about%20your%20collection",
  socials: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com"
  }
};

export interface PremiumBundle {
  id: string;
  title: string;
  subtitle: string;
  originalPrice: number;
  salePrice: number;
  savePct: number;
  tag: string;
  image: string;
  items: string[];
}

export const PREMIUM_BUNDLES: PremiumBundle[] = [
  {
    id: "bundle-01",
    title: "The Mother & Daughter Comfort Nightsuit Set",
    subtitle: "Women's Mulberry Silk Camisole Set paired with Girls Cloud-Cotton Pyjama Set.",
    originalPrice: 5499,
    salePrice: 3999,
    savePct: 27,
    tag: "👑 PREMIUM SIGNATURE DUO",
    image: "/images/hero-premium-mom-daughter.jpg",
    items: ["1x Mulberry Silk Slip Camisole Set", "1x Girls Cloud-Cotton Pyjama Nightsuit", "Complimentary Premium Gift Packaging"]
  },
  {
    id: "bundle-02",
    title: "The Women's Butter Legging & Lounge Duo",
    subtitle: "2x Butter-Soft High-Rise Leggings in Rich Espresso & Warm Ivory.",
    originalPrice: 3799,
    salePrice: 2999,
    savePct: 21,
    tag: "BUTTER-SOFT POPULAR",
    image: "/images/women-butter-leggings.jpg",
    items: ["1x Butter-Soft Legging (Rich Espresso)", "1x Butter-Soft Legging (Warm Ivory)", "Discreet Travel Pouch"]
  },
  {
    id: "bundle-03",
    title: "Girls 4-Way Stretch Leggings 3-Pack Box",
    subtitle: "Complete 3-pack organic cotton leggings in Soft Blush, Oat Cream, and Heather Grey.",
    originalPrice: 1999,
    salePrice: 1399,
    savePct: 30,
    tag: "GIRLS VALUE PACK",
    image: "/images/girls-stretch-leggings-trio.jpg",
    items: ["1x Blush Pink Legging", "1x Oat Cream Legging", "1x Heather Grey Legging", "Me2baby Cotton Ribbon Wrap"]
  },
  {
    id: "bundle-04",
    title: "The Everyday Innerwear Trio",
    subtitle: "2x Wire-Free Sculpt Bras + 1x Second-Skin Seamless Brief.",
    originalPrice: 4799,
    salePrice: 3699,
    savePct: 23,
    tag: "DAILY FOUNDATIONS",
    image: "/images/sculpt-bra.jpg",
    items: ["2x The Everyday Sculpt Bra", "1x The Second-Skin Brief", "Me2baby Satin Lingerie Bag"]
  }
];

export const PREMIUM_REVIEWS = [
  {
    id: "rev-01",
    author: "Elena Rostova",
    role: "Verified Patron",
    location: "Mumbai, India",
    rating: 5,
    date: "2 days ago",
    title: "The butter leggings and bra are sheer perfection",
    content: "I have worn luxury loungewear from every major brand. Nothing compares to Me2baby's butter leggings. Zero rolling, completely opaque, and the wire-free sculpt bra holds its shape all day.",
    verifiedBuyer: true,
    itemPurchased: "The Butter-Soft High-Rise Legging"
  },
  {
    id: "rev-02",
    author: "Claire De La Tour",
    role: "Mother & Patron",
    location: "Bengaluru, India",
    rating: 5,
    date: "4 days ago",
    title: "My daughter and I both love our Me2baby sets",
    content: "The matching mother-daughter night comfort sets are extraordinary. The girls cloud-cotton nightsuit is so soft against my 5-year-old's sensitive skin, and the silk slip is pure heaven.",
    verifiedBuyer: true,
    itemPurchased: "Mother & Daughter Comfort Set"
  },
  {
    id: "rev-03",
    author: "Ananya Mehra",
    role: "Verified Patron",
    location: "Delhi NCR, India",
    rating: 5,
    date: "1 week ago",
    title: "Fast dispatch and truly discreet luxury packaging",
    content: "Shipped within 24 hours. The unbranded luxury box arrived securely sealed with gold embossing. The girls 3-pack leggings and everyday bra are must-haves.",
    verifiedBuyer: true,
    itemPurchased: "Girls 4-Way Stretch Leggings 3-Pack"
  }
];
