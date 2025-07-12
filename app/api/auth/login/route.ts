// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const data = await res.json();

  const response = NextResponse.json({ success: true });

  // Set cookies (HttpOnly & Secure)
  response.headers.set(
    "Set-Cookie",
    cookie.serialize("access", data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })
  );

  response.headers.append(
    "Set-Cookie",
    cookie.serialize("refresh", data.refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  );

  return response;
}
