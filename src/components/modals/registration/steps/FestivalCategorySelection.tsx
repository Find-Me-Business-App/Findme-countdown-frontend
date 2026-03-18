"use client";

import { useState } from "react";
import { THEME } from "@/config/theme";

interface FestivalCategorySelectionProps {
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    "Dean",
    "Delivery service",
    "Dentist",
    "Detention Center",
    "Dermatologist"
];

export default function FestivalCategorySelection({ onSelect }: FestivalCategorySelectionProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCategories = CATEGORIES.filter(cat => 
        cat.toLowerCase().includes(searchQuery.toLowerCase())
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
                    Choose your business category
                </h2>
                <p
                    className="text-[13px] md:text-[14px] opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business category that suits your business
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
                        borderBottomLeftRadius: filteredCategories.length > 0 ? "0" : "16px",
                        borderBottomRightRadius: filteredCategories.length > 0 ? "0" : "16px",
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-5 py-3.5 bg-transparent border-none outline-none font-medium text-[15px]"
                        style={{ color: "#2B365A" }}
                        autoFocus
                    />
                </div>

                {/* Dropdown Options */}
                {filteredCategories.length > 0 && (
                    <div 
                        className="w-full overflow-y-auto max-h-[200px]"
                        style={{ 
                            backgroundColor: "#F5F5F5",
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                        }}
                    >
                        <div className="flex flex-col py-2 pr-1">
                            {filteredCategories.map((cat) => (
                                <div
                                    key={cat}
                                    onClick={() => onSelect(cat)}
                                    className="px-5 py-2.5 cursor-pointer hover:bg-black/5 transition-colors text-[13px] md:text-[14px] font-medium"
                                    style={{ color: "#2B365A" }}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}
