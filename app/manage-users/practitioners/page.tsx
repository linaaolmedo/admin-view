"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PractitionersPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage users page with practitioners tab
    router.replace("/manage-users?tab=practitioners")
  }, [router])

  return null
}
