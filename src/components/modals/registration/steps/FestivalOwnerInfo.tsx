"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Plus, Check, User, Mail, Phone, Percent } from "lucide-react";
import { THEME } from "@/config/theme";

interface FestivalOwnerFormData {
    ownershipType: string;
    name: string;
    email: string;
    phone: string;
    ownershipShare: string;
}

interface FestivalOwnerInfoProps {
    ownershipType: string;
    onSubmit: (data: FestivalOwnerFormData) => void;
}

const OWNERSHIP_TYPES = [
    "Founder",
    "Creator",
    "Franchise",
    "Investor",
    "Temporary owner",
    "Volunteer"
];

export default function FestivalOwnerInfo({ ownershipType, onSubmit }: FestivalOwnerInfoProps) {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        ownershipType: "Founder",
        name: "",
        email: "",
        phone: "",
        ownershipShare: ownershipType === "Partnership" ? "50%" : "100%"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeSelect = (type: string) => {
        setFormData(prev => ({ ...prev, ownershipType: type }));
        setIsTypeOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate a small delay for premium feedback
        setTimeout(() => {
            onSubmit(formData);
            setIsSubmitting(false);
        }, 1200);
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = () => setIsTypeOpen(false);
        if (isTypeOpen) window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isTypeOpen]);

    const inputClasses = "w-full rounded-2xl px-5 py-4 focus:outline-none transition-all border font-bold text-base md:text-lg shadow-sm";
    const labelClasses = "text-[12px] md:text-[13px] font-bold ml-1 uppercase tracking-wider opacity-60";

    return (
        <div className="flex flex-col w-full h-full md:h-[600px] relative overflow-hidden">
            {/* Header section (fixed) */}
            <div className="flex flex-col mb-4 pt-2 md:pt-4">
                <div
                    className="w-16 md:w-20 h-1 mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Personal Information
                </h2>
                <p
                    className="text-base md:text-xl opacity-70 mb-4 md:mb-6"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>

                <div className="bg-black/5 rounded-2xl p-4 border border-black/5 mb-2">
                    <p 
                        className="text-[13px] font-medium opacity-60 leading-relaxed"
                        style={{ color: "#2B365A" }}
                    >
                        Owner has full authorization and business key would be sent to the email address provided.
                    </p>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-32 no-scrollbar custom-scrollbar md:pr-2">
                <form id="owner-form" onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Ownership Type Section */}
                    <div className="flex flex-col gap-2 relative">
                        <label className={labelClasses} style={{ color: "#2B365A" }}>
                            Ownership type
                        </label>
                        <div className="flex flex-row items-center gap-3">
                            <div className="relative flex-1">
                                <button
                                    type="button" 
                                    onClick={(e) => { e.stopPropagation(); setIsTypeOpen(!isTypeOpen); }}
                                    className={`${inputClasses} flex items-center justify-between bg-white text-left`}
                                    style={{ 
                                        borderColor: isTypeOpen ? THEME.colors.actions.primary : THEME.colors.input.border,
                                        color: "#2B365A" 
                                    }}
                                >
                                    <span>{formData.ownershipType}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isTypeOpen ? 'rotate-180' : 'opacity-40'}`} />
                                </button>

                                {isTypeOpen && (
                                    <div 
                                        className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-2xl overflow-hidden z-[150] shadow-2xl border bg-white animate-in fade-in slide-in-from-top-2 duration-200"
                                        style={{ borderColor: "rgba(0,0,0,0.1)" }}
                                    >
                                        <div className="max-h-[200px] overflow-y-auto no-scrollbar py-2">
                                            {OWNERSHIP_TYPES.map((type) => (
                                                <div
                                                    key={type}
                                                    onClick={() => handleTypeSelect(type)}
                                                    className="px-6 py-3 hover:bg-black/5 cursor-pointer transition-colors text-base font-bold flex items-center justify-between group"
                                                    style={{ color: "#2B365A" }}
                                                >
                                                    <span>{type}</span>
                                                    {formData.ownershipType === type && <Check size={18} className="opacity-40" />}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="button" 
                                className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border-2 border-dashed flex items-center justify-center opacity-40 hover:opacity-100 hover:border-black/20 transition-all active:scale-95 group"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <Plus className="w-6 h-6" style={{ color: "#2B365A" }} />
                            </button>
                        </div>
                    </div>

                    {/* Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses} style={{ color: "#2B365A" }}>Full Name</label>
                        <div className="relative">
                            <User size={20} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" style={{ color: "#2B365A" }} />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Alan Watson"
                                required
                                className={`${inputClasses} pl-16 bg-white`}
                                style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                            />
                        </div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses} style={{ color: "#2B365A" }}>Email Address</label>
                        <div className="relative">
                            <Mail size={20} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" style={{ color: "#2B365A" }} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="alanwatson@gmail.com"
                                required
                                className={`${inputClasses} pl-16 bg-white`}
                                style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                            />
                        </div>
                    </div>

                    {/* Phone & Ownership Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses} style={{ color: "#2B365A" }}>Phone Number</label>
                            <div className="relative">
                                <Phone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" style={{ color: "#2B365A" }} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="09036925536"
                                    required
                                    className={`${inputClasses} pl-16 bg-white`}
                                    style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses} style={{ color: "#2B365A" }}>Ownership Percentage</label>
                            <div className="relative">
                                <Percent size={18} className="absolute left-6 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none" style={{ color: "#2B365A" }} />
                                <input
                                    type="text"
                                    name="ownershipShare"
                                    value={formData.ownershipShare}
                                    onChange={handleChange}
                                    className={`${inputClasses} pl-16 bg-white`}
                                    style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Action Buttons Container (fixed) */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-end pointer-events-none z-[160] px-1 md:px-0">
                <div className="pointer-events-auto">
                    <button
                        type="submit"
                        form="owner-form"
                        disabled={isSubmitting}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 group relative"
                        style={{ backgroundColor: THEME.colors.actions.primary }}
                    >
                        {isSubmitting ? (
                            <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
}
