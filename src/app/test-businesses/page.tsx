"use client";

import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetContacts } from "@/hooks/useGetContacts";
import { useGetWaitlist } from "@/hooks/useGetWaitlist";
import { THEME } from "@/config/theme";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Layout, Info, User as UserIcon, Building2, MessageSquare, Clock, ArrowRight, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Business, RegisteredUser, ContactRecord, WaitlistRecord } from "@/services/api";

type ViewType = "businesses" | "users" | "contacts" | "waitlist";

const FINDME_BLUE = "#3b82f6";

export default function BusinessesPage() {
    const [view, setView] = useState<ViewType>("businesses");
    
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
        <div 
            className="min-h-screen w-full relative flex flex-col p-4 md:p-8 lg:p-12 text-white overflow-hidden selection:bg-blue-500/30 font-mulish"
            style={{ fontFamily: "var(--font-mulish), sans-serif" }}
        >
            {/* Background Style */}
            <div className="fixed inset-0 -z-20 bg-[#060606]" />
            <div 
                className="fixed inset-0 -z-10 opacity-15 blur-[120px]"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${FINDME_BLUE}, transparent 80%)`
                }}
            />

            {/* Main Dashboard Container */}
            <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full">
                {/* FindMe Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                    <div className="flex flex-col gap-2">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 opacity-40 hover:opacity-100 transition-all text-[10px] font-extrabold uppercase tracking-[0.4em] mb-4"
                        >
                            <ChevronLeft size={14} />
                            Exit to Home
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter uppercase italic leading-[0.9]">
                            FindMe <span style={{ color: FINDME_BLUE }}>Registry</span>
                        </h1>
                        <p className="text-white/40 text-sm max-w-md mt-6 font-medium leading-relaxed tracking-wide">
                            A real-time directory of all participants and businesses 
                            within the FindMe ecosystem.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6 items-end">
                        {/* Tab Switcher - FindMe Brand Styling */}
                        <div className="flex bg-white/[0.04] p-1.5 rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-3xl">
                            {(["businesses", "users", "contacts", "waitlist"] as ViewType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setView(tab)}
                                    className={`px-6 py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                                        view === tab ? "text-white" : "text-white/20 hover:text-white/40"
                                    }`}
                                >
                                    <span className="relative z-10">{tab === "waitlist" ? "FindMe Waitlist" : `FindMe ${tab}`}</span>
                                    {view === tab && (
                                        <motion.div 
                                            layoutId="registry-pill"
                                            className="absolute inset-0 bg-blue-600 shadow-[0_4px_20px_rgba(37,99,235,0.4)]"
                                            style={{ borderRadius: "12px" }}
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => refetch()}
                            className="px-8 py-3 bg-white/[0.06] border border-white/[0.1] rounded-2xl font-bold text-xs uppercase tracking-[0.25em] hover:bg-white/[0.12] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-3 group"
                        >
                            <RefreshCcw size={16} className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                            Refresh Registry
                        </button>
                    </div>
                </div>

                {/* Registry View */}
                <div className="flex-1 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                    <div key={i} className="h-16 bg-white/[0.03] rounded-2xl border border-white/[0.05] animate-pulse" />
                                ))}
                            </motion.div>
                        ) : isError ? (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center p-24 bg-white/[0.02] border border-white/[0.05] rounded-[48px] text-center"
                            >
                                <div className="w-20 h-20 bg-blue-600/10 rounded-full flex items-center justify-center mb-8 border border-blue-600/20 shadow-[0_0_30px_rgba(37,99,235,0.1)]">
                                    <Info className="w-10 h-10 text-blue-500 opacity-60" />
                                </div>
                                <h3 className="text-2xl font-extrabold mb-4 uppercase italic tracking-widest">Registry Sync Error</h3>
                                <p className="text-white/30 text-sm max-w-sm mb-10 leading-relaxed font-medium">Unable to refresh the latest records from the registry server.</p>
                                <button onClick={() => refetch()} className="bg-blue-600 px-10 py-4 rounded-2xl font-extrabold uppercase text-xs tracking-[0.3em] hover:bg-blue-500 transition-all hover:shadow-[0_4px_25px_rgba(37,99,235,0.4)]">Retry Sync</button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={view}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full bg-white/[0.02] border border-white/[0.06] rounded-[40px] overflow-hidden backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                            >
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/[0.06] bg-white/[0.03]">
                                                {view === "businesses" && (
                                                    <>
                                                        <Th>FindMe Business</Th>
                                                        <Th>Category</Th>
                                                        <Th>Type</Th>
                                                        <Th>Core Offering</Th>
                                                        <Th>Registry Date</Th>
                                                    </>
                                                )}
                                                {view === "users" && (
                                                    <>
                                                        <Th>Participant Name</Th>
                                                        <Th>Contact Email</Th>
                                                        <Th>Phone</Th>
                                                        <Th>Interest Area</Th>
                                                        <Th>Joined Finder</Th>
                                                    </>
                                                )}
                                                {view === "contacts" && (
                                                    <>
                                                        <Th>Sender Name</Th>
                                                        <Th>Email Address</Th>
                                                        <Th>Inquiry Content</Th>
                                                        <Th>Origin</Th>
                                                        <Th>Received On</Th>
                                                    </>
                                                )}
                                                {view === "waitlist" && (
                                                    <>
                                                        <Th>Subscriber Email</Th>
                                                        <Th>Access Priority</Th>
                                                        <Th>Waitlist ID</Th>
                                                        <Th>Requested On</Th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.04]">
                                            {view === "businesses" ? (
                                                businessesData?.data?.records?.map((record, i) => (
                                                    <BusinessRow key={record._id} record={record} />
                                                ))
                                            ) : view === "users" ? (
                                                usersData?.data?.records?.map((record, i) => (
                                                    <UserRow key={record._id} record={record} />
                                                ))
                                            ) : view === "contacts" ? (
                                                contactsData?.data?.records?.map((record, i) => (
                                                    <ContactRow key={record._id} record={record} />
                                                ))
                                            ) : (
                                                waitlistData?.data?.records?.map((record, i) => (
                                                    <WaitlistRow key={record._id} record={record} />
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                
                                {/* Status Message */}
                                {((view === "businesses" && !businessesData?.data?.records?.length) || 
                                  (view === "users" && !usersData?.data?.records?.length) ||
                                  (view === "contacts" && !contactsData?.data?.records?.length) ||
                                  (view === "waitlist" && !waitlistData?.data?.records?.length)) && (
                                    <div className="py-40 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-white/[0.03] rounded-full flex items-center justify-center mb-6">
                                            <Info className="opacity-10" />
                                        </div>
                                        <p className="text-white/20 font-extrabold uppercase text-[11px] tracking-[0.5em]">No FindMe records found</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Insight */}
                <div className="mt-20 py-10 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 opacity-30 text-[10px] uppercase font-bold tracking-[0.4em]">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
                        Registry Operational
                    </div>
                    <div className="flex items-center gap-6">
                        <span>FindMe Registry &bull; 2026 Directory</span>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
            `}</style>
        </div>
    );
}

