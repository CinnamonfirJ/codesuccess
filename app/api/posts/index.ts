// pages/api/posts/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieHeader = req.headers.cookie || "";

  if (req.method === "GET") {
    try {
      const response = await api.get("/api/v1/posts/", {
        headers: {
          Cookie: cookieHeader,
        },
        withCredentials: true,
      });
      return res.status(200).json(response.data);
    } catch (error: any) {
      console.error(
        "GET /api/posts failed:",
        error?.response?.data || error.message
      );
      return res.status(500).json({
        message: "Failed to get posts",
        error: error?.response?.data || error.message,
      });
    }
  }

  if (req.method === "POST") {
    try {
      console.log("Received POST body:", req.body);

      const response = await api.post("/api/v1/posts/", req.body, {
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      return res.status(201).json(response.data);
    } catch (error: any) {
      console.error(
        "POST /api/posts failed:",
        error?.response?.data || error.message
      );
      return res.status(500).json({
        message: "Failed to create post",
        error: error?.response?.data || error.message,
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
