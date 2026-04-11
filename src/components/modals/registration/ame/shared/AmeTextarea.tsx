"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { THEME } from "@/config/theme";
import { motion, AnimatePresence } from "framer-motion";

interface AmeTextareaProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    placeholder?: string;
    /** Disables the send button when there's no valid input */
    disabled?: boolean;
}

export default function AmeTextarea({
    value,
    onChange,
    onSubmit,
    placeholder = "Type here...",
    disabled = false,
}: AmeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize logic
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "0px";
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.min(Math.max(scrollHeight, 58), 200)}px`;
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !disabled) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto relative group shrink-0 px-2 pb-4 md:pb-12">
            <div className="relative bg-white/5 border border-white/10 rounded-2xl md:rounded-[24px] overflow-hidden focus-within:border-white/20 transition-all">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent px-4 py-3 md:px-6 md:py-4 pr-10 text-[13px] md:text-sm focus:outline-none transition-all resize-none overflow-y-auto ame-no-scrollbar min-h-[50px] md:min-h-[64px]"
                    style={{
                        color: THEME.colors.text.primary,
                        lineHeight: "1.5",
                    }}
                    placeholder={placeholder}
                />
                
                <div className="absolute top-1/2 -translate-y-1/2 right-3 z-20">
                    <button
                        onClick={onSubmit}
                        disabled={disabled}
                        className={`transition-all active:scale-90 ${disabled ? "opacity-10 cursor-not-allowed grayscale" : "hover:opacity-80"}`}
                    >
                        <Image
                            src={THEME.assets.icons.contact.send}
                            alt="Submit"
                            width={32}
                            height={24}
                            className="md:w-12 md:h-9"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
