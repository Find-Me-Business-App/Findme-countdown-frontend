import { z } from "zod";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://findme-api-vqkj.onrender.com/api/v1";

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
    user: {
      name: string;
      email: string;
      phone: string;
      referralCode?: string;
      password?: string;
      section: string;
      _id: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
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

export const CreateBusinessSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  businessName: z.string().min(1, "Business name is required"),
  ownershipType: z.string().min(1, "Ownership type is required"),
  mainCategory: z.string().min(1, "Main category is required"),
  subCategory: z.string().min(1, "Sub category is required"),
  tags: z.array(z.string()).optional(),
  majorOffering: z.string().min(1, "Major offering is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type CreateBusinessRequest = z.infer<typeof CreateBusinessSchema>;

export interface CreateBusinessResponse {
  error: boolean;
  message: string;
  data: {
    user: string;
    businessName: string;
    ownershipType: string;
    mainCategory: string;
    subCategory: string;
    tags: string[];
    majorOffering: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
}

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
    body: JSON.stringify({ ...waitlistData, password: "waitlist_default" }),
  });
};

export const createContact = async (contactData: CreateContactRequest) => {
  CreateContactSchema.parse(contactData); // Client-side validation
  return apiRequest<CreateUserResponse>("/lists/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
};

export const createBusiness = async (businessData: CreateBusinessRequest) => {
  CreateBusinessSchema.parse(businessData); // Client-side validation
  return apiRequest<CreateBusinessResponse>("/businesses/", {
    method: "POST",
    body: JSON.stringify(businessData),
  });
};

/* ────────────────────────────────────────────────────────────── */
/* ─── Get All Businesses ─── */
/* ────────────────────────────────────────────────────────────── */

export interface Business {
  _id: string;
  user: string;
  businessName: string;
  ownershipType: string;
  mainCategory: string;
  subCategory: string;
  tags: string[];
  majorOffering: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetBusinessesResponse {
  error: boolean;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage: number | null;
      prevPage: number | null;
      totalPages: number;
      totalRecords: number;
    };
    records: Business[];
  };
}

export const getBusinesses = async () => {
  return apiRequest<GetBusinessesResponse>("/businesses/", {
    method: "GET",
  });
};

/* ────────────────────────────────────────────────────────────── */
/* ─── Get All Users ─── */
/* ────────────────────────────────────────────────────────────── */

export interface RegisteredUser {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
  section: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetUsersResponse {
  error: boolean;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage: number | null;
      prevPage: number | null;
      totalPages: number;
      totalRecords: number;
    };
    records: RegisteredUser[];
  };
}

export const getUsers = async () => {
  return apiRequest<GetUsersResponse>("/lists/user", {
    method: "GET",
  });
};

/* ────────────────────────────────────────────────────────────── */
/* ─── Get All Contacts ─── */
/* ────────────────────────────────────────────────────────────── */

export interface ContactRecord {
  name: string;
  email: string;
  message: string;
  section: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetContactsResponse {
  error: boolean;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage: number | null;
      prevPage: number | null;
      totalPages: number;
      totalRecords: number;
    };
    records: ContactRecord[];
  };
}

export const getContacts = async () => {
  return apiRequest<GetContactsResponse>("/lists/contact", {
    method: "GET",
  });
};

/* ────────────────────────────────────────────────────────────── */
/* ─── Get All Waitlist ─── */
/* ────────────────────────────────────────────────────────────── */

export interface WaitlistRecord {
  email: string;
  section: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetWaitlistResponse {
  error: boolean;
  message: string;
  data: {
    pagination: {
      currentPage: number;
      hasNext: boolean;
      hasPrev: boolean;
      nextPage: number | null;
      prevPage: number | null;
      totalPages: number;
      totalRecords: number;
    };
    records: WaitlistRecord[];
  };
}

export const getWaitlist = async () => {
  return apiRequest<GetWaitlistResponse>("/lists/wait-list", {
    method: "GET",
  });
};
