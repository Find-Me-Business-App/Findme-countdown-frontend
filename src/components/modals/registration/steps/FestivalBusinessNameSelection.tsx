"use client";

import { useState } from "react";
import { THEME } from "@/config/theme";

interface FestivalBusinessNameSelectionProps {
    onSelect: (name: string) => void;
    onBack?: () => void;
}

const BUSINESS_NAMES = [
    "Casablanca Enterprise",
    "CasaDiEmO Inc.",
    "Casadipoka Ent.",
    "Casala Foods Ltd",
    "Casa Bella Solutions"
];

export default function FestivalBusinessNameSelection({ onSelect, onBack }: FestivalBusinessNameSelectionProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNames = BUSINESS_NAMES.filter(name => 
        name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col w-full max-w-sm md:max-w-md mx-auto relative px-2 py-4">
            {/* Header Section */}
            <div className="mb-6">
                <div
                    className="w-16 h-[3px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-[20px] md:text-[22px] font-bold mb-2 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Choose your business name
                </h2>
                <p
                    className="text-[13px] md:text-[14px] opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business name on your registration document
                </p>
            </div>

            {/* Search and Dropdown Section */}
            <div className="relative mb-4 mt-2">
                {/* Search Input Container */}
                <div 
                    className="w-full relative z-10"
                    style={{ 
                        backgroundColor: "#D9D9D9", 
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        borderBottomLeftRadius: filteredNames.length > 0 ? "0" : "16px",
                        borderBottomRightRadius: filteredNames.length > 0 ? "0" : "16px",
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-5 py-3.5 bg-transparent border-none outline-none font-medium text-[15px] placeholder-[#2B365A]/50"
                        style={{ color: "#2B365A" }}
                        placeholder="Search your business name"
                        autoFocus
                    />
                </div>

                {/* Dropdown Options */}
                {filteredNames.length > 0 && (
                    <div 
                        className="w-full overflow-y-auto max-h-[200px]"
                        style={{ 
                            backgroundColor: "#F5F5F5",
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                        }}
                    >
                        <div className="flex flex-col py-2 pr-1">
                            {filteredNames.map((name) => (
                                <div
                                    key={name}
                                    onClick={() => onSelect(name)}
                                    className="px-5 py-3 cursor-pointer hover:bg-black/5 transition-colors text-[13px] md:text-[14px] font-medium"
                                    style={{ color: "#2B365A" }}
                                >
                                    {name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-4 right-2 text-sm font-medium hover:underline opacity-40"
                    style={{ color: THEME.colors.text.muted }}
                >
                    Back
                </button>
            )}
        </div>
    );
}
