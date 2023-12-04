import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { IUserResponse } from "@/api/types";
import { getMeFn } from "@/api/services/users";
import { isTokenSet } from "@/lib/utils/token";
import { IconLoader3 } from "@tabler/icons-react";

export default function PrivateRoute() {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: async (): Promise<IUserResponse> => await getMeFn(),
  });

  if (
    (query.isError && (query.error as any)?.response?.status === 401) ||
    !isTokenSet()
  ) {
    return <Navigate to="/" />;
  }

  if (query.isLoading) {
    return (
      <div className="min-h-screen w-full grid place-items-center">
        <IconLoader3
          size={50}
          className="animate-spin text-primary"
        />
      </div>
    );
  }

  if (query.isSuccess) {
    return <Outlet />;
  }
}