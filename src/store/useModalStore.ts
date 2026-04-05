import { create } from "zustand";
import { SectionType } from "@/config/modal-configs";

export type ModalType = "registration" | "waitlist" | "info" | "contact";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  section: SectionType;
  userId: string; // Added userId to session state
  data: Record<string, unknown> | null;
  openModal: (type: ModalType, section?: SectionType, data?: Record<string, unknown> | null) => void;
  closeModal: () => void;
  setUserId: (id: string) => void; // Added setter for userId
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  section: "home",
  userId: "",
  data: null,
  openModal: (type, section = "home", data = null) => set({ isOpen: true, type, section, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
  setUserId: (id) => set({ userId: id }),
}));
