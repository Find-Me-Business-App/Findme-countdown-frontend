import { useQuery } from "@tanstack/react-query";
import { getWaitlist, GetWaitlistResponse } from "@/services/api";

export const useGetWaitlist = () => {
  return useQuery<GetWaitlistResponse, Error>({
    queryKey: ["waitlist"],
    queryFn: getWaitlist,
  });
};
