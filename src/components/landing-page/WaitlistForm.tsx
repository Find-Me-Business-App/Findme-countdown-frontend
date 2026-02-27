"use client";

import { useState } from "react";
import { useCreateWaitlist } from "@/hooks/useCreateWaitlist";
import { SectionType } from "@/config/modal-configs";

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
        <div className="flex flex-col gap-3 mb-12 w-full max-w-[320px] md:max-w-[440px] items-center md:items-start whitespace-normal">
            <label className="text-white/40 text-xs md:text-sm font-medium px-1">Enter your email</label>
            <div className="flex flex-col md:flex-row gap-3 w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-white/5 border border-white/20 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/20 text-center md:text-left"
                />
                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="bg-[#2c375b] text-white px-8 py-3.5 rounded-xl font-bold text-sm tracking-widest hover:brightness-110 transition-all shadow-xl w-full md:w-auto disabled:opacity-50"
                >
                    {isPending ? "SENDING..." : "SEND"}
                </button>
            </div>
            {isError && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            {isSuccess && <p className="text-green-500 text-xs mt-1">Check your email to confirm registration!</p>}
        </div>
    );
}
