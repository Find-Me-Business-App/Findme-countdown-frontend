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
            {/* Center: AI Orb */}
            <div className="flex-1 flex items-center justify-center py-4">
                <AiOrb />
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={promptText}
                onChange={setPromptText}
                onSubmit={() => onNext(promptText)}
                placeholder="I want to create a store for my resturant business..."
            />
        </AmeStepLayout>
    );
}
