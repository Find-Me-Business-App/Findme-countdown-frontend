"use client";

import { MODAL_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useModalStore } from "@/store/useModalStore";
import ContactForm from "./ContactForm";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";
import { THEME } from "@/config/theme";

/**
 * ContactModal — renders the contact info card + message form.
 * Scroll locking is handled by ModalProvider.
 */
export default function ContactModal() {
    const { section, closeModal } = useModalStore();
    const config = MODAL_CONFIGS[section];

    if (!config) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <ModalBackdrop onClick={closeModal} />

            <ModalContainer 
                type="registration"
                className="p-4 md:p-6"
                maxWidth="max-w-[420px] md:max-w-[900px]"
            >
                <ModalCloseButton 
                    onClick={closeModal} 
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 hover:border-white/40 backdrop-blur-sm top-4 right-4 md:top-5 md:right-5 z-50"
                />

                <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
                    {/* Connect Card */}
                    <ContactInfoCard config={config} />

                    {/* Form Area */}
                    <ContactForm section={section} />
                </div>
            </ModalContainer>
        </div>
    );
}

/* ─── Sub-component: Contact Info Card ──────────────────────────── */

interface ContactInfoCardProps {
    config: typeof MODAL_CONFIGS[keyof typeof MODAL_CONFIGS];
}

function ContactInfoCard({ config }: ContactInfoCardProps) {
    return (
        <div className={`w-full md:w-[310px] flex-shrink-0 p-6 md:p-9 bg-gradient-to-tr ${config.gradientClass} rounded-[35px] md:rounded-[50px] relative overflow-hidden shadow-2xl flex flex-col`}>
            {/* Inner Glow */}
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
                    <ContactRow
                        label="Call"
                        sublabel="Click on the call icon or copy"
                        linkHref={`tel:${config.callNumber}`}
                        linkText={config.callNumber}
                        iconSrc={THEME.assets.icons.contact.phone}
                        iconAlt="Phone"
                    />

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
                                <Image 
                                    src={THEME.assets.icons.contact.whatsapp} 
                                    alt="WhatsApp" 
                                    width={24} 
                                    height={24} 
                                    className="w-5 h-5 md:w-6 md:h-6" 
                                />
                            </div>
                        </div>
                    </a>

                    {/* Mail */}
                    <ContactRow
                        label="Mail"
                        sublabel="Reach us through mail"
                        linkHref={`mailto:${config.email}`}
                        linkText={config.email}
                        iconSrc={THEME.assets.icons.contact.gmail}
                        iconAlt="Mail"
                        linkClassName="break-all"
                    />
                </div>
            </div>
        </div>
    );
}

/* ─── Sub-component: Contact Row ────────────────────────────────── */

interface ContactRowProps {
    label: string;
    sublabel: string;
    linkHref: string;
    linkText: string;
    iconSrc: string;
    iconAlt: string;
    linkClassName?: string;
}

function ContactRow({ label, sublabel, linkHref, linkText, iconSrc, iconAlt, linkClassName = "" }: ContactRowProps) {
    return (
        <div className="flex items-center justify-between group">
            <div className="flex flex-col gap-0.5 md:gap-1">
                <span 
                    className="font-bold text-base md:text-lg"
                    style={{ color: THEME.colors.text.primary }}
                >
                    {label}
                </span>
                <p 
                    className="text-[10px] md:text-[13px] leading-tight"
                    style={{ color: THEME.colors.text.muted }}
                >
                    {sublabel}
                </p>
                <a 
                    href={linkHref} 
                    className={`text-xs md:text-sm font-medium hover:underline transition-colors ${linkClassName}`}
                    style={{ color: THEME.colors.text.accent }}
                >
                    {linkText}
                </a>
            </div>
            <div className="flex-shrink-0">
                <Image src={iconSrc} alt={iconAlt} width={24} height={24} className="w-5 h-5 md:w-6 md:h-6" />
            </div>
        </div>
    );
}
