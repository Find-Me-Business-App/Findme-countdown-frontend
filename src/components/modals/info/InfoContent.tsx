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
        description: string | string[];
        subDescription: string;
        titleColor?: string;
    };
    section: SectionType;
}

/**
 * InfoContent — Redesigned to match the desktop mockup exactly.
 */
export default function InfoContent({ config, section }: InfoContentProps) {
    return (
        <div className="relative flex flex-col md:flex-row w-full h-full min-h-0 overflow-hidden">

            {/* 1. Mobile Integrated Header (Illustration + Fixed Label) */}
            <div className="relative w-full md:hidden flex-shrink-0 flex flex-col items-center pt-4 overflow-visible">
                {/* 1a. The Image Area */}
                <div className="relative w-full h-[22vh] min-h-[140px] flex items-end justify-center px-6 overflow-visible">
                    {/* The Header Accent Line that the image "comes out of" */}
                    <motion.div 
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className={`absolute bottom-0 w-[60%] h-1.5 ${config.accentColor.includes('bg-') ? config.accentColor : 'bg-[#1e3a8a]'} rounded-full shadow-lg z-10 shadow-indigo-500/10`}
                    />
                    
                    {/* The Illustration emerging from the line */}
                    <motion.div
                        initial={{ y: 20, opacity: 0, scale: 0.9 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                        className="relative w-full h-[120%] -mb-1"
                    >
                        <Image
                            src={config.imagePath}
                            alt="Illustration"
                            fill
                            className="object-contain object-bottom select-none"
                            priority
                        />
                    </motion.div>
                </div>

                {/* 1b. The "More Information" Text (Fixed below the line) */}
                <div className="py-4">
                    <span className="text-white font-bold text-base tracking-wide opacity-90 transition-opacity">
                        More Information
                    </span>
                </div>
            </div>

            {/* 1. Content Wrapper (Flex-Row on Desktop) */}
            <div className="relative z-10 flex flex-1 flex-col md:flex-row w-full min-h-0 overflow-hidden">
                {/* Text Area (Left) */}
                <div className="flex flex-col w-full md:w-[60%] min-h-0 pt-2 md:pt-14 pb-8 md:pb-14 pl-6 pr-6 md:pl-16 md:pr-4 self-stretch">
                    {/* Fixed Modal Label (Desktop only) */}
                    <div className="flex-shrink-0 mb-2 hidden md:block">
                        <InfoHeader accentColor={config.accentColor} />
                    </div>

                    {/* Scrollable Body (Refined for airy mockup look) */}
                    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide pt-1 pb-14 info-scroll-mask">

                        {/* Scrolling Title (Always scrolls with body) */}
                        <div className="mb-6 flex flex-col items-center md:items-start">
                            <h2
                                className="font-extrabold tracking-[0.03em] leading-[39px] text-[#2B365A] text-center md:text-left mx-auto md:mx-0"
                                style={{
                                    fontSize: '24px',
                                    width: '251px',
                                    height: '39px',
                                }}
                            >
                                {config.title}
                            </h2>
                        </div>
                        
                        <InfoBody description={config.description} />
                        <InfoFooter subDescription={config.subDescription} section={section} />
                        <div className="h-12 flex-shrink-0" /> {/* Bottom spacing */}
                    </div>
                </div>

                {/* Desktop Image Area (Right - True Flex-Column to prevent overlap) */}
                <div className="hidden md:flex md:w-[40%] h-full relative pointer-events-none items-end justify-end">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative w-[75%] h-[85%] -mb-[8%] -mr-[2%]" /* Significantly smaller as requested */
                    >
                        <Image
                            src={config.imagePath}
                            alt="Illustration"
                            fill
                            className="object-contain object-right-bottom select-none"
                            priority
                        />
                    </motion.div>
                </div>
            </div>

            {/* Custom Fade Mask (Only at the bottom now) */}
            <style jsx>{`
                .info-scroll-mask {
                    -webkit-mask-image: linear-gradient(
                        to bottom,
                        black 0%,
                        black calc(100% - 80px),
                        transparent 100%
                    );
                    mask-image: linear-gradient(
                        to bottom,
                        black 0%,
                        black calc(100% - 80px),
                        transparent 100%
                    );
                }
            `}</style>
        </div>
    );
}

/* ─── Sub-components ────────────────────────────────────────────── */

function InfoHeader({ accentColor }: { accentColor: string }) {
    // Determine header bar color from accent or fallback
    const barColor = accentColor.includes('bg-') ? accentColor : 'bg-[#1e3a8a]';

    return (
        <div className="mb-4 flex flex-col items-center md:items-start text-center md:text-left group">
            {/* The primary indigo/blue accent bar on TOP */}
            <div className={`w-32 md:w-44 h-1.5 ${barColor} mb-4 rounded-full shadow-lg shadow-indigo-500/10`} />
            <span className="text-white font-bold text-base md:text-xl tracking-wide opacity-90 transition-opacity group-hover:opacity-100">
                More Information
            </span>
        </div>
    );
}

function InfoBody({ description }: { description: string | string[] }) {
    const paragraphs = Array.isArray(description) ? description : [description];

    return (
        <div className="flex flex-col gap-6 md:gap-8 mb-10 w-full text-center md:text-left pr-4">
            {paragraphs.map((p, i) => (
                <p
                    key={i}
                    className="text-white/70 text-sm md:text-lg leading-[1.6] font-medium"
                >
                    {p}
                </p>
            ))}
        </div>
    );
}

function InfoFooter({ subDescription, section }: { subDescription: string, section: SectionType }) {
    const { openModal } = useModalStore();

    const getCTAConfig = () => {
        if (section === "business") return { label: "Register your business", action: () => openModal("registration", "business") };
        if (section === "festival") return { label: "Participate Festival", action: () => openModal("registration", "festival") };
        return null;
    };

    const cta = getCTAConfig();

    return (
        <div className="flex flex-col items-center md:items-start mt-8 w-full pr-4">
            {cta && (
                <div className="group mb-12 flex flex-col items-center md:items-start cursor-pointer">
                    <button
                        onClick={cta.action}
                        className="flex items-center gap-3 mb-3 hover:opacity-80 transition-all active:scale-95"
                    >
                        <span className="text-[#1e3a8a] text-[13px] md:text-base font-bold tracking-tight">
                            {cta.label}
                        </span>
                        <span className="text-[#1e3a8a] text-lg md:text-xl group-hover:translate-x-1 transition-all">→</span>
                    </button>
                    {/* Horizontal Divider Line matching mockup */}
                    <div className="w-32 md:w-48 h-[2px] bg-[#1e3a8a] rounded-full origin-left opacity-60" />
                </div>
            )}

            {!cta && <div className="w-full h-[2px] bg-white/10 mb-8 max-w-xs" />}

            <p className="text-white/40 text-[11px] md:text-sm leading-relaxed max-w-md font-medium text-center md:text-left">
                {subDescription}
            </p>
        </div>
    );
}
