// hooks/useUser.ts
"use client";

import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    credentials: "include",
  }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  });

export function useUser() {
  const { data, error, isLoading } = useSWR("/api/me", fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
