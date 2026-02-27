const API_BASE_URL = "https://findme-api-vqkj.onrender.com/api/v1";

/**
 * Standardized API request helper to handle fetch boilerplate and error parsing.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
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
    throw new Error(errorMessage);
  }

  return data as T;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  referralCode?: string;
  password?: string;
  section: string;
}

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

export const createUser = (userData: CreateUserRequest) =>
  apiRequest<CreateUserResponse>("/lists/user", {
    method: "POST",
    body: JSON.stringify(userData),
  });

export interface CreateWaitlistRequest {
  email: string;
  section: string;
}

export const createWaitlist = (waitlistData: CreateWaitlistRequest) =>
  apiRequest<CreateUserResponse>("/lists/wait-list", {
    method: "POST",
    body: JSON.stringify(waitlistData),
  });

export interface CreateContactRequest {
  name: string;
  email: string;
  message: string;
  section: string;
}

export const createContact = (contactData: CreateContactRequest) =>
  apiRequest<CreateUserResponse>("/lists/contact", {
    method: "POST",
    body: JSON.stringify(contactData),
  });
