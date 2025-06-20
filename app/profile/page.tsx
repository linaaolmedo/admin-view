"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, User, Shield, Clock, Key, Award, Users, BookOpen, Calendar, Settings, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

// Mock user history data
const mockUserHistory = [
  { date: "2025-01-15", action: "Logged in", time: "09:30 AM" },
  { date: "2025-01-15", action: "Viewed caseload", time: "09:35 AM" },
  { date: "2025-01-15", action: "Updated student record", time: "10:15 AM" },
  { date: "2025-01-14", action: "Generated report", time: "02:45 PM" },
  { date: "2025-01-14", action: "Logged in", time: "08:15 AM" },
  { date: "2025-01-13", action: "Logged in", time: "09:00 AM" },
  { date: "2025-01-13", action: "Reviewed claims", time: "11:30 AM" },
  { date: "2025-01-12", action: "Updated qualifications", time: "03:20 PM" },
]

// Mock qualifications data
const mockQualifications = [
  { id: 1, name: "Speech-Language Pathology License", issuer: "California Board", status: "Active", expiry: "12/31/2025" },
  { id: 2, name: "ASHA Certificate of Clinical Competence", issuer: "ASHA", status: "Active", expiry: "06/30/2026" },
  { id: 3, name: "Special Education Credential", issuer: "California CTC", status: "Active", expiry: "03/15/2025" },
]

// Mock services data
const mockServices = [
  { id: 1, name: "Individual Speech Therapy", code: "92507", rate: "$85/hour" },
  { id: 2, name: "Group Speech Therapy", code: "92508", rate: "$65/hour" },
  { id: 3, name: "Language Assessment", code: "92506", rate: "$120/session" },
]

// Mock caseload data
const mockCaseload = [
  { id: 1, studentName: "John Smith", ssid: "12345678", grade: "3rd", lastSession: "2025-01-14", nextSession: "2025-01-16", status: "Active" },
  { id: 2, studentName: "Emma Johnson", ssid: "87654321", grade: "5th", lastSession: "2025-01-13", nextSession: "2025-01-17", status: "Active" },
  { id: 3, studentName: "Michael Brown", ssid: "45678901", grade: "2nd", lastSession: "2025-01-12", nextSession: "2025-01-18", status: "On Hold" },
]

// Mock account types
const accountTypes = ["practitioner", "admin", "supervisor"] as const
type AccountType = (typeof accountTypes)[number]

// Navigation sections
const navigationSections = [
  { id: "about", label: "About", icon: User },
  { id: "qualifications", label: "Qualifications & Services", icon: Award },
  { id: "caseload", label: "Caseload Management", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "activity", label: "Recent Activity", icon: Clock },
]

