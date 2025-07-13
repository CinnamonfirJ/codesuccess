// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize("access", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    })
  );

  response.headers.append(
    "Set-Cookie",
    cookie.serialize("refresh", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    })
  );

  return response;
}
