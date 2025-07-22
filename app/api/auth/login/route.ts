// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorData = await res.json();

    // Extract the actual error message
    let errorMessage = "An unknown error occurred.";
    if (
      errorData &&
      errorData.non_field_errors &&
      errorData.non_field_errors.length > 0
    ) {
      errorMessage = errorData.non_field_errors[0];
    } else if (errorData && typeof errorData.detail === "string") {
      errorMessage = errorData.detail;
    } else if (errorData) {
      errorMessage = JSON.stringify(errorData);
    }

    return NextResponse.json({ error: errorMessage }, { status: res.status });
  }

  const data = await res.json();
  const response = NextResponse.json({ data: data, success: true });

  response.cookies.set({
    name: "access",
    value: data.access,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set({
    name: "refresh",
    value: data.refresh,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
