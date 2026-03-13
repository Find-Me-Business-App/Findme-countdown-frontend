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
    const blurClass = config.blur === "xl" ? "md:backdrop-blur-xl" :
        config.blur === "3xl" ? "md:backdrop-blur-3xl" :
            config.blur === "none" ? "" :
                "md:backdrop-blur-md";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClick}
            className="absolute inset-0"
            style={{
                backgroundColor: "var(--backdrop-color)",
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
