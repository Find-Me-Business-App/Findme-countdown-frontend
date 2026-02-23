"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SectionType, REGISTRATION_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect } from "react";

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    section: SectionType;
}

export default function RegistrationModal({ isOpen, onClose, section }: RegistrationModalProps) {
    const config = REGISTRATION_CONFIGS[section as keyof typeof REGISTRATION_CONFIGS];

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

    if (!config) return null;

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
                        className="relative w-full max-w-[760px] max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible bg-[#1a1a1a] md:bg-white/5 md:backdrop-blur-3xl rounded-[32px] md:rounded-[48px] shadow-2xl md:shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10 md:border-white/20 px-6 py-6 md:px-9 md:py-8 flex flex-col md:flex-row gap-4 md:gap-10"
                        style={{ willChange: "transform, opacity" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 md:top-7 md:right-7 z-30 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        {/* Left Side: Header & Form */}
                        <div className="w-full md:w-[65%] flex flex-col">
                            <div className="mb-4 md:mb-5">
                                <div className={`w-12 h-1 md:w-16 ${config.accentColor} mb-2 md:mb-3`} />
                                <h2 className="text-2xl md:text-2xl font-bold text-white mb-1 md:mb-1.5">{config.title}</h2>
                                <p className="text-white/60 text-xs md:text-xs leading-relaxed max-w-sm">
                                    {config.description}
                                </p>
                            </div>

                            <form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-2">
                                <div className="md:col-span-2 flex flex-col gap-1.5">
                                    <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Email</label>
                                    <input
                                        type="email"
                                        placeholder="email@example.com"
                                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Password</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Phone</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Referral (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="Code"
                                        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                                    />
                                </div>

                                <div className="md:col-span-2 mt-2 md:mt-3 flex justify-center">
                                    <button
                                        type="button"
                                        className="text-white font-bold text-xs md:text-sm hover:underline transition-all opacity-80 hover:opacity-100"
                                    >
                                        Continue with form
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Divider for mobile */}
                        <div className="h-px w-full bg-white/10 md:hidden" />

                        {/* Right Side: AI Info Overlay with SVG */}
                        <div className="md:w-[35%] flex flex-col items-center justify-center relative py-2 md:py-0">
                            {/* Vertical line divider for desktop */}
                            <div className="absolute left-[-20px] top-6 bottom-6 w-[1px] bg-white/10 hidden md:block" />

                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 md:w-22 md:h-22 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center mb-3 md:mb-4 border border-white/10 group-hover:border-white/20 transition-colors shadow-inner">
                                    <Image
                                        src="/register.svg"
                                        alt="Sign up using AI"
                                        width={44}
                                        height={44}
                                        className="object-contain opacity-80 md:w-12 md:h-12"
                                    />
                                </div>
                                <h3 className="text-white text-lg md:text-lg font-bold tracking-tight">Sign up using Ai</h3>
                                <p className="text-white/40 text-[9px] md:text-[10px] mt-0.5 md:mt-1 uppercase tracking-widest font-bold">Fast registration</p>
                            </div>
                        </div>



                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    );
}
