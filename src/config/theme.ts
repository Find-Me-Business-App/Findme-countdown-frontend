/**
 * Central theme configuration for modals and other UI components.
 * This file allows for easy updates to colors, backdrops, and other styling tokens.
 */

export const THEME = {
    colors: {
        // Core background colors
        background: {
            registration: {
                mobile: "#4a5a5a",
                desktop: "rgba(255, 255, 255, 0.2)",
            },
            info: {
                mobile: "#111111",
                desktop: "rgba(26, 26, 26, 0.95)",
            },
            waitlist: {
                mobile: "#1a1a1a",
                desktop: "rgba(51, 51, 51, 0.9)",
            },
            contact: {
                mobile: "#4b4b4b",
                desktop: "#4b4b4b",
            }
        },
        // Backdrop colors and effects
        backdrop: {
            registration: {
                mobile: "rgba(38, 38, 38, 1)",
                desktop: "rgba(38, 38, 38, 1)",
                blur: "none",
            },
            info: {
                mobile: "rgba(38, 38, 38, 1)",
                desktop: "rgba(38, 38, 38, 1)",
                blur: "none",
            },
            waitlist: {
                mobile: "rgba(38, 38, 38, 1)",
                desktop: "rgba(38, 38, 38, 1)",
                blur: "none",
            },
            default: {
                mobile: "rgba(38, 38, 38, 1)",
                desktop: "rgba(38, 38, 38, 1)",
                blur: "none",
            }
        },
        // Text colors
        text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
            muted: "rgba(255, 255, 255, 0.5)",
            accent: "#3b82f6", // FindMe Blue
            link: "#4ea1ff", // Info link blue
            danger: "#ea4335", // AME Red
            dark: "#2B365A", // Account Selection header
            success: "#4ade80", // Green-400
        },
        // Input fields and form elements
        input: {
            bg: "rgba(255, 255, 255, 0.05)",
            border: "rgba(255, 255, 255, 0.15)",
            text: "#ffffff",
            placeholder: "rgba(255, 255, 255, 0.25)",
            label: "rgba(255, 255, 255, 0.5)",
            focusBorder: "rgba(255, 255, 255, 0.4)",
            // High clarity variants (like used in contact message area)
            clarity: {
                bg: "#d4d4d4",
                text: "#1f2937",
                placeholder: "#6b7280",
            }
        },
        // Components within modals
        components: {
            separator: "rgba(255, 255, 255, 0.1)",
            iconContainer: "rgba(255, 255, 255, 0.05)",
            dropdownBg: "#1a1a1a",
            chipBg: "rgba(255, 255, 255, 0.05)",
            chipHover: "rgba(255, 255, 255, 0.1)",
            prompts: {
                blue: "rgba(59, 130, 246, 0.3)",
                white: "rgba(255, 255, 255, 0.1)",
                purple: "rgba(168, 85, 247, 0.3)",
            }
        },
        // Action / Button colors
        actions: {
            primary: "#2B365A", // Dark blue button
            secondary: "#2B365A", // Even darker blue
        },
        // Shadows
        shadows: {
            standard: "0 25px 80px rgba(0, 0, 0, 0.5)",
        }
    },
    // Centralized asset paths for icons and images
    assets: {
        icons: {
            auth: {
                festival: "/icons/Festival.svg",
                ai: "/icons/signup-ai.svg",
                register: "/register.svg",
            },
            nav: {
                menu: "/menu-button.svg",
                logo: "/logo1.svg",
                phone: "/Phone.svg",
            },
            contact: {
                phone: "/icons/phone.svg",
                whatsapp: "/icons/whatsapp.svg",
                gmail: "/icons/gmail.svg",
                send: "/icons/Group 11232.svg",
            },
            insights: {
                one: "/icons/insight1.svg",
                two: "/icons/insight2.svg",
            },
            social: {
                vector: "/Vector.svg",
            }
        },
        images: {
            footer: {
                bg: "/footer-backgroung.png",
                logo: "/Footer-logo.png",
            },
            festival: {
                bg: "/section3-background.png",
                fireworks: "/kisspng-fireworks.png",
                fireworksDiwali: "/kisspng-fireworks-diwali.png",
            },
            business: {
                bg: "/section-background.png",
                overlay: "/overlay2.png",
                text: "/BUSINESS.png",
            }
        }
    },
    // Constants for reusable values
    variants: {
        borderRadius: {
            registration: "rounded-[32px] md:rounded-[48px]",
            info: "rounded-[40px] md:rounded-[55px]",
        }
    }
} as const;
