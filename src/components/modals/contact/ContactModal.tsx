"use client";

import { MODAL_CONFIGS } from "@/config/modal-configs";
import { useModalStore } from "@/store/useModalStore";
import ContactForm from "./ContactForm";
import ContactInfoCard from "./ContactInfoCard";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";

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
                className="p-4 md:p-5 w-full md:w-[777px] min-h-[400px] md:h-[444px] md:min-h-[444px] flex flex-col justify-center"
                maxWidth="max-w-[420px] md:max-w-[777px]"
            >
                <ModalCloseButton 
                    onClick={closeModal} 
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 hover:border-white/40 backdrop-blur-sm top-4 right-4 md:top-5 md:right-5 z-50"
                />

                <div className="flex flex-col md:flex-row w-full h-auto md:h-[calc(100%-24px)] gap-6 md:gap-6 items-center justify-between overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] md:overflow-visible pb-4 md:pb-0">
                    {/* Connect Card */}
                    <ContactInfoCard config={config} section={section} />

                    {/* Form Area */}
                    <ContactForm section={section} />
                </div>
            </ModalContainer>
        </div>
    );
}
