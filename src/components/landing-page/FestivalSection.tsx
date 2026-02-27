"use client";

import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
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

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]">
            {/* ... (rest of the background and fireworks) */}
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

            {/* Fireworks */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] z-1 opacity-60">
                <Image src="/kisspng-fireworks.png" alt="Fireworks" fill className="object-contain" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] z-0 opacity-40">
                <Image src="/Findme/kisspng-fireworks-diwali.png" alt="Fireworks" fill className="object-contain" />
            </div>
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[400px] md:h-[400px] z-1 opacity-40 rotate-45">
                <Image src="/kisspng-fireworks.png" alt="Fireworks" fill className="object-contain" />
            </div>

            {/* Central Content */}
            <div className="relative z-10 flex flex-col items-center text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] px-4">
                <div className="absolute inset-0 -m-6 md:-m-10 pointer-events-none overflow-hidden">
                    <div className="absolute top-4 left-[30%] w-2 h-2 md:w-3 md:h-3 bg-yellow-400 clip-triangle rotate-12" />
                    <div className="absolute top-[10%] right-[30%] w-1.5 h-1.5 md:w-2 md:h-2 bg-pink-500 rotate-45" />
                    <div className="absolute top-[30%] left-[25%] w-3 h-3 md:w-4 md:h-4 bg-blue-500 clip-triangle -rotate-12" />
                    <div className="absolute top-[50%] right-[20%] w-2 h-2 md:w-3 md:h-3 bg-green-500 clip-triangle rotate-[140deg]" />
                    <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rotate-12" />
                    <div className="absolute bottom-4 right-[35%] w-2 h-2 md:w-3 md:h-3 bg-red-500 clip-triangle-reverse" />
                </div>

                <div className="text-4xl md:text-7xl font-black tracking-tight mb-6 md:mb-8 drop-shadow-2xl">
                    <div className="flex flex-wrap gap-x-[0.1em] gap-y-2 justify-center mb-2">
                        {"FINDME".split("").map((letter, i) => (
                            <span key={i} className={`${getLetterColor(letter, i, "FINDME")} filter drop-shadow-md`}>{letter}</span>
                        ))}
                        <span className="mx-1 md:mx-2 text-white/80">•</span>
                        {"LAUNCH".split("").map((letter, i) => (
                            <span key={i} className={`${getLetterColor(letter, i, "LAUNCH")} filter drop-shadow-md`}>{letter}</span>
                        ))}
                    </div>
                    <div className="flex gap-[0.1em] justify-center">
                        {"FESTIVAL".split("").map((letter, i) => (
                            <span key={i} className={`${getLetterColor(letter, i, "FESTIVAL")} filter drop-shadow-md`}>{letter}</span>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <p className="text-white text-sm md:text-2xl font-bold tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2 md:gap-4 opacity-90 drop-shadow-lg">
                        DANCE <span className="text-white/40">•</span> MUSIC <span className="text-white/40">•</span> TECHNOLOGY
                    </p>
                </div>
            </div>

            {/* Bottom Left: Location */}
            <div className="absolute bottom-32 md:bottom-12 left-8 md:left-16 z-20 flex flex-col items-center">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white/20 overflow-hidden flex items-center justify-center bg-white mb-2">
                    <div className="w-full flex h-full">
                        <div className="w-1/3 bg-green-600" />
                        <div className="w-1/3 bg-white" />
                        <div className="w-1/3 bg-green-600" />
                    </div>
                </div>
                <span className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.4em] uppercase">UYO</span>
            </div>

            {/* Bottom: Music Player (Above Waitlist on mobile, Bottom-Right on desktop) */}
            <div className="absolute bottom-48 left-1/2 -translate-x-1/2 md:bottom-12 md:right-16 md:left-auto md:translate-x-0 z-20 flex flex-col items-center md:items-end">
                <p className="text-white/60 text-[8px] md:text-[10px] font-medium mb-2 md:mb-3">Theme sounds :</p>
                <div className="flex items-center gap-3 md:gap-4 bg-black/60 md:bg-black/40 md:backdrop-blur-md p-2 md:p-3 rounded-2xl border border-white/10 max-w-[280px] md:max-w-none shadow-2xl transition-all">
                    <div className={`w-10 h-10 md:w-12 md:h-12 bg-gray-800 rounded-full flex items-center justify-center ${isPlaying ? 'animate-spin-slow' : ''} flex-shrink-0 transition-transform duration-500`}>
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-[#f43f5e] rounded-full border-2 md:border-4 border-gray-900 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col min-w-0 items-start">
                        <span className="text-white font-bold text-xs md:text-sm truncate w-24 md:w-32">{currentSong.title}</span>
                        <span className="text-white/40 text-[8px] md:text-[10px] truncate w-24 md:w-32">{currentSong.artist}</span>
                    </div>
                    <div className="flex items-center gap-1.5 md:gap-2 ml-2 md:ml-4">
                        <SkipBack
                            className="w-3 h-3 md:w-4 md:h-4 text-white/60 cursor-pointer hover:text-white transition-colors active:scale-90"
                            onClick={handleBack}
                        />
                        <div
                            className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-white/10"
                            onClick={togglePlay}
                        >
                            {isPlaying ? (
                                <Pause className="w-3 h-3 md:w-4 md:h-4 text-black fill-black" />
                            ) : (
                                <Play className="w-3 h-3 md:w-4 md:h-4 text-black fill-black" />
                            )}
                        </div>
                        <SkipForward
                            className="w-3 h-3 md:w-4 md:h-4 text-white/60 cursor-pointer hover:text-white transition-colors active:scale-90"
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>

            {/* Waitlist - centered */}
            <Waitlist variant="dark" onJoin={onOpenWaitlist} />

            <style jsx>{`
                .clip-triangle {
                    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
                }
                .clip-triangle-reverse {
                    clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 8s linear infinite;
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
