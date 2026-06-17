"use client";

import { ReactNode, ElementType } from "react";
import { motion } from "framer-motion";
import { SMOOTH_EASE } from "@/data/landing-page";

interface RevealMorphProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    as?: ElementType;
}

export default function RevealMorph({ children, className = "", delay = 0, as: Component = motion.div }: RevealMorphProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ComponentToRender = Component as any;
    return (
        <ComponentToRender
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.03, delayChildren: delay }
                }
            }}
            className={className}
        >
            {/* logic remains same */}
            {typeof children === "string" ? (
                children.split(" ").map((word, i) => (
                    <motion.span
                        key={i}
                        variants={{
                            hidden: { opacity: 0, filter: "blur(6px)", y: 15 },
                            visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: SMOOTH_EASE } }
                        }}
                        className="inline-block mr-[0.2em]"
                    >
                        {word}
                    </motion.span>
                ))
            ) : (
                <motion.span
                    variants={{
                        hidden: { opacity: 0, filter: "blur(6px)", y: 15 },
                        visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.5, ease: SMOOTH_EASE } }
                    }}
                    className="inline-block"
                >
                    {children}
                </motion.span>
            )}
        </ComponentToRender>
    );
}
