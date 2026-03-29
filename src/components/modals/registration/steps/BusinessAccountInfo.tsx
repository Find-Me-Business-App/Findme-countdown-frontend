"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Info as InfoIcon, X as XIcon, Plus as PlusIcon, Check as CheckIcon } from "lucide-react";
import { THEME } from "@/config/theme";

interface BusinessAccountInfoProps {
    businessName: string;
    category: string;
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

export default function BusinessAccountInfo({ businessName, category, onBack, onComplete }: BusinessAccountInfoProps) {
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
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        setIsSubmitting(true);
        // Simulate a small delay for feedback
        setTimeout(() => {
            onComplete(ownership);
            setIsSubmitting(false);
        }, 1200);
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
        <div className="flex flex-col w-full h-full md:h-[620px] relative overflow-hidden">
            {/* Header section (fixed) */}
            <div className="flex flex-col mb-2 pt-2 md:pt-4">
                <div
                    className="w-16 md:w-20 h-1 mb-6 opacity-95 rounded-full"
                    style={{ backgroundColor: THEME.colors.text.primary }}
                />
                <h2
                    className="text-xl md:text-3xl font-bold mb-1 tracking-tight"
                    style={{ color: THEME.colors.text.primary }}
                >
                    Business Account
                </h2>
                <p
                    className="text-base md:text-xl opacity-70 mb-4 md:mb-6"
                    style={{ color: THEME.colors.text.secondary }}
                >
                    Owners Information
                </p>

                <div className="flex gap-2.5 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {OWNERSHIP_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => setOwnership(type)}
                            className="whitespace-nowrap px-5 md:px-6 py-2 rounded-xl border-2 font-bold transition-all text-[13px] md:text-sm tracking-wide shadow-sm"
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

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pb-32 no-scrollbar custom-scrollbar md:pr-2">
                <h3
                    className="text-2xl font-bold mb-6 opacity-40 uppercase tracking-[0.05em]"
                    style={{ color: "#2B365A" }}
                >
                    Business description
                </h3>

                <div className="flex flex-col gap-6">
                    {/* Business Name Field */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business Name
                        </label>
                        <div
                            className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm"
                            style={{ borderColor: THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-bold" style={{ color: "#2B365A" }}>
                                {businessName || "EmO Industries Inc"}
                            </span>
                            <button 
                                onClick={onBack}
                                className="text-[13px] md:text-[14px] font-semibold opacity-40 hover:opacity-100 transition-opacity" 
                                style={{ color: "#2B365A" }}
                            >
                                Change
                            </button>
                        </div>
                    </div>

                    {/* Category Field */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Category
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('category'); }}
                            className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                            style={{ borderColor: activeDropdown === 'category' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-bold" style={{ color: "#2B365A" }}>
                                {selectedCategory}
                            </span>
                            <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${activeDropdown === 'category' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'category' && (
                            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border rounded-2xl shadow-2xl z-[150] max-h-[240px] overflow-y-auto custom-scrollbar overflow-hidden">
                                {CATEGORIES.map(cat => (
                                    <div 
                                        key={cat} 
                                        onClick={() => handleSelect(setSelectedCategory, cat)}
                                        className="px-6 py-4 hover:bg-black/5 cursor-pointer transition-colors text-base font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sub / Main Category Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Sub category
                            </label>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('subCategory'); }}
                                className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                                style={{ borderColor: activeDropdown === 'subCategory' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                            >
                                <span className={`text-sm font-medium ${subCategory ? 'opacity-100' : 'opacity-40'}`} style={{ color: "#2B365A" }}>
                                    {subCategory || "Industry"}
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'subCategory' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                            </button>
                            {activeDropdown === 'subCategory' && (
                                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border rounded-2xl shadow-2xl z-[150] max-h-[200px] overflow-y-auto custom-scrollbar overflow-hidden">
                                    {SUB_CATEGORIES.map(sub => (
                                        <div 
                                            key={sub} 
                                            onClick={() => handleSelect(setSubCategory, sub)}
                                            className="px-6 py-3 hover:bg-black/5 cursor-pointer transition-colors text-sm font-medium"
                                            style={{ color: "#2B365A" }}
                                        >
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 relative">
                            <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                                Main category
                            </label>
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleDropdown('mainCategory'); }}
                                className="flex items-center justify-between px-5 md:px-6 py-3 md:py-3.5 rounded-2xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                                style={{ borderColor: activeDropdown === 'mainCategory' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                            >
                                <span className={`text-sm font-medium ${mainCategory ? 'opacity-100' : 'opacity-40'}`} style={{ color: "#2B365A" }}>
                                    {mainCategory || "Company"}
                                </span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === 'mainCategory' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                            </button>
                            {activeDropdown === 'mainCategory' && (
                                <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border rounded-2xl shadow-2xl z-[150] max-h-[200px] overflow-y-auto custom-scrollbar overflow-hidden">
                                    {MAIN_CATEGORIES.map(main => (
                                        <div 
                                            key={main} 
                                            onClick={() => handleSelect(setMainCategory, main)}
                                            className="px-6 py-3 hover:bg-black/5 cursor-pointer transition-colors text-sm font-medium"
                                            style={{ color: "#2B365A" }}
                                        >
                                            {main}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subsidiary Category Field */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider flex items-center gap-1.5" style={{ color: "#2B365A" }}>
                            Subsidiary category
                            <span className="opacity-40"><InfoIcon size={14} /></span>
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('subsidiary'); }}
                            className="flex items-center justify-between px-5 md:px-6 py-3.5 md:py-4 rounded-2xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                            style={{ borderColor: activeDropdown === 'subsidiary' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-medium" style={{ color: "#2B365A" }}>
                                {subsidiaryCategory}
                            </span>
                            <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${activeDropdown === 'subsidiary' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'subsidiary' && (
                            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border rounded-2xl shadow-2xl z-[150] max-h-[200px] overflow-y-auto custom-scrollbar overflow-hidden">
                                {SUBSIDIARY_CATEGORIES.map(sub => (
                                    <div 
                                        key={sub} 
                                        onClick={() => handleSelect(setSubsidiaryCategory, sub)}
                                        className="px-6 py-4 hover:bg-black/5 cursor-pointer transition-colors text-base font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {sub}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags Section */}
                    <div className="flex flex-col gap-3">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {tags.map((tag) => (
                                <div 
                                    key={tag} 
                                    className="px-4 md:px-5 py-2 md:py-2.5 bg-white rounded-xl border shadow-sm flex items-center gap-2 md:gap-3 group transition-all hover:border-black/20" 
                                    style={{ borderColor: THEME.colors.input.border }}
                                >
                                    <span className="text-xs md:text-sm font-bold" style={{ color: "#2B365A" }}>{tag}</span>
                                    <button 
                                        onClick={() => removeTag(tag)}
                                        className="opacity-40 hover:opacity-100 transition-opacity"
                                    >
                                        <XIcon className="w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: "#2B365A" }} />
                                    </button>
                                </div>
                            ))}
                            
                            {/* Add Tag Input */}
                            <form 
                                onSubmit={addTag}
                                className="px-4 py-2 border border-dashed rounded-xl flex items-center gap-2 bg-black/5 hover:bg-black/10 transition-colors"
                                style={{ borderColor: THEME.colors.input.border }}
                            >
                                <input 
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add tag..."
                                    className="bg-transparent outline-none text-xs md:text-sm font-medium w-20 md:w-24"
                                    style={{ color: "#2B365A" }}
                                />
                                <button type="submit" className="opacity-40 hover:opacity-100">
                                    <PlusIcon size={16} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Business major offering Field */}
                    <div className="flex flex-col gap-2 relative">
                        <label className="text-[12px] md:text-[13px] font-bold pl-1 uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            Business major offering
                        </label>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleDropdown('offering'); }}
                            className="flex items-center justify-between px-5 md:px-6 py-3.5 md:py-4 rounded-2xl border bg-white shadow-sm transition-all text-left hover:border-black/20"
                            style={{ borderColor: activeDropdown === 'offering' ? THEME.colors.actions.primary : THEME.colors.input.border }}
                        >
                            <span className="text-base md:text-lg font-medium" style={{ color: "#2B365A" }}>
                                {majorOffering}
                            </span>
                            <ChevronDown className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${activeDropdown === 'offering' ? 'rotate-180' : 'opacity-40'}`} style={{ color: "#2B365A" }} />
                        </button>
                        {activeDropdown === 'offering' && (
                            <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white border rounded-2xl shadow-2xl z-[150] max-h-[200px] overflow-y-auto custom-scrollbar overflow-hidden">
                                {MAJOR_OFFERINGS.map(off => (
                                    <div 
                                        key={off} 
                                        onClick={() => handleSelect(setMajorOffering, off)}
                                        className="px-6 py-4 hover:bg-black/5 cursor-pointer transition-colors text-base font-medium"
                                        style={{ color: "#2B365A" }}
                                    >
                                        {off}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* About this business TextArea */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[15px] font-bold uppercase tracking-wider" style={{ color: "#2B365A" }}>
                            About this business
                        </h4>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            placeholder="Write here how you would describe your business"
                            className="w-full min-h-[160px] p-6 rounded-[24px] border bg-white shadow-sm outline-none resize-none text-[15px] leading-relaxed transition-all focus:ring-2 focus:ring-[#2B365A]/10 focus:border-[#2B365A]/30"
                            style={{ borderColor: THEME.colors.input.border, color: "#2B365A" }}
                        />
                    </div>
                </div>
            </div>

            {/* Action Buttons Container */}
            <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between pointer-events-none z-[120] px-1 md:px-0">
                <div className="pointer-events-auto">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="text-[14px] md:text-[15px] font-bold opacity-60 hover:opacity-100 transition-opacity px-4 py-2"
                            style={{ color: THEME.colors.text.muted }}
                        >
                            Back
                        </button>
                    )}
                </div>

                <div className="pointer-events-auto">
                    <button
                        onClick={handleComplete}
                        disabled={isSubmitting}
                        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all active:scale-95 group relative"
                        style={{ backgroundColor: THEME.colors.actions.primary }}
                    >
                        {isSubmitting ? (
                            <div className="w-8 h-8 md:w-10 md:h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
                                <CheckIcon className="absolute w-5 h-5 md:w-6 md:h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
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
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
