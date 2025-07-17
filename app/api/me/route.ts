// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  // No tokens at all = unauthenticated
  if (!access && !refresh) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Function to fetch user
  async function fetchUser(token: string) {
    return fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  let res = access ? await fetchUser(access) : undefined;

  // If access token expired, try refresh
  if (!res || res.status === 401) {
    if (!refresh) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const refreshRes = await fetch(
      `${API_BASE_URL}/dj-rest-auth/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh }),
      }
    );

    if (!refreshRes.ok) {
      return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
    }

    const refreshData = await refreshRes.json();
    const newAccess = refreshData.access;

    // Try fetching user again with new token
    res = await fetchUser(newAccess);

    if (!res.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await res.json();

    const response = NextResponse.json(userData);
    response.cookies.set("access", newAccess, {
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "lax",
    });

    return response;
  }

  // Access token worked
  const data = await res.json();
  return NextResponse.json(data);
}
