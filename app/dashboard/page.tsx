"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Users, 
  Calendar, 
  AlertCircle,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Settings,
  Clipboard,
  Users2,
  Briefcase
} from "lucide-react"

type AccountType = "administrator" | "practitioner" | "supervisor"

// Mock data for the chart
const chartData = [
  { month: "August", rejected: 20, pending: 15, paid: 25 },
  { month: "September", rejected: 25, pending: 10, paid: 15 },
  { month: "October", rejected: 15, pending: 20, paid: 10 },
  { month: "November", rejected: 20, pending: 15, paid: 5 },
  { month: "December", rejected: 10, pending: 15, paid: 5 },
  { month: "January", rejected: 15, pending: 10, paid: 15 },
  { month: "February", rejected: 10, pending: 15, paid: 10 },
  { month: "March", rejected: 20, pending: 25, paid: 5 },
  { month: "April", rejected: 15, pending: 10, paid: 15 },
  { month: "May", rejected: 20, pending: 25, paid: 20 },
]

// Navigation sections
const sections = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'claims', label: 'Claims Status', icon: FileText },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'caseload', label: 'Caseload', icon: Users },
  { id: 'alerts', label: 'Alerts & Actions', icon: AlertCircle },
]

export default function DashboardPage() {
  const [accountType, setAccountType] = useState<AccountType | null>(null)

  // Get account type from localStorage on component mount
  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    setAccountType(storedAccountType || "practitioner") // Default to practitioner if not set
  }, [])

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map((d) => d.rejected + d.pending + d.paid))
  const chartHeight = 200

  // Quick access cards for each account type
  const getQuickAccessCards = () => {
    switch (accountType) {
      case "administrator":
        return [
          {
            title: "Claims Management",
            description: "View, process, and manage all claims",
            icon: FileText,
            href: "/claims",
            color: "bg-blue-50 border-blue-200",
            iconColor: "text-blue-600",
            headerColor: "bg-blue-50 text-blue-800"
          },
          {
            title: "User Management",
            description: "Manage practitioners, supervisors, and administrators",
            icon: Users2,
            href: "/manage-users",
            color: "bg-green-50 border-green-200", 
            iconColor: "text-green-600",
            headerColor: "bg-green-50 text-green-800"
          },
          {
            title: "Student Management",
            description: "Add, search, and manage student records",
            icon: Clipboard,
            href: "/manage-students",
            color: "bg-purple-50 border-purple-200",
            iconColor: "text-purple-600", 
            headerColor: "bg-purple-50 text-purple-800"
          },
          {
            title: "System Configuration",
            description: "Configure billing codes, qualifications, and permissions",
            icon: Settings,
            href: "/configurations",
            color: "bg-orange-50 border-orange-200",
            iconColor: "text-orange-600",
            headerColor: "bg-orange-50 text-orange-800"
          }
        ]

      case "supervisor":
        return [
          {
            title: "Service Logs Pending Approval",
            description: "Review and approve practitioner service logs",
            icon: CheckCircle2,
            href: "/student-services/supervisor-logs",
            color: "bg-blue-50 border-blue-200",
            iconColor: "text-blue-600",
            headerColor: "bg-blue-50 text-blue-800"
          },
          {
            title: "Log a Service",
            description: "Record new service sessions",
            icon: Calendar,
            href: "/log-service",
            color: "bg-teal-50 border-teal-200",
            iconColor: "text-teal-600",
            headerColor: "bg-teal-50 text-teal-800"
          },
          {
            title: "Caseload Management",
            description: "View and manage your assigned caseload",
            icon: Briefcase,
            href: "/caseload",
            color: "bg-green-50 border-green-200",
            iconColor: "text-green-600",
            headerColor: "bg-green-50 text-green-800"
          },
          {
            title: "My Calendar",
            description: "View scheduled appointments and services",
            icon: Calendar,
            href: "/student-services/my-calendar",
            color: "bg-purple-50 border-purple-200",
            iconColor: "text-purple-600",
            headerColor: "bg-purple-50 text-purple-800"
          }
        ]

      case "practitioner":
        return [
          {
            title: "Log a Service",
            description: "Record new service sessions",
            icon: Calendar,
            href: "/log-service", 
            color: "bg-teal-50 border-teal-200",
            iconColor: "text-teal-600",
            headerColor: "bg-teal-50 text-teal-800"
          },
          {
            title: "My Calendar",
            description: "View scheduled appointments and services",
            icon: Calendar,
            href: "/student-services/my-calendar",
            color: "bg-blue-50 border-blue-200",
            iconColor: "text-blue-600",
            headerColor: "bg-blue-50 text-blue-800"
          },
          {
            title: "Caseload Management", 
            description: "View and manage your assigned caseload",
            icon: Briefcase,
            href: "/caseload",
            color: "bg-green-50 border-green-200",
            iconColor: "text-green-600",
            headerColor: "bg-green-50 text-green-800"
          },
          {
            title: "All Services",
            description: "View all your service records and history",
            icon: Users,
            href: "/student-services/all-services",
            color: "bg-purple-50 border-purple-200",
            iconColor: "text-purple-600",
            headerColor: "bg-purple-50 text-purple-800"
          }
        ]

      default:
        return []
    }
  }

  const quickAccessCards = getQuickAccessCards()

  if (!accountType) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {accountType === "administrator" ? "Administrator Dashboard" : 
             accountType === "supervisor" ? "Supervisor Dashboard" : 
             "Practitioner Dashboard"}
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's an overview of your activities and quick access to key features.
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickAccessCards.map((card, index) => {
          const IconComponent = card.icon
          return (
            <Link key={index} href={card.href}>
              <Card className={`hover:shadow-lg transition-shadow cursor-pointer h-full ${card.color}`}>
                <CardHeader className={`${card.headerColor} border-b`}>
                  <div className="flex items-center space-x-2">
                    <IconComponent className={`w-5 h-5 ${card.iconColor}`} />
                    <CardTitle className="text-base">{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Account Type Specific Content */}
      {accountType === "supervisor" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="overflow-hidden border-teal-200">
            <CardHeader className="bg-teal-50 border-b border-teal-200">
              <CardTitle className="text-base text-teal-800">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Samantha Greenfield</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>8:00</span>
                  <span className="ml-4">1h</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Nicole Walker</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>9:30</span>
                  <span className="ml-4">30min</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Zachary Gulgowski</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>10:00</span>
                  <span className="ml-4">1h</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Leonard Reynolds</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>1:00</span>
                  <span className="ml-4">1h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services Pending Approval */}
          <Card className="overflow-hidden border-blue-200">
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-base text-blue-800">Services Pending Approval</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <p className="text-gray-900 text-sm">
                There are <strong>45</strong> services pending your approval on the Supervisor log page.
              </p>
              <Link href="/student-services/supervisor-logs">
                <Button className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 w-full">
                  Go to supervisor logs
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {accountType === "administrator" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* System Overview */}
          <Card className="overflow-hidden border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-base text-gray-800">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="text-lg font-semibold text-gray-900">247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Practitioners</span>
                <span className="text-lg font-semibold text-green-600">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Supervisors</span>
                <span className="text-lg font-semibold text-blue-600">43</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Students</span>
                <span className="text-lg font-semibold text-purple-600">1,284</span>
              </div>
            </CardContent>
          </Card>

          {/* Claims Overview */}
          <Card className="overflow-hidden border-yellow-200">
            <CardHeader className="bg-yellow-50 border-b border-yellow-200">
              <CardTitle className="text-base text-yellow-800">Claims Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Claims</span>
                <Badge className="bg-yellow-100 text-yellow-800">124</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Ready to Submit</span>
                <Badge className="bg-blue-100 text-blue-800">67</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Paid Claims</span>
                <Badge className="bg-green-100 text-green-800">89</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rejected Claims</span>
                <Badge className="bg-red-100 text-red-800">12</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="overflow-hidden border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-base text-green-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="text-sm">
                <div className="text-gray-900 font-medium">New User Registration</div>
                <div className="text-gray-600">Sarah Mitchell - Practitioner</div>
                <div className="text-gray-400 text-xs">2 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-900 font-medium">Configuration Update</div>
                <div className="text-gray-600">Billing codes updated</div>
                <div className="text-gray-400 text-xs">4 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="text-gray-900 font-medium">Bulk Student Import</div>
                <div className="text-gray-600">45 new students added</div>
                <div className="text-gray-400 text-xs">1 day ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {accountType === "practitioner" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="overflow-hidden border-teal-200">
            <CardHeader className="bg-teal-50 border-b border-teal-200">
              <CardTitle className="text-base text-teal-800">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Samantha Greenfield</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>8:00</span>
                  <span className="ml-4">1h</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Nicole Walker</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>9:30</span>
                  <span className="ml-4">30min</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Zachary Gulgowski</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>10:00</span>
                  <span className="ml-4">1h</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services That Require Action */}
          <Card className="overflow-hidden border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-base text-orange-800">Services That Require Action</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <p className="text-gray-900 text-sm">
                There are <strong>3</strong> past services that require your attention. Please either add case notes or mark them as canceled.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link href="/student-services/all-services">
                  <Button variant="link" className="text-teal-600 underline p-0 h-auto text-xs hover:text-teal-700">
                    Go to services
                  </Button>
                </Link>
                <span className="text-gray-500">/</span>
                <Button variant="link" className="text-teal-600 underline p-0 h-auto text-xs hover:text-teal-700">
                  Resolve now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Section - Available for all account types */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-lg text-gray-800">Quick Reports Access</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accountType === "administrator" && (
              <Link href="/reports/user-history">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  User History
                </Button>
              </Link>
            )}
            <Link href="/reports/qualifications">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Qualifications
              </Button>
            </Link>
            <Link href="/reports/report-builder">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Report Builder
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
