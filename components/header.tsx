"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type AccountType = "administrator" | "practitioner" | "supervisor"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [accountType, setAccountType] = useState<AccountType | null>(null)

  // Get account type from localStorage on component mount
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    setAccountType(storedAccountType || "practitioner")
  }, [])

  // Don't show header on login page
  if (pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("accountType")
    router.push("/login")
  }

  const userEmail =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") || "Cassandra Beck" : "Cassandra Beck"

  const getAccountTypeIcon = (type: AccountType) => {
    switch (type) {
      case "administrator":
        return <Shield className="w-4 h-4" />
      case "supervisor":
        return <Users className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getAccountTypeBadge = (type: AccountType) => {
    const variants = {
      administrator: "bg-red-100 text-red-700 border-red-200",
      practitioner: "bg-cyan-100 text-cyan-700 border-cyan-200",
      supervisor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    }
    return variants[type]
  }

  const getAccountTypeLabel = (type: AccountType) => {
    switch (type) {
      case "administrator":
        return "Administrator"
      case "supervisor":
        return "Supervisor"
      case "practitioner":
        return "Practitioner"
      default:
        return "User"
    }
  }

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-4 flex items-center justify-between w-full shadow-sm">
      <Link href="/dashboard" className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
        <Image
          src="/EDUClaim_Horz_White.png"
          alt="EDUclaim - Powered by Kern Integrated Data Systems"
          width={400}
          height={100}
          className="h-16 w-auto"
          priority
        />
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 text-white hover:bg-white/20 h-auto py-2 px-3">
            <div className="flex items-center space-x-2">
              {accountType && getAccountTypeIcon(accountType)}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{userEmail}</span>
                {accountType && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs mt-1 ${getAccountTypeBadge(accountType)} bg-white/90 border`}
                  >
                    {getAccountTypeLabel(accountType)}
                  </Badge>
                )}
              </div>
            </div>
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
