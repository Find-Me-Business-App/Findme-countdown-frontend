"use client";

import { useState } from "react";
import { THEME } from "@/config/theme";

interface BusinessNameSelectionProps {
    onSelect: (name: string) => void;
}

export default function BusinessNameSelection({ onSelect }: BusinessNameSelectionProps) {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSelect(name.trim());
        }
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
                <form onSubmit={handleSubmit} className="relative mb-8">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your business name"
                        className="w-full px-8 py-5 rounded-[24px] border transition-all text-xl focus:outline-none focus:ring-2 focus:ring-[#2B365A]/10 focus:border-[#2B365A]/40 shadow-sm"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border,
                            color: THEME.colors.text.primary
                        }}
                        autoFocus
                    />
                    <input type="submit" className="hidden" />
                </form>

                <div className="mt-auto pb-4">
                    <p 
                        className="text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] opacity-40 leading-relaxed"
                        style={{ color: THEME.colors.text.primary }}
                    >
                        NOTICE: BUSINESS NAMES ARE UNIQUE AND MUST BE DEFENDED BY REGISTRATION DOCUMENTS.
                    </p>
                </div>
            </div>
        </div>
    );
}
