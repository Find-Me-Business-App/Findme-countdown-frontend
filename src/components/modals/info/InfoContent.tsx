"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import { SectionType } from "@/config/modal-configs";

interface InfoContentProps {
    config: {
        imagePath: string;
        accentColor: string;
        title: string;
        description: string;
        subDescription: string;
        titleColor?: string;
    };
    section: SectionType;
}

export default function InfoContent({ config, section }: InfoContentProps) {
    return (
        <>
            {/* Mobile Image (Top) */}
            <div className="relative w-full h-[450px] md:hidden pointer-events-none mb-4 whitespace-normal transition-all duration-300 transform-gpu">
                <Image
                    src={config.imagePath}
                    alt="Illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Desktop Image (Right) */}
            <div className="absolute right-0 bottom-4 z-0 pointer-events-none hidden md:block">
                <Image
                    src={config.imagePath}
                    alt="Illustration"
                    width={240}
                    height={240}
                    className="object-contain"
                    priority
                />
            </div>

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:pt-14 md:pb-14 md:pl-14 w-full md:w-[65%] whitespace-normal h-fit max-h-[80vh] md:max-h-[85vh] overflow-hidden">
                {/* Header (Fixed/Sticky) */}
                <div className="px-8 md:px-0 w-full mb-2">
                    <InfoHeader accentColor={config.accentColor} />
                    <h2 className={`text-xl md:text-3xl font-bold mb-4 ${config.titleColor || 'text-white'}`}>
                        {config.title}
                    </h2>
                </div>

                {/* Scrollable Body */}
                <div className="flex-1 overflow-y-auto scrollbar-hide w-full px-8 md:px-0 md:pr-14 pb-14">
                    {/* Main Description */}
                    <InfoBody description={config.description} />

                    {/* Sub Content */}
                    <InfoFooter subDescription={config.subDescription} section={section} />
                </div>
            </div>
        </>
    );
}

/* ─── Sub-components ────────────────────────────────────────────── */

function InfoHeader({ accentColor }: { accentColor: string }) {
    return (
        <div className="mb-6 md:mb-8 flex flex-col items-center md:items-start">
            <div className={`hidden md:block w-32 h-1 ${accentColor} mb-3`} />
            <div className={`md:hidden w-16 h-1 mb-4 rounded-full ${accentColor || 'bg-white'}`} />
            <span className="text-white/40 text-sm md:text-xl font-medium uppercase tracking-widest md:normal-case md:tracking-normal">More Information</span>
        </div>
    );
}

function InfoBody({ description }: { description: string }) {
    return (
        <div className="mb-8 md:mb-10 flex flex-col items-center md:items-start">
            <p className="text-white/70 text-sm md:text-base leading-relaxed px-2 md:px-0">
                {description}
            </p>
        </div>
    );
}

function InfoFooter({ subDescription, section }: { subDescription: string, section: SectionType }) {
    const { openModal } = useModalStore();

    const getCTAConfig = () => {
        if (section === "business") {
            return {
                label: "Register your business",
                action: () => openModal("registration", "business"),
                lineColor: "bg-[#1e3a8a]"
            };
        }
        if (section === "festival") {
            return {
                label: "Participate",
                action: () => openModal("registration", "festival"),
                lineColor: "bg-[#1e3a8a]"
            };
        }
        return null;
    };

    const cta = getCTAConfig();

    return (
        <div className="mt-4 md:mt-auto flex flex-col items-center md:items-start">
            {cta && (
                <div className="mb-8 group">
                    <button
                        onClick={cta.action}
                        className="flex flex-col items-center md:items-start hover:opacity-80 transition-opacity"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[#3b82f6] text-base md:text-lg font-bold">
                                {cta.label}
                            </span>
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="text-white text-xl"
                            >
                                →
                            </motion.span>
                        </div>
                        <div className={`w-full h-[2px] ${cta.lineColor}`} />
                    </button>
                </div>
            )}
            {!cta && (
                <div className="w-3/4 md:w-48 h-px bg-white/20 mb-6" />
            )}
            <p className="text-white/40 text-xs md:text-sm leading-relaxed px-4 md:px-0">
                {subDescription}
            </p>
        </div>
    );
}
