import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  let access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  // If no access token at all
  if (!access) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Try user fetch
  let res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  // If token is expired or invalid
  if (!res.ok && refresh) {
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
      return NextResponse.json({ error: "Refresh failed" }, { status: 403 });
    }

    const data = await refreshRes.json();
    console.log("Trying refresh token...");
    console.log("New access token:", data.access);

    // 🧁 Set new access token as httpOnly cookie
    cookieStore.set("access", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    access = data.access;

    // Retry user fetch with new access
    res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Still unauthorized" },
        { status: 403 }
      );
    }
  }

  // If no refresh token or user still can't be fetched
  if (!res.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await res.json();
  return NextResponse.json(user);
}
