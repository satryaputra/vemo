import { getMeFn } from "@/api/services/users";
import { IUserResponse } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export function useUserQuery(params?: any) {
  return {
    userQuery: useQuery({
      queryKey: ["me"],
      queryFn: async (): Promise<IUserResponse> => await getMeFn(),
      ...params,
    }),
  };
}
