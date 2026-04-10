"use client";

interface AmeOptionPillsProps<T extends string> {
    options: readonly T[];
    onSelect: (value: T) => void;
}

/**
 * AmeOptionPills — Shared pill-button selection pattern.
 *
 * Previously duplicated across FollowupView, Followup2View, and OwnershipView
 * with identical button markup. Now a single reusable generic component.
 */
export default function AmeOptionPills<T extends string>({
    options,
    onSelect,
}: AmeOptionPillsProps<T>) {
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 w-full max-w-lg">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onSelect(option)}
                    className="bg-white/5 border border-white/10 rounded-full px-5 py-2 text-white text-xs font-medium hover:bg-white/10 hover:border-blue-500/30 transition-all flex items-center gap-2 group whitespace-nowrap"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-xs">{option}</span>
                    <span className="opacity-40 group-hover:opacity-100 transition-opacity ml-1">
                        →
                    </span>
                </button>
            ))}
        </div>
    );
}
