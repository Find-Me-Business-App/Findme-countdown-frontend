import { useQuery } from "@tanstack/react-query";
import { getBusinesses, GetBusinessesResponse } from "@/services/api";

export const useGetBusinesses = () => {
  return useQuery<GetBusinessesResponse, Error>({
    queryKey: ["businesses"],
    queryFn: getBusinesses,
  });
};
