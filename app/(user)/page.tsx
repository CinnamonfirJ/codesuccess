// import { Menu, User } from "lucide-react";
import { Inter } from "next/font/google";

import LeftSidebar from "../components/left-sidebar";
import RightSidebar from "../components/right-sidebar";
import Feed from "../components/feed";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`container mx-auto bg-background ${inter.className}`}>
      {/* Desktop Layout */}
      <div className='flex md:flex-row flex-col'>
        {/* Left Sidebar - Hidden on mobile */}
        <div className='hidden md:block top-0 sticky border-gray-200 border-r md:w-1/4 lg:w-1/5 h-screen overflow-y-auto'>
          <LeftSidebar />
        </div>

        {/* Main Content */}
        <div className='pt-10 md:pt-0 w-full md:w-2/4 lg:w-3/5 min-h-screen'>
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
