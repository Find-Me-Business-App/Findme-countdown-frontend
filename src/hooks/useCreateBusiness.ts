import { useMutation } from "@tanstack/react-query";
import { createBusiness, CreateBusinessRequest, CreateBusinessResponse } from "@/services/api";

export const useCreateBusiness = () => {
  return useMutation<CreateBusinessResponse, Error, CreateBusinessRequest>({
    mutationFn: createBusiness,
    onSuccess: () => {
      // Success logic can be added here (e.g., analytics)
    },
    onError: () => {
      // Error handling logic can be added here
    },
  });
};
