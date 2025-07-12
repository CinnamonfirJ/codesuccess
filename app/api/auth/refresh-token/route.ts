// app/api/auth/refresh-token/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import cookie from "cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get("refresh")?.value;

  if (!refresh) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 403 }
    );
  }

  const data = await res.json();
  const response = NextResponse.json({ success: true });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize("access", data.access, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    })
  );

  return response;
}
