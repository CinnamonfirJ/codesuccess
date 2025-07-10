// pages/api/posts/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import api from "@/lib/axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case "GET": {
        const response = await api.get(`/api/v1/posts/${id}/`, {
          headers: req.headers,
          withCredentials: true,
        });
        return res.status(200).json(response.data);
      }

      case "PUT": {
        const response = await api.put(`/api/v1/posts/${id}/`, req.body, {
          headers: req.headers,
          withCredentials: true,
        });
        return res.status(200).json(response.data);
      }

      //   case "DELETE": {
      //     const response = await api.delete(`/api/v1/posts/${id}/`, {
      //       headers: req.headers,
      //       withCredentials: true,
      //     });
      //     return res.status(204).end();
      //   }

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error: any) {
    return res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Post operation failed" });
  }
}
