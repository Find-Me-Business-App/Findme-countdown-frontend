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
import { motion, useScroll } from "framer-motion";
import { useRef, useEffect } from "react";

export default function LandingPage() {
    const { openModal } = useModalStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const activeSection = useSectionObserver(containerRef);
    
    const { scrollYProgress } = useScroll({ container: containerRef });

    // Auto-snap to nearest section
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let timeout: NodeJS.Timeout;
        let isScrolling = false;
        let lastScrollTop = 0;
        let scrollDirection = 0;
        
        const handleScroll = () => {
            if (isScrolling) return;
            
            const currentScrollTop = container.scrollTop;
            scrollDirection = currentScrollTop > lastScrollTop ? 1 : -1;
            lastScrollTop = currentScrollTop;
            
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const scrollTop = container.scrollTop;
                const sectionHeight = container.clientHeight;
                const currentSection = scrollTop / sectionHeight;
                const nearestSection = scrollDirection > 0 
                    ? Math.ceil(currentSection) 
                    : Math.floor(currentSection);
                const targetTop = nearestSection * sectionHeight;
                
                if (Math.abs(scrollTop - targetTop) > 100) {
                    isScrolling = true;
                    container.scrollTo({ top: targetTop, behavior: 'smooth' });
                    setTimeout(() => { isScrolling = false; }, 1000);
                }
            }, 300);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            container.removeEventListener('scroll', handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element && containerRef.current) {
            containerRef.current.scrollTo({
                top: element.offsetTop,
                behavior: "smooth"
            });
        }
    };

    const sections = [
        { id: 'home', label: 'Home' },
        { id: 'business', label: 'Business' },
        { id: 'festival', label: 'Festival' },
        { id: 'footer', label: 'Contact' }
    ];

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
            
            {/* Navigation Dots */}
            <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
                {sections.map(section => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center gap-3 transition-all duration-300 ${
                            activeSection === section.id ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                        }`}
                    >
                        <span className={`text-xs font-medium transition-all duration-300 ${
                            activeSection === section.id ? 'text-white' : 'text-white/60'
                        }`}>
                            {section.label}
                        </span>
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            activeSection === section.id ? 'bg-white scale-125' : 'bg-white/40'
                        }`} />
                    </button>
                ))}
            </div>
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
                    <Image src="/Rectangle 3329.png" alt="Background" fill className="object-cover opacity-80" priority />
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







