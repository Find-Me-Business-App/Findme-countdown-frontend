"use client";

import { AnimatePresence } from "framer-motion";
import { MODAL_CONFIGS } from "@/config/modal-configs";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import ContactForm from "./ContactForm";
import ModalBackdrop from "../shared/ModalBackdrop";
import ModalContainer from "../shared/ModalContainer";
import ModalCloseButton from "../shared/ModalCloseButton";
import { THEME } from "@/config/theme";

export default function ContactModal() {
    const { isOpen, type, section, closeModal } = useModalStore();
    const isModalVisible = isOpen && type === "contact";
    const config = MODAL_CONFIGS[section];

    useEffect(() => {
        if (isModalVisible) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalVisible]);

    if (!config) return null;

    return (
        <AnimatePresence>
            {isModalVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <ModalBackdrop onClick={closeModal} />

                    <ModalContainer 
                        type="registration" // Use registration type for similar rounding/shadow
                        className="bg-[#4b4b4b] p-4 md:p-6" // Override with contact bg
                        maxWidth="max-w-[420px] md:max-w-[900px]"
                    >
                        <ModalCloseButton 
                            onClick={closeModal} 
                            className="hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 hover:border-white/40 backdrop-blur-sm top-4 right-4 md:top-5 md:right-5"
                        />

                        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
                            {/* Connect Section / Card */}
                            <div className={`w-full md:w-[310px] flex-shrink-0 p-6 md:p-9 bg-gradient-to-tr ${config.gradientClass} rounded-[35px] md:rounded-[50px] relative overflow-hidden shadow-2xl flex flex-col`}>
                                {/* Inner Glow for Card depth */}
                                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                                <div className="relative z-10 flex flex-col">
                                    <h2 
                                        className="text-xl md:text-2xl font-bold mb-1 md:mb-2"
                                        style={{ color: THEME.colors.text.primary }}
                                    >
                                        {config.title}
                                    </h2>
                                    <p 
                                        className="text-xs md:text-sm mb-6 md:mb-10 leading-relaxed max-w-[240px]"
                                        style={{ color: THEME.colors.text.secondary }}
                                    >
                                        {config.description}
                                    </p>

                                    <div className="space-y-5 md:space-y-7">
                                        {/* Call */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span 
                                                    className="font-bold text-base md:text-lg"
                                                    style={{ color: THEME.colors.text.primary }}
                                                >
                                                    Call
                                                </span>
                                                <p 
                                                    className="text-[10px] md:text-[13px] leading-tight"
                                                    style={{ color: THEME.colors.text.muted }}
                                                >
                                                    Click on the call icon or copy
                                                </p>
                                                <a 
                                                    href={`tel:${config.callNumber}`} 
                                                    className="text-xs md:text-sm font-medium hover:underline transition-colors"
                                                    style={{ color: THEME.colors.text.accent }}
                                                >
                                                    {config.callNumber}
                                                </a>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <img src={THEME.assets.icons.contact.phone} alt="Phone" className="w-5 h-5 md:w-6 md:h-6" />
                                            </div>
                                        </div>

                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between group/wa"
                                        >
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span 
                                                    className="font-bold text-base md:text-lg transition-colors group-hover:text-green-400"
                                                    style={{ color: THEME.colors.text.primary }}
                                                >
                                                    WhatsApp
                                                </span>
                                                <p 
                                                    className="text-[10px] md:text-[13px] leading-tight max-w-[180px]"
                                                    style={{ color: THEME.colors.text.muted }}
                                                >
                                                    Clicking on the WhatsApp icon leads you to chat.
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="group-hover/wa:scale-110 transition-transform flex items-center justify-center">
                                                    <img src={THEME.assets.icons.contact.whatsapp} alt="WhatsApp" className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>
                                            </div>
                                        </a>

                                        {/* Mail */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span 
                                                    className="font-bold text-base md:text-lg"
                                                    style={{ color: THEME.colors.text.primary }}
                                                >
                                                    Mail
                                                </span>
                                                <p 
                                                    className="text-[10px] md:text-[13px] leading-tight"
                                                    style={{ color: THEME.colors.text.muted }}
                                                >
                                                    Reach us through mail
                                                </p>
                                                <a 
                                                    href={`mailto:${config.email}`} 
                                                    className="text-xs md:text-sm font-medium hover:underline break-all transition-colors"
                                                    style={{ color: THEME.colors.text.accent }}
                                                >
                                                    {config.email}
                                                </a>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center">
                                                    <img src={THEME.assets.icons.contact.gmail} alt="Mail" className="w-5 h-5 md:w-6 md:h-6" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Area extracted to ContactForm */}
                            <ContactForm section={section} />
                        </div>
                    </ModalContainer>
                </div>
            )}
        </AnimatePresence>
    );
}

