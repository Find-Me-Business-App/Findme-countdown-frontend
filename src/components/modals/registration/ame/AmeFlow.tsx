"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { AmeStep, AmeCollectedData, AmeExtractedInfo, AmeUserInfo } from "./types";
import { AME_INITIAL_DATA } from "./types";
import "./shared/ame-globals.css";

// ─── Lazy-loaded views (only loaded when their step activates) ───
const PromptsView = lazy(() => import("./PromptsView"));
const SelectionView = lazy(() => import("./SelectionView"));
const ReplyView = lazy(() => import("./ReplyView"));
const BusinessNameView = lazy(() => import("./BusinessNameView"));
const FollowupView = lazy(() => import("./FollowupView"));
const CategoryView = lazy(() => import("./CategoryView"));
const Followup2View = lazy(() => import("./Followup2View"));
const Followup3View = lazy(() => import("./Followup3View"));
const OwnershipView = lazy(() => import("./OwnershipView"));
const UserInfoView = lazy(() => import("./UserInfoView"));

interface AmeFlowProps {
    onComplete: (data: AmeCollectedData) => void;
    onBack: () => void;
}

/**
 * AmeFlow — Coordinator for the 10-step AME registration sequence.
 *
 * Manages step state and collected data, rendering one view at a time
 * with animated transitions. All views are lazy-loaded for performance.
 *
 * ARCHITECTURE:
 * - State is fully typed via AmeCollectedData (no `any`)
 * - Step transitions happen via the stable `nextStep` callback
 * - Context extraction (locations/businessType) runs once on initial prompt
 */
export default function AmeFlow({ onComplete, onBack: _onBack }: AmeFlowProps) {
    const [step, setStep] = useState<AmeStep>("prompts");
    const [data, setData] = useState<AmeCollectedData>(AME_INITIAL_DATA);

    const extractContext = useCallback((prompt: string): AmeExtractedInfo => {
        const lower = prompt.toLowerCase();

        // Basic location extraction (Nigeria context keywords)
        const locationKeywords = ["uyo", "lagos", "abuja", "port harcourt", "calabar", "road", "street", "complex", "mall"];
        const foundLocations = locationKeywords.filter(k => lower.includes(k.toLowerCase()));

        // Basic business type extraction
        const types = ["restaurant", "fashion", "tech", "laundry", "barber", "salon", "pharmacy", "gym", "store"];
        const foundType = types.find(t => lower.includes(t)) || "Business";

        return {
            locations: foundLocations.length > 0
                ? foundLocations.map(l => l.charAt(0).toUpperCase() + l.slice(1))
                : ["your locality"],
            businessType: foundType.charAt(0).toUpperCase() + foundType.slice(1)
        };
    }, []);

    const nextStep = useCallback((next: AmeStep, update?: Partial<AmeCollectedData>) => {
        if (update) {
            let finalUpdate = { ...update };
            // If we are updating initialPrompt, also extract context
            if (update.initialPrompt) {
                finalUpdate = { ...finalUpdate, extractedInfo: extractContext(update.initialPrompt) };
            }
            setData(prev => ({ ...prev, ...finalUpdate }));
        }
        setStep(next);
    }, [extractContext]);

    const renderStep = () => {
        switch (step) {
            case "prompts":
                return (
                    <PromptsView
                        onSelect={(p) => nextStep("selection", { initialPrompt: p })}
                        onNext={() => setStep("selection")}
                    />
                );
            case "selection":
                return (
                    <SelectionView
                        initialValue={data.initialPrompt}
                        onNext={(p) => nextStep("reply", { initialPrompt: p })}
                    />
                );
            case "reply":
                return (
                    <ReplyView
                        businessType={data.extractedInfo.businessType}
                        locations={data.extractedInfo.locations}
                        onConfirm={(text) => nextStep("business_name", { initialPrompt: data.initialPrompt + " " + text })}
                    />
                );
            case "business_name":
                return (
                    <BusinessNameView
                        suggestedName={data.extractedInfo.businessType !== "Business" ? data.extractedInfo.businessType : ""}
                        onNext={(n) => nextStep("followup", { businessName: n })}
                    />
                );
            case "followup":
                return (
                    <FollowupView
                        onSelect={(t) => nextStep("category", { offerType: t })}
                    />
                );
            case "category":
                return (
                    <CategoryView
                        onSelect={(c) => nextStep("followup2", { category: c })}
                    />
                );
            case "followup2":
                return (
                    <Followup2View
                        onSelect={(n) => nextStep("followup3", { nature: n })}
                    />
                );
            case "followup3":
                return (
                    <Followup3View
                        onSelect={(c) => nextStep("ownership", { staffCount: c })}
                    />
                );
            case "ownership":
                return (
                    <OwnershipView
                        onSelect={(o) => nextStep("user_info", { ownership: o })}
                    />
                );
            case "user_info":
                return (
                    <UserInfoView
                        onSubmit={(u: AmeUserInfo) => onComplete({ ...data, user: u })}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full h-full relative overflow-y-auto ame-no-scrollbar">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full p-3 md:p-5"
                >
                    <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    }>
                        {renderStep()}
                    </Suspense>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
