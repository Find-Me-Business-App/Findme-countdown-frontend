"use client";

import { useState, useEffect } from "react";
import { useCreateWaitlist } from "@/hooks/useCreateWaitlist";
import { useModalStore } from "@/store/useModalStore";
import { SectionType } from "@/config/modal-configs";
import { THEME } from "@/config/theme";

interface WaitlistFormProps {
    section: SectionType;
}

export default function WaitlistForm({ section }: WaitlistFormProps) {
    const { closeModal, waitlistSubmissions, addWaitlistSubmission } = useModalStore();
    const [email, setEmail] = useState("");
    const { mutate, isPending, isError, error, isSuccess } = useCreateWaitlist();

    const isAlreadySubmitted = waitlistSubmissions.includes(email);

    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                closeModal();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, closeModal]);

    const handleSubmit = () => {
        if (!email || isPending || isSuccess || isAlreadySubmitted) return;
        mutate({ email, section }, {
            onSuccess: () => {
                addWaitlistSubmission(email);
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <label
                className="text-[13px] font-bold px-1"
                style={{ color: THEME.colors.text.primary }}
            >
                Enter your email
            </label>
            <div className="flex flex-col md:flex-row gap-3 w-full max-w-[480px]">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full md:flex-1 border-2 rounded-xl px-5 py-3 md:py-3.5 text-base focus:outline-none transition-all"
                    style={{
                        backgroundColor: THEME.colors.input.bg,
                        borderColor: THEME.colors.input.border,
                        color: THEME.colors.input.text
                    }}
                />
                <button
                    onClick={handleSubmit}
                    disabled={isPending || isSuccess || isAlreadySubmitted}
                    className="w-full md:w-auto bg-gradient-to-r from-[#2B365A] to-[#3B4B7A] text-white px-6 md:px-10 py-3 md:py-3.5 rounded-xl font-bold text-base md:text-[18px] tracking-[2px] transition-all shadow-xl disabled:opacity-50 shrink-0 hover:scale-[1.02] active:scale-[0.98] group"
                >
                    <span className="group-hover:brightness-125 transition-all">
                        {isPending ? "SENDING..." : "SEND"}
                    </span>
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
                <p className="text-green-500 text-xs mt-1">
                    Check your email to confirm registration! Closing in 2s...
                </p>
            )}
            {isAlreadySubmitted && email && (
                <p className="text-yellow-500 text-xs mt-1">
                    You have already joined the waitlist with this email.
                </p>
            )}
        </div>
    );
}
