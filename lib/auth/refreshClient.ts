// lib/auth/refreshClient.ts

import axios from "axios";
import { setAccessToken } from "./tokenStore";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function refreshAccessToken(): Promise<string | null> {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/dj-rest-auth/token/refresh/`,
      {},
      {
        withCredentials: true, // So the refresh cookie is sent
      }
    );

    const newToken = res.data.access;
    if (newToken) {
      setAccessToken(newToken);
      return newToken;
    }

    return null;
  } catch (err) {
    console.error("Failed to refresh token", err);
    return null;
  }
}
