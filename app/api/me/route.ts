// app/api/me/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const data = await res.json();
  return NextResponse.json(data);
}
