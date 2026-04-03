"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { THEME } from "@/config/theme";

interface BusinessCategorySelectionProps {
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    "Ride hailing",
    "Artist",
    "Auto Manufacturing company",
    "Marketseller",
    "School",
    "Dispatch rider",
    "Air condition repairer",
    "Online food seller"
];

export default function BusinessCategorySelection({ onSelect }: BusinessCategorySelectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSelect = (category: string) => {
        setSelectedCategory(category);
        setIsOpen(false);
        onSelect(category);
    };

    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="shrink-0 mb-4 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3.5px] mb-4 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Choose your business category
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business category that suits your business
                </p>
            </div>

            {/* ── Scrollable Content ─────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-12 no-scrollbar custom-scrollbar pr-1">
                <div className="relative mb-6">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all text-left group hover:border-black/20 shadow-sm"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: isOpen ? THEME.colors.actions.primary : THEME.colors.input.border,
                            color: selectedCategory ? THEME.colors.text.primary : THEME.colors.text.muted
                        }}
                    >
                        <span className="text-base md:text-lg font-bold">
                            {selectedCategory || "Enter your business category"}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : 'opacity-40'}`} />
                    </button>

                    {isOpen && (
                        <div 
                            className="absolute top-full left-0 right-0 mt-1.5 rounded-2xl border overflow-hidden z-200 shadow-2xl max-h-[220px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
                            style={{ 
                                backgroundColor: "white",
                                borderColor: "rgba(0,0,0,0.1)" 
                            }}
                        >
                            {CATEGORIES.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => handleSelect(cat)}
                                    className="px-5 py-3.5 hover:bg-black/5 cursor-pointer transition-colors text-base font-bold"
                                    style={{ color: "#2B365A" }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <p 
                        className="text-[11px] font-bold uppercase tracking-wider mb-1"
                        style={{ color: THEME.colors.text.muted }}
                    >
                        Example : Ride hailing
                    </p>
                    <div className="flex flex-col gap-1.5 pl-8 md:pl-12 opacity-50">
                        {CATEGORIES.slice(1, 8).map((example) => (
                            <p 
                                key={example}
                                className="text-base font-bold"
                                style={{ color: THEME.colors.text.secondary }}
                            >
                                {example}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
            `}</style>
        </div>
    );
}
