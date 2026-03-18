"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { THEME } from "@/config/theme";

interface AccountTypeSelectionProps {
    onSelect: (type: "business" | "listing") => void;
}

export default function AccountTypeSelection({ onSelect }: AccountTypeSelectionProps) {
    return (
        <div className="flex flex-col w-full">
            <div className="mb-8">
                <div
                    className="w-14 h-[3px] mb-5 opacity-90"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-2 md:mb-3 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Choose your account
                </h2>
                <p
                    className="text-base md:text-lg opacity-90"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Select the business account that best suits you
                </p>
            </div>

            <div className="flex flex-col">
                <div
                    className="h-[1.5px] w-full mb-2"
                    style={{ backgroundColor: "var(--modal-separator, rgba(0,0,0,0.1))" }}
                />

                {/* Create your business */}
                <button
                    onClick={() => onSelect("business")}
                    className="flex items-center justify-between py-5 group hover:bg-white/5 transition-colors px-1 rounded-xl"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-start text-left">
                            <h3
                                className="font-bold text-lg md:text-xl flex items-center gap-2"
                                style={{ color: THEME.colors.text.primary }}
                            >
                                Create your business
                                <div className="ml-1">
                                    <Image
                                        src={THEME.assets.icons.insights.one}
                                        alt="Business"
                                        width={28}
                                        height={28}
                                        className="object-contain"
                                    />
                                </div>
                            </h3>
                            <p
                                className="text-base md:text-lg leading-relaxed mt-1.5 max-w-[450px]"
                                style={{ color: THEME.colors.text.secondary }}
                            >
                                Create your new business or manage your already existing business
                            </p>
                        </div>
                    </div>
                    <ChevronRight
                        className="w-5 h-5 group-hover:text-white group-hover:translate-x-1 transition-all"
                        style={{ color: THEME.colors.text.muted }}
                    />
                </button>

                <div
                    className="h-[1.5px] w-full my-2"
                    style={{ backgroundColor: "var(--modal-separator, rgba(0,0,0,0.1))" }}
                />

                {/* Register business as a listing */}
                <button
                    onClick={() => onSelect("listing")}
                    className="flex items-center justify-between py-5 group hover:bg-white/5 transition-colors px-1 rounded-xl"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-start text-left">
                            <h3
                                className="font-bold text-lg md:text-xl flex items-center gap-2"
                                style={{ color: THEME.colors.text.primary }}
                            >
                                Register business as a listing
                                <div className="ml-1 relative">
                                    <Image
                                        src={THEME.assets.icons.insights.two}
                                        alt="Listing"
                                        width={28}
                                        height={28}
                                        className="object-contain"
                                    />
                                    <span className="absolute -top-1.5 -right-1.5 text-[24px]">🚫</span>
                                </div>
                            </h3>
                            <p
                                className="text-base md:text-lg leading-relaxed mt-1.5 max-w-[450px]"
                                style={{ color: THEME.colors.text.secondary }}
                            >
                                Create your business as a listing without a dashboard
                            </p>
                        </div>
                    </div>
                    <ChevronRight
                        className="w-6 h-6 group-hover:text-white group-hover:translate-x-1 transition-all"
                        style={{ color: THEME.colors.text.muted }}
                    />
                </button>

                <div
                    className="h-[1.5px] w-full mt-2"
                    style={{ backgroundColor: "var(--modal-separator, rgba(0,0,0,0.1))" }}
                />
            </div>
        </div>
    );
}

