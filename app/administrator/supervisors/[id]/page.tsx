"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, User, Award, Users, FileText, Shield, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock supervisor data - in a real app, this would come from an API
const mockSupervisorData = {
  1: {
    id: 1,
    firstName: "Susan",
    lastName: "Casper",
    email: "susan.casper@example.com",
    phone: "(555) 111-2222",
    npi: "12345678",
    role: "Senior Supervisor",
    status: "Active",
    address: "789 Supervisor Lane, Oakland, CA 94612",
    hireDate: "2018-09-10",
    department: "Special Education Services",
    licenseNumber: "SUP123456",
    specializations: ["Speech-Language Pathology", "Educational Administration", "Clinical Supervision"],
    yearsExperience: 8,
    qualifications: [
      { name: "Educational Administration", level: "Master's Degree", date: "2016-05-20", institution: "UC Berkeley" },
      { name: "Clinical Supervision", level: "Advanced Certificate", date: "2017-08-15", institution: "ASHA" },
      { name: "Speech-Language Pathology", level: "Master's Degree", date: "2014-12-10", institution: "San Francisco State" },
      { name: "Special Education Leadership", level: "Certification", date: "2019-03-22", institution: "CDE" }
    ],
    teamMembers: [
      { 
        name: "Bradley Brown", 
        role: "Speech-Language Pathologist", 
        caseload: 4, 
        performance: "Excellent",
        lastReview: "2024-02-15",
        nextReview: "2024-05-15"
      },
      { 
        name: "Michael Johnson", 
        role: "Physical Therapist", 
        caseload: 3, 
        performance: "Good",
        lastReview: "2024-01-20",
        nextReview: "2024-04-20"
      },
      { 
        name: "Lisa Chen", 
        role: "Occupational Therapist", 
        caseload: 5, 
        performance: "Excellent",
        lastReview: "2024-03-01",
        nextReview: "2024-06-01"
      },
      { 
        name: "Robert Kim", 
        role: "Behavioral Specialist", 
        caseload: 6, 
        performance: "Good",
        lastReview: "2024-02-28",
        nextReview: "2024-05-28"
      }
    ],
    responsibilities: [
      { area: "Clinical Supervision", description: "Oversee quality of therapeutic services", priority: "High" },
      { area: "Staff Development", description: "Professional development and training programs", priority: "High" },
      { area: "Quality Assurance", description: "Ensure compliance with regulatory standards", priority: "Medium" },
      { area: "Budget Management", description: "Department budget oversight and planning", priority: "Medium" },
      { area: "Student Outcome Monitoring", description: "Track and improve student progress metrics", priority: "High" }
    ]
  },
  2: {
    id: 2,
    firstName: "Michael",
    lastName: "Thompson",
    email: "michael.thompson@example.com",
    phone: "(555) 222-3333",
    npi: "23456789",
    role: "Clinical Supervisor",
    status: "Active",
    address: "456 Clinical Drive, San Jose, CA 95123",
    hireDate: "2019-01-15",
    department: "Therapeutic Services",
    licenseNumber: "SUP234567",
    specializations: ["Occupational Therapy", "Physical Therapy", "Clinical Leadership"],
    yearsExperience: 10,
    qualifications: [
      { name: "Occupational Therapy", level: "Master's Degree", date: "2013-06-15", institution: "UC San Francisco" },
      { name: "Clinical Leadership", level: "Advanced Certificate", date: "2018-04-10", institution: "AOTA" },
      { name: "Healthcare Management", level: "Certificate", date: "2020-11-05", institution: "Stanford" }
    ],
    teamMembers: [
      { 
        name: "Jennifer Martinez", 
        role: "Occupational Therapist", 
        caseload: 6, 
        performance: "Excellent",
        lastReview: "2024-02-10",
        nextReview: "2024-05-10"
      },
      { 
        name: "David Wilson", 
        role: "Physical Therapist", 
        caseload: 5, 
        performance: "Good",
        lastReview: "2024-01-25",
        nextReview: "2024-04-25"
      },
      { 
        name: "Maria Garcia", 
        role: "Occupational Therapist", 
        caseload: 4, 
        performance: "Excellent",
        lastReview: "2024-03-05",
        nextReview: "2024-06-05"
      }
    ],
    responsibilities: [
      { area: "Therapeutic Quality", description: "Ensure high-quality therapeutic interventions", priority: "High" },
      { area: "Equipment Management", description: "Oversee therapeutic equipment and resources", priority: "Medium" },
      { area: "Continuing Education", description: "Coordinate ongoing professional development", priority: "High" },
      { area: "Safety Protocols", description: "Maintain safety standards in therapy sessions", priority: "High" }
    ]
  },
  3: {
    id: 3,
    firstName: "Lisa",
    lastName: "Rodriguez",
    email: "lisa.rodriguez@example.com",
    phone: "(555) 333-4444",
    npi: "34567890",
    role: "Program Supervisor",
    status: "Active",
    address: "321 Program Circle, Fremont, CA 94539",
    hireDate: "2017-03-20",
    department: "Psychological Services",
    licenseNumber: "SUP345678",
    specializations: ["School Psychology", "Behavioral Analysis", "Program Development"],
    yearsExperience: 12,
    qualifications: [
      { name: "School Psychology", level: "Doctorate", date: "2012-05-18", institution: "UC Berkeley" },
      { name: "Applied Behavior Analysis", level: "Board Certification", date: "2015-09-10", institution: "BACB" },
      { name: "Program Evaluation", level: "Certificate", date: "2019-07-15", institution: "APA" }
    ],
    teamMembers: [
      { 
        name: "Sarah Davis", 
        role: "School Psychologist", 
        caseload: 8, 
        performance: "Excellent",
        lastReview: "2024-02-20",
        nextReview: "2024-05-20"
      },
      { 
        name: "Carlos Martinez", 
        role: "Behavioral Specialist", 
        caseload: 7, 
        performance: "Good",
        lastReview: "2024-01-15",
        nextReview: "2024-04-15"
      }
    ],
    responsibilities: [
      { area: "Psychological Assessment", description: "Oversee psychological evaluations and assessments", priority: "High" },
      { area: "Behavioral Intervention", description: "Develop and monitor behavioral support plans", priority: "High" },
      { area: "Crisis Management", description: "Handle psychological and behavioral crises", priority: "High" },
      { area: "Parent Consultation", description: "Provide guidance to families and caregivers", priority: "Medium" }
    ]
  }
}

