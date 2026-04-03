"use client";

import { ChevronRight } from "lucide-react";

interface AccountTypeSelectionProps {
    onSelect: (type: "business" | "listing") => void;
}

export default function AccountTypeSelection({ onSelect }: AccountTypeSelectionProps) {
    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="shrink-0 mb-8 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3px] mb-3 opacity-95 rounded-full bg-white"
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight text-white"
                >
                    Choose your account
                </h2>
                <p
                    className="text-base md:text-lg opacity-70 mb-3 text-white/70"
                >
                    Select the business account that best suits you
                </p>
            </div>

            {/* ── Content ────────────────────────────────── */}
            <div className="w-full md:w-[333px] md:h-[218px] flex flex-col justify-center">
                {/* Divider 1 */}
                <div 
                    className="h-px w-full" 
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }} 
                />

                {/* Option 1: Create your business */}
                <button
                    onClick={() => onSelect("business")}
                    className="flex items-center justify-between py-4 group transition-all text-left"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm md:text-[15px]" style={{ color: "#2B365A" }}>
                                Create your business
                            </h3>
                            <span className="text-sm">📊</span>
                        </div>
                        <p className="text-[13px] md:text-[14px] opacity-60 leading-tight mt-1 text-white/60 max-w-[280px]">
                            Create your new business or manage your already existing business
                        </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
                </button>

                {/* Divider 2 */}
                <div 
                    className="h-px w-full" 
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }} 
                />

                {/* Option 2: Register business as a listing */}
                <button
                    onClick={() => onSelect("listing")}
                    className="flex items-center justify-between py-4 group transition-all text-left"
                >
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm md:text-[15px]" style={{ color: "#2B365A" }}>
                                Register business as a listing
                            </h3>
                            <span className="text-sm">🚫</span>
                        </div>
                        <p className="text-[13px] md:text-[14px] opacity-60 leading-tight mt-1 text-white/60 max-w-[280px]">
                            Create your business as a listing without a dashboard
                        </p>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
                </button>

                {/* Divider 3 */}
                <div 
                    className="h-px w-full" 
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }} 
                />
            </div>
        </div>
    );
}
