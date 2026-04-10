"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";

interface BusinessNameViewProps {
    suggestedName?: string;
    onNext: (name: string) => void;
}

export default function BusinessNameView({ onNext, suggestedName }: BusinessNameViewProps) {
    const [inputText, setInputText] = useState(suggestedName || "");

    return (
        <AmeStepLayout>
            {/* Center: AI Message */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6 max-w-2xl">
                <p className="text-base md:text-lg leading-relaxed text-white text-center font-medium">
                    Awesome. To get started, what is the name of your business?
                </p>
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={() => inputText && onNext(inputText)}
                placeholder="Type business name here..."
                disabled={!inputText}
            />
        </AmeStepLayout>
    );
}
