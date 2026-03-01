import { create } from "zustand";
import { SectionType } from "@/config/modal-configs";

export type ModalType = "registration" | "waitlist" | "info" | "contact";

interface ModalState {
  isOpen: boolean;
  type: ModalType | null;
  section: SectionType;
  openModal: (type: ModalType, section?: SectionType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  section: "home",
  openModal: (type, section = "home") => set({ isOpen: true, type, section }),
  closeModal: () => set({ isOpen: false, type: null }),
}));
