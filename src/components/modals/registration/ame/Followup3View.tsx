"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";
import AmeOptionPills from "./shared/AmeOptionPills";

interface Followup3ViewProps {
    onSelect: (count: string) => void;
}

const OPTIONS = ["1-5", "6-20", "21-50", "50+"] as const;

export default function Followup3View({ onSelect }: Followup3ViewProps) {
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (inputText.trim()) {
            onSelect(inputText.trim());
        }
    };

    return (
        <AmeStepLayout>
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-2 md:px-6 w-full max-w-2xl mx-auto">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    Alright, you have a great business setup so far. Let&apos;s finish it up. How many people work in your business?
                </p>

                <AmeOptionPills options={OPTIONS} onSelect={onSelect} />

                <AmeTextarea
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={handleSend}
                    placeholder="Type here (e.g. 'We are 70')"
                />
            </div>
        </AmeStepLayout>
    );
}
