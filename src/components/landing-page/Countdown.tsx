"use client";

import { motion } from "framer-motion";

export default function Countdown() {
    return (
        <div className="mt-8 md:mt-12 text-center z-10 pb-6 md:pb-10">
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white uppercase tracking-[0.4em] text-[10px] md:text-[12px] font-light mb-4 md:mb-8"
            >
                Launching
            </motion.p>
            <motion.div
                className="flex gap-4 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="w-16 h-16 md:w-24 md:h-24 border-2 border-white rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl"
                    >
                        <span className="text-white text-2xl md:text-3xl font-light tracking-tighter">--</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
