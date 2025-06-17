"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ReadyToSubmitClaimsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/claims?tab=ready-to-submit")
  }, [router])

  return null
}
