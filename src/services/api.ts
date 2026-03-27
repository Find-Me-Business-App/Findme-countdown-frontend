import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Standardized API Error class
 */
export class ApiError extends Error {
  constructor(public message: string, public status?: number, public data?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Standardized API request helper to handle fetch boilerplate and error parsing.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.message || `API Error: ${response.status} ${response.statusText}`;
      throw new ApiError(errorMessage, response.status, data);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error instanceof Error ? error.message : "An unexpected network error occurred");
  }
}

/* ────────────────────────────────────────────────────────────── */
/* ─── Schemas & Interfaces ─── */
/* ────────────────────────────────────────────────────────────── */

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Invalid phone number"),
  referralCode: z.string().optional(),
  password: z.string().optional(),
  section: z.string()
});

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export interface CreateUserResponse {
  error: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    phone: string;
    referralCode: string;
    section: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

export const CreateWaitlistSchema = z.object({
  email: z.string().email("Invalid email address"),
  section: z.string()
});

export type CreateWaitlistRequest = z.infer<typeof CreateWaitlistSchema>;

export const CreateContactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message is too short"),
  section: z.string()
});

export type CreateContactRequest = z.infer<typeof CreateContactSchema>;

/* ────────────────────────────────────────────────────────────── */
/* ─── API Methods ─── */
/* ────────────────────────────────────────────────────────────── */

export const createUser = async (userData: CreateUserRequest) => {
  CreateUserSchema.parse(userData); // Client-side validation
  return apiRequest<CreateUserResponse>("/lists/user", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

export const createWaitlist = async (waitlistData: CreateWaitlistRequest) => {
  CreateWaitlistSchema.parse(waitlistData); // Client-side validation
  return apiRequest<CreateUserResponse>("/lists/wait-list", {
    method: "POST",
    body: JSON.stringify(waitlistData),
  });
};

export const createContact = async (contactData: CreateContactRequest) => {
  CreateContactSchema.parse(contactData); // Client-side validation
  return apiRequest<CreateUserResponse>("/lists/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
};
