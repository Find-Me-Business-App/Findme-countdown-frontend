"use client";

import { ArrowUpRight, ArrowRight } from "lucide-react";
import { WAITLIST_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useModalStore } from "@/store/useModalStore";
import WaitlistForm from "./WaitlistForm";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";
import { THEME } from "@/config/theme";

/**
 * WaitlistModal — join-the-waitlist flow.
 * Scroll locking is handled by ModalProvider.
 */
export default function WaitlistModal() {
    const { section, closeModal, openModal } = useModalStore();
    const config = WAITLIST_CONFIGS[section];

    if (!config) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <ModalBackdrop onClick={closeModal} type="waitlist" />

            <ModalContainer
                type="waitlist"
                className="px-6 py-10 md:p-14 relative w-[333px] h-[621px] max-h-none md:w-[777px] md:h-[444px] md:max-h-none"
                overflow="overflow-hidden"
                style={{
                    borderRadius: "40px",
                    maxWidth: "777px",
                    minHeight: "0"
                }}
            >
                {/* Decorative SVG */}
                <div className="absolute -bottom-10 -right-10 z-0 opacity-20 pointer-events-none blur-[0.5px]">
                    <Image
                        src={config.svgPath}
                        alt="Decoration"
                        width={240}
                        height={360}
                        className="object-contain w-[140px] md:w-[240px] h-auto"
                    />
                </div>

                <ModalCloseButton
                    onClick={closeModal}
                    className="opacity-60 hover:opacity-100 transition-opacity top-4 right-4 md:top-6 md:right-6"
                    style={{ color: THEME.colors.text.primary }}
                />

                <div className="relative z-10 flex flex-col items-start text-left">
                    <WaitlistHeader config={config} />

                    {config.actionLabel && (
                        <button
                            onClick={() => openModal("registration", section)}
                            className="flex items-center gap-1.5 text-[15px] font-medium hover:opacity-80 mb-4 group transition-all"
                            style={{ color: "#389FFF" }}
                        >
                            {config.actionLabel}
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    )}

                    {/* Form Area */}
                    <div className="w-full mb-2">
                        <WaitlistForm section={section} />
                    </div>

                    <div className="pt-4 pb-4 md:pt-4 md:pb-10 mt-auto w-full flex justify-center md:justify-start">
                        <button
                            onClick={() => openModal("info", section)}
                            className="flex items-center gap-2.5 text-base md:text-[15px] font-medium hover:opacity-80 group transition-all tracking-wide md:tracking-normal bg-white/5 md:bg-transparent px-6 py-2.5 md:px-0 md:py-0 rounded-full md:rounded-none"
                            style={{ color: "#389FFF" }}
                        >
                            More Information
                            <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </ModalContainer>
        </div>
    );
}

/* ─── Sub-component: Waitlist Header ──────────────────────────── */

function WaitlistHeader({ config }: { config: typeof WAITLIST_CONFIGS[keyof typeof WAITLIST_CONFIGS] }) {
    return (
        <>
            <h2
                className="text-2xl md:text-[40px] font-bold mb-3 md:mb-4 w-full pr-8 tracking-tight leading-none"
                style={{ color: THEME.colors.text.primary }}
            >
                {config.title}
            </h2>
            <p
                className="text-sm md:text-17px mb-6 md:mb-8 leading-relaxed max-w-[480px] opacity-80"
                style={{ color: THEME.colors.text.secondary }}
            >
                {config.description}
            </p>
        </>
    );
}
