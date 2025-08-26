// app/api/posts/[postId]/retweets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/axios"; // your axios instance

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  request: NextRequest,
  context: { params: { postId: string } }
) {
  const { postId } = context.params;
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const res = await api.get(`/posts/${postId}/retweets/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Error in /api/posts/[postId]/retweets GET handler:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch retweets",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const { postId } = params;
  const body = await request.json();

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  const payload = {
    parent_post: parseInt(postId),
    body: body.body || "",
    is_retweet: body.is_retweet,
    quote_text: body.quote_text,
  };

  try {
    const res = await api.post(`/posts/${postId}/retweet/`, payload, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch (error: any) {
    console.error("Error in /api/posts/[postId]/retweets POST handler:", error);

    return NextResponse.json(
      {
        error: "Failed to create retweet",
        details: error.response?.data || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}
