"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useMemo } from "react";
import FlipCard from "./FlipCard";

const smoothEase = [0.22, 1, 0.36, 1] as const;

/**
 * Countdown Section
 * Displays a premium 3D flip timer targeting April 27, 3:00 PM.
 */
export default function Countdown() {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const calculateTimeLeft = useCallback(() => {
        const targetDate = new Date("2026-04-27T15:00:00");
        const now = new Date();
        const difference = targetDate.getTime() - now.getTime();

        if (difference > 0) {
            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            });
        } else {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        }
    }, []);

    useEffect(() => {
        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    // DRY: Define the time units structure
    const units = useMemo(() => [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
    ], [timeLeft]);

    return (
        <div className="mt-8 md:mt-12 text-center z-10 pb-6 md:pb-10">
            {/* "Launching" label — premium letter-spacing animation */}
            <motion.p
                initial={{ opacity: 0, letterSpacing: "-0.1em", filter: "blur(4px)" }}
                whileInView={{ opacity: 1, letterSpacing: "0.5em", filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.8, ease: smoothEase }}
                className="text-white/80 uppercase text-[10px] md:text-[13px] font-bold mb-6 md:mb-10 tracking-[0.2em]"
            >
                Launching In
            </motion.p>

            {/* Countdown grid — staggered entry */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } }
                }}
                className="flex gap-4 md:gap-8 justify-center"
            >
                {units.map((unit) => (
                    <motion.div
                        key={unit.label}
                        variants={{
                            hidden: { opacity: 0, scale: 0.8, y: 30, filter: "blur(10px)" },
                            visible: { 
                                opacity: 1, 
                                scale: 1, 
                                y: 0, 
                                filter: "blur(0px)",
                                transition: { duration: 0.8, ease: smoothEase } 
                            }
                        }}
                    >
                        <FlipCard value={unit.value} label={unit.label} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
