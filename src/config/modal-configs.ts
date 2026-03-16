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
        description: "Be part of our community by joining the waitlist and get important updates of the product launch. The Launch is already here. Get Started Today.",
        svgPath: "/waitlist1.svg",
        buttonGradient: "from-[#1e293b] to-[#334155]"
    },
    business: {
        title: "Join The Waitlist",
        description: "Join our business community. Get Started by registering as an early bird and get important updates of the product launch. The Launch is already here.",
        actionLabel: "Register your business",
        actionLink: "#",
        svgPath: "/waitlist2.svg",
        buttonGradient: "from-[#1e1b4b] to-[#312e81]"
    },
    festival: {
        title: "Join The Waitlist",
        description: "Participate in the Festival community by joining the waitlist and get important updates of the festival. The Launch is already here.",
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
        description: "FindMe App Business is the easiest way to run a business. As a business owner today, there are on-ground issues which are a hassle to manage all functions of the business, from recruitment, to company setup and  administration management. That is why it is said that running business is for the tough. Forget online productivity tools, there are in-house business systems and daily business pain-points that businesses experience. Lets come back online, in today's world, do you know how much businesses spend on various platform subscriptions? FindMe provides the framework for the application of all these functions seamlessly in one system. FindMe is a seamless all-in-one enterprise solution providing AI tools for business management, operations, financial organizations, research enhancement and custom design. By integrating tailored AI models and multi business synchronization, it streamlines complex operations within your business infrastructure tailored by global standards. FindMe also tracks ecological impact while providing strategic insights, automated updates, and localized field support from trained FindMe Agents. Try FindMe today and kickstart your journey into meaning by registering your business now on the website and a notification would be sent to your email when your dashboard is ready.Thank You",
        subDescription: "Create, manage and automate all astacking.",
        imagePath: "/more-info2.png",
        accentColor: "bg-[#1e3a8a]",
        titleColor: "text-[#1e3a8a]"
    },
    festival: {
        title: "About Launch Festival",
        description: "FindMe Launch Festival  is a 3-day open festival of dance, music and technologies making the launch of AGI what we boldly believe is one of the most useful apps in the world. This day also marks the start of our annual mega festival events globally and other subsequent events that would be taking place from time to time But this is bigger than an app. FindMe Festival is where music, dance, culture, and technology collide to celebrate Africa, our journey, our creativity, our resilience, and our future. It’s about honoring how far we’ve come and stepping confidently into what’s next. The festival is built on three pillars: connection, fun, and growth. Merchants and creatives will showcase their products and services to a vibrant audience, while Africa’s spirit and energy take center stage - raw, authentic, and unforgettable.We’ll unveil what FindMe stands for, how it works, the benefits it offers, and the opportunities ahead including how individuals can use AI to improve input, amplify output, and unlock new levels of personal and business growth. This is an invitation. To connect, To build, To celebrate, To be part of something from the very beginning.Cross borders and distance, we stretch out our hands in friendship, come and make this festival unforgettable. Attend, Participate, Experienc. FindMe Festival isn’t just an event. It’s a moment you don’t want to miss.Festival Artisans and Businesses that are to participate in the festival can rent their stands in the setup from the Participate  button. Welcome once again to the world of FindMe as we celebrate in vibrant sounds and colours.Participate>>>>",
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


