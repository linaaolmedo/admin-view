"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CarelonPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage organizations page with carelon tab
    router.replace("/manage-organizations?tab=carelon")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
} 