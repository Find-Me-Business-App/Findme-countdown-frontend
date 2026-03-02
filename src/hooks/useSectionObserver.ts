"use client";

import { useState, useEffect, useCallback, RefObject } from "react";
import { SectionType } from "@/config/modal-configs";

const SECTION_IDS: SectionType[] = ["home", "business", "festival"];

/**
 * Tracks the currently visible section by scroll position within a container.
 * Works correctly with sticky stacked sections by comparing scroll offset
 * against each section's offsetTop.
 */
export function useSectionObserver(containerRef?: RefObject<HTMLDivElement | null>) {
    const [activeSection, setActiveSection] = useState<SectionType>("home");

    const detectSection = useCallback(() => {
        const container = containerRef?.current;
        if (!container) return;

        const scrollTop = container.scrollTop;
        const viewportHeight = container.clientHeight;
        // Use 40% of the viewport as the "trigger line" for determining which section is active
        const triggerPoint = scrollTop + viewportHeight * 0.4;

        let currentSection: SectionType = "home";

        for (const id of SECTION_IDS) {
            const section = document.getElementById(id);
            if (section) {
                // offsetTop is relative to the offsetParent, which should be the relative container
                if (triggerPoint >= section.offsetTop) {
                    currentSection = id;
                }
            }
        }

        setActiveSection(currentSection);
    }, [containerRef]);

    useEffect(() => {
        const container = containerRef?.current;
        if (!container) return;

        // Detect on mount
        detectSection();

        // Listen for scroll events on the container (passive for performance)
        container.addEventListener("scroll", detectSection, { passive: true });

        return () => {
            container.removeEventListener("scroll", detectSection);
        };
    }, [containerRef, detectSection]);

    return activeSection;
}
