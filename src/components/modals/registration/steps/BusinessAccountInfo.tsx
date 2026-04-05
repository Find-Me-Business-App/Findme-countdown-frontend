"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Info as InfoIcon, X as XIcon, Plus as PlusIcon, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { THEME } from "@/config/theme";
import { useCreateBusiness } from "@/hooks/useCreateBusiness";

interface BusinessAccountInfoProps {
    businessName: string;
    category: string;
    userId: string;
    onBack?: () => void;
    onComplete: (ownershipType: string) => void;
}

const OWNERSHIP_TYPES = ["Self owned", "Partnership", "Corporation", "Freelancer", "LLC"];

const CATEGORIES = [
    "Ride hailing", "Artist", "Auto Manufacturing company", "Marketseller",
    "School", "Dispatch rider", "Air condition repairer", "Online food seller"
];
const SUB_CATEGORIES = ["Industry", "Entertainment", "Finance", "Healthcare", "Education", "Retail", "Technology", "Logistics"];
const MAIN_CATEGORIES = ["Company", "Organization", "Sole Proprietorship", "NGO", "Government", "Private Entity"];
const SUBSIDIARY_CATEGORIES = ["Manufacturing", "Service Provider", "Logistics", "Digital Agency", "Content Creation", "Consulting"];
const MAJOR_OFFERINGS = ["Product and services", "Digital Products", "Physical Goods", "Consulting", "Membership", "Events"];

// Shared class for all input / dropdown trigger elements
// Desktop: w-[315px] h-[45px] | Mobile: w-full h-[45px]
const INPUT_CLASS = "w-full md:w-[315px] h-[45px]";

