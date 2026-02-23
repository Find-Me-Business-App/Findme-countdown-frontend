"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Waitlist from "./Waitlist";

const BUSINESS_STEPS = [
    {
        title: (
            <>
                <span className="text-[#3b82f6]">Empower Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Business </span>
                <span className="text-[#3b82f6]">with </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Ai</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    },
    {
        title: (
            <>
                <span className="text-[#3b82f6]">Reduce Business </span>
                <span className="text-[#4c1d95]">Cost </span>
                <span className="text-[#b91c1c]">by </span>
                <span className="text-[#22c55e]">90%</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    }
];

interface BusinessSectionProps {
    onOpenWaitlist?: () => void;
}

export default function BusinessSection({ onOpenWaitlist }: BusinessSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BUSINESS_STEPS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[100vh] md:min-h-[140vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/Findme/section-background.png"
                    alt="Business Background"
                    fill
                    className="object-cover"
                    priority
                />
                <Image
                    src="/Findme/overlay2.png"
                    alt="Overlay"
                    fill
                    className="object-cover opacity-100 mix-blend-screen"
                />
            </div>

            {/* Large BUSINESS background text */}
            <div className="absolute top-[25%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full px-4 flex justify-center pointer-events-none opacity-100">
                <Image
                    src="/Findme/BUSINESS.png"
                    alt="BUSINESS"
                    width={800}
                    height={400}
                    className="w-[120%] max-w-none md:w-full md:max-w-4xl h-auto object-contain"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl h-auto mt-[-20vh] md:mt-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center w-full"
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 md:whitespace-nowrap">
                            {BUSINESS_STEPS[currentIndex].title}
                        </h2>
                        <p className="text-gray-700 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90 px-4">
                            {BUSINESS_STEPS[currentIndex].description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Bottom Footer Text (Desktop) */}
            <div className="absolute bottom-12 left-8 md:left-16 z-20 hidden md:block">
                <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">
                    FINDME LAUNCH FESTIVAL
                </p>
            </div>

            {/* Early Bird CTA */}
            <div className="absolute bottom-40 md:bottom-12 md:right-16 z-20 flex flex-col items-center left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0">
                <div className="bg-[#1d294d]/95 md:bg-[#1d294d]/90 md:backdrop-blur-md p-1 px-1 rounded-2xl border border-white/10 shadow-xl">
                    <button className="bg-[#1d294d] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95">
                        <span className="text-sm tracking-widest uppercase">Early bird</span>
                    </button>
                </div>
                <span className="text-[#22c55e] text-sm mt-3 font-bold uppercase tracking-[0.3em]">Free</span>
            </div>

            {/* Mobile Footer Text */}
            <div className="absolute bottom-4 z-10 w-full flex justify-center md:hidden">
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                    Web pre launch home
                </p>
            </div>

            {/* Join Our Waitlist - Circular element */}
            <Waitlist variant="light" onJoin={onOpenWaitlist} />
        </section>
    );
}
