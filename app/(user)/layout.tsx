import type React from "react";
import SanityLiveWrapper from "../components/SanityLiveWrapper";
import SidebarManager from "../components/SidebarManager";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <SidebarManager />
      <main className='flex-1 mt-16 w-full'>{children}</main>
      <SanityLiveWrapper />
    </div>
  );
}
