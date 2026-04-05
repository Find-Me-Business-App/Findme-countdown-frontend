import { useQuery } from "@tanstack/react-query";
import { getUsers, GetUsersResponse } from "@/services/api";

export const useGetUsers = () => {
  return useQuery<GetUsersResponse, Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
