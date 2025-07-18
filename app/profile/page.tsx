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
import ProfileTabs from "@/components/ProfileTabs"

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

  // Handle initial hash navigation
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && ['about', 'settings', 'activity'].includes(hash)) {
      setActiveSection(hash)
    }
  }, [])

  // Handle browser back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && ['about', 'settings', 'activity'].includes(hash)) {
        setActiveSection(hash)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
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
      practitioner: "bg-cyan-100 text-cyan-700",
      admin: "bg-red-100 text-red-700",
      supervisor: "bg-emerald-100 text-emerald-700",
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
        return "bg-emerald-100 text-emerald-700"
      case "Expiring Soon":
        return "bg-amber-100 text-amber-700"
      case "Expired":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
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
    <>
      {/* Page Title - Static */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-3xl font-bold text-teal-800">Profile</h1>
      </div>
      
      {/* Navigation Tabs - Sticky positioned at 64px offset */}
      <ProfileTabs 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="space-y-12">
          
          {/* About Section */}
          <section id="about" className="scroll-mt-32" role="tabpanel" aria-labelledby="about-tab">
            <Card className="border-teal-200 shadow-sm">
              <CardHeader className="bg-teal-50">
                <CardTitle className="text-teal-800 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                    <Input id="firstName" defaultValue="Bradley" disabled className="bg-gray-50 border-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                    <Input id="lastName" defaultValue="Brown" disabled className="bg-gray-50 border-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email</Label>
                    <Input id="email" type="email" defaultValue="bbrown@email.com" disabled className="bg-gray-50 border-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="accountType" className="text-gray-700">Account Type</Label>
                    <Input id="accountType" defaultValue="Practitioner" disabled className="bg-gray-50 border-gray-200" />
                  </div>
                </div>
                <div className="text-sm text-gray-500 italic bg-blue-50 p-3 rounded-md border border-blue-200">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Personal information is managed by your administrator and cannot be changed here.
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Settings Section */}
          <section id="settings" className="scroll-mt-32" role="tabpanel" aria-labelledby="settings-tab">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="email-notifications" className="text-gray-700">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive email updates about your account</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="claim-alerts" className="text-gray-700">Claim Status Alerts</Label>
                    <p className="text-sm text-gray-600">Get notified when claim status changes</p>
                  </div>
                  <Switch id="claim-alerts" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="schedule-reminders" className="text-gray-700">Schedule Reminders</Label>
                    <p className="text-sm text-gray-600">Receive reminders about upcoming appointments</p>
                  </div>
                  <Switch id="schedule-reminders" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label htmlFor="change-password" className="text-gray-700">Password</Label>
                    <p className="text-sm text-gray-600">Update your account password</p>
                  </div>
                  <Button variant="outline" size="sm" className="hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300">
                    <Key className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Recent Activity Section */}
          <section id="activity" className="scroll-mt-32" role="tabpanel" aria-labelledby="activity-tab">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {mockUserHistory.map((entry, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(entry.action.toLowerCase())}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{entry.action}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{entry.date} at {entry.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-6 hover:bg-teal-50 hover:text-teal-600 hover:border-teal-300">
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
      </div>
    </>
  )
}

