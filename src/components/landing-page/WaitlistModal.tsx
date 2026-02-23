"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionType, WAITLIST_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect } from "react";

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMoreInfo?: () => void;
    onRegister?: () => void;
    section: SectionType;
}

export default function WaitlistModal({ isOpen, onClose, onMoreInfo, onRegister, section }: WaitlistModalProps) {
    const config = WAITLIST_CONFIGS[section];

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
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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
                        className="relative w-full max-w-[420px] md:max-w-[650px] h-[85vh] md:h-auto max-h-[90vh] md:max-h-none overflow-hidden bg-[#222222] md:bg-[#333333]/90 md:backdrop-blur-3xl rounded-[40px] md:rounded-[50px] p-10 md:p-12 shadow-lg md:shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10"
                        style={{ willChange: "transform, opacity" }}
                    >
                        {/* Decorative Background SVG */}
                        <div className="absolute -bottom-5 -right-0 z-0 opacity-40 pointer-events-none blur-[2px] block">
                            <Image
                                src={config.svgPath}
                                alt="Decoration"
                                width={180}
                                height={280}
                                className="object-contain w-[120px] md:w-[180px] h-auto"
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left h-full">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 w-full">{config.title}</h2>

                            <p className="text-white/70 text-sm md:text-base mb-6 leading-relaxed max-w-[320px] md:max-w-[450px]">
                                {config.description}
                            </p>

                            {config.actionLabel && (
                                <a
                                    href={config.actionLink}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onRegister?.();
                                    }}
                                    className="flex items-center gap-1.5 text-[#3b82f6] text-sm font-medium hover:underline mb-8 group"
                                >
                                    {config.actionLabel}
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </a>
                            )}

                            {/* Email Input Area */}
                            <div className="flex flex-col gap-3 mb-12 w-full max-w-[320px] md:max-w-[440px] items-center md:items-start">
                                <label className="text-white/40 text-xs md:text-sm font-medium px-1">Enter your email</label>
                                <div className="flex flex-col md:flex-row gap-3 w-full">
                                    <input
                                        type="email"
                                        placeholder="obinnaegbule@yahoo.com"
                                        className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20 text-center md:text-left"
                                    />
                                    <button className="bg-[#2c375b] text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-xl w-full md:w-auto">
                                        SEND
                                    </button>
                                </div>
                            </div>

                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onMoreInfo?.();
                                }}
                                className="flex items-center gap-1.5 text-[#4ea1ff] text-sm font-medium hover:underline group mt-auto self-start md:self-auto"
                            >
                                More Information
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

