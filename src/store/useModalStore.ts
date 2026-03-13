import { create } from "zustand";
import { SectionType } from "@/config/modal-configs";

export type ModalType = "registration" | "waitlist" | "info" | "contact";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  section: SectionType;
  data: Record<string, unknown> | null;
  openModal: (type: ModalType, section?: SectionType, data?: Record<string, unknown> | null) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  section: "home",
  data: null,
  openModal: (type, section = "home", data = null) => set({ isOpen: true, type, section, data }),
  closeModal: () => set({ isOpen: false, type: null, data: null }),
}));
