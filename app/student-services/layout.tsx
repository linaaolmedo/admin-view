"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info, Calendar, List } from "lucide-react"

type AccountType = "administrator" | "practitioner" | "supervisor"

const baseNavigation = [
  { name: "My calendar", href: "/student-services/my-calendar", value: "my-calendar" },
  { name: "All services", href: "/student-services/all-services", value: "all-services" },
]

const supervisorOnlyNavigation = [
  { name: "Supervisor Logs", href: "/student-services/supervisor-logs", value: "supervisor-logs" },
]

export default function StudentServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType | null>(null)

  // Get account type from localStorage on component mount
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    setAccountType(storedAccountType || "practitioner") // Default to practitioner if not set
  }, [])

  // Don't show layout for the main redirect page
  if (pathname === "/student-services") {
    return children
  }

  // Build navigation based on account type
  const getNavigation = () => {
    let navigation = [...baseNavigation]
    
    // Only add supervisor-only items for supervisors
    if (accountType === "supervisor") {
      navigation = [...navigation, ...supervisorOnlyNavigation]
    }
    
    return navigation
  }

  const navigation = getNavigation()

  const getActiveTab = () => {
    const activeNav = navigation.find(nav => pathname === nav.href)
    return activeNav?.value || "my-calendar"
  }

  const handleTabChange = (value: string) => {
    const selectedNav = navigation.find(nav => nav.value === value)
    if (selectedNav) {
      router.push(selectedNav.href)
    }
  }

  return (
    <TooltipProvider>
    <div className="container-content">
      <Tabs defaultValue="all-services" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-teal-800">Student Services</h1>
        </div>

        <div className="overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            {navigation.map((item) => (
              <TabsTrigger 
                key={item.value}
                value={item.value}
                className="whitespace-nowrap"
              >
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="mt-6 overflow-x-hidden">
          {children}
        </div>
      </Tabs>
    </div>
    </TooltipProvider>
  )
} 