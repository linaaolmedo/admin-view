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
import { useTableSorting } from "@/hooks/use-table-sorting"

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

  const filteredServices = useMemo(() => {
    let filtered = mockServices

    // Filter based on search across all fields
    if (searchTerm) {
      filtered = mockServices.filter((service) => {
        return Object.values(service).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    return filtered
  }, [searchTerm])

  const { sortedData, getSortIcon, getSortableHeaderProps } = useTableSorting(
    filteredServices,
    "status",
    "asc"
  )

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
        {/* Sort controls now handled by table column headers */}

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
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("studentName")}
              >
                <div className="flex items-center gap-1">
                  Student
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("studentName")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("serviceDate")}
              >
                <div className="flex items-center gap-1">
                  Service Date
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("serviceDate")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("status")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("service")}
              >
                <div className="flex items-center gap-1">
                  Service
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("service")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("serviceType")}
              >
                <div className="flex items-center gap-1">
                  Service Type
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("serviceType")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("serviceDelivery")}
              >
                <div className="flex items-center gap-1">
                  Service Delivery
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("serviceDelivery")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-100"
                {...getSortableHeaderProps("completedDate")}
              >
                <div className="flex items-center gap-1">
                  Completed Date
                  {(() => {
                    const { icon: Icon, className } = getSortIcon("completedDate")
                    return <Icon className={className} />
                  })()}
                </div>
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No services found
                </TableCell>
              </TableRow>
            ) : (
              sortedData.map((service) => (
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
          Showing {sortedData.length} of {mockServices.length} services
        </span>
      </div>
    </div>
  )
}
