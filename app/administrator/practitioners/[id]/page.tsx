"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Award, Users, FileText, Stethoscope, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock practitioner data - in a real app, this would come from an API
const mockPractitionerData = {
  1: {
    id: 1,
    firstName: "Bradley",
    lastName: "Brown",
    email: "bradley.brown@example.com",
    phone: "(555) 123-4567",
    npi: "59249790",
    role: "Speech-Language Pathologist",
    status: "Active",
    address: "123 Main St, Fruitvale, CA 94566",
    hireDate: "2022-03-15",
    department: "Special Education Services",
    supervisor: "Susan Casper",
    licenseNumber: "LIC123456",
    specialties: ["Speech-Language Pathology", "Applied Behavior Analysis", "Autism Spectrum Disorders"],
    qualifications: [
      { name: "Speech-Language Pathology", level: "Master's Degree", date: "2020-05-15", institution: "California State University" },
      { name: "Applied Behavior Analysis", level: "Board Certification", date: "2021-02-10", institution: "BACB" },
      { name: "Autism Spectrum Disorders", level: "Specialty Certificate", date: "2021-08-22", institution: "Autism Training Center" },
      { name: "Augmentative and Alternative Communication", level: "Advanced Certificate", date: "2022-01-15", institution: "AAC Institute" }
    ],
    services: [
      { name: "Speech Therapy", code: "92507", description: "Individual speech therapy sessions", billable: true, rate: "$85/hour" },
      { name: "Language Assessment", code: "92506", description: "Comprehensive language evaluation", billable: true, rate: "$120/session" },
      { name: "AAC Consultation", code: "92508", description: "Augmentative communication device training", billable: true, rate: "$95/hour" },
      { name: "IEP Consultation", code: "99241", description: "Educational planning consultation", billable: false, rate: "N/A" },
      { name: "Parent Training", code: "90837", description: "Parent/caregiver training sessions", billable: true, rate: "$75/hour" }
    ],
    caseload: [
      { 
        studentName: "Sarah Johnson", 
        grade: "3rd", 
        iepDate: "2024-01-15", 
        nextReview: "2024-04-15", 
        status: "Active",
        primaryGoal: "Improve articulation skills",
        sessionFrequency: "2x/week, 30min",
        lastSession: "2024-03-10"
      },
      { 
        studentName: "Michael Chen", 
        grade: "5th", 
        iepDate: "2024-02-01", 
        nextReview: "2024-05-01", 
        status: "Active",
        primaryGoal: "Language comprehension",
        sessionFrequency: "1x/week, 45min",
        lastSession: "2024-03-08"
      },
      { 
        studentName: "Emma Rodriguez", 
        grade: "2nd", 
        iepDate: "2023-12-10", 
        nextReview: "2024-03-10", 
        status: "Review Due",
        primaryGoal: "Social communication",
        sessionFrequency: "2x/week, 30min",
        lastSession: "2024-03-05"
      },
      { 
        studentName: "James Wilson", 
        grade: "4th", 
        iepDate: "2024-01-25", 
        nextReview: "2024-04-25", 
        status: "Active",
        primaryGoal: "Fluency improvement",
        sessionFrequency: "1x/week, 30min",
        lastSession: "2024-03-09"
      }
    ]
  },
  2: {
    id: 2,
    firstName: "Jennifer",
    lastName: "Martinez",
    email: "jennifer.martinez@example.com",
    phone: "(555) 234-5678",
    npi: "84729105",
    role: "Occupational Therapist",
    status: "Active",
    address: "456 Oak Ave, Martinez, CA 94553",
    hireDate: "2021-08-20",
    department: "Therapeutic Services",
    supervisor: "Michael Thompson",
    licenseNumber: "LIC234567",
    specialties: ["Occupational Therapy", "Sensory Integration", "Fine Motor Skills"],
    qualifications: [
      { name: "Occupational Therapy", level: "Master's Degree", date: "2019-06-15", institution: "UC San Francisco" },
      { name: "Sensory Integration", level: "Advanced Certificate", date: "2020-03-10", institution: "SI Network" },
      { name: "Pediatric OT", level: "Specialty Certification", date: "2020-09-15", institution: "AOTA" }
    ],
    services: [
      { name: "Occupational Therapy", code: "97530", description: "Individual OT sessions", billable: true, rate: "$90/hour" },
      { name: "Sensory Integration", code: "97533", description: "Sensory processing intervention", billable: true, rate: "$95/hour" },
      { name: "Equipment Assessment", code: "97542", description: "Adaptive equipment evaluation", billable: true, rate: "$110/session" }
    ],
    caseload: [
      { 
        studentName: "Alex Thompson", 
        grade: "1st", 
        iepDate: "2024-01-10", 
        nextReview: "2024-04-10", 
        status: "Active",
        primaryGoal: "Fine motor development",
        sessionFrequency: "2x/week, 45min",
        lastSession: "2024-03-11"
      },
      { 
        studentName: "Maya Patel", 
        grade: "3rd", 
        iepDate: "2024-02-05", 
        nextReview: "2024-05-05", 
        status: "Active",
        primaryGoal: "Sensory regulation",
        sessionFrequency: "1x/week, 30min",
        lastSession: "2024-03-07"
      }
    ]
  }
}

