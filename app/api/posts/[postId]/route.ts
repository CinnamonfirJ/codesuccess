import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// GET method for a single post (if you have one, otherwise ignore/remove)
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${params.postId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      credentials: "include",
      cache: "no-store",
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      console.error(
        `Failed to fetch post from backend API. Status: ${res.status}, Message: ${res.statusText}, Details: ${errorDetails}`
      );
      return NextResponse.json(
        {
          error: `Failed to fetch post: ${res.statusText}`,
          details: errorDetails,
        },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error in /api/posts/[postId] GET handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE method for deleting a post
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await fetch(`${API_BASE_URL}/posts/${params.postId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
      credentials: "include",
    });

    if (res.status === 204) {
      return new NextResponse(null, { status: 204 }); // No content
    }

    let data;
    try {
      data = await res.json();
    } catch (jsonError: any) {
      const rawText = await res.text();
      console.error(
        `Failed to parse JSON response from backend for DELETE API. Status: ${res.status}, Raw Text: ${rawText}, Error: ${jsonError.message}`
      );
      return NextResponse.json(
        {
          error: "Backend returned non-JSON response or empty body for error",
          details: rawText,
        },
        { status: res.status }
      );
    }

    if (!res.ok) {
      console.error(
        `Backend DELETE API failed: Status ${res.status}, Data:`,
        data
      );
      return NextResponse.json({ error: data }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error in /api/posts/[postId] DELETE handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
