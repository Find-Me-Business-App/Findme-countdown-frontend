"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const FOOTER_LINKS = [
    {
        title: "HOME",
        links: ["About us", "Categories", "Features", "Publish", "Terms"],
    },
    {
        title: "SERVICES",
        links: ["Plans", "Business dashboard", "Business Network", "Integrations", "Multiverse"],
    },
    {
        title: "FEATURES",
        links: ["Create", "Wallet", "E-App", "Charity", "Eco"],
    },
    {
        title: "CONTACT",
        links: ["Download App", "Support", "FAQ", "Find Agent", "Service Centers"],
    },
];

const SOCIALS = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
];

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-white">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/footer-backgroung.png"
                    alt="Footer Background"
                    fill
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 w-full px-6 py-8 md:px-16 lg:px-24">
                {/* Top Section - Responsive Layout */}
                <div className="flex flex-col md:flex-row items-center md:justify-between relative mb-8 md:mb-10">
                    {/* Logo */}
                    <Image
                        src="/Footer-logo.png"
                        alt="Findme Logo"
                        width={140}
                        height={50}
                        className="h-9 md:h-10 w-auto opacity-90 mb-8 md:mb-0"
                    />

                    {/* Tagline - Centered on desktop */}
                    <div className="md:absolute md:left-1/2 md:-translate-x-1/2 text-gray-400 font-bold tracking-[0.25em] text-[10px] md:text-xs text-center mb-8 md:mb-0">
                        LIMITLESS POSSIBILITIES
                    </div>

                    {/* Socials */}
                    <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-0">
                        {SOCIALS.map(({ Icon, href }, idx) => (
                            <Link
                                key={idx}
                                href={href}
                                className="w-10 h-10 md:w-11 md:h-11 rounded-full border border-[#1d294d]/20 flex items-center justify-center hover:bg-[#1d294d]/5 transition-all duration-300 group"
                            >
                                <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#1d294d] stroke-[1.5px]" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Full Width Divider */}
                <div className="w-full h-px bg-black/5 mb-10" />

                {/* Main Content Grid - 4 Columns */}
                <div className="grid grid-cols-4 gap-x-2 md:gap-x-8 gap-y-8 mb-12">
                    {FOOTER_LINKS.map((section) => (
                        <div key={section.title} className="flex flex-col gap-3 md:gap-4">
                            <h4 className="text-[#1d294d] font-bold text-[9px] md:text-[13px] tracking-[0.05em] mb-1">{section.title}</h4>
                            <div className="flex flex-col gap-2 md:gap-2.5">
                                {section.links.map((link) => (
                                    <Link
                                        key={link}
                                        href="#"
                                        className="text-gray-500 hover:text-gray-900 transition-colors text-[9px] md:text-sm font-medium flex items-center gap-1.5"
                                    >
                                        <span className="leading-tight">{link}</span>
                                        {link === "Eco" && (
                                            <Image
                                                src="/Vector.svg"
                                                alt="Eco"
                                                width={12}
                                                height={12}
                                                className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0"
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* App Store Buttons - Visible only on small screens */}
                <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mb-10 scale-[0.8] sm:scale-100 origin-center md:hidden">
                    {/* Play Store Button */}
                    <div className="bg-[#1d2645] text-white px-4 md:px-6 py-2 md:py-3 rounded-[10px] md:rounded-xl flex items-center gap-2 md:gap-3 w-auto md:w-48 shadow-lg cursor-pointer hover:brightness-110 transition-all border border-white/5">
                        <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M3.5 3.5V20.5C3.5 20.8 3.7 21 4 21C4.1 21 4.2 21 4.3 20.9L13 12.2L4.3 3.5C4.2 3.4 4.1 3.4 4 3.4C3.7 3.4 3.5 3.6 3.5 3.9V3.5Z" fill="#00E5FF" />
                                <path d="M13 12.2L16.2 15.4L20.1 13.2C20.4 13 20.6 12.7 20.6 12.2C20.6 11.7 20.4 11.4 20.1 11.2L16.2 9L13 12.2Z" fill="#FFD600" />
                                <path d="M13 12.2L4.3 3.5L16.2 9L13 12.2Z" fill="#FF3D00" />
                                <path d="M13 12.2L16.2 15.4L4.3 20.9L13 12.2Z" fill="#4CAF50" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[7px] md:text-[8px] uppercase tracking-wider opacity-60 whitespace-nowrap">Download on the</span>
                            <span className="text-xs md:text-sm font-bold leading-none mt-0.5">PlayStore</span>
                        </div>
                    </div>

                    {/* App Store Button */}
                    <div className="bg-[#1d2645] text-white px-4 md:px-6 py-2 md:py-3 rounded-[10px] md:rounded-xl flex items-center gap-2 md:gap-3 w-auto md:w-48 shadow-lg cursor-pointer hover:brightness-110 transition-all border border-white/5">
                        <div className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0">
                            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M17.05 20.28c-.96.95-2.12 2.37-3.6 2.37-1.4 0-1.87-.89-3.52-.89-1.65 0-2.17.87-3.48.91-1.37.04-2.58-1.57-3.63-3.1C.68 16.27-.92 11.53.94 8.28c.92-1.6 2.53-2.61 4.31-2.64 1.34-.03 2.61.89 3.43.89.82 0 2.36-1.12 3.97-.96 1.69.17 2.96.79 3.65 1.78-1.76 1.06-1.48 3.39.29 4.12.8.33 1.54.89 2.02 1.59-1.1 1.62-2.3 3.11-3.56 4.38a16.82 16.82 0 0 1-1 2.84zM12.03 5.43c.12-2.42-1.92-4.59-4.32-4.72-.15 2.5 2.14 4.5 4.32 4.72z" />
                            </svg>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-[7px] md:text-[8px] uppercase tracking-wider opacity-60 whitespace-nowrap">Get it on the</span>
                            <span className="text-xs md:text-sm font-bold leading-none mt-0.5">AppStore</span>
                        </div>
                    </div>
                </div>

                {/* Copyright - Centered bottom */}
                <div className="flex justify-center items-center text-gray-400 text-[10px] md:text-[12px] pt-8 border-t border-black/5">
                    <p className="flex items-center gap-2 opacity-80 text-center">
                        <span className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-gray-300 flex items-center justify-center text-[8px] md:text-[10px]">C</span>
                        Copyright 2022 FindMe.com - All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
