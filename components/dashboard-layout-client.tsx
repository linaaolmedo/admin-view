"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // Check localStorage on initial render to prevent flash
    if (typeof window !== 'undefined') {
      return localStorage.getItem("sidebarCollapsed") === "true"
    }
    return false
  })

  useEffect(() => {
    const handleStorageChange = () => {
      const collapsed = localStorage.getItem("sidebarCollapsed") === "true"
      setSidebarCollapsed(collapsed)
    }

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange)
    
    // Check initial state
    handleStorageChange()

    // Custom event listener for sidebar toggle
    const handleSidebarToggle = (e: CustomEvent) => {
      setSidebarCollapsed(e.detail.collapsed)
    }

    window.addEventListener("sidebarToggle", handleSidebarToggle as EventListener)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("sidebarToggle", handleSidebarToggle as EventListener)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#ffffff] overflow-x-hidden">
      <Header />
      <Sidebar />
      <main className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-20 pl-6 pr-6 py-6 overflow-x-hidden transition-all duration-300`}>
        <div className="w-full">
          {children}
        </div>
      </main>
    </div>
  )
} 