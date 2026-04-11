"use client";

import { THEME } from "@/config/theme";
import "../ame/shared/ame-globals.css";

interface PromptsViewProps {
    onSelect: (prompt: string) => void;
    onNext: () => void;
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

export default function PromptsView({ onSelect, onNext }: PromptsViewProps) {
    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* Header */}
            <div className="shrink-0 mb-3 pt-0 w-full text-left">
                <div
                    className="w-10 md:w-14 h-[2px] mb-1.5 md:mb-2 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2 className="text-sm md:text-xl font-bold mb-0 tracking-tight text-white leading-tight">
                    Register your business
                </h2>
                <p className="text-[9px] md:text-xs leading-snug max-w-xl opacity-70 text-white/70 mt-0.5">
                    Start your journey today with <span style={{ color: THEME.colors.text.accent }}>AM</span><span style={{ color: THEME.colors.text.danger }}>E</span> and register your business how you want it.
                </p>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto pb-4 ame-no-scrollbar pr-1">
                <div className="flex flex-col gap-4 md:gap-6 items-center">
                    <div className="flex flex-col gap-2 md:gap-3 w-full">
                        <h3
                            className="font-bold text-[10px] md:text-sm text-center mb-1 md:mb-2 uppercase tracking-widest opacity-40"
                            style={{ color: THEME.colors.text.primary }}
                        >
                            Try these prompts
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-2 md:px-0">
                            {PROMPTS.map((prompt, index) => (
                                <div
                                    key={index}
                                    onClick={() => onSelect(prompt.text)}
                                    className="border rounded-xl p-2.5 md:p-3 transition-all cursor-pointer group hover:bg-white/5 active:scale-95"
                                    style={{
                                        backgroundColor: THEME.colors.components.chipBg,
                                        borderColor: prompt.borderColor
                                    }}
                                >
                                    <span
                                        className="text-[8px] md:text-[10px] uppercase font-bold tracking-wider"
                                        style={{ color: THEME.colors.input.label }}
                                    >
                                        {prompt.type}
                                    </span>
                                    <p
                                        className="text-[9px] md:text-[11px] mt-1 md:mt-1.5 leading-snug group-hover:text-white/80"
                                        style={{ color: THEME.colors.text.secondary }}
                                    >
                                        {prompt.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        className="mt-2 md:mt-4 px-8 py-2 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            backgroundColor: THEME.colors.actions.primary,
                            color: THEME.colors.text.primary
                        }}
                    >
                        Skip to AME
                    </button>
                </div>
            </div>
        </div>
    );
}
