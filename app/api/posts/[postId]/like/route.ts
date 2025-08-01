import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(
  req: NextRequest,
  context: { params: { postId: string } }
) {
  const { postId } = context.params;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(`${API_BASE_URL}/posts/${postId}/like/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`Failed to like post ${postId}`, {
      status: res.status,
      response: errorText,
    });
    return NextResponse.json({ error: errorText }, { status: res.status });
  }

  let data = {};
  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    try {
      data = await res.json();
    } catch {
      console.warn("Empty or invalid JSON in like response");
    }
  }

  return NextResponse.json({ success: true, ...data }, { status: 201 });
}