export default function AdminSupervisorProfilePage() {
  const router = useRouter()
  const params = useParams()
  const supervisorId = params.id as string
  const [supervisor, setSupervisor] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    // In a real app, you would fetch supervisor data from an API
    const supervisorData = mockSupervisorData[parseInt(supervisorId) as keyof typeof mockSupervisorData]
    if (supervisorData) {
      setSupervisor(supervisorData)
    }
  }, [supervisorId])

  const handleGoBack = () => {
    router.push("/manage-users?tab=supervisors")
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

  if (!supervisor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Supervisor not found</h2>
          <Button onClick={handleGoBack} variant="outline" className="mt-4">
            Back to Manage Users
          </Button>
        </div>
      </div>
    )
  }

  const getPerformanceBadge = (performance: string) => {
    const performanceStyles = {
      "Excellent": "bg-green-100 text-green-800",
      "Good": "bg-blue-100 text-blue-800",
      "Needs Improvement": "bg-yellow-100 text-yellow-800",
      "Poor": "bg-red-100 text-red-800"
    }
    return performanceStyles[performance as keyof typeof performanceStyles] || "bg-gray-100 text-gray-800"
  }

  const getPriorityBadge = (priority: string) => {
    const priorityStyles = {
      "High": "bg-red-100 text-red-800",
      "Medium": "bg-yellow-100 text-yellow-800", 
      "Low": "bg-green-100 text-green-800"
    }
    return priorityStyles[priority as keyof typeof priorityStyles] || "bg-gray-100 text-gray-800"
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
                  {supervisor.firstName} {supervisor.lastName}
                </h1>
                <p className="text-slate-600">{supervisor.role} • NPI: {supervisor.npi}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant={supervisor.status === "Active" ? "default" : "secondary"}
                className={supervisor.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
              >
                {supervisor.status}
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
                Qualifications & Responsibilities
              </div>
            </button>
            <button
              onClick={() => scrollToSection("team")}
              className={`flex-shrink-0 px-2 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "team"
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Team Management
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
                    <span>{supervisor.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{supervisor.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{supervisor.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>Hired: {new Date(supervisor.hireDate).toLocaleDateString()}</span>
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
                    <p className="text-gray-900">{supervisor.department}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Role</label>
                    <p className="text-gray-900">{supervisor.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">License Number</label>
                    <p className="text-gray-900">{supervisor.licenseNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Years of Experience</label>
                    <p className="text-gray-900">{supervisor.yearsExperience} years</p>
                  </div>
                </CardContent>
              </Card>

              {/* Specializations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Areas of Specialization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {supervisor.specializations.map((specialization: string, index: number) => (
                      <Badge key={index} variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700">
                        {specialization}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Qualifications & Responsibilities Section */}
          <section id="qualifications" className="scroll-mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Qualifications & Certifications</CardTitle>
                  <CardDescription>Educational background and professional certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supervisor.qualifications.map((qual: any, index: number) => (
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

              {/* Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Responsibilities</CardTitle>
                  <CardDescription>Primary areas of responsibility and oversight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supervisor.responsibilities.map((responsibility: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{responsibility.area}</h4>
                          <Badge className={getPriorityBadge(responsibility.priority)}>
                            {responsibility.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{responsibility.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Team Management Section */}
          <section id="team" className="scroll-mt-32">
            <div className="space-y-6">
              {/* Team Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="flex items-center p-6">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Team Members</p>
                      <p className="text-2xl font-bold">{supervisor.teamMembers.length}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center p-6">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Caseload</p>
                      <p className="text-2xl font-bold">{supervisor.teamMembers.reduce((sum: number, member: any) => sum + member.caseload, 0)}</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center p-6">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Excellent Performance</p>
                      <p className="text-2xl font-bold">{supervisor.teamMembers.filter((member: any) => member.performance === "Excellent").length}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Members Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members ({supervisor.teamMembers.length})</CardTitle>
                  <CardDescription>Direct reports and their performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="font-semibold">Name</TableHead>
                          <TableHead className="font-semibold">Role</TableHead>
                          <TableHead className="font-semibold">Caseload</TableHead>
                          <TableHead className="font-semibold">Performance</TableHead>
                          <TableHead className="font-semibold">Last Review</TableHead>
                          <TableHead className="font-semibold">Next Review</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {supervisor.teamMembers.map((member: any, index: number) => (
                          <TableRow key={index} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>
                              <div className="text-center">
                                <span className="text-lg font-semibold text-teal-600">{member.caseload}</span>
                                <p className="text-xs text-gray-500">students</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={getPerformanceBadge(member.performance)}>
                                {member.performance}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(member.lastReview).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(member.nextReview).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
} 