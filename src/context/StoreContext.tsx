"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, PRODUCTS, BRAND_CONFIG } from "@/data/products";

export interface CartItem {
  id: string; // unique identifier per cart line (product id + size + color)
  productId: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  color: string;
  colorHex: string;
  image: string;
  quantity: number;
  sku: string;
}

export interface ChatMessage {
  id: string;
  timestamp: string;
  sender: "customer" | "admin" | "system";
  customerName?: string;
  customerPhone?: string;
  text: string;
  productInterest?: string;
  status: "unanswered" | "replied";
  adminReply?: string;
  repliedAt?: string;
}

export interface AuthUser {
  phone?: string;
  email?: string;
  name: string;
  role: "customer" | "admin";
  joinedDate?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: "VIP Platinum" | "VIP Gold" | "Patron Silver";
  ordersCount: number;
  totalSpent: number;
  joinedDate: string;
  status: "Active" | "VIP Priority" | "Suspended";
  shippingAddress?: string;
  notes?: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  city: string;
  date: string;
  status: "Processing" | "Dispatched" | "In Transit" | "Delivered" | "Cancelled";
  total: number;
  items: string;
  paymentMethod: string;
  trackingCourier?: string;
  trackingId?: string;
}

export interface StoreCustomizationSettings {
  announcementMarquee: string;
  freeShippingThreshold: number;
  whatsappNumber: string;
  supportEmail: string;
  taxRatePercent: number;
  activePromoCodes: { code: string; percent: number; minSpend: number }[];
}

interface ToastMessage {
  id: string;
  text: string;
  type?: "info" | "success" | "warning";
}

interface StoreContextType {
  // Live Products Management (Admin + Catalog)
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  resetProducts: () => void;
  getProductBySlug: (slug: string) => Product | undefined;

  // Currency & Formatting
  currencySymbol: string;
  currencyCode: string;
  formatPrice: (amount: number) => string;

  // Cart
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => boolean;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;

  // Shipping & Coupons
  freeShippingThreshold: number;
  shippingRemaining: number;
  isFreeShipping: boolean;
  discountCode: string;
  discountAmount: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  orderTotal: number;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Panels
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  
  sizeGuideOpen: boolean;
  sizeGuideCategory: string;
  openSizeGuide: (category?: string) => void;
  closeSizeGuide: () => void;

  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Live Chat Queries (Admin & Customer widget)
  chatMessages: ChatMessage[];
  addCustomerMessage: (msg: { text: string; customerName?: string; customerPhone?: string; productInterest?: string }) => void;
  replyToCustomerMessage: (msgId: string, replyText: string) => void;

  // Notification Toast
  toast: ToastMessage | null;
  showToast: (text: string, type?: "info" | "success" | "warning") => void;

  // User Authentication & Admin Role
  user: AuthUser | null;
  isAdmin: boolean;
  loginWithCredentials: (identifier: string, password: string) => { success: boolean; role: "admin" | "customer"; message?: string };
  loginWithPhoneOtp: (phone: string, role?: "customer" | "admin", name?: string) => boolean;
  registerCustomer: (name: string, email: string, phone: string, password?: string) => { success: boolean; message?: string };
  logout: () => void;

  // Customer Management (Admin CRM)
  customers: CustomerRecord[];
  addCustomer: (customer: CustomerRecord) => void;
  updateCustomer: (customer: CustomerRecord) => void;
  deleteCustomer: (customerId: string) => void;

  // Order Fulfillment & History (Admin)
  orders: OrderRecord[];
  updateOrderStatus: (orderId: string, status: OrderRecord["status"], trackingCourier?: string, trackingId?: string) => void;
  addOrder: (order: OrderRecord) => void;

