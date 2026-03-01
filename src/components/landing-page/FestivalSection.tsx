"use client";

import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { motion } from "framer-motion";
import { useFestivalPlayer } from "@/hooks/useFestivalPlayer";
import Waitlist from "./Waitlist";

interface FestivalSectionProps {
    onOpenWaitlist?: () => void;
}

export default function FestivalSection({ onOpenWaitlist }: FestivalSectionProps) {
    const {
        currentSong,
        isPlaying,
        togglePlay,
        handleNext,
        handleBack
    } = useFestivalPlayer();

    const letterVariants = {
        hidden: { y: 40, opacity: 0, scale: 0.5, rotate: -5, filter: "blur(4px)" },
        visible: (i: number) => ({
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 150,
                delay: i * 0.025,
            }
        })
    };

    const floatingVariants = {
        animate: (i: number) => ({
            y: [0, -8, 0],
            x: [0, i % 2 === 0 ? 6 : -6, 0],
            rotate: [0, i % 2 === 0 ? 2 : -2, 0],
            transition: {
                duration: 6 + (i % 3),
                repeat: Infinity,
                ease: "easeInOut" as const
            }
        })
    };

    return (
        <section className="relative min-h-svh w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/section3-background.png"
                    alt="Festival Background"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Fireworks with Drift */}
            <motion.div
                custom={1}
                variants={floatingVariants}
                animate="animate"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] z-1 opacity-60 pointer-events-none"
            >
                <Image src="/kisspng-fireworks.png" alt="Fireworks" fill className="object-contain" />
            </motion.div>
            <motion.div
                custom={2}
                variants={floatingVariants}
                animate="animate"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] z-0 opacity-40 pointer-events-none"
            >
                <Image src="/kisspng-fireworks-diwali.png" alt="Fireworks" fill className="object-contain" />
            </motion.div>

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Decorative drifting shapes */}
                <div className="absolute inset-0 -m-6 md:-m-10 pointer-events-none overflow-hidden">
                    {[
                        { color: "bg-yellow-400", clip: "clip-triangle", pos: "top-4 left-[30%]" },
                        { color: "bg-pink-500", clip: "", pos: "top-[10%] right-[30%]" },
                        { color: "bg-blue-500", clip: "clip-triangle", pos: "top-[30%] left-[25%]" },
                        { color: "bg-green-500", clip: "clip-triangle", pos: "top-[50%] right-[20%]" },
                    ].map((shape, i) => (
                        <motion.div
                            key={i}
                            custom={i}
                            variants={floatingVariants}
                            animate="animate"
                            className={`absolute ${shape.pos} w-2 h-2 md:w-3 md:h-3 ${shape.color} ${shape.clip}`}
                        />
                    ))}
                </div>

                <div className="text-4xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 drop-shadow-lg">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20px" }}
                        className="flex flex-wrap gap-x-[0.1em] gap-y-2 justify-center mb-2"
                    >
                        {"FINDME".split("").map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={letterVariants}
                                className={`${getLetterColor(letter, i, "FINDME")} filter drop-shadow-md inline-block`}
                            >
                                {letter}
                            </motion.span>
                        ))}
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.8 }}
                            transition={{ delay: 0.3 }}
                            className="mx-1 md:mx-2 text-white/80"
                        >•</motion.span>
                        {"LAUNCH".split("").map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i + 7}
                                variants={letterVariants}
                                className={`${getLetterColor(letter, i, "LAUNCH")} filter drop-shadow-md inline-block`}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20px" }}
                        className="flex gap-[0.1em] justify-center"
                    >
                        {"FESTIVAL".split("").map((letter, i) => (
                            <motion.span
                                key={i}
                                custom={i + 14}
                                variants={letterVariants}
                                className={`${getLetterColor(letter, i, "FESTIVAL")} filter drop-shadow-md inline-block`}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, letterSpacing: "-0.2em", filter: "blur(4px)" }}
                    whileInView={{ opacity: 0.9, letterSpacing: "0.2em", filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                    <p className="text-white text-[10px] md:text-2xl font-bold flex items-center gap-2 md:gap-4 drop-shadow-lg uppercase">
                        DANCE <span className="text-white/40">•</span> MUSIC <span className="text-white/40">•</span> TECHNOLOGY
                    </p>
                </motion.div>
            </div>

            {/* Bottom Left: Location */}
            <motion.div
                initial={{ x: -50, opacity: 0, rotate: -10 }}
                whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.6 }}
                className="absolute bottom-16 md:bottom-12 left-8 md:left-16 z-20 flex flex-col items-center"
            >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-white mb-2 shadow-xl">
                    <div className="w-full flex h-full">
                        <div className="w-1/3 bg-green-600" />
                        <div className="w-1/3 bg-white" />
                        <div className="w-1/3 bg-green-600" />
                    </div>
                </div>
                <span className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase">UYO</span>
            </motion.div>

            {/* Bottom Right: Music Player */}
            <motion.div
                initial={{ x: 50, opacity: 0, rotate: 10 }}
                whileInView={{ x: 0, opacity: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", damping: 15, stiffness: 100, delay: 0.7 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 md:bottom-12 md:right-16 md:left-auto md:translate-x-0 z-20 flex flex-col items-center md:items-end"
            >
                <p className="text-white/60 text-[8px] md:text-[10px] font-medium mb-2 md:mb-3">Theme sounds :</p>
                <div className="flex items-center gap-3 md:gap-4 bg-black/80 md:bg-black/40 md:backdrop-blur-md p-2 md:p-3 rounded-2xl border border-white/10 max-w-[280px] md:max-w-none shadow-2xl transition-all group hover:border-white/30">
                    <motion.div
                        animate={isPlaying ? { rotate: 360 } : {}}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-[#f43f5e] rounded-full border-2 md:border-4 border-gray-900 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                        </div>
                    </motion.div>
                    <div className="flex flex-col min-w-0 items-start">
                        <span className="text-white font-bold text-xs md:text-sm truncate w-24 md:w-32">{currentSong.title}</span>
                        <span className="text-white/40 text-[8px] md:text-[10px] truncate w-24 md:w-32">{currentSong.artist}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 ml-2 md:ml-4">
                        <SkipBack
                            className="w-3 h-3 md:w-4 md:h-4 text-white/60 cursor-pointer hover:text-white transition-colors active:scale-90"
                            onClick={handleBack}
                        />
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-lg shadow-white/10"
                            onClick={togglePlay}
                        >
                            {isPlaying ? (
                                <Pause className="w-3 h-3 md:w-4 md:h-4 text-black fill-black" />
                            ) : (
                                <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black" />
                            )}
                        </motion.div>
                        <SkipForward
                            className="w-3 h-3 md:w-4 md:h-4 text-white/60 cursor-pointer hover:text-white transition-colors active:scale-90"
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </motion.div>

            {/* Waitlist - centered */}
            <Waitlist variant="dark" onJoin={onOpenWaitlist} />

            <style jsx>{`
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
            `}</style>
        </section>
    );
}

function getLetterColor(letter: string, index: number, word: string) {
    if (word === "FINDME") {
        const colors = ["text-blue-500", "text-white/60", "text-red-500", "text-blue-500", "text-pink-500", "text-red-500"];
        return colors[index % colors.length];
    }
    if (word === "LAUNCH") {
        const colors = ["text-yellow-400", "text-blue-500", "text-white", "text-pink-500", "text-blue-500", "text-orange-500"];
        return colors[index % colors.length];
    }
    if (word === "FESTIVAL") {
        const colors = ["text-blue-500", "text-yellow-400", "text-red-500", "text-white", "text-blue-500", "text-white", "text-pink-500", "text-yellow-400"];
        return colors[index % colors.length];
    }
    return "text-white";
}
