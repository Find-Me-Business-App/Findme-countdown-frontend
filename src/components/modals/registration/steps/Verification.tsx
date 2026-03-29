"use client";

import { UploadCloud, X, FileText } from "lucide-react";
import { useRef, useState } from "react";

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

    return (
        <div className="flex flex-col w-full min-h-[400px] relative px-1 md:px-2 py-4 md:py-6 font-sans">
            {/* Header Section */}
            <div className="mb-8">
                <div className="w-16 h-[3px] bg-white mb-6" />
                <h2 className="text-2xl font-semibold mb-2 text-white tracking-wide">
                    Verification
                </h2>
                <div className="flex items-center gap-2">
                    <p className="text-[16px] text-[#DDDDDD]">Almost done!</p>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-7">
                {/* ID Upload Section */}
                <div className="flex flex-col gap-3">
                    <label className="text-white text-[15px] font-medium">
                        Upload owners valid personal ID
                        <span className="text-[#A3A3A3] text-[13px] ml-1.5 font-normal">(Drivers license, passport, NIN )</span>
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
                            className="flex items-center justify-center gap-2.5 w-fit px-5 py-2.5 rounded-[12px] border border-white/50 transition-all hover:bg-white/10"
                        >
                            <UploadCloud className="w-[18px] h-[18px] text-white" />
                            <span className="text-[13px] font-medium text-white/90">
                                Choose from gallery
                            </span>
                        </button>
                    ) : (
                        <div className="flex items-center justify-between w-full md:w-[80%] max-w-[380px] px-4 py-2.5 rounded-[12px] border border-white/30 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="p-1.5 bg-white/10 rounded-md">
                                    <FileText className="w-4 h-4 text-white/90" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[13px] text-white font-medium truncate max-w-[140px]">{uploadedFile.name}</span>
                                    <span className="text-[11px] text-white/50">{uploadedFile.size} • {uploadedFile.format}</span>
                                </div>
                            </div>
                            <button
                                onClick={removeFile}
                                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-white/90" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Registration Code Section */}
                <div className="flex flex-col gap-2 w-full md:w-[85%] max-w-[420px]">
                    <label className="text-[#516196] text-[15px] font-medium">
                        Business registration code
                    </label>
                    <div className="flex items-center bg-[#D6D6D6] rounded-[10px] overflow-hidden transition-all h-[46px]">
                        <input
                            type="text"
                            value={regCode}
                            onChange={(e) => setRegCode(e.target.value)}
                            placeholder="BN002300"
                            className="flex-1 bg-transparent px-4 h-full text-black/60 outline-none placeholder:text-[#9A9A9A] text-[14px] font-medium"
                        />
                        <span className="text-[12px] text-[#A0A0A0] pr-3 font-medium">
                            (Optional)
                        </span>
                        <div className="w-2 h-full bg-white flex-shrink-0" />
                    </div>
                </div>

                {/* Submit Button Section */}
                <div className="pt-2">
                    <button
                        onClick={handleConfirm}
                        disabled={isSubmitting || !uploadedFile}
                        className="w-[150px] py-3.5 rounded-[12px] text-[15px] font-semibold transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center bg-[#2B365A] text-white"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            "Submit"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
