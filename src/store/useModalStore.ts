import { create } from "zustand";
import { SectionType } from "@/config/modal-configs";

export type ModalType = "registration" | "waitlist" | "info" | "contact";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  section: SectionType;
  userId: string; // Added userId to session state
  data: Record<string, unknown> | null;
  contactSubmissions: string[];
  waitlistSubmissions: string[];
  openModal: (type: ModalType, section?: SectionType, data?: Record<string, unknown> | null) => void;
  closeModal: () => void;
  setUserId: (id: string) => void;
  addContactSubmission: (email: string) => void;
  addWaitlistSubmission: (email: string) => void;
}

const getStorageItem = (key: string): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const setStorageItem = (key: string, value: string[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  }
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  section: "home",
  userId: "",
  data: null,
  contactSubmissions: getStorageItem("findme_contact_submissions"),
  waitlistSubmissions: getStorageItem("findme_waitlist_submissions"),
  openModal: (type, section = "home", data = null) => set({ isOpen: true, type, section, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
  setUserId: (id) => set({ userId: id }),
  addContactSubmission: (email) => set((state) => {
    const updated = [...state.contactSubmissions, email];
    setStorageItem("findme_contact_submissions", updated);
    return { contactSubmissions: updated };
  }),
  addWaitlistSubmission: (email) => set((state) => {
    const updated = [...state.waitlistSubmissions, email];
    setStorageItem("findme_waitlist_submissions", updated);
    return { waitlistSubmissions: updated };
  }),
}));
