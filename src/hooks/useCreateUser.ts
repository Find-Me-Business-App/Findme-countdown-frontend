import { useMutation } from "@tanstack/react-query";
import { createUser, CreateUserRequest, CreateUserResponse } from "@/services/api";

export const useCreateUser = () => {
  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: createUser,
    onSuccess: () => {
      // Success logic can be added here (e.g., analytics)
    },
    onError: () => {
      // Error handling logic can be added here
    },
  });
};
