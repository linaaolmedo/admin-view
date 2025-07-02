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
    <div className="container-content">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-800">Configurations</h1>
      </div>

      <Tabs value={getActiveTab()} onValueChange={handleTabChange} className="w-full">
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
  )
} 