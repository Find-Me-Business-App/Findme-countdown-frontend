"use client";

import { useState } from "react";
import { ChevronDown, Info as InfoIcon, X as XIcon } from "lucide-react";
import { THEME } from "@/config/theme";

interface BusinessAccountInfoProps {
    businessName: string;
    category: string;
    onBack?: () => void;
    onComplete: (ownershipType: string) => void;
}

const OWNERSHIP_TYPES = ["Self owned", "Partnership", "Corporation", "Freelancer", "LLC"];

export default function BusinessAccountInfo({ businessName, category, onBack, onComplete }: BusinessAccountInfoProps) {
    const [ownership, setOwnership] = useState("Self owned");

    return (
        <div className="flex flex-col w-full h-full md:h-[600px] relative overflow-hidden">
            {/* Header section (fixed) */}
            <div className="flex flex-col mb-4 pt-2 md:pt-4">
                <div
                    className="w-16 md:w-20 h-1 mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Business Account
                </h2>
                <p
                    className="text-base md:text-xl opacity-70 mb-6 md:mb-8"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>

                <div className="flex gap-2.5 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {OWNERSHIP_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOwnership(type)}
                            className="whitespace-nowrap px-5 md:px-6 py-2 rounded-xl border-2 font-bold transition-all text-[13px] md:text-sm tracking-wide shadow-sm"
                            style={{
                                backgroundColor: ownership === type ? THEME.colors.actions.primary : "white",
                                borderColor: ownership === type ? THEME.colors.actions.primary : "transparent",
                                color: ownership === type ? "white" : "#2B365A",
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-28 no-scrollbar custom-scrollbar md:pr-2">
                <h3
                    className="text-2xl font-bold mb-6 opacity-40 uppercase tracking-[0.05em]"
                    style={{ color: "#2B365A" }}
                >
                    Business description
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Business Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business Name
                        </label>
                        <div
                            className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-bold" style={{ color: "#2B365A" }}>
                                {businessName || "EmO Industries Inc"}
                            </span>
                            <button className="text-[13px] md:text-[14px] font-semibold opacity-40 hover:opacity-100 transition-opacity" style={{ color: "#2B365A" }}>
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Category Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Category
                        </label>
                        <div
                            className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-bold" style={{ color: "#2B365A" }}>
                                {category || "Texile Manufacturing company"}
                            </span>
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 opacity-40" style={{ color: "#2B365A" }} />
                        </div>
                    </div>

                    {/* Sub / Main Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Sub category
                            </label>
                            <div
                                className="flex items-center px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <span className="text-sm font-medium opacity-40" style={{ color: "#2B365A" }}>
                                    Industry
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Main category
                            </label>
                            <div
                                className="flex items-center px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <span className="text-sm font-medium opacity-40" style={{ color: "#2B365A" }}>
                                    Company
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Subsidiary Category Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#2B365A" }}>
                            Subsidiary category
                            <span className="opacity-40"><InfoIcon size={14} /></span>
                        </label>
                        <div
                            className="flex items-center justify-between px-5 md:px-6 py-3.5 md:py-4 rounded-2xl border bg-white shadow-sm transition-all"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-medium" style={{ color: "#2B365A" }}>
                                Manufacturing company
                            </span>
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 opacity-40" style={{ color: "#2B365A" }} />
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-wrap gap-3 mb-2">
                        <div className="px-4 md:px-5 py-2 md:py-2.5 bg-white rounded-xl border shadow-sm flex items-center gap-2 md:gap-3" style={{ borderColor: THEME.colors.input.border }}>
                            <span className="text-xs md:text-sm font-bold" style={{ color: "#2B365A" }}>Factory</span>
                            <button className="opacity-40 hover:opacity-100 transition-opacity">
                                <XIcon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: "#2B365A" }} />
                            </button>
                        </div>
                        <div className="px-4 md:px-5 py-2 md:py-2.5 bg-white rounded-xl border shadow-sm flex items-center gap-2 md:gap-3" style={{ borderColor: THEME.colors.input.border }}>
                            <span className="text-xs md:text-sm font-bold" style={{ color: "#2B365A" }}>Museum</span>
                            <button className="opacity-40 hover:opacity-100 transition-opacity">
                                <XIcon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: "#2B365A" }} />
                            </button>
                        </div>
                    </div>

                    {/* Business major offering Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business major offering
                        </label>
                        <div
                            className="flex items-center justify-between px-5 md:px-6 py-3.5 md:py-4 rounded-2xl border bg-white shadow-sm transition-all"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-medium" style={{ color: "#2B365A" }}>
                                Product and services
                            </span>
                            <ChevronDown className="w-5 h-5 md:w-6 md:h-6 opacity-40" style={{ color: "#2B365A" }} />
                        </div>
                    </div>

                    {/* About this business TextArea */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            About this business
                        </h4>
                        <textarea
                            placeholder="Write here how you would describe your business"
                            className="w-full min-h-[160px] p-6 rounded-[24px] border bg-white shadow-sm outline-none resize-none text-[15px] leading-relaxed transition-all focus:ring-1 focus:ring-black/5"
                            style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons Container */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between pointer-events-none z-[120] px-1 md:px-0">
                <div className="pointer-events-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="text-[14px] md:text-[15px] font-bold opacity-60 hover:opacity-100 transition-opacity px-4 py-2"
                            style={{ color: THEME.colors.text.muted }}
                        >
                            Back
                        </button>
                    )}
                </div>

                <div className="pointer-events-auto">
                    <button
                        onClick={() => onComplete(ownership)}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all active:scale-95 group bg-[#2B365A]"
                        style={{ backgroundColor: THEME.colors.actions.primary }}
                    >
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
                    </button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
