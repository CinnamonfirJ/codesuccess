"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import MobileNav from "./mobile-nav";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";

export default function NavbarWrapper({ courses }: { courses: any[] }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const pathname = usePathname();

  // Close sidebars on route change
  useEffect(() => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  }, [pathname]);

  const handleSidebarClose = () => {
    setLeftSidebarOpen(false);
    setRightSidebarOpen(false);
  };

  return (
    <>
      <Navbar
        onLeftSidebarToggle={() => setLeftSidebarOpen(true)}
        onRightSidebarToggle={() => setRightSidebarOpen(true)}
      />

      <MobileNav
        side='left'
        isOpen={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      >
        <LeftSidebar courses={courses} onNavigate={handleSidebarClose} />
      </MobileNav>

      <MobileNav
        side='right'
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      >
        <RightSidebar onNavigate={handleSidebarClose} />
      </MobileNav>
    </>
  );
}
