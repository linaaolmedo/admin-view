"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal } from "lucide-react"

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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Services</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
            asChild
          >
            <Link href="/student-services/log-service">Log service</Link>
          </Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700"
            asChild
          >
            <Link href="/student-services/schedule-service">Schedule service</Link>
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className={`grid w-auto ${navigation.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {navigation.map((item) => (
            <TabsTrigger 
              key={item.value}
              value={item.value} 
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-6">
          {children}
        </div>
      </Tabs>
    </div>
  )
} 