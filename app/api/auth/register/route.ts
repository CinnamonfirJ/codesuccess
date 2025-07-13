// /api/auth/register.ts
import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const payload = {
    email: body.email,
    password1: body.password1,
    password2: body.password2,
    first_name: body.first_name,
    last_name: body.last_name,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/dj-rest-auth/registration/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json({ error: errorData }, { status: res.status });
    }

    const data = await res.json();

    const response = NextResponse.json({ user: data.user }, { status: 201 });

    // Set access token
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

    // Set refresh token
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
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
