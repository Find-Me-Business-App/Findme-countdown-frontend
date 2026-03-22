"use client";

import { motion } from "framer-motion";
import { THEME } from "@/config/theme";
import { ReactNode } from "react";

interface ModalContainerProps {
    children: ReactNode;
    className?: string;
    type?: "registration" | "info" | "waitlist";
    maxWidth?: string;
    style?: React.CSSProperties;
    overflow?: string;
}

export default function ModalContainer({ 
    children, 
    className = "", 
    type = "registration",
    maxWidth,
    style = {},
    overflow = "overflow-y-auto"
}: ModalContainerProps) {
    const bgConfig = (THEME.colors.background as Record<string, { mobile: string; desktop: string }>)[type] || THEME.colors.background.registration;
    const borderRadius = (THEME.variants.borderRadius as Record<string, string>)[type] || THEME.variants.borderRadius.registration;
    
    // Default max widths based on type if not provided
    const defaultMaxWidth = type === "registration" ? "max-w-[420px] md:max-w-[760px]" : "max-w-[420px] md:max-w-[900px]";
    const finalMaxWidth = maxWidth || defaultMaxWidth;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full ${finalMaxWidth} h-auto max-h-[85vh] md:max-h-none ${overflow} ${borderRadius} shadow-2xl border scrollbar-hide ${className}`}
            style={{ 
                willChange: "transform, opacity",
                backgroundColor: "var(--modal-bg)",
                borderColor: "var(--modal-border)",
                boxShadow: typeof window !== 'undefined' && window.innerWidth >= 768 ? THEME.colors.shadows.standard : undefined,
                ...style,
                // Use CSS variables for responsive background and border
                "--modal-bg": bgConfig.mobile,
                "--modal-border": "#ffffff",
                "--modal-separator": THEME.colors.components.separator.mobile,
            } as React.CSSProperties}
        >
            <style jsx>{`
                @media (min-width: 768px) {
                    div {
                        --modal-bg: ${bgConfig.desktop} !important;
                        --modal-border: ${type === 'info' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.1)'} !important;
                        --modal-separator: ${THEME.colors.components.separator.desktop} !important;
                    }
                }
            `}</style>
            {children}
        </motion.div>
    );
}
