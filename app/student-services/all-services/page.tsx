"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ArrowUpDown, MoreHorizontal } from "lucide-react"

// Mock data - in a real app, this would come from an API
const mockServices = [
  {
    id: 1,
    studentName: "Greenfield, Samantha",
    serviceDate: "5/15/2025",
    status: "UPCOMING",
    service: "Licensed Speech & Lang Pathologist",
    serviceType: "Group treatment of speech, language, voice, communication",
    serviceDelivery: "Group",
    completedDate: "",
    district: "District A",
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "12345678",
    localId: "L001",
    school: "Elementary School",
    birthdate: "1/15/2015",
    practitioner: "Dr. Smith",
    careionId: "C001",
    bicNumber: "BIC001",
    primaryDisability: "Speech Impairment",
    statusIndicator: "Active"
  },
  {
    id: 2,
    studentName: "Greenfield, Samantha", 
    serviceDate: "5/10/2025",
    status: "UPCOMING",
    service: "Licensed Speech & Lang Pathologist",
    serviceType: "Individual counseling",
    serviceDelivery: "Individual",
    completedDate: "",
    district: "District A",
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "12345678",
    localId: "L001",
    school: "Elementary School",
    birthdate: "1/15/2015",
    practitioner: "Dr. Smith",
    careionId: "C001",
    bicNumber: "BIC001",
    primaryDisability: "Speech Impairment",
    statusIndicator: "Active"
  },
  {
    id: 3,
    studentName: "Greenfield, Samantha",
    serviceDate: "4/10/2025", 
    status: "INCOMPLETE",
    service: "Licensed Speech & Lang Pathologist",
    serviceType: "Group treatment of speech, language, voice, communication",
    serviceDelivery: "Group",
    completedDate: "",
    district: "District A",
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "12345678",
    localId: "L001",
    school: "Elementary School",
    birthdate: "1/15/2015",
    practitioner: "Dr. Smith", 
    careionId: "C001",
    bicNumber: "BIC001",
    primaryDisability: "Speech Impairment",
    statusIndicator: "Active"
  },
  {
    id: 4,
    studentName: "Greenfield, Samantha",
    serviceDate: "4/1/2025",
    status: "CANCELLED",
    service: "Licensed Speech & Lang Pathologist", 
    serviceType: "Individual assessment",
    serviceDelivery: "Individual",
    completedDate: "4/15/2025",
    district: "District A",
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "12345678",
    localId: "L001",
    school: "Elementary School",
    birthdate: "1/15/2015",
    practitioner: "Dr. Smith",
    careionId: "C001",
    bicNumber: "BIC001",
    primaryDisability: "Speech Impairment",
    statusIndicator: "Active"
  },
  {
    id: 5,
    studentName: "Greenfield, Samantha",
    serviceDate: "3/30/2025",
    status: "COMPLETED",
    service: "Licensed Speech & Lang Pathologist",
    serviceType: "Group treatment of speech, language, voice, communication", 
    serviceDelivery: "Group",
    completedDate: "4/5/2025",
    district: "District A",
    firstName: "Samantha",
    lastName: "Greenfield",
    ssid: "12345678",
    localId: "L001",
    school: "Elementary School",
    birthdate: "1/15/2015",
    practitioner: "Dr. Smith",
    careionId: "C001",
    bicNumber: "BIC001",
    primaryDisability: "Speech Impairment",
    statusIndicator: "Active"
  }
]



const orderOptions = [
  { value: "status", label: "Status" },
  { value: "serviceDate", label: "Most Recent" },
  { value: "lastName", label: "Last name" },
  { value: "firstName", label: "First name" },
  { value: "ssid", label: "SSID" },
  { value: "district", label: "District" },
  { value: "school", label: "School" },
  { value: "birthdate", label: "Birthdate" },
  { value: "practitioner", label: "Practitioner" },
  { value: "careionId", label: "Careion ID" },
  { value: "bicNumber", label: "BIC #" },
  { value: "primaryDisability", label: "Primary Disability" },
  { value: "statusIndicator", label: "Status Indicator" }
]

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-teal-100 text-teal-800 border-teal-200"
      case "INCOMPLETE":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Badge className={`${getStatusStyles(status)} border`}>
      {status}
    </Badge>
  )
}

export default function AllServicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const [orderBy, setOrderBy] = useState("status")

  const filteredAndSortedServices = useMemo(() => {
    let filtered = mockServices

    // Filter based on search across all fields
    if (searchTerm) {
      filtered = mockServices.filter((service) => {
        return Object.values(service).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    // Sort based on orderBy
    filtered.sort((a, b) => {
      const aValue = a[orderBy as keyof typeof a]
      const bValue = b[orderBy as keyof typeof b]

      if (orderBy === "serviceDate") {
        // Sort by most recent first (reverse chronological)
        return new Date(bValue as string).getTime() - new Date(aValue as string).getTime()
      }

      if (orderBy === "status") {
        // Sort by status priority: INCOMPLETE -> UPCOMING -> COMPLETED -> CANCELLED
        const statusPriority = {
          "INCOMPLETE": 1,
          "UPCOMING": 2,
          "COMPLETED": 3,
          "CANCELLED": 4
        }
        const aPriority = statusPriority[aValue as keyof typeof statusPriority] || 999
        const bPriority = statusPriority[bValue as keyof typeof statusPriority] || 999
        return aPriority - bPriority
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue)
      }

      return 0
    })

    return filtered
  }, [searchTerm, orderBy])

  const handleRowClick = (serviceId: number) => {
    router.push(`/student-services/service-details/${serviceId}`)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-teal-800">All Services</h1>
      </div>

      {/* Search and Controls */}
      <div className="flex items-center justify-end gap-4 mb-6">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <Select value={orderBy} onValueChange={setOrderBy}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {orderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Button variant="outline" size="sm">
          Filter
        </Button>
      </div>

      {/* Services Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Service Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Service Delivery</TableHead>
              <TableHead>Completed Date</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedServices.map((service) => (
                <TableRow 
                  key={service.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleRowClick(service.id)}
                >
                  <TableCell className="font-medium">
                    <Link href={`/manage-students/1`} className="text-teal-600 hover:underline" onClick={(e) => e.stopPropagation()}>
                      {service.studentName}
                    </Link>
                  </TableCell>
                  <TableCell>{service.serviceDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={service.status} />
                  </TableCell>
                  <TableCell>{service.service}</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {service.serviceType}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${
                        service.serviceDelivery === 'Group' 
                          ? 'bg-blue-100 text-blue-800 border-blue-200' 
                          : 'bg-purple-100 text-purple-800 border-purple-200'
                      } border`}
                    >
                      {service.serviceDelivery}
                    </Badge>
                  </TableCell>
                  <TableCell>{service.completedDate}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log("Options clicked for service", service.id)
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {filteredAndSortedServices.length} of {mockServices.length} services
        </span>
      </div>
    </div>
  )
}
