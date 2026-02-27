"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { useCreateContact } from "@/hooks/useCreateContact";
import { SectionType } from "@/config/modal-configs";

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
            <h3 className="text-lg md:text-xl font-semibold text-[#f9fafb] mb-3 md:mb-6 px-1">
                Send a message
            </h3>

            <div className="space-y-3 md:space-y-5">
                <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-white/50 text-[10px] md:text-xs font-medium px-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Type here"
                        className="bg-[#4f4f4f] border border-white/15 rounded-[16px] px-4 md:px-5 py-2.5 md:py-3.5 text-white text-sm md:text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/40"
                    />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-white/50 text-[10px] md:text-xs font-medium px-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Type here"
                        className="bg-[#4f4f4f] border border-white/15 rounded-[16px] px-4 md:px-5 py-2.5 md:py-3.5 text-white text-sm md:text-base focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/40"
                    />
                </div>
                <div className="flex flex-col gap-1 md:gap-2">
                    <label className="text-white/50 text-[10px] md:text-xs font-medium px-1">Message</label>
                    <div className="bg-[#5a5a5a] border border-white/15 rounded-[26px] p-2.5 flex items-start gap-3 md:gap-4">
                        <div className="flex-grow bg-[#d4d4d4] rounded-[20px] md:rounded-[22px] min-h-[80px] md:min-h-[100px] relative">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Type here"
                                rows={3}
                                className="w-full h-full bg-transparent border-none rounded-[20px] md:rounded-[22px] px-4 py-3 md:py-4 text-[#1f2937] text-sm md:text-base placeholder:text-[#6b7280] focus:outline-none resize-none"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isPending}
                            className="mt-1 md:mt-2 mr-1 md:mr-2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-[18px] bg-[#d4d4d4] shadow-md group disabled:opacity-50"
                        >
                            <Send
                                className={`w-6 h-6 md:w-7 md:h-7 text-[#1e1b4b] ${isPending ? "animate-pulse" : "group-hover:translate-x-0.5 group-hover:-rotate-6"} transition-all drop-shadow-sm`}
                            />
                        </button>
                    </div>
                </div>
                {isError && <p className="text-red-500 text-xs px-1">{error.message}</p>}
                {isSuccess && <p className="text-green-500 text-xs px-1">Message sent successfully!</p>}
            </div>
        </div>
    );
}
