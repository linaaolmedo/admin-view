"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PayerTypeInfoPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage organizations page with payer-type-info tab
    router.replace("/manage-organizations?tab=payer-type-info")
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