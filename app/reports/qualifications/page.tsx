"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search, Filter, Download, Calendar, AlertTriangle } from "lucide-react"

// Mock data for qualifications report
const mockQualificationsData = [
  {
    id: 1,
    practitioner: "Bradley Brown",
    email: "bradley.brown@email.com",
    npi: "1234567890",
    state: "California",
    qualificationType: "Speech-Language Pathologist",
    qualificationCode: "SLP-CA-2024",
    expirationDate: "2025-06-15",
    status: "Active",
    daysToExpiration: 45,
    district: "Fruitvale School District"
  },
  {
    id: 2,
    practitioner: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    npi: "2345678901",
    state: "California",
    qualificationType: "Occupational Therapist",
    qualificationCode: "OT-CA-2023",
    expirationDate: "2025-02-28",
    status: "Expiring Soon",
    daysToExpiration: 12,
    district: "Fruitvale School District"
  },
  {
    id: 3,
    practitioner: "Michael Davis",
    email: "michael.davis@email.com",
    npi: "3456789012",
    state: "California",
    qualificationType: "Physical Therapist",
    qualificationCode: "PT-CA-2024",
    expirationDate: "2025-09-10",
    status: "Active",
    daysToExpiration: 132,
    district: "Arvin School District"
  },
  {
    id: 4,
    practitioner: "Emily Wilson",
    email: "emily.wilson@email.com",
    npi: "4567890123",
    state: "California",
    qualificationType: "School Psychologist",
    qualificationCode: "PSYC-CA-2023",
    expirationDate: "2025-01-30",
    status: "Expired",
    daysToExpiration: -15,
    district: "Kern County District"
  },
  {
    id: 5,
    practitioner: "David Miller",
    email: "david.miller@email.com",
    npi: "5678901234",
    state: "California",
    qualificationType: "Speech-Language Pathologist",
    qualificationCode: "SLP-CA-2024",
    expirationDate: "2025-03-20",
    status: "Expiring Soon",
    daysToExpiration: 32,
    district: "Fruitvale School District"
  },
  {
    id: 6,
    practitioner: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    npi: "6789012345",
    state: "California", 
    qualificationType: "Occupational Therapist",
    qualificationCode: "OT-CA-2024",
    expirationDate: "2025-07-22",
    status: "Active",
    daysToExpiration: 82,
    district: "Kern County District"
  },
  {
    id: 7,
    practitioner: "Robert Taylor",
    email: "robert.taylor@email.com",
    npi: "7890123456",
    state: "California",
    qualificationType: "Physical Therapist",
    qualificationCode: "PT-CA-2023",
    expirationDate: "2025-05-15",
    status: "Active",
    daysToExpiration: 75,
    district: "Arvin School District"
  },
  {
    id: 8,
    practitioner: "Jennifer Garcia",
    email: "jennifer.garcia@email.com",
    npi: "8901234567",
    state: "California",
    qualificationType: "School Psychologist",
    qualificationCode: "PSYC-CA-2024",
    expirationDate: "2025-08-30",
    status: "Active",
    daysToExpiration: 121,
    district: "Fruitvale School District"
  }
]

export default function QualificationsReportPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("Fruitvale School District")
  const [selectedStatus, setSelectedStatus] = useState("Active")
  const [selectedType, setSelectedType] = useState("Speech-Language Pathologist")
  const router = useRouter()

  const filteredData = mockQualificationsData.filter((item) => {
    const matchesSearch = 
      item.practitioner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.qualificationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.qualificationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.npi.includes(searchTerm)

    const matchesDistrict = item.district === selectedDistrict
    const matchesStatus = item.status === selectedStatus
    const matchesType = item.qualificationType === selectedType

    return matchesSearch && matchesDistrict && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string, daysToExpiration: number) => {
    if (status === "Expired") {
      return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-200">Expired</Badge>
    } else if (status === "Expiring Soon" || daysToExpiration <= 30) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Expiring Soon</Badge>
    } else {
      return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getExpirationWarning = (daysToExpiration: number) => {
    if (daysToExpiration < 0) {
      return (
        <div className="flex items-center gap-1 text-red-600">
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm">Expired {Math.abs(daysToExpiration)} days ago</span>
        </div>
      )
    } else if (daysToExpiration <= 30) {
      return (
        <div className="flex items-center gap-1 text-yellow-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{daysToExpiration} days remaining</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center gap-1 text-green-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{daysToExpiration} days remaining</span>
        </div>
      )
    }
  }

  const exportToCSV = () => {
    const headers = ["Practitioner", "Email", "NPI", "State", "Qualification Type", "Code", "Expiration Date", "Status", "District"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => [
        item.practitioner,
        item.email,
        item.npi,
        item.state,
        item.qualificationType,
        item.qualificationCode,
        item.expirationDate,
        item.status,
        item.district
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "qualifications-report.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Calculate summary statistics
  const totalQualifications = filteredData.length
  const expiredCount = filteredData.filter(item => item.status === "Expired").length
  const expiringSoonCount = filteredData.filter(item => item.status === "Expiring Soon" || (item.daysToExpiration <= 30 && item.daysToExpiration > 0)).length
  const activeCount = filteredData.filter(item => item.status === "Active" && item.daysToExpiration > 30).length

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-[#000000]">Qualifications Report</h1>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-[#000000]">{totalQualifications}</div>
            <div className="text-sm text-[#787878]">Total Qualifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            <div className="text-sm text-[#787878]">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{expiringSoonCount}</div>
            <div className="text-sm text-[#787878]">Expiring Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{expiredCount}</div>
            <div className="text-sm text-[#787878]">Expired</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search practitioners, emails, codes, or NPI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="District" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem value="Fruitvale School District">Fruitvale School District</SelectItem>
            <SelectItem value="Arvin School District">Arvin School District</SelectItem>
            <SelectItem value="Kern County District">Kern County District</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Qualification Type" />
          </SelectTrigger>
          <SelectContent>
            
            <SelectItem value="Speech-Language Pathologist">Speech-Language Pathologist</SelectItem>
            <SelectItem value="Occupational Therapist">Occupational Therapist</SelectItem>
            <SelectItem value="Physical Therapist">Physical Therapist</SelectItem>
            <SelectItem value="School Psychologist">School Psychologist</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Qualifications Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Practitioner</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">NPI</TableHead>
              <TableHead className="font-semibold">State</TableHead>
              <TableHead className="font-semibold">Qualification Type</TableHead>
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Expiration Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">District</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.practitioner}</TableCell>
                <TableCell className="text-sm text-gray-600">{item.email}</TableCell>
                <TableCell className="font-mono text-sm">{item.npi}</TableCell>
                <TableCell>{item.state}</TableCell>
                <TableCell>{item.qualificationType}</TableCell>
                <TableCell className="font-mono text-sm">{item.qualificationCode}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{formatDate(item.expirationDate)}</div>
                    {getExpirationWarning(item.daysToExpiration)}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(item.status, item.daysToExpiration)}</TableCell>
                <TableCell className="text-sm">{item.district}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#787878]">No qualifications found matching your criteria.</p>
        </div>
      )}
    </div>
  )
} 