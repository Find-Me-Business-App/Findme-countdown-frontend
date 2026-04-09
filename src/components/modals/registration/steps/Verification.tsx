"use client";

import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { THEME } from "@/config/theme";

interface VerificationProps {
    onSubmit: () => void;
}

export default function Verification({ onSubmit }: VerificationProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [regCode, setRegCode] = useState("");

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit();
            setIsSubmitting(false);
        }, 1500);
    };

    const labelClasses = "text-[12px] font-bold ml-1 uppercase tracking-wider opacity-60";

    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="shrink-0 mb-4 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3px] mb-4 opacity-95 rounded-full"
                    style={{ backgroundColor: "white" }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight text-white"
                >
                    Verification
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3 text-[#DDDDDD]"
                >
                    Almost done! Please enter the code sent to your email.
                </p>
            </div>

            {/* ── Scrollable Content ─────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-20 no-scrollbar custom-scrollbar pr-1">
                <div className="flex flex-col gap-6 max-w-[420px]">
                    {/* ID Upload Section - Removed */}

                    {/* Registration Code Section */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses} style={{ color: "white" }}>
                            Business verification code
                        </label>
                        <div className="flex items-center bg-white rounded-xl border overflow-hidden transition-all h-[46px] shadow-sm" style={{ borderColor: THEME.colors.input.border }}>
                            <input
                                type="text"
                                value={regCode}
                                onChange={(e) => setRegCode(e.target.value)}
                                placeholder="BN002300"
                                className="flex-1 bg-transparent px-5 h-full text-[#2B365A] outline-none placeholder:text-[#2B365A]/30 text-sm font-bold"
                            />
                        </div>
                        <p className="text-[10px] text-white/50 ml-1 mt-1">
                            Check your registered email for the verification code.
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Button (fixed) */}
            <div className="absolute bottom-4 right-0 flex items-center justify-end pointer-events-none z-[160] px-1 md:px-0">
                <div className="pointer-events-auto">
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting || regCode.trim().length === 0}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 group disabled:opacity-30 disabled:hover:scale-100"
                        style={{ backgroundColor: "#2B365A" }}
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </div>
    );
}
