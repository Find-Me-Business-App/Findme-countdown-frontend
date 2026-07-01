"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Mail, ShieldAlert } from "lucide-react";

export default function VercelSpeedInsights({ children }: { children: React.ReactNode }) {
  // Toggle status check
  const isSuspended = true;
  const [showContact, setShowContact] = useState(false);

  if (!isSuspended) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-200 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-xl text-center shadow-2xl space-y-6">
        {/* Alert Icon */}
        <div className="mx-auto w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Service Unavailable
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            This application has been suspended due to an outstanding billing issue. 
            Access will be restored once the administrative hold is resolved.
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setShowContact((prev) => !prev)}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-red-600/30 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </button>
        </div>

        {/* Bounce Reveal Contact Info */}
        <AnimatePresence>
          {showContact && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 260,
                  damping: 15
                }
              }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="p-5 rounded-xl bg-neutral-900/80 border border-red-500/20 flex flex-col items-center gap-3 text-neutral-300"
            >
              <div className="flex items-center gap-2 font-semibold text-red-400 text-sm">
                <ShieldAlert className="w-4 h-4" />
                <span>System Administrator Required</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
                Please contact the primary system administrator or service provider to reactivate this domain.
              </p>
              <div className="w-full flex flex-col items-center gap-1.5 pt-1 border-t border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">Reference Code</span>
                <code className="px-2.5 py-1 rounded bg-neutral-950 border border-neutral-800 text-[10px] font-mono tracking-wide text-neutral-400 select-all">
                  FMD-402-HOLD-RECONCILE
                </code>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-xs text-neutral-600">
        Status Code: 402 Payment Required
      </div>
    </div>
  );
}
