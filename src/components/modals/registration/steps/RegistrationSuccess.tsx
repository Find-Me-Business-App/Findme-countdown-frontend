"use client";

import Image from "next/image";
import { THEME } from "@/config/theme";

interface RegistrationSuccessProps {
    userName: string;
    businessName: string;
    onDone: () => void;
}

export default function RegistrationSuccess({ userName, businessName, onDone }: RegistrationSuccessProps) {
    return (
        <div className="flex flex-col w-full min-h-[400px] md:h-[450px] relative px-2 py-4 md:py-6 items-center justify-center text-center">
            {/* Header Section (Absolute top) */}
            <div className="absolute top-4 left-2 text-left w-full">
                <div
                    className="w-20 h-[3.5px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Welcome
                </h2>
                <p
                    className="text-lg md:text-xl font-medium"
                    style={{ color: "#2B365A" }}
                >
                    {userName || "Francis"}
                </p>
            </div>

            {/* Central Success Icon and Message */}
            <div className="flex flex-col items-center gap-8 mt-20">
                <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center shadow-2xl relative"
                    style={{ backgroundColor: "#2B365A" }}
                >
                    <Image 
                        src="/icons/success.svg" 
                        alt="Success" 
                        width={32} 
                        height={32}
                        className="brightness-0 invert"
                    />
                </div>
                
                <div className="flex flex-col gap-6 mt-4">
                    <h3 
                        className="text-2xl md:text-[28px] font-bold pb-2"
                        style={{ color: "white" }}
                    >
                        Registration complete
                    </h3>
                    <p 
                        className="text-lg md:text-xl font-normal max-w-md mx-auto mt-2"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                    >
                        Congrats! <span className="font-bold" style={{ color: "white" }}>{businessName || "CasaDiEmO"}</span> is now a business on <span className="font-medium" style={{ color: "#2B365A" }}>Find</span><span className="font-medium" style={{ color: "#FF5722" }}>Me</span>.
                    </p>
                </div>
            </div>

            {/* Done Button (Bottom Right) */}
            <button
                onClick={onDone}
                className="absolute bottom-6 right-6 text-lg md:text-xl font-bold transition-all hover:scale-105 active:scale-95"
                style={{ color: "white" }}
            >
                Done
            </button>
        </div>
    );
}
