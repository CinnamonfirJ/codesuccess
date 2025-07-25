// app/api/auth/update-user/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function PATCH(req: NextRequest) {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Authorization: `Bearer ${access}`,
    },
    body: formData, // Send the formData directly
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({ message: "Profile updated", data });
}
