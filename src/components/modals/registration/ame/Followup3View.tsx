"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";

interface Followup3ViewProps {
    onSelect: (count: string) => void;
}

export default function Followup3View({ onSelect }: Followup3ViewProps) {
    const [inputText, setInputText] = useState("");

    const extractNumber = (text: string) => {
        const match = text.match(/\d+/);
        return match ? match[0] : "";
    };

    const handleSend = () => {
        const count = extractNumber(inputText);
        if (count) {
            onSelect(count);
        } else if (inputText.toLowerCase().includes("no") || inputText.toLowerCase().includes("none")) {
            onSelect("0");
        }
    };

    return (
        <AmeStepLayout>
            {/* Center: AI Message & Input */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 max-w-2xl w-full">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    Alright you have a great business setup so far . Lets finish it up. How many staff are working in your business?
                </p>

                <div className="flex flex-col items-center gap-2">
                    <input
                        type="number"
                        value={extractNumber(inputText)}
                        readOnly
                        className="w-full max-w-[120px] bg-white/10 border border-blue-500/30 rounded-2xl px-4 py-4 text-white text-center focus:outline-none transition-all shadow-lg text-2xl font-bold"
                        placeholder="0"
                    />
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Extracted Count</p>
                </div>
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={handleSend}
                placeholder="Type here (e.g. 'We are 70')"
                disabled={!inputText}
            />
        </AmeStepLayout>
    );
}
