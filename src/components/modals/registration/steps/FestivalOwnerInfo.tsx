"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Plus } from "lucide-react";

interface FestivalOwnerFormData {
    ownershipType: string;
    name: string;
    email: string;
    phone: string;
}

interface FestivalOwnerInfoProps {
    onSubmit: (data: FestivalOwnerFormData) => void;
    onBack?: () => void;
}

const OWNERSHIP_TYPES = [
    "Founder",
    "Creator",
    "Franchise",
    "Investor",
    "Temporary owner",
    "Volunteer"
];

export default function FestivalOwnerInfo({ onSubmit, onBack }: FestivalOwnerInfoProps) {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [formData, setFormData] = useState({
        ownershipType: "Founder",
        name: "",
        email: "",
        phone: ""
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
        onSubmit(formData);
    };

    const inputClasses = "w-full rounded-2xl px-5 py-3.5 focus:outline-none transition-colors border font-medium text-[15px]";

    return (
        <div className="flex flex-col w-full h-full min-h-[500px] relative">
            {/* Modal Header */}
            <div className="mb-6 px-1 shrink-0">
                <div
                    className="w-16 h-[3px] mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: "#FFFFFF" }}
                />
                <h2
                    className="text-[22px] font-bold mb-1 tracking-tight"
                    style={{ color: "#FFFFFF" }}
                >
                    Personal Information
                </h2>
                <p
                    className="text-[15px] opacity-60"
                    style={{ color: "#FFFFFF" }}
                >
                    Owners Information
                </p>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto max-h-[450px] pr-2 scrollbar-hide pb-10">
                <p 
                    className="text-[13px] opacity-40 mb-8 max-w-[85%] leading-relaxed pl-1"
                    style={{ color: "#FFFFFF" }}
                >
                    Owner has full authorization and business key would be sent to the email address provided.
                </p>

                <form id="owner-form" onSubmit={handleSubmit} className="flex flex-col gap-6 px-1">
                    {/* Ownership Type row */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold ml-1" style={{ color: "#2B365A" }}>
                            Ownership type
                        </label>
                        <div className="flex flex-row items-center gap-4">
                            <div className="relative flex-1">
                                <div 
                                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                                    className={`${inputClasses} flex items-center justify-between cursor-pointer`}
                                    style={{ 
                                        backgroundColor: "#EBEBEB", 
                                        borderColor: "transparent",
                                        color: "#2B365A" 
                                    }}
                                >
                                    <span>{formData.ownershipType}</span>
                                    <ChevronDown className={`w-5 h-5 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {isTypeOpen && (
                                    <div 
                                        className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-[130] shadow-xl py-2 border border-white/10"
                                        style={{ backgroundColor: "#F5F5F5" }}
                                    >
                                        {OWNERSHIP_TYPES.map((type) => (
                                            <div
                                                key={type}
                                                onClick={() => handleTypeSelect(type)}
                                                className="px-5 py-2.5 hover:bg-black/5 cursor-pointer transition-colors text-[14px] font-medium"
                                                style={{ color: "#2B365A" }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button 
                                type="button" 
                                className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                                style={{ color: "#2B365A" }}
                            >
                                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: "#8C8C8C" }}>
                                    <Plus className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                                <span className="text-[13px] font-bold">Add another owner</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold ml-1" style={{ color: "#2B365A" }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Alan Watson"
                            required
                            className={inputClasses}
                            style={{ backgroundColor: "#EBEBEB", borderColor: "transparent", color: "#2B365A" }}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[13px] font-bold ml-1" style={{ color: "#2B365A" }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Alanwatson@gmail.com"
                            required
                            className={inputClasses}
                            style={{ backgroundColor: "#EBEBEB", borderColor: "transparent", color: "#2B365A" }}
                        />
                    </div>

                    <div className="flex flex-row gap-3">
                        <div className="flex flex-col gap-2 flex-1">
                            <label className="text-[13px] font-bold ml-1" style={{ color: "#2B365A" }}>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="09036925536"
                                required
                                className={inputClasses}
                                style={{ backgroundColor: "#EBEBEB", borderColor: "transparent", color: "#2B365A" }}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-[40%]">
                            <label className="text-[13px] font-bold ml-1" style={{ color: "#2B365A" }}>Ownership</label>
                            <input
                                type="text"
                                name="ownership"
                                defaultValue="100%"
                                className={inputClasses}
                                style={{ backgroundColor: "#EBEBEB", borderColor: "transparent", color: "#2B365A" }}
                            />
                        </div>
                    </div>

                    {/* Navigation Buttons inside scroll - Aligned to bottom right of form */}
                    <div className="flex justify-between items-center pt-8 pb-4">
                        {onBack && (
                            <button
                                type="button"
                                onClick={onBack}
                                className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20 hover:bg-white/10 transition-all hover:scale-105 active:scale-95 group"
                            >
                                <ChevronRight className="w-8 h-8 text-white rotate-180" strokeWidth={3} />
                            </button>
                        )}
                        <button
                            type="submit"
                            form="owner-form"
                            className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 group ml-auto"
                            style={{ backgroundColor: "#2B365A" }}
                        >
                            <ChevronRight className="w-8 h-8 text-white" strokeWidth={3} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
