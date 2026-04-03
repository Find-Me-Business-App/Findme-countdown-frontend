"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { THEME } from "@/config/theme";

interface RegistrationSuccessProps {
    userName: string;
    businessName: string;
    onDone: () => void;
}

export default function RegistrationSuccess({ userName, businessName, onDone }: RegistrationSuccessProps) {
    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden items-center justify-center text-center">
            {/* ── Header (fixed top-left) ─────────────────── */}
            <div className="shrink-0 absolute top-4 md:top-6 left-4 md:left-8 text-left">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 65 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-[3.5px] mb-4 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-lg md:text-2xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Welcome
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-base md:text-xl font-bold"
                    style={{ color: "#2B365A" }}
                >
                    {userName || "Francis"}
                </motion.p>
            </div>

            {/* ── Central Content Area ────────────────────── */}
            <div className="flex flex-col items-center justify-center gap-10 md:gap-14 mt-12 md:mt-24">
                {/* Success Icon Group */}
                <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.6
                    }}
                    className="w-24 h-24 md:w-36 md:h-36 flex items-center justify-center relative shadow-3xl rounded-full overflow-visible"
                >
                    {/* Spinning background halo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-15px] z-0 opacity-20"
                    >
                        <Image 
                            src="/icons/Ellipse 715.svg" 
                            alt="Halo" 
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Main Success Checkmark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1, 
                            rotate: 360 
                        }}
                        transition={{ 
                            opacity: { duration: 0.4, delay: 1.0 },
                            scale: { duration: 0.5, delay: 1.0, type: "spring" },
                            rotate: { duration: 10, delay: 1.0, repeat: Infinity, ease: "linear" }
                        }}
                        className="relative z-10 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center drop-shadow-2xl"
                    >
                        <Image 
                            src="/icons/success.svg" 
                            alt="Success" 
                            width={96} 
                            height={96}
                            className="object-contain"
                        />
                    </motion.div>
                </motion.div>
                
                {/* Status Message */}
                <div className="flex flex-col gap-3 md:gap-4 relative z-10">
                    <motion.h3 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.2, ease: "easeOut" }}
                        className="text-2xl md:text-3xl font-bold tracking-tight"
                        style={{ color: "white" }}
                    >
                        Registration complete
                    </motion.h3>
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
                        className="text-base md:text-xl font-medium max-w-[340px] md:max-w-lg mx-auto"
                        style={{ color: "rgba(255, 255, 255, 0.75)" }}
                    >
                        Congrats! <span className="font-bold text-white tracking-wide">{businessName || "CasaDiEmO"}</span> is now a business on <span className="font-bold tracking-tight" style={{ color: "#2B365A" }}>Find</span><span className="font-bold tracking-tight" style={{ color: "#FF5722" }}>Me</span>.
                    </motion.p>
                </div>
            </div>

            {/* ── Footer Action (bottom-right) ───────────── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="absolute bottom-6 md:bottom-10 right-6 md:right-10 pt-2"
            >
                <button
                    onClick={onDone}
                    className="group flex items-center gap-3 bg-[#2B365A] text-white px-8 md:px-10 py-3 md:py-3.5 rounded-2xl md:rounded-[20px] font-bold text-base md:text-lg transition-all hover:scale-[1.03] active:scale-95 shadow-2xl hover:shadow-[#2B365A]/30 overflow-hidden relative"
                >
                    <span className="relative z-10">Done</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
                </button>
            </motion.div>

            {/* Decorative background element to balance the 777 width */}
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
        </div>
    );
}
