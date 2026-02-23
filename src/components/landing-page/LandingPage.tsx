"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Countdown from "./Countdown";
import Waitlist from "./Waitlist";
import BusinessSection from "./BusinessSection";
import FestivalSection from "./FestivalSection";
import Footer from "./Footer";
import ContactModal from "./ContactModal";
import WaitlistModal from "./WaitlistModal";
import InfoModal from "./InfoModal";
import RegistrationModal from "./RegistrationModal";
import { SectionType } from "@/config/modal-configs";

export default function LandingPage() {
    const [activeSection, setActiveSection] = useState<SectionType>("home");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

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

    return (
        <div className="relative w-full bg-black scroll-smooth">
            <Navbar
                activeSection={activeSection}
                onOpenModal={() => setIsModalOpen(true)}
            />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Findme/Rectangle 3329.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    {/* Overlay for better readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <main className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8 ">
                    <Hero />
                    <Countdown />
                </main>

                <Waitlist onJoin={() => setIsWaitlistModalOpen(true)} />

                {/* Decorative center ring if visible in image - actually seems like a circular light/area */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-white/5 rounded-full pointer-events-none" />
            </section>

            {/* Business Section */}
            <section id="business">
                <BusinessSection onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />
            </section>

            {/* Festival Section */}
            <section id="festival">
                <FestivalSection onOpenWaitlist={() => setIsWaitlistModalOpen(true)} />
            </section>

            {/* Footer Section */}
            <Footer />

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                section={activeSection}
            />

            <WaitlistModal
                isOpen={isWaitlistModalOpen}
                onClose={() => setIsWaitlistModalOpen(false)}
                onMoreInfo={() => {
                    setIsWaitlistModalOpen(false);
                    // Short delay to allow smooth transition
                    setTimeout(() => setIsInfoModalOpen(true), 100);
                }}
                onRegister={() => {
                    setIsWaitlistModalOpen(false);
                    // Short delay to allow smooth transition
                    setTimeout(() => setIsRegistrationModalOpen(true), 100);
                }}
                section={activeSection}
            />

            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setIsInfoModalOpen(false)}
                section={activeSection}
            />

            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
                section={activeSection}
            />
        </div>
    );
}
