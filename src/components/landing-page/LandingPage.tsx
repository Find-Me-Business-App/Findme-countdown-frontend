"use client";

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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

export default function LandingPage() {
    const { openModal } = useModalStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const activeSection = useSectionObserver(containerRef);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const { scrollYProgress } = useScroll({ container: containerRef });

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
            className="h-screen overflow-y-scroll overflow-x-hidden"
            style={{ scrollSnapType: 'y mandatory' }}
        >
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"
                style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
            />



            <Navbar
                activeSection={activeSection}
                onOpenModal={() => openModal("contact", activeSection)}
                onScrollToSection={scrollToSection}
            />

            {/* Home */}
            <section id="home" className="h-screen snap-start bg-black flex flex-col items-center justify-center relative">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <video
                        key={isMobile ? 'mobile-video' : 'desktop-video'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    >
                        <source
                            src={isMobile ? "/video/17564221-uhd_3840_2160_30fps (1).webm" : "/video/17564221-uhd_3840_2160_30fps.mp4"}
                            type={isMobile ? "video/webm" : "video/mp4"}
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
                <main className="relative z-10 flex flex-col items-center justify-center px-4 md:px-8">
                    <Hero />
                    <Countdown />
                </main>
                <Waitlist onJoin={() => openModal("waitlist", activeSection)} />
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] border border-white/5 rounded-full pointer-events-none"
                />
            </section>

            {/* Business */}
            <section id="business" className="h-screen snap-start">
                <BusinessSection onOpenWaitlist={() => openModal("waitlist", "business")} />
            </section>

            {/* Festival */}
            <section id="festival" className="h-screen snap-start">
                <FestivalSection onOpenWaitlist={() => openModal("waitlist", "festival")} />
            </section>

            {/* Footer */}
            <section id="footer" className="snap-start bg-white border-t border-black/5">
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







