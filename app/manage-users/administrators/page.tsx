"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdministratorsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage users page with administrators tab
    router.replace("/manage-users?tab=administrators")
  }, [router])

  return null
}
