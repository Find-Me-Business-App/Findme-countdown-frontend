"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import Waitlist from "./Waitlist";
import { THEME } from "@/config/theme";

const BUSINESS_STEPS = [
    {
        title: "Give Your Business Publicity",
        titleStyled: (
            <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8]">Give Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Business Publicity</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    },
    {
        title: "Reduce Business Cost by 90%",
        titleStyled: (
            <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ec4899]">Reduce Business Cost by </span>
                <span className="text-[#22c55e]">90%</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    },
    {
        title: "Empower Your Business with Ai",
        titleStyled: (
            <>
                <span className="text-[#3b82f6]">Empower Your </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Business </span>
                <span className="text-[#3b82f6]">with </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#ec4899] to-[#f43f5e]">Ai</span>
            </>
        ),
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking."
    }
];

/* ─── Shared easing ─── */
const smoothEase = [0.22, 1, 0.36, 1] as const;

/* ─── RevealMorph: word-by-word deblur reveal ─── */
interface RevealMorphProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

function RevealMorph({ children, className = "", delay = 0 }: RevealMorphProps) {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: delay }
                }
            }}
            className={className}
        >
            {typeof children === "string" ? (
                children.split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, filter: "blur(6px)", y: 15 },
                            visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: smoothEase } }
                        }}
                        className="inline-block mr-[0.2em]"
                    >
                        {word}
                    </motion.span>
                ))
            ) : (
                <motion.span
                    variants={{
                        hidden: { opacity: 0, filter: "blur(6px)", y: 15 },
                        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: smoothEase } }
                    }}
                    className="inline-block"
                >
                    {children}
                </motion.span>
            )}
        </motion.div>
    );
}

/* ─── BusinessSection ─── */
interface BusinessSectionProps {
    onOpenWaitlist?: () => void;
}

export default function BusinessSection({ onOpenWaitlist }: BusinessSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { openModal } = useModalStore();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BUSINESS_STEPS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-white">

            {/* ── Layer 1: Background with cinematic zoom ── */}
            <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: smoothEase }}
                className="absolute inset-0 z-0 transform-gpu will-change-transform"
            >
                <Image
                    src={THEME.assets.images.business.bg}
                    alt="Business Background"
                    fill
                    className="object-cover"
                    priority
                />
                <Image
                    src={THEME.assets.images.business.overlay}
                    alt="Overlay"
                    fill
                    className="object-cover opacity-100 mix-blend-screen"
                />
            </motion.div>

            {/* ── Layer 2: BUSINESS.png — fast reveal from bottom ── */}
            <motion.div
                initial={{ y: 80, opacity: 0, filter: "blur(12px)" }}
                whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: smoothEase }}
                className="absolute top-[25%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full px-4 flex justify-center pointer-events-none will-change-transform transform-gpu"
            >
                <Image
                    src={THEME.assets.images.business.text}
                    alt="BUSINESS"
                    width={800}
                    height={400}
                    className="w-[120%] max-w-none md:w-full md:max-w-4xl h-auto object-contain"
                />
            </motion.div>

            {/* ── Layer 3: Title + Description (morphing text) ── */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl h-auto mt-[-20vh] md:mt-8">
                <AnimatePresence mode="wait">
                    <div key={currentIndex} className="flex flex-col items-center w-full">
                        <RevealMorph delay={0.3} className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 md:whitespace-nowrap">
                            {BUSINESS_STEPS[currentIndex].titleStyled}
                        </RevealMorph>
                        <RevealMorph delay={0.55} className="text-[#334155] text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90 px-4">
                            {BUSINESS_STEPS[currentIndex].description}
                        </RevealMorph>
                    </div>
                </AnimatePresence>
            </div>

            {/* ── Layer 4: Bottom-left label (Desktop) — slide from left ── */}
            <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6, ease: smoothEase }}
                className="absolute bottom-12 left-8 md:left-16 z-20 hidden md:block"
            >
                <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">
                    FINDME LAUNCH FESTIVAL
                </p>
            </motion.div>

            {/* ── Layer 5: Early Bird CTA — scale pop-in ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7, ease: smoothEase }}
                className="absolute bottom-45 md:bottom-12 md:right-16 z-20 flex flex-col items-center left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
            >
                <div className="bg-[#1d294d]/95 md:bg-[#1d294d]/90 md:backdrop-blur-md p-1 px-1 rounded-xl border border-white/10 shadow-xl">
                    <button
                        onClick={() => openModal("registration", "business")}
                        className="bg-[#1d294d] text-white px-6 py-2 rounded-lg font-bold hover:scale-105 transition-transform active:scale-95"
                    >
                        <span className="text-xs tracking-widest uppercase">Early bird</span>
                    </button>
                </div>
                <span className="text-[#22c55e] text-sm mt-3 font-bold uppercase tracking-[0.3em]">Free</span>
            </motion.div>

            {/* ── Layer 6: Mobile footer text — fade up ── */}
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: smoothEase }}
                className="absolute bottom-4 z-10 w-full flex justify-center md:hidden"
            >
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                    Web pre launch home
                </p>
            </motion.div>

            {/* ── Layer 7: Waitlist button ── */}
            <Waitlist variant="light" onJoin={onOpenWaitlist} />
        </section>
    );
}