  // Store Customizations & Settings (Admin)
  settings: StoreCustomizationSettings;
  updateSettings: (newSettings: Partial<StoreCustomizationSettings>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeGuideCategory, setSizeGuideCategory] = useState("Bras");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Settings state
  const [settings, setSettings] = useState<StoreCustomizationSettings>({
    announcementMarquee: "DIWALI LUXURY PRIVILEGE • 15% OFF ATELIER CODE: PREMIUM15 • COMPLIMENTARY EXPRESS DELIVERY ABOVE ₹1,999 • 100% DISCREET PACKAGING",
    freeShippingThreshold: 1999,
    whatsappNumber: "+91 98201 02030",
    supportEmail: "concierge@me2baby.com",
    taxRatePercent: 12,
    activePromoCodes: [
      { code: "PREMIUM15", percent: 15, minSpend: 1500 },
      { code: "FIRSTORDER", percent: 10, minSpend: 999 },
      { code: "LUXURY20", percent: 20, minSpend: 4000 },
    ],
  });

  // Customers state
  const [customers, setCustomers] = useState<CustomerRecord[]>([
    {
      id: "CUST-1001",
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      phone: "9820123456",
      city: "Mumbai, Maharashtra",
      tier: "VIP Platinum",
      ordersCount: 4,
      totalSpent: 12890,
      joinedDate: "Jan 2026",
      status: "Active",
      shippingAddress: "Flat 402, Sea Green Apts, Worli, Mumbai 400018",
      notes: "Prefers Wire-free sculpt bras in 34B, Silk Ivory. Fast express delivery preferred.",
    },
    {
      id: "CUST-1002",
      name: "Aarti Verma",
      email: "aarti.verma@outlook.com",
      phone: "9711054321",
      city: "New Delhi, Delhi NCR",
      tier: "VIP Gold",
      ordersCount: 2,
      totalSpent: 5498,
      joinedDate: "Feb 2026",
      status: "Active",
      shippingAddress: "B-12, Greater Kailash Part 1, New Delhi 110048",
      notes: "Bought Girls Cloud Nightsuit for her 5-year-old daughter. Very satisfied.",
    },
    {
      id: "CUST-1003",
      name: "Deepika Rao",
      email: "deepika.rao@bangalore.in",
      phone: "9845087654",
      city: "Bengaluru, Karnataka",
      tier: "VIP Platinum",
      ordersCount: 6,
      totalSpent: 21450,
      joinedDate: "Nov 2025",
      status: "Active",
      shippingAddress: "Penthouse 4B, Prestige Palm, Indiranagar, Bengaluru 560038",
      notes: "High-value patron. Prefers Cashmere Wrap robes and High-Rise Butter Leggings.",
    },
    {
      id: "CUST-1004",
      name: "Ananya Deshmukh",
      email: "ananya.d@pune.co",
      phone: "9890123890",
      city: "Pune, Maharashtra",
      tier: "Patron Silver",
      ordersCount: 1,
      totalSpent: 1899,
      joinedDate: "Mar 2026",
      status: "Active",
      shippingAddress: "14 Hermes Heritage, Kalyani Nagar, Pune 411006",
      notes: "First time order: Butter-Soft Legging in Espresso Brown.",
    },
    {
      id: "CUST-1005",
      name: "Meera Krishnan",
      email: "meera.krish@chennai.net",
      phone: "9840011223",
      city: "Chennai, Tamil Nadu",
      tier: "VIP Gold",
      ordersCount: 3,
      totalSpent: 8790,
      joinedDate: "Jan 2026",
      status: "Active",
      shippingAddress: "Villa 9, Boat Club Road, RA Puram, Chennai 600028",
      notes: "Sensitive skin. Orders GOTS organic cotton slips and night comfort sets.",
    },
  ]);

