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
            <div className="flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 px-2 md:px-6 w-full max-w-2xl">
                <p className="text-base md:text-lg leading-relaxed text-white text-center font-medium">
                    Awesome. To get started, what is the name of your business?
                </p>

                <AmeTextarea
                    value={inputText}
                    onChange={setInputText}
                    onSubmit={() => inputText && onNext(inputText)}
                    placeholder="Type business name here..."
                    disabled={!inputText}
                />
            </div>
        </AmeStepLayout>
    );
}
