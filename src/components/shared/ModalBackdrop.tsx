"use client";

import { motion } from "framer-motion";
import { THEME } from "@/config/theme";

interface ModalBackdropProps {
    onClick: () => void;
    type?: "registration" | "info" | "waitlist" | "default";
}

export default function ModalBackdrop({ onClick, type = "default" }: ModalBackdropProps) {
    const config = THEME.colors.backdrop[type];

    // Convert blur string to tailwind class
    // Convert blur string to tailwind class - responsive-friendly
    const blurClass = (config.blur as string) === "xl" ? "backdrop-blur-xl" :
        (config.blur as string) === "sm" ? "backdrop-blur-sm" :
            (config.blur as string) === "3xl" ? "backdrop-blur-3xl" :
                (config.blur as string) === "none" ? "" :
                    "backdrop-blur-md";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className="absolute inset-0 z-0"
            style={{
                backgroundColor: "transparent",
            }}
        >
            <div
                className={`absolute inset-0 ${blurClass}`}
                style={{
                    backgroundColor: typeof window !== 'undefined' && window.innerWidth < 768 ? config.mobile : config.desktop
                }}
            />
        </motion.div>
    );
}
