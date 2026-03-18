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
        // We could technically call onSelect(category) here if we want to proceed immediately
        // but typically categories might need a "Continue" button or similar.
        // For now, let's just close the modal as per user instructions eventually.
        onSelect(category);
    };

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto">
            <div className="mb-8">
                <div
                    className="w-24 h-[3px] mb-6 opacity-90"
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

            <div className="relative mb-8">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all text-left"
                    style={{ 
                        backgroundColor: THEME.colors.input.bg,
                        borderColor: THEME.colors.input.border,
                        color: selectedCategory ? THEME.colors.text.primary : THEME.colors.text.muted
                    }}
                >
                    <span className="text-lg">
                        {selectedCategory || "Enter your business category"}
                    </span>
                    <ChevronDown className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                    <div 
                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl border overflow-hidden z-110 shadow-2xl max-h-[300px] overflow-y-auto"
                        style={{ 
                            backgroundColor: THEME.colors.components.dropdownBg,
                            borderColor: "var(--modal-separator, rgba(0,0,0,0.1))" 
                        }}
                    >
                        {CATEGORIES.map((cat) => (
                            <div
                                key={cat}
                                onClick={() => handleSelect(cat)}
                                className="px-6 py-4 hover:bg-white/10 cursor-pointer transition-colors text-lg"
                                style={{ color: THEME.colors.text.primary }}
                            >
                                {cat}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2">
                <p 
                    className="text-sm font-medium mb-1"
                    style={{ color: THEME.colors.text.muted }}
                >
                    Example : Ride hailing
                </p>
                <div className="flex flex-col gap-1 pl-12">
                    {CATEGORIES.slice(1, 8).map((example) => (
                        <p 
                            key={example}
                            className="text-sm opacity-60"
                            style={{ color: THEME.colors.text.secondary }}
                        >
                            {example}
                        </p>
                    ))}
                </div>
            </div>


        </div>
    );
}
