"use client";

import { useState } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import { SectionType } from "@/config/modal-configs";

interface RegistrationFormProps {
    section: SectionType;
    onSuccess?: () => void;
}

export default function RegistrationForm({ section, onSuccess }: RegistrationFormProps) {
    const { mutate, isPending, isError, error, isSuccess } = useCreateUser();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        referralCode: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate({ ...formData, section }, {
            onSuccess: () => {
                if (onSuccess) onSuccess();
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mb-2">
            <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                />
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] md:text-[10px] font-semibold px-1 uppercase tracking-wider">Referral (Optional)</label>
                <input
                    type="text"
                    name="referralCode"
                    value={formData.referralCode}
                    onChange={handleChange}
                    placeholder="Code"
                    className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-white text-sm md:text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/10"
                />
            </div>

            <div className="md:col-span-2 mt-2 md:mt-3 flex flex-col items-center gap-2">
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full md:w-auto px-8 py-2.5 bg-white text-black rounded-full font-bold text-xs md:text-sm hover:bg-white/90 transition-all disabled:opacity-50"
                >
                    {isPending ? "Submitting..." : "Join Waitlist"}
                </button>
                {isError && (
                    <p className="text-red-500 text-[10px] md:text-xs">
                        {error.message}
                    </p>
                )}
                {isSuccess && (
                    <p className="text-green-500 text-[10px] md:text-xs">
                        Registration successful!
                    </p>
                )}
            </div>
        </form>
    );
}