export default function AdminPractitionerProfilePage() {
  const router = useRouter()
  const params = useParams()
  const practitionerId = params.id as string
  const [practitioner, setPractitioner] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // In a real app, you would fetch practitioner data from an API
    const practitionerData = mockPractitionerData[parseInt(practitionerId) as keyof typeof mockPractitionerData]
    if (practitionerData) {
      setPractitioner(practitionerData)
    }
  }, [practitionerId])

  const handleGoBack = () => {
    router.push("/administrator?tab=practitioners")
  }

  // Smooth scroll to section with offset
  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId)
    
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -128 // Offset to account for header and sticky nav
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
    }
  }

  if (!practitioner) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Practitioner not found</h2>
          <Button onClick={handleGoBack} variant="outline" className="mt-4">
            Back to Team Management
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
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <span className="text-sm text-orange-600 font-medium">Administrator View</span>
                </div>
                <h1 className="text-2xl font-bold text-teal-800">
                  {practitioner.firstName} {practitioner.lastName}
                </h1>
                <p className="text-slate-600">{practitioner.role} • NPI: {practitioner.npi}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={practitioner.status === "Active" ? "default" : "secondary"}
                className={practitioner.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {practitioner.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide pb-px">
            <button
              onClick={() => scrollToSection("about")}
              className={`flex-shrink-0 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "about"
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                About
              </div>
            </button>
            <button
              onClick={() => scrollToSection("qualifications")}
              className={`flex-shrink-0 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "qualifications"
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Qualifications & Services
              </div>
            </button>
            <button
              onClick={() => scrollToSection("caseload")}
              className={`flex-shrink-0 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "caseload"
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Caseload Management
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* About Section */}
          <section id="about" className="scroll-mt-32">
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
                    <span>{practitioner.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{practitioner.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{practitioner.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Hired: {new Date(practitioner.hireDate).toLocaleDateString()}</span>
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
                    <p className="text-gray-900">{practitioner.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Supervisor</label>
                    <p className="text-gray-900">{practitioner.supervisor}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">License Number</label>
                    <p className="text-gray-900">{practitioner.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">NPI Number</label>
                    <p className="text-gray-900">{practitioner.npi}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Specialties */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5" />
                    Areas of Specialty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {practitioner.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline" className="px-3 py-1">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Qualifications & Services Section */}
          <section id="qualifications" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Qualifications & Certifications</CardTitle>
                  <CardDescription>Professional certifications and educational background</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practitioner.qualifications.map((qual: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{qual.name}</h4>
                        <p className="text-sm text-gray-600">{qual.level}</p>
                        <p className="text-xs text-gray-500 mt-1">{qual.institution}</p>
                        <p className="text-xs text-gray-500">Obtained: {new Date(qual.date).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Authorized Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Authorized Services</CardTitle>
                  <CardDescription>Services this practitioner is qualified to provide</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practitioner.services.map((service: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{service.name}</h4>
                            <p className="text-sm text-gray-600">Code: {service.code}</p>
                          </div>
                          <Badge variant={service.billable ? "default" : "secondary"}>
                            {service.billable ? "Billable" : "Non-billable"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{service.description}</p>
                        <p className="text-xs text-gray-500">Rate: {service.rate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Caseload Management Section */}
          <section id="caseload" className="scroll-mt-32">
            <Card>
              <CardHeader>
                <CardTitle>Current Caseload ({practitioner.caseload.length} Students)</CardTitle>
                <CardDescription>Students currently assigned to this practitioner</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Student</TableHead>
                        <TableHead className="font-semibold">Grade</TableHead>
                        <TableHead className="font-semibold">Primary Goal</TableHead>
                        <TableHead className="font-semibold">Frequency</TableHead>
                        <TableHead className="font-semibold">Last Session</TableHead>
                        <TableHead className="font-semibold">IEP Review</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {practitioner.caseload.map((student: any, index: number) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <Link href={`/manage-students/${student.studentId || 1}`} className="text-teal-600 hover:underline">
                              {student.studentName}
                            </Link>
                          </TableCell>
                          <TableCell>{student.grade}</TableCell>
                          <TableCell className="max-w-48">
                            <p className="truncate" title={student.primaryGoal}>{student.primaryGoal}</p>
                          </TableCell>
                          <TableCell>{student.sessionFrequency}</TableCell>
                          <TableCell>{new Date(student.lastSession).toLocaleDateString()}</TableCell>
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
          </section>
        </div>
      </div>
    </div>
  )
} 