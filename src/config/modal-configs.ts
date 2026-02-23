export type SectionType = "home" | "business" | "festival";

export interface ModalSectionConfig {
    title: string;
    description: string;
    callNumber: string;
    whatsappNumber: string;
    email: string;
    gradientClass: string;
}

export interface WaitlistSectionConfig {
    title: string;
    description: string;
    actionLabel?: string;
    actionLink?: string;
    svgPath: string;
    buttonGradient: string;
}

export interface RegistrationSectionConfig {
    title: string;
    description: string;
    accentColor: string;
}

export interface InfoSectionConfig {
    title: string;
    description: string;
    subDescription: string;
    imagePath: string;
    accentColor: string;
    titleColor?: string;
}

export const MODAL_CONFIGS: Record<SectionType, ModalSectionConfig> = {
    home: {
        title: "Connect",
        description: "Let us know what experience you want.",
        callNumber: "+2348137306313",
        whatsappNumber: "+2348137306313",
        email: "Contact.findme.app@gmail.com",
        gradientClass: "from-[#1e293b] to-[#0f172a]"
    },
    business: {
        title: "Connect",
        description: "Get in touch let us build up in a better world together.",
        callNumber: "+2348137306313",
        whatsappNumber: "+2348137306313",
        email: "Business.findme.app@gmail.com",
        gradientClass: "from-[#1e293b] via-[#312e81] to-[#4c1d95]"
    },
    festival: {
        title: "Connect",
        description: "Be part of our upbeat team in bringing fun and enjoyment.",
        callNumber: "+2348137306313",
        whatsappNumber: "+2348137306313",
        email: "Festival.findme.app@gmail.com",
        gradientClass: "from-[#1e293b] via-[#581c87] to-[#7f1d1d]"
    }
};

export const WAITLIST_CONFIGS: Record<SectionType, WaitlistSectionConfig> = {
    home: {
        title: "Join The Waitlist",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        svgPath: "/Findme/waitlist1.svg",
        buttonGradient: "from-[#1e293b] to-[#334155]"
    },
    business: {
        title: "Join The Waitlist",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        actionLabel: "Register your business",
        actionLink: "#",
        svgPath: "/Findme/waitlist2.svg",
        buttonGradient: "from-[#1e1b4b] to-[#312e81]"
    },
    festival: {
        title: "Join The Waitlist",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        actionLabel: "Participate",
        actionLink: "#",
        svgPath: "/Findme/waitlist3.svg",
        buttonGradient: "from-[#450a0a] to-[#7f1d1d]"
    }
};

export const INFO_CONFIGS: Record<SectionType, InfoSectionConfig> = {
    home: {
        title: "About FindMe",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/Findme/more-info1.png",
        accentColor: "bg-white",
    },
    business: {
        title: "FindMe For Business",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/Findme/more-info2.png",
        accentColor: "bg-[#1e3a8a]",
        titleColor: "text-[#1e3a8a]"
    },
    festival: {
        title: "About Launch Festival",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/Findme/more-info3.png",
        accentColor: "bg-[#1e3a8a]",
    }
};

export const REGISTRATION_CONFIGS: Partial<Record<SectionType, RegistrationSectionConfig>> = {
    business: {
        title: "Early Bird",
        description: "Create, manage and automate all aspects of your business tracking.",
        accentColor: "bg-white",
    },
    festival: {
        title: "Participate",
        description: "Create, manage and automate all aspects of your business tracking.",
        accentColor: "bg-white",
    }
};


