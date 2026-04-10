"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";
import AmeOptionPills from "./shared/AmeOptionPills";

interface Followup2ViewProps {
    onSelect: (nature: "Digital" | "Physical") => void;
}

const OPTIONS = ["Digital", "Physical"] as const;

export default function Followup2View({ onSelect }: Followup2ViewProps) {
    const [inputText, setInputText] = useState("");

    return (
        <AmeStepLayout>
            {/* Center: AI Message & Options */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 max-w-2xl w-full">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    The product your business is selling, is it:
                </p>
                <AmeOptionPills options={OPTIONS} onSelect={onSelect} />
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={() => onSelect("Digital")}
                placeholder="Type here..."
            />
        </AmeStepLayout>
    );
}
