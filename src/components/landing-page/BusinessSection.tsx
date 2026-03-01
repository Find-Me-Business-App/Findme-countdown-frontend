"use client";

import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Waitlist from "./Waitlist";

const BUSINESS_STEPS = [
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
    },
    {
        title: "Reduce Business Cost by 90%",
        titleStyled: (
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
            exit="exit"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: delay }
                },
                exit: {
                    opacity: 0,
                    transition: { staggerChildren: 0.02, staggerDirection: -1 }
                }
            }}
            className={className}
        >
            {/* We detect if it's a string to split by words, otherwise we treat as a whole */}
            {typeof children === "string" ? (
                children.split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                            visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
                            exit: { opacity: 0, filter: "blur(5px)", y: -10, transition: { duration: 0.4 } }
                        }}
                        className="inline-block mr-[0.2em]"
                    >
                        {word}
                    </motion.span>
                ))
            ) : (
                <motion.span
                    variants={{
                        hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
                        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } },
                        exit: { opacity: 0, filter: "blur(5px)", y: -10, transition: { duration: 0.4 } }
                    }}
                    className="inline-block"
                >
                    {children}
                </motion.span>
            )}
        </motion.div>
    );
}

interface BusinessSectionProps {
    onOpenWaitlist?: () => void;
}

export default function BusinessSection({ onOpenWaitlist }: BusinessSectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BUSINESS_STEPS.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-[100vh] md:min-h-[140vh] w-full flex flex-col items-center justify-center overflow-hidden bg-white">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/section-background.png"
                    alt="Business Background"
                    fill
                    className="object-cover"
                    priority
                />
                <Image
                    src="/overlay2.png"
                    alt="Overlay"
                    fill
                    className="object-cover opacity-100 mix-blend-screen"
                />
            </div>

            {/* Large BUSINESS background text */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="absolute top-[25%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full px-4 flex justify-center pointer-events-none"
            >
                <Image
                    src="/BUSINESS.png"
                    alt="BUSINESS"
                    width={800}
                    height={400}
                    className="w-[120%] max-w-none md:w-full md:max-w-4xl h-auto object-contain"
                />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-6xl h-auto mt-[-20vh] md:mt-8">
                <AnimatePresence mode="wait">
                    <div key={currentIndex} className="flex flex-col items-center w-full">
                        <RevealMorph className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 md:whitespace-nowrap">
                            {BUSINESS_STEPS[currentIndex].titleStyled}
                        </RevealMorph>
                        <RevealMorph delay={0.4} className="text-gray-700 text-sm md:text-lg font-medium max-w-2xl leading-relaxed opacity-90 px-4">
                            {BUSINESS_STEPS[currentIndex].description}
                        </RevealMorph>
                    </div>
                </AnimatePresence>
            </div>

            {/* Bottom Footer Text (Desktop) */}
            <motion.div
                initial={{ opacity: 0, x: -50, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute bottom-12 left-8 md:left-16 z-20 hidden md:block"
            >
                <p className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase">
                    FINDME LAUNCH FESTIVAL
                </p>
            </motion.div>

            {/* Early Bird CTA */}
            <motion.div
                initial={{ opacity: 0, x: 50, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                className="absolute bottom-40 md:bottom-12 md:right-16 z-20 flex flex-col items-center left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0"
            >
                <div className="bg-[#1d294d]/95 md:bg-[#1d294d]/90 md:backdrop-blur-md p-1 px-1 rounded-2xl border border-white/10 shadow-xl">
                    <button className="bg-[#1d294d] text-white px-10 py-4 rounded-xl font-bold hover:scale-105 transition-transform active:scale-95">
                        <span className="text-sm tracking-widest uppercase">Early bird</span>
                    </button>
                </div>
                <span className="text-[#22c55e] text-sm mt-3 font-bold uppercase tracking-[0.3em]">Free</span>
            </motion.div>

            {/* Mobile Footer Text */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="absolute bottom-4 z-10 w-full flex justify-center md:hidden"
            >
                <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase opacity-60">
                    Web pre launch home
                </p>
            </motion.div>

            {/* Join Our Waitlist - Circular element */}
            <Waitlist variant="light" onJoin={onOpenWaitlist} />
        </section>
    );
}
