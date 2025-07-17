import type React from "react";
import SanityLiveWrapper from "../components/SanityLiveWrapper";
import SidebarManager from "../components/SidebarManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function getUser() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;

  if (!access) redirect("/login");

  const res = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  });

  if (!res.ok) {
    // Try to refresh token
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/refresh-token`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!refreshRes.ok) redirect("/login");

    const updatedCookieStore = await cookies();
    const newAccess = updatedCookieStore.get("access")?.value;

    const retry = await fetch(`${API_BASE_URL}/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Bearer ${newAccess}`,
      },
    });

    if (!retry.ok) redirect("/login");
    return await retry.json();
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  console.log("User data:", user);

  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarManager />
      <main className='flex-1 mt-16 w-full'>{children}</main>
      <SanityLiveWrapper />
    </div>
  );
}
