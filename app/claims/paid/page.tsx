"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PaidClaimsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/claims?tab=paid")
  }, [router])

  return null
}
