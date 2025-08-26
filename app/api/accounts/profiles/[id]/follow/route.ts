// app/api/accounts/profiles/[id]/follow/route.ts
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_2!;

export async function POST(
  req: NextRequest,
  ctx: { params: { id: string } } | { params: Promise<{ id: string }> }
) {
  const { id } = await (ctx as any).params;
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  const body = await req.json().catch(() => ({}));

  const upstream = await fetch(
    `${API_BASE_URL}/api/accounts/profiles/${encodeURIComponent(String(id))}/follow/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(access ? { Authorization: `Bearer ${access}` } : {}),
      },
      body: JSON.stringify(body ?? {}),
      cache: "no-store",
    }
  );

  const text = await upstream.text();
  const data = text ? JSON.parse(text) : null;
  return NextResponse.json(data, { status: upstream.status });
}
