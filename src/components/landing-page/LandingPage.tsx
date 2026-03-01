"use client";

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
import { useModalStore } from "@/store/useModalStore";
import { useSectionObserver } from "@/hooks/useSectionObserver";

export default function LandingPage() {
    const activeSection = useSectionObserver();
    const { openModal } = useModalStore();

    return (
        <div className="relative w-full bg-black scroll-smooth">
            <Navbar
                activeSection={activeSection}
                onOpenModal={() => openModal("contact", activeSection)}
            />

            {/* Hero Section */}
            <section id="home" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/Rectangle 3329.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <main className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8">
                    <Hero />
                    <Countdown />
                </main>

                <Waitlist onJoin={() => openModal("waitlist", activeSection)} />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-white/5 rounded-full pointer-events-none" />
            </section>

            {/* Business Section */}
            <section id="business">
                <BusinessSection onOpenWaitlist={() => openModal("waitlist", "business")} />
            </section>

            {/* Festival Section */}
            <section id="festival">
                <FestivalSection onOpenWaitlist={() => openModal("waitlist", "festival")} />
            </section>

            {/* Footer */}
            <Footer />

            {/* Modals */}
            <ContactModal />
            <WaitlistModal />
            <InfoModal />
            <RegistrationModal />
        </div>
    );
}

