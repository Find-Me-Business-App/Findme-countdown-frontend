"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useCreateContact } from "@/hooks/useCreateContact";
import { useModalStore } from "@/store/useModalStore";
import { SectionType } from "@/config/modal-configs";
import FormField from "./FormField";

interface ContactFormProps {
    section: SectionType;
}

export default function ContactForm({ section }: ContactFormProps) {
    const { closeModal, contactSubmissions, addContactSubmission } = useModalStore();
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

    const isAlreadySubmitted = contactSubmissions.includes(formData.email);
    
    useEffect(() => {
        if (isSuccess) {
            const timer = setTimeout(() => {
                closeModal();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, closeModal]);

    const handleSubmit = () => {
        if (!formData.email || !formData.message || isPending || isSuccess || isAlreadySubmitted) return;
        mutate({ ...formData, section }, {
            onSuccess: () => {
                addContactSubmission(formData.email);
            }
        });
    };

    return (
        <div className="flex-1 flex flex-col pt-3 md:pt-4 px-1 md:px-4 pb-2 md:pb-0 whitespace-normal text-left">
            <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-8 text-white tracking-wide">
                Send a message
            </h3>

            <div className="flex flex-col gap-5 md:gap-6 w-full max-w-[420px]">
                {/* Inputs Row layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full">
                    <FormField label="Name">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-[#7A7A7A] rounded-[10px] px-4 h-[42px] text-white text-[14px] focus:outline-none focus:border-[#A5A5A5] transition-colors"
                        />
                    </FormField>
                    <FormField label="Email">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-[#7A7A7A] rounded-[10px] px-4 h-[42px] text-white text-[14px] focus:outline-none focus:border-[#A5A5A5] transition-colors"
                        />
                    </FormField>
                </div>

                {/* Message Field */}
                <FormField label="Message">
                    <div className="flex items-stretch w-full bg-[#757575] rounded-[24px] p-2 pr-3 md:pr-4 min-h-[120px] md:min-h-[140px] shadow-sm relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Type here"
                            className="flex-1 bg-[#A1A1A1] rounded-[20px] border-none text-[#2B2B2B] placeholder:text-[#7A7A7A] px-5 py-4 text-[14px] font-medium focus:outline-none resize-none"
                        />
                        <button
                            onClick={handleSubmit}
                            disabled={isPending || isSuccess || isAlreadySubmitted}
                            className="flex items-start justify-center pl-3 md:pl-4 pr-1 pt-3 md:pt-4 transition-transform hover:translate-x-1 disabled:opacity-50"
                        >
                            {isPending ? (
                                <div className="w-6 h-6 border-2 border-[#1F2A44]/30 border-t-[#1F2A44] rounded-full animate-spin" />
                            ) : (
                                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-[#1F2A44]" strokeWidth={2.5} />
                            )}
                        </button>
                    </div>
                </FormField>

                {isError && <p className="text-red-500 text-xs mt-1 px-1">{error.message}</p>}
                {isSuccess && <p className="text-green-500 text-xs mt-1 px-1">Message sent successfully!</p>}
                {isAlreadySubmitted && formData.email && (
                    <p className="text-yellow-500 text-xs mt-1 px-1">
                        You have already submitted a message with this email. Please wait for our response.
                    </p>
                )}
            </div>
        </div>
    );
}