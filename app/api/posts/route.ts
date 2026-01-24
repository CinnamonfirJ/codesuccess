// app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get("cursor");
  
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await api.get("/posts/", {
      params: {
        cursor: cursor || undefined,
      },
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: error?.response?.status || 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  try {
    const res = await api.post("/posts/", formData, {
      headers: {
        Authorization: `Bearer ${access}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data || "Post creation failed" },
      { status: error?.response?.status || 500 }
    );
  }
}
