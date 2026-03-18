"use client";

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useModalStore } from "@/store/useModalStore";
import { ContactModal } from "./contact";
import { WaitlistModal } from "./waitlist";
import { InfoModal } from "./info";
import { RegistrationModal } from "./registration";

/**
 * ModalProvider — Central orchestrator for all modals.
 *
 * Responsibilities:
 * 1. Reads the global modal state from Zustand.
 * 2. Handles body scroll locking (single location, no duplication).
 * 3. Renders the correct modal based on `type`.
 *
 * Usage: Drop <ModalProvider /> once inside LandingPage (or layout).
 */
export default function ModalProvider() {
    const { isOpen, type } = useModalStore();

    // Centralized scroll lock — replaces the useEffect in every modal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && type === "contact" && <ContactModal key="contact" />}
            {isOpen && type === "waitlist" && <WaitlistModal key="waitlist" />}
            {isOpen && type === "info" && <InfoModal key="info" />}
            {isOpen && type === "registration" && <RegistrationModal key="registration" />}
        </AnimatePresence>
    );
}
