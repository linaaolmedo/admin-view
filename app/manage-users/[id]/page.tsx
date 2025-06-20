"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Award, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock user data - in a real app, this would come from an API
const mockUserData = {
  1: {
    id: 1,
    firstName: "Bradley",
    lastName: "Brown",
    email: "bradley.brown@example.com",
    phone: "(555) 123-4567",
    npi: "59249790",
    role: "Practitioner",
    status: "Active",
    address: "123 Main St, Fruitvale, CA 94566",
    hireDate: "2022-03-15",
    department: "Special Education Services",
    supervisor: "Susan Casper",
    licenseNumber: "LIC123456",
    qualifications: [
      { name: "Speech-Language Pathology", level: "Master's Degree", date: "2020-05-15" },
      { name: "Applied Behavior Analysis", level: "Certification", date: "2021-02-10" },
      { name: "Autism Spectrum Disorders", level: "Specialty Certificate", date: "2021-08-22" }
    ],
    services: [
      { name: "Speech Therapy", code: "92507", billable: true },
      { name: "Language Assessment", code: "92506", billable: true },
      { name: "Consultation", code: "99241", billable: false }
    ],
    caseload: [
      { studentName: "Sarah Johnson", grade: "3rd", iepDate: "2024-01-15", nextReview: "2024-04-15", status: "Active" },
      { studentName: "Michael Chen", grade: "5th", iepDate: "2024-02-01", nextReview: "2024-05-01", status: "Active" },
      { studentName: "Emma Rodriguez", grade: "2nd", iepDate: "2023-12-10", nextReview: "2024-03-10", status: "Review Due" },
      { studentName: "James Wilson", grade: "4th", iepDate: "2024-01-25", nextReview: "2024-04-25", status: "Active" }
    ]
  }
}

export default function UserProfilePage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // In a real app, you would fetch user data from an API
    const userData = mockUserData[parseInt(userId) as keyof typeof mockUserData]
    if (userData) {
      setUser(userData)
    }
  }, [userId])

  const handleGoBack = () => {
    router.back()
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">User not found</h2>
          <Button onClick={handleGoBack} variant="outline" className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const getCaseloadStatusBadge = (status: string) => {
    const statusStyles = {
      "Active": "bg-green-100 text-green-800",
      "Review Due": "bg-yellow-100 text-yellow-800",
      "Inactive": "bg-gray-100 text-gray-800"
    }
    return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleGoBack}
                className="h-8 w-8"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-black">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.role} • NPI: {user.npi}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={user.status === "Active" ? "default" : "secondary"}
                className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-auto mb-6">
              <TabsTrigger value="about" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                About
              </TabsTrigger>
              <TabsTrigger value="qualifications" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <Award className="w-4 h-4 mr-2" />
                Qualifications & Services
              </TabsTrigger>
              <TabsTrigger value="caseload" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Caseload Management
              </TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{user.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Hired: {new Date(user.hireDate).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Professional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Professional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Department</label>
                      <p className="text-gray-900">{user.department}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Supervisor</label>
                      <p className="text-gray-900">{user.supervisor}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">License Number</label>
                      <p className="text-gray-900">{user.licenseNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">NPI Number</label>
                      <p className="text-gray-900">{user.npi}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Qualifications & Services Tab */}
            <TabsContent value="qualifications" className="mt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Qualifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Qualifications</CardTitle>
                    <CardDescription>Professional certifications and qualifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.qualifications.map((qual: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900">{qual.name}</h4>
                          <p className="text-sm text-gray-600">{qual.level}</p>
                          <p className="text-xs text-gray-500">Obtained: {new Date(qual.date).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Authorized Services</CardTitle>
                    <CardDescription>Services this practitioner can provide</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {user.services.map((service: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-gray-900">{service.name}</h4>
                              <p className="text-sm text-gray-600">Code: {service.code}</p>
                            </div>
                            <Badge variant={service.billable ? "default" : "secondary"}>
                              {service.billable ? "Billable" : "Non-billable"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Caseload Management Tab */}
            <TabsContent value="caseload" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Current Caseload</CardTitle>
                  <CardDescription>Students currently assigned to this practitioner</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Student Name</TableHead>
                          <TableHead className="font-semibold">Grade</TableHead>
                          <TableHead className="font-semibold">IEP Date</TableHead>
                          <TableHead className="font-semibold">Next Review</TableHead>
                          <TableHead className="font-semibold">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {user.caseload.map((student: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{student.studentName}</TableCell>
                            <TableCell>{student.grade}</TableCell>
                            <TableCell>{new Date(student.iepDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(student.nextReview).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge className={getCaseloadStatusBadge(student.status)}>
                                {student.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 