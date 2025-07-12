"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

export async function logoutUser(
  setIsLoading: (loading: boolean) => void,
  onSuccess?: () => void
) {
  setIsLoading(true);
  const cookie = document.cookie;
  console.log("Logout cookie:", cookie);
  try {
    await axios.post("/api/logout", null, {
      withCredentials: true,
    });

    toast.success("Logged out successfully ✅");
    onSuccess?.();
  } catch (err) {
    const error = err as AxiosError;
    const data = error.response?.data as any;
    const message = data?.detail || "Logout failed ❌";
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
}
