"use client";

import React from "react";
import { useStore } from "@/context/StoreContext";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";

export default function ToastNotification() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div className="bg-[#302522] text-[#FAF7F2] px-5 py-3.5 shadow-2xl rounded-xs border border-[#D9C7B3]/20 flex items-center gap-3 max-w-sm">
        {toast.type === "success" && (
          <CheckCircle2 className="w-4 h-4 text-[#C9A6A0] shrink-0" />
        )}
        {toast.type === "warning" && (
          <AlertCircle className="w-4 h-4 text-[#D9C7B3] shrink-0" />
        )}
        {toast.type === "info" && (
          <Info className="w-4 h-4 text-[#D9C7B3] shrink-0" />
        )}
        <span className="text-xs font-sans tracking-wide leading-tight">
          {toast.text}
        </span>
      </div>
    </div>
  );
}
