// app/api/me/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import api from "@/lib/axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  if (!access && !refresh) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  async function fetchUser(token: string) {
    return api.get("/dj-rest-auth/user/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  try {
    // First attempt with current access token
    const res = await fetchUser(access!);
    return NextResponse.json(res.data);
  } catch (error: any) {
    const status = error?.response?.status;

    // Access expired or unauthorized
    if (status === 401 && refresh) {
      try {
        const refreshRes = await api.post("/dj-rest-auth/token/refresh/", {
          refresh,
        });

        const newAccess = refreshRes.data.access;
        const newRefresh = refreshRes.data.refresh;

        // Try fetching user again
        const res = await fetchUser(newAccess);

        // Set new access token in cookies
        const response = NextResponse.json(res.data);
        response.cookies.set("access", newAccess, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60, // 1 hour
        });

        if (newRefresh) {
        response.cookies.set("refresh", newRefresh, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // e.g., 7 days
        });
      }

        return response;
      } catch {
        return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
      }
    }

    // Other error
    return NextResponse.json(
      {
        error: error?.response?.data || "Unauthorized",
      },
      {
        status: status || 500,
      }
    );
  }
}
