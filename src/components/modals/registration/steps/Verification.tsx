"use client";

import { UploadCloud } from "lucide-react";
import { THEME } from "@/config/theme";

interface VerificationProps {
    onSubmit: () => void;
    onBack?: () => void;
}

export default function Verification({ onSubmit, onBack }: VerificationProps) {
    return (
        <div className="flex flex-col w-full min-h-[400px] md:h-[500px] relative px-2 py-4 md:py-6">
            {/* Header Section */}
            <div className="mb-8">
                <div
                    className="w-20 h-[3.5px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Verification
                </h2>
                <p
                    className="text-lg md:text-xl opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Almost done!
                </p>
            </div>

            {/* ID Upload Section */}
            <div className="flex flex-col gap-4 mb-8">
                <p className="text-[15px] font-medium" style={{ color: THEME.colors.text.primary }}>
                    Upload owners valid personal ID <span className="opacity-40 text-sm">(Drivers license, passport, NIN )</span>
                </p>
                <button 
                    className="flex items-center gap-3 w-fit px-5 py-3 rounded-xl border-2 transition-all hover:bg-white/5 active:scale-95"
                    style={{ borderColor: THEME.colors.text.primary }}
                >
                    <UploadCloud className="w-5 h-5" style={{ color: THEME.colors.text.primary }} />
                    <span className="text-sm font-semibold opacity-60" style={{ color: THEME.colors.text.primary }}>
                        Choose from gallery
                    </span>
                </button>
            </div>

            {/* Registration Code Section */}
            <div className="flex flex-col gap-3 mb-10">
                <label className="text-[15px] font-bold" style={{ color: "#2B365A" }}>
                    Business registration code
                </label>
                <div className="relative max-w-[320px]">
                    <input 
                        type="text"
                        placeholder="BN002300"
                        className="w-full px-6 py-4 rounded-2xl border bg-white text-lg font-medium outline-none transition-all focus:border-opacity-100"
                        style={{ 
                            borderColor: THEME.colors.input.border,
                            color: "#2B365A"
                        }}
                    />
                    <span 
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-medium opacity-40 pointer-events-none"
                        style={{ color: "#2B365A" }}
                    >
                        (Optional)
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                className="w-[240px] py-4 rounded-2xl text-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-auto"
                style={{ 
                    backgroundColor: THEME.colors.actions.primary,
                    color: "white"
                }}
            >
                Submit
            </button>

            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-2 text-sm font-medium hover:underline opacity-40"
                    style={{ color: THEME.colors.text.muted }}
                >
                    Back
                </button>
            )}
        </div>
    );
}
