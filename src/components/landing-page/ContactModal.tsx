"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageCircle } from "lucide-react";
import { MODAL_CONFIGS } from "@/config/modal-configs";
import { useEffect } from "react";
import { useModalStore } from "@/store/useModalStore";
import ContactForm from "./ContactForm";

export default function ContactModal() {
    const { isOpen, type, section, closeModal } = useModalStore();
    const isModalVisible = isOpen && type === "contact";
    const config = MODAL_CONFIGS[section];

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
                        className="relative w-full max-w-[420px] md:max-w-[900px] max-h-[90vh] overflow-y-auto md:overflow-visible scrollbar-hide bg-[#4b4b4b] rounded-[32px] md:rounded-[40px] shadow-[0_25px_80px_rgba(0,0,0,0.7)] border border-white/10 p-4 md:p-6"
                        style={{ willChange: "transform, opacity" }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 md:top-5 md:right-5 z-30 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white/60 hover:text-white hover:border-white/40 backdrop-blur-sm transition-colors"
                        >
                            <X className="w-5 h-5 md:w-5 md:h-5" />
                        </button>

                        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-8">
                            {/* Connect Section / Card */}
                            <div className={`w-full md:w-[310px] flex-shrink-0 p-6 md:p-9 bg-gradient-to-tr ${config.gradientClass} rounded-[35px] md:rounded-[50px] relative overflow-hidden shadow-2xl flex flex-col`}>
                                {/* Inner Glow for Card depth */}
                                <div className="absolute inset-0 bg-black/40 pointer-events-none" />

                                <div className="relative z-10 flex flex-col">
                                    <h2 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">
                                        {config.title}
                                    </h2>
                                    <p className="text-white/70 text-xs md:text-sm mb-6 md:mb-10 leading-relaxed max-w-[240px]">
                                        {config.description}
                                    </p>

                                    <div className="space-y-5 md:space-y-7">
                                        {/* Call */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span className="text-white font-bold text-base md:text-lg">Call</span>
                                                <p className="text-white/40 text-[10px] md:text-[13px] leading-tight">Click on the call icon or copy</p>
                                                <a href={`tel:${config.callNumber}`} className="text-[#3b82f6] text-xs md:text-sm font-medium hover:underline">
                                                    {config.callNumber}
                                                </a>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <Phone className="w-5 h-5 md:w-5 md:h-5 text-green-500 fill-green-500" />
                                            </div>
                                        </div>

                                        {/* WhatsApp */}
                                        <a
                                            href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between group/wa"
                                        >
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span className="text-white font-bold text-base md:text-lg group-hover/wa:text-green-400 transition-colors">WhatsApp</span>
                                                <p className="text-white/40 text-[10px] md:text-[13px] leading-tight max-w-[180px]">Clicking on the WhatsApp icon leads you to chat.</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="bg-green-500 rounded-full p-1.5 md:p-1 group-hover/wa:scale-110 transition-transform">
                                                    <MessageCircle className="w-4 h-4 md:w-4 md:h-4 text-white fill-white" />
                                                </div>
                                            </div>
                                        </a>

                                        {/* Mail */}
                                        <div className="flex items-center justify-between group">
                                            <div className="flex flex-col gap-0.5 md:gap-1">
                                                <span className="text-white font-bold text-base md:text-lg">Mail</span>
                                                <p className="text-white/40 text-[10px] md:text-[13px] leading-tight">Reach us through mail</p>
                                                <a href={`mailto:${config.email}`} className="text-[#3b82f6] text-xs md:text-sm font-medium hover:underline break-all">
                                                    {config.email}
                                                </a>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <div className="bg-[#ea4335] rounded-md p-1.5 md:p-1 shadow-sm">
                                                    <Mail className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Area extracted to ContactForm */}
                            <ContactForm section={section} />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