export default function ProfilePage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [accountType, setAccountType] = useState<AccountType>("practitioner")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    // Get user info from localStorage
    const email = localStorage.getItem("userEmail") || "cassandra.beck@kern.org"
    setUserEmail(email)

    // Randomly assign account type for demo purposes
    const randomType = accountTypes[Math.floor(Math.random() * accountTypes.length)]
    setAccountType(randomType)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Handle intersection observer to update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    navigationSections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all password fields")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long")
      setMessageType("error")
      setIsLoading(false)
      return
    }

    // Simulate password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMessage("Password updated successfully!")
      setMessageType("success")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error) {
      setMessage("Failed to update password. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const getAccountTypeBadge = (type: AccountType) => {
    const variants = {
      practitioner: "bg-teal-100 text-teal-800",
      admin: "bg-red-100 text-red-800",
      supervisor: "bg-green-100 text-green-800",
    }
    return variants[type]
  }

  const getAccountTypeIcon = (type: AccountType) => {
    switch (type) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "supervisor":
        return <User className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getQualificationStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Expiring Soon":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStudentStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      case "Inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      "Active": "bg-teal-100 text-teal-800 border-teal-200",
      "Pending": "bg-amber-100 text-amber-800 border-amber-200",
      "Expired": "bg-red-100 text-red-800 border-red-200",
      "completed": "bg-teal-100 text-teal-800 border-teal-200",
      "pending": "bg-amber-100 text-amber-800 border-amber-200",
      "scheduled": "bg-teal-100 text-teal-800 border-teal-200"
    }
    
    return (
      <Badge 
        variant="outline"
        className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800 border-gray-200"}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'service': return <Calendar className="w-4 h-4 text-teal-600" />
              case 'claim': return <FileText className="w-4 h-4 text-teal-600" />
      case 'assessment': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'qualification': return <Award className="w-4 h-4 text-purple-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="flex h-full bg-white">
      {/* Sticky Left Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Profile</h1>
          <nav className="space-y-2">
            {navigationSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <section.icon className="w-5 h-5 mr-3" />
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          
          {/* About Section */}
          <section id="about" className="min-h-screen">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600">Your personal information and account details.</p>
            </div>

            <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-teal-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Bradley" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Brown" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="bbrown@email.com" />
                  </div>
                  <div>
                    <Label htmlFor="accountType">Account Type</Label>
                    <Input id="accountType" defaultValue="Practitioner" disabled />
                  </div>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">Save Changes</Button>
              </CardContent>
            </Card>
          </section>

          {/* Qualifications & Services Section */}
          <section id="qualifications" className="min-h-screen">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Qualifications & Services</h2>
              <p className="text-gray-600">Manage your professional qualifications and service offerings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-teal-200">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-teal-800">Qualifications</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockQualifications.map((qual) => (
                      <div key={qual.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{qual.name}</h4>
                          {getStatusBadge(qual.status)}
                        </div>
                        <p className="text-sm text-gray-600">Issued by: {qual.issuer}</p>
                        <p className="text-sm text-gray-600">Expires: {qual.expiry}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-teal-600 text-teal-600 hover:bg-teal-50">
                    Add Qualification
                  </Button>
                </CardContent>
              </Card>

                          <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-teal-800">Services Offered</CardTitle>
              </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mockServices.map((service) => (
                      <div key={service.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-900">{service.name}</h4>
                          <span className="text-sm font-medium text-teal-600">{service.rate}</span>
                        </div>
                        <p className="text-sm text-gray-600">Code: {service.code}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-teal-600 text-teal-600 hover:bg-teal-50">
                    Add Service
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Caseload Management Section */}
          <section id="caseload" className="min-h-screen">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Caseload Management</h2>
              <p className="text-gray-600">Overview of your current caseload and student management.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card className="border-teal-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Students</p>
                      <p className="text-3xl font-bold text-gray-900">{mockCaseload.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Students</p>
                      <p className="text-3xl font-bold text-gray-900">{mockCaseload.filter(s => s.status === "Active").length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Scheduled This Week</p>
                      <p className="text-3xl font-bold text-gray-900">{mockCaseload.filter(s => s.nextSession.startsWith(new Date().toISOString().split('T')[0])).length}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-teal-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pending Assessments</p>
                      <p className="text-3xl font-bold text-gray-900">{mockCaseload.filter(s => s.status === "On Hold").length}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-teal-200">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-teal-800">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Service
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    <Users className="w-4 h-4 mr-2" />
                    View Caseload
                  </Button>
                  <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Settings Section */}
          <section id="settings" className="min-h-screen">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Settings</h2>
              <p className="text-gray-600">Manage your account preferences and notifications.</p>
            </div>

            <div className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive email updates about your account</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="claim-alerts">Claim Status Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified when claim status changes</p>
                    </div>
                    <Switch id="claim-alerts" defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="schedule-reminders">Schedule Reminders</Label>
                      <p className="text-sm text-gray-600">Receive reminders about upcoming appointments</p>
                    </div>
                    <Switch id="schedule-reminders" defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Enable Two-Factor Authentication</Button>
                  <Button variant="outline">Download Account Data</Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recent Activity Section */}
          <section id="activity" className="min-h-screen">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recent Activity</h2>
              <p className="text-gray-600">Your recent actions and system updates.</p>
            </div>

            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockUserHistory.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(entry.action.toLowerCase())}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{entry.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  )
}
