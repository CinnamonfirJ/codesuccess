// app/api/accounts/profile/[id]/route.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;

  if (!id || id === "null") {
    return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  if (!access && !refresh) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  async function fetchProfile(token: string) {
    return api.get(`${API_BASE_URL}/accounts/profile/${encodeURIComponent(id)}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  try {
    // First attempt with current access token
    const res = await fetchProfile(access!);
    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error?.response?.status;

    // Access expired or unauthorized → try refresh
    if (status === 401 && refresh) {
      try {
        const refreshRes = await api.post("/dj-rest-auth/token/refresh/", {
          refresh,
        });

        const newAccess = refreshRes.data.access;

        // Try fetching profile again
        const res = await fetchProfile(newAccess);

        // Set new access token in cookies
        const response = NextResponse.json(res.data, { status: res.status });
        response.cookies.set("access", newAccess, {
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60, // 1 hour
        });

        return response;
      } catch {
        return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
      }
    }

    // Other error
    return NextResponse.json(
      { error: error?.response?.data || "Failed to fetch profile" },
      { status: status || 500 }
    );
  }
}
