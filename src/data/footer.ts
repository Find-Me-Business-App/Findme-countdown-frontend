import { Facebook, Instagram, Linkedin, Twitter, LucideIcon } from "lucide-react";

export interface FooterSection {
    title: string;
    links: string[];
}

export const FOOTER_LINKS: FooterSection[] = [
    {
        title: "HOME",
        links: ["About us", "Categories", "Features", "Publish", "Terms"],
    },
    {
        title: "SERVICES",
        links: ["Plans", "Business dashboard", "Business Network", "Integrations", "Multiverse"],
    },
    {
        title: "FEATURES",
        links: ["Create", "Wallet", "E-App", "Charity", "Eco"],
    },
    {
        title: "CONTACT",
        links: ["Download App", "Support", "FAQ", "Find Agent", "Service Centers"],
    },
];

export interface SocialLink {
    Icon: LucideIcon;
    href: string;
}

export const SOCIALS: SocialLink[] = [
    { Icon: Facebook, href: "#" },
    { Icon: Instagram, href: "#" },
    { Icon: Linkedin, href: "#" },
    { Icon: Twitter, href: "#" },
];
