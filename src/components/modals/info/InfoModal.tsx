"use client";

import { INFO_CONFIGS } from "@/config/modal-configs";
import { useModalStore } from "@/store/useModalStore";
import InfoContent from "./InfoContent";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";

/**
 * InfoModal — displays more information about a section.
 * Scroll locking is handled by ModalProvider.
 */
export default function InfoModal() {
    const { section, closeModal } = useModalStore();
    const config = INFO_CONFIGS[section];

    if (!config) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <ModalBackdrop onClick={closeModal} type="info" />

            <ModalContainer 
                type="info"
                className="flex flex-col md:flex-row overflow-hidden scrollbar-hide"
                style={{
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                <ModalCloseButton onClick={closeModal} />
                <InfoContent config={config} />
            </ModalContainer>
        </div>
    );
}
