"use client";

import { useState } from "react";
import AmeStepLayout from "./shared/AmeStepLayout";
import AmeTextarea from "./shared/AmeTextarea";

interface ReplyViewProps {
    businessType: string;
    locations: string[];
    onConfirm: (text: string) => void;
}

export default function ReplyView({ businessType = "Restaurant", locations = ["Oron Road", "Uyo"], onConfirm }: ReplyViewProps) {
    const [inputText, setInputText] = useState("");

    return (
        <AmeStepLayout>
            {/* Center: AI Message */}
            <div className="flex-1 flex flex-col items-center justify-center gap-1.5 md:gap-2 px-2 md:px-6 max-w-2xl">
                <p className="text-sm md:text-base leading-relaxed text-white text-center font-medium">
                    If I got you correctly, you want to open your <span className="text-blue-400 font-bold">{businessType}</span> business at {locations.length > 1 ? "multiple locations" : "a location"} including <span className="text-blue-400 font-bold">{locations.join(" and ")}</span> respectively.
                </p>
                <div className="flex flex-col items-center gap-1">
                    <p className="text-white/90 text-[13px] md:text-base font-bold">• Should I lock in on those locations?</p>
                    <p className="text-[12px] md:text-base opacity-90 text-white/90 text-center italic">
                        Or do you want to be more precise on location?
                    </p>
                </div>
            </div>

            {/* Bottom: Textarea */}
            <AmeTextarea
                value={inputText}
                onChange={setInputText}
                onSubmit={() => onConfirm(inputText)}
                placeholder="Type here..."
            />
        </AmeStepLayout>
    );
}
