"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";
import AiOrb from "./AiOrb";

interface SelectionViewProps {
    initialValue?: string;
    onNext: (prompt: string) => void;
}

export default function SelectionView({ initialValue = "", onNext }: SelectionViewProps) {
    const [promptText, setPromptText] = useState(initialValue);

    return (
        <AmeStepLayout>
            <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full max-w-2xl px-2">
                <AiOrb />
                <AmeTextarea
                    value={promptText}
                    onChange={setPromptText}
                    onSubmit={() => onNext(promptText)}
                    placeholder="I want to create a store for my resturant business..."
                />
            </div>
        </AmeStepLayout>
    );
}
