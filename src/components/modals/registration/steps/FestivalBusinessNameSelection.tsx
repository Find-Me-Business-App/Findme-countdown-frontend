"use client";

import { useState } from "react";
import { Search, Check, Info } from "lucide-react";
import { THEME } from "@/config/theme";

interface FestivalBusinessNameSelectionProps {
    onSelect: (name: string) => void;
}

const BUSINESS_NAMES = [
    "Casablanca Enterprise",
    "CasaDiEmO Inc.",
    "Casadipoka Ent.",
    "Casala Foods Ltd",
    "Casa Bella Solutions",
    "Creative Pulse",
    "Cloud Nine Events",
    "Crafty Corners"
];

export default function FestivalBusinessNameSelection({ onSelect }: FestivalBusinessNameSelectionProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredNames = BUSINESS_NAMES.filter(name => 
        name.toLowerCase().includes(searchQuery.toLowerCase())
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
                    Choose your business name
                </h2>
                <p
                    className="text-base md:text-lg opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business name on your registration document
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
                        borderBottomLeftRadius: (searchQuery && filteredNames.length > 0) ? "0" : "24px",
                        borderBottomRightRadius: (searchQuery && filteredNames.length > 0) ? "0" : "24px",
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
                        placeholder="Search your business name..."
                        className="w-full pl-16 pr-6 py-5 bg-transparent border-none outline-none font-bold text-lg md:text-xl placeholder-[#2B365A]/30"
                        style={{ color: "#2B365A" }}
                        autoFocus
                    />
                </div>

                {/* Dropdown Options */}
                {searchQuery && filteredNames.length > 0 && (
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
                            {filteredNames.map((name) => (
                                <div
                                    key={name}
                                    onClick={() => onSelect(name)}
                                    className="px-8 py-4 cursor-pointer hover:bg-black/5 transition-colors text-lg font-bold flex items-center justify-between group"
                                    style={{ color: "#2B365A" }}
                                >
                                    <span>{name}</span>
                                    <Check className="w-5 h-5 opacity-0 group-hover:opacity-40 transition-opacity" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {searchQuery && filteredNames.length === 0 && (
                    <div className="mt-8 flex flex-col items-center justify-center p-8 bg-black/5 rounded-[24px] border-2 border-dashed border-black/10">
                        <Info className="w-10 h-10 mb-4 opacity-20" />
                        <p className="text-center opacity-40 font-bold text-lg">
                            Business name not found
                        </p>
                        <p className="text-center opacity-30 text-sm mt-1">
                            Try searching with a different keyword or check your documents.
                        </p>
                    </div>
                )}
            </div>

            {/* Quick Suggestions */}
            {!searchQuery && (
                <div className="mt-4 animate-in fade-in duration-500">
                    <p className="text-sm font-bold uppercase tracking-wider mb-4 px-1" style={{ color: THEME.colors.text.muted }}>
                        Recent Businesses
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {BUSINESS_NAMES.slice(0, 4).map((name) => (
                            <button
                                key={name}
                                onClick={() => onSelect(name)}
                                className="px-6 py-4 rounded-2xl border-2 font-bold transition-all text-left group flex items-center justify-between hover:border-black/20"
                                style={{
                                    backgroundColor: "white",
                                    borderColor: THEME.colors.input.border,
                                    color: "#2B365A"
                                }}
                            >
                                <span>{name}</span>
                                <Check className="w-5 h-5 opacity-0 group-hover:opacity-20 transition-opacity" />
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
