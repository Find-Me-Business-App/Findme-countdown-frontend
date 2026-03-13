"use client";

import { AnimatePresence } from "framer-motion";
import { REGISTRATION_CONFIGS } from "@/config/modal-configs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/useModalStore";
import RegistrationForm from "./RegistrationForm";
import RegistrationAI from "./RegistrationAI";
import AccountTypeSelection from "./AccountTypeSelection";
import BusinessCategorySelection from "./BusinessCategorySelection";
import BusinessNameSelection from "./BusinessNameSelection";
import BusinessAccountInfo from "./BusinessAccountInfo";
import OwnerVerification from "./OwnerVerification";
import Verification from "./Verification";
import RegistrationSuccess from "./RegistrationSuccess";
import FestivalCategorySelection from "./FestivalCategorySelection";
import FestivalBusinessNameSelection from "./FestivalBusinessNameSelection";
import FestivalOwnerInfo from "./FestivalOwnerInfo";
import ModalBackdrop from "../shared/ModalBackdrop";
import ModalContainer from "../shared/ModalContainer";
import ModalCloseButton from "../shared/ModalCloseButton";
import { THEME } from "@/config/theme";

export default function RegistrationModal() {
    const { isOpen, type, section, closeModal } = useModalStore();
    const isModalVisible = isOpen && type === "registration";
    const config = REGISTRATION_CONFIGS[section as keyof typeof REGISTRATION_CONFIGS];
    const [view, setView] = useState<"ai" | "form" | "account_type" | "category" | "business_name" | "account_info" | "owner_verification" | "verification" | "success" | "festival_category" | "festival_business_name" | "festival_owner_info">("form");
    const [businessName, setBusinessName] = useState("");
    const [userName, setUserName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        if (isModalVisible) {
            document.body.style.overflow = "hidden";
            setView("form"); // Always start with form view
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isModalVisible]);

    if (!config) return null;

    const showAI = section === "business" && view === "ai";
    const showAccountType = section === "business" && view === "account_type";
    const showCategory = section === "business" && view === "category";
    const showName = section === "business" && view === "business_name";
    const showAccountInfo = section === "business" && view === "account_info";
    const showOwnerVerification = section === "business" && view === "owner_verification";
    const showVerification = section === "business" && view === "verification";
    const showSuccess = section === "business" && view === "success";
    const showFestivalCategory = section === "festival" && view === "festival_category";
    const showFestivalBusinessName = section === "festival" && view === "festival_business_name";
    const showFestivalOwnerInfo = section === "festival" && view === "festival_owner_info";

    return (
        <AnimatePresence>
            {isModalVisible && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <ModalBackdrop onClick={closeModal} type="registration" />

                    <ModalContainer
                        type="registration"
                        className={`${showAI ? 'max-w-[420px] md:max-w-[860px]' : (showAccountType || showCategory || showName || showAccountInfo || showOwnerVerification || showVerification || showSuccess || showFestivalCategory || showFestivalBusinessName || showFestivalOwnerInfo) ? 'max-w-[420px] md:max-w-[680px] border-2 shadow-2xl' : 'max-w-[420px] md:max-w-[760px]'} px-6 py-6 md:px-12 md:py-10 flex flex-col md:flex-row gap-8 md:gap-12 shrink-0`}
                        style={{
                            ...(showAccountType || showCategory || showName || showAccountInfo || showOwnerVerification || showVerification || showSuccess || showFestivalCategory || showFestivalBusinessName || showFestivalOwnerInfo) ? { borderColor: THEME.colors.text.accent } : {},
                            ...(showFestivalOwnerInfo) ? { backgroundColor: "#8C8C8C", border: "none" } : {}
                        }}
                    >
                        <ModalCloseButton
                            onClick={closeModal}
                            className={`md:top-10 md:right-10 ${showFestivalOwnerInfo ? 'text-white/80 hover:text-white' : ''}`}
                            style={showFestivalOwnerInfo ? { color: 'white' } : {}}
                        />

                        {showAI ? (
                            <RegistrationAI
                                onBack={() => setView("form")}
                                onNext={() => setView("account_type")}
                            />
                        ) : showAccountType ? (
                            <AccountTypeSelection onSelect={(type) => {
                                if (type === "business") {
                                    setView("category");
                                } else {
                                    closeModal();
                                }
                            }} />
                        ) : showCategory ? (
                            <BusinessCategorySelection 
                                onSelect={(cat) => {
                                    setSelectedCategory(cat);
                                    setView("business_name");
                                }}
                                onBack={() => setView("account_type")}
                            />
                        ) : showName ? (
                            <BusinessNameSelection
                                onSelect={(name) => {
                                    setBusinessName(name);
                                    setView("account_info");
                                }}
                                onBack={() => setView("category")}
                            />
                        ) : showAccountInfo ? (
                            <BusinessAccountInfo 
                                businessName={businessName}
                                category={selectedCategory}
                                onBack={() => setView("business_name")}
                                onComplete={() => {
                                    setView("owner_verification");
                                }}
                            />
                        ) : showOwnerVerification ? (
                            <OwnerVerification 
                                onSelect={(_isOwner) => {
                                    setView("verification");
                                }}
                                onBack={() => setView("account_info")}
                            />
                        ) : showVerification ? (
                            <Verification 
                                onSubmit={() => {
                                    setView("success");
                                }}
                                onBack={() => setView("owner_verification")}
                            />
                        ) : showSuccess ? (
                            <RegistrationSuccess 
                                userName={userName}
                                businessName={businessName}
                                onDone={() => {
                                    closeModal();
                                }}
                            />
                        ) : showFestivalCategory ? (
                            <FestivalCategorySelection
                                onSelect={(cat) => {
                                    setSelectedCategory(cat);
                                    setView("festival_business_name");
                                }}
                                onBack={() => setView("form")}
                            />
                        ) : showFestivalBusinessName ? (
                            <FestivalBusinessNameSelection
                                onSelect={(name) => {
                                    setBusinessName(name);
                                    setView("festival_owner_info"); 
                                }}
                                onBack={() => setView("festival_category")}
                            />
                        ) : showFestivalOwnerInfo ? (
                            <FestivalOwnerInfo
                                onSubmit={(_data) => {
                                    setView("success");
                                }}
                                onBack={() => setView("festival_business_name")}
                            />
                        ) : (
                            <>
                                {/* Left Side: Header & Form */}
                                <div className="w-full md:w-[65%] flex flex-col relative pr-0 md:pr-4">
                                    {(section === "business" || section === "festival") && (
                                        <div 
                                            className="absolute right-[-16px] md:right-[-24px] top-4 bottom-4 w-[1px] hidden md:block" 
                                            style={{ backgroundColor: THEME.colors.components.separator }}
                                        />
                                    )}
                                    <div className="mb-4 md:mb-6">
                                        <div
                                            className="w-14 h-[3px] md:w-18 mb-4 md:mb-5 opacity-90"
                                            style={{ backgroundColor: THEME.colors.text.primary }}
                                        />
                                        <h2
                                            className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight"
                                            style={{ color: THEME.colors.text.primary }}
                                        >
                                            {config.title}
                                        </h2>
                                        <p
                                            className="text-sm md:text-[15px] leading-relaxed max-w-md opacity-80"
                                            style={{ color: THEME.colors.text.secondary }}
                                        >
                                            {config.description}
                                        </p>
                                    </div>

                                    <RegistrationForm
                                        section={section}
                                        onNext={section === "business" ? (data) => {
                                            if (data?.name) setUserName(data.name);
                                            setView("ai");
                                        } : section === "festival" ? (data) => {
                                            if (data?.name) setUserName(data.name);
                                            setView("festival_category");
                                        } : undefined}
                                    />
                                </div>

                                {/* Right Side: Icon Section */}
                                <div className="md:w-[35%] flex flex-col items-center justify-center pt-2 md:pt-0">
                                    <div className="flex flex-col items-center gap-6 group">
                                        <div 
                                            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center transition-all duration-500 group-hover:scale-105 rounded-full border p-4 md:p-6 shadow-xl"
                                            style={{ 
                                                backgroundColor: THEME.colors.components.iconContainer,
                                                borderColor: THEME.colors.components.separator 
                                            }}
                                        >
                                            <Image
                                                src={section === "festival" ? THEME.assets.icons.auth.festival : section === "business" ? THEME.assets.icons.auth.ai : THEME.assets.icons.auth.register}
                                                alt="Registration Icon"
                                                width={section === "business" ? 100 : 120}
                                                height={section === "business" ? 100 : 120}
                                                className="object-contain opacity-90 transition-opacity group-hover:opacity-100"
                                            />
                                        </div>
                                        {section === "business" && (
                                            <h3
                                                className="text-base md:text-lg font-medium tracking-wide"
                                                style={{ color: THEME.colors.text.primary }}
                                            >
                                                Sign up using <span style={{ color: THEME.colors.text.accent }}>AM</span><span style={{ color: THEME.colors.text.danger }}>E</span>
                                            </h3>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </ModalContainer>
                </div>
            )}
        </AnimatePresence>
    );
}
