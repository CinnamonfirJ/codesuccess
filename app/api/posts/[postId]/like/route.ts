// app/api/posts/[postId]/like/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE_URL}/posts/${params.postId}/like/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Failed to like post ${params.postId}`, {
      status: res.status,
      response: errorText,
    });
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}
