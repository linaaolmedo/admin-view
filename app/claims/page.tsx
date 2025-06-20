"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Search, ArrowUpDown, Filter, MoreHorizontal, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

  const [selectedClaims, setSelectedClaims] = useState<number[]>([])
  const [successMessage, setSuccessMessage] = useState("")
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

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



  // Function to handle sorting
  const handleSort = (field: string) => {
    if (activeTab !== "not-paid") return // Only sort for not-paid tab
    
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Function to sort data
  const sortData = (data: any[]) => {
    if (!sortField || activeTab !== "not-paid") return data
    
    return [...data].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]
      
      // Handle different data types
      if (sortField === "serviceDate") {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      } else if (sortField === "billedAmount") {
        aValue = parseFloat(aValue.replace(/[$,]/g, ""))
        bValue = parseFloat(bValue.replace(/[$,]/g, ""))
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }
      
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }

  const filteredData = sortData(getCurrentData().filter((claim: any) => {
    if (searchTerm === "") return true
    
    // Search across all relevant fields
    const searchableFields = ['claimNumber', 'serviceDate', 'carelonId', 'bicNumber', 'district', 'practitionerNPI', 'practitioner', 'studentName', 'ssid']
    return searchableFields.some(field => {
      const fieldValue = claim[field]
      return fieldValue?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    })
  }))

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

  // Function to render sort icon
  const renderSortIcon = (field: string) => {
    if (activeTab !== "not-paid" || sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />
    }
    return sortDirection === "asc" ? 
      <ChevronUp className="w-4 h-4 text-blue-600" /> : 
      <ChevronDown className="w-4 h-4 text-blue-600" />
  }

  const renderTableHeaders = () => {
    switch (activeTab) {
      case "not-paid":
        return (
          <tr className="bg-gray-50">
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center gap-2">
                Status
                {renderSortIcon("status")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("serviceDate")}
            >
              <div className="flex items-center gap-2">
                Service Date
                {renderSortIcon("serviceDate")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("batchNumber")}
            >
              <div className="flex items-center gap-2">
                Batch #
                {renderSortIcon("batchNumber")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("claimNumber")}
            >
              <div className="flex items-center gap-2">
                Claim #
                {renderSortIcon("claimNumber")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("practitioner")}
            >
              <div className="flex items-center gap-2">
                Practitioner
                {renderSortIcon("practitioner")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("district")}
            >
              <div className="flex items-center gap-2">
                District
                {renderSortIcon("district")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("ssid")}
            >
              <div className="flex items-center gap-2">
                SSID
                {renderSortIcon("ssid")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("studentName")}
            >
              <div className="flex items-center gap-2">
                Student Name
                {renderSortIcon("studentName")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("carelonId")}
            >
              <div className="flex items-center gap-2">
                Carelon ID
                {renderSortIcon("carelonId")}
              </div>
            </th>
            <th 
              className="text-left py-3 px-4 font-medium text-[#787878] cursor-pointer hover:bg-gray-100 transition-colors select-none"
              onClick={() => handleSort("billedAmount")}
            >
              <div className="flex items-center gap-2">
                Billed Amount
                {renderSortIcon("billedAmount")}
              </div>
            </th>
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

  const getTabCount = (tabKey: string) => {
    switch (tabKey) {
      case "not-paid":
        return mockClaims["not-paid"].length
      case "paid":
        return mockClaims.paid.length
      case "ready-to-submit":
        return mockClaims["ready-to-submit"].length
      case "incomplete":
        return mockClaims.incomplete.length
      default:
        return 0
    }
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Claims</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabClick} className="w-full">
        <TabsList className="grid grid-cols-4 w-auto">
          <TabsTrigger value="not-paid" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Not Paid ({getTabCount("not-paid")})
          </TabsTrigger>
          <TabsTrigger value="paid" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Paid ({getTabCount("paid")})
          </TabsTrigger>
          <TabsTrigger value="ready-to-submit" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Ready to Submit ({getTabCount("ready-to-submit")})
          </TabsTrigger>
          <TabsTrigger value="incomplete" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
            Incomplete ({getTabCount("incomplete")})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {/* Action Buttons for Ready to Submit */}
          {activeTab === "ready-to-submit" && (
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                className="text-teal-600 border-teal-600 hover:bg-teal-50"
                onClick={handleApproveClaims}
                disabled={selectedClaims.length === 0}
              >
                Approve claims
              </Button>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Submit approved claims for billing</Button>
            </div>
          )}

          {/* Search and Filter Controls */}
          <div className="flex items-center justify-end gap-4 mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

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
              <p className="text-gray-500">No claims found matching your criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
