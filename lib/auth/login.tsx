"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type LoginFormData = {
  email: string;
  password: string;
};

export async function loginUser(
  form: LoginFormData,
  setIsLoading: (loading: boolean) => void,
  onSuccess?: () => void
) {
  setIsLoading(true);
  try {
    await axios.post("/api/login", form, {
      withCredentials: true,
    });

    toast.success("Logged in successfully ✅");
    // Fetch the user
    const res = await fetch("/api/user", { credentials: "include" });
    const user = await res.json();
    console.log("Logged-in user:", user);

    onSuccess?.();
  } catch (err) {
    const error = err as AxiosError;
    const data = error.response?.data as any;
    const message =
      data?.non_field_errors?.[0] || data?.detail || "Login failed ❌";
    toast.error(message);
  } finally {
    setIsLoading(false);
  }
}
