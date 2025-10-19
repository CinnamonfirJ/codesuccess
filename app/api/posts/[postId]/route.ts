import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/axios";

// GET method for a single post using Axios
export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await api.get(`/posts/${params.postId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("GET post failed:", error);

    const errorData = error?.response?.data || "Failed to fetch post";
    const status = error?.response?.status || 500;

    return NextResponse.json({ error: errorData }, { status });
  }
}

// DELETE method using Axios
export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await api.delete(`/posts/${params.postId}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    // Axios auto-parses JSON, but a 204 No Content will have no body
    if (res.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    console.error("DELETE post failed:", error);

    const errorData = error?.response?.data || "Failed to delete post";
    const status = error?.response?.status || 500;

    return NextResponse.json({ error: errorData }, { status });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const contentType = req.headers.get("content-type");
  let body: any;

  if (contentType?.includes("application/json")) {
    body = await req.json();
  } else if (contentType?.includes("multipart/form-data")) {
    body = await req.formData();
  } else {
    return NextResponse.json(
      { error: "Unsupported content type" },
      { status: 400 }
    );
  }

  // const postId = req.nextUrl.searchParams.get("id");

  // if (!postId) {
  //   return NextResponse.json({ error: "Missing post ID" }, { status: 400 });
  // }

  try {
    const res = await api.put(`/posts/${params.postId}/`, body, {
      headers: {
        Authorization: `Bearer ${access}`,
        ...(body instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : { "Content-Type": "application/json" }),
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || "Update failed" },
      { status: error?.response?.status || 500 }
    );
  }
}
