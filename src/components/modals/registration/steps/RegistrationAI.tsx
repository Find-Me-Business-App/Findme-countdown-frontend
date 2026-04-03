"use client";

import { useState } from "react";
import Image from "next/image";
import { THEME } from "@/config/theme";

interface RegistrationAIProps {
    onNext?: () => void;
}

const PROMPTS = [
    {
        type: "New business",
        text: "I want to create a resturant business in oron road",
        borderColor: THEME.colors.components.prompts.blue
    },
    {
        type: "Already existing business",
        text: "I own a pharmacy in okigwe road Aba with 2 staffs",
        borderColor: THEME.colors.components.prompts.white
    },
    {
        type: "New business",
        text: "I want to create 2 multichoice shop business in oron road uyo an",
        borderColor: THEME.colors.components.prompts.purple
    }
];

export default function RegistrationAI({ onNext }: RegistrationAIProps) {
    const [promptText, setPromptText] = useState("");

    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="shrink-0 mb-4 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3px] mb-3 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Register your business
                </h2>
                <p
                    className="text-xs md:text-sm leading-relaxed max-w-xl opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Start your journey today with <span style={{ color: THEME.colors.text.accent }}>AM</span><span style={{ color: THEME.colors.text.danger }}>E</span> and register your business how you want it.
                </p>
            </div>

            {/* ── Scrollable Content ─────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-12 no-scrollbar custom-scrollbar pr-1">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h3
                            className="font-bold text-xs md:text-sm text-center"
                            style={{ color: THEME.colors.text.primary }}
                        >
                            Try these prompts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {PROMPTS.map((prompt, index) => (
                                <div
                                    key={index}
                                    onClick={() => setPromptText(prompt.text)}
                                    className="border rounded-xl p-3 transition-colors cursor-pointer group"
                                    style={{ 
                                        backgroundColor: THEME.colors.components.chipBg,
                                        borderColor: prompt.borderColor
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = THEME.colors.components.chipHover)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = THEME.colors.components.chipBg)}
                                >
                                    <span
                                        className="text-[9px] md:text-[10px] uppercase font-bold tracking-wider"
                                        style={{ color: THEME.colors.input.label }}
                                    >
                                        {prompt.type}
                                    </span>
                                    <p
                                        className="text-[10px] md:text-[11px] mt-1.5 leading-tight group-hover:text-white/80"
                                        style={{ color: THEME.colors.text.secondary }}
                                    >
                                        {prompt.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <textarea
                            value={promptText}
                            onChange={(e) => setPromptText(e.target.value)}
                            className="w-full border rounded-xl md:rounded-[24px] px-4 py-4 text-xs md:text-sm focus:outline-none transition-all resize-none min-h-[100px] md:min-h-[110px]"
                            style={{ 
                                backgroundColor: THEME.colors.input.bg,
                                borderColor: THEME.colors.input.border,
                                color: THEME.colors.input.text 
                            }}
                            placeholder="I want to create a store for my resturant business with 2 locations in Aba and Uyo with me as the owner"
                        />
                        <button 
                            onClick={() => onNext?.()}
                            className="absolute bottom-3 right-3 md:bottom-4 md:right-4 hover:scale-110 transition-transform active:scale-95"
                        >
                            <Image
                                src={THEME.assets.icons.contact.send}
                                alt="Submit prompt"
                                width={38}
                                height={28}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
            `}</style>
        </div>
    );
}
