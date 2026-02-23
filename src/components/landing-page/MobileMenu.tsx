"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { SectionType } from "@/config/modal-configs";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    activeSection: SectionType;
    onContactClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, activeSection, onContactClick }: MobileMenuProps) {
    const navLinks = [
        { label: "Home", href: "/", id: "home" },
        { label: "Business", href: "#business", id: "business" },
        { label: "Festival", href: "#festival", id: "festival" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end justify-center">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full bg-[#f4f4f4] rounded-t-[40px] px-8 pt-12 pb-10 flex flex-col items-center gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
                    >
                        {/* Links */}
                        <div className="flex flex-col items-center gap-6 w-full">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={onClose}
                                    className={`text-lg font-semibold tracking-wide transition-colors ${activeSection === link.id
                                        ? "text-[#1d294d] border-b-2 border-[#1d294d]/20 pb-1"
                                        : "text-[#1d294d]/60 hover:text-[#1d294d]"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Contact Button */}
                        <button
                            onClick={() => {
                                onClose();
                                onContactClick();
                            }}
                            className="w-full max-w-[300px] bg-[#1d294d] text-white py-4 rounded-xl font-bold tracking-wider hover:bg-[#2a3b6d] transition-colors shadow-lg active:scale-95 duration-200 mt-4"
                        >
                            Contact us
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
