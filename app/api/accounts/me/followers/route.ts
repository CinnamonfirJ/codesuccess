// app/api/accounts/me/followers/route.ts

import { NextResponse } from "next/server";
import api from "@/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function GET() {
  try {
    const res = await api.get(`${API_BASE_URL}/accounts/me/followers/`);

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.error ||
      error?.response?.data ||
      "Failed to fetch following list";

    return NextResponse.json({ error: message }, { status });
  }
}
