"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  FileText, 
  Download, 
  Play, 
  BarChart3,
  Users,
  ClipboardList,
  TrendingUp,
  PieChart,
  Calendar,
  DollarSign,
  Activity,
  BookOpen,
  Clock,
  Building,
  UserCheck
} from "lucide-react"

// Canned reports data
const cannedReports = [
  {
    id: "monthly-claims",
    title: "Monthly Claims Summary",
    description: "Comprehensive overview of all claims submitted in the current month",
    category: "Billing",
    icon: DollarSign,
    frequency: "Monthly",
    lastGenerated: "2024-03-10",
    format: ["PDF", "Excel"],
    status: "Active",
    tags: ["Claims", "Billing", "Summary"]
  },
  {
    id: "practitioner-services",
    title: "Practitioner Services Report",
    description: "Detailed breakdown of services provided by each practitioner",
    category: "Services",
    icon: Users,
    frequency: "Weekly",
    lastGenerated: "2024-03-08",
    format: ["PDF", "Excel"],
    status: "Active",
    tags: ["Practitioners", "Services", "Productivity"]
  },
  {
    id: "student-iep-status",
    title: "Student IEP Status Report",
    description: "Current status of all student IEPs including upcoming reviews",
    category: "Students",
    icon: BookOpen,
    frequency: "Bi-weekly",
    lastGenerated: "2024-03-05",
    format: ["PDF", "Excel"],
    status: "Active",
    tags: ["Students", "IEP", "Compliance"]
  },
  {
    id: "billing-compliance",
    title: "Billing Compliance Report",
    description: "Ensures all billing practices meet regulatory requirements",
    category: "Compliance",
    icon: Activity,
    frequency: "Monthly",
    lastGenerated: "2024-03-01",
    format: ["PDF"],
    status: "Active",
    tags: ["Compliance", "Billing", "Regulatory"]
  },
  {
    id: "service-utilization",
    title: "Service Utilization Dashboard",
    description: "Analytics on service usage patterns and trends",
    category: "Analytics",
    icon: BarChart3,
    frequency: "Daily",
    lastGenerated: "2024-03-11",
    format: ["PDF", "Excel", "Dashboard"],
    status: "Active",
    tags: ["Analytics", "Utilization", "Trends"]
  },
  {
    id: "qualification-expiry",
    title: "Qualification Expiry Alert",
    description: "Upcoming certification and qualification expiration dates",
    category: "HR",
    icon: Clock,
    frequency: "Monthly",
    lastGenerated: "2024-03-09",
    format: ["PDF", "Excel"],
    status: "Active",
    tags: ["Qualifications", "Expiry", "HR"]
  },
  {
    id: "district-performance",
    title: "District Performance Summary",
    description: "Performance metrics and KPIs for each district",
    category: "Performance",
    icon: Building,
    frequency: "Monthly",
    lastGenerated: "2024-03-07",
    format: ["PDF", "Dashboard"],
    status: "Active",
    tags: ["Districts", "Performance", "KPIs"]
  },
  {
    id: "attendance-tracking",
    title: "Service Attendance Report",
    description: "Student attendance patterns for scheduled services",
    category: "Attendance",
    icon: UserCheck,
    frequency: "Weekly",
    lastGenerated: "2024-03-10",
    format: ["PDF", "Excel"],
    status: "Active",
    tags: ["Attendance", "Students", "Services"]
  }
]

const reportCategories = [
  { value: "all", label: "All Reports" },
  { value: "Billing", label: "Billing" },
  { value: "Services", label: "Services" },
  { value: "Students", label: "Students" },
  { value: "Compliance", label: "Compliance" },
  { value: "Analytics", label: "Analytics" },
  { value: "HR", label: "HR" },
  { value: "Performance", label: "Performance" },
  { value: "Attendance", label: "Attendance" }
]

