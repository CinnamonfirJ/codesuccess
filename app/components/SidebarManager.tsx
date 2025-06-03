"use client";

import { useState } from "react";
import Navbar from "./navbar";
import MobileNav from "./mobile-nav";
import LeftSidebarWrapper from "./LeftSidebarWrapper";
import RightSidebar from "./right-sidebar";

export default function SidebarManager() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div>
      <Navbar
        onLeftSidebarToggle={() => setLeftSidebarOpen(true)}
        onRightSidebarToggle={() => setRightSidebarOpen(true)}
      />
      {/* <MobileNav
        side="left"
        isOpen={leftSidebarOpen}
        onClose={() => setLeftSidebarOpen(false)}
      >
        <LeftSidebarWrapper />
      </MobileNav> */}

      <MobileNav
        side='right'
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
      >
        <RightSidebar />
      </MobileNav>
    </div>
  );
}
