"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdministratorPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main dashboard - no separate team management page needed
    router.replace("/dashboard")
  }, [router])

  return (
    <div className="p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  )
} 