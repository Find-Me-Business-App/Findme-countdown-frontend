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
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
    const activeSection = useSectionObserver();
    const { openModal } = useModalStore();
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={containerRef}
            className="relative w-full bg-black snap-y snap-mandatory h-svh overflow-y-auto overflow-x-hidden"
        >
            <Navbar
                activeSection={activeSection}
                onOpenModal={() => openModal("contact", activeSection)}
            />

            {/* Sticky Scroll Container */}
            <div className="relative">
                {/* Hero Section */}
                <StickySection id="home" zIndex="z-10">
                    <div className="relative h-full w-full flex flex-col items-center justify-center bg-black">
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
                    </div>
                </StickySection>

                {/* Business Section */}
                <StickySection id="business" zIndex="z-20">
                    <BusinessSection onOpenWaitlist={() => openModal("waitlist", "business")} />
                </StickySection>

                {/* Festival Section */}
                <StickySection id="festival" zIndex="z-30">
                    <FestivalSection onOpenWaitlist={() => openModal("waitlist", "festival")} />
                </StickySection>

                {/* Footer */}
                <section id="footer" className="relative z-40 bg-white shadow-[0_-100px_80px_rgba(0,0,0,0.8)] snap-start">
                    <Footer />
                </section>
            </div>

            {/* Modals */}
            <ContactModal />
            <WaitlistModal />
            <InfoModal />
            <RegistrationModal />
        </div>
    );
}

function StickySection({ children, id, zIndex }: { children: React.ReactNode; id: string; zIndex: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
    const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

    return (
        <section
            id={id}
            ref={ref}
            className={`sticky top-0 h-svh w-full overflow-hidden ${zIndex} snap-start snap-always`}
        >
            <motion.div
                style={{ scale, opacity, filter }}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </section>
    );
}

