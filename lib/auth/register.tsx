"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type RegisterFormData = {
  email: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
};

export async function registerUser(
  form: RegisterFormData,
  setIsLoading: (loading: boolean) => void,
  onSuccess?: () => void
) {
  setIsLoading(true);

  try {
    const res = await axios.post("/api/register", form);
    const token = res.data.key;

    if (token) {
      localStorage.setItem("authToken", token);
      toast.success("Registration successful! ✅");
      onSuccess?.();
    } else {
      toast.error("Registration failed: no token received.");
    }
    // toast.success("Registration successful! ✅");
    // console.log(res.data);
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data as Record<string, any>;
      const errorMsg =
        data.non_field_errors?.[0] ||
        data.email?.[0] ||
        data.first_name?.[0] ||
        data.last_name?.[0] ||
        data.password1?.[0] ||
        data.password2?.[0] ||
        "Registration failed";
      toast.error(errorMsg);
    } else {
      toast.error("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
}
