"use client";

import { REGISTRATION_CONFIGS, SectionType } from "@/config/modal-configs";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import RegistrationFormView from "./RegistrationFormView";
import { ModalBackdrop, ModalContainer, ModalCloseButton } from "../shared";
import { THEME } from "@/config/theme";

// Sub-step components
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
    | "festival_verification";

/**
 * RegistrationModal — multi-step registration wizard.
 * Scroll locking is handled by ModalProvider.
 * Each sub-step is a standalone component imported from landing-page.
 */
export default function RegistrationModal() {
    const { section, closeModal, openModal } = useModalStore();
    const config = REGISTRATION_CONFIGS[section as keyof typeof REGISTRATION_CONFIGS];
    const [view, setView] = useState<RegistrationView>("form");
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedOwnership, setSelectedOwnership] = useState("");


    // Reset to form view when modal re-opens
    useEffect(() => {
        setView("form");
    }, []);

    if (!config) return null;

    const isSubStep = view !== "form" && view !== "ai";
    const isFestivalVerification = view === "festival_verification";

    const isBusinessOrFestival = section === "business" || section === "festival";

    // Compute container sizing based on current view
    const containerClass = view === "ai"
        ? "max-w-[420px] md:max-w-[860px]"
        : isSubStep
            ? `max-w-[420px] md:max-w-[680px] shadow-2xl ${isBusinessOrFestival ? 'border-0' : 'border-2'}`
            : "max-w-[420px] md:max-w-[760px]";

    const containerStyle = {
        ...(isSubStep && !isBusinessOrFestival ? { borderColor: THEME.colors.text.accent } : {}),
        ...(isFestivalVerification ? { backgroundColor: "#8C8C8C", border: "none" } : {}),
        maxHeight: "95vh"
    };

    const handleBack = () => {
        if (view === "form") {
            openModal("waitlist", section);
            return;
        }

        switch (view) {
            case "ai": setView("form"); break;
            case "account_type": setView("ai"); break;
            case "category": setView("account_type"); break;
            case "business_name": setView("category"); break;
            case "account_info": setView("business_name"); break;
            case "owner_verification": setView("account_info"); break;
            case "owner_info": setView("owner_verification"); break;
            case "verification": setView("owner_info"); break;
            case "festival_category": setView("form"); break;
            case "festival_business_name": setView("festival_category"); break;
            case "festival_verification": setView("festival_business_name"); break;
            default: break;
        }
    };

    const showBack = view !== "success";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <ModalBackdrop onClick={closeModal} type="registration" />

            <ModalContainer
                type="registration"
                className={`${containerClass} px-5 py-6 md:px-12 md:py-10 flex flex-col md:flex-row gap-6 md:gap-12 shrink-0`}
                style={containerStyle}
            >
                <ModalCloseButton
                    onClick={closeModal}
                    onBack={showBack ? handleBack : undefined}
                    className={`top-4 right-4 md:top-10 md:right-10 ${isFestivalVerification ? 'text-white/80 hover:text-white' : ''}`}
                    style={isFestivalVerification ? { color: 'white' } : {}}
                />

                {renderView({
                    view,
                    setView,
                    section,
                    config,
                    businessName,
                    setBusinessName,
                    userName,
                    setUserName,
                    selectedCategory,
                    setSelectedCategory,
                    selectedOwnership,
                    setSelectedOwnership,
                    closeModal,
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
    selectedCategory: string;
    setSelectedCategory: (c: string) => void;
    selectedOwnership: string;
    setSelectedOwnership: (o: string) => void;
    closeModal: () => void;
}

function renderView({
    view, setView, section, config,
    businessName, setBusinessName,
    userName, setUserName,
    selectedCategory, setSelectedCategory,
    selectedOwnership, setSelectedOwnership,
    closeModal,
}: ViewRouterProps) {
    switch (view) {
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
                    onDone={closeModal}
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
                            ? (data) => { if (data?.name) setUserName(data.name); setView("ai"); }
                            : section === "festival"
                                ? (data) => {
                                    if (data?.name) setUserName(data.name);
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
