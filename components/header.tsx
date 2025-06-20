"use client"

import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
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
    <header className="bg-[#14B8A6] text-white px-6 py-4 flex items-center justify-between w-full shadow-sm">
      <Link href="/dashboard" className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
        <Image
          src="/educlaim-logo.png"
          alt="EDUclaim - Powered by Kern Integrated Data Systems"
          width={200}
          height={60}
          className="h-12 w-auto"
          priority
        />
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#0F9488]">
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
