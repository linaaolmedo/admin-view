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
  Briefcase,
  DollarSign,
  User
} from "lucide-react"

type AccountType = "administrator" | "practitioner" | "supervisor"

interface QuickAccessCard {
  title: string
  description: string
  icon: any // Using 'any' for Lucide icons since they don't have a specific type
  href: string
  color: string
  iconColor: string
  headerColor: string
}

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

  useEffect(() => {
    const storedAccountType = localStorage.getItem("accountType") as AccountType
    setAccountType(storedAccountType || "practitioner") // Default to practitioner if not set
  }, [])

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map((d) => d.rejected + d.pending + d.paid))
  const chartHeight = 200

  // Quick access cards for each account type
  const getQuickAccessCards = (): QuickAccessCard[] => {
    switch (accountType) {
      case "administrator":
        return []

      case "supervisor":
        return []

      case "practitioner":
        return []

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
    <div className={accountType === "supervisor" ? "space-y-4" : "space-y-6"}>
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-teal-800">
            {accountType === "administrator" ? "Administrator Dashboard" : 
             accountType === "supervisor" ? "Supervisor Dashboard" : 
             "Practitioner Dashboard"}
          </h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Here's an overview of your activities and quick access to key features.
          </p>
        </div>
      </div>

      {/* Quick Access Cards */}
      {quickAccessCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickAccessCards.map((card: QuickAccessCard, index: number) => {
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
                    <p className="text-sm text-slate-600">{card.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      )}

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
              <Link href="/student-services/my-calendar">
                <Button className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  My Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Services Pending Approval */}
          <Card className="overflow-hidden border-teal-200">
            <CardHeader className="bg-teal-50 border-b border-teal-200">
              <CardTitle className="text-base text-teal-800">Services Pending Approval</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Johnson, Michael</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>4/20</span>
                  <span className="ml-4">Speech</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Davis, Sarah</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>4/19</span>
                  <span className="ml-4">OT</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Wilson, Emma</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>4/18</span>
                  <span className="ml-4">PT</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm font-medium">Martinez, Carlos</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>4/17</span>
                  <span className="ml-4">Psych</span>
                </div>
              </div>

              <Link href="/student-services/supervisor-logs">
                <Button className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 w-full mt-4">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Review & Approve
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {accountType === "administrator" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* System Overview */}
          <Card className="overflow-hidden border-gray-200 w-full">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-base text-gray-800">System Overview</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 truncate">Total Users</span>
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
              <Link href="/student-services/my-calendar">
                <Button className="w-full mt-4 bg-white text-teal-600 border border-teal-600 hover:bg-teal-50">
                  <Calendar className="w-4 h-4 mr-2" />
                  My Calendar
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Services That Require Action */}
          <Card className="overflow-hidden border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-base text-orange-800">Services That Require Action</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Missing Case Notes</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>2 services</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Incomplete Services</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>1 service</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Pending Review</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>2 services</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-gray-900">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Needs Attention</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>1 service</span>
                </div>
              </div>
              <Link href="/student-services/all-services">
                <Button className="w-full mt-4 bg-white text-orange-600 border border-orange-600 hover:bg-orange-50">
                  <FileText className="w-4 h-4 mr-2" />
                  All Services
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports Section - Available for administrators and supervisors */}
      {(accountType === "administrator" || accountType === "supervisor") && (
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
      )}

      {/* Supervisor Metrics Section */}
      {accountType === "supervisor" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Team Metrics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Most Active Practitioners */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-800">Most Active Practitioners</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/1" className="text-sm text-teal-600 hover:underline">
                    Sarah Johnson
                  </Link>
                  <span className="text-sm font-semibold text-teal-600">24 logins</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/2" className="text-sm text-teal-600 hover:underline">
                    Michael Davis
                  </Link>
                  <span className="text-sm font-semibold text-teal-600">21 logins</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/3" className="text-sm text-teal-600 hover:underline">
                    Emma Wilson
                  </Link>
                  <span className="text-sm font-semibold text-teal-600">18 logins</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/4" className="text-sm text-teal-600 hover:underline">
                    Carlos Martinez
                  </Link>
                  <span className="text-sm font-semibold text-teal-600">16 logins</span>
                </div>
                <div className="text-center text-xs text-gray-500 mt-3 pt-2 border-t">
                  Last 30 days
                </div>
              </CardContent>
            </Card>

            {/* Most Appointments */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-800">Most Appointments</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/3" className="text-sm text-teal-600 hover:underline">
                    Emma Wilson
                  </Link>
                  <span className="text-sm font-semibold text-blue-600">47 sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/1" className="text-sm text-teal-600 hover:underline">
                    Sarah Johnson
                  </Link>
                  <span className="text-sm font-semibold text-blue-600">42 sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/2" className="text-sm text-teal-600 hover:underline">
                    Michael Davis
                  </Link>
                  <span className="text-sm font-semibold text-blue-600">38 sessions</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/4" className="text-sm text-teal-600 hover:underline">
                    Carlos Martinez
                  </Link>
                  <span className="text-sm font-semibold text-blue-600">35 sessions</span>
                </div>
                <div className="text-center text-xs text-gray-500 mt-3 pt-2 border-t">
                  This month
                </div>
              </CardContent>
            </Card>

            {/* Service Completion Rates */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-800">Completion Rates</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/1" className="text-sm text-teal-600 hover:underline">
                    Sarah Johnson
                  </Link>
                  <span className="text-sm font-semibold text-green-600">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/4" className="text-sm text-teal-600 hover:underline">
                    Carlos Martinez
                  </Link>
                  <span className="text-sm font-semibold text-green-600">96%</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/3" className="text-sm text-teal-600 hover:underline">
                    Emma Wilson
                  </Link>
                  <span className="text-sm font-semibold text-green-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/2" className="text-sm text-teal-600 hover:underline">
                    Michael Davis
                  </Link>
                  <span className="text-sm font-semibold text-yellow-600">87%</span>
                </div>
                <div className="text-center text-xs text-gray-500 mt-3 pt-2 border-t">
                  Service documentation
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Approvals by Practitioner */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-800">Pending Approvals by Practitioner</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/2" className="text-sm text-teal-600 hover:underline">
                    Michael Davis
                  </Link>
                  <span className="text-sm font-semibold text-orange-600">12 pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/3" className="text-sm text-teal-600 hover:underline">
                    Emma Wilson
                  </Link>
                  <span className="text-sm font-semibold text-orange-600">8 pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/4" className="text-sm text-teal-600 hover:underline">
                    Carlos Martinez
                  </Link>
                  <span className="text-sm font-semibold text-orange-600">6 pending</span>
                </div>
                <div className="flex justify-between items-center">
                  <Link href="/manage-users/1" className="text-sm text-teal-600 hover:underline">
                    Sarah Johnson
                  </Link>
                  <span className="text-sm font-semibold text-green-600">2 pending</span>
                </div>
              </CardContent>
            </Card>

            {/* Team Performance Overview */}
            <Card className="overflow-hidden border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-base text-gray-800">Team Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Practitioners</span>
                  <span className="text-lg font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Students</span>
                  <span className="text-lg font-semibold text-blue-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Avg. Completion Rate</span>
                  <span className="text-lg font-semibold text-green-600">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Services This Month</span>
                  <span className="text-lg font-semibold text-purple-600">487</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
