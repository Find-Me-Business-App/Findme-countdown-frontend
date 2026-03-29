"use client";

import { useState } from "react";
import { Search, Check } from "lucide-react";
import { THEME } from "@/config/theme";

interface FestivalCategorySelectionProps {
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    "Dean",
    "Delivery service",
    "Dentist",
    "Detention Center",
    "Dermatologist",
    "Digital Agency",
    "Display Artist",
    "Design Studio",
    "Dance School"
];

export default function FestivalCategorySelection({ onSelect }: FestivalCategorySelectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredCategories = CATEGORIES.filter(cat =>
        cat.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto relative px-1 md:py-4 h-full">
            {/* Header Section */}
            <div className="mb-6 md:mb-8">
                <div
                    className="w-16 md:w-20 h-1 mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Choose your business category
                </h2>
                <p
                    className="text-base md:text-lg opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business category that suits your business
                </p>
            </div>

            {/* Search and Dropdown Section */}
            <div className="relative mb-4 mt-2 flex-1 flex flex-col">
                {/* Search Input Container */}
                <div
                    className="w-full relative z-20 transition-all duration-300 shadow-sm"
                    style={{
                        backgroundColor: THEME.colors.input.bg,
                        borderTopLeftRadius: "24px",
                        borderTopRightRadius: "24px",
                        borderBottomLeftRadius: (searchQuery && filteredCategories.length > 0) ? "0" : "24px",
                        borderBottomRightRadius: (searchQuery && filteredCategories.length > 0) ? "0" : "24px",
                        border: `1.5px solid ${isFocused ? THEME.colors.actions.primary : THEME.colors.input.border}`,
                    }}
                >
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-40">
                        <Search size={22} style={{ color: "#2B365A" }} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories..."
                        className="w-full pl-16 pr-6 py-5 bg-transparent border-none outline-none font-bold text-lg md:text-xl placeholder-[#2B365A]/30"
                        style={{ color: "#2B365A" }}
                        autoFocus
                    />
                </div>

                {/* Dropdown Options */}
                {searchQuery && filteredCategories.length > 0 && (
                    <div
                        className="w-full border-x border-b overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl"
                        style={{
                            backgroundColor: "white",
                            borderColor: THEME.colors.input.border,
                            borderBottomLeftRadius: "24px",
                            borderBottomRightRadius: "24px",
                            marginTop: "-1px"
                        }}
                    >
                        <div className="flex flex-col max-h-[320px] overflow-y-auto no-scrollbar py-2">
                            {filteredCategories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => onSelect(cat)}
                                    className="px-8 py-4 cursor-pointer hover:bg-black/5 transition-colors text-lg font-bold flex items-center justify-between group"
                                    style={{ color: "#2B365A" }}
                                >
                                    <span>{cat}</span>
                                    <Check className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {searchQuery && filteredCategories.length === 0 && (
                    <div className="mt-4 px-6 py-4 text-center opacity-40 font-medium italic">
                        No categories found matching &ldquo;{searchQuery}&rdquo;
                    </div>
                )}
            </div>

            {/* Quick Suggestions */}
            {!searchQuery && (
                <div className="mt-4 animate-in fade-in duration-500">
                    <p className="text-sm font-bold uppercase tracking-wider mb-4 px-1" style={{ color: THEME.colors.text.muted }}>
                        Suggested Categories
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                        {CATEGORIES.slice(0, 6).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onSelect(cat)}
                                className="px-5 py-2.5 rounded-xl border-2 font-bold transition-all text-sm tracking-wide hover:scale-[1.03] active:scale-[0.98]"
                                style={{
                                    backgroundColor: "white",
                                    borderColor: THEME.colors.input.border,
                                    color: "#2B365A"
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            )}

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
