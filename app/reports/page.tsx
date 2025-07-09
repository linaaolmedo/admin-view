"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  UserCheck,
  Eye
} from "lucide-react"

// Canned reports data
const cannedReports = [
  {
    id: "claims-report",
    title: "Paid Claims Report",
    lastGenerated: "2024-03-12",
    format: ["PDF", "Excel"],
    previewUrl: "/claims/paid-claims-report"
  },
  {
    id: "qualifications-report",
    title: "Qualifications Report",
    lastGenerated: "2024-03-10",
    format: ["PDF", "Excel"],
    previewUrl: "/reports/qualifications"
  },
  {
    id: "user-history-report",
    title: "User History Report",
    lastGenerated: "2024-03-11",
    format: ["PDF", "Excel"],
    previewUrl: "/reports/user-history"
  }
]



export default function ReportsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("canned")

  const handleGenerateReport = (reportId: string) => {
    // Mock report generation
    console.log(`Generating report: ${reportId}`)
    alert("Report generated successfully! (This would normally generate and download the report)")
  }

  const handlePreviewReport = (previewUrl: string) => {
    router.push(previewUrl)
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="canned">
            <FileText className="w-4 h-4 mr-2" />
            Canned Reports
          </TabsTrigger>
          <TabsTrigger value="builder">
            <BarChart3 className="w-4 h-4 mr-2" />
            Report Builder
          </TabsTrigger>
        </TabsList>

        {/* Canned Reports Tab */}
        <TabsContent value="canned" className="mt-6">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Pre-Built Reports</h2>
              <p className="text-sm text-gray-600 mt-1">Standardized reports ready for immediate use</p>
            </div>

            {/* Reports Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report Name</TableHead>
                    <TableHead>Last Generated</TableHead>
                    <TableHead>Formats</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cannedReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">
                        <span className="font-semibold">{report.title}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{new Date(report.lastGenerated).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {report.format.map((fmt) => (
                            <Badge key={fmt} variant="outline" className="text-xs">
                              {fmt}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex space-x-2 justify-end">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePreviewReport(report.previewUrl)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleGenerateReport(report.id)}
                          >
                            <Play className="w-4 h-4 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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




      </Tabs>
    </div>
  )
}
