"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";
import AmeOptionPills from "./shared/AmeOptionPills";

interface OwnershipViewProps {
    onSelect: (type: string) => void;
}

const OPTIONS = ["Self owned", "Partnership", "Corporation", "Freelancer", "LLC"] as const;

export default function OwnershipView({ onSelect }: OwnershipViewProps) {
    const [inputText, setInputText] = useState("");

    return (
        <AmeStepLayout>
            {/* Center: AI Message & Options */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 max-w-2xl w-full">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    Almost done! What is your ownership structure?
                </p>
                <AmeOptionPills options={OPTIONS} onSelect={onSelect} />
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={() => onSelect(inputText || "Self owned")}
                placeholder="Type here..."
            />
        </AmeStepLayout>
    );
}
