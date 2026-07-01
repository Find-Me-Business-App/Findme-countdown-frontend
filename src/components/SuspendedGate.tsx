"use client";

import React from "react";
import { AlertCircle, Mail } from "lucide-react";

export default function SuspendedGate({ children }: { children: React.ReactNode }) {
  // Set to true to display the suspension screen
  const isSuspended = true;

  if (!isSuspended) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-6 text-neutral-200 font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8 backdrop-blur-xl text-center shadow-2xl space-y-6">
        {/* Simple Red Alert Icon */}
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
          <a
            href="mailto:billing@findmeonline.com.ng"
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
          >
            <Mail className="w-4 h-4" />
            Contact Support
          </a>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="mt-8 text-xs text-neutral-600">
        Status Code: 402 Payment Required
      </div>
    </div>
  );
}
