"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function NotPaidClaimsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/claims?tab=not-paid")
  }, [router])

  return null
}
