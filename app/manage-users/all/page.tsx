"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AllUsersPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main manage users page with all tab
    router.replace("/manage-users?tab=all")
  }, [router])

  return null
}
