// lib/register.tsx
"use client";

import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type RegisterFormData = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export async function registerUser(
  form: RegisterFormData,
  //   setMessage: (msg: string | null) => void,
  setIsLoading: (loading: boolean) => void
) {
  setIsLoading(true);
  //   setMessage(null); // optional if using toast only

  try {
    const res = await axios.post("/api/register", form);
    toast.success("Registration successful! ✅");
    // setMessage("Registration successful! ✅");
    console.log(res.data);
  } catch (err: unknown) {
    const error = err as AxiosError;

    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data as Record<string, any>;
      const errorMsg =
        data.non_field_errors?.[0] ||
        data.username?.[0] ||
        data.password1?.[0] ||
        data.password2?.[0] ||
        data.email?.[0] ||
        "Registration failed";
      toast.error(errorMsg);
      //   setMessage(errorMsg);
    } else {
      toast.error("An unexpected error occurred.");
      //   setMessage("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
}
