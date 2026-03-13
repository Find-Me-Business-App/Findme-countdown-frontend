"use client";

import { useState } from "react";
import { THEME } from "@/config/theme";

interface BusinessNameSelectionProps {
    onSelect: (name: string) => void;
    onBack?: () => void;
}

export default function BusinessNameSelection({ onSelect, onBack }: BusinessNameSelectionProps) {
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            onSelect(name.trim());
        }
    };

    return (
        <div className="flex flex-col w-full max-w-2xl mx-auto h-full justify-between">
            <div className="flex flex-col w-full">
                <div className="mb-8">
                    <div
                        className="w-24 h-[3px] mb-6 opacity-90"
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

                <form onSubmit={handleSubmit} className="relative mb-8">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Type your business name"
                        className="w-full px-8 py-5 rounded-[24px] border transition-all text-xl focus:outline-none"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border,
                            color: THEME.colors.text.primary
                        }}
                        autoFocus
                    />
                    <input type="submit" className="hidden" />
                </form>
            </div>

            <div className="mt-12 md:mt-40">
                <p 
                    className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-60"
                    style={{ color: THEME.colors.text.primary }}
                >
                    NOTICE : BUSINESS NAME ARE UNIQUE AND WOULD BE DEFENDED BY REGISTRATION DOCUMET
                </p>

                {onBack && (
                    <button
                        onClick={onBack}
                        className="mt-6 text-sm font-medium hover:underline self-start"
                        style={{ color: THEME.colors.text.muted }}
                    >
                        Back
                    </button>
                )}
            </div>
        </div>
    );
}
