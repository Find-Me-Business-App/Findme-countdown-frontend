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
}

export default function ModalContainer({ 
    children, 
    className = "", 
    type = "registration",
    maxWidth,
    style = {}
}: ModalContainerProps) {
    const bgConfig = (THEME.colors.background as any)[type] || THEME.colors.background.registration;
    const borderRadius = (THEME.variants.borderRadius as any)[type] || THEME.variants.borderRadius.registration;
    
    // Default max widths based on type if not provided
    const defaultMaxWidth = type === "registration" ? "max-w-[420px] md:max-w-[760px]" : "max-w-[420px] md:max-w-[900px]";
    const finalMaxWidth = maxWidth || defaultMaxWidth;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`relative w-full ${finalMaxWidth} h-auto max-h-[90vh] md:max-h-none overflow-y-auto ${borderRadius} shadow-2xl border ${type === 'info' ? 'border-white/5' : 'border-white/10'} ${className}`}
            style={{ 
                willChange: "transform, opacity",
                backgroundColor: typeof window !== 'undefined' && window.innerWidth < 768 ? bgConfig.mobile : bgConfig.desktop,
                boxShadow: typeof window !== 'undefined' && window.innerWidth >= 768 ? THEME.colors.shadows.standard : undefined,
                ...style
            }}
        >
            {children}
        </motion.div>
    );
}
