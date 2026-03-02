"use client";

import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function Countdown() {
    return (
        <div className="mt-8 md:mt-12 text-center z-10 pb-6 md:pb-10">
            {/* "Launching" label — letter-spacing expand */}
            <motion.p
                initial={{ opacity: 0, letterSpacing: "-0.1em", filter: "blur(4px)" }}
                whileInView={{ opacity: 1, letterSpacing: "0.4em", filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: smoothEase }}
                className="text-white uppercase text-[10px] md:text-[12px] font-light mb-4 md:mb-8"
            >
                Launching
            </motion.p>

            {/* Countdown boxes — staggered scale pop-in */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } }
                }}
                className="flex gap-4 justify-center"
            >
                {[1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        variants={{
                            hidden: { opacity: 0, scale: 0.5, y: 20 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: { duration: 0.5, ease: smoothEase }
                            }
                        }}
                        className="w-16 h-16 md:w-24 md:h-24 border-2 border-white rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl transform-gpu"
                    >
                        <span className="text-white text-2xl md:text-3xl font-light tracking-tighter">--</span>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
