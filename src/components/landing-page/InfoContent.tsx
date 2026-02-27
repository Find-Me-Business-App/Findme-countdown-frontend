"use client";

import Image from "next/image";

interface InfoContentProps {
    config: {
        imagePath: string;
        accentColor: string;
        title: string;
        description: string;
        subDescription: string;
        titleColor?: string;
    };
}

export default function InfoContent({ config }: InfoContentProps) {
    return (
        <>
            {/* Mobile Image (Top) */}
            <div className="relative w-full h-[220px] md:hidden pointer-events-none mb-4 whitespace-normal">
                <Image
                    src={config.imagePath}
                    alt="Illustration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Desktop Image (Right - unchanged) */}
            <div className="absolute right-0 bottom-0 z-0 pointer-events-none hidden md:block">
                <Image
                    src={config.imagePath}
                    alt="Illustration"
                    width={300}
                    height={300}
                    className="object-contain"
                    priority
                />
            </div>

            <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left md:p-14 w-full md:w-[65%] whitespace-normal">
                {/* Header Section */}
                <div className="mb-6 md:mb-8 flex flex-col items-center md:items-start">
                    <div className={`hidden md:block w-32 h-1 ${config.accentColor} mb-3`} />
                    <div className={`md:hidden w-16 h-1 mb-4 rounded-full ${config.accentColor || 'bg-white'}`} />
                    <span className="text-white/40 text-sm md:text-xl font-medium uppercase tracking-widest md:normal-case md:tracking-normal">More Information</span>
                </div>

                {/* Main Title & Description */}
                <div className="mb-8 md:mb-10 flex flex-col items-center md:items-start">
                    <h2 className={`text-xl md:text-3xl font-bold mb-4 ${config.titleColor || 'text-white'}`}>
                        {config.title}
                    </h2>
                    <p className="text-white/70 text-sm md:text-base leading-relaxed px-2 md:px-0">
                        {config.description}
                    </p>
                </div>

                {/* Sub Content */}
                <div className="mt-4 md:mt-auto flex flex-col items-center md:items-start">
                    <div className="w-3/4 md:w-48 h-px bg-white/20 mb-6" />
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed px-4 md:px-0">
                        {config.subDescription}
                    </p>
                </div>
            </div>
        </>
    );
}
