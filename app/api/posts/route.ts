// app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const res = await fetch(`${API_BASE_URL}/posts/`, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const res = await fetch(`${API_BASE_URL}/posts/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json(data, { status: 201 });
}
