"use client";

import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { THEME } from "@/config/theme";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Building2, Tag, Info } from "lucide-react";

export default function BusinessesPage() {
    const { data, isLoading, isError, error, refetch } = useGetBusinesses();

    return (
        <div 
            className="min-h-screen w-full flex flex-col p-4 md:p-8 lg:p-12 text-white"
            style={{ backgroundColor: "#0A0A0B" }} // Deep dark background
        >
            {/* Header section */}
            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex flex-col gap-2">
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity text-sm mb-4 group"
                    >
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div 
                        className="w-16 h-1 rounded-full mb-2"
                        style={{ backgroundColor: THEME.colors.text.accent }}
                    />
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Registered <span style={{ color: THEME.colors.text.accent }}>Businesses</span>
                    </h1>
                    <p className="text-white/60 max-w-lg mt-2">
                        Displaying all businesses currently registered on the FindMe platform. 
                        This is a development preview page.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-colors"
                    >
                        Refresh List
                    </button>
                </div>
            </div>

            {/* List section */}
            <div className="max-w-7xl w-full mx-auto flex-1">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-red-500/10 border border-red-500/20 rounded-3xl text-center">
                        <h3 className="text-xl font-bold text-red-500 mb-2">Error loading businesses</h3>
                        <p className="text-white/60 mb-6">{error?.message || "Connection failed"}</p>
                        <button 
                            onClick={() => refetch()}
                            className="bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : data?.data?.records && data.data.records.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.data.records.map((business, index) => (
                            <motion.div
                                key={business._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.07] transition-all group relative overflow-hidden"
                            >
                                {/* Decorative accent */}
                                <div 
                                    className="absolute top-0 right-0 w-24 h-24 blur-3xl opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"
                                    style={{ backgroundColor: THEME.colors.text.accent }}
                                />

                                <div className="flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
                                            <Building2 className="w-6 h-6" style={{ color: THEME.colors.text.accent }} />
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1 bg-white/10 rounded-full text-white/60">
                                            {business.ownershipType}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                                        {business.businessName}
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mb-4 text-sm text-white/40">
                                        <span className="px-2 py-0.5 bg-white/5 rounded-lg border border-white/5">
                                            {business.mainCategory}
                                        </span>
                                        <span className="opacity-50">/</span>
                                        <span>{business.subCategory}</span>
                                    </div>

                                    <p className="text-sm text-white/60 leading-relaxed mb-6 line-clamp-3">
                                        {business.description || "No description provided."}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-white/10">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {business.tags?.map(tag => (
                                                <span 
                                                    key={tag}
                                                    className="flex items-center gap-1 text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-lg"
                                                >
                                                    <Tag size={10} />
                                                    {tag}
                                                </span>
                                            ))}
                                            {(!business.tags || business.tags.length === 0) && (
                                                <span className="text-[10px] text-white/20 italic">No tags</span>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase font-bold tracking-widest text-white/30">Major Offering</span>
                                                <span className="text-xs font-bold text-white/80">{business.majorOffering}</span>
                                            </div>
                                            <div className="text-[9px] text-white/20 text-right">
                                                ID: {business._id.slice(-6)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                            <Info className="w-10 h-10 opacity-20" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">No businesses found</h3>
                        <p className="text-white/40 max-w-xs">There are currently no registered businesses to display.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="max-w-7xl w-full mx-auto mt-24 py-8 border-t border-white/5 text-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-bold">
                FindMe Business Directory &bull; Admin Preview Mode
            </div>
        </div>
    );
}
