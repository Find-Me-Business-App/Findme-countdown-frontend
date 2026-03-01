import { useMutation } from "@tanstack/react-query";
import { createContact, CreateContactRequest, CreateUserResponse } from "@/services/api";

export const useCreateContact = () => {
  return useMutation<CreateUserResponse, Error, CreateContactRequest>({
    mutationFn: createContact,
    onSuccess: () => {
      // Success logic
    },
    onError: () => {
      // Error logic
    },
  });
};
