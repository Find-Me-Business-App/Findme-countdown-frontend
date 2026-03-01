"use client";

import { useState, useEffect } from "react";
import { SectionType } from "@/config/modal-configs";

/**
 * Custom hook to track the currently visible section using Intersection Observer.
 */
export function useSectionObserver() {
    const [activeSection, setActiveSection] = useState<SectionType>("home");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id as SectionType);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    return activeSection;
}
