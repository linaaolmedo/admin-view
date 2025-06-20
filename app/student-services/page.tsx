"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function StudentServicesPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to my-calendar as the default page
    router.replace("/student-services/my-calendar")
  }, [router])

  return (
    <div className="p-6">
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  )
}
