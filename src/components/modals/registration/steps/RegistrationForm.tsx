"use client";

import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import { useCreateUser } from "@/hooks/useCreateUser";
import { CreateUserRequest } from "@/services/api";
import { SectionType } from "@/config/modal-configs";
import { THEME } from "@/config/theme";

interface RegistrationFormProps {
    section: SectionType;
    onSuccess?: () => void;
    onNext?: (data: { name: string; email: string; role: string; userId: string }) => void;
}

export interface RegistrationFormHandle {
    submit: () => void;
}

const ROLES = ["Sponsor", "Guest", "Artist", "Festival Artisan", "Business", "Volunteer"];

const RegistrationForm = forwardRef<RegistrationFormHandle, RegistrationFormProps>(function RegistrationForm({ section, onSuccess, onNext }, ref) {
    const { mutate, isPending, isError, error, isSuccess } = useCreateUser();
    const isFestival = section === "festival";
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.requestSubmit();
        },
    }));

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        referralCode: "",
        password: "",
        role: "Sponsor",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleSelect = (role: string) => {
        setFormData(prev => ({ ...prev, role }));
        setIsRoleOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Omit empty optional fields to avoid validation errors
        const submissionData: CreateUserRequest = { ...formData, section };
        if (!submissionData.referralCode) delete submissionData.referralCode;
        // Festival participants don't enter a password, so provide a default for the backend
        if (!submissionData.password) submissionData.password = "festival_default";

        mutate(submissionData, {
            onSuccess: (response) => {
                if ((section === "business" || section === "festival") && onNext) {
                    onNext({ name: formData.name, email: formData.email, role: formData.role, userId: response.data.user._id });
                }
                if (onSuccess) onSuccess();
            }
        });
    };

    const inputClasses = "rounded-xl md:rounded-2xl px-3.5 py-2 md:py-2.5 text-sm md:text-sm focus:outline-none transition-colors border placeholder:text-white/20";
    const inputStyles = {
        backgroundColor: THEME.colors.input.bg,
        borderColor: THEME.colors.input.border,
        color: THEME.colors.input.text
    };
    const labelClasses = "text-[10px] md:text-[11px] font-semibold px-1 uppercase tracking-wider";
    const labelStyles = {
        color: THEME.colors.input.label
    };

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4 scrollbar-hide">
            <div className="flex flex-col gap-1 md:gap-1.5">
                <label
                    className={labelClasses}
                    style={labelStyles}
                >
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className={inputClasses}
                    style={inputStyles}
                />
            </div>

            {isFestival && (
                <div className="flex flex-col gap-3 md:gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className="flex flex-col gap-1 md:gap-1.5">
                            <label className={labelClasses} style={labelStyles}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                required
                                className={inputClasses}
                                style={inputStyles}
                            />
                        </div>
                        <div className="flex flex-col gap-1 md:gap-1.5">
                            <label className={labelClasses} style={labelStyles}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 (555) 000-0000"
                                required
                                className={inputClasses}
                                style={inputStyles}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 md:gap-1.5 relative">
                        <div
                            onClick={() => setIsRoleOpen(!isRoleOpen)}
                            className={`${inputClasses} flex items-center justify-between cursor-pointer`}
                            style={inputStyles}
                        >
                            <span>{formData.role}</span>
                            <svg
                                className={`w-5 h-5 transition-transform duration-200 ${isRoleOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {isRoleOpen && (
                            <div
                                className="absolute top-full left-0 right-0 mt-2 border rounded-xl overflow-hidden z-[110] shadow-2xl"
                                style={{
                                    backgroundColor: THEME.colors.components.dropdownBg,
                                    borderColor: "var(--modal-separator, rgba(0,0,0,0.1))"
                                }}
                            >
                                {ROLES.map((role) => (
                                    <div
                                        key={role}
                                        onClick={() => handleRoleSelect(role)}
                                        className="px-4 py-2 hover:bg-white/10 text-white text-sm cursor-pointer transition-colors"
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {(section === "home" || section === "business") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label
                            className={labelClasses}
                            style={labelStyles}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                            className={inputClasses}
                            style={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            className={labelClasses}
                            style={labelStyles}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            className={inputClasses}
                            style={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            className={labelClasses}
                            style={labelStyles}
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            required
                            className={inputClasses}
                            style={inputStyles}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label
                            className={labelClasses}
                            style={labelStyles}
                        >
                            Referral (Optional)
                        </label>
                        <input
                            type="text"
                            name="referralCode"
                            value={formData.referralCode}
                            onChange={handleChange}
                            placeholder="Code"
                            className={inputClasses}
                            style={inputStyles}
                        />
                    </div>
                </div>
            )}

            <div className={`mt-2 md:mt-4 flex flex-col ${section === 'business' ? 'items-center' : 'items-start'} gap-2`}>
                <button
                    type="submit"
                    disabled={isPending}
                    className={
                        section === 'business'
                            ? "w-full text-white font-bold text-sm md:text-base hover:text-white/80 transition-colors py-2"
                            : `w-full md:w-auto px-10 py-3 md:py-3.5 text-white rounded-lg md:rounded-xl font-bold text-xs md:text-sm tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 shadow-lg`
                    }
                    style={section !== 'business' ? { backgroundColor: THEME.colors.actions.primary } : {}}
                >
                    {isPending ? "Submitting..." : section === 'business' ? "Continue with form" : "Participate"}
                </button>
                {isError && (
                    <p
                        className="text-[10px] md:text-xs"
                        style={{ color: THEME.colors.text.danger }}
                    >
                        {error?.message || "An error occurred"}
                    </p>
                )}
                {isSuccess && (
                    <p
                        className="text-green-500 text-[10px] md:text-xs"
                    >
                        Registration successful!
                    </p>
                )}
            </div>
        </form>
    );
});

export default RegistrationForm;
