"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

const navigation = [
  { name: "Qualifications", href: "/configurations/qualifications" },
  { name: "Billing Codes", href: "/configurations/billing-codes" },
  { name: "Permission Types", href: "/configurations/permission-types" },
]

export default function ConfigurationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show layout for the main redirect page
  if (pathname === "/configurations") {
    return children
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
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-teal-600 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {children}
    </div>
  )
} 