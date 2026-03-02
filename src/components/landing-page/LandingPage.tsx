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
import { motion } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
    const { openModal } = useModalStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const activeSection = useSectionObserver(containerRef);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && containerRef.current) {
            containerRef.current.scrollTo({
                top: element.offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth overscroll-y-none"
            style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth', scrollSnapStop: 'always' }}
        >
            <Navbar
                activeSection={activeSection}
                onOpenModal={() => openModal("contact", activeSection)}
                onScrollToSection={scrollToSection}
            />

            {/* Home Section */}
            <section id="home" className="h-screen snap-start snap-always relative bg-black flex flex-col items-center justify-center">
                {/* Background Image */}
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src="/Rectangle 3329.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <main className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8">
                    <Hero />
                    <Countdown />
                </main>

                <Waitlist onJoin={() => openModal("waitlist", activeSection)} />

                {/* Decorative circle */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-white/5 rounded-full pointer-events-none"
                />
            </section>

            {/* Business Section */}
            <section id="business" className="h-screen snap-start snap-always">
                <BusinessSection onOpenWaitlist={() => openModal("waitlist", "business")} />
            </section>

            {/* Festival Section */}
            <section id="festival" className="h-screen snap-start snap-always">
                <FestivalSection onOpenWaitlist={() => openModal("waitlist", "festival")} />
            </section>

            {/* Footer */}
            <section id="footer" className="snap-start snap-always bg-white border-t border-black/5">
                <Footer />
            </section>

            {/* Modals */}
            <ContactModal />
            <WaitlistModal />
            <InfoModal />
            <RegistrationModal />
        </div>
    );
}



