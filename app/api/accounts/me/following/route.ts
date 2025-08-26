// app/api/accounts/me/following/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = "https://codesuccex.onrender.com";

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const upstream = await fetch(`${API_BASE_URL}/api/accounts/me/following/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  const data = text ? JSON.parse(text) : null;
  return NextResponse.json(data, { status: upstream.status });
}
