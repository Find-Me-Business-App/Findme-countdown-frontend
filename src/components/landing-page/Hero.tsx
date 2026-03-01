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
                ease: [0.2, 0.65, 0.3, 0.9],
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
            >
                Welcome to Findme App
            </motion.p>
            <motion.h1
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="text-white text-5xl md:text-7xl font-light tracking-tight max-w-4xl mx-auto leading-tight flex flex-col items-center"
            >
                <span className="flex flex-wrap justify-center gap-x-[0.3em]">
                    {line1.map((word, i) => (
                        <motion.span key={i} variants={wordVars} className="inline-block">
                            {word}
                        </motion.span>
                    ))}
                </span>
                <span className="flex flex-wrap justify-center gap-x-[0.3em]">
                    {line2.map((word, i) => (
                        <motion.span key={i} variants={wordVars} className="inline-block">
                            {word === "unlimited" ? (
                                <span className="font-normal italic">{word}</span>
                            ) : (
                                word
                            )}
                        </motion.span>
                    ))}
                </span>
            </motion.h1>
        </div>
    );
}
