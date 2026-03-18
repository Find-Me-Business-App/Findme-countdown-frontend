"use client";

import { useState } from "react";
import { ChevronDown, Info as InfoIcon, X as XIcon } from "lucide-react";
import { THEME } from "@/config/theme";

interface BusinessAccountInfoProps {
    businessName: string;
    category: string;
    onComplete: (ownershipType: string) => void;
}

const OWNERSHIP_TYPES = ["Self owned", "Partnership", "Corporation", "Freelancer", "LLC"];

export default function BusinessAccountInfo({ businessName, category, onComplete }: BusinessAccountInfoProps) {
    const [ownership, setOwnership] = useState("Self owned");

    return (
        <div className="flex flex-col w-full min-h-[500px] md:h-[550px] relative overflow-hidden">
            {/* Header section (fixed) */}
            <div className="flex flex-col mb-4 pt-2 md:pt-4 px-2">
                <div
                    className="w-20 h-[3.5px] mb-6 opacity-95"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Business Account
                </h2>
                <p
                    className="text-lg md:text-xl opacity-70 mb-8"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>

                {/* Ownership Type Selector (Horizontal scrollable) */}
                <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-2 px-2">
                    {OWNERSHIP_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOwnership(type)}
                            className="whitespace-nowrap px-6 py-2.5 rounded-xl border-2 font-bold transition-all text-sm tracking-wide shadow-sm"
                            style={{
                                backgroundColor: ownership === type ? THEME.colors.actions.primary : "white",
                                borderColor: ownership === type ? THEME.colors.actions.primary : "transparent",
                                color: ownership === type ? "white" : "#2B365A",
                                opacity: 1
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-2 pb-24 no-scrollbar custom-scrollbar">
                <h3
                    className="text-2xl font-bold mb-6 opacity-40 uppercase tracking-[0.05em]"
                    style={{ color: "#2B365A" }}
                >
                    Business description
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Business Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business Name
                        </label>
                        <div
                            className="flex items-center justify-between px-6 py-3.5 rounded-2xl border bg-white shadow-sm"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-lg font-bold" style={{ color: "#2B365A" }}>
                                {businessName || "EmO Industries Inc"}
                            </span>
                            <button className="text-[14px] font-semibold opacity-40 hover:opacity-100 transition-opacity" style={{ color: "#2B365A" }}>
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Category Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Category
                        </label>
                        <div
                            className="flex items-center justify-between px-6 py-3.5 rounded-2xl border bg-white shadow-sm"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-lg font-bold" style={{ color: "#2B365A" }}>
                                {category || "Texile Manufacturing company"}
                            </span>
                            <ChevronDown className="w-6 h-6 opacity-40" style={{ color: "#2B365A" }} />
                        </div>
                    </div>

                    {/* Sub / Main Category Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Sub category
                            </label>
                            <div
                                className="flex items-center px-6 py-3.5 rounded-2xl border bg-white shadow-sm"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <span className="text-sm font-medium opacity-40" style={{ color: "#2B365A" }}>
                                    Industry
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Main category
                            </label>
                            <div
                                className="flex items-center px-6 py-3.5 rounded-2xl border bg-white shadow-sm"
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
                        <label className="text-[13px] font-bold pl-1 uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#2B365A" }}>
                            Subsidiary category
                            <span className="opacity-40"><InfoIcon size={14} /></span>
                        </label>
                        <div
                            className="flex items-center justify-between px-6 py-4 rounded-2xl border bg-white shadow-sm transition-all"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-lg font-medium" style={{ color: "#2B365A" }}>
                                Manufacturing company
                            </span>
                            <ChevronDown className="w-6 h-6 opacity-40" style={{ color: "#2B365A" }} />
                        </div>
                    </div>

                    {/* Tags Section */}
                    <div className="flex gap-4 mb-2">
                        <div className="px-5 py-2.5 bg-white rounded-xl border shadow-sm flex items-center gap-3" style={{ borderColor: THEME.colors.input.border }}>
                            <span className="text-sm font-bold" style={{ color: "#2B365A" }}>Factory</span>
                            <button className="opacity-40 hover:opacity-100 transition-opacity">
                                <XIcon size={16} style={{ color: "#2B365A" }} />
                            </button>
                        </div>
                        <div className="px-5 py-2.5 bg-white rounded-xl border shadow-sm flex items-center gap-3" style={{ borderColor: THEME.colors.input.border }}>
                            <span className="text-sm font-bold" style={{ color: "#2B365A" }}>Museum</span>
                            <button className="opacity-40 hover:opacity-100 transition-opacity">
                                <XIcon size={16} style={{ color: "#2B365A" }} />
                            </button>
                        </div>
                    </div>

                    {/* Business major offering Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business major offering
                        </label>
                        <div
                            className="flex items-center justify-between px-6 py-4 rounded-2xl border bg-white shadow-sm transition-all"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-lg font-medium" style={{ color: "#2B365A" }}>
                                Product and services
                            </span>
                            <ChevronDown className="w-6 h-6 opacity-40" style={{ color: "#2B365A" }} />
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

            {/* Floating Action Button */}
            <button
                onClick={() => onComplete(ownership)}
                className="absolute bottom-6 right-2 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-all active:scale-95 group z-[120]"
                style={{ backgroundColor: THEME.colors.actions.primary }}
            >
                <div className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
            </button>



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
