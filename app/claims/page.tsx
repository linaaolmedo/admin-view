"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, ArrowUpDown, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Mock claims data for different tabs
const mockClaims = {
  "not-paid": [
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "94941611",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "REJECTED",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "82294204",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "71870354",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "70236425",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "80008200",
      claimNumber: "85083377",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "REJECTED",
      serviceDate: "02/01/2023",
      batchNumber: "80008200",
      claimNumber: "22473244",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "REJECTED",
      serviceDate: "02/01/2023",
      batchNumber: "80008200",
      claimNumber: "91099630",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "80008200",
      claimNumber: "77886662",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "80008200",
      claimNumber: "57604845",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "REJECTED",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "14085266",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "41125331",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "24306735",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
    {
      status: "SUBMITTED",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "52767460",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
    },
  ],
  paid: [
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "60016988",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "18454219",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "69033438",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "90417335",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "65385159",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "46549373",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "94242963",
      claimNumber: "24325645",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "08829134",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "97080429",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "86824913",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "65566078",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "19843799",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
    {
      status: "PAID",
      finalizedDate: "02/20/2023",
      serviceDate: "02/01/2023",
      batchNumber: "43063894",
      claimNumber: "07656791",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "49151059",
      billedAmount: "$120.00",
      paidAmount: "$120.00",
    },
  ],
  "ready-to-submit": [
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "NEEDS APPROVAL",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "APPROVED",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "APPROVED",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "APPROVED",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
    {
      status: "APPROVED",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      billedAmount: "$120.00",
      selected: false,
    },
  ],
  incomplete: [
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing prescription",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing prescription",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing prescription",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing SSID",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing prescription",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing prescription",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
    {
      status: "INCOMPLETE",
      serviceDate: "02/01/2023",
      claimNumber: "43063894",
      practitioner: "Brown, Bradley",
      district: "Fruitvale",
      ssid: "43063894",
      studentName: "Greenfield, Samantha",
      carelonId: "43063894",
      reason: "Missing parental consent",
    },
  ],
  remittance: [
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
    {
      dateSubmitted: "02/01/2023",
      batchNumber: "43063894",
      totalClaimsSubmitted: "532",
      claimsPaid: "150",
      deniedClaims: "26",
    },
  ],
}

const tabs = [
  { id: "not-paid", label: "Not Paid", key: "not-paid" },
  { id: "paid", label: "Paid", key: "paid" },
  { id: "ready-to-submit", label: "Ready to Submit", key: "ready-to-submit" },
  { id: "incomplete", label: "Incomplete", key: "incomplete" },
  { id: "remittance", label: "Remittance Overview", key: "remittance" },
]

