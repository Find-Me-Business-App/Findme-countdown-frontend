"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { SectionType } from "@/config/modal-configs";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
    activeSection: SectionType;
    onOpenModal: () => void;
}

const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function Navbar({ activeSection, onOpenModal }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "/", id: "home" },
        { name: "Business", href: "#business", id: "business" },
        { name: "Festival", href: "#festival", id: "festival" },
    ];

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate="visible"
                className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-6 md:px-16 lg:px-24"
            >
                {/* Mobile Menu Trigger (Mobile only) */}
                <motion.div variants={itemVariants} className="md:hidden flex-1">
                    <div
                        className="cursor-pointer p-1 w-fit hover:scale-110 transition-transform active:scale-95"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Image
                            src="/menu-button.svg"
                            alt="Menu"
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                    </div>
                </motion.div>

                {/* Logo */}
                <motion.div
                    variants={itemVariants}
                    className="flex-none flex items-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Image
                        src="/logo1.svg"
                        alt="Findme Logo"
                        width={100}
                        height={32}
                        className="h-5 w-auto"
                    />
                </motion.div>

                {/* Desktop Navigation (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-12 ml-auto text-white/90 font-medium">
                    <div className="flex items-center gap-10">
                        {navLinks.map((link) => (
                            <motion.div key={link.id} variants={itemVariants} className="relative py-1">
                                <Link
                                    href={link.href}
                                    className={`${activeSection === link.id ? "text-white" : "text-white/60"} hover:text-white transition-colors relative z-10`}
                                >
                                    {link.name}
                                </Link>
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Trigger (Desktop) */}
                    <motion.div
                        variants={itemVariants}
                        className="cursor-pointer hover:scale-110 transition-transform active:scale-95 group"
                        onClick={onOpenModal}
                        whileHover={{ y: -2 }}
                    >
                        <Image
                            src="/Phone.svg"
                            alt="Contact"
                            width={21}
                            height={24}
                            className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all"
                        />
                    </motion.div>
                </div>

                {/* Mobile Contact Trigger (Mobile only) */}
                <motion.div variants={itemVariants} className="md:hidden flex-1 flex items-center justify-end">
                    <div
                        className="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                        onClick={onOpenModal}
                    >
                        <Image
                            src="/Phone.svg"
                            alt="Contact"
                            width={21}
                            height={24}
                            className="w-5 h-5"
                        />
                    </div>
                </motion.div>
            </motion.nav>

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                activeSection={activeSection}
                onContactClick={onOpenModal}
            />
        </>
    );
}
