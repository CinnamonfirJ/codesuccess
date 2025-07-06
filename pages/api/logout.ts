// pages/api/logout.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await axios.post("/api/v1/dj-rest-auth/logout/", null, {
      headers: {
        cookie: req.headers.cookie || "",
      },
    });

    // Clear cookie manually if needed
    res.setHeader("Set-Cookie", "sessionid=; Max-Age=0; path=/; HttpOnly");

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json({ message: "Logout failed" });
  }
}
