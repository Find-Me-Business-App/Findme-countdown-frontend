"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface StickyScrollSectionProps {
    children: ReactNode;
    /** Extra scroll runway height (default: "150vh") */
    scrollHeight?: string;
    /** Disable the scale/fade exit effect (useful for the last section) */
    disableExit?: boolean;
}

export default function StickyScrollSection({
    children,
    scrollHeight = "150vh",
    disableExit = false,
}: StickyScrollSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // First ~60% is pinned, last ~40% drives the exit animation
    const scale = useTransform(scrollYProgress, [0.6, 1], [1, 0.92]);
    const opacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]);
    const borderRadius = useTransform(scrollYProgress, [0.6, 1], [0, 40]);

    return (
        <div ref={containerRef} style={{ height: scrollHeight }} className="relative">
            <motion.div
                style={
                    disableExit
                        ? { position: "sticky" as const, top: 0 }
                        : {
                            position: "sticky" as const,
                            top: 0,
                            scale,
                            opacity,
                            borderRadius,
                        }
                }
                className="h-screen w-full overflow-hidden origin-center"
            >
                {children}
            </motion.div>
        </div>
    );
}
