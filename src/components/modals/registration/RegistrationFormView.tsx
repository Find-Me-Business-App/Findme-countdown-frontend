"use client";

import { useRef } from "react";
import Image from "next/image";
import RegistrationForm, { RegistrationFormHandle } from "./steps/RegistrationForm";
import { SectionType, RegistrationSectionConfig } from "@/config/modal-configs";
import { THEME } from "@/config/theme";

interface RegistrationFormViewProps {
    config: RegistrationSectionConfig;
    section: SectionType;
    onNext?: (data: { name?: string; email?: string; role?: string; userId?: string }) => void;
    onAMEClick?: () => void;
}

/**
 * RegistrationFormView — the initial two-column layout with form + icon.
 * Clicking the AME icon now triggers form submission (user creation) first,
 * then proceeds via onNext — ensuring userId is always captured.
 */
export default function RegistrationFormView({ config, section, onNext }: RegistrationFormViewProps) {
    const formRef = useRef<RegistrationFormHandle>(null);

    const handleAMEClick = () => {
        if (section === "business" && onNext) {
            onNext({});
        }
    };

    return (
        <>
            {/* Left Side: Header & Form */}
            <div className="w-full md:w-[65%] flex flex-col relative pr-0 md:pr-4">
                {(section === "business" || section === "festival") && (
                    <div 
                        className="absolute right-[-16px] md:right-[-24px] top-4 bottom-4 w-px hidden md:block" 
                        style={{ backgroundColor: THEME.colors.components.separator.desktop }}
                    />
                )}
                <div className="mb-3 md:mb-6">
                    <div
                        className="w-14 h-[3px] md:w-18 mb-3 md:mb-5 opacity-90"
                        style={{ backgroundColor: THEME.colors.text.primary }}
                    />
                    <h2
                        className="text-2xl md:text-3xl font-bold mb-1.5 md:mb-3 tracking-tight"
                        style={{ color: THEME.colors.text.primary }}
                    >
                        {config.title}
                    </h2>
                    <p
                        className="text-sm md:text-[15px] leading-relaxed max-w-md opacity-80"
                        style={{ color: THEME.colors.text.secondary }}
                    >
                        {config.description}
                    </p>
                </div>

                <RegistrationForm ref={formRef} section={section} onNext={onNext} />
            </div>

            {/* Right Side: Icon Section */}
            <RegistrationIconBanner section={section} onAMEClick={handleAMEClick} />
        </>
    );
}

/* ─── Sub-component: Icon Banner ─────────────────────────────── */

function RegistrationIconBanner({ section, onAMEClick }: { section: SectionType; onAMEClick?: () => void }) {
    return (
        <div 
            className={`md:w-[35%] flex flex-col items-center justify-center pt-2 md:pt-0 ${section === "business" ? "cursor-pointer" : ""}`}
            onClick={() => section === "business" && onAMEClick?.()}
        >
            <div className={`flex flex-col items-center gap-6 group ${section === "business" ? "hover:scale-105 transition-transform duration-300" : ""}`}>
                <div 
                    className="w-24 h-24 md:w-40 md:h-40 flex items-center justify-center transition-all duration-500 group-hover:scale-105 p-4 md:p-6"
                >
                    <Image
                        src={section === "festival" ? THEME.assets.icons.auth.festival : section === "business" ? THEME.assets.icons.auth.ai : THEME.assets.icons.auth.register}
                        alt="Registration Icon"
                        width={section === "business" ? 100 : 160}
                        height={section === "business" ? 100 : 160}
                        className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
                    />
                </div>
                {section === "business" && (
                    <h3
                        className="text-base md:text-lg font-medium tracking-wide"
                        style={{ color: THEME.colors.text.primary }}
                    >
                        Sign up using <span style={{ color: THEME.colors.text.accent }}>AM</span><span style={{ color: THEME.colors.text.danger }}>E</span>
                    </h3>
                )}
            </div>
        </div>
    );
}
