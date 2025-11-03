// app/layout.tsx
import type { ReactNode } from "react";
import SanityLiveWrapper from "../components/SanityLiveWrapper";
import SidebarManager from "../components/SidebarManager";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "@/lib/axios"; // Import your existing API instance

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

async function getUser() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;

  if (!access) redirect("/login");

  try {
    const res = await api.get("/dj-rest-auth/user/", {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return res.data;
  } catch {
    // Attempt refresh
    const refreshRes = await fetch(`${SITE_URL}/api/auth/refresh-token`, {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `refresh=${refresh ?? ""}`,
      },
    });

    if (!refreshRes.ok) redirect("/login");

    const cookieStore = await cookies();
    const newAccess = cookieStore.get("access")?.value;
    if (!newAccess) redirect("/login");

    try {
      const retryRes = await api.get("/dj-rest-auth/user/", {
        headers: {
          Authorization: `Bearer ${newAccess}`,
        },
      });

      return retryRes.data;
    } catch {
      redirect("/login");
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUser();
  console.log(user?.first_name);

  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarManager />
      <main className='flex-1 mt-8 w-full'>{children}</main>
      <SanityLiveWrapper />
    </div>
  );
}
