"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useRef, useMemo } from "react";

interface FlipCardProps {
    value: string | number;
    label?: string;
}

/**
 * FlipCard Component
 * Implements a premium 3D mechanical flip clock animation.
 */
const FlipCard = React.memo(({ value, label }: FlipCardProps) => {
    const [prevValue, setPrevValue] = useState(value);
    const [currentValue, setCurrentValue] = useState(value);
    const [isFlipping, setIsFlipping] = useState(false);
    
    const firstRender = useRef(true);

    useEffect(() => {
        // Skip animation on the first load
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (value !== currentValue) {
            setPrevValue(currentValue);
            setIsFlipping(true);
            
            const timer = setTimeout(() => {
                setCurrentValue(value);
                setIsFlipping(false);
            }, 600); // Animation duration synchronized with CSS
            
            return () => clearTimeout(timer);
        }
    }, [value, currentValue]);

    const format = (v: string | number) => String(v).padStart(2, '0');
    
    // Memoize display strings for performance
    const nextDisplay = useMemo(() => format(value), [value]);
    const prevDisplay = useMemo(() => format(prevValue), [prevValue]);
    const currentDisplay = useMemo(() => format(currentValue), [currentValue]);

    return (
        <div className="flex flex-col items-center gap-3 md:gap-4 group">
            <div className="relative w-16 h-18 md:w-24 md:h-28 perspective-1000 transform-gpu transition-transform duration-500 group-hover:scale-105">
                {/* 1. Static Top Half (Target Value) */}
                <div className="absolute inset-0 flex flex-col">
                    <div className="h-1/2 bg-white/20 backdrop-blur-2xl border-t border-x border-white/20 rounded-t-2xl overflow-hidden flex items-end justify-center relative">
                        {/* Specular highlight */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                        <span className="text-white text-3xl md:text-5xl font-bold translate-y-1/2 select-none tracking-tighter drop-shadow-2xl">
                            {isFlipping ? nextDisplay : currentDisplay}
                        </span>
                    </div>
                </div>

                {/* 2. Static Bottom Half (Current settled value) */}
                <div className="absolute inset-0 flex flex-col">
                    <div className="h-1/2 bg-transparent" />
                    <div className="h-1/2 bg-white/5 backdrop-blur-[40px] border-b border-x border-white/20 rounded-b-2xl overflow-hidden flex items-start justify-center relative">
                        {/* Ambient shadow */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        <span className="text-white text-3xl md:text-5xl font-bold -translate-y-1/2 select-none tracking-tighter drop-shadow-2xl">
                            {currentDisplay}
                        </span>
                    </div>
                </div>

                {/* 3. Flipping Card Layer */}
                <AnimatePresence mode="popLayout" initial={false}>
                    {isFlipping && (
                        <div className="absolute inset-0 flex flex-col preserve-3d pointer-events-none z-30">
                            {/* Falling Top Half (Current -> hidden) */}
                            <motion.div
                                initial={{ rotateX: 0 }}
                                animate={{ rotateX: -180 }}
                                transition={{ duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                                style={{ transformOrigin: "bottom" }}
                                className="h-1/2 bg-white/10 backdrop-blur-[40px] border-t border-x border-white/20 rounded-t-2xl overflow-hidden flex items-end justify-center backface-hidden preserve-3d shadow-2xl"
                            >
                                <span className="text-white text-3xl md:text-5xl font-bold translate-y-1/2 select-none tracking-tighter">
                                    {prevDisplay}
                                </span>
                            </motion.div>

                            {/* Rising Bottom Half (new value) */}
                            <motion.div
                                initial={{ rotateX: 180 }}
                                animate={{ rotateX: 0 }}
                                transition={{ duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }}
                                style={{ transformOrigin: "top" }}
                                className="h-1/2 bg-white/5 backdrop-blur-[40px] border-b border-x border-white/20 rounded-b-2xl overflow-hidden flex items-start justify-center backface-hidden preserve-3d shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                <span className="text-white text-3xl md:text-5xl font-bold -translate-y-1/2 select-none tracking-tighter">
                                    {nextDisplay}
                                </span>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Decorative Mechanical Details */}
                <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-black/50 z-40 transform -translate-y-1/2 shadow-sm" />
                <div className="absolute top-1/2 -left-1 w-2 h-4 bg-white/30 rounded-full z-50 transform -translate-y-1/2 backdrop-blur-md shadow-lg" />
                <div className="absolute top-1/2 -right-1 w-2 h-4 bg-white/30 rounded-full z-50 transform -translate-y-1/2 backdrop-blur-md shadow-lg" />
            </div>
            
            {label && (
                <span className="text-white/30 text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mt-1 group-hover:text-white/60 transition-colors duration-500">
                    {label}
                </span>
            )}
        </div>
    );
});

FlipCard.displayName = "FlipCard";

export default FlipCard;
