"use client";

import { THEME } from "@/config/theme";

interface AmeStepLayoutProps {
    children: React.ReactNode;
    /** Override the default "items-center" alignment on the outer container */
    align?: "items-center" | "items-start";
}

/**
 * AmeStepLayout — Shared wrapper for every AME step view.
 *
 * Renders the consistent header block (accent bar, title, AME subtitle)
 * that was previously duplicated across all 8+ view components.
 * Children slot receives the center content area and optional bottom input.
 */
export default function AmeStepLayout({ children, align = "items-center" }: AmeStepLayoutProps) {
    return (
        <div className={`flex flex-col w-full h-full relative overflow-hidden ${align} justify-between font-sans`}>
            {/* ─── Header (compact) ─── */}
            <div className="shrink-0 pt-0.5 md:pt-1 w-full text-left">
                <div
                    className="w-10 md:w-14 h-[2px] mb-2 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2 className="text-base md:text-xl font-bold mb-0 tracking-tight text-white leading-tight">
                    Business registration
                </h2>
                <p className="text-[10px] md:text-xs leading-snug max-w-xl opacity-70 text-white/70 mt-0.5">
                    Let{" "}
                    <span style={{ color: THEME.colors.text.accent }}>AM</span>
                    <span style={{ color: THEME.colors.text.danger }}>E</span>{" "}
                    understand more about your business
                </p>
            </div>

            {/* ─── Step Content ─── */}
            {children}
        </div>
    );
}
