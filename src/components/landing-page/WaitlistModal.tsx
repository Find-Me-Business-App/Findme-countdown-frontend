"use client";

import { AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { WAITLIST_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import WaitlistForm from "./WaitlistForm";
import ModalBackdrop from "../shared/ModalBackdrop";
import ModalContainer from "../shared/ModalContainer";
import ModalCloseButton from "../shared/ModalCloseButton";
import { THEME } from "@/config/theme";

export default function WaitlistModal() {
    const { isOpen, type, section, closeModal, openModal } = useModalStore();
    const isModalVisible = isOpen && type === "waitlist";
    const config = WAITLIST_CONFIGS[section];

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
                    <ModalBackdrop onClick={closeModal} type="waitlist" />

                    <ModalContainer
                        type="waitlist"
                        className="p-10 md:p-14 overflow-hidden md:overflow-hidden relative"
                        style={{
                            backgroundColor: "#4F4F4F",
                            border: "1.5px solid rgba(255, 255, 255, 0.4)",
                            borderRadius: "40px",
                            maxWidth: "760px",
                            width: "100%",
                            maxHeight: "90vh"
                        }}
                    >
                        {/* Dynamic Decorative SVG */}
                        <div className="absolute -bottom-5 -right-6 z-0 opacity-20 pointer-events-none blur-[0.5px]">
                            <Image
                                src={config.svgPath}
                                alt="Decoration"
                                width={180}
                                height={280}
                                className="object-contain w-[140px] md:w-[180px] h-auto"
                            />
                        </div>

                        <ModalCloseButton onClick={closeModal} className="text-white opacity-60 hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-start text-left">
                            <h2
                                className="text-3xl md:text-[40px] font-bold mb-4 w-full pr-8 tracking-tight leading-none"
                                style={{ color: "#FFFFFF" }}
                            >
                                {config.title}
                            </h2>

                            <p
                                className="text-[15px] md:text-17px mb-8 leading-relaxed max-w-[480px] opacity-80"
                                style={{ color: "#FFFFFF" }}
                            >
                                {config.description}
                            </p>

                            {config.actionLabel && (
                                <button
                                    onClick={() => openModal("registration", section)}
                                    className="flex items-center gap-1.5 text-[15px] font-medium hover:opacity-80 mb-10 group transition-all"
                                    style={{ color: "#389FFF" }}
                                >
                                    {config.actionLabel}
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </button>
                            )}

                            {/* Form Area */}
                            <div className="w-full mb-10">
                                <WaitlistForm section={section} />
                            </div>

                            <button
                                onClick={() => openModal("info", section)}
                                className="flex items-center gap-1.5 text-[15px] font-medium hover:opacity-80 group transition-all"
                                style={{ color: "#389FFF" }}
                            >
                                More Information
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </div>
                    </ModalContainer>
                </div>
            )}
        </AnimatePresence>
    );
}
