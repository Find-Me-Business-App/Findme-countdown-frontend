"use client";

import Image from "next/image";
import { THEME } from "@/config/theme";

interface RegistrationAIProps {
    onBack: () => void;
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

export default function RegistrationAI({ onBack, onNext }: RegistrationAIProps) {
    return (
        <div className="flex flex-col w-full">
            <div className="mb-6 md:mb-8">
                <div
                    className="w-14 h-[3px] md:w-18 mb-4 md:mb-5 opacity-90"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Register your business
                </h2>
                <p
                    className="text-sm md:text-sm leading-relaxed max-w-xl"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Start your journey today with <span style={{ color: THEME.colors.text.accent }}>AM</span><span style={{ color: THEME.colors.text.danger }}>E</span> and register your business how you want it.
                </p>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <h3
                        className="font-bold text-sm md:text-base text-center"
                        style={{ color: THEME.colors.text.primary }}
                    >
                        Try these prompts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {PROMPTS.map((prompt, index) => (
                             <div
                                key={index}
                                className="border rounded-xl p-3 md:p-4 transition-colors cursor-pointer group"
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
                                    className="text-xs md:text-[11px] mt-1.5 leading-tight group-hover:text-white/80"
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
                        className="w-full border rounded-2xl md:rounded-[24px] px-5 py-4 md:py-6 text-sm md:text-sm focus:outline-none transition-all resize-none min-h-[100px] md:min-h-[120px]"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border,
                            color: THEME.colors.input.text 
                        }}
                        placeholder="I want to create a store for my resturant business with 2 locations in Aba and Uyo with me as the owner"
                    />
                    <button className="absolute bottom-4 right-4 md:bottom-5 md:right-5 hover:scale-105 transition-transform">
                        <Image
                            src={THEME.assets.icons.contact.send}
                            alt="Submit prompt"
                            width={45}
                            height={33}
                        />
                    </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <button
                        onClick={onBack}
                        className="font-medium text-sm transition-colors"
                        style={{ color: THEME.colors.text.secondary }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = THEME.colors.text.primary)}
                        onMouseLeave={(e) => (e.currentTarget.style.color = THEME.colors.text.secondary)}
                    >
                        Back to form
                    </button>
                    <button
                        onClick={() => onNext?.()}
                        className="text-white px-8 py-3 rounded-xl font-bold text-sm tracking-wider hover:scale-[1.02] transition-all shadow-lg"
                        style={{ backgroundColor: THEME.colors.actions.secondary }}
                    >
                        Complete Registration
                    </button>
                </div>
            </div>
        </div>
    );
}

