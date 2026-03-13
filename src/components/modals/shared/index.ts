// Re-export shared modal components from their original location.
// This avoids duplicating styled-jsx components which can cause webpack runtime errors.
export { default as ModalBackdrop } from "@/components/shared/ModalBackdrop";
export { default as ModalCloseButton } from "@/components/shared/ModalCloseButton";
export { default as ModalContainer } from "@/components/shared/ModalContainer";
