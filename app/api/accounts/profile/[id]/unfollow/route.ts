// app/api/accounts/profile/[id]/unfollow/route.ts
import { NextResponse, type NextRequest } from "next/server";
import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;

    if (!id || id === "null") {
        return NextResponse.json({ error: "Invalid profile ID" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));

    // api will handle access token + refresh automatically
    const res = await api.post(
      `${API_BASE_URL}/accounts/profile/${encodeURIComponent(String(id))}/unfollow/`,
      body
    );

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.error ||
      error?.response?.data ||
      "Failed to unfollow profile";

    return NextResponse.json({ error: message }, { status });
  }
}
