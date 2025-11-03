import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  request: NextRequest,
  context: { params: { postId: string } }
) {
  const { postId } = await await context.params;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  context: { params: { postId: string } }
) {
  const { postId } = await context.params;
  const body = await request.json();

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify({
      post: parseInt(postId),
      content: body.content,
      parent: body.parent || null,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json(data, { status: 201 });
}
