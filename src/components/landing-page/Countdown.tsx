"use client";

import { motion } from "framer-motion";

export default function Countdown() {
    return (
        <div className="mt-12 text-center z-10 pb-10">
            <motion.p
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-white uppercase tracking-[0.4em] text-[12px] font-light mb-8"
            >
                Launching
            </motion.p>
            <div className="flex gap-4 justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 1.2 + i * 0.1, // Snappier on start
                            ease: [0.2, 0.65, 0.3, 0.9] as const,
                        }}
                        className="w-20 h-20 md:w-24 md:h-24 border border-white/20 rounded-3xl flex items-center justify-center bg-white/5 backdrop-blur-md md:backdrop-blur-xl group hover:border-white/50 transition-colors duration-500"
                        style={{ willChange: "transform, opacity" }}
                    >
                        <span className="text-white text-3xl font-light tracking-tighter">--</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
