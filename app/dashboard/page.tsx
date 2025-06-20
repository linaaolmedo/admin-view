"use client"

import { useState } from "react"
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
  FileText
} from "lucide-react"

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
  const [showSupervisorLanding, setShowSupervisorLanding] = useState(false)

  // Calculate max value for chart scaling
  const maxValue = Math.max(...chartData.map((d) => d.rejected + d.pending + d.paid))
  const chartHeight = 200

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {showSupervisorLanding ? "Supervisor Landing" : "Dashboard"}
        </h1>
        <Button 
          onClick={() => setShowSupervisorLanding(!showSupervisorLanding)}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          {showSupervisorLanding ? "Back to Dashboard" : "Supervisor Landing"}
        </Button>
      </div>

      {showSupervisorLanding ? (
        // Supervisor Landing Section
        <Card className="overflow-hidden">
          <CardHeader className="bg-teal-600 text-white">
            <CardTitle className="text-lg font-semibold">Supervisor Landing</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
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

              {/* Upcoming Appointments */}
              <Card className="overflow-hidden border-teal-200">
                <CardHeader className="bg-teal-50 border-b border-teal-200">
                  <CardTitle className="text-base text-teal-800">Upcoming Appointments - This Week</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-50 rounded p-3 border">
                    <div className="grid grid-cols-3 gap-2 text-gray-900 text-xs font-semibold mb-3 border-b pb-2">
                      <div>Date</div>
                      <div>Time</div>
                      <div>Student</div>
                    </div>
                    <div className="space-y-2 text-gray-900 text-xs">
                      <div className="grid grid-cols-3 gap-2">
                        <div>5/15/2025</div>
                        <div>11:30am</div>
                        <div>Samantha Greenfield</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>5/15/2025</div>
                        <div>11:30am</div>
                        <div>Samantha Greenfield</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>5/15/2025</div>
                        <div>11:30am</div>
                        <div>Samantha Greenfield</div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>5/15/2025</div>
                        <div>11:30am</div>
                        <div>Samantha Greenfield</div>
                      </div>
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
                    There are <strong>5</strong> past services that require your attention. Please either add case notes or mark them as canceled.
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
                    <span className="text-gray-500">/</span>
                    <Button variant="link" className="text-teal-600 underline p-0 h-auto text-xs hover:text-teal-700">
                      Take a look
                    </Button>
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

              {/* Caseload */}
              <Card className="overflow-hidden lg:col-span-2 border-teal-200">
                <CardHeader className="bg-teal-50 border-b border-teal-200">
                  <CardTitle className="text-base text-teal-800">Caseload</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">15</div>
                      <div className="text-sm text-gray-600">Total Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">5</div>
                      <div className="text-sm text-gray-600">Seen Last Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900 mb-1">4</div>
                      <div className="text-sm text-gray-600">Scheduled to See This Week</div>
                    </div>
                  </div>
                  <Link href="/caseload">
                    <Button className="bg-white text-teal-600 border border-teal-600 hover:bg-teal-50 w-full">
                      Go to caseload
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Regular Dashboard Content */}
          {/* Top Row Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Claim Status */}
            <Card className="overflow-hidden border-teal-200">
              <CardHeader className="bg-teal-600 text-white">
                <CardTitle className="text-lg font-semibold">Current Claim Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">1000</div>
                    <div className="text-sm text-gray-600">Total Claims</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">250</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">250</div>
                    <div className="text-sm text-gray-600">Awaiting Response</div>
                  </div>
                </div>
                <Link href="/claims">
                  <Button className="w-full bg-white text-teal-600 border border-teal-600 hover:bg-teal-50">
                    Go to claims
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Expiring Qualifications */}
            <Card className="overflow-hidden border-orange-200">
              <CardHeader className="bg-orange-500 text-white">
                <CardTitle className="text-lg font-semibold">Expiring Qualifications</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <p className="text-gray-900 mb-4">There are 5 qualifications expiring in the next month.</p>
                </div>
                <Link href="/reports/qualifications">
                  <Button className="w-full bg-white text-orange-600 border border-orange-600 hover:bg-orange-50">
                    Go to qualifications report
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Billable Service Window Closing */}
          <Card className="overflow-hidden border-red-200">
            <CardHeader className="bg-red-500 text-white">
              <CardTitle className="text-lg font-semibold">Billable Service Window Closing</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-900 mb-4">
                  There are 30 services approaching the 180 day mark for billing that have not been submitted.
                </p>
              </div>
              <Link href="/claims">
                <Button className="w-full bg-white text-red-600 border border-red-600 hover:bg-red-50">
                  Go to claims
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Claim Trends Chart */}
          <Card className="overflow-hidden border-teal-200">
            <CardHeader className="bg-teal-600 text-white">
              <CardTitle className="text-lg font-semibold">Claim Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Chart */}
                <div className="relative">
                  <div className="flex items-end justify-between h-48 px-4">
                    {chartData.map((data, index) => {
                      const total = data.rejected + data.pending + data.paid
                      const barHeight = (total / maxValue) * chartHeight
                      const rejectedHeight = (data.rejected / total) * barHeight
                      const pendingHeight = (data.pending / total) * barHeight
                      const paidHeight = (data.paid / total) * barHeight

                      return (
                        <div key={index} className="flex flex-col items-center space-y-2">
                          <div className="flex flex-col-reverse" style={{ height: `${chartHeight}px` }}>
                            <div className="bg-red-500 w-8" style={{ height: `${rejectedHeight}px` }} />
                            <div className="bg-amber-400 w-8" style={{ height: `${pendingHeight}px` }} />
                            <div className="bg-teal-500 w-8" style={{ height: `${paidHeight}px` }} />
                          </div>
                          <div className="text-xs text-gray-600 text-center transform -rotate-45 origin-center">
                            {data.month}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-600">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                    <span>0</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex justify-center space-x-6 pt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Rejected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-amber-400 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Pending</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-teal-500 rounded-sm"></div>
                    <span className="text-sm text-gray-600">Paid</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
