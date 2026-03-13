"use client";

import { AnimatePresence } from "framer-motion";
import { INFO_CONFIGS } from "@/config/modal-configs";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import InfoContent from "./InfoContent";
import ModalBackdrop from "../shared/ModalBackdrop";
import ModalContainer from "../shared/ModalContainer";
import ModalCloseButton from "../shared/ModalCloseButton";

export default function InfoModal() {
    const { isOpen, type, section, closeModal } = useModalStore();
    const isModalVisible = isOpen && type === "info";
    const config = INFO_CONFIGS[section];

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
                    <ModalBackdrop onClick={closeModal} type="info" />

                    <ModalContainer 
                        type="info"
                        className="flex flex-col md:flex-row overflow-hidden scrollbar-hide"
                        style={{
                            msOverflowStyle: 'none',  /* IE and Edge */
                            scrollbarWidth: 'none',   /* Firefox */
                        }}
                    >
                        <ModalCloseButton onClick={closeModal} />
                        <InfoContent config={config} />
                    </ModalContainer>
                </div>
            )}
        </AnimatePresence>
    );
}