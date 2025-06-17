"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SupervisorsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage users page with supervisors tab
    router.replace("/manage-users?tab=supervisors")
  }, [router])

  return null
}
