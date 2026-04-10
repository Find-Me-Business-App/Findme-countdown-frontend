import { useState, useCallback, useRef } from "react";
import { createUser, createBusiness, ApiError, CreateUserSchema } from "@/services/api";
import type { AmeCollectedData } from "@/components/modals/registration/ame/types";
import { sanitizeInput } from "@/components/modals/registration/ame/types";

interface AmeRegistrationResult {
    userId: string;
    userName: string;
    businessName: string;
}

interface UseAmeRegistrationReturn {
    submit: (data: AmeCollectedData) => Promise<AmeRegistrationResult | null>;
    isLoading: boolean;
    error: string | null;
    clearError: () => void;
}

/**
 * useAmeRegistration — Encapsulates the full AME registration API sequence.
 *
 * Handles:
 * - Input sanitization before API calls
 * - Client-side Zod validation for user data
 * - Sequential createUser → createBusiness API calls
 * - Idempotency guard (prevents double-submission)
 * - Structured error handling and loading state
 */
export function useAmeRegistration(): UseAmeRegistrationReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const submittingRef = useRef(false);

    const clearError = useCallback(() => setError(null), []);

    const submit = useCallback(async (data: AmeCollectedData): Promise<AmeRegistrationResult | null> => {
        // Idempotency guard
        if (submittingRef.current) return null;
        submittingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            // ── Validate user data ────────────────────────────
            if (!data.user) {
                throw new Error("User information is required.");
            }

            const sanitizedUser = {
                name: sanitizeInput(data.user.name, 100),
                email: sanitizeInput(data.user.email, 254).toLowerCase(),
                phone: sanitizeInput(data.user.phone, 20),
                password: data.user.password, // Don't trim passwords
                referralCode: data.user.referralCode ? sanitizeInput(data.user.referralCode, 50) : undefined,
                section: "business" as const,
            };

            // Client-side Zod validation
            const validation = CreateUserSchema.safeParse(sanitizedUser);
            if (!validation.success) {
                const firstError = validation.error.issues[0];
                throw new Error(firstError?.message || "Invalid user information.");
            }

            // Remove empty referralCode before sending
            if (!sanitizedUser.referralCode) {
                delete sanitizedUser.referralCode;
            }

            // ── 1. Create User ────────────────────────────────
            const userRes = await createUser(sanitizedUser);
            const newUserId = userRes.data.user._id;

            // ── 2. Create Business ────────────────────────────
            const sanitizedBusinessName = sanitizeInput(data.businessName, 200);
            const sanitizedPrompt = sanitizeInput(data.initialPrompt, 1000);

            await createBusiness({
                userId: newUserId,
                businessName: sanitizedBusinessName,
                ownershipType: data.ownership || "Self owned",
                mainCategory: data.category || "Company",
                subCategory: mapSubCategory(data.nature),
                majorOffering: mapMajorOffering(data.offerType),
                description:
                    sanitizedPrompt.length >= 10
                        ? sanitizedPrompt
                        : `Full registration for ${sanitizedBusinessName} business.`,
                tags: [data.category, data.nature].filter(Boolean),
            });

            return {
                userId: newUserId,
                userName: sanitizedUser.name,
                businessName: sanitizedBusinessName,
            };
        } catch (err: unknown) {
            const message =
                err instanceof ApiError
                    ? err.message
                    : err instanceof Error
                        ? err.message
                        : "Registration failed. Please try again.";
            setError(message);
            console.error("AME registration failed:", err);
            return null;
        } finally {
            setIsLoading(false);
            submittingRef.current = false;
        }
    }, []);

    return { submit, isLoading, error, clearError };
}

/* ─── Mapping Helpers ────────────────────────────────────────── */

function mapSubCategory(nature: string): string {
    switch (nature) {
        case "Digital": return "Technology";
        case "Physical": return "Logistics";
        default: return "Retail";
    }
}

function mapMajorOffering(offerType: string): string {
    switch (offerType) {
        case "Both": return "Product and services";
        case "Product": return "Physical Goods";
        case "Service": return "Digital Products";
        default: return "Product and services";
    }
}
