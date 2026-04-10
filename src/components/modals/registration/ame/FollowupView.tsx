"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";
import AmeOptionPills from "./shared/AmeOptionPills";

interface FollowupViewProps {
    onSelect: (type: "Product" | "Service" | "Both") => void;
}

const OPTIONS = ["Product", "Service", "Both"] as const;

export default function FollowupView({ onSelect }: FollowupViewProps) {
    const [inputText, setInputText] = useState("");

    return (
        <AmeStepLayout>
            {/* Center: AI Message & Options */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 max-w-2xl w-full">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    Okay Locking in on those locations, what does your business offer:
                </p>
                <AmeOptionPills options={OPTIONS} onSelect={onSelect} />
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={() => onSelect("Both")}
                placeholder="Type here..."
            />
        </AmeStepLayout>
    );
}
