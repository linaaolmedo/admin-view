"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Users, ChevronRight, Mail, Phone, Award, Shield, Settings, BarChart3, UserCheck, Building } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock practitioners data
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
    department: "Special Education Services",
    supervisor: "Susan Casper"
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
    department: "Therapeutic Services",
    supervisor: "Michael Thompson"
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
    department: "Physical Rehabilitation",
    supervisor: "Susan Casper"
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
    department: "Psychological Services",
    supervisor: "Lisa Rodriguez"
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
    department: "Behavioral Support",
    supervisor: "Michael Thompson"
  }
]

// Mock supervisors data
const mockSupervisors = [
  {
    id: 1,
    firstName: "Susan",
    lastName: "Casper",
    email: "susan.casper@example.com",
    phone: "(555) 111-2222",
    npi: "12345678",
    role: "Senior Supervisor",
    status: "Active",
    department: "Special Education Services",
    practitionerCount: 12,
    licenseNumber: "SUP123456",
    specializations: ["Speech-Language Pathology", "Educational Administration"],
    yearsExperience: 8
  },
  {
    id: 2,
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@example.com",
    phone: "(555) 222-3333",
    npi: "23456789",
    role: "Clinical Supervisor",
    status: "Active",
    department: "Therapeutic Services",
    practitionerCount: 8,
    licenseNumber: "SUP234567",
    specializations: ["Occupational Therapy", "Physical Therapy"],
    yearsExperience: 10
  },
  {
    id: 3,
    firstName: "Lisa",
    lastName: "Rodriguez",
    email: "lisa.rodriguez@example.com",
    phone: "(555) 333-4444",
    npi: "34567890",
    role: "Program Supervisor",
    status: "Active",
    department: "Psychological Services",
    practitionerCount: 6,
    licenseNumber: "SUP345678",
    specializations: ["School Psychology", "Behavioral Analysis"],
    yearsExperience: 12
  },
  {
    id: 4,
    firstName: "Robert",
    lastName: "Kim",
    email: "robert.kim@example.com",
    phone: "(555) 444-5555",
    npi: "45678901",
    role: "Regional Supervisor",
    status: "Active",
    department: "Multi-District Services",
    practitionerCount: 15,
    licenseNumber: "SUP456789",
    specializations: ["Program Management", "Multi-Service Coordination"],
    yearsExperience: 15
  }
]

export default function AdministratorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || "overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredPractitioners, setFilteredPractitioners] = useState(mockPractitioners)
  const [filteredSupervisors, setFilteredSupervisors] = useState(mockSupervisors)

  useEffect(() => {
    // Filter practitioners
    const filtered = mockPractitioners.filter(practitioner =>
      `${practitioner.firstName} ${practitioner.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practitioner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practitioner.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase())) ||
      practitioner.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredPractitioners(filtered)

    // Filter supervisors
    const filteredSups = mockSupervisors.filter(supervisor =>
      `${supervisor.firstName} ${supervisor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
      supervisor.department.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredSupervisors(filteredSups)
  }, [searchTerm])

  const handlePractitionerClick = (practitionerId: number) => {
    router.push(`/administrator/practitioners/${practitionerId}`)
  }

  const handleSupervisorClick = (supervisorId: number) => {
    router.push(`/administrator/supervisors/${supervisorId}`)
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
        <h1 className="text-2xl font-bold text-teal-800 mb-2">Team Management</h1>
        <p className="text-slate-600">Comprehensive oversight and management of practitioners and supervisors</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-gray-100">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            System Overview
          </TabsTrigger>
          <TabsTrigger value="practitioners" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Practitioners
          </TabsTrigger>
          <TabsTrigger value="supervisors" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Supervisors
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            System Management
          </TabsTrigger>
        </TabsList>

        {/* System Overview Tab */}
        <TabsContent value="overview" className="mt-0">
          <div className="space-y-6">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="h-8 w-8 text-teal-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Practitioners</p>
                    <p className="text-2xl font-bold">{mockPractitioners.length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Supervisors</p>
                    <p className="text-2xl font-bold">{mockSupervisors.filter(s => s.status === "Active").length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <UserCheck className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold">{mockPractitioners.filter(p => p.status === "Active").length + mockSupervisors.filter(s => s.status === "Active").length}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-6">
                  <Building className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students Served</p>
                    <p className="text-2xl font-bold">{mockPractitioners.reduce((sum, p) => sum + p.caseloadCount, 0)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Departments Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                  <CardDescription>Staff distribution across departments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Special Education Services</span>
                      <span className="text-lg font-semibold text-gray-900">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Therapeutic Services</span>
                      <span className="text-lg font-semibold text-gray-900">2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Psychological Services</span>
                      <span className="text-lg font-semibold text-gray-900">1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Physical Rehabilitation</span>
                      <span className="text-lg font-semibold text-gray-900">1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Current system status and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Sessions</span>
                      <Badge className="bg-green-100 text-green-800">23 Online</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending Claims</span>
                      <Badge className="bg-yellow-100 text-yellow-800">142 Pending</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">System Alerts</span>
                      <Badge className="bg-red-100 text-red-800">2 Critical</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Data Backups</span>
                      <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Practitioners Tab */}
        <TabsContent value="practitioners" className="mt-0">
          <div className="space-y-6">
            {/* Search */}
            <Card>
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
                        <TableHead className="font-semibold">Supervisor</TableHead>
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
                          <TableCell className="text-gray-900">{practitioner.supervisor}</TableCell>
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
        </TabsContent>

        {/* Supervisors Tab */}
        <TabsContent value="supervisors" className="mt-0">
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardHeader>
                <CardTitle>Find Supervisors</CardTitle>
                <CardDescription>Search by name, email, specialization, or department</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search supervisors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Supervisors Table */}
            <Card>
              <CardHeader>
                <CardTitle>Supervisors ({filteredSupervisors.length})</CardTitle>
                <CardDescription>Click on any supervisor to view their detailed profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Contact</TableHead>
                        <TableHead className="font-semibold">Role</TableHead>
                        <TableHead className="font-semibold">Department</TableHead>
                        <TableHead className="font-semibold">Team Size</TableHead>
                        <TableHead className="font-semibold">Experience</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold w-12"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSupervisors.map((supervisor) => (
                        <TableRow 
                          key={supervisor.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleSupervisorClick(supervisor.id)}
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-gray-900">
                                {supervisor.firstName} {supervisor.lastName}
                              </p>
                              <p className="text-sm text-gray-500">NPI: {supervisor.npi}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-600">{supervisor.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-600">{supervisor.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700">
                              {supervisor.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-900">{supervisor.department}</TableCell>
                          <TableCell>
                            <div className="text-center">
                              <span className="text-lg font-semibold text-blue-600">{supervisor.practitionerCount}</span>
                              <p className="text-xs text-gray-500">practitioners</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-gray-600">{supervisor.yearsExperience} years</span>
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusBadge(supervisor.status)}>
                              {supervisor.status}
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
        </TabsContent>

        {/* System Management Tab */}
        <TabsContent value="system" className="mt-0">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-teal-600" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Manage all system users, roles, and permissions</p>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => router.push('/manage-users')}
                  >
                    Open User Management
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    System Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Configure billing codes, qualifications, and system settings</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/configurations')}
                  >
                    Open Configurations
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    System Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Access comprehensive system reports and analytics</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/reports')}
                  >
                    View Reports
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 