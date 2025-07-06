import type React from "react";
import SanityLiveWrapper from "../components/SanityLiveWrapper";
import SidebarManager from "../components/SidebarManager";
import axios from "@/lib/axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  try {
    await axios.get("/api/v1/dj-rest-auth/user/", {
      headers: {
        Cookie: cookieHeader,
      },
    });
  } catch {
    redirect("/login");
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarManager />
      <main className='flex-1 mt-16 w-full'>{children}</main>
      <SanityLiveWrapper />
    </div>
  );
}
