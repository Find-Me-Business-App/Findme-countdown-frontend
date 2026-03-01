"use client";

import { motion, Variants } from "framer-motion";

export default function Hero() {
    const containerVars: Variants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 1.0,
                delay: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9],
            },
        },
    };

    return (
        <div className="text-center z-10">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/60 uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold mb-2 md:mb-4"
            >
                Welcome to Findme App
            </motion.p>
            <motion.h1
                variants={containerVars}
                initial="initial"
                animate="animate"
                className="text-white text-3xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight px-4"
            >
                Explore a world of <br /> unlimited features
            </motion.h1>
        </div>
    );
}
