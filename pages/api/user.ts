// pages/api/user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await api.get("/api/v1/dj-rest-auth/user/", {
      headers: {
        Cookie: req.headers.cookie || "",
      },
      withCredentials: true,
    });

    return res.status(200).json(response.data);
  } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      message: "Failed to fetch user",
      detail: error.response?.data || {},
    });
  }
}
