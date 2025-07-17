// lib/auth/refreshToken.ts
import { cookies } from "next/headers";

export async function refreshAccessToken() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh")?.value;

  if (!refresh) return null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) return null;

  const data = await res.json();

  // Manually set cookie in response — won't work in server function here unless returned
  cookieStore.set("access", data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return data.access;
}
