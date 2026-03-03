"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { WAITLIST_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import WaitlistForm from "./WaitlistForm";

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
                        className="relative w-full max-w-[400px] md:max-w-[550px] 
                                 /* Scrollable but compact */
                                 h-auto max-h-[70vh] md:max-h-[85vh]
                                 overflow-y-auto scrollbar-hide
                                 bg-[#1a1a1a] md:bg-[#333333]/90 md:backdrop-blur-3xl 
                                 rounded-[35px] md:rounded-[50px] p-8 md:p-12 
                                 shadow-[0_20px_60px_rgba(0,0,0,0.6)] 
                                 border border-white/10"
                        style={{ 
                            willChange: "transform, opacity",
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}
                    >
                        {/* Decorative Background SVG */}
                        <div className="absolute -bottom-4 -right-2 z-0 opacity-30 pointer-events-none blur-[1px]">
                            <Image
                                src={config.svgPath}
                                alt="Decoration"
                                width={160}
                                height={260}
                                className="object-contain w-[100px] md:w-[140px] h-auto"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-all active:scale-90"
                        >
                            <X className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 w-full pr-8">
                                {config.title}
                            </h2>

                            <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed max-w-[320px] md:max-w-[420px]">
                                {config.description}
                            </p>

                            {config.actionLabel && (
                                <button
                                    onClick={() => openModal("registration", section)}
                                    className="flex items-center gap-1.5 text-[#3b82f6] text-sm font-medium hover:underline mb-6 group"
                                >
                                    {config.actionLabel}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            )}

                            {/* Form Area */}
                            <div className="w-full mb-8">
                                <WaitlistForm section={section} />
                            </div>

                            <button
                                onClick={() => openModal("info", section)}
                                className="flex items-center gap-1.5 text-[#4ea1ff] text-xs md:text-sm font-medium hover:underline group pb-2"
                            >
                                More Information
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}