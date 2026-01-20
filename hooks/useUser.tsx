// hooks/useUser.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Fetcher function using plain axios (cookies handling is automatic for same-origin)
const fetchUser = async () => {
  const { data } = await axios.get("/api/me");
  return data;
};

export function useUser() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false, // Don't retry on 401/403 ideally, but let's keep it simple for now
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
