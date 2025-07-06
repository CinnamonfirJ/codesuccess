// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await api.post("/api/v1/dj-rest-auth/login/", req.body, {
      withCredentials: true,
    });

    // Forward cookie to client
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      res.setHeader("Set-Cookie", setCookieHeader);
    }

    return res.status(200).json({ detail: "Login successful" });
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Login failed" });
  }
}
