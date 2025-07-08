"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ApprovedClaim {
  status: string
  serviceDate: string
  claimNumber: string
  practitioner: string
  district: string
  ssid: string
  studentName: string
  carelonId: string
  billedAmount: string
}

export default function SubmitConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [approvedClaims, setApprovedClaims] = useState<ApprovedClaim[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Get the approved claims from localStorage or URL params
    const claimsData = localStorage.getItem("approvedClaims")
    if (claimsData) {
      setApprovedClaims(JSON.parse(claimsData))
    } else {
      // If no data, redirect back to claims
      router.push("/claims?tab=ready-to-submit")
    }
  }, [router])

  const handleCancel = () => {
    // Clear the temporary data and go back
    localStorage.removeItem("approvedClaims")
    router.push("/claims?tab=ready-to-submit")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate submission process
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Move approved claims to submitted status
      const submittedClaims = approvedClaims.map((claim) => ({
        ...claim,
        status: "SUBMITTED",
        batchNumber: Math.floor(Math.random() * 100000000).toString(),
      }))

      // Store submitted claims to be added to not-paid tab
      const existingNotPaid = localStorage.getItem("notPaidClaims")
      const notPaidClaims = existingNotPaid ? JSON.parse(existingNotPaid) : []
      const updatedNotPaid = [...submittedClaims, ...notPaidClaims]
      localStorage.setItem("notPaidClaims", JSON.stringify(updatedNotPaid))

      // Clear approved claims
      localStorage.removeItem("approvedClaims")

      // Redirect to not-paid tab with success message
      router.push("/claims?tab=not-paid&submitted=true")
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (approvedClaims.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-teal-800">
          Are you sure you'd like to submit these claims for billing?
        </h1>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg border overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#e8e9ff] border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Service Dates</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Claim #</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">District</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">SSID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Student Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Billed Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {approvedClaims.map((claim, index) => {
                const isEven = index % 2 === 0
                const rowClass = isEven ? "bg-blue-50" : "bg-white"

                return (
                  <tr key={index} className={rowClass}>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                        APPROVED
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <div className="text-sm">
                        02/01/2023
                        <br />
                        02/03/2023
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-900">
                      <Link href={`/claims/${claim.claimNumber}`} className="text-teal-600 hover:underline">
                        {claim.claimNumber}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-900">{claim.district}</td>
                    <td className="py-3 px-4 text-gray-900">{claim.ssid}</td>
                    <td className="py-3 px-4 text-gray-900">
                      <Link href={`/manage-students/1`} className="text-teal-600 hover:underline">
                        {claim.studentName}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-medium">{claim.billedAmount}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="px-8 py-2 bg-gray-400 text-white border-gray-400 hover:bg-gray-500 hover:border-gray-500 rounded"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  )
}
