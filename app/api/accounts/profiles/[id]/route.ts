// api/accounts/profiles/[id]/route.ts
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_2!;

export async function GET(
  _req: NextRequest,
  ctx: { params: { id: string } | Promise<{ id: string }> }
) {
  const p = await ctx.params;
  const id = p.id;

  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const upstream = await fetch(`${API_BASE_URL}/accounts/profiles/${id}/`, {
    method: "GET",
    headers: {
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const text = await upstream.text();
  const data = text ? JSON.parse(text) : null;
  return NextResponse.json(data, { status: upstream.status });
}
