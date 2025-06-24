"use client"

import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navigation = [
  { name: "Qualifications", href: "/configurations/qualifications", value: "qualifications" },
  { name: "Billing Codes", href: "/configurations/billing-codes", value: "billing-codes" },
  { name: "Permission Types", href: "/configurations/permission-types", value: "permission-types" },
]

export default function ConfigurationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show layout for the main redirect page
  if (pathname === "/configurations") {
    return children
  }

  const getActiveTab = () => {
    const activeNav = navigation.find(nav => pathname === nav.href)
    return activeNav?.value || "billing-codes"
  }

  const handleTabChange = (value: string) => {
    const selectedNav = navigation.find(nav => nav.value === value)
    if (selectedNav) {
      router.push(selectedNav.href)
    }
  }

  const getAddButtonText = () => {
    if (pathname === "/configurations/billing-codes") return "Add"
    if (pathname === "/configurations/qualifications") return "Add"
    if (pathname === "/configurations/permission-types") return "Add"
    return "Add"
  }

  const handleAddClick = () => {
    // Dispatch custom event to open the add modal based on current page
    if (pathname === "/configurations/qualifications") {
      window.dispatchEvent(new CustomEvent('openAddQualificationModal'))
    } else if (pathname === "/configurations/billing-codes") {
      window.dispatchEvent(new CustomEvent('openAddBillingCodeModal'))
    } else if (pathname === "/configurations/permission-types") {
      window.dispatchEvent(new CustomEvent('openAddPermissionTypeModal'))
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Configurations</h1>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 w-auto">
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