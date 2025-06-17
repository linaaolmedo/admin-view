"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CaseloadGroupsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to main caseload page with groups tab
    router.replace("/caseload?tab=groups")
  }, [router])

  return null
}
