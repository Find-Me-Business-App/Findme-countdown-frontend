"use client";

import { useState } from "react";
import { useCreateWaitlist } from "@/hooks/useCreateWaitlist";
import { SectionType } from "@/config/modal-configs";
import { THEME } from "@/config/theme";

interface WaitlistFormProps {
    section: SectionType;
}

export default function WaitlistForm({ section }: WaitlistFormProps) {
    const [email, setEmail] = useState("");
    const { mutate, isPending, isError, error, isSuccess } = useCreateWaitlist();

    const handleSubmit = () => {
        if (!email) return;
        mutate({ email, section });
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <label 
                className="text-[13px] font-bold px-1"
                style={{ color: "#FFFFFF" }}
            >
                Enter your email
            </label>
            <div className="flex flex-row gap-3 w-full max-w-[480px]">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="obinnaegbule@yahoo.com"
                    className="flex-1 border-2 border-white/40 rounded-xl px-5 py-3.5 text-base focus:outline-none transition-all placeholder:text-white/30 text-white"
                    style={{ 
                        backgroundColor: "transparent",
                    }}
                />
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="bg-gradient-to-r from-[#2B365A] to-[#3B4B7A] text-white px-10 py-3.5 rounded-xl font-bold text-[18px] tracking-[2px] hover:brightness-125 transition-all shadow-xl disabled:opacity-50 shrink-0"
                >
                    {isPending ? "SENDING..." : "SEND"}
                </button>
            </div>
            {isError && (
                <p 
                    className="text-xs mt-1"
                    style={{ color: THEME.colors.text.danger }}
                >
                    {error.message}
                </p>
            )}
            {isSuccess && (
                <p 
                    className="text-green-500 text-xs mt-1"
                >
                    Check your email to confirm registration!
                </p>
            )}
        </div>
    );
}

