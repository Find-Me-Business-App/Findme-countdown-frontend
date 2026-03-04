"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { INFO_CONFIGS } from "@/config/modal-configs";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import InfoContent from "./InfoContent";

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
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/70 md:bg-black/40 md:backdrop-blur-xl"
                    />

                    {/* Modal Content Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="relative w-full max-w-[420px] md:max-w-[900px] h-auto max-h-[90vh] md:max-h-none bg-[#111111] md:bg-[#1a1a1a]/95 md:backdrop-blur-3xl rounded-[40px] md:rounded-[55px] shadow-2xl border border-white/5 flex flex-col md:flex-row overflow-hidden scrollbar-hide"
                        style={{
                            willChange: "transform, opacity",
                            msOverflowStyle: 'none',  /* IE and Edge */
                            scrollbarWidth: 'none',   /* Firefox */
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-30 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        <InfoContent config={config} />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}