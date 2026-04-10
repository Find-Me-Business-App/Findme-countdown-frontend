"use client";

import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
    return (
        <div className="text-center z-10">
            {/* Subtitle — letter-spacing expand + deblur */}
            <motion.p
                initial={{ opacity: 0, letterSpacing: "-0.1em", filter: "blur(4px)" }}
                whileInView={{ opacity: 1, letterSpacing: "0.3em", filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
                className="text-white/60 uppercase text-[10px] md:text-xs font-semibold mb-2 md:mb-4"
            >
                Welcome to Findme App
            </motion.p>

            {/* Heading — word-by-word deblur reveal from bottom */}
            <motion.h1
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.06, delayChildren: 0.5 }
                    }
                }}
                className="text-white text-3xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight px-4"
            >
                {"Explore a world of".split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } }
                        }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                ))}
                <br />
                {"unlimited features".split(" ").map((word, i) => (
                    <motion.span
                        key={`line2-${i}`}
                        variants={{
                            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
                            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: smoothEase } }
                        }}
                        className="inline-block mr-[0.25em]"
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.h1>
        </div>
    );
}
