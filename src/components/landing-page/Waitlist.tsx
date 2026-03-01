"use client";

import { motion } from "framer-motion";

interface WaitlistProps {
    variant?: "dark" | "light";
    onJoin?: () => void;
}

export default function Waitlist({ variant = "dark", onJoin }: WaitlistProps) {
    const isLight = variant === "light";

    return (
        <motion.div
            onClick={onJoin}
            initial={{ opacity: 0, y: 40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 1.2,
                delay: 2.2,
                ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className="absolute bottom-1 md:bottom-2 left-1/2 -translate-x-1/2 z-10 cursor-pointer group"
        >
            <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                {/* Circular text SVG placeholder */}
                <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-spin-slow">
                    <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                        fill="none"
                    />
                    <text className={`text-[14px] md:text-[12px] uppercase font-bold tracking-[0.2em] ${isLight ? "fill-black" : "fill-white/40"} transition-colors duration-500 group-hover:fill-white`}>
                        <textPath xlinkHref="#circlePath">
                            Join Our Waitlist
                        </textPath>
                    </text>
                </svg>

                {/* Centered Icon (Mouse) */}
                <div className={`w-6 h-9 md:w-7 md:h-11 border-2 ${isLight ? "border-black" : "border-white/40"} rounded-full flex items-start justify-center pt-1.5 transition-colors duration-500 group-hover:border-white`}>
                    <div className={`w-0.5 h-1.5 md:w-0.5 md:h-2 ${isLight ? "bg-black" : "bg-white/60"} rounded-full animate-bounce group-hover:bg-white`} />
                </div>
            </div>
        </motion.div>
    );
}
