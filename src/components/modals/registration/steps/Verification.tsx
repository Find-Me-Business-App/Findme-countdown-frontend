"use client";

import { UploadCloud, X, FileText, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { THEME } from "@/config/theme";

interface VerificationProps {
    onSubmit: () => void;
}

export default function Verification({ onSubmit }: VerificationProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; format: string } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [regCode, setRegCode] = useState("");

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

    const handleConfirm = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            onSubmit();
            setIsSubmitting(false);
        }, 1500);
    };

    const labelClasses = "text-[12px] font-bold ml-1 uppercase tracking-wider opacity-60";
    const inputClasses = "w-full rounded-xl px-5 h-[46px] focus:outline-none transition-all border font-bold text-sm shadow-sm";

    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="shrink-0 mb-4 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3px] mb-4 opacity-95 rounded-full"
                    style={{ backgroundColor: "white" }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight text-white"
                >
                    Verification
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3 text-[#DDDDDD]"
                >
                    Almost done! Please provide your documents.
                </p>
            </div>

            {/* ── Scrollable Content ─────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-20 no-scrollbar custom-scrollbar pr-1">
                <div className="flex flex-col gap-6 max-w-[420px]">
                    {/* ID Upload Section */}
                    <div className="flex flex-col gap-2">
                        <label className={`${labelClasses} text-white/90`}>
                            Upload owners valid personal ID
                            <span className="text-white/40 text-[10px] ml-2 font-normal lowercase">(Drivers license, passport, NIN)</span>
                        </label>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />

                        {!uploadedFile ? (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center justify-center gap-2.5 w-fit px-6 h-[46px] rounded-xl border border-white/30 transition-all hover:bg-white/10 group"
                            >
                                <UploadCloud className="w-[18px] h-[18px] text-white/80 group-hover:text-white" />
                                <span className="text-xs font-bold text-white/80 group-hover:text-white">
                                    Choose from gallery
                                </span>
                            </button>
                        ) : (
                            <div className="flex items-center justify-between w-full px-4 h-[56px] rounded-xl border border-white/20 bg-white/5 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg">
                                        <FileText className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-white font-bold truncate max-w-[150px]">{uploadedFile.name}</span>
                                        <span className="text-[10px] text-white/40 font-bold uppercase">{uploadedFile.size} • {uploadedFile.format}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={removeFile}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-white/60 hover:text-white" />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Registration Code Section */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses} style={{ color: "#2B365A" }}>
                            Business registration code
                        </label>
                        <div className="flex items-center bg-white rounded-xl border overflow-hidden transition-all h-[46px] shadow-sm" style={{ borderColor: THEME.colors.input.border }}>
                            <input
                                type="text"
                                value={regCode}
                                onChange={(e) => setRegCode(e.target.value)}
                                placeholder="BN002300"
                                className="flex-1 bg-transparent px-5 h-full text-[#2B365A] outline-none placeholder:text-[#2B365A]/30 text-sm font-bold"
                            />
                            <span className="text-[10px] text-[#2B365A]/40 pr-4 font-bold uppercase tracking-wider">
                                Optional
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button (fixed) */}
            <div className="absolute bottom-4 right-0 flex items-center justify-end pointer-events-none z-[160] px-1 md:px-0">
                <div className="pointer-events-auto">
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting || !uploadedFile}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 group disabled:opacity-30 disabled:hover:scale-100"
                        style={{ backgroundColor: "#2B365A" }}
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:translate-x-0.5 transition-transform" strokeWidth={3} />
                        )}
                    </button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </div>
    );
}
