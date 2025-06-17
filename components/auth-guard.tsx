"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is authenticated
    const authStatus = localStorage.getItem("isAuthenticated")
    const isAuth = authStatus === "true"

    setIsAuthenticated(isAuth)

    // If not authenticated and not on login page, redirect to login
    if (!isAuth && pathname !== "/login") {
      router.push("/login")
    }
  }, [router, pathname])

  // Show loading while checking auth status
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-[#787878]">Loading...</div>
      </div>
    )
  }

  // If not authenticated, don't render children
  if (!isAuthenticated && pathname !== "/login") {
    return null
  }

  return <>{children}</>
}
