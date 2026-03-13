"use client";

import { X } from "lucide-react";
import { THEME } from "@/config/theme";

interface ModalCloseButtonProps {
    onClick: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function ModalCloseButton({ onClick, className = "", style = {} }: ModalCloseButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`absolute top-6 right-6 z-30 transition-colors ${className}`}
            style={{ color: THEME.colors.text.muted, ...style }}
            onMouseEnter={(e) => (e.currentTarget.style.color = THEME.colors.text.primary)}
            onMouseLeave={(e) => (e.currentTarget.style.color = THEME.colors.text.muted)}
        >
            <X className="w-6 h-6 md:w-8 md:h-8" />
        </button>
    );
}
