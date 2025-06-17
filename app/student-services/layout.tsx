"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const navigation = [
  { name: "My calendar", href: "/student-services/my-calendar" },
  { name: "All services", href: "/student-services/all-services" },
  { name: "Schedule service", href: "/student-services/schedule-service" },
  { name: "Log service", href: "/student-services/log-service" },
  { name: "Supervisor Logs", href: "/student-services/supervisor-logs" },
]

export default function StudentServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Don't show layout for the main redirect page
  if (pathname === "/student-services") {
    return children
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Student Services</h1>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href="/student-services/log-service">Log service</Link>
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link href="/student-services/schedule-service">Schedule service</Link>
          </Button>
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
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
                    ? "border-blue-500 text-blue-600"
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