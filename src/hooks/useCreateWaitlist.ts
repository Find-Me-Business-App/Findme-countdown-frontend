import { useMutation } from "@tanstack/react-query";
import { createWaitlist, CreateWaitlistRequest, CreateUserResponse } from "@/services/api";

export const useCreateWaitlist = () => {
  return useMutation<CreateUserResponse, Error, CreateWaitlistRequest>({
    mutationFn: createWaitlist,
    onSuccess: (data) => {
      // Success logic
    },
    onError: (error) => {
      // Error logic
    },
  });
};
