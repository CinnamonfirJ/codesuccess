// app/api/posts/[postId]/retweets/[retweetId]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * GET handler for fetching a specific retweet by its ID for a given post.
 * @param request The NextRequest object.
 * @param context Context containing dynamic route parameters (postId, retweetId).
 * @returns A NextResponse with the retweet data or an error.
 */
export async function GET(
  request: NextRequest,
  context: { params: { postId: string; retweetId: string } }
) {
  const { postId, retweetId } = context.params;
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 }
    );
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/posts/${postId}/retweets/${retweetId}/`,
      {
        headers: {
          Authorization: `Bearer ${access}`,
        },
        credentials: "include",
        cache: "no-store", // Ensure fresh data
      }
    );

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(
        `Failed to fetch retweet from backend API. Status: ${res.status}, Message: ${res.statusText}, Details: ${errorDetails}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch retweet: ${res.statusText}`,
          details: errorDetails,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error(
      "Error in /api/posts/[postId]/retweets/[retweetId] GET handler:",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
