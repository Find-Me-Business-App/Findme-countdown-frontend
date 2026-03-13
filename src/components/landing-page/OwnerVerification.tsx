"use client";

import { THEME } from "@/config/theme";

interface OwnerVerificationProps {
    onSelect: (isOwner: boolean) => void;
    onBack?: () => void;
}

export default function OwnerVerification({ onSelect, onBack }: OwnerVerificationProps) {
    return (
        <div className="flex flex-col w-full h-[400px] md:h-[450px] relative px-2 py-4">
            {/* Header Section */}
            <div className="mb-12">
                <div
                    className="w-20 h-[3.5px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Personal Information
                </h2>
                <p
                    className="text-lg md:text-xl opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>
            </div>

            {/* Question */}
            <div className="flex-1 flex flex-col justify-start pt-4">
                <h3 
                    className="text-xl md:text-2xl font-bold mb-12"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Are you the business owner?
                </h3>
            </div>

            {/* Buttons - positioned towards the bottom corners like the design */}
            <div className="flex items-center justify-between w-full pb-8">
                <button
                    onClick={() => onSelect(true)}
                    className="text-2xl md:text-3xl font-bold transition-all hover:scale-105 active:scale-95"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Yes
                </button>
                <button
                    onClick={() => onSelect(false)}
                    className="text-2xl md:text-3xl font-bold transition-all hover:scale-105 active:scale-95 opacity-80"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    No
                </button>
            </div>

            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-2 text-sm font-medium hover:underline opacity-40"
                    style={{ color: THEME.colors.text.muted }}
                >
                    Back
                </button>
            )}
        </div>
    );
}