/* ─── Registry Table Sub-components ─── */

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="px-10 py-6 text-left text-[11px] font-extrabold uppercase tracking-[0.3em] text-white/50 border-r border-white/[0.04] last:border-r-0">
            {children}
        </th>
    );
}

function Td({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <td className={`px-10 py-6 text-sm font-semibold border-r border-white/[0.04] last:border-r-0 ${className}`}>
            {children}
        </td>
    );
}

function BusinessRow({ record }: { record: Business }) {
    return (
        <tr className="hover:bg-blue-600/[0.08] transition-all duration-300 group cursor-default">
            <Td className="text-white group-hover:text-blue-400 transition-colors">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.05] group-hover:scale-110 transition-transform">
                        <Building2 size={16} className="text-blue-500 opacity-60" />
                    </div>
                    <span className="font-extrabold tracking-tight underline decoration-blue-500/20 underline-offset-4">{record.businessName}</span>
                </div>
            </Td>
            <Td className="text-white/60">{record.mainCategory}</Td>
            <Td>
                <span className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 bg-white/[0.05] rounded-lg text-white/40 border border-white/[0.05]">
                    {record.ownershipType}
                </span>
            </Td>
            <Td className="text-white/80">{record.majorOffering}</Td>
            <Td className="text-white/30 text-[12px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </Td>
        </tr>
    );
}

function UserRow({ record }: { record: RegisteredUser }) {
    return (
        <tr className="hover:bg-blue-600/[0.08] transition-all duration-300 group cursor-default">
            <Td className="text-white group-hover:text-blue-400 transition-colors">
                <div className="flex items-center gap-4 italic font-extrabold lowercase tracking-tight">
                    <UserIcon size={16} className="text-blue-500 opacity-40" />
                    {record.name}
                </div>
            </Td>
            <Td className="text-white/60 lowercase font-medium">{record.email}</Td>
            <Td className="text-white/40 font-bold tabular-nums tracking-wider">{record.phone}</Td>
            <Td>
                <span className="text-[10px] font-extrabold uppercase tracking-widest px-4 py-1.5 bg-blue-600/10 text-blue-400 rounded-xl border border-blue-600/20">
                    {record.section}
                </span>
            </Td>
            <Td className="text-white/20 text-[12px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </Td>
        </tr>
    );
}

function ContactRow({ record }: { record: ContactRecord }) {
    return (
        <tr className="hover:bg-blue-600/[0.08] transition-all duration-300 group cursor-default text-white/90">
            <Td className="group-hover:text-blue-400">
                <div className="flex items-center gap-4 font-extrabold uppercase tracking-tighter">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
                    {record.name}
                </div>
            </Td>
            <Td className="text-white/50 lowercase">{record.email}</Td>
            <Td className="text-white/60 italic font-medium max-w-sm truncate pr-10">
                &ldquo;{record.message}&rdquo;
            </Td>
            <Td className="text-white/30 uppercase text-[10px] font-extrabold tracking-widest">{record.section}</Td>
            <Td className="text-white/20 text-[12px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Td>
        </tr>
    );
}

function WaitlistRow({ record }: { record: WaitlistRecord }) {
    return (
        <tr className="hover:bg-blue-600/[0.08] transition-all duration-300 group cursor-default">
            <Td className="text-white group-hover:text-blue-400 transition-colors">
                <div className="flex items-center gap-4 italic lowercase font-bold tracking-tight">
                    <Clock size={16} className="text-blue-500 opacity-40 shrink-0" />
                    <span className="truncate">{record.email}</span>
                </div>
            </Td>
            <Td className="text-white/40 uppercase text-[10px] font-extrabold tracking-[0.2em]">{record.section}</Td>
            <Td className="text-white/20 tabular-nums text-[11px] font-mono tracking-widest uppercase">ID_{record._id.slice(-6)}</Td>
            <Td className="text-white/20 text-[12px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString()}
            </Td>
        </tr>
    );
}
