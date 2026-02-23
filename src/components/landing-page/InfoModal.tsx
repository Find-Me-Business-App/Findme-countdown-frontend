"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionType, INFO_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect } from "react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    section: SectionType;
}

export default function InfoModal({ isOpen, onClose, section }: InfoModalProps) {
    const config = INFO_CONFIGS[section];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
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
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        {/* Mobile Image (Top) */}
                        <div className="relative w-full h-[220px] md:hidden pointer-events-none mb-4">
                            <Image
                                src={config.imagePath}
                                alt="Illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Desktop Image (Right - unchanged) */}
                        <div className="absolute right-0 bottom-0 z-0 pointer-events-none hidden md:block">
                            <Image
                                src={config.imagePath}
                                alt="Illustration"
                                width={300}
                                height={300}
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:p-14 w-full md:w-[65%]">
                            {/* Header Section */}
                            <div className="mb-6 md:mb-8 flex flex-col items-center md:items-start">
                                <div className={`hidden md:block w-32 h-1 ${config.accentColor} mb-3`} />
                                <div className={`md:hidden w-16 h-1 mb-4 rounded-full ${config.accentColor || 'bg-white'}`} />
                                <span className="text-white/40 text-sm md:text-xl font-medium uppercase tracking-widest md:normal-case md:tracking-normal">More Information</span>
                            </div>

                            {/* Main Title & Description */}
                            <div className="mb-8 md:mb-10 flex flex-col items-center md:items-start">
                                <h2 className={`text-xl md:text-3xl font-bold mb-4 ${config.titleColor || 'text-white'}`}>
                                    {config.title}
                                </h2>
                                <p className="text-white/70 text-sm md:text-base leading-relaxed px-2 md:px-0">
                                    {config.description}
                                </p>
                            </div>

                            {/* Sub Content */}
                            <div className="mt-4 md:mt-auto flex flex-col items-center md:items-start">
                                <div className="w-3/4 md:w-48 h-px bg-white/20 mb-6" />
                                <p className="text-white/40 text-xs md:text-sm leading-relaxed px-4 md:px-0">
                                    {config.subDescription}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
