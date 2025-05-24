"use client";

import { useState } from "react";
// import { Menu, User } from "lucide-react";
import { Inter } from "next/font/google";
import MobileNav from "./components/mobile-nav";
import LeftSidebar from "./components/left-sidebar";
import RightSidebar from "./components/right-sidebar";
import Feed from "./components/feed";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <main className={`min-h-screen bg-background ${inter.className}`}>
      {/* Navigation Bar */}
      <Navbar
        onLeftSidebarToggle={() => setLeftSidebarOpen(true)}
        onRightSidebarToggle={() => setRightSidebarOpen(true)}
      />

      {/* Mobile Navigation
      <div className='md:hidden top-0 right-0 left-0 z-50 fixed bg-white shadow-sm'>
        <div className='flex justify-between items-center p-4'>
          <button
            onClick={() => setLeftSidebarOpen(true)}
            className='hover:bg-gray-100 p-2 rounded-md'
          >
            <User className='w-6 h-6' />
          </button>
          <h1 className='font-bold text-navy text-xl'>CodeSuccess</h1>
          <button
            onClick={() => setRightSidebarOpen(true)}
            className='hover:bg-gray-100 p-2 rounded-md'
          >
            <Menu className='w-6 h-6' />
          </button>
        </div>
      </div> */}

      {/* Mobile Sidebars */}
      <MobileNav
        side='left'
        isOpen={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      >
        <LeftSidebar />
      </MobileNav>

      <MobileNav
        side='right'
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      >
        <RightSidebar />
      </MobileNav>

      {/* Desktop Layout */}
      <div className='flex md:flex-row flex-col pt-16'>
        {/* Left Sidebar - Hidden on mobile */}
        <div className='hidden md:block top-0 sticky border-gray-200 border-r md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className='pt-16 md:pt-0 w-full md:w-2/4 lg:w-3/5 min-h-screen'>
          <Feed />
        </div>

        {/* Right Sidebar - Hidden on mobile */}
        <div className='hidden md:block top-0 sticky border-gray-200 border-l md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
          <RightSidebar />
        </div>
      </div>
    </main>
  );
}