  // Orders state
  const [orders, setOrders] = useState<OrderRecord[]>([
    {
      id: "ORD-94281",
      customerName: "Priya Sharma",
      customerPhone: "+91 98201 23456",
      customerEmail: "priya.sharma@gmail.com",
      city: "Mumbai, MH",
      date: "Oct 23, 2026",
      status: "In Transit",
      total: 3898,
      items: "The Butter-Soft Legging (M / Espresso) + Wire-Free Sculpt Bra (34B / Ivory)",
      paymentMethod: "UPI (Google Pay)",
      trackingCourier: "BlueDart Express",
      trackingId: "BD-8841920IN",
    },
    {
      id: "ORD-94255",
      customerName: "Aarti Verma",
      customerPhone: "+91 97110 54321",
      customerEmail: "aarti.verma@outlook.com",
      city: "Delhi NCR",
      date: "Oct 22, 2026",
      status: "Processing",
      total: 1499,
      items: "Girls Cloud-Cotton Comfort Nightsuit (4-5Y / Candy Rose)",
      paymentMethod: "Credit Card (Visa Platinum)",
      trackingCourier: "Delhivery Air",
      trackingId: "DL-49102839IN",
    },
    {
      id: "ORD-94190",
      customerName: "Deepika Rao",
      customerPhone: "+91 98450 87654",
      customerEmail: "deepika.rao@bangalore.in",
      city: "Bengaluru, KA",
      date: "Oct 21, 2026",
      status: "Delivered",
      total: 4999,
      items: "The Cocoon Cashmere & Modal Wrap Robe (L / Warm Silk)",
      paymentMethod: "UPI (PhonePe)",
      trackingCourier: "BlueDart Express",
      trackingId: "BD-7719204IN",
    },
    {
      id: "ORD-94150",
      customerName: "Ananya Deshmukh",
      customerPhone: "+91 98901 23890",
      customerEmail: "ananya.d@pune.co",
      city: "Pune, MH",
      date: "Oct 20, 2026",
      status: "Delivered",
      total: 1899,
      items: "The Butter-Soft High-Rise Legging (S / Onyx Black)",
      paymentMethod: "Cash on Delivery",
      trackingCourier: "Delhivery Air",
      trackingId: "DL-3901920IN",
    },
    {
      id: "ORD-94080",
      customerName: "Meera Krishnan",
      customerPhone: "+91 98400 11223",
      customerEmail: "meera.krish@chennai.net",
      city: "Chennai, TN",
      date: "Oct 19, 2026",
      status: "Delivered",
      total: 3998,
      items: "Girls Stretch Everyday Legging 3-Pack + Pure Modal Loungewear Pant",
      paymentMethod: "Net Banking (HDFC)",
      trackingCourier: "BlueDart Express",
      trackingId: "BD-6601928IN",
    },
  ]);

