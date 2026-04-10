"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { THEME } from "@/config/theme";
import AmeStepLayout from "./shared/AmeStepLayout";
import type { AmeUserInfo } from "./types";

interface UserInfoViewProps {
    onSubmit: (data: AmeUserInfo) => void;
}

/** Field-level validation errors */
interface FormErrors {
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
}

export default function UserInfoView({ onSubmit }: UserInfoViewProps) {
    const [formData, setFormData] = useState<AmeUserInfo>({
        name: "",
        email: "",
        password: "",
        phone: "",
        referralCode: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error on edit
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name || formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }
        if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formData.phone || formData.phone.trim().length < 7) {
            newErrors.phone = "Enter a valid phone number";
        }
        if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            onSubmit(formData);
        }
    };

    const inputClasses = "w-full bg-white/5 border rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-white/20";
    const labelClasses = "text-[10px] md:text-xs uppercase tracking-widest text-white font-semibold mb-1.5 ml-2";

    const getInputBorderClass = (field: keyof FormErrors) =>
        errors[field] ? "border-red-500/50" : "border-white/10";

    return (
        <AmeStepLayout align="items-start">
            {/* Center: AI Message & Form */}
            <div className="flex-1 flex flex-col items-start justify-center gap-3 md:gap-4 px-1 md:px-2 w-full overflow-y-auto ame-no-scrollbar py-2">
                <div className="flex flex-col gap-0.5 md:gap-1 text-left mb-1 md:mb-2 ml-2">
                    <p className="text-[15px] md:text-lg font-bold text-white leading-tight">
                        Finally, let&apos;s secure your account
                    </p>
                    <p className="text-[11px] md:text-xs text-white/50">Complete your details to finish registration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 md:gap-y-3 w-full max-w-lg">
                    <div className="flex flex-col">
                        <label className={labelClasses}>Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} className={`${inputClasses} ${getInputBorderClass("name")}`} placeholder="John Doe" />
                        {errors.name && <span className="text-red-400 text-[10px] mt-1 ml-2">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClasses}>Email Address</label>
                        <input name="email" value={formData.email} onChange={handleChange} className={`${inputClasses} ${getInputBorderClass("email")}`} placeholder="john@example.com" />
                        {errors.email && <span className="text-red-400 text-[10px] mt-1 ml-2">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClasses}>Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} className={`${inputClasses} ${getInputBorderClass("password")}`} placeholder="••••••••" />
                        {errors.password && <span className="text-red-400 text-[10px] mt-1 ml-2">{errors.password}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className={labelClasses}>Phone Number</label>
                        <input name="phone" value={formData.phone} onChange={handleChange} className={`${inputClasses} ${getInputBorderClass("phone")}`} placeholder="+1..." />
                        {errors.phone && <span className="text-red-400 text-[10px] mt-1 ml-2">{errors.phone}</span>}
                    </div>

                    <div className="md:col-span-2 flex flex-col md:flex-row items-stretch md:items-end gap-4 mt-1 md:mt-2">
                        <div className="flex flex-col w-full md:w-[240px]">
                            <label className={labelClasses}>Referral Code (Optional)</label>
                            <input name="referralCode" value={formData.referralCode} onChange={handleChange} className={`${inputClasses} border-white/10`} placeholder="Findme-XXXX" />
                        </div>

                        <motion.button
                            onClick={handleSubmit}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full md:w-auto px-8 py-3.5 md:py-3 rounded-xl font-bold text-[10px] md:text-xs tracking-widest uppercase relative overflow-hidden group shadow-xl h-[45px] md:h-auto"
                            style={{
                                backgroundColor: THEME.colors.actions.primary,
                                color: THEME.colors.text.primary
                            }}
                        >
                            {/* Animated Shimmer Effect */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                animate={{
                                    translateX: ["-100%", "100%"]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    repeatDelay: 1
                                }}
                                style={{ skewX: -20 }}
                            />

                            <span className="relative z-10 whitespace-nowrap">Complete Registration</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </AmeStepLayout>
    );
}
