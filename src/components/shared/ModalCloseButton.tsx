"use client";

import { X } from "lucide-react";
import { THEME } from "@/config/theme";

interface ModalCloseButtonProps {
    onClick: () => void;
    onBack?: () => void;
    className?: string;
    style?: React.CSSProperties;
}

export default function ModalCloseButton({ onClick, onBack, className = "", style = {} }: ModalCloseButtonProps) {
    if (!onBack) {
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

    return (
        <div className={`absolute top-6 right-6 z-[60] flex items-center gap-3 ${className}`}>
            <button
                onClick={onBack}
                className="text-sm md:text-base font-medium opacity-60 hover:opacity-100 transition-opacity whitespace-nowrap"
                style={{ color: style.color || THEME.colors.text.muted }}
            >
                Back
            </button>
            <button
                onClick={onClick}
                className="transition-colors"
                style={{ color: THEME.colors.text.muted, ...style }}
                onMouseEnter={(e) => (e.currentTarget.style.color = THEME.colors.text.primary)}
                onMouseLeave={(e) => (e.currentTarget.style.color = THEME.colors.text.muted)}
            >
                <X className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </div>
    );
}
