"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Check, Info } from "lucide-react";
import { THEME } from "@/config/theme";
import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { motion, AnimatePresence } from "framer-motion";

interface FestivalBusinessNameSelectionProps {
    onSelect: (name: string) => void;
}

const MOCK_BUSINESSES = [
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
    const [isOpen, setIsOpen] = useState(false);
    const { data: businessesData } = useGetBusinesses();

    // Combine real data with mock examples
    const allBusinesses = useMemo(() => {
        const realNames = businessesData?.data?.records?.map(b => b.businessName) || [];
        return Array.from(new Set([...MOCK_BUSINESSES, ...realNames]));
    }, [businessesData]);

    const filteredSuggestions = useMemo(() => {
        if (!searchQuery.trim()) return [];
        return allBusinesses.filter(b => 
            b.toLowerCase().includes(searchQuery.toLowerCase()) && 
            b.toLowerCase() !== searchQuery.toLowerCase()
        );
    }, [searchQuery, allBusinesses]);

    useEffect(() => {
        setIsOpen(filteredSuggestions.length > 0);
    }, [filteredSuggestions]);

    const handleSelectSuggestion = (suggestion: string) => {
        setSearchQuery(suggestion);
        onSelect(suggestion);
    };

    return (
        <div className="flex flex-col w-full h-full relative overflow-visible">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="flex-shrink-0 mb-4 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3.5px] mb-4 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Choose your business name
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business name on your registration document
                </p>
            </div>

            {/* ── Content ─────────────────────── */}
            <div className="flex-1 overflow-visible pt-4 pb-12">
                <div className="relative w-full max-w-xl mb-8">
                    {/* Search Input Container */}
                    <div className="relative z-30">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-30">
                            <Search size={22} style={{ color: "#2B365A" }} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery.length > 0 && setIsOpen(filteredSuggestions.length > 0)}
                            placeholder="Search your business name..."
                            className={`w-full pl-16 pr-8 py-5 transition-all text-xl focus:outline-none shadow-sm ${
                                isOpen ? "rounded-t-[24px] border-x border-t" : "rounded-[24px] border"
                            }`}
                            style={{ 
                                backgroundColor: "#E0E0E0",
                                borderColor: isOpen ? "rgba(0,0,0,0.05)" : THEME.colors.input.border,
                                color: "#2B365A"
                            }}
                            autoFocus
                        />
                    </div>

                    {/* Dropdown Options */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 bg-white border-x border-b rounded-b-[24px] shadow-2xl z-20 overflow-hidden"
                                style={{ borderColor: "rgba(0,0,0,0.05)" }}
                            >
                                <div className="flex flex-col max-h-[220px] overflow-y-auto custom-scrollbar">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectSuggestion(suggestion)}
                                            className="px-8 py-4 cursor-pointer hover:bg-gray-50 transition-colors first:pt-6 last:pb-6 flex items-center justify-between group"
                                        >
                                            <span 
                                                className={`text-lg font-medium transition-colors ${
                                                    index === 0 ? "text-[#2B365A]" : "text-gray-400"
                                                }`}
                                            >
                                                {suggestion}
                                            </span>
                                            <Check className="w-5 h-5 text-gray-200 group-hover:text-blue-500 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Quick Suggestions / Recent Businesses */}
                {!searchQuery && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="animate-in fade-in duration-500"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] mb-5 px-1 opacity-40 ml-1" style={{ color: THEME.colors.text.primary }}>
                            Recent Businesses
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {MOCK_BUSINESSES.slice(0, 5).map((name) => (
                                <button
                                    key={name}
                                    onClick={() => handleSelectSuggestion(name)}
                                    className="px-6 py-3 rounded-full border border-gray-100 bg-white shadow-sm font-bold text-sm transition-all hover:scale-[1.03] hover:border-blue-100 hover:shadow-md active:scale-95"
                                    style={{ color: "#2B365A" }}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                    margin: 20px 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #9CA3AF;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #6B7280;
                }
            `}</style>
        </div>
    );
}
