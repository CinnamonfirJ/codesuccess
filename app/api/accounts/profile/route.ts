// app/api/accounts/profile/route.ts
import { NextResponse, type NextRequest } from "next/server";
import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");
    const first_name = searchParams.get("first_name");
    const last_name = searchParams.get("last_name");

    const res = await api.get(`${API_BASE_URL}/accounts/profile/`, {
      params: {
        username: username || undefined,
        first_name: first_name || undefined,
        last_name: last_name || undefined,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.error || error?.response?.data || "Failed to fetch profiles";
    return NextResponse.json({ error: message }, { status });
  }
}
