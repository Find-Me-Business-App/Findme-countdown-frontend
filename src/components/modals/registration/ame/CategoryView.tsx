"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";

interface CategoryViewProps {
    onSelect: (category: string) => void;
}

const CATEGORIES = [
    "Tech & IT", "Logistics", "Services", "Food & Beverage", "Retail", "Healthcare", "Education"
];

export default function CategoryView({ onSelect }: CategoryViewProps) {
    const [selected, setSelected] = useState("");
    const [custom, setCustom] = useState("");
    const [inputText, setInputText] = useState("");

    const handleConfirm = () => {
        const value = custom || selected || inputText;
        if (value) onSelect(value);
    };

    return (
        <AmeStepLayout>
            {/* Center: AI Message & Controls */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 max-w-2xl w-full">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium mb-2">
                    What category does your business fall under?
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <select
                        value={selected}
                        onChange={(e) => { setSelected(e.target.value); setCustom(""); }}
                        className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/30 transition-all appearance-none cursor-pointer text-sm"
                    >
                        <option value="" className="bg-neutral-900 text-white/50">Select a category...</option>
                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat} className="bg-neutral-900 text-white">{cat}</option>
                        ))}
                    </select>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-white/10" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">or</span>
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <input
                        type="text"
                        value={custom}
                        onChange={(e) => { setCustom(e.target.value); setSelected(""); }}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-3 text-white text-sm focus:outline-none focus:border-blue-500/30 transition-all shadow-inner"
                        placeholder="Type a custom category..."
                    />
                </div>
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={handleConfirm}
                placeholder="Type here..."
                disabled={!(selected || custom || inputText)}
            />
        </AmeStepLayout>
    );
}
