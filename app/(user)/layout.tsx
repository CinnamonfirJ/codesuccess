// app/layout.tsx (or app/dashboard/layout.tsx if it's only for protected routes)
import type { ReactNode } from "react";
import SanityLiveWrapper from "../components/SanityLiveWrapper";
import SidebarManager from "../components/SidebarManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

async function getUser() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) redirect("/login");

  const userRes = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
    cache: "no-store",
  });

  if (userRes.ok) {
    return await userRes.json();
  }

  // Try to refresh token
  const refreshRes = await fetch(`${SITE_URL}/api/auth/refresh-token`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `refresh=${cookieStore.get("refresh")?.value ?? ""}`,
    },
  });

  if (!refreshRes.ok) redirect("/login");

  const newAccess = cookieStore.get("access")?.value;

  const retry = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    headers: {
      Authorization: `Bearer ${newAccess}`,
    },
    cache: "no-store",
  });

  if (!retry.ok) redirect("/login");

  return await retry.json();
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();
  console.log(user);

  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarManager />
      <main className='flex-1 mt-16 w-full'>{children}</main>
      <SanityLiveWrapper />
    </div>
  );
}
