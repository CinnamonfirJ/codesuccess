import api from "@/lib/axios";
import { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    const response = await api.post(
      "/api/v1/dj-rest-auth/registration/",
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return res.status(200).json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      return res
        .status(axiosError.response.status)
        .json(axiosError.response.data);
    }

    return res.status(500).json({ message: "Unknown error occurred" });
  }
}
