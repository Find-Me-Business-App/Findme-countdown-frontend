"use client";

import Image from "next/image";
import { THEME } from "@/config/theme";

interface AmeTextareaProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    /** Disables the send button when there's no valid input */
    disabled?: boolean;
}

/**
 * AmeTextarea — Shared bottom textarea + send-button pattern.
 *
 * Previously duplicated across 7 view components with identical
 * styling, structure, and send-button behavior. Now a single source.
 */
export default function AmeTextarea({
    value,
    onChange,
    onSubmit,
    placeholder = "Type here...",
    disabled = false,
}: AmeTextareaProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !disabled) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-full relative group shrink-0 px-1 md:px-2 pb-1">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full border rounded-2xl md:rounded-[28px] px-4 py-3 md:px-5 md:py-4 pr-12 text-sm focus:outline-none transition-all resize-none min-h-[58px] md:min-h-[72px] shadow-inner"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderColor: "rgba(255, 255, 255, 0.1)",
                    color: THEME.colors.text.primary,
                }}
                placeholder={placeholder}
                rows={1}
            />
            <button
                onClick={onSubmit}
                disabled={disabled}
                className={`absolute bottom-4 right-5 md:bottom-4.5 md:right-6 hover:scale-110 transition-transform active:scale-95 z-20 ${
                    disabled ? "opacity-20 pointer-events-none" : "opacity-100"
                }`}
            >
                <Image
                    src={THEME.assets.icons.contact.send}
                    alt="Submit"
                    width={24}
                    height={18}
                    className="md:w-7 md:h-5"
                />
            </button>
        </div>
    );
}