export default function ReportsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("canned")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredReports = selectedCategory === "all" 
    ? cannedReports 
    : cannedReports.filter(report => report.category === selectedCategory)

  const handleGenerateReport = (reportId: string) => {
    // Mock report generation
    console.log(`Generating report: ${reportId}`)
    alert("Report generated successfully! (This would normally generate and download the report)")
  }

  const handleScheduleReport = (reportId: string) => {
    // Mock schedule functionality
    console.log(`Scheduling report: ${reportId}`)
    alert("Report scheduled successfully!")
  }

  const getCategoryBadgeColor = (category: string) => {
    const colors = {
      "Billing": "bg-green-100 text-green-800",
      "Services": "bg-blue-100 text-blue-800",
      "Students": "bg-purple-100 text-purple-800",
      "Compliance": "bg-red-100 text-red-800",
      "Analytics": "bg-orange-100 text-orange-800",
      "HR": "bg-yellow-100 text-yellow-800",
      "Performance": "bg-indigo-100 text-indigo-800",
      "Attendance": "bg-pink-100 text-pink-800"
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-teal-800">Reports Dashboard</h1>
          <p className="text-slate-600 mt-1">Access standardized reports and build custom analytics</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="canned">
            <FileText className="w-4 h-4 mr-2" />
            Canned Reports
          </TabsTrigger>
          <TabsTrigger value="builder">
            <BarChart3 className="w-4 h-4 mr-2" />
            Report Builder
          </TabsTrigger>
          <TabsTrigger value="qualifications">
            <TrendingUp className="w-4 h-4 mr-2" />
            Qualifications
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            User History
          </TabsTrigger>
        </TabsList>

        {/* Canned Reports Tab */}
        <TabsContent value="canned" className="mt-6">
          <div className="space-y-6">
            {/* Header with Category Filter */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Pre-Built Reports</h2>
                <p className="text-sm text-gray-600 mt-1">Standardized reports ready for immediate use</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter by:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {reportCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.map((report) => {
                const IconComponent = report.icon
                return (
                  <Card key={report.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <IconComponent className="w-5 h-5 text-teal-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{report.title}</CardTitle>
                            <Badge className={getCategoryBadgeColor(report.category)}>
                              {report.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-sm leading-relaxed">
                        {report.description}
                      </CardDescription>
                      
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Frequency:</span>
                          <span className="font-medium">{report.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Last Generated:</span>
                          <span className="font-medium">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Formats:</span>
                          <div className="flex space-x-1">
                            {report.format.map((fmt) => (
                              <Badge key={fmt} variant="outline" className="text-xs">
                                {fmt}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {report.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleGenerateReport(report.id)}
                          className="flex-1"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Generate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleScheduleReport(report.id)}
                          className="flex-1"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </TabsContent>

        {/* Report Builder Tab */}
        <TabsContent value="builder" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Custom Report Builder
              </CardTitle>
              <CardDescription>
                Create custom reports with advanced filtering and data selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-16 h-16 mx-auto text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Build Custom Reports</h3>
                <p className="text-gray-600 mb-4">
                  Use our advanced report builder to create custom analytics and reports
                </p>
                <Button onClick={() => router.push("/reports/report-builder")}>
                  Open Report Builder
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Qualifications Tab */}
        <TabsContent value="qualifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Qualifications Reports
              </CardTitle>
              <CardDescription>
                Track and manage practitioner qualifications and certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <TrendingUp className="w-16 h-16 mx-auto text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Qualifications Management</h3>
                <p className="text-gray-600 mb-4">
                  Monitor certification statuses, expiry dates, and compliance requirements
                </p>
                <Button onClick={() => router.push("/reports/qualifications")}>
                  View Qualifications Reports
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* User History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                User History Reports
              </CardTitle>
              <CardDescription>
                Review user activity and historical data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="w-16 h-16 mx-auto text-teal-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">User Activity History</h3>
                <p className="text-gray-600 mb-4">
                  Access detailed logs of user activities and system interactions
                </p>
                <Button onClick={() => router.push("/reports/user-history")}>
                  View User History
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
