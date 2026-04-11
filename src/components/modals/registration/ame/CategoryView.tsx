"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";

interface CategoryViewProps {
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    "Tech & IT", "Logistics", "Services", "Food & Beverage", "Retail", "Healthcare", "Education"
] as const;

export default function CategoryView({ onSelect }: CategoryViewProps) {
    const [inputText, setInputText] = useState("");

    const handleTextSubmit = () => {
        if (inputText.trim()) {
            onSelect(inputText.trim());
        }
    };

    return (
        <AmeStepLayout>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-2 md:px-6 w-full max-w-2xl mx-auto">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    What category does your business fall into?
                </p>

                <div className="w-full max-w-xs relative group">
                    <select
                        onChange={(e) => e.target.value && onSelect(e.target.value)}
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-5 py-3.5 text-white text-sm focus:outline-none focus:border-blue-500/30 transition-all appearance-none cursor-pointer"
                    >
                        <option value="" className="bg-neutral-900 text-white/50">Select a category...</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                        ))}
                    </select>
                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                        <span className="text-xs">▼</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full max-w-xs">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">or</span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <AmeTextarea
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={handleTextSubmit}
                    placeholder="Type a custom category..."
                />
            </div>
        </AmeStepLayout>
    );
}
