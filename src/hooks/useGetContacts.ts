import { useQuery } from "@tanstack/react-query";
import { getContacts, GetContactsResponse } from "@/services/api";

export const useGetContacts = () => {
  return useQuery<GetContactsResponse, Error>({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });
};
