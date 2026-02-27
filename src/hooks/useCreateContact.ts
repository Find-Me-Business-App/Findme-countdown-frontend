import { useMutation } from "@tanstack/react-query";
import { createContact, CreateContactRequest, CreateUserResponse } from "@/services/api";

export const useCreateContact = () => {
  return useMutation<CreateUserResponse, Error, CreateContactRequest>({
    mutationFn: createContact,
    onSuccess: (data) => {
      // Success logic
    },
    onError: (error) => {
      // Error logic
    },
  });
};
