/**
 * Central theme configuration for modals and other UI components.
 * This file allows for easy updates to colors, backdrops, and other styling tokens.
 */

export const THEME = {
    colors: {
        // Core background colors
        background: {
            registration: {
                mobile: "#787878",
                desktop: "#787878",
            },
            info: {
                mobile: "#787878",
                desktop: "#787878",
            },
            waitlist: {
                mobile: "#787878",
                desktop: "#787878",
            },
            contact: {
                mobile: "#787878",
                desktop: "#787878",
            }
        },
        // Backdrop colors and effects
        backdrop: {
            registration: {
                mobile: "rgba(38, 38, 38, 0.6)",
                desktop: "rgba(38, 38, 38, 0.6)",
                blur: "none",
            },
            info: {
                mobile: "rgba(38, 38, 38, 0.6)",
                desktop: "rgba(38, 38, 38, 0.6)",
                blur: "none",
            },
            waitlist: {
                mobile: "rgba(38, 38, 38, 0.6)",
                desktop: "rgba(38, 38, 38, 0.6)",
                blur: "none",
            },
            default: {
                mobile: "rgba(38, 38, 38, 0.6)",
                desktop: "rgba(38, 38, 38, 0.6)",
                blur: "none",
            }
        },
        // Text colors
        text: {
            primary: "#FFFFFF", // Dark Navy for readability on light gray
            secondary: "#FFFFFF",
            muted: "#FFFFFF",
            accent: "#3b82f6", // FindMe Blue
            link: "#3b82f6", // Changed to accent for better contrast
            danger: "#ea4335", // AME Red
            dark: "#2B365A",
            success: "#16a34a", // Darker green for accessibility
        },
        // Input fields and form elements
        input: {
            bg: "rgba(0, 0, 0, 0.05)",
            border: "rgba(0, 0, 0, 0.1)",
            text: "#FFFFFF",
            placeholder: "rgba(43, 54, 90, 0.4)",
            label: "FFFFFF",
            focusBorder: "rgba(59, 130, 246, 0.5)",
            clarity: {
                bg: "#f3f4f6",
                text: "#FFFFFF",
                placeholder: "#6b7280",
            }
        },
        // Components within modals
        components: {
            separator: {
                mobile: "#ffffff",
                desktop: "rgba(0, 0, 0, 0.1)",
            },
            iconContainer: "rgba(0, 0, 0, 0.05)",
            dropdownBg: "#787878",
            chipBg: "rgba(0, 0, 0, 0.05)",
            chipHover: "rgba(0, 0, 0, 0.08)",
            prompts: {
                blue: "rgba(59, 130, 246, 0.15)",
                white: "rgba(0, 0, 0, 0.05)",
                purple: "rgba(168, 85, 247, 0.15)",
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
