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
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-2 md:px-6 w-full max-w-2xl mx-auto">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    Almost done! What is your ownership structure?
                </p>
                <AmeOptionPills options={OPTIONS} onSelect={onSelect} />

                <AmeTextarea
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={() => onSelect(inputText || "Self owned")}
                    placeholder="Type here..."
                />
            </div>
        </AmeStepLayout>
    );
}
