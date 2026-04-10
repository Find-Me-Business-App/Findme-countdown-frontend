/**
 * Centralized TypeScript types for the AME registration flow.
 * Eliminates all `any` types across view components and the coordinator.
 */

/* ─── Step Definitions ──────────────────────────────────────── */

export type AmeStep =
    | "prompts"
    | "selection"
    | "reply"
    | "business_name"
    | "followup"
    | "category"
    | "followup2"
    | "followup3"
    | "ownership"
    | "user_info";

/** Ordered array of steps for progress tracking */
export const AME_STEPS: AmeStep[] = [
    "prompts",
    "selection",
    "reply",
    "business_name",
    "followup",
    "category",
    "followup2",
    "followup3",
    "ownership",
    "user_info",
];

/* ─── Data Types ────────────────────────────────────────────── */

export type OfferType = "Product" | "Service" | "Both" | "";
export type NatureType = "Digital" | "Physical" | "";

export interface AmeExtractedInfo {
    locations: string[];
    businessType: string;
}

export interface AmeUserInfo {
    name: string;
    email: string;
    password: string;
    phone: string;
    referralCode: string;
}

export interface AmeCollectedData {
    initialPrompt: string;
    businessName: string;
    offerType: OfferType;
    category: string;
    nature: NatureType;
    staffCount: string;
    ownership: string;
    user: AmeUserInfo | null;
    extractedInfo: AmeExtractedInfo;
}

/** The initial/default state for collected data */
export const AME_INITIAL_DATA: AmeCollectedData = {
    initialPrompt: "",
    businessName: "",
    offerType: "",
    category: "",
    nature: "",
    staffCount: "",
    ownership: "",
    user: null,
    extractedInfo: {
        locations: [],
        businessType: "Business",
    },
};

/* ─── Utility ───────────────────────────────────────────────── */

/**
 * Sanitize a user-provided string for safe API transmission.
 * Trims whitespace, removes control characters, and limits length.
 */
export function sanitizeInput(value: string, maxLength = 500): string {
    return value
        .trim()
        .replace(/[\x00-\x1F\x7F]/g, "") // Strip control characters
        .slice(0, maxLength);
}
