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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

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

  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterState, setFilterState] = useState({
    statusIndicator: {
      active: false,
      inactive: false
    },
    mediCalEligible: {
      yes: false,
      no: false
    }
  })

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
    const statusConfig = {
      SUBMITTED: { className: "bg-teal-500 text-white", label: "Submitted" },
      REJECTED: { className: "bg-orange-500 text-white", label: "Rejected" },
      PAID: { className: "bg-green-500 text-white", label: "Paid" },
      "NEEDS APPROVAL": { className: "bg-yellow-600 text-white", label: "Needs Approval" },
      APPROVED: { className: "bg-green-500 text-white", label: "Approved" },
      INCOMPLETE: { className: "bg-orange-500 text-white", label: "Incomplete" },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { 
      className: "bg-gray-500 text-white",
      label: status
    }

    return (
      <Badge className={cn("font-medium", config.className)}>
        {config.label}
      </Badge>
    )
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

  // Filter handling functions
  const handleFilterChange = (category: string, option: string, checked: boolean) => {
    setFilterState(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [option]: checked
      }
    }))
  }

  const applyFilters = () => {
    setIsFilterOpen(false)
    // The filtering will be applied through the filteredData computation
  }

  const clearFilters = () => {
    setFilterState({
      statusIndicator: {
        active: false,
        inactive: false
      },
      mediCalEligible: {
        yes: false,
        no: false
      }
    })
    setIsFilterOpen(false)
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
    // Search filter
    if (searchTerm !== "") {
      const searchableFields = ['claimNumber', 'serviceDate', 'carelonId', 'bicNumber', 'district', 'practitionerNPI', 'practitioner', 'studentName', 'ssid']
      const matchesSearch = searchableFields.some(field => {
        const fieldValue = claim[field]
        return fieldValue?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      })
      if (!matchesSearch) return false
    }

    // Status Indicator filter
    const { statusIndicator, mediCalEligible } = filterState
    if (statusIndicator.active || statusIndicator.inactive) {
      const isActive = claim.status === "SUBMITTED" || claim.status === "PAID" || claim.status === "APPROVED"
      if (statusIndicator.active && !isActive) return false
      if (statusIndicator.inactive && isActive) return false
    }

    // Medi-cal eligible filter
    if (mediCalEligible.yes || mediCalEligible.no) {
      const isMediCalEligible = claim.mediCalEligible === true || claim.mediCalEligible === "Yes"
      if (mediCalEligible.yes && !isMediCalEligible) return false
      if (mediCalEligible.no && isMediCalEligible) return false
    }

    return true
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
      <ChevronUp className="w-4 h-4 text-teal-600" /> : 
      <ChevronDown className="w-4 h-4 text-teal-600" />
  }

  const renderTableHeaders = () => {
    const commonHeaders = [
      { label: "", field: "checkbox", sortable: false },
      { label: "Status", field: "status", sortable: true },
      { label: "Service Date", field: "serviceDate", sortable: true },
      { label: "Batch #", field: "batchNumber", sortable: true },
      { label: "Claim #", field: "claimNumber", sortable: true },
      { label: "Practitioner", field: "practitioner", sortable: true },
      { label: "District", field: "district", sortable: true },
      { label: "SSID", field: "ssid", sortable: true },
      { label: "Student Name", field: "studentName", sortable: true },
      { label: "Billed Amount", field: "billedAmount", sortable: true },
    ]

    const headers = activeTab === "paid" ? [
      ...commonHeaders.slice(0, 2),
      { label: "Finalized Date", field: "finalizedDate", sortable: true },
      ...commonHeaders.slice(2, -1),
      { label: "Paid Amount", field: "paidAmount", sortable: true },
      commonHeaders[commonHeaders.length - 1],
    ] : commonHeaders

    return (
      <tr className="bg-gray-50">
        {headers.map((header) => (
          <th
            key={header.field}
            className={cn(
              header.field === "checkbox" ? "w-[30px] px-2" : "py-3 px-3 text-left font-semibold text-xs text-gray-600 whitespace-normal break-words min-w-[100px] max-w-[150px]",
              header.sortable && "cursor-pointer hover:bg-gray-100"
            )}
            onClick={() => header.sortable && handleSort(header.field)}
          >
            <div className="flex items-center gap-1">
              {header.label}
              {header.sortable && renderSortIcon(header.field)}
            </div>
          </th>
        ))}
      </tr>
    )
  }

  const renderTableRow = (item: any, index: number) => {
    const commonCells = [
      // Checkbox cell
      <td key="checkbox" className="w-[30px] px-2">
        <Checkbox
          checked={selectedClaims.includes(index)}
          onCheckedChange={() => handleSelectClaim(index)}
        />
      </td>,
      // Status cell
      <td key="status" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        {getStatusBadge(item.status)}
      </td>,
      // Service Date cell
      <td key="serviceDate" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        {item.serviceDate}
      </td>,
      // Batch Number cell
      <td key="batchNumber" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        <Link href={`/claims/${item.claimNumber}`} className="text-teal-600 hover:underline">
          {item.batchNumber}
        </Link>
      </td>,
      // Claim Number cell
      <td key="claimNumber" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        <Link href={`/claims/${item.claimNumber}`} className="text-teal-600 hover:underline">
          {item.claimNumber}
        </Link>
      </td>,
      // Practitioner cell
      <td key="practitioner" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        <Link href={`/manage-users/1`} className="text-teal-600 hover:underline">
          {item.practitioner}
        </Link>
      </td>,
      // District cell
      <td key="district" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        {item.district}
      </td>,
      // SSID cell
      <td key="ssid" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        {item.ssid}
      </td>,
      // Student Name cell
      <td key="studentName" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        <Link href={`/manage-students/1`} className="text-teal-600 hover:underline">
          {item.studentName}
        </Link>
      </td>,
      // Billed Amount cell
      <td key="billedAmount" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
        {item.billedAmount}
      </td>
    ]

    if (activeTab === "paid") {
      return (
        <>
          {commonCells[0]}{/* Checkbox */}
          {commonCells[1]}{/* Status */}
          <td key="finalizedDate" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
            {item.finalizedDate}
          </td>
          {commonCells.slice(2, -1)}{/* All cells between status and billed amount */}
          <td key="paidAmount" className="py-2 px-3 text-xs min-w-[100px] max-w-[150px] whitespace-normal break-words">
            {item.paidAmount}
          </td>
          {commonCells[commonCells.length - 1]}{/* Billed amount */}
        </>
      )
    }

    return <>{commonCells}</>
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
    <div className="p-4">
      {/* Page Header */}
      <h1 className="text-2xl font-bold text-teal-800 mb-6">Claims</h1>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">{successMessage}</div>
      )}

      <Tabs value={activeTab} onValueChange={handleTabClick} className="w-full">
        {/* Tabs and Controls Row */}
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="not-paid">
              Not Paid ({getTabCount("not-paid")})
            </TabsTrigger>
            <TabsTrigger value="paid">
              Paid ({getTabCount("paid")})
            </TabsTrigger>
            <TabsTrigger value="ready-to-submit">
              Ready to Submit ({getTabCount("ready-to-submit")})
            </TabsTrigger>
            <TabsTrigger value="incomplete">
              Incomplete ({getTabCount("incomplete")})
            </TabsTrigger>
          </TabsList>
          
          {/* Search and Filter Controls */}
          <div className="flex items-center gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4" align="end">
                <div className="space-y-4">
                  {/* Status Indicator */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Status Indicator</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-active"
                          checked={filterState.statusIndicator.active}
                          onCheckedChange={(checked) => 
                            handleFilterChange('statusIndicator', 'active', checked as boolean)
                          }
                        />
                        <label htmlFor="status-active" className="text-sm">Active</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="status-inactive"
                          checked={filterState.statusIndicator.inactive}
                          onCheckedChange={(checked) => 
                            handleFilterChange('statusIndicator', 'inactive', checked as boolean)
                          }
                        />
                        <label htmlFor="status-inactive" className="text-sm">Inactive</label>
                      </div>
                    </div>
                  </div>

                  {/* Medi-cal eligible */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">Medi-cal eligible</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="medical-yes"
                          checked={filterState.mediCalEligible.yes}
                          onCheckedChange={(checked) => 
                            handleFilterChange('mediCalEligible', 'yes', checked as boolean)
                          }
                        />
                        <label htmlFor="medical-yes" className="text-sm">Yes</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="medical-no"
                          checked={filterState.mediCalEligible.no}
                          onCheckedChange={(checked) => 
                            handleFilterChange('mediCalEligible', 'no', checked as boolean)
                          }
                        />
                        <label htmlFor="medical-no" className="text-sm">No</label>
                      </div>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={applyFilters}
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                    >
                      Apply Filter
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
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

          {/* Claims Table */}
          <div className="bg-white rounded-lg border overflow-hidden w-full min-w-full">
            <div className="overflow-x-auto">
              <div className="min-w-[1200px]">
                <table className="w-full">
                  <thead>
                    {renderTableHeaders()}
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index}>
                        {renderTableRow(item, index)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