  // Load user from localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("m2baby_auth_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      const savedCustomers = localStorage.getItem("m2baby_customers");
      if (savedCustomers) {
        setCustomers(JSON.parse(savedCustomers));
      }
      const savedOrders = localStorage.getItem("m2baby_orders");
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
      const savedSettings = localStorage.getItem("m2baby_settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (e) {
      console.error("Could not load user or records from storage", e);
    }
  }, []);

  const loginWithCredentials = (identifier: string, password: string) => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check Administrator Credentials: username 'admin' and password '12345'
    if (
      (cleanId === "admin" || cleanId === "admin@me2baby.com" || cleanId === "admin@m2baby.com" || cleanId === "9876543210") &&
      cleanPass === "12345"
    ) {
      const adminUser: AuthUser = {
        name: "Master Atelier Administrator",
        email: "admin@me2baby.com",
        phone: "9876543210",
        role: "admin",
        joinedDate: "Jan 2024",
      };
      setUser(adminUser);
      try {
        localStorage.setItem("m2baby_auth_user", JSON.stringify(adminUser));
      } catch (e) {
        console.error(e);
      }
      showToast("👑 Master Atelier Administrator authenticated.", "success");
      return { success: true, role: "admin" as const };
    }

    // Check if identifier matches a registered customer
    const foundCustomer = customers.find(
      (c) =>
        c.email.toLowerCase() === cleanId ||
        c.phone.replace(/[^0-9]/g, "") === cleanId.replace(/[^0-9]/g, "")
    );

    if (foundCustomer) {
      const customerUser: AuthUser = {
        name: foundCustomer.name,
        email: foundCustomer.email,
        phone: foundCustomer.phone,
        role: "customer",
        joinedDate: foundCustomer.joinedDate,
      };
      setUser(customerUser);
      try {
        localStorage.setItem("m2baby_auth_user", JSON.stringify(customerUser));
      } catch (e) {
        console.error(e);
      }
      showToast(`Welcome back, ${customerUser.name}!`, "success");
      return { success: true, role: "customer" as const };
    }

    // Default patron login: if not admin, accept any non-empty password for instant luxury access
    if (cleanPass.length >= 3) {
      const isEmail = cleanId.includes("@");
      const customerUser: AuthUser = {
        name: isEmail ? cleanId.split("@")[0].toUpperCase() : "Patron " + cleanId.slice(-4),
        email: isEmail ? cleanId : `${cleanId}@patron.me2baby.com`,
        phone: !isEmail ? cleanId : "9820000000",
        role: "customer",
        joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      };
      setUser(customerUser);
      try {
        localStorage.setItem("m2baby_auth_user", JSON.stringify(customerUser));
      } catch (e) {
        console.error(e);
      }
      showToast(`Welcome to Me2baby, ${customerUser.name}!`, "success");
      return { success: true, role: "customer" as const };
    }

    return {
      success: false,
      role: "customer" as const,
      message: "Please enter a valid password (at least 3 characters).",
    };
  };

  const registerCustomer = (name: string, email: string, phone: string, password?: string) => {
    const newCust: CustomerRecord = {
      id: "CUST-" + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      phone,
      city: "India",
      tier: "Patron Silver",
      ordersCount: 0,
      totalSpent: 0,
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      status: "Active",
    };
    const updated = [newCust, ...customers];
    setCustomers(updated);
    try {
      localStorage.setItem("m2baby_customers", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    const authCust: AuthUser = {
      name,
      email,
      phone,
      role: "customer",
      joinedDate: newCust.joinedDate,
    };
    setUser(authCust);
    try {
      localStorage.setItem("m2baby_auth_user", JSON.stringify(authCust));
    } catch (e) {
      console.error(e);
    }
    showToast(`Account created! Welcome to Me2baby, ${name}.`, "success");
    return { success: true };
  };

  const loginWithPhoneOtp = (phone: string, role: "customer" | "admin" = "customer", name?: string) => {
    const isMasterAdmin = phone === "9876543210" || phone.toLowerCase() === "admin" || role === "admin";
    const newUser: AuthUser = {
      phone,
      name: name || (isMasterAdmin ? "Master Atelier Administrator" : "Patron " + phone.slice(-4)),
      role: isMasterAdmin ? "admin" : "customer",
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
    };
    setUser(newUser);
    try {
      localStorage.setItem("m2baby_auth_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Could not save user", e);
    }
    if (isMasterAdmin) {
      showToast("👑 Verified Administrator Session Initiated.", "success");
    } else {
      showToast(`Welcome back, ${newUser.name}!`, "success");
    }
    return true;
  };

  // Customer Management Handlers
  const addCustomer = (customer: CustomerRecord) => {
    const updated = [customer, ...customers];
    setCustomers(updated);
    try {
      localStorage.setItem("m2baby_customers", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Patron ${customer.name} enrolled.`, "success");
  };

  const updateCustomer = (customer: CustomerRecord) => {
    const updated = customers.map((c) => (c.id === customer.id ? customer : c));
    setCustomers(updated);
    try {
      localStorage.setItem("m2baby_customers", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Patron profile updated for ${customer.name}.`, "success");
  };

  const deleteCustomer = (customerId: string) => {
    const updated = customers.filter((c) => c.id !== customerId);
    setCustomers(updated);
    try {
      localStorage.setItem("m2baby_customers", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast("Patron record removed.", "info");
  };

  // Order Handlers
  const updateOrderStatus = (
    orderId: string,
    status: OrderRecord["status"],
    trackingCourier?: string,
    trackingId?: string
  ) => {
    const updated = orders.map((o) =>
      o.id === orderId
        ? {
            ...o,
            status,
            trackingCourier: trackingCourier || o.trackingCourier,
            trackingId: trackingId || o.trackingId,
          }
        : o
    );
    setOrders(updated);
    try {
      localStorage.setItem("m2baby_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`Order #${orderId} marked as ${status}.`, "success");
  };

  const addOrder = (order: OrderRecord) => {
    const updated = [order, ...orders];
    setOrders(updated);
    try {
      localStorage.setItem("m2baby_orders", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(`New order recorded #${order.id}.`, "success");
  };

  // Settings Handlers
  const updateSettings = (newSettings: Partial<StoreCustomizationSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem("m2baby_settings", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast("Store customization & settings saved successfully.", "success");
  };

  const logout = () => {
    const wasAdmin = user?.role === "admin";
    setUser(null);
    try {
      localStorage.removeItem("m2baby_auth_user");
    } catch (e) {
      console.error(e);
    }
    showToast(wasAdmin ? "Admin logged out successfully." : "Signed out of your account.", "info");
  };

  const isAdmin = user?.role === "admin";

  // Initial Chat Queries
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "chat-01",
      timestamp: "Today, 18:40",
      sender: "customer",
      customerName: "Priyanka S.",
      customerPhone: "+91 98201 54321",
      text: "Is the Wire-Free Sculpt Bra padded or wire-free? Need soft support for daily wear.",
      productInterest: "The Everyday Wire-Free Sculpt Bra",
      status: "replied",
      adminReply: "Hello Priyanka! Yes, it features breathable molded contour cups with zero underwire, offering gentle anatomic lift and complete comfort.",
      repliedAt: "Today, 18:44"
    },
    {
      id: "chat-02",
      timestamp: "Today, 19:15",
      sender: "customer",
      customerName: "Kavita R.",
      customerPhone: "+91 97110 98765",
      text: "For the Butter Leggings, do you recommend size M or L for a 32-inch waist?",
      productInterest: "The Butter-Soft High-Rise Legging",
      status: "unanswered"
    }
  ]);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("m2baby_products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }
      const savedCart = localStorage.getItem("m2baby_cart") || localStorage.getItem("elane_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem("m2baby_wishlist") || localStorage.getItem("elane_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
      const savedChat = localStorage.getItem("m2baby_chat_messages");
      if (savedChat) {
        setChatMessages(JSON.parse(savedChat));
      }
    } catch (e) {
      console.warn("Could not load stored data", e);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    try {
      localStorage.setItem("m2baby_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Could not save cart", e);
    }
  }, [cart]);

  // Save Wishlist
  useEffect(() => {
    try {
      localStorage.setItem("m2baby_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.warn("Could not save wishlist", e);
    }
  }, [wishlist]);

  // Save Products
  const saveProductsToStorage = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("m2baby_products", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save products", e);
    }
  };

  const addProduct = (newProduct: Product) => {
    const updated = [newProduct, ...products];
    saveProductsToStorage(updated);
    showToast(`Added '${newProduct.name}' to live catalog!`, "success");
  };

  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    saveProductsToStorage(updated);
    showToast(`Updated '${updatedProduct.name}' successfully!`, "success");
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    saveProductsToStorage(updated);
    showToast("Product removed from catalog.", "info");
  };

  const resetProducts = () => {
    saveProductsToStorage(PRODUCTS);
    showToast("Catalog reset to factory default.", "info");
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  // Chat message management
  const addCustomerMessage = ({
    text,
    customerName = "Guest Shopper",
    customerPhone = "+91 98765 00000",
    productInterest = "Premium Comfort Collection"
  }: {
    text: string;
    customerName?: string;
    customerPhone?: string;
    productInterest?: string;
  }) => {
    const newMsg: ChatMessage = {
      id: "msg-" + Date.now(),
      timestamp: "Just now",
      sender: "customer",
      customerName,
      customerPhone,
      text,
      productInterest,
      status: "unanswered"
    };
    const updated = [newMsg, ...chatMessages];
    setChatMessages(updated);
    try {
      localStorage.setItem("m2baby_chat_messages", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save chat messages", e);
    }
    showToast("Your inquiry has been submitted to the atelier team!", "success");
  };

  const replyToCustomerMessage = (msgId: string, replyText: string) => {
    const updated = chatMessages.map((msg) =>
      msg.id === msgId
        ? {
            ...msg,
            status: "replied" as const,
            adminReply: replyText,
            repliedAt: "Just now"
          }
        : msg
    );
    setChatMessages(updated);
    try {
      localStorage.setItem("m2baby_chat_messages", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save chat replies", e);
    }
    showToast("Reply sent to customer query!", "success");
  };

  const showToast = (text: string, type: "info" | "success" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToast({ id, text, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3800);
  };

  const openCart = () => setCartOpen(true);
  const closeCart = () => setCartOpen(false);

  const openSearch = () => setSearchOpen(true);
  const closeSearch = () => setSearchOpen(false);

  const openSizeGuide = (category = "Bras") => {
    setSizeGuideCategory(category);
    setSizeGuideOpen(true);
  };
  const closeSizeGuide = () => setSizeGuideOpen(false);

  const openQuickView = (product: Product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  const addToCart = (product: Product, size: string, color: string, quantity = 1): boolean => {
    if (!size) {
      showToast("Please choose a size to continue.", "warning");
      return false;
    }

    const colorObj = product.colors.find((c) => c.name === color) || product.colors[0];
    const cartItemId = `${product.id}-${size}-${colorObj.name}`.toLowerCase().replace(/\s+/g, "-");
    const matchedVariant = product.variants.find(
      (v) => v.size === size && v.color === colorObj.name
    );

    const sku = matchedVariant?.sku || `${product.slug}-${size}-${color}`.toUpperCase();

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          size,
          color: colorObj.name,
          colorHex: colorObj.hex,
          image: product.images[0],
          quantity,
          sku,
        },
      ];
    });

    showToast(`Added ${product.name} (${size}) to your bag.`, "success");
    setCartOpen(true);
    return true;
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast("Item removed from your bag.", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from your wishlist.`, "info");
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${product ? product.name : "item"} to wishlist.`, "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "WELCOME10") {
      setDiscountCode("WELCOME10");
      setDiscountPercent(0.1);
      showToast("10% Welcome gift applied!", "success");
      return { success: true, message: "10% Welcome gift applied!" };
    }
    if (clean === "PREMIUM15" || clean === "ROYAL15" || clean === "ME2BABY15" || clean === "M2BABY15" || clean === "COMFORT15") {
      setDiscountCode("PREMIUM15");
      setDiscountPercent(0.15);
      showToast("👑 15% Premium Luxury Privilege applied!", "success");
      return { success: true, message: "15% Premium Luxury Privilege applied!" };
    }
    showToast("Code not recognized. Try PREMIUM15 for 15% off.", "warning");
    return { success: false, message: "Invalid promo code. Try PREMIUM15" };
  };

  const removeDiscount = () => {
    setDiscountCode("");
    setDiscountPercent(0);
    showToast("Promotional code removed.", "info");
  };

  const discountAmount = Math.round(cartSubtotal * discountPercent);
  const estimatedShipping = isFreeShipping || cartSubtotal === 0 ? 0 : BRAND_CONFIG.shippingRate;
  const orderTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping);

  const formatPrice = (amount: number): string => {
    return `${BRAND_CONFIG.currencySymbol}${Math.round(amount).toLocaleString("en-IN")}`;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        getProductBySlug,
        currencySymbol: BRAND_CONFIG.currencySymbol,
        currencyCode: BRAND_CONFIG.currencyCode,
        formatPrice,
        cart,
        cartCount,
        cartSubtotal,
        cartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        freeShippingThreshold,
        shippingRemaining,
        isFreeShipping,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
        orderTotal,
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        searchOpen,
        openSearch,
        closeSearch,
        sizeGuideOpen,
        sizeGuideCategory,
        openSizeGuide,
        closeSizeGuide,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        chatMessages,
        addCustomerMessage,
        replyToCustomerMessage,
        toast,
        showToast,
        user,
        isAdmin,
        loginWithCredentials,
        loginWithPhoneOtp,
        registerCustomer,
        logout,
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        orders,
        updateOrderStatus,
        addOrder,
        settings,
        updateSettings,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
