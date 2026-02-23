"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Menu } from "lucide-react";
import { useState } from "react";

import { SectionType } from "@/config/modal-configs";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
    activeSection: SectionType;
    onOpenModal: () => void;
}

export default function Navbar({ activeSection, onOpenModal }: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-8 py-6 md:px-16 lg:px-24 backdrop-blur-sm bg-black/5">
                {/* Mobile Menu Trigger (Mobile only) */}
                <div className="md:hidden flex-1">
                    <div
                        className="cursor-pointer p-1 w-fit"
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6 text-blue-500" />
                    </div>
                </div>

                {/* Logo */}
                <div className="flex-none flex items-center">
                    <Image
                        src="/Findme/logo1.svg"
                        alt="Findme Logo"
                        width={100}
                        height={32}
                        className="h-5 w-auto"
                    />
                </div>

                {/* Desktop Navigation (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-12 ml-auto text-white/90 font-medium">
                    <div className="flex items-center gap-10">
                        <Link href="/" className={`${activeSection === "home" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>Home</Link>
                        <Link href="#business" className={`${activeSection === "business" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>Business</Link>
                        <Link href="#festival" className={`${activeSection === "festival" ? "text-white" : "text-white/60"} hover:text-white transition-colors`}>Festival</Link>
                    </div>

                    {/* Contact Trigger (Desktop) */}
                    <div
                        className="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                        onClick={onOpenModal}
                    >
                        <Phone className="w-5 h-5 text-green-500 fill-green-500" />
                    </div>
                </div>

                {/* Mobile Contact Trigger (Mobile only) */}
                <div className="md:hidden flex-1 flex items-center justify-end">
                    <div
                        className="cursor-pointer hover:scale-110 transition-transform active:scale-95"
                        onClick={onOpenModal}
                    >
                        <Phone className="w-5 h-5 text-green-500 fill-green-500" />
                    </div>
                </div>
            </nav>

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                activeSection={activeSection}
                onContactClick={onOpenModal}
            />
        </>
    );
}
