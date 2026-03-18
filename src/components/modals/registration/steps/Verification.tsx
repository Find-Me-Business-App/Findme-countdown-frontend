"use client";

import { UploadCloud, X, FileText } from "lucide-react";
import { useRef, useState } from "react";
import { THEME } from "@/config/theme";

interface VerificationProps {
    onSubmit: () => void;
}

export default function Verification({ onSubmit }: VerificationProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; format: string } | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile({
                name: file.name,
                size: `${Math.round(file.size / 1024)}kb`,
                format: file.type.split('/')[1]?.toUpperCase() || 'PDF'
            });
        }
    };

    const removeFile = () => {
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="flex flex-col w-full min-h-[450px] md:h-[500px] relative px-1 md:px-2 py-4 md:py-6">
            {/* Header Section */}
            <div className="mb-8">
                <div
                    className="w-20 h-[3.5px] mb-6 opacity-95"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-2xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Verification
                </h2>
                <p
                    className="text-lg md:text-xl opacity-70"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Almost done!
                </p>
            </div>

            {/* ID Upload Section */}
            <div className="flex flex-col gap-4 mb-6">
                <p className="text-[15px] font-medium" style={{ color: THEME.colors.text.primary }}>
                    Upload owners valid personal ID <span className="opacity-40 text-sm">(Drivers license, passport, NIN )</span>
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center md:justify-start gap-3 w-full md:w-fit px-8 py-3.5 rounded-[20px] border-[1.5px] transition-all hover:bg-white/5 active:scale-95 group"
                    style={{ borderColor: "rgba(255, 255, 255, 0.4)" }}
                >
                    <UploadCloud className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "white" }} />
                    <span className="text-[15px] font-bold opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "white" }}>
                        Choose from gallery
                    </span>
                </button>

                {/* File List Item (Mockup style) */}
                {uploadedFile && (
                    <div
                        className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between px-5 md:px-6 py-4 rounded-[24px] bg-white/5 border border-white/10 w-full max-w-[480px] group animate-in fade-in slide-in-from-top-2 gap-4"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                    >
                        <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white/40" />
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold opacity-30 uppercase tracking-wider" style={{ color: "white" }}>File Name</span>
                                <span className="text-[14px] font-medium truncate max-w-[180px]" style={{ color: "white" }}>{uploadedFile.name}</span>
                            </div>
                        </div>

                        <div className="flex items-center flex-wrap gap-x-6 gap-y-3 md:gap-8 w-full sm:w-auto">
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold opacity-30 uppercase tracking-wider" style={{ color: "white" }}>Size</span>
                                <span className="text-[14px] font-medium" style={{ color: "white" }}>{uploadedFile.size}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-bold opacity-30 uppercase tracking-wider" style={{ color: "white" }}>Format</span>
                                <span className="text-[14px] font-medium" style={{ color: "white" }}>{uploadedFile.format}</span>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-1 opacity-20 hover:opacity-100 transition-opacity ml-auto sm:ml-0"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Registration Code Section */}
            <div className="flex flex-col gap-3 mb-10">
                <label className="text-[15px] font-bold" style={{ color: "#2B365A" }}>
                    Business registration code
                </label>
                <div className="relative w-full max-w-[320px]">
                    <input
                        type="text"
                        placeholder="BN002300"
                        className="w-full px-6 py-4 rounded-2xl border bg-white text-lg font-medium outline-none transition-all focus:border-opacity-100"
                        style={{
                            borderColor: THEME.colors.input.border,
                            color: "#2B365A"
                        }}
                    />
                    <span
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-sm font-medium opacity-40 pointer-events-none"
                        style={{ color: "#2B365A" }}
                    >
                        (Optional)
                    </span>
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={onSubmit}
                className="w-full md:w-[240px] py-4 rounded-2xl text-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-auto"
                style={{
                    backgroundColor: THEME.colors.actions.primary,
                    color: "white"
                }}
            >
                Submit
            </button>


        </div>
    );
}
