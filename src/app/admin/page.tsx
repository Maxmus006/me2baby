"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore, CustomerRecord, OrderRecord } from "@/context/StoreContext";
import { Product, ProductVariant, BRAND_CONFIG } from "@/data/products";
import {
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  Search,
  Lock,
  MessageSquare,
  MessageCircle,
  Crown,
  Sparkles,
  RefreshCw,
  X,
  ExternalLink,
  Users,
  Settings,
  Truck,
  Tag,
  Shield,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  FileText,
  Save,
  Check,
  Percent,
} from "lucide-react";

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    chatMessages,
    replyToCustomerMessage,
    formatPrice,
    user,
    isAdmin,
    logout,
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    showToast,
  } = useStore();

  // Navigation Tabs: Overview, Products, Customers, Orders, Customization, Chat
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "customers" | "orders" | "customization" | "chat"
  >("overview");

  // =========================================================================
  // TAB 1: PRODUCT STATE & HANDLERS
  // =========================================================================
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [productFormData, setProductFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    speciality: "",
    description: "",
    department: "Women" as "Women" | "Girls & Kids",
    category: "Innerwear" as "Innerwear" | "Night Comfort" | "Leggings",
    collection: "The Everyday Edit" as any,
    price: 1899,
    compareAtPrice: 2899,
    badge: "PREMIUM BESTSELLER",
    materials: "85% Austrian Modal, 15% Lycra Spandex.",
    careInstructions: "Machine wash cold gentle, lay flat to dry.",
    fitNotes: "True to size. Weightless 4-way stretch.",
    image: "/images/sculpt-bra.jpg",
    stockCount: 25,
    inStock: true,
  });

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductFormData({
      name: "",
      slug: "",
      tagline: "",
      speciality: "",
      description: "",
      department: "Women",
      category: "Innerwear",
      collection: "The Everyday Edit",
      price: 1999,
      compareAtPrice: 2999,
      badge: "PREMIUM LUXURY EDITION",
      materials: "85% Austrian Modal, 15% Lycra Spandex.",
      careInstructions: "Machine wash cold gentle, lay flat to dry.",
      fitNotes: "True to size. Weightless 4-way stretch.",
      image: "/images/sculpt-bra.jpg",
      stockCount: 30,
      inStock: true,
    });
    setIsAddProductModalOpen(true);
  };

  const openEditProductModal = (p: Product) => {
    setEditingProduct(p);
    setProductFormData({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      speciality: p.speciality || "",
      description: p.description,
      department: p.department,
      category: p.category,
      collection: p.collection,
      price: p.price,
      compareAtPrice: p.compareAtPrice || Math.round(p.price * 1.4),
      badge: p.badge || "PREMIUM BESTSELLER",
      materials: p.materials,
      careInstructions: p.careInstructions.join(", "),
      fitNotes: p.fitNotes,
      image: p.images[0] || "/images/sculpt-bra.jpg",
      stockCount: p.variants?.[0]?.stockCount || 20,
      inStock: p.variants?.[0]?.inStock ?? true,
    });
    setIsAddProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const slug =
      productFormData.slug ||
      productFormData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const newVariants: ProductVariant[] = [
      {
        id: "v-" + Date.now() + "-1",
        size: "S",
        color: "Silk Ivory",
        colorHex: "#FAF7F2",
        sku: `${slug}-S`.toUpperCase(),
        inStock: productFormData.inStock,
        stockCount: Number(productFormData.stockCount),
      },
      {
        id: "v-" + Date.now() + "-2",
        size: "M",
        color: "Silk Ivory",
        colorHex: "#FAF7F2",
        sku: `${slug}-M`.toUpperCase(),
        inStock: productFormData.inStock,
        stockCount: Number(productFormData.stockCount),
      },
    ];

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: productFormData.name,
        slug,
        tagline: productFormData.tagline,
        speciality: productFormData.speciality,
        description: productFormData.description,
        department: productFormData.department,
        category: productFormData.category,
        price: Number(productFormData.price),
        compareAtPrice: Number(productFormData.compareAtPrice),
        badge: productFormData.badge,
        materials: productFormData.materials,
        careInstructions: productFormData.careInstructions.split(",").map((s) => s.trim()),
        fitNotes: productFormData.fitNotes,
        images: [productFormData.image, editingProduct.images[1] || productFormData.image],
        variants: newVariants,
      };
      updateProduct(updated);
      showToast(`Updated "${productFormData.name}"`, "success");
    } else {
      const newProduct: Product = {
        id: "m2-" + Date.now().toString().slice(-4),
        slug,
        name: productFormData.name,
        tagline: productFormData.tagline,
        speciality: productFormData.speciality,
        description: productFormData.description,
        department: productFormData.department,
        category: productFormData.category,
        collection: productFormData.collection,
        price: Number(productFormData.price),
        compareAtPrice: Number(productFormData.compareAtPrice),
        badge: productFormData.badge,
        materials: productFormData.materials,
        careInstructions: productFormData.careInstructions.split(",").map((s) => s.trim()),
        fitNotes: productFormData.fitNotes,
        images: [productFormData.image, productFormData.image],
        secondaryImage: productFormData.image,
        details: [
          productFormData.speciality || "Architectural ergonomic comfort",
          "Micro-modal stretch knit with pure breathability",
          "100% Plain Unbranded Discreet Packaging Guaranteed",
        ],
        rating: 4.9,
        reviewCount: 1,
        sizes: ["S", "M", "L"],
        colors: [{ name: "Silk Ivory", hex: "#FAF7F2" }],
        variants: newVariants,
      };
      addProduct(newProduct);
      showToast(`Product "${productFormData.name}" created!`, "success");
    }
    setIsAddProductModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.speciality?.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearchQuery.toLowerCase());
    const matchesDept = selectedDepartment === "All" || p.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  // =========================================================================
  // TAB 2: CUSTOMER CRM STATE & HANDLERS
  // =========================================================================
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<CustomerRecord | null>(null);

  const [customerFormData, setCustomerFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    tier: "VIP Gold" as CustomerRecord["tier"],
    status: "Active" as CustomerRecord["status"],
    shippingAddress: "",
    notes: "",
    ordersCount: 1,
    totalSpent: 2499,
  });

  const openAddCustomerModal = () => {
    setEditingCustomer(null);
    setCustomerFormData({
      name: "",
      email: "",
      phone: "",
      city: "Mumbai, Maharashtra",
      tier: "Patron Silver",
      status: "Active",
      shippingAddress: "",
      notes: "Enrolled via Atelier Console.",
      ordersCount: 0,
      totalSpent: 0,
    });
    setIsCustomerModalOpen(true);
  };

  const openEditCustomerModal = (c: CustomerRecord) => {
    setEditingCustomer(c);
    setCustomerFormData({
      name: c.name,
      email: c.email,
      phone: c.phone,
      city: c.city,
      tier: c.tier,
      status: c.status,
      shippingAddress: c.shippingAddress || "",
      notes: c.notes || "",
      ordersCount: c.ordersCount,
      totalSpent: c.totalSpent,
    });
    setIsCustomerModalOpen(true);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCustomer) {
      updateCustomer({
        ...editingCustomer,
        ...customerFormData,
      });
    } else {
      addCustomer({
        id: "CUST-" + Math.floor(1000 + Math.random() * 9000),
        joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        ...customerFormData,
      });
    }
    setIsCustomerModalOpen(false);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
      c.phone.includes(customerSearchQuery) ||
      c.city.toLowerCase().includes(customerSearchQuery.toLowerCase())
  );

  // =========================================================================
  // TAB 3: ORDERS & PREVIOUS DATA STATE & HANDLERS
  // =========================================================================
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");
  const [isOrderTrackingModalOpen, setIsOrderTrackingModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [trackingForm, setTrackingForm] = useState({
    status: "Processing" as OrderRecord["status"],
    courier: "BlueDart Express",
    trackingId: "",
  });

  const openEditOrderModal = (o: OrderRecord) => {
    setSelectedOrder(o);
    setTrackingForm({
      status: o.status,
      courier: o.trackingCourier || "BlueDart Express",
      trackingId: o.trackingId || "",
    });
    setIsOrderTrackingModalOpen(true);
  };

  const handleSaveOrderTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    updateOrderStatus(selectedOrder.id, trackingForm.status, trackingForm.courier, trackingForm.trackingId);
    setIsOrderTrackingModalOpen(false);
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      o.customerPhone.includes(orderSearchQuery) ||
      o.city.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // =========================================================================
  // TAB 4: STORE CUSTOMIZATIONS & SETTINGS STATE & HANDLERS
  // =========================================================================
  const [settingsForm, setSettingsForm] = useState({
    announcementMarquee: settings.announcementMarquee,
    freeShippingThreshold: settings.freeShippingThreshold,
    whatsappNumber: settings.whatsappNumber,
    supportEmail: settings.supportEmail,
    taxRatePercent: settings.taxRatePercent,
  });

  const [promoCodesList, setPromoCodesList] = useState(settings.activePromoCodes);
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoPercent, setNewPromoPercent] = useState(15);
  const [newPromoMinSpend, setNewPromoMinSpend] = useState(1500);

  const handleSaveStoreSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settingsForm,
      activePromoCodes: promoCodesList,
    });
  };

  const handleAddPromoCode = () => {
    if (!newPromoCode.trim()) return;
    const cleanCode = newPromoCode.trim().toUpperCase();
    const updated = [
      ...promoCodesList,
      { code: cleanCode, percent: Number(newPromoPercent), minSpend: Number(newPromoMinSpend) },
    ];
    setPromoCodesList(updated);
    setNewPromoCode("");
    showToast(`Promo Code ${cleanCode} added.`, "info");
  };

  const handleRemovePromoCode = (codeToRemove: string) => {
    const updated = promoCodesList.filter((p) => p.code !== codeToRemove);
    setPromoCodesList(updated);
    showToast(`Promo code ${codeToRemove} removed.`, "info");
  };

  // =========================================================================
  // TAB 5: LIVE CHAT STATE & HANDLERS
  // =========================================================================
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // =========================================================================
  // FINANCIAL CALCULATIONS
  // =========================================================================
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const totalItemsSold = orders.length * 2.4;
  const avgOrderValue = Math.round(totalRevenue / Math.max(1, orders.length));
  const estimatedGrossProfit = Math.round(totalRevenue * 0.68);

  // RESTRICTED ACCESS GATE: strictly visible when logged in as admin
  if (!isAdmin) {
    return (
      <div className="min-h-[82vh] flex items-center justify-center py-20 px-4 font-sans relative">
        <div className="w-full max-w-lg bg-[#0A0A0A] border-2 border-[#D4AF37]/50 p-8 sm:p-10 text-center space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] rounded-xs relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />

          <div className="w-16 h-16 mx-auto rounded-full bg-[#141414] border border-[#D4AF37]/60 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.25)]">
            <Lock className="w-8 h-8 text-[#D4AF37]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Restricted Atelier Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Administrator Authentication Required
            </h1>
            <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
              This dashboard is strictly reserved for authorized Me2baby store administrators. Please sign in with administrator credentials.
            </p>
          </div>

          {user && (
            <div className="p-3 bg-[#141414] border border-[#D4AF37]/40 rounded-2xs text-xs text-[#F4E8C1] space-y-1">
              <div>Currently signed in as patron: <span className="font-mono font-bold text-white">+91 {user.phone}</span></div>
              <div className="text-[11px] text-white/50">Administrator privileges are required to access this portal.</div>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="btn-piano-black py-3 px-6 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>Sign In with Admin Credentials</span>
            </Link>
            <Link
              href="/"
              className="py-3 px-6 text-xs text-white/70 hover:text-white border border-white/20 rounded-2xs transition-colors flex items-center justify-center"
            >
              <span>Return to Boutique</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#000000] text-[#FAF7F2] py-8 sm:py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* =========================================================================
            ADMIN TOP BAR & LOGOUT
            ========================================================================= */}
        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                ME2BABY MASTER ATELIER MANAGEMENT SUITE
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-medium flex items-center gap-2">
              <Crown className="w-8 h-8 text-[#D4AF37]" />
              <span>Administration &amp; Atelier Control Hub</span>
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Full control over products, customer CRM, historical orders, financial analytics, and store settings in Indian Rupees (₹).
            </p>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
            <Link
              href="/"
              className="text-xs text-[#F4E8C1] hover:text-white border border-[#D4AF37]/40 px-3.5 py-2 rounded-2xs flex items-center gap-1.5 transition-colors"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
            <div className="flex items-center gap-2 text-xs bg-[#111111] border border-[#D4AF37]/50 px-3.5 py-2 rounded-2xs text-[#F4E8C1]">
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Admin: {user?.phone || "admin"}</span>
            </div>
            <button
              onClick={() => logout()}
              className="text-xs text-white/70 hover:text-red-400 border border-white/20 hover:border-red-500/50 px-3.5 py-2 rounded-2xs transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* =========================================================================
            NAVIGATION TABS
            ========================================================================= */}
        <div className="flex border-b border-white/10 gap-4 sm:gap-8 text-xs sm:text-sm uppercase tracking-wider overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "overview"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Financials &amp; Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "customers"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Users className="w-4 h-4 text-[#D4AF37]" />
            <span>Customer CRM &amp; Data ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "orders"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
            <span>Orders &amp; Previous Data ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "products"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Package className="w-4 h-4 text-[#D4AF37]" />
            <span>Products &amp; Speciality ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("customization")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === "customization"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 text-[#D4AF37]" />
            <span>Store Customization</span>
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`pb-3 font-semibold transition-colors flex items-center gap-2 shrink-0 cursor-pointer relative ${
              activeTab === "chat"
                ? "border-b-2 border-[#D4AF37] text-[#F4E8C1]"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Inquiries &amp; WhatsApp</span>
            {chatMessages.some((m) => m.status === "unanswered") && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            )}
          </button>
        </div>

        {/* =========================================================================
            TAB 1: FINANCIALS & ANALYTICS (FANINCAL)
            ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0D0D0D] p-5 rounded-xs border border-white/10 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                      Gross Order Revenue
                    </span>
                    <h3 className="text-2xl font-serif text-white font-bold mt-1">
                      {formatPrice(totalRevenue)}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-2xs bg-[#1A1A1A] border border-[#D4AF37]/40 text-[#D4AF37]">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+28.4% growth vs previous cycle</span>
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-5 rounded-xs border border-white/10 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                      Est. Gross Profit (68% Margin)
                    </span>
                    <h3 className="text-2xl font-serif text-[#D4AF37] font-bold mt-1">
                      {formatPrice(estimatedGrossProfit)}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-2xs bg-[#1A1A1A] border border-white/15 text-white">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/50">
                  Healthy premium luxury contribution margin
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-5 rounded-xs border border-white/10 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                      Average Order Value (AOV)
                    </span>
                    <h3 className="text-2xl font-serif text-white font-bold mt-1">
                      {formatPrice(avgOrderValue)}
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-2xs bg-[#1A1A1A] border border-white/15 text-white">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-emerald-400">
                  Driven by Curated 3-Pack &amp; Multi-item bundles
                </div>
              </div>

              <div className="bg-[#0D0D0D] p-5 rounded-xs border border-white/10 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">
                      Active Patron Base
                    </span>
                    <h3 className="text-2xl font-serif text-white font-bold mt-1">
                      {customers.length} Patrons
                    </h3>
                  </div>
                  <div className="p-2.5 rounded-2xs bg-[#1A1A1A] border border-white/15 text-white">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3 text-xs text-[#D4AF37] flex items-center gap-1">
                  <span>92% repeat patronage rate</span>
                </div>
              </div>
            </div>

            {/* Revenue Distribution & Payment Channels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Methods Breakdown */}
              <div className="bg-[#0D0D0D] p-6 rounded-xs border border-white/10 space-y-4">
                <h4 className="font-serif text-lg text-white font-medium flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#D4AF37]" />
                  <span>Indian Payment Gateway Share</span>
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>UPI (Google Pay, PhonePe, Paytm)</span>
                      <span className="font-bold text-[#D4AF37]">54%</span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#D4AF37] h-full" style={{ width: "54%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>Credit &amp; Debit Cards (Visa / Mastercard / Amex)</span>
                      <span className="font-bold text-white">31%</span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                      <div className="bg-white/80 h-full" style={{ width: "31%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-white/80 mb-1">
                      <span>Cash on Delivery (Discreet Verified COD)</span>
                      <span className="font-bold text-white/70">15%</span>
                    </div>
                    <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
                      <div className="bg-white/40 h-full" style={{ width: "15%" }} />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-[#141414] border border-white/10 rounded-2xs text-[11px] text-white/60">
                  Zero gateway drop-offs recorded. Razorpay &amp; Cashfree SSL 256-bit active.
                </div>
              </div>

              {/* Category Revenue Distribution */}
              <div className="bg-[#0D0D0D] p-6 rounded-xs border border-white/10 space-y-4 lg:col-span-2">
                <h4 className="font-serif text-lg text-white font-medium flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                  <span>Collection Contribution &amp; Velocity</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#141414] border border-white/10 rounded-2xs space-y-2">
                    <span className="text-[11px] text-[#D4AF37] font-semibold uppercase">Butter-Soft Leggings</span>
                    <div className="text-xl font-serif text-white font-bold">42% of Sales</div>
                    <p className="text-[11px] text-white/60">Top performer in 4-way stretch 280GSM fabric.</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-white/10 rounded-2xs space-y-2">
                    <span className="text-[11px] text-[#D4AF37] font-semibold uppercase">Wire-Free Sculpt Bras</span>
                    <div className="text-xl font-serif text-white font-bold">36% of Sales</div>
                    <p className="text-[11px] text-white/60">High customer retention in Silk Ivory &amp; Espresso.</p>
                  </div>
                  <div className="p-4 bg-[#141414] border border-white/10 rounded-2xs space-y-2">
                    <span className="text-[11px] text-[#D4AF37] font-semibold uppercase">Night Comfort &amp; Girls</span>
                    <div className="text-xl font-serif text-white font-bold">22% of Sales</div>
                    <p className="text-[11px] text-white/60">Organic cotton loungewear and mother-daughter packs.</p>
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center text-xs text-white/60">
                  <span>Return Rate: <strong className="text-emerald-400">0.8%</strong> (99.2% Satisfaction)</span>
                  <span>Average Delivery Time: <strong className="text-white">48 Hours across India</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: CUSTOMER CRM & EDITING CUSTOMER DATA
            ========================================================================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header with Search and Enroll Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D0D0D] p-4 rounded-xs border border-white/10">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                <input
                  type="text"
                  value={customerSearchQuery}
                  onChange={(e) => setCustomerSearchQuery(e.target.value)}
                  placeholder="Search patron by name, email, phone, city..."
                  className="w-full bg-[#141414] border border-white/15 rounded-2xs pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              <button
                onClick={openAddCustomerModal}
                className="btn-piano-black text-xs py-2 px-4 flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#D4AF37]" />
                <span>Enroll New Patron</span>
              </button>
            </div>

            {/* Customers Table */}
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xs overflow-x-auto shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141414] border-b border-white/10 text-white/70 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Patron / Contact</th>
                    <th className="p-3.5">City &amp; Address</th>
                    <th className="p-3.5">Tier &amp; Status</th>
                    <th className="p-3.5">Orders</th>
                    <th className="p-3.5">Lifetime Spend</th>
                    <th className="p-3.5">Atelier Notes</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5">
                        <div className="font-semibold text-white text-sm">{c.name}</div>
                        <div className="font-mono text-[11px] text-white/50">{c.email}</div>
                        <div className="font-mono text-[11px] text-[#D4AF37]">+91 {c.phone}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-medium text-white">{c.city}</div>
                        <div className="text-[11px] text-white/50 max-w-xs truncate">
                          {c.shippingAddress || "Standard Atelier Shipping"}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-2xs text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            c.tier === "VIP Platinum"
                              ? "bg-[#D4AF37]/20 text-[#F4E8C1] border border-[#D4AF37]/50"
                              : c.tier === "VIP Gold"
                              ? "bg-amber-900/40 text-amber-200 border border-amber-600/40"
                              : "bg-white/10 text-white/80 border border-white/20"
                          }`}
                        >
                          {c.tier}
                        </span>
                        <div className="text-[10px] text-emerald-400 font-semibold">{c.status}</div>
                      </td>
                      <td className="p-3.5 font-bold text-white">{c.ordersCount} orders</td>
                      <td className="p-3.5 font-serif font-bold text-white text-sm">
                        {formatPrice(c.totalSpent)}
                      </td>
                      <td className="p-3.5 text-[11px] text-white/60 max-w-xs">
                        {c.notes || "—"}
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditCustomerModal(c)}
                          className="p-1.5 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xs transition-colors cursor-pointer"
                          title="Edit Customer Profile & Notes"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteCustomer(c.id)}
                          className="p-1.5 hover:text-red-400 border border-white/10 hover:border-red-500/50 rounded-2xs transition-colors cursor-pointer"
                          title="Remove Customer Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EDIT / ADD CUSTOMER MODAL */}
            {isCustomerModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/60 rounded-xs max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <h3 className="font-serif text-xl text-white">
                      {editingCustomer ? `Edit Patron: ${editingCustomer.name}` : "Enroll New Patron"}
                    </h3>
                    <button
                      onClick={() => setIsCustomerModalOpen(false)}
                      className="text-white/50 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveCustomer} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Full Name</label>
                        <input
                          type="text"
                          required
                          value={customerFormData.name}
                          onChange={(e) =>
                            setCustomerFormData({ ...customerFormData, name: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Mobile Phone (+91)</label>
                        <input
                          type="text"
                          required
                          value={customerFormData.phone}
                          onChange={(e) =>
                            setCustomerFormData({ ...customerFormData, phone: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Email Address</label>
                        <input
                          type="email"
                          required
                          value={customerFormData.email}
                          onChange={(e) =>
                            setCustomerFormData({ ...customerFormData, email: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">City, State</label>
                        <input
                          type="text"
                          required
                          value={customerFormData.city}
                          onChange={(e) =>
                            setCustomerFormData({ ...customerFormData, city: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">VIP Tier</label>
                        <select
                          value={customerFormData.tier}
                          onChange={(e) =>
                            setCustomerFormData({
                              ...customerFormData,
                              tier: e.target.value as CustomerRecord["tier"],
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        >
                          <option value="VIP Platinum">VIP Platinum (High Value)</option>
                          <option value="VIP Gold">VIP Gold</option>
                          <option value="Patron Silver">Patron Silver</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Account Status</label>
                        <select
                          value={customerFormData.status}
                          onChange={(e) =>
                            setCustomerFormData({
                              ...customerFormData,
                              status: e.target.value as CustomerRecord["status"],
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        >
                          <option value="Active">Active</option>
                          <option value="VIP Priority">VIP Priority</option>
                          <option value="Suspended">Suspended</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Full Shipping Address</label>
                      <input
                        type="text"
                        value={customerFormData.shippingAddress}
                        onChange={(e) =>
                          setCustomerFormData({ ...customerFormData, shippingAddress: e.target.value })
                        }
                        placeholder="House/Flat, Street, Pin code"
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Private Atelier Notes</label>
                      <textarea
                        rows={2}
                        value={customerFormData.notes}
                        onChange={(e) =>
                          setCustomerFormData({ ...customerFormData, notes: e.target.value })
                        }
                        placeholder="e.g. Size M, prefers wire-free innerwear, sensitive skin"
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsCustomerModalOpen(false)}
                        className="px-4 py-2 text-xs text-white/60 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-piano-black text-xs py-2 px-5 cursor-pointer">
                        {editingCustomer ? "Update Patron Profile" : "Save & Enroll Patron"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 3: ORDERS & PREVIOUS DATA FULFILLMENT
            ========================================================================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D0D0D] p-4 rounded-xs border border-white/10">
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                <input
                  type="text"
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  placeholder="Search by order ID, customer name, phone, city..."
                  className="w-full bg-[#141414] border border-white/15 rounded-2xs pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto text-xs">
                {["All", "Processing", "In Transit", "Delivered", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-2xs cursor-pointer whitespace-nowrap ${
                      orderStatusFilter === st
                        ? "bg-[#D4AF37] text-black font-bold"
                        : "bg-[#141414] text-white/70 hover:text-white border border-white/10"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xs overflow-x-auto shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141414] border-b border-white/10 text-white/70 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Order ID &amp; Date</th>
                    <th className="p-3.5">Patron Details</th>
                    <th className="p-3.5">Purchased Pieces</th>
                    <th className="p-3.5">Payment</th>
                    <th className="p-3.5">Total (₹)</th>
                    <th className="p-3.5">Fulfillment Status</th>
                    <th className="p-3.5">Courier &amp; Tracking</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 font-mono">
                        <span className="font-bold text-[#D4AF37] block text-sm">{o.id}</span>
                        <span className="text-[11px] text-white/50">{o.date}</span>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-white">{o.customerName}</div>
                        <div className="font-mono text-[11px] text-white/60">{o.customerPhone}</div>
                        <div className="text-[10px] text-white/40">{o.city}</div>
                      </td>
                      <td className="p-3.5 max-w-xs text-xs text-white/80 leading-relaxed">
                        {o.items}
                      </td>
                      <td className="p-3.5 text-[11px]">
                        <span className="bg-[#141414] border border-white/15 px-2 py-0.5 rounded-2xs block text-white/80">
                          {o.paymentMethod}
                        </span>
                      </td>
                      <td className="p-3.5 font-serif font-bold text-white text-base">
                        {formatPrice(o.total)}
                      </td>
                      <td className="p-3.5">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value as OrderRecord["status"])
                          }
                          className={`text-xs font-semibold px-2 py-1 rounded-2xs border bg-black cursor-pointer focus:outline-hidden ${
                            o.status === "Delivered"
                              ? "border-emerald-500/60 text-emerald-400"
                              : o.status === "In Transit"
                              ? "border-blue-500/60 text-blue-300"
                              : o.status === "Processing"
                              ? "border-amber-500/60 text-amber-300"
                              : "border-red-500/60 text-red-300"
                          }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="In Transit">In Transit</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        <div className="text-white/80 font-medium">{o.trackingCourier || "BlueDart Express"}</div>
                        <div className="font-mono text-[11px] text-[#D4AF37]">
                          {o.trackingId || "Pending dispatch"}
                        </div>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => openEditOrderModal(o)}
                          className="px-2.5 py-1 text-xs border border-white/15 hover:border-[#D4AF37] text-[#F4E8C1] rounded-2xs transition-colors cursor-pointer"
                        >
                          Edit Tracking
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* EDIT ORDER TRACKING MODAL */}
            {isOrderTrackingModalOpen && selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/60 rounded-xs max-w-md w-full p-6 space-y-4 shadow-2xl relative">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <h3 className="font-serif text-xl text-white">
                      Order Fulfillment: #{selectedOrder.id}
                    </h3>
                    <button
                      onClick={() => setIsOrderTrackingModalOpen(false)}
                      className="text-white/50 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveOrderTracking} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Fulfillment Status</label>
                      <select
                        value={trackingForm.status}
                        onChange={(e) =>
                          setTrackingForm({
                            ...trackingForm,
                            status: e.target.value as OrderRecord["status"],
                          })
                        }
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Courier Partner</label>
                      <select
                        value={trackingForm.courier}
                        onChange={(e) =>
                          setTrackingForm({ ...trackingForm, courier: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      >
                        <option value="BlueDart Express">BlueDart Express Air</option>
                        <option value="Delhivery Air Priority">Delhivery Air Priority</option>
                        <option value="DTDC Premium Plus">DTDC Premium Plus</option>
                        <option value="Shadowfax Express">Shadowfax Express</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Air Waybill (AWB) Tracking Number</label>
                      <input
                        type="text"
                        required
                        value={trackingForm.trackingId}
                        onChange={(e) =>
                          setTrackingForm({ ...trackingForm, trackingId: e.target.value })
                        }
                        placeholder="e.g. BD-9841029IN"
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="p-3 bg-[#141414] border border-white/10 rounded-2xs text-[11px] text-white/60">
                      Customer can immediately verify this on the live storefront track page.
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsOrderTrackingModalOpen(false)}
                        className="px-4 py-2 text-xs text-white/60 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-piano-black text-xs py-2 px-5 cursor-pointer">
                        Update Tracking Status
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 4: PRODUCTS & SPECIALITY
            ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search, Filter & Add Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0D0D0D] p-4 rounded-xs border border-white/10">
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-72">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder="Search by title, speciality, or category..."
                    className="w-full bg-[#141414] border border-white/15 rounded-2xs pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>

                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-[#141414] border border-white/15 text-xs text-white px-3 py-2 rounded-2xs focus:outline-hidden focus:border-[#D4AF37]"
                >
                  <option value="All">All Departments</option>
                  <option value="Women">Women Collection</option>
                  <option value="Girls & Kids">Girls &amp; Kids Collection</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={resetProducts}
                  className="text-xs text-white/60 hover:text-white border border-white/15 px-3 py-2 rounded-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Reset catalog back to factory defaults"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <button
                  onClick={openAddProductModal}
                  className="btn-piano-black text-xs py-2 px-4 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add Product &amp; Speciality</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xs overflow-x-auto shadow-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#141414] border-b border-white/10 text-white/70 uppercase text-[10px] tracking-wider font-semibold">
                  <tr>
                    <th className="p-3.5">Piece</th>
                    <th className="p-3.5">Department &amp; Category</th>
                    <th className="p-3.5">Speciality Highlight</th>
                    <th className="p-3.5">Price in INR (₹)</th>
                    <th className="p-3.5">Badge</th>
                    <th className="p-3.5">Stock</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <div className="w-12 h-14 bg-black border border-white/10 rounded-2xs relative overflow-hidden shrink-0">
                          <Image
                            src={p.images[0] || "/images/sculpt-bra.jpg"}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-semibold text-white block text-sm">{p.name}</span>
                          <span className="text-[11px] text-white/50">{p.tagline}</span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span className="font-medium text-white">{p.department}</span>
                        <span className="block text-[11px] text-[#D4AF37]">{p.category}</span>
                      </td>
                      <td className="p-3.5 max-w-xs text-xs text-white/80">
                        {p.speciality || p.description.slice(0, 70) + "..."}
                      </td>
                      <td className="p-3.5 font-serif font-bold text-white text-base">
                        {formatPrice(p.price)}
                      </td>
                      <td className="p-3.5">
                        <span className="inline-block px-2 py-0.5 rounded-2xs text-[10px] font-bold bg-[#D4AF37]/20 text-[#F4E8C1] border border-[#D4AF37]/40 uppercase tracking-wider">
                          {p.badge}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-xs">
                        <span className="text-emerald-400 font-bold">25 units</span>
                      </td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => openEditProductModal(p)}
                          className="p-1.5 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/50 rounded-2xs transition-colors cursor-pointer"
                          title="Edit Product & Speciality"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 hover:text-red-400 border border-white/10 hover:border-red-500/50 rounded-2xs transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ADD / EDIT PRODUCT MODAL */}
            {isAddProductModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
                <div className="bg-[#0A0A0A] border border-[#D4AF37]/60 rounded-xs max-w-2xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <h3 className="font-serif text-xl text-white">
                      {editingProduct ? `Edit Piece: ${editingProduct.name}` : "Add New Intimates Piece"}
                    </h3>
                    <button
                      onClick={() => setIsAddProductModalOpen(false)}
                      className="text-white/50 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Product Name</label>
                        <input
                          type="text"
                          required
                          value={productFormData.name}
                          onChange={(e) =>
                            setProductFormData({ ...productFormData, name: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Tagline (One-line Hook)</label>
                        <input
                          type="text"
                          required
                          value={productFormData.tagline}
                          onChange={(e) =>
                            setProductFormData({ ...productFormData, tagline: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Speciality &amp; Unique Craft</label>
                      <input
                        type="text"
                        required
                        value={productFormData.speciality}
                        onChange={(e) =>
                          setProductFormData({ ...productFormData, speciality: e.target.value })
                        }
                        placeholder="e.g. Zero-wire architectural lift with micro-modal comfort"
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Detailed Description</label>
                      <textarea
                        required
                        rows={3}
                        value={productFormData.description}
                        onChange={(e) =>
                          setProductFormData({ ...productFormData, description: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Department</label>
                        <select
                          value={productFormData.department}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              department: e.target.value as any,
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        >
                          <option value="Women">Women</option>
                          <option value="Girls & Kids">Girls &amp; Kids</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Category</label>
                        <select
                          value={productFormData.category}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              category: e.target.value as any,
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        >
                          <option value="Innerwear">Innerwear</option>
                          <option value="Night Comfort">Night Comfort</option>
                          <option value="Leggings">Leggings</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Badge Label</label>
                        <input
                          type="text"
                          value={productFormData.badge}
                          onChange={(e) =>
                            setProductFormData({ ...productFormData, badge: e.target.value })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Price in Rupees (₹)</label>
                        <input
                          type="number"
                          required
                          value={productFormData.price}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              price: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Compare Price (₹)</label>
                        <input
                          type="number"
                          value={productFormData.compareAtPrice}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              compareAtPrice: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs text-white/70">Stock Quantity</label>
                        <input
                          type="number"
                          value={productFormData.stockCount}
                          onChange={(e) =>
                            setProductFormData({
                              ...productFormData,
                              stockCount: Number(e.target.value),
                            })
                          }
                          className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Fabric &amp; Composition</label>
                      <input
                        type="text"
                        value={productFormData.materials}
                        onChange={(e) =>
                          setProductFormData({ ...productFormData, materials: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setIsAddProductModalOpen(false)}
                        className="px-4 py-2 text-xs text-white/60 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-piano-black text-xs py-2 px-5 cursor-pointer">
                        {editingProduct ? "Save Product Changes" : "Publish to Boutique Catalog"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB 5: STORE CUSTOMIZATION (COOUSTMAZE IN ADIN PAANALE)
            ========================================================================= */}
        {activeTab === "customization" && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xs p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl text-white font-medium flex items-center gap-2">
                    <Settings className="w-6 h-6 text-[#D4AF37]" />
                    <span>Global Boutique Customization Atelier</span>
                  </h3>
                  <p className="text-xs text-white/60 mt-1">
                    Customize the marquee announcement bar, free delivery thresholds, WhatsApp concierge, and active promo discounts.
                  </p>
                </div>
                <button
                  onClick={handleSaveStoreSettings}
                  className="btn-piano-black text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>Save All Customizations</span>
                </button>
              </div>

              <form onSubmit={handleSaveStoreSettings} className="space-y-6">
                {/* 1. Marquee Announcement Bar */}
                <div className="space-y-2">
                  <label className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                    <Crown className="w-3.5 h-3.5" />
                    <span>Top Announcement Bar Marquee Text</span>
                  </label>
                  <textarea
                    rows={3}
                    value={settingsForm.announcementMarquee}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, announcementMarquee: e.target.value })
                    }
                    className="w-full bg-[#141414] border border-white/20 p-3 rounded-2xs text-xs text-white font-mono leading-relaxed focus:outline-hidden focus:border-[#D4AF37]"
                  />
                  <p className="text-[11px] text-white/50">
                    This text scrolls continuously in the top ticker above the boutique navbar.
                  </p>
                </div>

                {/* 2. Free Shipping Threshold & Tax */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/80 font-medium">
                      Complimentary Shipping Threshold in Indian Rupees (₹)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-[#D4AF37] font-bold">₹</span>
                      <input
                        type="number"
                        value={settingsForm.freeShippingThreshold}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            freeShippingThreshold: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#141414] border border-white/20 pl-8 pr-3 py-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                    <p className="text-[11px] text-white/50">
                      Orders equal or greater than this unlock free express delivery across India.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/80 font-medium">GST Tax Rate Calculation (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={settingsForm.taxRatePercent}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            taxRatePercent: Number(e.target.value),
                          })
                        }
                        className="w-full bg-[#141414] border border-white/20 p-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                    <p className="text-[11px] text-white/50">
                      Standard Indian textiles GST rate included in item price.
                    </p>
                  </div>
                </div>

                {/* 3. WhatsApp & Concierge Support Contacts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs text-white/80 font-medium">WhatsApp Concierge Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-emerald-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={settingsForm.whatsappNumber}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 pl-9 pr-3 py-2.5 rounded-2xs text-xs text-white font-mono focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-white/80 font-medium">Concierge Support Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#D4AF37] absolute left-3 top-3" />
                      <input
                        type="email"
                        value={settingsForm.supportEmail}
                        onChange={(e) =>
                          setSettingsForm({ ...settingsForm, supportEmail: e.target.value })
                        }
                        className="w-full bg-[#141414] border border-white/20 pl-9 pr-3 py-2.5 rounded-2xs text-xs text-white focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Active Promo Coupons & Discounts */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Active Atelier Promo Vouchers</span>
                    </label>
                    <span className="text-[11px] text-white/50">{promoCodesList.length} active codes</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {promoCodesList.map((promo) => (
                      <div
                        key={promo.code}
                        className="p-3 bg-[#141414] border border-[#D4AF37]/40 rounded-2xs flex justify-between items-center"
                      >
                        <div>
                          <span className="font-mono font-bold text-white text-sm block">{promo.code}</span>
                          <span className="text-[11px] text-[#D4AF37]">
                            {promo.percent}% off (Min ₹{promo.minSpend})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePromoCode(promo.code)}
                          className="text-white/40 hover:text-red-400 p-1 cursor-pointer"
                          title="Remove promo code"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Promo Code Inline */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. FESTIVE20)"
                      value={newPromoCode}
                      onChange={(e) => setNewPromoCode(e.target.value)}
                      className="bg-[#141414] border border-white/20 px-3 py-2 rounded-2xs text-xs text-white uppercase font-mono flex-1 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                    <input
                      type="number"
                      placeholder="Discount %"
                      value={newPromoPercent}
                      onChange={(e) => setNewPromoPercent(Number(e.target.value))}
                      className="bg-[#141414] border border-white/20 px-3 py-2 rounded-2xs text-xs text-white font-mono w-28 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                    <input
                      type="number"
                      placeholder="Min Spend (₹)"
                      value={newPromoMinSpend}
                      onChange={(e) => setNewPromoMinSpend(Number(e.target.value))}
                      className="bg-[#141414] border border-white/20 px-3 py-2 rounded-2xs text-xs text-white font-mono w-32 focus:outline-hidden focus:border-[#D4AF37]"
                    />
                    <button
                      type="button"
                      onClick={handleAddPromoCode}
                      className="btn-piano-black text-xs py-2 px-4 cursor-pointer"
                    >
                      Add Code
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="btn-piano-black text-xs py-3 px-6 flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4 text-[#D4AF37]" />
                    <span>Save All Customizations</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: LIVE CHAT & WHATSAPP INQUIRIES
            ========================================================================= */}
        {activeTab === "chat" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center bg-[#0D0D0D] p-4 rounded-xs border border-white/10">
              <div>
                <h3 className="font-serif text-xl text-white">Live Customer Inquiries &amp; WhatsApp Concierge</h3>
                <p className="text-xs text-[#94A3B8]">
                  Listen to customer inquiries in real-time, view contact details, and reply manually with custom atelier guidance.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-[#062419] border border-emerald-500/40 px-3 py-1.5 rounded-2xs">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Hotline: {settings.whatsappNumber}</span>
              </div>
            </div>

            <div className="space-y-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-[#0D0D0D] border rounded-xs p-5 space-y-4 ${
                    msg.status === "unanswered" ? "border-amber-500/50 shadow-md" : "border-white/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#141414] border border-[#D4AF37]/50 text-[#F4E8C1] flex items-center justify-center font-bold text-xs shadow-xs">
                        {msg.customerName?.charAt(0) || "P"}
                      </div>
                      <div>
                        <span className="font-semibold text-white block text-sm">
                          {msg.customerName}
                        </span>
                        <span className="text-[11px] text-[#94A3B8] font-mono">
                          {msg.customerPhone} • {msg.timestamp}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${
                          msg.status === "replied"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-950/80 text-amber-300 border border-amber-500/30 animate-pulse"
                        }`}
                      >
                        {msg.status === "replied" ? "Replied by Atelier" : "Awaiting Manual Reply"}
                      </span>
                      {msg.customerPhone && (
                        <a
                          href={`https://wa.me/${msg.customerPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-2xs flex items-center gap-1 transition-colors"
                        >
                          <MessageCircle className="w-3 h-3" />
                          <span>WhatsApp Direct</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-white/90 bg-[#141414] p-3 rounded-2xs space-y-1">
                    <div className="text-[11px] text-[#D4AF37] font-semibold">
                      Inquiry regarding: {msg.productInterest || "General Fit & Comfort Advice"}
                    </div>
                    <p className="leading-relaxed">&ldquo;{msg.text}&rdquo;</p>
                  </div>

                  {msg.adminReply ? (
                    <div className="p-3 bg-[#111111] border border-white/10 rounded-2xs text-xs space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-white/40">
                        <span className="font-bold text-[#F4E8C1] flex items-center gap-1">
                          <Crown className="w-3 h-3 text-[#D4AF37]" />
                          <span>Atelier Director Response:</span>
                        </span>
                        <span>{msg.repliedAt}</span>
                      </div>
                      <p className="text-white/80">{msg.adminReply}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-1">
                      <label className="text-[11px] text-[#94A3B8] font-semibold block">
                        Manual Concierge Reply
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type personal reply to customer..."
                          value={replyTextMap[msg.id] || ""}
                          onChange={(e) =>
                            setReplyTextMap({ ...replyTextMap, [msg.id]: e.target.value })
                          }
                          className="flex-1 bg-[#141414] border border-white/20 p-2.5 text-xs text-white placeholder:text-white/30 rounded-2xs focus:outline-hidden focus:border-[#D4AF37]"
                        />
                        <button
                          onClick={() => {
                            const text = replyTextMap[msg.id];
                            if (text && text.trim()) {
                              replyToCustomerMessage(msg.id, text.trim());
                              setReplyTextMap({ ...replyTextMap, [msg.id]: "" });
                            }
                          }}
                          className="btn-piano-black text-xs py-2.5 px-4 cursor-pointer"
                        >
                          Send Guidance
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
