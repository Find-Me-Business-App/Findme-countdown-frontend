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
                        className="relative w-full max-w-[400px] md:max-w-[750px] max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible bg-[#222222] md:bg-[#333333]/90 md:backdrop-blur-3xl rounded-[40px] md:rounded-[60px] shadow-lg md:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col md:flex-row p-6 md:p-0"
                        style={{ willChange: "transform, opacity" }}
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
