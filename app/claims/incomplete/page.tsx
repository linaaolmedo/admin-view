"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function IncompleteClaimsPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/claims?tab=incomplete")
  }, [router])

  return null
}
