"use client"

import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, LogOut, Shield, Users, ChevronDown, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

type AccountType = "administrator" | "practitioner" | "supervisor"
type OrganizationType = "fee-schedule" | "lea-bop"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [accountType, setAccountType] = useState<AccountType | null>(null)
  const [selectedOrganization, setSelectedOrganization] = useState<OrganizationType>("fee-schedule")

  // Get account type and organization from localStorage on component mount
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    const storedOrganization = localStorage.getItem("selectedOrganization") as OrganizationType
    setAccountType(storedAccountType || "practitioner")
    setSelectedOrganization(storedOrganization || "fee-schedule")
  }, [])

  // Don't show header on login page
  if (pathname === "/login") {
    return null
  }

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("accountType")
    localStorage.removeItem("selectedOrganization")
    router.push("/login")
  }

  const handleOrganizationChange = (organization: OrganizationType) => {
    setSelectedOrganization(organization)
    localStorage.setItem("selectedOrganization", organization)
    // Trigger a page refresh to update organization-specific data
    window.location.reload()
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

  const getOrganizationLabel = (organization: OrganizationType) => {
    switch (organization) {
      case "fee-schedule":
        return "Fee Schedule"
      case "lea-bop":
        return "LEA-BOP"
      default:
        return "Fee Schedule"
    }
  }

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-teal-600 text-white px-6 py-2 flex items-center justify-between w-full shadow-sm fixed top-0 left-0 right-0 z-50">
      <Link href="/dashboard" className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
        <Image
          src="/EDUClaim_Horz_White.png"
          alt="EDUclaim - Powered by Kern Integrated Data Systems"
          width={400}
          height={100}
          className="h-12 w-auto"
          priority
        />
      </Link>
      
      <div className="flex items-center gap-4">
        {/* Organization Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/20 h-auto py-2 px-3">
              <Building className="w-4 h-4" />
              <span className="text-sm font-medium">{getOrganizationLabel(selectedOrganization)}</span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={() => handleOrganizationChange("fee-schedule")}
              className={selectedOrganization === "fee-schedule" ? "bg-gray-100" : ""}
            >
              <Building className="w-4 h-4 mr-2" />
              Fee Schedule
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleOrganizationChange("lea-bop")}
              className={selectedOrganization === "lea-bop" ? "bg-gray-100" : ""}
            >
              <Building className="w-4 h-4 mr-2" />
              LEA-BOP
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex flex-col items-center gap-1 text-white hover:bg-white/20 h-auto py-2 px-3">
              <div className="flex items-center gap-2">
                {accountType && getAccountTypeIcon(accountType)}
                <span className="text-sm font-medium">{userEmail}</span>
              </div>
              {accountType && (
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getAccountTypeBadge(accountType)} bg-white/90 border`}
                >
                  {getAccountTypeLabel(accountType)}
                </Badge>
              )}
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
      </div>
    </header>
  )
}
