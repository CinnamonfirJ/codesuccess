"use client";

import { useState } from "react";
import Navbar from "./navbar";
import MobileNav from "./mobile-nav";
import LeftSidebar from "./left-sidebar";
import RightSidebar from "./right-sidebar";

export default function NavbarWrapper({ courses }: { courses: any[] }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

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
        <LeftSidebar courses={courses} />
      </MobileNav>

      <MobileNav
        side='right'
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      >
        <RightSidebar />
      </MobileNav>
    </>
  );
}
