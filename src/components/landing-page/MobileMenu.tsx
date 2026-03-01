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

const containerVariants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 200,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
    exit: {
        y: "100%",
        transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
};

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
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full bg-[#f4f4f4] rounded-t-[40px] px-8 pt-12 pb-10 flex flex-col items-center gap-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
                    >
                        {/* Links */}
                        <div className="flex flex-col items-center gap-6 w-full">
                            {navLinks.map((link) => (
                                <motion.div key={link.id} variants={itemVariants}>
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className={`text-lg font-semibold tracking-wide transition-colors ${activeSection === link.id
                                            ? "text-[#1d294d] border-b-2 border-[#1d294d]/20 pb-1"
                                            : "text-[#1d294d]/60 hover:text-[#1d294d]"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Button */}
                        <motion.button
                            variants={itemVariants}
                            onClick={() => {
                                onClose();
                                onContactClick();
                            }}
                            className="w-full max-w-[300px] bg-[#1d294d] text-white py-4 rounded-xl font-bold tracking-wider hover:bg-[#2a3b6d] transition-colors shadow-lg active:scale-95 duration-200 mt-4"
                        >
                            Contact us
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
