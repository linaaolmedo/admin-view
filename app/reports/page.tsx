"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ReportsPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to report builder as the default reports page
    router.replace("/reports/report-builder")
  }, [router])

  return null
}
