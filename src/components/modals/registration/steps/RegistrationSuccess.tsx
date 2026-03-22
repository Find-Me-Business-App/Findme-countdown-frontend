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
        <div className="flex flex-col w-full min-h-[400px] md:h-[450px] relative px-2 py-4 md:py-6 items-center justify-center text-center">
            {/* Header Section (Absolute top) */}
            <div className="absolute top-4 left-2 text-left w-full pl-4 md:pl-6">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 80 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-[3.5px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Welcome
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-lg md:text-xl font-medium"
                    style={{ color: "#2B365A" }}
                >
                    {userName || "Francis"}
                </motion.p>
            </div>

            {/* Central Success Icon and Message */}
            <div className="flex flex-col items-center gap-8 mt-20">
                <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.6
                    }}
                    className="w-18 h-18 md:w-32 md:h-32 flex items-center justify-center relative shadow-2xl rounded-full overflow-hidden"
                >
                    {/* Spinning background circle (Ellipse 715.svg) */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 z-0"
                    >
                        <Image 
                            src="/icons/Ellipse 715.svg" 
                            alt="Background Circle" 
                            fill
                            className="object-contain"
                        />
                    </motion.div>

                    {/* Static icon (success.svg) pop-in + spin */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                        animate={{ 
                            opacity: 1, 
                            scale: 1.15, 
                            rotate: 360 
                        }}
                        transition={{ 
                            opacity: { duration: 0.4, delay: 1.0 },
                            scale: { duration: 0.5, delay: 1.0, type: "spring" },
                            rotate: { duration: 10, delay: 1.0, repeat: Infinity, ease: "linear" }
                        }}
                        className="relative z-10 w-14 h-14 md:w-28 md:h-28 flex items-center justify-center -translate-y-px"
                    >
                        <Image 
                            src="/icons/success.svg" 
                            alt="Success" 
                            width={112} 
                            height={112}
                            className="object-contain"
                        />
                    </motion.div>
                </motion.div>
                
                <div className="flex flex-col gap-6 mt-4">
                    <h3 
                        className="text-2xl md:text-[28px] font-bold pb-2"
                        style={{ color: "white" }}
                    >
                        Registration complete
                    </h3>
                    <p 
                        className="text-lg md:text-xl font-normal max-w-md mx-auto mt-2"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                        Congrats! <span className="font-bold" style={{ color: "white" }}>{businessName || "CasaDiEmO"}</span> is now a business on <span className="font-medium" style={{ color: "#2B365A" }}>Find</span><span className="font-medium" style={{ color: "#FF5722" }}>Me</span>.
                    </p>
                </div>
            </div>

            {/* Done Button (Bottom Right) */}
            <button
                onClick={onDone}
                className="absolute bottom-6 right-6 text-lg md:text-xl font-bold transition-all hover:scale-105 active:scale-95"
                style={{ color: "white" }}
            >
                Done
            </button>
        </div>
    );
}
