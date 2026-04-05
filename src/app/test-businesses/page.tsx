"use client";

import { useGetBusinesses } from "@/hooks/useGetBusinesses";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useGetContacts } from "@/hooks/useGetContacts";
import { useGetWaitlist } from "@/hooks/useGetWaitlist";
import { THEME } from "@/config/theme";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Info, User as UserIcon, Building2, MessageSquare, Clock, RefreshCcw } from "lucide-react";
import { useState } from "react";
import { Business, RegisteredUser, ContactRecord, WaitlistRecord } from "@/services/api";

type ViewType = "businesses" | "users" | "contacts" | "waitlist";

const FINDME_BLUE = "#2B365A"; // Navy Blue

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
            className="min-h-screen w-full relative flex flex-col p-4 md:p-8 lg:p-12 text-white overflow-hidden selection:bg-blue-500/30"
            style={{ fontFamily: "var(--font-mulish), sans-serif" }}
        >
            {/* Background Style */}
            <div className="fixed inset-0 -z-20 bg-[#060606]" />
            <div 
                className="fixed inset-0 -z-10 opacity-10 blur-[120px]"
                style={{
                    background: `radial-gradient(circle at 50% 50%, ${FINDME_BLUE}, transparent 80%)`
                }}
            />

            {/* Main Dashboard Container */}
            <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col h-full">
                {/* FindMe Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12 sm:mb-16 px-2 sm:px-0">
                    <div className="flex flex-col gap-2">
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 opacity-40 hover:opacity-100 transition-all text-[10px] font-extrabold uppercase tracking-[0.4em] mb-4"
                        >
                            <ChevronLeft size={14} />
                            Exit Registry
                        </Link>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter uppercase italic leading-[0.9]">
                            FindMe <span style={{ color: FINDME_BLUE }}>Registry</span>
                        </h1>
                        <p className="text-white/40 text-sm max-w-md mt-4 sm:mt-6 font-medium leading-relaxed tracking-wide">
                            A real-time directory of all participants and businesses 
                            within the FindMe ecosystem.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 sm:gap-6 items-start md:items-end">
                        {/* Tab Switcher - Now more mobile responsive */}
                        <div className="flex flex-wrap bg-white/[0.04] p-1 rounded-xl sm:rounded-2xl border border-white/[0.08] backdrop-blur-3xl">
                            {(["businesses", "users", "contacts", "waitlist"] as ViewType[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setView(tab)}
                                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative ${
                                        view === tab ? "text-white" : "text-white/20 hover:text-white/40"
                                    }`}
                                >
                                    <span className="relative z-10">{tab === "waitlist" ? "Waitlist" : tab}</span>
                                    {view === tab && (
                                        <motion.div 
                                            layoutId="registry-pill"
                                            className="absolute inset-0"
                                            style={{ backgroundColor: FINDME_BLUE, borderRadius: "8px" }}
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => refetch()}
                            className="px-6 sm:px-8 py-2 sm:py-3 bg-white/[0.06] border border-white/[0.1] rounded-xl sm:rounded-2xl font-bold text-[10px] sm:text-xs uppercase tracking-[0.25em] hover:bg-white/[0.12] transition-all flex items-center gap-3 group"
                        >
                            <RefreshCcw size={14} className="opacity-40 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Registry View */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-[1px] bg-white/[0.05]"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                    <div key={i} className="h-14 sm:h-16 bg-[#080808] animate-pulse" />
                                ))}
                            </motion.div>
                        ) : isError ? (
                            <motion.div 
                                key="error"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-24 sm:py-32 bg-[#080808] border border-white/10 text-center"
                            >
                                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-6 border border-white/20 shadow-[0_0_30px_rgba(43,54,90,0.1)]">
                                    <Info className="w-6 h-6 opacity-60" style={{ color: FINDME_BLUE }} />
                                </div>
                                <h3 className="text-xl font-extrabold mb-2 uppercase italic tracking-widest">Registry Sync Error</h3>
                                <p className="text-white/30 text-sm max-w-xs mb-8">Unable to refresh records.</p>
                                <button onClick={() => refetch()} className="px-8 py-3 rounded-lg font-extrabold uppercase text-[10px] tracking-[0.3em] hover:opacity-90" style={{ backgroundColor: FINDME_BLUE }}>Retry</button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={view}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full bg-[#080808] border border-white/10"
                            >
                                <div className="overflow-x-auto custom-scrollbar">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-white/10 bg-white/[0.02]">
                                                {view === "businesses" && (
                                                    <>
                                                        <Th>Name</Th>
                                                        <Th>Category</Th>
                                                        <Th>Ownership</Th>
                                                        <Th>Offering</Th>
                                                        <Th>Registered</Th>
                                                    </>
                                                )}
                                                {view === "users" && (
                                                    <>
                                                        <Th>Participant</Th>
                                                        <Th>Email</Th>
                                                        <Th>Phone</Th>
                                                        <Th>Section</Th>
                                                        <Th>Joined</Th>
                                                    </>
                                                )}
                                                {view === "contacts" && (
                                                    <>
                                                        <Th>Name</Th>
                                                        <Th>Email</Th>
                                                        <Th>Message</Th>
                                                        <Th>Origin</Th>
                                                        <Th>Date</Th>
                                                    </>
                                                )}
                                                {view === "waitlist" && (
                                                    <>
                                                        <Th>Email</Th>
                                                        <Th>Priority</Th>
                                                        <Th>ID</Th>
                                                        <Th>Joined</Th>
                                                    </>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/10">
                                            {view === "businesses" ? (
                                                businessesData?.data?.records?.map((record) => (
                                                    <BusinessRow key={record._id} record={record} />
                                                ))
                                            ) : view === "users" ? (
                                                usersData?.data?.records?.map((record) => (
                                                    <UserRow key={record._id} record={record} />
                                                ))
                                            ) : view === "contacts" ? (
                                                contactsData?.data?.records?.map((record) => (
                                                    <ContactRow key={record._id} record={record} />
                                                ))
                                            ) : (
                                                waitlistData?.data?.records?.map((record) => (
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
                                    <div className="py-32 text-center flex flex-col items-center">
                                        <p className="text-white/20 font-extrabold uppercase text-[10px] tracking-[0.5em]">No FindMe records found</p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Insight */}
                <div className="mt-16 py-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 opacity-30 text-[9px] uppercase font-bold tracking-[0.4em] px-2 sm:px-0">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        Registry Active
                    </div>
                    <span>FindMe Registry &bull; 2026</span>
                </div>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </div>
    );
}

/* ─── Registry Table Sub-components ─── */

function Th({ children }: { children: React.ReactNode }) {
    return (
        <th className="px-4 sm:px-6 md:px-10 py-4 sm:py-5 text-left text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/40 border-r border-white/10 last:border-r-0 whitespace-nowrap">
            {children}
        </th>
    );
}

function Td({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return (
        <td className={`px-4 sm:px-6 md:px-10 py-4 sm:py-5 text-xs sm:text-sm font-semibold border-r border-white/10 last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis ${className}`}>
            {children}
        </td>
    );
}

function BusinessRow({ record }: { record: Business }) {
    return (
        <tr className="hover:bg-white/5 transition-all group cursor-default">
            <Td className="text-white font-extrabold tracking-tight">
                <div className="flex items-center gap-3">
                    <Building2 size={14} className="opacity-40 shrink-0" style={{ color: FINDME_BLUE }} />
                    {record.businessName}
                </div>
            </Td>
            <Td className="text-white/60">{record.mainCategory}</Td>
            <Td className="text-white/40 text-[10px] uppercase font-bold tracking-widest">{record.ownershipType}</Td>
            <Td className="text-white/80">{record.majorOffering}</Td>
            <Td className="text-white/20 text-[11px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString()}
            </Td>
        </tr>
    );
}

function UserRow({ record }: { record: RegisteredUser }) {
    return (
        <tr className="hover:bg-white/5 transition-all group cursor-default">
            <Td className="text-white italic font-extrabold lowercase tracking-tight">
                <div className="flex items-center gap-3">
                    <UserIcon size={14} className="opacity-40 shrink-0" style={{ color: FINDME_BLUE }} />
                    {record.name}
                </div>
            </Td>
            <Td className="text-white/60 lowercase">{record.email}</Td>
            <Td className="text-white/40 font-bold tabular-nums">{record.phone}</Td>
            <Td>
                <span className="text-[9px] font-extrabold uppercase tracking-widest px-2 py-1 text-white border border-white/10" style={{ backgroundColor: FINDME_BLUE }}>
                    {record.section}
                </span>
            </Td>
            <Td className="text-white/20 text-[11px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString()}
            </Td>
        </tr>
    );
}

function ContactRow({ record }: { record: ContactRecord }) {
    return (
        <tr className="hover:bg-white/5 transition-all group cursor-default">
            <Td className="text-white font-extrabold uppercase tracking-tighter">
                <div className="flex items-center gap-3">
                    <MessageSquare size={14} className="opacity-40 shrink-0" style={{ color: FINDME_BLUE }} />
                    {record.name}
                </div>
            </Td>
            <Td className="text-white/50 lowercase">{record.email}</Td>
            <Td className="text-white/60 italic max-w-[200px] sm:max-w-xs overflow-hidden text-ellipsis">
                {record.message}
            </Td>
            <Td className="text-white/30 uppercase text-[9px] font-extrabold">{record.section}</Td>
            <Td className="text-white/20 text-[11px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString()}
            </Td>
        </tr>
    );
}

function WaitlistRow({ record }: { record: WaitlistRecord }) {
    return (
        <tr className="hover:bg-white/5 transition-all group cursor-default">
            <Td className="text-white italic font-bold tracking-tight">
                <div className="flex items-center gap-3">
                    <Clock size={14} className="opacity-40 shrink-0" style={{ color: FINDME_BLUE }} />
                    {record.email}
                </div>
            </Td>
            <Td className="text-white/40 uppercase text-[10px] font-extrabold">{record.section}</Td>
            <Td className="text-white/20 font-mono text-[10px] uppercase">ID_{record._id.slice(-6)}</Td>
            <Td className="text-white/20 text-[11px] font-bold tabular-nums">
                {new Date(record.createdAt).toLocaleDateString()}
            </Td>
        </tr>
    );
}
