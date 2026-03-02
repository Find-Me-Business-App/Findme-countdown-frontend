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
            className="relative w-full bg-black h-[100dvh] overflow-y-auto overflow-x-clip overscroll-behavior-y-none touch-pan-y"
        >
            <Navbar
                activeSection={activeSection}
                onOpenModal={() => openModal("contact", activeSection)}
                onScrollToSection={scrollToSection}
            />

            {/* Sticky Scroll Container */}
            <div className="relative w-full">
                {/* Hero Section */}
                <StickySection id="home" zIndex="z-10" containerRef={containerRef}>
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
                <StickySection id="business" zIndex="z-20" containerRef={containerRef}>
                    <BusinessSection onOpenWaitlist={() => openModal("waitlist", "business")} />
                </StickySection>

                {/* Festival Section */}
                <section id="festival" className="relative z-30 h-[100dvh] w-full">
                    <FestivalSection onOpenWaitlist={() => openModal("waitlist", "festival")} />
                </section>

                {/* Footer */}
                <section id="footer" className="relative z-40 bg-white border-t border-black/5">
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

function StickySection({
    children,
    id,
    zIndex,
    containerRef
}: {
    children: React.ReactNode;
    id: string;
    zIndex: string;
    containerRef: React.RefObject<HTMLDivElement | null>;
}) {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of this section relative to the container
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        container: containerRef,
        offset: ["start start", "end start"]
    });

    // Semantic animations for the "stacked" effect
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3]);
    const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`sticky top-0 h-[100dvh] w-full overflow-hidden ${zIndex} outline-none`}
        >
            <motion.div
                style={{ scale, opacity, filter: blur }}
                className="h-full w-full transform-gpu will-change-transform overflow-hidden"
            >
                {children}
            </motion.div>
        </section>
    );
}

