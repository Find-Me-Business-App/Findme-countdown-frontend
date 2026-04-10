"use client";

import { REGISTRATION_CONFIGS, SectionType } from "@/config/modal-configs";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import RegistrationFormView from "./RegistrationFormView";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";

// Sub-step components
import { AmeFlow } from "./ame";
import type { AmeCollectedData } from "./ame";
import { useAmeRegistration } from "@/hooks/useAmeRegistration";
import RegistrationAI from "./steps/RegistrationAI";
import AccountTypeSelection from "./steps/AccountTypeSelection";
import BusinessCategorySelection from "./steps/BusinessCategorySelection";
import BusinessNameSelection from "./steps/BusinessNameSelection";
import BusinessAccountInfo from "./steps/BusinessAccountInfo";
import BusinessOwnerInfo from "./steps/BusinessOwnerInfo";
import FestivalOwnerInfo from "./steps/FestivalOwnerInfo";
import Verification from "./steps/Verification";
import RegistrationSuccess from "./steps/RegistrationSuccess";
import FestivalCategorySelection from "./steps/FestivalCategorySelection";
import FestivalBusinessNameSelection from "./steps/FestivalBusinessNameSelection";

export type RegistrationView =
    | "form"
    | "ai"
    | "account_type"
    | "category"
    | "business_name"
    | "account_info"
    | "owner_verification"
    | "owner_info"
    | "verification"
    | "success"
    | "festival_category"
    | "festival_business_name"
    | "festival_verification"
    | "ame";

/**
 * RegistrationModal — multi-step registration wizard.
 * Scroll locking is handled by ModalProvider.
 * Each sub-step is a standalone component imported from landing-page.
 */
export default function RegistrationModal() {
    const { section, closeModal, openModal, data, userId, setUserId } = useModalStore();
    const fromEarlyBird = data?.fromEarlyBird === true;
    const config = REGISTRATION_CONFIGS[section as keyof typeof REGISTRATION_CONFIGS];
    const [view, setView] = useState<RegistrationView>("form");
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedOwnership, setSelectedOwnership] = useState("");
    const [flowType, setFlowType] = useState<"manual" | "ame">("manual");

    // AME registration API hook (handles loading, error, submission)
    const { submit: submitAme, isLoading, error, clearError } = useAmeRegistration();

    // Reset to form view when modal re-opens
    useEffect(() => {
        setView("form");
        clearError();
    }, [clearError]);

    // Auto-clear error after 10 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => clearError(), 10000);
            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    if (!config) return null;

    const isAmeView = view === "ame";
    const isSubStep = view !== "form" && view !== "ai" && !isAmeView;
    const isFestivalVerification = view === "festival_verification";

    const handleAmeComplete = async (ameData: AmeCollectedData) => {
        const result = await submitAme(ameData);
        if (result) {
            setUserId(result.userId);
            setUserName(result.userName);
            setBusinessName(result.businessName);
            setView("success");
        }
    };
    // Compute container sizing based on current view
    const isCompactStep = view === "account_info" || view === "owner_verification" || view === "ai" || view === "account_type" || view === "festival_business_name" || view === "category" || view === "business_name" || view === "owner_info" || view === "verification" || view === "success" || isAmeView;
    const containerClass = view === "ai" || isAmeView
        ? "w-full md:w-[777px] h-[550px] md:h-[444px] shadow-2xl border"
        : isCompactStep
            ? "w-full md:w-[777px] h-[550px] md:h-[444px] shadow-2xl border"
            : isSubStep
                ? `max-w-[420px] md:max-w-[680px] shadow-2xl border`
                : "max-w-[420px] md:max-w-[760px]";

    const containerStyle = {
        ...(isFestivalVerification ? { backgroundColor: "rgba(140, 140, 140, 0.4)" } : {}),
        ...(isCompactStep
            ? { maxHeight: "90vh" } // height set via Tailwind class above
            : { maxHeight: "85vh" }
        ),
    };

    const handleBack = () => {
        if (view === "form") {
            openModal("waitlist", section);
            return;
        }

        switch (view) {
            case "ai": setView("form"); break;
            case "account_type": setView("form"); break; // If manual flow, go back to form
            case "category": setView("account_type"); break;
            case "business_name": setView("category"); break;
            case "account_info": setView("business_name"); break;
            case "owner_verification": setView("account_info"); break;
            case "owner_info": setView("owner_verification"); break;
            case "verification": setView("owner_info"); break;
            case "festival_category": setView("form"); break;
            case "festival_business_name": setView("festival_category"); break;
            case "festival_verification": setView("festival_business_name"); break;

            // AME Back Logic
            case "ame": setView("form"); break;
            default: break;
        }
    };

    const showBack = view !== "success";

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <ModalBackdrop onClick={closeModal} type="registration" />

            <ModalContainer
                type="registration"
                overflow={isCompactStep ? "overflow-hidden" : "overflow-y-auto"}
                className={`${containerClass} px-5 py-4 ${isCompactStep ? 'md:px-8 md:py-6' : 'md:px-12 md:py-10'} flex flex-col md:flex-row gap-6 md:gap-12 shrink-0 relative`}
                style={containerStyle}
            >
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4 rounded-3xl">
                        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-white font-medium">Securing your account...</p>
                    </div>
                )}

                <ModalCloseButton
                    onClick={closeModal}
                    onBack={showBack && !fromEarlyBird ? handleBack : undefined}
                    className={`top-4 right-4 md:top-10 md:right-10 ${isFestivalVerification ? 'text-white/80 hover:text-white' : ''}`}
                    style={isFestivalVerification ? { color: 'white' } : {}}
                />

                {error && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white px-4 py-2 rounded-full text-xs font-bold z-50 animate-bounce">
                        {error}
                    </div>
                )}

                {renderView({
                    view,
                    setView,
                    section,
                    config,
                    businessName,
                    setBusinessName,
                    userName,
                    setUserName,
                    userId,
                    setUserId,
                    selectedCategory,
                    setSelectedCategory,
                    selectedOwnership,
                    setSelectedOwnership,
                    setFlowType,
                    closeModal,
                    handleAmeComplete,
                })}
            </ModalContainer>
        </div>
    );
}

