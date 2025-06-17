"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show header on login page
  if (pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") || "Cassandra Beck" : "Cassandra Beck"

  return (
    <header className="bg-[#131837] text-white px-6 py-4 flex items-center justify-between w-full">
      <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
        <span className="text-xl font-bold">KIDS</span>
        <span className="text-[#4286f4]">✗</span>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#2f3a83]">
            <User className="w-5 h-5" />
            <span>{userEmail}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
            <LogOut className="w-4 h-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
