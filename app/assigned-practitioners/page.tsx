"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Users, ChevronRight, Mail, Phone, Award } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock practitioners data - in a real app, this would come from an API
const mockPractitioners = [
  {
    id: 1,
    firstName: "Bradley",
    lastName: "Brown",
    email: "bradley.brown@example.com",
    phone: "(555) 123-4567",
    npi: "59249790",
    specialties: ["Speech-Language Pathology", "Applied Behavior Analysis"],
    caseloadCount: 4,
    status: "Active",
    licenseNumber: "LIC123456",
    department: "Special Education Services"
  },
  {
    id: 2,
    firstName: "Jennifer",
    lastName: "Martinez",
    email: "jennifer.martinez@example.com",
    phone: "(555) 234-5678",
    npi: "84729105",
    specialties: ["Occupational Therapy", "Sensory Integration"],
    caseloadCount: 6,
    status: "Active",
    licenseNumber: "LIC234567",
    department: "Therapeutic Services"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    phone: "(555) 345-6789",
    npi: "72951048",
    specialties: ["Physical Therapy", "Mobility Training"],
    caseloadCount: 3,
    status: "Active",
    licenseNumber: "LIC345678",
    department: "Physical Rehabilitation"
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Davis",
    email: "sarah.davis@example.com",
    phone: "(555) 456-7890",
    npi: "63840297",
    specialties: ["School Psychology", "Behavioral Interventions"],
    caseloadCount: 8,
    status: "Active",
    licenseNumber: "LIC456789",
    department: "Psychological Services"
  },
  {
    id: 5,
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    phone: "(555) 567-8901",
    npi: "95172638",
    specialties: ["Autism Support", "Social Skills Training"],
    caseloadCount: 5,
    status: "On Leave",
    licenseNumber: "LIC567890",
    department: "Behavioral Support"
  }
]

export default function AssignedPractitionersPage() {
  const router = useRouter()
  const [practitioners, setPractitioners] = useState(mockPractitioners)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPractitioners, setFilteredPractitioners] = useState(mockPractitioners)

  useEffect(() => {
    const filtered = practitioners.filter(practitioner =>
      `${practitioner.firstName} ${practitioner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practitioner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practitioner.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      practitioner.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPractitioners(filtered)
  }, [searchTerm, practitioners])

  const handlePractitionerClick = (practitionerId: number) => {
    router.push(`/assigned-practitioners/${practitionerId}`)
  }

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      "Active": "bg-green-100 text-green-800",
      "On Leave": "bg-yellow-100 text-yellow-800",
      "Inactive": "bg-gray-100 text-gray-800"
    }
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-teal-800 mb-2">Assigned Practitioners</h1>
        <p className="text-slate-600">View and manage practitioners assigned to your supervision</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-teal-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Practitioners</p>
              <p className="text-2xl font-bold">{practitioners.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Award className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Practitioners</p>
              <p className="text-2xl font-bold">{practitioners.filter(p => p.status === "Active").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students Served</p>
              <p className="text-2xl font-bold">{practitioners.reduce((sum, p) => sum + p.caseloadCount, 0)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Find Practitioners</CardTitle>
          <CardDescription>Search by name, email, specialty, or department</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search practitioners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Practitioners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Practitioners ({filteredPractitioners.length})</CardTitle>
          <CardDescription>Click on any practitioner to view their detailed profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Contact</TableHead>
                  <TableHead className="font-semibold">Specialties</TableHead>
                  <TableHead className="font-semibold">Department</TableHead>
                  <TableHead className="font-semibold">Caseload</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPractitioners.map((practitioner) => (
                  <TableRow 
                    key={practitioner.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handlePractitionerClick(practitioner.id)}
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {practitioner.firstName} {practitioner.lastName}
                        </p>
                        <p className="text-sm text-gray-500">NPI: {practitioner.npi}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{practitioner.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-600">{practitioner.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {practitioner.specialties.slice(0, 2).map((specialty, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {practitioner.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{practitioner.specialties.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-900">{practitioner.department}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <span className="text-lg font-semibold text-teal-600">{practitioner.caseloadCount}</span>
                        <p className="text-xs text-gray-500">students</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(practitioner.status)}>
                        {practitioner.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 