/* ─── View Router ─────────────────────────────────────────────── */

interface ViewRouterProps {
    view: RegistrationView;
    setView: (v: RegistrationView) => void;
    section: string;
    config: { title: string; description: string; accentColor: string };
    businessName: string;
    setBusinessName: (n: string) => void;
    userName: string;
    setUserName: (n: string) => void;
    userId: string;
    setUserId: (id: string) => void;
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    selectedOwnership: string;
    setSelectedOwnership: (o: string) => void;
    setFlowType: (t: "manual" | "ame") => void;
    closeModal: () => void;
    handleAmeComplete: (data: AmeCollectedData) => void;
}

function renderView({
    view, setView, section, config,
    businessName, setBusinessName,
    userName, setUserName,
    userId, setUserId,
    selectedCategory, setSelectedCategory,
    selectedOwnership, setSelectedOwnership,
    setFlowType,
    closeModal,
    handleAmeComplete,
}: ViewRouterProps) {
    switch (view) {
        case "ame":
            return (
                <AmeFlow 
                    onComplete={handleAmeComplete}
                    onBack={() => setView("form")}
                />
            );
        case "ai":
            return (
                <RegistrationAI
                    onNext={() => setView("account_type")}
                />
            );
        case "account_type":
            return (
                <AccountTypeSelection onSelect={(type) => {
                    if (type === "business") {
                        setView("category");
                    } else {
                        closeModal();
                    }
                }} />
            );
        case "category":
            return (
                <BusinessCategorySelection
                    onSelect={(cat) => {
                        setSelectedCategory(cat);
                        setView("business_name");
                    }}
                />
            );
        case "business_name":
            return (
                <BusinessNameSelection
                    onSelect={(name) => {
                        setBusinessName(name);
                        setView("account_info");
                    }}
                />
            );
        case "account_info":
            return (
                <BusinessAccountInfo
                    businessName={businessName}
                    category={selectedCategory}
                    userId={userId}
                    onComplete={(type) => {
                        setSelectedOwnership(type);
                        setView("owner_verification");
                    }}
                />
            );
        case "owner_verification":
            return (
                <BusinessOwnerInfo
                    onSelect={() => setView("owner_info")}
                />
            );
        case "owner_info":
            return (
                <FestivalOwnerInfo
                    ownershipType={selectedOwnership}
                    onSubmit={() => setView("verification")}
                />
            );
        case "verification":
            return (
                <Verification
                    onSubmit={() => setView("success")}
                />
            );
        case "success":
            return (
                <RegistrationSuccess
                    userName={userName}
                    businessName={businessName}
                />
            );
        case "festival_category":
            return (
                <FestivalCategorySelection
                    onSelect={(cat) => {
                        setSelectedCategory(cat);
                        setView("festival_business_name");
                    }}
                />
            );
        case "festival_business_name":
            return (
                <FestivalBusinessNameSelection
                    onSelect={(name) => {
                        setBusinessName(name);
                        setView("festival_verification");
                    }}
                />
            );
        case "festival_verification":
            return (
                <Verification
                    onSubmit={() => setView("success")}
                />
            );
        default: // "form"
            return (
                <RegistrationFormView
                    config={config}
                    section={section as SectionType}
                    onNext={
                        section === "business"
                            ? (data) => {
                                if (data?.name) setUserName(data.name);
                                if (data?.userId) setUserId(data.userId);

                                if (data?.isAME) {
                                    setFlowType("ame");
                                    setView("ame");
                                } else {
                                    setFlowType("manual");
                                    setView("account_type");
                                }
                            }
                            : section === "festival"
                                ? (data) => {
                                    if (data?.name) setUserName(data.name);
                                    if (data?.userId) setUserId(data.userId);
                                    if (data?.role === "Business") {
                                        setView("festival_category");
                                    } else {
                                        setView("success");
                                    }
                                }
                                : undefined
                    }
                />
            );
    }
}
