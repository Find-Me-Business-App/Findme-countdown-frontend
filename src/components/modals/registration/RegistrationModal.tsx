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
import OwnerVerification from "./steps/OwnerVerification";
import Verification from "./steps/Verification";
import RegistrationSuccess from "./steps/RegistrationSuccess";
import FestivalCategorySelection from "./steps/FestivalCategorySelection";
import FestivalBusinessNameSelection from "./steps/FestivalBusinessNameSelection";
import FestivalOwnerInfo from "./steps/FestivalOwnerInfo";

export type RegistrationView =
    | "form"
    | "ai"
    | "account_type"
    | "category"
    | "business_name"
    | "account_info"
    | "owner_verification"
    | "verification"
    | "success"
    | "festival_category"
    | "festival_business_name"
    | "festival_owner_info";

/**
 * RegistrationModal — multi-step registration wizard.
 * Scroll locking is handled by ModalProvider.
 * Each sub-step is a standalone component imported from landing-page.
 */
export default function RegistrationModal() {
    const { section, closeModal } = useModalStore();
    const config = REGISTRATION_CONFIGS[section as keyof typeof REGISTRATION_CONFIGS];
    const [view, setView] = useState<RegistrationView>("form");
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    // Reset to form view when modal re-opens
    useEffect(() => {
        setView("form");
    }, []);

    if (!config) return null;

    const isSubStep = view !== "form" && view !== "ai";
    const isFestivalOwner = view === "festival_owner_info";

    // Compute container sizing based on current view
    const containerClass = view === "ai"
        ? "max-w-[420px] md:max-w-[860px]"
        : isSubStep
            ? "max-w-[420px] md:max-w-[680px] border-2 shadow-2xl"
            : "max-w-[420px] md:max-w-[760px]";

    const containerStyle = {
        ...(isSubStep ? { borderColor: THEME.colors.text.accent } : {}),
        ...(isFestivalOwner ? { backgroundColor: "#8C8C8C", border: "none" } : {}),
        maxHeight: "95vh"
    };

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
                    className={`top-4 right-4 md:top-10 md:right-10 ${isFestivalOwner ? 'text-white/80 hover:text-white' : ''}`}
                    style={isFestivalOwner ? { color: 'white' } : {}}
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
    closeModal: () => void;
}

function renderView({
    view, setView, section, config,
    businessName, setBusinessName,
    userName, setUserName,
    selectedCategory, setSelectedCategory,
    closeModal,
}: ViewRouterProps) {
    switch (view) {
        case "ai":
            return (
                <RegistrationAI
                    onBack={() => setView("form")}
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
                    onBack={() => setView("account_type")}
                />
            );
        case "business_name":
            return (
                <BusinessNameSelection
                    onSelect={(name) => {
                        setBusinessName(name);
                        setView("account_info");
                    }}
                    onBack={() => setView("category")}
                />
            );
        case "account_info":
            return (
                <BusinessAccountInfo
                    businessName={businessName}
                    category={selectedCategory}
                    onBack={() => setView("business_name")}
                    onComplete={() => setView("owner_verification")}
                />
            );
        case "owner_verification":
            return (
                <OwnerVerification
                    onSelect={() => setView("verification")}
                    onBack={() => setView("account_info")}
                />
            );
        case "verification":
            return (
                <Verification
                    onSubmit={() => setView("success")}
                    onBack={() => setView("owner_verification")}
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
                    onBack={() => setView("form")}
                />
            );
        case "festival_business_name":
            return (
                <FestivalBusinessNameSelection
                    onSelect={(name) => {
                        setBusinessName(name);
                        setView("festival_owner_info");
                    }}
                    onBack={() => setView("festival_category")}
                />
            );
        case "festival_owner_info":
            return (
                <FestivalOwnerInfo
                    onSubmit={() => setView("success")}
                    onBack={() => setView("festival_business_name")}
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
                                ? (data) => { if (data?.name) setUserName(data.name); setView("festival_category"); }
                                : undefined
                    }
                />
            );
    }
}
