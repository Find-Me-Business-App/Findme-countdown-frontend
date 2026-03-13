"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useCreateContact } from "@/hooks/useCreateContact";
import { SectionType } from "@/config/modal-configs";
import { THEME } from "@/config/theme";

interface ContactFormProps {
    section: SectionType;
}

export default function ContactForm({ section }: ContactFormProps) {
    const { mutate, isPending, isError, error, isSuccess } = useCreateContact();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (!formData.email || !formData.message) return;
        mutate({ ...formData, section });
    };

    return (
        <div className="flex-grow flex flex-col pt-1 md:pt-4 px-1 md:px-0 pb-2 md:pb-0 whitespace-normal">
            <h3 
                className="text-lg md:text-xl font-semibold mb-3 md:mb-6 px-1"
                style={{ color: THEME.colors.text.primary }}
            >
                Send a message
            </h3>

            <div className="space-y-3 md:space-y-5">
                <FormField label="Name">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Type here"
                        className="border rounded-[16px] px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base focus:outline-none transition-colors"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border,
                            color: THEME.colors.input.text
                        }}
                    />
                </FormField>
                <FormField label="Email">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Type here"
                        className="border rounded-[16px] px-4 md:px-5 py-2.5 md:py-3.5 text-sm md:text-base focus:outline-none transition-colors"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border,
                            color: THEME.colors.input.text
                        }}
                    />
                </FormField>
                <FormField label="Message">
                    <div 
                        className="border rounded-[26px] p-2.5 flex items-start gap-3 md:gap-4"
                        style={{ 
                            backgroundColor: THEME.colors.input.bg,
                            borderColor: THEME.colors.input.border 
                        }}
                    >
                        <div 
                            className="flex-grow rounded-[20px] md:rounded-[22px] min-h-[80px] md:min-h-[100px] relative"
                            style={{ backgroundColor: THEME.colors.input.clarity.bg }}
                        >
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Type here"
                                rows={3}
                                className="w-full h-full bg-transparent border-none rounded-[20px] md:rounded-[22px] px-4 py-3 md:py-4 text-sm md:text-base focus:outline-none resize-none"
                                style={{ color: THEME.colors.input.clarity.text }}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="mt-1 md:mt-2 mr-1 md:mr-2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[18px] shadow-md group disabled:opacity-50"
                            style={{ backgroundColor: THEME.colors.input.clarity.bg }}
                        >
                            <Send
                                className={`w-6 h-6 md:w-7 md:h-7 ${isPending ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-rotate-6"} transition-all drop-shadow-sm`}
                                style={{ color: THEME.colors.actions.primary }}
                            />
                        </button>
                    </div>
                </FormField>
                {isError && <p className="text-red-500 text-xs px-1">{error.message}</p>}
                {isSuccess && <p className="text-green-500 text-xs px-1">Message sent successfully!</p>}
            </div>
        </div>
    );
}

/* ─── Sub-component: Form Field ─────────────────────────────────── */

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1 md:gap-2">
            <label 
                className="text-[10px] md:text-xs font-medium px-1"
                style={{ color: THEME.colors.input.label }}
            >
                {label}
            </label>
            {children}
        </div>
    );
}
