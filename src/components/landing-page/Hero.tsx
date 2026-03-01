"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
    const line1 = "Explore a world of".split(" ");
    const line2 = "unlimited features".split(" ");

    const containerVars: Variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const wordVars: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9] as const,
            },
        },
    };

    const lineVars: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <div className="text-center z-10">
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-white/60 uppercase tracking-[0.3em] text-xs font-semibold mb-6"
                style={{ willChange: "transform, opacity" }}
            >
                Welcome to Findme App
            </motion.p>

            {/* Desktop Headline (Word-by-word) */}
            <motion.h1
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="hidden md:flex text-white text-5xl md:text-7xl font-light tracking-tight max-w-4xl mx-auto leading-tight flex-col items-center"
            >
                <span className="flex flex-wrap justify-center gap-x-[0.3em]">
                    {line1.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={wordVars}
                            className="inline-block"
                            style={{ willChange: "transform, opacity" }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
                <span className="flex flex-wrap justify-center gap-x-[0.3em]">
                    {line2.map((word, i) => (
                        <motion.span
                            key={i}
                            variants={wordVars}
                            className="inline-block"
                            style={{ willChange: "transform, opacity" }}
                        >
                            {word === "unlimited" ? (
                                <span className="font-normal italic">{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </span>
            </motion.h1>

            {/* Mobile Headline (Line-by-line for performance) */}
            <motion.h1
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="flex md:hidden text-white text-4xl font-light tracking-tight max-w-sm mx-auto leading-tight flex-col items-center gap-2"
            >
                <motion.span variants={lineVars} style={{ willChange: "transform, opacity" }}>
                    Explore a world of
                </motion.span>
                <motion.span variants={lineVars} style={{ willChange: "transform, opacity" }}>
                    <span className="font-normal italic">unlimited</span> features
                </motion.span>
            </motion.h1>
        </div>
    );
}
