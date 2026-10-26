"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import {
  Phone,
  Lock,
  ArrowRight,
  Crown,
  RefreshCw,
  Mail,
  User,
  Sparkles,
  AlertCircle,
  ShieldCheck,
  Check,
} from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/account";

  const {
    loginWithCredentials,
    loginWithPhoneOtp,
    registerCustomer,
    user,
    isAdmin,
    showToast,
  } = useStore();

  // Mode: "signin" | "signup"
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  // Sign In method: "password" | "otp"
  const [signInMethod, setSignInMethod] = useState<"password" | "otp">("password");

  // Form State for Password Login
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  // Form State for Mobile OTP Login
  const [otpStep, setOtpStep] = useState<"phone" | "verify">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("888888");
  const [timer, setTimer] = useState(30);

  // Form State for Sign Up (Create Account)
  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // UI status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Countdown timer for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpStep === "verify" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, timer]);

  // If already logged in, redirect accordingly
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push(redirectUrl);
      }
    }
  }, [user, isAdmin, redirectUrl, router]);

  // 1. Handle Password Sign In (supports both Customers and Admin admin/12345)
  const handlePasswordSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!identifier.trim()) {
      setErrorMsg("Please enter your email, mobile number, or atelier ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const res = loginWithCredentials(identifier, password);
      if (res.success) {
        if (res.role === "admin") {
          router.push("/admin");
        } else {
          router.push(redirectUrl);
        }
      } else {
        setErrorMsg(res.message || "Invalid credentials. Please try again.");
      }
    }, 600);
  };

  // 2. Handle Send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setLoading(false);
      setOtpStep("verify");
      setTimer(30);
      showToast(`SMS OTP dispatched to +91 ${cleanPhone}. Demo Code: ${newOtp}`, "info");
    }, 700);
  };

  // 3. Handle Verify OTP
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (otp.trim().length !== 6) {
      setErrorMsg("Please enter the complete 6-digit verification code.");
      return;
    }

    if (otp !== generatedOtp && otp !== "888888" && otp !== "123456") {
      setErrorMsg("Incorrect verification code. Please check or click Autofill.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
      loginWithPhoneOtp(cleanPhone);
      router.push(redirectUrl);
    }, 600);
  };

  // 4. Handle Sign Up
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!signUpName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!signUpEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    const cleanPhone = signUpPhone.replace(/[^0-9]/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (signUpPassword.length < 4) {
      setErrorMsg("Password must be at least 4 characters long.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      registerCustomer(signUpName.trim(), signUpEmail.trim(), cleanPhone, signUpPassword);
      router.push(redirectUrl);
    }, 700);
  };

  const handleAutofillDemoOtp = () => {
    setOtp(generatedOtp);
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen py-16 sm:py-24 px-4 sm:px-6 relative flex items-center justify-center font-sans">
      <div className="w-full max-w-md relative z-10">
        {/* Main Luxury Black Card */}
        <div className="bg-[#0A0A0A] border border-[#D4AF37]/50 rounded-xs shadow-[0_25px_60px_rgba(0,0,0,0.95)] p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
          {/* Top Gold Accent Ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-linear-to-r from-transparent via-[#D4AF37] to-transparent" />

          {/* Brand Emblem & Heading */}
          <div className="text-center space-y-2 mb-6">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#141414] border border-[#D4AF37]/60 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.25)]">
              <Crown className="w-7 h-7 text-[#D4AF37]" />
            </div>

            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block">
              ME2BABY PRIVILEGE PORTAL
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              {mode === "signin" ? "Patron Sign In" : "Create Patron Account"}
            </h1>

            <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
              {mode === "signin"
                ? "Sign in to access your saved sizes, private order milestones, and VIP privileges."
                : "Join the Me2baby Atelier to receive 15% privilege on your inaugural intimates order."}
            </p>
          </div>

          {/* Primary Mode Tabs: Sign In vs Create Account */}
          <div className="grid grid-cols-2 bg-[#121212] p-1 rounded-2xs border border-white/10 mb-6 text-xs font-semibold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMsg("");
              }}
              className={`py-2.5 rounded-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "signin"
                  ? "bg-[#000000] text-[#FAF7F2] border border-[#D4AF37]/60 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <User className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMsg("");
              }}
              className={`py-2.5 rounded-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === "signup"
                  ? "bg-[#000000] text-[#FAF7F2] border border-[#D4AF37]/60 shadow-sm"
                  : "text-white/50 hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sign Up</span>
            </button>
          </div>

          {/* =========================================================================
              VIEW 1: SIGN IN MODE
              ========================================================================= */}
          {mode === "signin" && (
            <div className="space-y-4">
              {/* Secondary Switch: Password vs OTP */}
              <div className="flex border-b border-white/10 pb-2 text-xs font-medium justify-center gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setSignInMethod("password");
                    setErrorMsg("");
                  }}
                  className={`pb-1 transition-colors cursor-pointer ${
                    signInMethod === "password"
                      ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-semibold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Email / ID &amp; Password
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSignInMethod("otp");
                    setErrorMsg("");
                  }}
                  className={`pb-1 transition-colors cursor-pointer ${
                    signInMethod === "otp"
                      ? "text-[#D4AF37] border-b-2 border-[#D4AF37] font-semibold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  Mobile Number &amp; OTP
                </button>
              </div>

              {/* METHOD A: Email / ID & Password */}
              {signInMethod === "password" && (
                <form onSubmit={handlePasswordSignIn} className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs text-white/80 font-medium">
                      Email, Phone Number or User ID
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="e.g. priya@gmail.com or 9820123456"
                        className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-white/80 font-medium">Password</label>
                      <button
                        type="button"
                        onClick={() =>
                          showToast(
                            "Password assistance link dispatched to your registered address.",
                            "info"
                          )
                        }
                        className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your account password"
                        className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xs text-xs text-red-200 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-piano-black py-3.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to Atelier</span>
                        <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* METHOD B: Mobile Number & OTP */}
              {signInMethod === "otp" && (
                <div className="pt-1">
                  {otpStep === "phone" ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-white/80 font-medium flex justify-between">
                          <span>Registered Mobile Number</span>
                          <span className="text-[11px] text-[#D4AF37]">One-Time SMS Passcode</span>
                        </label>

                        <div className="flex gap-2">
                          <div className="bg-[#141414] border border-white/15 px-3 py-3 rounded-2xs text-xs text-[#FAF7F2] font-mono flex items-center gap-1 select-none">
                            <span>🇮🇳 +91</span>
                          </div>
                          <div className="relative flex-1">
                            <Phone className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                            <input
                              type="tel"
                              required
                              maxLength={10}
                              value={phoneNumber}
                              onChange={(e) =>
                                setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                              }
                              placeholder="Enter 10-digit mobile"
                              className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37] font-mono tracking-wider"
                            />
                          </div>
                        </div>
                      </div>

                      {errorMsg && (
                        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xs text-xs text-red-200 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-piano-black py-3.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                            <span>Dispatching One-Time Code...</span>
                          </>
                        ) : (
                          <>
                            <span>Request Verification Code</span>
                            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* OTP Entry */
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      {/* Simulated SMS helper */}
                      <div className="bg-[#121212] border border-[#D4AF37]/60 p-3 rounded-2xs text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[#D4AF37] font-semibold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Simulated SMS Dispatched:
                          </span>
                          <span className="font-mono text-white text-xs font-bold tracking-widest bg-black px-2 py-0.5 rounded-2xs border border-[#D4AF37]/40">
                            {generatedOtp}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-white/60">Sent to +91 {phoneNumber}</span>
                          <button
                            type="button"
                            onClick={handleAutofillDemoOtp}
                            className="text-[#D4AF37] hover:underline font-semibold cursor-pointer"
                          >
                            Click to Autofill OTP ⚡
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-white/80 font-medium">Enter 6-Digit Code</label>
                          <button
                            type="button"
                            onClick={() => {
                              setOtpStep("phone");
                              setErrorMsg("");
                            }}
                            className="text-[11px] text-[#D4AF37] hover:underline cursor-pointer"
                          >
                            Change Number
                          </button>
                        </div>

                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                          placeholder="• • • • • •"
                          className="w-full bg-[#141414] border border-white/20 p-3.5 rounded-2xs text-center text-xl text-white placeholder:text-white/20 focus:outline-hidden focus:border-[#D4AF37] font-mono tracking-[0.5em]"
                          autoFocus
                        />
                      </div>

                      {errorMsg && (
                        <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xs text-xs text-red-200 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-piano-black py-3.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                      >
                        {loading ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <span>Confirm &amp; Access Account</span>
                            <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                          </>
                        )}
                      </button>

                      <div className="flex justify-between items-center text-[11px] text-white/50 pt-1">
                        <span>Didn&apos;t receive code?</span>
                        <button
                          type="button"
                          disabled={timer > 0}
                          onClick={() => {
                            const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                            setGeneratedOtp(newOtp);
                            setTimer(30);
                            showToast(`New verification code: ${newOtp}`, "info");
                          }}
                          className={`${
                            timer > 0
                              ? "text-white/30 cursor-not-allowed"
                              : "text-[#D4AF37] hover:underline cursor-pointer"
                          }`}
                        >
                          {timer > 0 ? `Resend code in ${timer}s` : "Resend Code Now"}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              VIEW 2: CREATE PATRON ACCOUNT (SIGN UP)
              ========================================================================= */}
          {mode === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-white/80 font-medium">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/80 font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="e.g. priya.sharma@gmail.com"
                    className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/80 font-medium">10-Digit Mobile Number</label>
                <div className="flex gap-2">
                  <div className="bg-[#141414] border border-white/15 px-3 py-3 rounded-2xs text-xs text-[#FAF7F2] font-mono flex items-center gap-1 select-none">
                    <span>🇮🇳 +91</span>
                  </div>
                  <div className="relative flex-1">
                    <Phone className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="9820123456"
                      className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-white/80 font-medium">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create your secure password"
                    className="w-full bg-[#141414] border border-white/15 pl-10 pr-4 py-3 rounded-2xs text-xs text-white placeholder:text-white/30 focus:outline-hidden focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* VIP Welcome Privilege Note */}
              <div className="p-3 bg-[#141414] border border-[#D4AF37]/40 rounded-2xs text-xs text-[#F4E8C1] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Enrolls you into Me2baby VIP Circle with 15% inaugural privilege.</span>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-2xs text-xs text-red-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-piano-black py-3.5 text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
                    <span>Creating Patron Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Luxury Patron Account</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Privacy & SSL Footer */}
          <div className="pt-6 border-t border-white/10 mt-6 text-center text-[11px] text-white/40 space-y-2">
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>256-Bit SSL Encrypted Verification • 100% Discreet Packaging</span>
            </p>
            <div className="flex justify-between items-center pt-2">
              <Link href="/" className="hover:text-white transition-colors">
                ← Return to Boutique
              </Link>
              <Link href="/contact" className="text-[#D4AF37] hover:underline">
                Need Assistance?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white">
          <RefreshCw className="w-6 h-6 animate-spin text-[#D4AF37]" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
