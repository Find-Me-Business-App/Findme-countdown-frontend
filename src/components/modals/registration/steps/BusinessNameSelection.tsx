"use client";

import { useState, useMemo, useEffect } from "react";
import { THEME } from "@/config/theme";
import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { motion, AnimatePresence } from "framer-motion";

interface BusinessNameSelectionProps {
    onSelect: (name: string) => void;
}

const MOCK_BUSINESSES = [
    "Casablanca Enterprise",
    "CasaDiEmO Inc.",
    "Casadipoka Ent.",
    "Casala Foods Ltd",
    "Casa Bella Designs",
    "Casa del Sol"
];

export default function BusinessNameSelection({ onSelect }: BusinessNameSelectionProps) {
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { data: businessesData } = useGetBusinesses();

    // Combine real data with mock examples for demonstration
    const allBusinesses = useMemo(() => {
        const realNames = businessesData?.data?.records?.map(b => b.businessName) || [];
        return Array.from(new Set([...MOCK_BUSINESSES, ...realNames]));
    }, [businessesData]);

    const filteredSuggestions = useMemo(() => {
        if (!name.trim()) return [];
        return allBusinesses.filter(b => 
            b.toLowerCase().includes(name.toLowerCase()) && 
            b.toLowerCase() !== name.toLowerCase()
        );
    }, [name, allBusinesses]);

    useEffect(() => {
        setIsOpen(filteredSuggestions.length > 0);
    }, [filteredSuggestions]);

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim()) {
            onSelect(name.trim());
        }
    };

    const handleSelectSuggestion = (suggestion: string) => {
        setName(suggestion);
        onSelect(suggestion);
    };

    return (
        <div className="flex flex-col w-full h-full relative overflow-visible">
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
                    Choose your business name
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business name on your registration document
                </p>
            </div>

            {/* ── Content ────────────────────────────────── */}
            <div className="flex-1 flex flex-col pt-4">
                <div className="relative w-full max-w-xl">
                    <form onSubmit={handleSubmit} className="relative z-30">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => name.length > 0 && setIsOpen(filteredSuggestions.length > 0)}
                            placeholder="Type your business name"
                            className={`w-full px-8 py-5 transition-all text-xl focus:outline-none shadow-sm ${
                                isOpen ? "rounded-t-[24px] border-x border-t" : "rounded-[24px] border"
                            }`}
                            style={{ 
                                backgroundColor: "#E0E0E0",
                                borderColor: isOpen ? "rgba(0,0,0,0.05)" : THEME.colors.input.border,
                                color: "#2B365A"
                            }}
                            autoFocus
                        />
                    </form>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 right-0 bg-white border-x border-b rounded-b-[24px] shadow-2xl z-20 overflow-hidden"
                                style={{ borderColor: "rgba(0,0,0,0.05)" }}
                            >
                                <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleSelectSuggestion(suggestion)}
                                            className="px-8 py-4 cursor-pointer hover:bg-gray-50 transition-colors first:pt-6 last:pb-6"
                                        >
                                            <span 
                                                className={`text-lg font-medium transition-colors ${
                                                    index === 0 ? "text-[#2B365A]" : "text-gray-400"
                                                }`}
                                            >
                                                {suggestion}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-auto pb-4">
                    <p 
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] opacity-40 leading-relaxed"
                        style={{ color: THEME.colors.text.primary }}
                    >
                        NOTICE: BUSINESS NAMES ARE UNIQUE AND MUST BE DEFENDED BY REGISTRATION DOCUMENTS.
                    </p>
                </div>
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
