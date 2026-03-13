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
        svgPath: "/waitlist1.svg",
        buttonGradient: "from-[#1e293b] to-[#334155]"
    },
    business: {
        title: "Join The Waitlist",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        actionLabel: "Register your business",
        actionLink: "#",
        svgPath: "/waitlist2.svg",
        buttonGradient: "from-[#1e1b4b] to-[#312e81]"
    },
    festival: {
        title: "Join The Waitlist",
        description: "Create, manage and automate all aspects of your business operations seamlessly with limitless integrations from Sales, inventory, payroll, portfolio, logistics and tracking.",
        actionLabel: "Participate",
        actionLink: "#",
        svgPath: "/waitlist3.svg",
        buttonGradient: "from-[#450a0a] to-[#7f1d1d]"
    }
};

export const INFO_CONFIGS: Record<SectionType, InfoSectionConfig> = {
    home: {
       title: "About FindMe",
       description: "FindMe is a unified digital ecosystem connecting individuals and businesses through AI-powered systems. Operating as a scalable SaaS solution, it simplifies service discovery, financial organization, and multi-enterprise synchronization within one interface. Beyond digital tools, FindMe deploys trained physical agents for localized support, ensuring neighborhood enterprises thrive. From procurement to recycling, the platform manages the entire business lifecycle while promoting global sustainability standards to ensure no one is left behind in the digital age.",
       subDescription: "Create, manage and automate all astacking.",
       imagePath: "/more-info1.png",
       accentColor: "bg-white"
    },
    business: {
        title: "FindMe Business",
        description: "FindMe Business is an all-in-one enterprise solution providing advertising, financial organization, research enhancement, and custom design. By integrating tailored AI models and multi-business synchronization, it streamlines complex operations within a global ecosystem. The platform also tracks ecological impact while providing strategic insights, automated updates, and localized field support from trained FindMe Agents.",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/more-info2.png",
        accentColor: "bg-[#1e3a8a]",
        titleColor: "text-[#1e3a8a]"
    },
    festival: {
        title: "About Launch Festival",
        description: "FindMe Festival is not just another event , it’s a 3-Day Open Festival marking the launch of what we boldly believe will become one of the most useful apps in the world.But this is bigger than an app.FindMe Festival is where music, dance, culture, and technology collide to celebrate Africa, our journey, our creativity, our resilience, and our future. It’s about honoring how far we’ve come and stepping confidently into what’s next.The festival is built on three pillars: connection, fun, and growth.Merchants and creatives will showcase their products and services to a vibrant audience, while Africa’s spirit and energy take center stage - raw, authentic, and unforgettable.We’ll unveil what FindMe stands for, how it works, the benefits it offers, and the opportunities ahead including how individuals can use AI to improve input, amplify output, and unlock new levels of personal and business growth.This is an invitation. To connect. To build. To celebrate. To be part of something from the very beginning.Across borders and distance, we stretch out our hands in friendship,  come and make this festival unforgettable.Attend. Participate. Experience.FindMe Festival isn’t just an event. It’s a moment you don’t want to miss.",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/more-info3.png",
        accentColor: "bg-[#1e3a8a]",
    }
};

export const REGISTRATION_CONFIGS: Partial<Record<SectionType, RegistrationSectionConfig>> = {
    business: {
        title: "Early Bird",
        description: "Be among the first businesses on FindMe. Lets make history today",
        accentColor: "bg-white",
    },
    festival: {
        title: "Participate",
        description: "Lets make FindMe Launch Festival a memorable experience by joining hands where matters.",
        accentColor: "bg-white",
    }
};