export default function BusinessAccountInfo({ businessName, category, userId, onBack, onComplete }: BusinessAccountInfoProps) {
    const [ownership, setOwnership] = useState("Self owned");
    const [selectedCategory, setSelectedCategory] = useState(category || "Texile Manufacturing company");
    const [subCategory, setSubCategory] = useState("Industry");
    const [mainCategory, setMainCategory] = useState("Company");
    const [subsidiaryCategory, setSubsidiaryCategory] = useState("Manufacturing company");
    const [majorOffering, setMajorOffering] = useState("Product and services");
    const [tags, setTags] = useState(["Factory", "Museum"]);
    const [tagInput, setTagInput] = useState("");
    const [about, setAbout] = useState("");

    // Dropdown states
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);
    const { mutate: createBusiness, isPending: isSubmitting } = useCreateBusiness();

    const isComplete = about.trim().length >= 10;

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const handleSelect = (setter: (v: string) => void, value: string) => {
        setter(value);
        setActiveDropdown(null);
    };

    const addTag = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleComplete = () => {
        if (!userId) {
            setApiError("User ID is missing. Please go back and complete registration first.");
            return;
        }
        setApiError(null);
        createBusiness(
            {
                userId,
                businessName,
                ownershipType: ownership,
                mainCategory: mainCategory,
                subCategory: subCategory,
                tags,
                majorOffering: majorOffering,
                description: about,
            },
            {
                onSuccess: () => {
                    onComplete(ownership);
                },
                onError: (error) => {
                    setApiError(error.message || "Failed to create business. Please try again.");
                },
            }
        );
    };

    // Close dropdowns on click outside
    useEffect(() => {
        const handleClickOutside = () => setActiveDropdown(null);
        if (activeDropdown) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [activeDropdown]);

    return (
        <div className="flex flex-col w-full h-full relative overflow-hidden">
            {/* ── Header (fixed) ─────────────────────────── */}
            <div className="flex-shrink-0 mb-2 pt-1 md:pt-2">
                <div
                    className="w-12 md:w-16 h-[3px] mb-3 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-lg md:text-2xl font-bold mb-0.5 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Business Account
                </h2>
                <p
                    className="text-sm md:text-base opacity-70 mb-3"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>

                {/* Ownership type pills */}
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {OWNERSHIP_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOwnership(type)}
                            className="whitespace-nowrap px-4 py-1.5 rounded-xl border-2 font-bold transition-all text-[12px] tracking-wide shadow-sm flex-shrink-0"
                            style={{
                                backgroundColor: ownership === type ? THEME.colors.actions.primary : "white",
                                borderColor: ownership === type ? THEME.colors.actions.primary : "transparent",
                                color: ownership === type ? "white" : "#2B365A",
                                transform: ownership === type ? "scale(1.02)" : "scale(1)"
                            }}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Scrollable Content ─────────────────────── */}
            <div className="flex-1 overflow-y-auto pb-16 no-scrollbar custom-scrollbar">
                <h3
                    className="text-xs font-bold mb-3 opacity-40 uppercase tracking-[0.05em]"
                    style={{ color: "#2B365A" }}
                >
                    Business description
                </h3>

                <div className="flex flex-col gap-3">
                    {/* Business Name */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business Name
                        </label>
                        <div
                            className={`${INPUT_CLASS} flex items-center justify-between px-4 rounded-xl border bg-white shadow-sm`}
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-sm font-bold truncate" style={{ color: "#2B365A" }}>
                                {businessName || "EmO Industries Inc"}
                            </span>
                            <button
                                onClick={onBack}
                                className="text-[12px] font-semibold opacity-40 hover:opacity-100 transition-opacity ml-2 flex-shrink-0"
                                style={{ color: "#2B365A" }}
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Category
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('category'); }}
                            className={`${INPUT_CLASS} flex items-center justify-between px-4 rounded-xl border bg-white shadow-sm transition-all text-left hover:border-black/20`}
                            style={{ borderColor: activeDropdown === 'category' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-sm font-bold truncate" style={{ color: "#2B365A" }}>
                                {selectedCategory}
                            </span>
                            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeDropdown === 'category' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'category' && (
                            <div className="absolute top-[calc(100%+4px)] left-0 md:w-[315px] w-full bg-white border rounded-xl shadow-2xl z-[150] max-h-[180px] overflow-y-auto custom-scrollbar">
                                {CATEGORIES.map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => handleSelect(setSelectedCategory, cat)}
                                        className="px-4 py-2.5 hover:bg-black/5 cursor-pointer transition-colors text-sm font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sub / Main Category — half-half inside a single-input-width container */}
                    <div className="w-full md:w-[315px]">
                        <div className="grid grid-cols-2 gap-2">
                            {/* Sub category */}
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                    Sub category
                                </label>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleDropdown('subCategory'); }}
                                    className="w-full h-[45px] flex items-center justify-between px-3 rounded-xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                                    style={{ borderColor: activeDropdown === 'subCategory' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                                >
                                    <span className="text-xs font-medium truncate" style={{ color: "#2B365A" }}>
                                        {subCategory || "Industry"}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${activeDropdown === 'subCategory' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                                </button>
                                {activeDropdown === 'subCategory' && (
                                    <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border rounded-xl shadow-2xl z-[150] max-h-[180px] overflow-y-auto custom-scrollbar">
                                        {SUB_CATEGORIES.map(sub => (
                                            <div
                                                key={sub}
                                                onClick={() => handleSelect(setSubCategory, sub)}
                                                className="px-3 py-2 hover:bg-black/5 cursor-pointer transition-colors text-xs font-medium"
                                                style={{ color: "#2B365A" }}
                                            >
                                                {sub}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Main category */}
                            <div className="flex flex-col gap-1 relative">
                                <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                    Main category
                                </label>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleDropdown('mainCategory'); }}
                                    className="w-full h-[45px] flex items-center justify-between px-3 rounded-xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                                    style={{ borderColor: activeDropdown === 'mainCategory' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                                >
                                    <span className="text-xs font-medium truncate" style={{ color: "#2B365A" }}>
                                        {mainCategory || "Company"}
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${activeDropdown === 'mainCategory' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                                </button>
                                {activeDropdown === 'mainCategory' && (
                                    <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border rounded-xl shadow-2xl z-[150] max-h-[180px] overflow-y-auto custom-scrollbar">
                                        {MAIN_CATEGORIES.map(main => (
                                            <div
                                                key={main}
                                                onClick={() => handleSelect(setMainCategory, main)}
                                                className="px-3 py-2 hover:bg-black/5 cursor-pointer transition-colors text-xs font-medium"
                                                style={{ color: "#2B365A" }}
                                            >
                                                {main}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Subsidiary Category */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-[11px] font-bold pl-1 uppercase tracking-wider flex items-center gap-1" style={{ color: "#2B365A" }}>
                            Subsidiary category
                            <span className="opacity-40"><InfoIcon size={12} /></span>
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('subsidiary'); }}
                            className={`${INPUT_CLASS} flex items-center justify-between px-4 rounded-xl border bg-white shadow-sm transition-all text-left hover:border-black/20`}
                            style={{ borderColor: activeDropdown === 'subsidiary' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-sm font-medium truncate" style={{ color: "#2B365A" }}>
                                {subsidiaryCategory}
                            </span>
                            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeDropdown === 'subsidiary' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'subsidiary' && (
                            <div className="absolute top-[calc(100%+4px)] left-0 md:w-[315px] w-full bg-white border rounded-xl shadow-2xl z-[150] max-h-[180px] overflow-y-auto custom-scrollbar">
                                {SUBSIDIARY_CATEGORIES.map(sub => (
                                    <div
                                        key={sub}
                                        onClick={() => handleSelect(setSubsidiaryCategory, sub)}
                                        className="px-4 py-2.5 hover:bg-black/5 cursor-pointer transition-colors text-sm font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="px-3 py-1.5 bg-white rounded-lg border shadow-sm flex items-center gap-2 group transition-all hover:border-black/20"
                                    style={{ borderColor: THEME.colors.input.border }}
                                >
                                    <span className="text-xs font-bold" style={{ color: "#2B365A" }}>{tag}</span>
                                    <button onClick={() => removeTag(tag)} className="opacity-40 hover:opacity-100 transition-opacity">
                                        <XIcon className="w-3 h-3" style={{ color: "#2B365A" }} />
                                    </button>
                                </div>
                            ))}
                            <form
                                onSubmit={addTag}
                                className="px-3 py-1.5 border border-dashed rounded-lg flex items-center gap-1.5 bg-black/5 hover:bg-black/10 transition-colors"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add tag..."
                                    className="bg-transparent outline-none text-xs font-medium w-16"
                                    style={{ color: "#2B365A" }}
                                />
                                <button type="submit" className="opacity-40 hover:opacity-100">
                                    <PlusIcon size={14} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Business major offering */}
                    <div className="flex flex-col gap-1 relative">
                        <label className="text-[11px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business major offering
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('offering'); }}
                            className={`${INPUT_CLASS} flex items-center justify-between px-4 rounded-xl border bg-white shadow-sm transition-all text-left hover:border-black/20`}
                            style={{ borderColor: activeDropdown === 'offering' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-sm font-medium truncate" style={{ color: "#2B365A" }}>
                                {majorOffering}
                            </span>
                            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${activeDropdown === 'offering' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'offering' && (
                            <div className="absolute top-[calc(100%+4px)] left-0 md:w-[315px] w-full bg-white border rounded-xl shadow-2xl z-[150] max-h-[180px] overflow-y-auto custom-scrollbar">
                                {MAJOR_OFFERINGS.map(off => (
                                    <div
                                        key={off}
                                        onClick={() => handleSelect(setMajorOffering, off)}
                                        className="px-4 py-2.5 hover:bg-black/5 cursor-pointer transition-colors text-sm font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {off}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* About this business */}
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            About this business
                        </h4>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Write here how you would describe your business"
                            className="w-full md:w-[315px] min-h-[80px] p-3 rounded-xl border bg-white shadow-sm outline-none resize-none text-[13px] leading-relaxed transition-all focus:ring-2 focus:ring-[#2B365A]/10 focus:border-[#2B365A]/30"
                            style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                        />
                    </div>
                </div>
            </div>

            {/* ── API Error Message ─────────────────────── */}
            {apiError && (
                <div className="px-1 pb-1">
                    <p className="text-xs font-bold text-red-500 animate-in fade-in duration-300">
                        {apiError}
                    </p>
                </div>
            )}

            {/* ── Action Buttons (absolute footer) ──────── */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between pointer-events-none z-[120] px-1">
                <div className="pointer-events-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="text-[13px] font-bold opacity-60 hover:opacity-100 transition-opacity px-3 py-2"
                            style={{ color: THEME.colors.text.muted }}
                        >
                            Back
                        </button>
                    )}
                </div>

                <div className="pointer-events-auto">
                    <motion.button
                        onClick={handleComplete}
                        disabled={isSubmitting}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 group relative overflow-hidden"
                        style={{ backgroundColor: "#2B365A" }}
                        animate={isComplete && !isSubmitting ? {
                            scale: [1, 1.08, 1],
                            boxShadow: [
                                "0 0 0 0px rgba(43, 54, 90, 0)",
                                "0 0 0 15px rgba(43, 54, 90, 0.15)",
                                "0 0 0 0px rgba(43, 54, 90, 0)"
                            ]
                        } : {}}
                        transition={isComplete && !isSubmitting ? {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } : { duration: 0.2 }}
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white" />
                        )}
                    </motion.button>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.2); }
            `}</style>
        </div>
    );
}
