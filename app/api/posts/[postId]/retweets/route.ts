// app/api/posts/[postId]/retweets/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/retweets/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      credentials: "include",
      cache: "no-store", // Ensure fresh data
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(
        `Failed to fetch retweets from backend API. Status: ${res.status}, Message: ${res.statusText}, Details: ${errorDetails}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch retweets: ${res.statusText}`,
          details: errorDetails,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/posts/[postId]/retweets GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: { postId: string } }
) {
  const { postId } = context.params;
  const body = await request.json(); // Expecting JSON body for retweet/quote retweet

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  // The API expects `parent_post` and `is_retweet`.
  // If it's a quote retweet, `body` will also be present.
  const payload = {
    parent_post: parseInt(postId), // Ensure parent_post is a number
    body: body.body || "", // Optional, for quote retweets
    is_retweet: body.is_retweet, // Should be true for a retweet
  };

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${postId}/retweets/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(
        `Backend POST API for retweet failed: Status ${res.status}, Data:`,
        data
      );
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: 201 }); // 201 Created
  } catch (error: any) {
    console.error("Error in /api/posts/[postId]/retweets POST handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
