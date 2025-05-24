"use client"

import type React from "react"

import { X } from "lucide-react"

interface MobileNavProps {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  side: "left" | "right"
}

export default function MobileNav({ children, isOpen, onClose, side }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 w-4/5 max-w-sm bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          side === "left" ? "left-0" : "right-0"
        } ${isOpen ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full"}`}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100">
          <X className="h-6 w-6" />
        </button>

        <div className="pt-14">{children}</div>
      </div>
    </div>
  )
}