export default function ClaimsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("not-paid")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchBy, setSearchBy] = useState("claimNumber")
  const [selectedClaims, setSelectedClaims] = useState<number[]>([])
  const [successMessage, setSuccessMessage] = useState("")

  // In the component, add router
  const router = useRouter()

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && tabs.some((t) => t.key === tab)) {
      setActiveTab(tab)
    }

    // Check for success message
    const submitted = searchParams.get("submitted")
    if (submitted === "true") {
      setSuccessMessage("Claims have been successfully submitted for billing!")
      // Clear the URL parameter
      router.replace("/claims?tab=not-paid")
      // Clear message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000)
    }
  }, [searchParams, router])

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      SUBMITTED: "bg-blue-500 text-white",
      REJECTED: "bg-red-500 text-white",
      PAID: "bg-green-500 text-white",
      "NEEDS APPROVAL": "bg-yellow-600 text-white",
      APPROVED: "bg-green-500 text-white",
      INCOMPLETE: "bg-orange-500 text-white",
    }
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-500 text-white"
  }

  const getCurrentData = () => {
    let data = mockClaims[activeTab as keyof typeof mockClaims] || []

    // Add submitted claims to not-paid tab
    if (activeTab === "not-paid") {
      const submittedClaims = localStorage.getItem("notPaidClaims")
      if (submittedClaims) {
        const parsed = JSON.parse(submittedClaims)
        data = [...parsed, ...data]
      }
    }

    return data
  }

  // Search options based on the fields available in claims
  const searchOptions = [
    { value: "claimNumber", label: "Claim #" },
    { value: "serviceDate", label: "Service Date" },
    { value: "carelonId", label: "Carelon ID" },
    { value: "bicNumber", label: "BIC #" },
    { value: "district", label: "District" },
    { value: "practitionerNPI", label: "NPI" }
  ]

  const filteredData = getCurrentData().filter((claim: any) => {
    if (searchTerm === "") return true
    
    const fieldValue = claim[searchBy as keyof typeof claim]
    return fieldValue?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSelectClaim = (index: number) => {
    setSelectedClaims((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const handleSelectAll = () => {
    if (selectedClaims.length === filteredData.length) {
      setSelectedClaims([])
    } else {
      setSelectedClaims(filteredData.map((_, index) => index))
    }
  }

  const renderTableHeaders = () => {
    switch (activeTab) {
      case "not-paid":
        return (
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Status</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Service Date</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Batch #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Claim #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Practitioner</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">District</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">SSID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Student Name</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Carelon ID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Billed Amount</th>
          </tr>
        )
      case "paid":
        return (
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Status</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Finalized Date</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Service Date</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Batch #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Claim #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Practitioner</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">District</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">SSID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Student Name</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Carelon ID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Billed Amount</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Paid Amount</th>
          </tr>
        )
      case "ready-to-submit":
        return (
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-[#787878]">
              <Checkbox
                checked={selectedClaims.length === filteredData.length && filteredData.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Status</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Service Date</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Claim #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Practitioner</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">District</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">SSID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Student Name</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Carelon ID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Billed Amount</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]"></th>
          </tr>
        )
      case "incomplete":
        return (
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Status</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Service Date</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Claim #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Practitioner</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">District</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">SSID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Student Name</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Carelon ID</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Reason</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]"></th>
          </tr>
        )
      case "remittance":
        return (
          <tr className="bg-gray-50">
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Date Submitted</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Batch #</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Total Claims Submitted</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Claims Paid</th>
            <th className="text-left py-3 px-4 font-medium text-[#787878]">Denied Claims</th>
          </tr>
        )
      default:
        return null
    }
  }

  const renderTableRow = (item: any, index: number) => {
    const isEven = index % 2 === 0
    const rowClass = isEven ? "bg-white" : "bg-gray-50"

    switch (activeTab) {
      case "not-paid":
        return (
          <tr key={index} className={rowClass}>
            <td className="py-3 px-4">
              <Badge className={`${getStatusBadge(item.status)} text-xs font-medium`}>{item.status}</Badge>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.serviceDate}</td>
            <td className="py-3 px-4 text-[#000000]">{item.batchNumber}</td>
            <td className="py-3 px-4">
              <Link 
                href={`/claims/${item.claimNumber}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {item.claimNumber}
              </Link>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.practitioner}</td>
            <td className="py-3 px-4 text-[#000000]">{item.district}</td>
            <td className="py-3 px-4 text-[#000000]">{item.ssid}</td>
            <td className="py-3 px-4 text-[#000000]">{item.studentName}</td>
            <td className="py-3 px-4 text-[#000000]">{item.carelonId}</td>
            <td className="py-3 px-4 text-[#000000] font-medium">{item.billedAmount}</td>
          </tr>
        )
      case "paid":
        return (
          <tr key={index} className={rowClass}>
            <td className="py-3 px-4">
              <Badge className={`${getStatusBadge(item.status)} text-xs font-medium`}>{item.status}</Badge>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.finalizedDate}</td>
            <td className="py-3 px-4 text-[#000000]">{item.serviceDate}</td>
            <td className="py-3 px-4 text-[#000000]">{item.batchNumber}</td>
            <td className="py-3 px-4">
              <Link 
                href={`/claims/${item.claimNumber}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {item.claimNumber}
              </Link>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.practitioner}</td>
            <td className="py-3 px-4 text-[#000000]">{item.district}</td>
            <td className="py-3 px-4 text-[#000000]">{item.ssid}</td>
            <td className="py-3 px-4 text-[#000000]">{item.studentName}</td>
            <td className="py-3 px-4 text-[#000000]">{item.carelonId}</td>
            <td className="py-3 px-4 text-[#000000] font-medium">{item.billedAmount}</td>
            <td className="py-3 px-4 text-[#000000] font-medium">{item.paidAmount}</td>
          </tr>
        )
      case "ready-to-submit":
        return (
          <tr key={index} className={rowClass}>
            <td className="py-3 px-4">
              <Checkbox checked={selectedClaims.includes(index)} onCheckedChange={() => handleSelectClaim(index)} />
            </td>
            <td className="py-3 px-4">
              <Badge className={`${getStatusBadge(item.status)} text-xs font-medium`}>{item.status}</Badge>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.serviceDate}</td>
            <td className="py-3 px-4">
              <Link 
                href={`/claims/${item.claimNumber}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {item.claimNumber}
              </Link>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.practitioner}</td>
            <td className="py-3 px-4 text-[#000000]">{item.district}</td>
            <td className="py-3 px-4 text-[#000000]">{item.ssid}</td>
            <td className="py-3 px-4 text-[#000000]">{item.studentName}</td>
            <td className="py-3 px-4 text-[#000000]">{item.carelonId}</td>
            <td className="py-3 px-4 text-[#000000] font-medium">{item.billedAmount}</td>
            <td className="py-3 px-4">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        )
      case "incomplete":
        return (
          <tr key={index} className={rowClass}>
            <td className="py-3 px-4">
              <Badge className={`${getStatusBadge(item.status)} text-xs font-medium`}>{item.status}</Badge>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.serviceDate}</td>
            <td className="py-3 px-4">
              <Link 
                href={`/claims/${item.claimNumber}`}
                className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                {item.claimNumber}
              </Link>
            </td>
            <td className="py-3 px-4 text-[#000000]">{item.practitioner}</td>
            <td className="py-3 px-4 text-[#000000]">{item.district}</td>
            <td className="py-3 px-4 text-[#000000]">{item.ssid}</td>
            <td className="py-3 px-4 text-[#000000]">{item.studentName}</td>
            <td className="py-3 px-4 text-[#000000]">{item.carelonId}</td>
            <td className="py-3 px-4 text-[#000000]">{item.reason}</td>
            <td className="py-3 px-4">
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </td>
          </tr>
        )
      case "remittance":
        return (
          <tr key={index} className={rowClass}>
            <td className="py-3 px-4 text-[#000000]">{item.dateSubmitted}</td>
            <td className="py-3 px-4 text-[#000000]">{item.batchNumber}</td>
            <td className="py-3 px-4 text-[#000000]">{item.totalClaimsSubmitted}</td>
            <td className="py-3 px-4 text-[#000000]">{item.claimsPaid}</td>
            <td className="py-3 px-4 text-[#000000]">{item.deniedClaims}</td>
          </tr>
        )
      default:
        return null
    }
  }

  // Update the tab click handler
  const handleTabClick = (tabKey: string) => {
    setActiveTab(tabKey)
    if (tabKey === "not-paid") {
      router.push("/claims")
    } else {
      router.push(`/claims?tab=${tabKey}`)
    }
  }

  const handleApproveClaims = () => {
    const approvedClaims = selectedClaims
      .map((index) => filteredData[index])
      .filter((claim: any) => claim.status === "APPROVED")

    if (approvedClaims.length === 0) {
      alert("Please select approved claims to submit.")
      return
    }

    // Store approved claims for confirmation page
    localStorage.setItem("approvedClaims", JSON.stringify(approvedClaims))
    router.push("/claims/submit-confirmation")
  }

  return (
    <div>
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-[#000000] mb-6">Claims</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>
      )}

      {/* Tabs */}
      <div className="flex gap-8 mb-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.key)}
            className={`pb-2 px-1 font-medium transition-colors ${
              activeTab === tab.key
                ? "text-[#4286f4] border-b-2 border-[#4286f4]"
                : "text-[#787878] hover:text-[#4286f4]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Action Buttons for Ready to Submit */}
      {activeTab === "ready-to-submit" && (
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="outline"
            className="text-[#4286f4] border-[#4286f4]"
            onClick={handleApproveClaims}
            disabled={selectedClaims.length === 0}
          >
            Approve claims
          </Button>
          <Button className="bg-[#4286f4] hover:bg-[#2f3a83] text-white">Submit approved claims for billing</Button>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search By Dropdown */}
        <Select value={searchBy} onValueChange={setSearchBy}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <div className="px-2 py-1.5 text-xs font-medium text-gray-600 border-b">
              Search options
            </div>
            {searchOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4" />
          Order by
        </Button>

        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Claims Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>{renderTableHeaders()}</thead>
            <tbody>{filteredData.map((item, index) => renderTableRow(item, index))}</tbody>
          </table>
        </div>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#787878]">No claims found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
