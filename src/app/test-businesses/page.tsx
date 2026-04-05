"use client";

import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetContacts } from "@/hooks/useGetContacts";
import { useGetWaitlist } from "@/hooks/useGetWaitlist";
import { THEME } from "@/config/theme";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Building2, Tag, Info, User as UserIcon, Calendar, Mail, Phone, Layout, MessageSquare, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Business, RegisteredUser, ContactRecord, WaitlistRecord } from "@/services/api";

type ViewType = "businesses" | "users" | "contacts" | "waitlist";

const BRAND_COLORS = {
    businesses: "#3b82f6", // FindMe Blue
    users: "#22c55e",      // Success Green
    contacts: "#a855f7",   // Purple
    waitlist: "#f59e0b"    // Amber
};

export default function BusinessesPage() {
    const [view, setView] = useState<ViewType>("businesses");
    const activeColor = BRAND_COLORS[view];
    
    const { 
        data: businessesData, 
        isLoading: isBusinessesLoading, 
        isError: isBusinessesError, 
        error: businessesError, 
        refetch: refetchBusinesses 
    } = useGetBusinesses();

    const { 
        data: usersData, 
        isLoading: isUsersLoading, 
        isError: isUsersError, 
        error: usersError, 
        refetch: refetchUsers 
    } = useGetUsers();

    const {
        data: contactsData,
        isLoading: isContactsLoading,
        isError: isContactsError,
        error: contactsError,
        refetch: refetchContacts
    } = useGetContacts();

    const {
        data: waitlistData,
        isLoading: isWaitlistLoading,
        isError: isWaitlistError,
        error: waitlistError,
        refetch: refetchWaitlist
    } = useGetWaitlist();

    const isLoading = view === "businesses" ? isBusinessesLoading 
        : view === "users" ? isUsersLoading 
        : view === "contacts" ? isContactsLoading
        : isWaitlistLoading;

    const isError = view === "businesses" ? isBusinessesError 
        : view === "users" ? isUsersError 
        : view === "contacts" ? isContactsError
        : isWaitlistError;

    const error = view === "businesses" ? businessesError 
        : view === "users" ? usersError 
        : view === "contacts" ? contactsError
        : waitlistError;

    const refetch = view === "businesses" ? refetchBusinesses 
        : view === "users" ? refetchUsers 
        : view === "contacts" ? refetchContacts
        : refetchWaitlist;

    return (
        <div className="min-h-screen w-full relative flex flex-col p-4 md:p-8 lg:p-12 text-white overflow-hidden selection:bg-blue-500/30">
            {/* Mesh Gradient Background */}
            <div className="fixed inset-0 -z-20 bg-[#020204]" />
            <div 
                className="fixed inset-0 -z-10 opacity-30 blur-[120px]"
                style={{
                    background: `
                        radial-gradient(circle at 10% 10%, ${activeColor}55, transparent 40%),
                        radial-gradient(circle at 90% 10%, #3b82f633, transparent 40%),
                        radial-gradient(circle at 50% 90%, ${activeColor}22, transparent 50%)
                    `
                }}
            />

            {/* Header section */}
            <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16 relative">
                <div className="flex flex-col gap-2">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 opacity-40 hover:opacity-100 transition-all text-xs font-bold uppercase tracking-[0.2em] mb-4 group"
                    >
                        <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to FindMe
                    </Link>
                    <div 
                        className="w-12 h-1 rounded-full mb-3 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        style={{ backgroundColor: activeColor }}
                    />
                    <motion.h1 
                        layoutId="title"
                        className="text-4xl md:text-6xl font-bold tracking-tighter"
                    >
                        FindMe <span style={{ color: activeColor }} className="transition-colors duration-500">Analytics</span>
                    </motion.h1>
                    <p className="text-white/40 max-w-lg mt-4 text-sm md:text-base leading-relaxed">
                        Data-driven insights for the <span className="text-white">FindMe Registration</span> ecosystem. 
                        Auditing {view} in real-time across all regions.
                    </p>
                </div>

                <div className="flex flex-col gap-6 items-end">
                    {/* View Switcher - Premium Glassmorphism */}
                    <div className="flex bg-white/[0.03] backdrop-blur-3xl p-1.5 rounded-[22px] border border-white/[0.08] shadow-2xl overflow-hidden self-start md:self-end">
                        {(Object.keys(BRAND_COLORS) as ViewType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setView(tab)}
                                className={`px-5 py-2.5 rounded-[16px] text-xs font-black uppercase tracking-wider transition-all duration-500 relative ${
                                    view === tab ? "text-white" : "text-white/30 hover:text-white/50"
                                }`}
                            >
                                <span className="relative z-10">{tab}</span>
                                {view === tab && (
                                    <motion.div 
                                        layoutId="tab-bg"
                                        className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                                        style={{ backgroundColor: `${BRAND_COLORS[tab]}22`, borderRadius: "16px", border: `1px solid ${BRAND_COLORS[tab]}44` }}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-white/[0.05] border border-white/[0.1] backdrop-blur-xl rounded-2xl font-bold hover:bg-white/[0.1] transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-3 group"
                    >
                        <Layout size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm">Refresh Stream</span>
                    </button>
                </div>
            </div>

            {/* List section */}
            <div className="max-w-7xl w-full mx-auto flex-1 relative min-h-[400px]">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="h-72 bg-white/[0.03] rounded-[32px] border border-white/[0.05] animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" />
                                </div>
                            ))}
                        </motion.div>
                    ) : isError ? (
                        <motion.div 
                            key="error"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center p-16 bg-red-500/[0.03] border border-red-500/10 backdrop-blur-3xl rounded-[40px] text-center"
                        >
                            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
                                <Info className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-red-500 mb-4 tracking-tight">Sync Interrupt</h3>
                            <p className="text-white/40 mb-10 max-w-md mx-auto text-sm leading-relaxed">{error?.message || "Verify your connection to the FindMe API cluster."}</p>
                            <button 
                                onClick={() => refetch()}
                                className="bg-red-500 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-all hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            >
                                Attempt Recovery
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={view}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {view === "businesses" ? (
                                businessesData?.data?.records?.map((business, index) => (
                                    <BusinessCard key={business._id} business={business} index={index} />
                                ))
                            ) : view === "users" ? (
                                usersData?.data?.records?.map((user, index) => (
                                    <UserCard key={user._id} user={user} index={index} />
                                ))
                            ) : view === "contacts" ? (
                                contactsData?.data?.records?.map((contact, index) => (
                                    <ContactCard key={contact._id} contact={contact} index={index} />
                                ))
                            ) : (
                                waitlistData?.data?.records?.map((waitlist, index) => (
                                    <WaitlistCard key={waitlist._id} waitlist={waitlist} index={index} />
                                ))
                            )}
                            
                            {/* Empty state check */}
                            {((view === "businesses" && !businessesData?.data?.records?.length) || 
                              (view === "users" && !usersData?.data?.records?.length) ||
                              (view === "contacts" && !contactsData?.data?.records?.length) ||
                              (view === "waitlist" && !waitlistData?.data?.records?.length)) && (
                                <motion.div 
                                    className="col-span-full flex flex-col items-center justify-center py-24 text-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="w-24 h-24 bg-white/[0.03] rounded-full flex items-center justify-center mb-8 border border-white/[0.05]">
                                        <Info className="w-12 h-12 opacity-10" />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-3 tracking-tight opacity-40">Zero Results</h3>
                                    <p className="text-white/20 max-w-xs text-sm leading-relaxed">No data packets found for the {view} query in this cluster.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="max-w-7xl w-full mx-auto mt-32 py-10 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4 opacity-30 text-[10px] uppercase font-black tracking-[0.4em]">
                <div>FindMe Distributed Ledger &bull; Dev Mode</div>
                <div className="flex items-center gap-4">
                    <span>Protocol v3.0</span>
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                </div>
            </div>
        </div>
    );
}

/* ─── Card Components ─── */

function BusinessCard({ business, index }: { business: Business, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl rounded-[32px] p-8 md:p-10 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 bg-blue-500 group-hover:opacity-20 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <Building2 className="w-7 h-7 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400/80">
                        {business.ownershipType}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors line-clamp-1 tracking-tight">{business.businessName}</h3>
                <div className="flex items-center gap-3 mb-6 text-[11px] font-bold uppercase tracking-widest text-white/30">
                    <span className="px-2.5 py-1 bg-white/[0.05] rounded-lg border border-white/[0.05]">{business.mainCategory}</span>
                    <ArrowRight size={10} className="opacity-20" />
                    <span className="opacity-50">{business.subCategory}</span>
                </div>

                <p className="text-sm text-white/40 leading-relaxed mb-8 line-clamp-3 font-medium">
                    {business.description || "System generated description record for FindMe ecosystem."}
                </p>

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {business.tags?.map((tag: string) => (
                            <span key={tag} className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest bg-blue-500/5 text-blue-400/60 border border-blue-500/10 px-3 py-1.5 rounded-xl">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-[8px] uppercase font-black tracking-[0.3em] text-white/20 mb-1">Core Offering</span>
                            <span className="text-xs font-bold text-white/70">{business.majorOffering}</span>
                        </div>
                        <div className="text-[9px] font-black text-white/10 uppercase tracking-widest">
                            SN: {business._id.slice(-6)}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function UserCard({ user, index }: { user: RegisteredUser, index: number }) {
    const formattedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl rounded-[32px] p-8 md:p-10 hover:border-green-500/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 bg-green-500 group-hover:opacity-20 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-10">
                    <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)] group-hover:scale-110 transition-transform">
                        <UserIcon className="w-7 h-7 text-green-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400/80">
                        {user.section || "General"}
                    </span>
                </div>

                <h3 className="text-3xl font-bold mb-8 group-hover:text-green-400 transition-colors uppercase tracking-tight leading-none">{user.name}</h3>
                
                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-sm font-medium text-white/50 hover:text-white/80 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                            <Mail size={14} className="opacity-40" />
                        </div>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-medium text-white/50 hover:text-white/80 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                            <Phone size={14} className="opacity-40" />
                        </div>
                        <span>{user.phone}</span>
                    </div>
                    {user.referralCode && (
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/20 ml-1">
                            <Tag size={12} className="opacity-40" />
                            <span>Referral: {user.referralCode}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-green-500/40" />
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{formattedDate}</span>
                    </div>
                    <div className="text-[9px] font-black text-white/10 uppercase tracking-widest">
                        UID: {user._id.slice(-6)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ContactCard({ contact, index }: { contact: ContactRecord, index: number }) {
    const formattedDate = new Date(contact.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl rounded-[32px] p-8 md:p-10 hover:border-purple-500/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 bg-purple-500 group-hover:opacity-20 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)] group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-7 h-7 text-purple-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400/80">
                        {contact.section || "Inquiry"}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors uppercase tracking-tight">{contact.name}</h3>
                
                <div className="flex items-center gap-3 mb-8 text-[11px] font-bold text-white/40">
                    <Mail size={12} className="opacity-30" />
                    <span>{contact.email}</span>
                </div>

                <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/[0.05] mb-8 relative group">
                    <div className="absolute top-0 left-6 w-8 h-1 bg-purple-500/30 rounded-full -translate-y-1/2" />
                    <p className="text-sm text-white/60 leading-relaxed font-medium line-clamp-6 italic">
                        &ldquo;{contact.message}&rdquo;
                    </p>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-purple-500/40" />
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{formattedDate}</span>
                    </div>
                    <div className="text-[9px] font-black text-white/10 uppercase tracking-widest">
                        CID: {contact._id.slice(-6)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function WaitlistCard({ waitlist, index }: { waitlist: WaitlistRecord, index: number }) {
    const formattedDate = new Date(waitlist.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl rounded-[32px] p-8 md:p-10 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 bg-amber-500 group-hover:opacity-20 transition-opacity" />
            
            <div className="flex flex-col h-full relative z-10">
                <div className="flex items-start justify-between mb-10">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:rotate-12 transition-transform">
                        <Clock className="w-7 h-7 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400/80">
                        {waitlist.section || "Active"}
                    </span>
                </div>

                <div className="flex flex-col gap-1 mb-10">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 ml-1">Member ID</span>
                    <h3 className="text-3xl font-bold group-hover:text-amber-400 transition-colors uppercase tracking-tight leading-none truncate break-all">
                        {waitlist.email.split('@')[0]}
                    </h3>
                </div>
                
                <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-4 text-sm font-bold text-white/50 bg-white/[0.03] px-5 py-4 rounded-2xl border border-white/5 group-hover:border-amber-500/20 transition-all">
                        <Mail size={16} className="text-amber-500/40" />
                        <span className="truncate">{waitlist.email}</span>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-amber-500/40" />
                        <span className="text-[9px] uppercase font-black tracking-[0.3em] text-white/30">{formattedDate}</span>
                    </div>
                    <div className="text-[9px] font-black text-white/10 uppercase tracking-widest">
                        WID: {waitlist._id.slice(-6)}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

import { RegisteredUser as RegisteredUserInterface } from "@/services/api";
